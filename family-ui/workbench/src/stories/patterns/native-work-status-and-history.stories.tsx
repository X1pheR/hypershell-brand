import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, within } from "@storybook/test"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Task and run *outcomes*, not an imitation of Reach control-plane screens.
// All example records and actions are fictional.
const examples = [
  { id: "SIM-11", name: "Inventory snapshot", status: "Succeeded", at: "2026-11-08 00:05 UTC" },
  { id: "SIM-12", name: "Documentation review", status: "Pending", at: "2026-11-08 00:07 UTC" },
  { id: "SIM-13", name: "Dependency health check", status: "Failed", at: "2026-11-08 00:09 UTC" },
] as const
const events = [
  { at: "00:09:20", event: "Synthetic operation failed", severity: "Error" },
  { at: "00:09:10", event: "Synthetic validation running", severity: "Info" },
  { at: "00:09:00", event: "Synthetic operation started", severity: "Info" },
] as const
type State = "overview" | "running" | "partial" | "failed" | "empty"

function NativeWorkStatus({ state }: { state: State }) {
  const [retry, setRetry] = useState(false)
  return <div className="mx-auto max-w-5xl space-y-4 p-4">
    <Card>
      <CardHeader>
        <CardTitle>Fictional work status and history</CardTitle>
        <CardDescription>Native shadcn Card, Badge, Progress, Table and Button. State meanings are explicit and truthful; no Reach Tasks, real incidents or host actions are accessed.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {state === "empty" ? (
          <p role="status" className="rounded border border-dashed p-6">No fictional runs exist yet. This is an empty collection, not a failed connection.</p>
        ) : <>
          {state === "running" && <div className="space-y-2">
            <Badge variant="outline">Running sample · 2 of 5 steps</Badge>
            <Progress value={40} aria-label="Synthetic work progress" />
            <p role="status" className="text-sm text-muted-foreground">2 of 5 example steps complete. No claim of live execution.</p>
          </div>}
          {state === "partial" && <div role="status" className="rounded border p-4 text-sm">
            Partial sample: 2 of 3 sources are available. The third has not been refreshed since 2026-11-08 00:00 UTC.
            This is neither a complete success nor an empty result.
          </div>}
          {state === "failed" && <div role="alert" className="space-y-3 rounded border p-4 text-sm">
            <p>Example verification failed at 00:09:20 UTC. Data was not applied.</p>
            <Button variant="outline" onClick={() => setRetry(true)}>Retry fictional validation</Button>
            {retry && <p role="status">Local retry was requested; no actual work was scheduled.</p>}
          </div>}
          <Table>
            <caption className="sr-only">Synthetic work summary; all statuses are examples</caption>
            <TableHeader><TableRow><TableHead scope="col">Reference</TableHead><TableHead scope="col">Work</TableHead><TableHead scope="col">Reported state</TableHead><TableHead scope="col">Sample time</TableHead></TableRow></TableHeader>
            <TableBody>{examples.map(row => <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell><TableCell className="whitespace-normal">{row.name}</TableCell>
              <TableCell><Badge variant="outline">{row.status}</Badge></TableCell><TableCell>{row.at}</TableCell>
            </TableRow>)}</TableBody>
          </Table>
          <section aria-label="Synthetic event history" className="space-y-2">
            <h2 className="text-base font-semibold">Event history</h2>
            <ol className="space-y-2">
              {events.map(event => <li key={event.at} className="flex flex-wrap gap-2 rounded border p-3 text-sm">
                <time dateTime={`2026-11-08T${event.at}Z`}>{event.at} UTC</time>
                <Badge variant="outline">{event.severity}</Badge><span>{event.event}</span>
              </li>)}
            </ol>
          </section>
        </>}
      </CardContent>
    </Card>
  </div>
}

const meta = {
  title: "Patterns/Native work status and event history",
  component: NativeWorkStatus,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen", docs: { description: { component:
    "S02/S07/S08/S14/S15 functional study: truthful synthetic work list, explicit progress, partial/stale/error/empty states, accessible ordered event history. No second Reach task tracker, host data binding or automatic retry." } } },
} satisfies Meta<typeof NativeWorkStatus>
export default meta
type Story = StoryObj<typeof meta>
export const StatusOverview: Story = { args: { state: "overview" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("table")).toHaveTextContent("SIM-13")
    await expect(canvas.getByRole("region", { name: "Synthetic event history" })).toHaveTextContent("operation failed")
  } }
export const InProgress: Story = { args: { state: "running" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("progressbar", { name: "Synthetic work progress" })).toHaveAttribute("aria-valuenow", "40")
    await expect(canvas.getByRole("status")).toHaveTextContent("2 of 5")
  } }
export const PartialAndStale: Story = { args: { state: "partial" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("status")).toHaveTextContent("third has not been refreshed")
    await expect(canvas.getByRole("table")).toBeVisible()
  } }
export const FailedWithoutMutation: Story = { args: { state: "failed" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("alert")).toHaveTextContent("Data was not applied")
    await userEvent.click(canvas.getByRole("button", { name: "Retry fictional validation" }))
    await expect(canvas.getByText(/Local retry was requested/)).toBeVisible()
  } }
export const NoWorkYet: Story = { args: { state: "empty" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("status")).toHaveTextContent("No fictional runs exist yet")
    await expect(canvas.queryByRole("table")).not.toBeInTheDocument()
  } }
