import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, within } from "@storybook/test"
import { ReactFlow, Background, Controls, type Edge, type Node } from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Specialist *research only*. Official React Flow MIT dev dependency is
// Storybook-only, not a shared native shadcn component or product graph engine.
const nodes: Node[] = [
  { id: "source", type: "input", data: { label: "Data source" }, position: { x: 0, y: 80 } },
  { id: "processor", data: { label: "Processor" }, position: { x: 260, y: 0 } },
  { id: "report", type: "output", data: { label: "Report view" }, position: { x: 520, y: 80 } },
]
const edges: Edge[] = [
  { id: "e-source-processor", source: "source", target: "processor", label: "example input" },
  { id: "e-processor-report", source: "processor", target: "report", label: "example output" },
]

function NativeRelationshipStudy({ empty }: { empty: boolean }) {
  const [selected, setSelected] = useState<string | null>(null)
  const active = nodes.find(x=>x.id===selected)
  return <div className="mx-auto max-w-5xl space-y-4 p-4">
    <Card>
      <CardHeader>
        <CardTitle>Explore fictional relationships</CardTitle>
        <CardDescription>
          Native shadcn Card surrounding a separately evaluated React Flow graph engine.
          Three fictional nodes and two edges. No live topology, editing persistence, external data or Hypershell branding.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {empty ? (
          <p role="status" className="rounded-md border border-dashed p-8 text-sm">
            No relationship data available. No nodes or edges are inferred.
          </p>
        ) : (
          <div className="h-80 min-w-0 overflow-hidden rounded-lg border bg-background" role="region" aria-label="Fictional relationship graph">
            <ReactFlow nodes={nodes} edges={edges} fitView nodesDraggable={false} nodesConnectable={false}
              zoomOnDoubleClick={false} proOptions={{ hideAttribution: false }}
              onNodeClick={(_,node)=>setSelected(node.id)} aria-label="Fictional relationship graph">
              <Background />
              <Controls showInteractive={false} />
            </ReactFlow>
          </div>
        )}
        <section aria-label="Selected graph item" className="rounded-md border p-4 text-sm">
          {active ? <p><Badge variant="outline">Selected node</Badge> {String(active.data.label)}</p>
            : <p>No selected node. You may select a fictional graph node to inspect its label.</p>}
        </section>
        <details className="rounded-md border px-3 py-2 text-sm">
          <summary className="cursor-pointer">Read accessible relationship text</summary>
          {empty ? <p>No nodes or edges.</p> : <ul className="list-disc space-y-1 ps-6">
            <li>Data source connects to Processor (example input).</li>
            <li>Processor connects to Report view (example output).</li>
          </ul>}
        </details>
        <p className="text-xs text-muted-foreground">
          Keyboard node/edge inspection, layout performance, touch and graph accessibility require a real evaluation.
          This story does not replace any product's existing graph engine.
        </p>
      </CardContent>
    </Card>
  </div>
}

const meta = {
  title: "Patterns/Native shell with specialist graph",
  component: NativeRelationshipStudy,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen", docs: { description: { component:
    "S16 bounded specialist qualification: MIT @xyflow/react Storybook-only library with 3 fictional nodes, accessible text alternative and native surrounding Card. No accepted shared Graph primitive, HomeSight port, backend/graph mutation or new runtime dependency." } } },
} satisfies Meta<typeof NativeRelationshipStudy>
export default meta
type Story = StoryObj<typeof meta>
export const SelectRelationship: Story = { args: { empty: false },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("region", { name: "Fictional relationship graph" })).toBeVisible()
    await expect(canvas.getByText(/Data source connects to Processor/)).toBeInTheDocument()
    await userEvent.click(canvas.getByText("Processor", { selector: ".react-flow__node *" }))
    await expect(canvas.getByRole("region", { name: "Selected graph item" })).toHaveTextContent("Processor")
  } }
export const NoRelationships: Story = { args: { empty: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("status")).toHaveTextContent("No relationship data available")
    await expect(canvas.queryByRole("region", { name: "Fictional relationship graph" })).not.toBeInTheDocument()
  } }
