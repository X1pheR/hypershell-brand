// Minimal, fail-closed HTTP transport for the OFFICIAL @storybook/mcp docs handler.
// This is not a bespoke MCP implementation. Only bind to loopback; Reach/private
// agent connector must provide an authenticated transport before deployment.
import { createStorybookMcpHandler } from "@storybook/mcp"
import { readFile } from "node:fs/promises"
import { createServer } from "node:http"
import { timingSafeEqual } from "node:crypto"
import { Readable } from "node:stream"
import { pipeline } from "node:stream/promises"
import { isAbsolute, join } from "node:path"
import { fileURLToPath } from "node:url"

const tokenFile = process.env.STORYBOOK_MCP_TOKEN_FILE
if (!tokenFile || !isAbsolute(tokenFile)) throw new Error("A private absolute STORYBOOK_MCP_TOKEN_FILE is mandatory")
const token = (await readFile(tokenFile, "utf8")).trim()
if (token.length < 32) throw new Error("MCP bearer token must contain at least 32 characters")
const manifests = process.env.STORYBOOK_MCP_MANIFEST_DIR
  || fileURLToPath(new URL("../storybook-static/manifests/", import.meta.url))
const permitted = new Map([
  ["./manifests/components.json", "components.json"],
  ["./manifests/docs.json", "docs.json"],
])
const mcp = await createStorybookMcpHandler({
  manifestProvider: async (_request, name) => {
    const file = permitted.get(name)
    if (!file) throw new Error("Manifest path not allowlisted")
    return readFile(join(manifests, file), "utf8")
  },
})
const port = Number(process.env.STORYBOOK_MCP_PORT || "6090")
if (!Number.isInteger(port) || port < 0 || port > 65535) throw new Error("Invalid MCP port")
function authenticated(value) {
  if (!value?.startsWith("Bearer ")) return false
  const supplied = Buffer.from(value.slice(7))
  const expected = Buffer.from(token)
  return supplied.length === expected.length && timingSafeEqual(supplied, expected)
}
const server = createServer(async (req, res) => {
  res.setHeader("X-Content-Type-Options", "nosniff")
  if (new URL(req.url || "/", "http://localhost").pathname !== "/mcp") {
    res.writeHead(404).end()
    return
  }
  if (!authenticated(req.headers.authorization)) {
    res.writeHead(401, { "WWW-Authenticate": "Bearer" }).end()
    return
  }
  if (!["GET", "POST", "DELETE"].includes(req.method || "")) {
    res.writeHead(405).end()
    return
  }
  try {
    const headers = new Headers()
    for (const [key, value] of Object.entries(req.headers)) {
      if (value !== undefined) headers.set(key, Array.isArray(value) ? value.join(", ") : value)
    }
    const hasBody = req.method === "POST"
    const request = new Request(`http://127.0.0.1:${port}/mcp`, {
      method: req.method, headers,
      ...(hasBody ? { body: Readable.toWeb(req), duplex: "half" } : {}),
    })
    const response = await mcp(request)
    res.writeHead(response.status, Object.fromEntries(response.headers))
    if (response.body) await pipeline(Readable.fromWeb(response.body), res)
    else res.end()
  } catch {
    if (!res.headersSent) res.writeHead(500).end()
    else res.destroy()
  }
})
server.listen(port, "127.0.0.1", () => {
  console.log(`STORYBOOK_DOCS_MCP_LISTENING=127.0.0.1:${server.address().port}`)
})
process.on("SIGTERM", () => server.close())
