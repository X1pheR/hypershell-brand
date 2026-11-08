import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, within } from "@storybook/test"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CodeBlock, CodeBlockContent, CodeBlockHeader, CodeBlockTitle } from "@/components/ui/code-block"
import { Input } from "@/components/ui/input"

const sample = [
  { at: "2026-11-08T00:10:00Z", level: "INFO", message: "Example process started with synthetic input" },
  { at: "2026-11-08T00:10:02Z", level: "INFO", message: "Example workload accepted" },
  { at: "2026-11-08T00:10:03Z", level: "WARN", message: "Example dependency response delayed" },
  { at: "2026-11-08T00:10:05Z", level: "ERROR", message: "Synthetic validation failed; no real services affected" },
  { at: "2026-11-08T00:10:06Z", level: "INFO", message: "Local sample finished" },
] as const
const extended = Array.from({ length: 80 }, (_, i) => ({
  at: `2026-11-08T00:11:${String(Math.floor(i/2)).padStart(2,"0")}:00Z`,
  level: i%17===0 ? "ERROR" as const : "INFO" as const,
  message: `Synthetic line ${i+1}; no actual host or client data`,
}))

type View = "ready" | "empty" | "stale" | "error" | "long"

function NativeLogResearch({ view }: { view: View }) {
  const [filter, setFilter] = useState("")
  const [errorsOnly, setErrorsOnly] = useState(false)
  const available = view === "long" ? extended : view === "empty" || view === "error" ? [] : sample
  const lines = available.filter(l =>
    (!errorsOnly || l.level === "ERROR") &&
    (l.level+" "+l.message+" "+l.at).toLocaleLowerCase("en").includes(filter.toLocaleLowerCase("en"))
  )
  const output = lines.map(line => `${line.at} [${line.level}] ${line.message}`).join("\n")

  return <div className="mx-auto max-w-4xl p-4">
    <Card>
      <CardHeader>
        <CardTitle>Inspect fictional diagnostics safely</CardTitle>
        <CardDescription>Native CodeBlock, Input, Buttons and truthful source state. Not a streaming terminal, trace backend or pasted legacy log viewer.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          {view === "stale" ? <Badge variant="outline">Stale example snapshot</Badge> : view === "error" ? <Badge variant="outline">Source unavailable</Badge> : <Badge variant="outline">Synthetic offline example</Badge>}
          <span className="text-xs text-muted-foreground">Source: fictional fixed dataset, not live telemetry</span>
        </div>
        {view === "error" ? (
          <p role="alert" className="rounded-md border p-5">Log source unavailable. No cached content is falsely presented as current.</p>
        ) : <>
          {view === "stale" && <p role="status" className="rounded-md border p-3 text-sm">
            Last sample captured 2026-11-08 00:10 UTC. This is a static, stale snapshot — not a live feed.
          </p>}
          <div className="flex flex-wrap items-end gap-2">
            <div className="min-w-40 flex-1 space-y-1">
              <label htmlFor="log-filter" className="text-sm font-medium">Find in example logs</label>
              <Input id="log-filter" value={filter} onChange={event=>setFilter(event.target.value)} placeholder="Level or message" />
            </div>
            <Button variant="outline" aria-pressed={errorsOnly} onClick={()=>setErrorsOnly(v=>!v)}>
              Errors only
            </Button>
          </div>
          <p role="status" className="text-xs text-muted-foreground">{lines.length} matching example line(s)</p>
          {lines.length === 0 ? (
            <p role="status" className="rounded-md border border-dashed p-5">
              No matching log lines. An empty filter result is not evidence the source had no errors.
            </p>
          ) : (
            <section aria-label="Synthetic log output" className="min-w-0">
              <CodeBlock className="max-w-full">
                <CodeBlockHeader><CodeBlockTitle>sample.log · read only</CodeBlockTitle></CodeBlockHeader>
                <CodeBlockContent>
                  <pre className="max-h-64 max-w-full overflow-auto whitespace-pre-wrap break-words p-3 font-mono text-xs leading-5">{output}</pre>
                </CodeBlockContent>
              </CodeBlock>
            </section>
          )}
          <p className="text-xs text-muted-foreground">
            Real redaction, streaming, authorization, log retention, source timestamps and export belong to a product-specific adapter.
          </p>
        </>}
      </CardContent>
    </Card>
  </div>
}

const meta = {
  title: "Patterns/Native technical logs and diagnostics",
  component: NativeLogResearch,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen", docs: { description: { component: "S17/S14 function-first read-only log patterns: native CodeBlock, filtering, error severity, truthful stale/empty/error states and long scrolling synthetic content. No log ingestion, user data, retained client secrets or automatic export." } } },
} satisfies Meta<typeof NativeLogResearch>
export default meta
type Story = StoryObj<typeof meta>

export const SearchAndFilter: Story = { args: { view: "ready" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.type(canvas.getByRole("textbox", { name: "Find in example logs" }), "validation")
    await expect(canvas.getByRole("region", { name: "Synthetic log output" })).toHaveTextContent("Synthetic validation failed")
    await expect(canvas.getByText(/1 matching example line/)).toBeVisible()
    await userEvent.clear(canvas.getByRole("textbox", { name: "Find in example logs" }))
    await userEvent.click(canvas.getByRole("button", { name: "Errors only" }))
    await expect(canvas.getByRole("button", { name: "Errors only" })).toHaveAttribute("aria-pressed", "true")
    await expect(canvas.getByRole("region", { name: "Synthetic log output" })).toHaveTextContent("[ERROR]")
  } }
export const NoMatchingLines: Story = { args: { view: "empty" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText(/No matching log lines/)).toBeVisible()
  } }
export const StaleSnapshot: Story = { args: { view: "stale" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText(/static, stale snapshot/)).toBeVisible()
    await expect(canvas.getByRole("region", { name: "Synthetic log output" })).toBeVisible()
  } }
export const UnavailableSource: Story = { args: { view: "error" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("alert")).toHaveTextContent("Log source unavailable")
    await expect(canvas.queryByRole("region", { name: "Synthetic log output" })).not.toBeInTheDocument()
  } }
export const LongScrollableOutput: Story = { args: { view: "long" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("region", { name: "Synthetic log output" })).toHaveTextContent("Synthetic line 80")
    await expect(canvas.getByText("80 matching example line(s)")).toBeVisible()
  } }
