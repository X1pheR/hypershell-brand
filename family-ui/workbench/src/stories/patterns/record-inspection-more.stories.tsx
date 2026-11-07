import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, waitFor, within } from "@storybook/test"
import { Link, MemoryRouter, Route, Routes, useParams } from "react-router"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { records, type RecordSample } from "./record-inspection-data"
import { RecordDetails } from "./record-inspection-fixture"

type Mode = "drawer" | "resizable" | "route"

// Research-only native compositions, intentionally not a shared generic inspector.
// Same fictional data and task as the Card, Sheet and Dialog alternatives.
function Picker({ onSelect, selectedId, route = false, drawer = false }: {
  onSelect: (record: RecordSample) => void
  selectedId?: string
  route?: boolean
  drawer?: boolean
}) {
  return <Card className="min-w-0">
    <CardHeader>
      <CardTitle>Example records</CardTitle>
      <CardDescription>Three fictional entries. Inspect and return without modifying anything.</CardDescription>
    </CardHeader>
    <CardContent>
      <ul aria-label="Fictional records" className="space-y-2">
        {records.map(record => {
          const label = <span className="flex min-w-0 flex-col items-start gap-1 text-left">
            <span className="font-medium">{record.name}</span>
            <span className="text-xs text-muted-foreground">{record.id} · {record.status}</span>
          </span>
          const props = {
            variant: "outline" as const,
            className: "h-auto min-h-14 w-full justify-start whitespace-normal py-2",
            onClick: () => onSelect(record),
          }
          return <li key={record.id}>
            {route
              ? <Button {...props} render={<Link to={`/records/${record.id}`} />}>{label}</Button>
              : drawer
                ? <DrawerTrigger render={<Button {...props} />}>{label}</DrawerTrigger>
                : <Button {...props} aria-pressed={selectedId === record.id}>{label}</Button>}
          </li>
        })}
      </ul>
    </CardContent>
  </Card>
}

function SelectedCard({ record, name = "Selected record details" }: { record: RecordSample, name?: string }) {
  return <Card role="region" aria-label={name} className="min-w-0">
    <CardHeader>
      <CardTitle>{record.name}</CardTitle>
      <CardDescription>A native Card composition using the selected fictional record.</CardDescription>
    </CardHeader>
    <CardContent><RecordDetails record={record} /></CardContent>
  </Card>
}

function DrawerStudy() {
  const [selected, setSelected] = useState<RecordSample>(records[0])
  const [open, setOpen] = useState(false)
  return <Drawer open={open} onOpenChange={setOpen} showSwipeHandle>
    <Picker onSelect={setSelected} drawer />
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>{selected.name}</DrawerTitle>
        <DrawerDescription>Native touch-friendly Drawer. Compare with Sheet and Dialog; no design selected.</DrawerDescription>
      </DrawerHeader>
      <div className="min-h-0 overflow-y-auto px-4 py-4"><RecordDetails record={selected} /></div>
      <DrawerFooter><DrawerClose render={<Button variant="outline" />}>Return to records</DrawerClose></DrawerFooter>
    </DrawerContent>
  </Drawer>
}

function ResizableStudy() {
  const [selected, setSelected] = useState<RecordSample>(records[0])
  return <>
    <p className="text-xs text-muted-foreground">
      Desktop: two simultaneous native regions separated by a keyboard-accessible Resizable handle.
      Mobile: stacked native Cards without a forced tiny split pane.
    </p>
    <div className="space-y-4 md:hidden">
      <Picker onSelect={setSelected} selectedId={selected.id} />
      <SelectedCard record={selected} name="Mobile stacked record details" />
    </div>
    <div className="hidden md:block">
      <ResizablePanelGroup orientation="horizontal" className="min-h-96 w-full overflow-hidden rounded-xl border">
        <ResizablePanel defaultSize={48} minSize={24}>
          <div role="region" aria-label="Resizable record list" className="h-full min-w-0 overflow-y-auto p-3">
            <Picker onSelect={setSelected} selectedId={selected.id} />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle aria-label="Resize record and detail regions" />
        <ResizablePanel defaultSize={52} minSize={24}>
          <div role="region" aria-label="Resizable details" className="h-full min-w-0 overflow-y-auto p-3">
            <SelectedCard record={selected} />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  </>
}

function DetailRouteView() {
  const { recordId } = useParams<{recordId: string}>()
  const record = records.find(r => r.id === recordId)
  if (!record) {
    return <Card><CardHeader><CardTitle>Record not found</CardTitle><CardDescription>This synthetic ID is not available.</CardDescription></CardHeader>
      <CardContent><Button variant="outline" render={<Link to="/records" />}>Return to records</Button></CardContent></Card>
  }
  return <div className="space-y-4">
    <nav aria-label="Record navigation">
      <Button variant="outline" render={<Link to="/records" />}>Return to records</Button>
    </nav>
    <SelectedCard record={record} name="Detail route record" />
    <p className="text-xs text-muted-foreground">MemoryRouter simulates in-app navigation. External deep links and product route identity are NOT proven.</p>
  </div>
}

function RouteStudy() {
  const [selected, setSelected] = useState<RecordSample>(records[0])
  return <MemoryRouter initialEntries={["/records"]}>
    <Routes>
      <Route path="/records" element={<Picker route selectedId={selected.id} onSelect={setSelected} />} />
      <Route path="/records/:recordId" element={<DetailRouteView />} />
    </Routes>
  </MemoryRouter>
}

function FurtherNativeRecordStudy({ mode }: { mode: Mode }) {
  return <div className="mx-auto max-w-5xl space-y-5 p-4 text-foreground">
    <div>
      <h2 className="text-2xl font-semibold">Inspect a record in context</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Function-first native comparison: {mode === "drawer" ? "Drawer" : mode === "resizable" ? "Resizable workspace" : "In-app detail route"}.
        No copied vanilla UI, no theme and no live data.
      </p>
    </div>
    {mode === "drawer" ? <DrawerStudy /> : mode === "resizable" ? <ResizableStudy /> : <RouteStudy />}
    <p className="text-xs text-muted-foreground">
      Research options only. Test navigation context, keyboard/focus, mobile and long content.
      Record persistence, auth and true deep links are product-owned.
    </p>
  </div>
}

const meta = {
  title: "Patterns/More record inspection alternatives",
  component: FurtherNativeRecordStudy,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen", docs: { description: { component:
    "Three additional neutral alternatives to the same record-inspection function: native Drawer, " +
    "responsive Resizable panels and MemoryRouter detail-route navigation. No shared inspector or native modifications." } } },
} satisfies Meta<typeof FurtherNativeRecordStudy>

export default meta
type Story = StoryObj<typeof meta>

export const DrawerDetails: Story = {
  args: { mode: "drawer" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole("button", { name: /Service lifecycle check/ }))
    const dialog = await within(document.body).findByRole("dialog", { name: "Service lifecycle check" })
    await waitFor(() => expect(within(dialog).getByText("EX-102")).toBeVisible(), { timeout: 4000 })
    await userEvent.keyboard("{Escape}")
    await waitFor(() => expect(dialog).not.toBeVisible(), { timeout: 4000 })
  },
}

export const ResizableDetails: Story = {
  args: { mode: "resizable" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getAllByRole("button", { name: /Documentation refresh/ })[0]
    await userEvent.click(trigger)
    await expect(trigger).toHaveAttribute("aria-pressed", "true")
    const regions = canvas.queryAllByRole("region", { name: /details/i })
    await expect(regions.some(r => r.textContent?.includes("EX-103"))).toBe(true)
  },
}

export const DetailRoute: Story = {
  args: { mode: "route" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole("link", { name: /Service lifecycle check/ }))
    await expect(canvas.getByRole("region", { name: "Detail route record" })).toHaveTextContent("EX-102")
    await userEvent.click(canvas.getByRole("link", { name: "Return to records" }))
    await expect(canvas.getByRole("link", { name: /Service lifecycle check/ })).toBeVisible()
  },
}
