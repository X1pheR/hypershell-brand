// Loopback-only smoke test of the official Storybook MCP handler and bearer guard.
import { spawn } from "node:child_process"
import { randomBytes } from "node:crypto"
import { mkdtemp, writeFile, rm } from "node:fs/promises"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { once } from "node:events"

const temp = await mkdtemp(join(tmpdir(), "hs-native-mcp-test-"))
const secretPath = join(temp, "token")
const token = randomBytes(32).toString("hex")
await writeFile(secretPath, token, { mode: 0o600 })
const child = spawn(process.execPath, ["scripts/serve_mcp_docs.mjs"], {
  env: { ...process.env, STORYBOOK_MCP_TOKEN_FILE: secretPath, STORYBOOK_MCP_PORT: "0" },
  stdio: ["ignore", "pipe", "pipe"],
})
let stderr = ""
child.stderr.on("data", chunk => { stderr += chunk.toString().slice(0, 500) })
async function listenAddress() {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error("Loopback MCP server did not start")), 9000)
    let buffer = ""
    child.stdout.on("data", chunk => {
      buffer += chunk.toString()
      const m = buffer.match(/STORYBOOK_DOCS_MCP_LISTENING=127\.0\.0\.1:(\d+)/)
      if (m) { clearTimeout(timeout); resolve(`http://127.0.0.1:${m[1]}`) }
    })
    child.once("exit", code => { clearTimeout(timeout); reject(new Error(`Loopback MCP exited ${code}: ${stderr}`)) })
  })
}
try {
  const base = await listenAddress()
  const request = (name, params, id) => fetch(`${base}/mcp`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      accept: "application/json, text/event-stream",
      "content-type": "application/json",
    },
    body: JSON.stringify({ jsonrpc: "2.0", id, method: name, params }),
  })
  const unauthorized = await fetch(`${base}/mcp`, { method: "GET" })
  if (unauthorized.status !== 401) throw new Error(`Anonymous HTTP ${unauthorized.status} instead of 401`)
  const missing = await fetch(`${base}/other`, { method: "GET" })
  if (missing.status !== 404) throw new Error("Non-MCP path not rejected")
  const init = await request("initialize", {
    protocolVersion: "2025-06-18",
    capabilities: {},
    clientInfo: { name: "native-docs-auth-smoke", version: "1" },
  }, 1)
  const parsed = await init.text()
  if (init.status !== 200 || !parsed.includes('"name":"@storybook/mcp"'))
    throw new Error("Authenticated official MCP initialization failed")
  const tools = await request("tools/list", {}, 2)
  const names = await tools.text()
  if (tools.status !== 200 || !["docs-list", "docs-show", "docs-show-story"].every(x => names.includes(x)) || names.includes('"test-run"'))
    throw new Error("Wrong tools in authenticated docs-only MCP server")
  const catalog = await request("tools/call", { name: "docs-list", arguments: {} }, 3)
  const body = await catalog.text()
  if (catalog.status !== 200 || !body.includes("catalog-button") || !body.includes("catalog-calendar"))
    throw new Error("Authenticated native catalog missing")
  console.log("PASS native Storybook MCP: loopback only, HTTP 401 anonymous, HTTP 404 elsewhere")
  console.log("PASS authenticated docs-list/docs-show/docs-show-story; no dev or test tools")
} finally {
  child.kill("SIGTERM")
  await Promise.race([once(child, "exit"), new Promise(resolve => setTimeout(resolve, 1700))])
  if (child.exitCode === null) child.kill("SIGKILL")
  await rm(temp, { recursive: true, force: true })
}
