// Official Storybook MCP docs contract; no network listener and no dev/test tools.
import { createStorybookMcpHandler } from "@storybook/mcp"
import { readFile } from "node:fs/promises"
import { fileURLToPath } from "node:url"

const manifestRoot = fileURLToPath(new URL("../storybook-static/manifests/", import.meta.url))
const handler = await createStorybookMcpHandler({
  manifestProvider: async (_request, manifestPath) => {
    if (!["./manifests/components.json", "./manifests/docs.json"].includes(manifestPath))
      throw new Error("Unexpected manifest request")
    return readFile(new URL(manifestPath.split("/").at(-1), `file://${manifestRoot}/`), "utf8")
  },
})

let nextId = 1
async function rpc(method, params) {
  const request = new Request("http://127.0.0.1/mcp", {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json, text/event-stream" },
    body: JSON.stringify({ jsonrpc: "2.0", id: nextId++, method, params }),
  })
  const response = await handler(request)
  const body = await response.text()
  const jsonLine = body.split("\n").find(line => line.startsWith("data: "))
  if (!response.ok || !jsonLine) throw new Error(`Storybook MCP HTTP ${response.status}`)
  const packet = JSON.parse(jsonLine.slice(6))
  if (packet.error) throw new Error(JSON.stringify(packet.error))
  return packet.result
}

await rpc("initialize", {
  protocolVersion: "2025-06-18",
  capabilities: {},
  clientInfo: { name: "native-ui-docs-contract", version: "1.0" },
})
const toolResult = await rpc("tools/list", {})
const tools = toolResult.tools.map(({name}) => name).sort()
if (JSON.stringify(tools) !== JSON.stringify(["docs-list", "docs-show", "docs-show-story"]))
  throw new Error(`Unexpected MCP tools: ${tools.join(", ")}`)
const listing = await rpc("tools/call", { name: "docs-list", arguments: {} })
const index = listing.content?.map(entry => entry.text ?? "").join("\n") ?? ""
if (listing.isError || !index.includes("catalog-button") || !index.includes("catalog-calendar"))
  throw new Error("Native manifest Button/Calendar index missing from docs-list")
const button = await rpc("tools/call", { name: "docs-show", arguments: { id: "catalog-button" } })
const detail = button.content?.map(entry => entry.text ?? "").join("\n") ?? ""
if (button.isError || !detail.includes("Button")) throw new Error("Native Button docs-show returned no documentation")
console.log("PASS native Storybook MCP 10.6 docs-only protocol; tools:", tools.join(", "))
console.log("Native component index entries:", index.split("\n").filter(line => line.startsWith("- C.")).length)
console.log("Native Button docs characters:", detail.length)
