import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, within } from "@storybook/test"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

// Synthetic study of one user capability; NOT a reusable product inspector or a
// reproduction of existing HomeSight / Reach / SDM vanilla components.
const records = [
  { id: "EX-101", name: "Inventory review", kind: "Review", status: "Ready", owner: "Ada", summary: "Fictional inventory changes; no live source or backend." },
  { id: "EX-102", name: "Service lifecycle check", kind: "Check", status: "Pending", owner: "Morgan", summary: "This check is synthetic and its status is not a health signal." },
  { id: "EX-103", name: "Documentation refresh", kind: "Draft", status: "Draft", owner: "Robin", summary: "A sample draft with no mutation or save action." },
] as const
type RecordSample = (typeof records)[number]
type Mode = "inline" | "sheet" | "dialog"

function Details({ record }: { record: RecordSample }) {
  return <dl className="grid grid-cols-[5rem_minmax(0,1fr)] gap-x-3 gap-y-3 text-sm">
    <dt className="text-muted-foreground">ID</dt><dd>{record.id}</dd>
    <dt className="text-muted-foreground">Type</dt><dd>{record.kind}</dd>
    <dt className="text-muted-foreground">Status</dt><dd><Badge variant="outline">{record.status}</Badge></dd>
    <dt className="text-muted-foreground">Owner</dt><dd>{record.owner}</dd>
    <dt className="text-muted-foreground">Summary</dt><dd className="min-w-0 break-words">{record.summary}</dd>
  </dl>
}

function NativeRecordStudy({ mode }: { mode: Mode }) {
  const [selected, setSelected] = useState<RecordSample>(records[0])
  const [open, setOpen] = useState(false)
  const list = <Card className="min-w-0">
    <CardHeader>
      <CardTitle>Example records</CardTitle>
      <CardDescription>Inspect fictional records. No production data or actions.</CardDescription>
    </CardHeader>
    <CardContent>
      <ul aria-label="Fictional records" className="space-y-2">
        {records.map((record) => {
          const props = { variant: "outline" as const,
            className: "h-auto min-h-14 w-full justify-start whitespace-normal py-2 text-left",
            "aria-label": `Inspect ${record.name}`,
            onClick: () => setSelected(record) }
          const label = <span className="flex flex-col items-start gap-1">
            <span className="font-medium">{record.name}</span>
            <span className="text-xs text-muted-foreground">{record.id} · {record.status}</span>
          </span>
          return <li key={record.id}>
            {mode === "sheet"
              ? <SheetTrigger render={<Button {...props} />}>{label}</SheetTrigger>
              : mode === "dialog"
                ? <DialogTrigger render={<Button {...props} />}>{label}</DialogTrigger>
                : <Button {...props} aria-pressed={selected.id === record.id}>{label}</Button>}
          </li>
        })}
      </ul>
    </CardContent>
  </Card>
  return <div className="mx-auto max-w-4xl space-y-5 p-4 text-foreground">
    <div>
      <h2 className="text-2xl font-semibold">Inspect a record in context</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Function-first native research: {mode === "inline" ? "in-page detail" : mode === "sheet" ? "Sheet" : "Dialog"}.
        No custom inspector, Hypershell theme or backend.
      </p>
    </div>
    {mode === "inline" && <div className="grid min-w-0 gap-4 md:grid-cols-2">
      {list}
      <Card role="region" aria-label="Selected record details" className="min-w-0">
        <CardHeader>
          <CardTitle>{selected.name}</CardTitle>
          <CardDescription>In-page details. Try selecting another item.</CardDescription>
        </CardHeader>
        <CardContent><Details record={selected} /></CardContent>
      </Card>
    </div>}
    {mode === "sheet" && <Sheet open={open} onOpenChange={setOpen}>
      {list}
      <SheetContent side="right" className="overflow-y-auto">
        <SheetHeader><SheetTitle>{selected.name}</SheetTitle>
          <SheetDescription>Official native Sheet · Return to the record list when finished.</SheetDescription>
        </SheetHeader>
        <div className="px-4 pb-4"><Details record={selected} /></div>
        <SheetFooter><SheetClose render={<Button variant="outline" />}>Return to records</SheetClose></SheetFooter>
      </SheetContent>
    </Sheet>}
    {mode === "dialog" && <Dialog open={open} onOpenChange={setOpen}>
      {list}
      <DialogContent>
        <DialogHeader><DialogTitle>{selected.name}</DialogTitle>
          <DialogDescription>Official native Dialog · Focused details, dismiss with Escape.</DialogDescription>
        </DialogHeader>
        <Details record={selected} />
        <DialogFooter><DialogClose render={<Button />}>Return to records</DialogClose></DialogFooter>
      </DialogContent>
    </Dialog>}
    <p className="text-xs text-muted-foreground">
      Comparison only; no design chosen. Evaluate focus, context retention, narrow screens,
      long content and user tasks before adopting any shared pattern.
    </p>
  </div>
}

const meta = {
  title: "Patterns/Record inspection alternatives",
  component: NativeRecordStudy,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: { description: { component:
      "Compare native in-page Card, Sheet and Dialog to satisfy the same inspection need. " +
      "These are synthetic hypotheses, not a transplanted vanilla side inspector or a reusable wrapper." } },
  },
} satisfies Meta<typeof NativeRecordStudy>
export default meta
type Story = StoryObj<typeof meta>

export const InlineDetails: Story = {
  args: { mode: "inline" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const select = canvas.getByRole("button", { name: "Inspect Service lifecycle check" })
    await userEvent.click(select)
    await expect(select).toHaveAttribute("aria-pressed", "true")
    await expect(within(canvas.getByRole("region", { name: "Selected record details" })).getByText("EX-102")).toBeVisible()
  },
}
export const SheetDetails: Story = {
  args: { mode: "sheet" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole("button", { name: "Inspect Service lifecycle check" }))
    const dialog = within(document.body).getByRole("dialog", { name: "Service lifecycle check" })
    await expect(within(dialog).getByText("EX-102")).toBeVisible()
    await userEvent.keyboard("{Escape}")
    await expect(dialog).not.toBeVisible()
  },
}
export const DialogDetails: Story = {
  args: { mode: "dialog" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole("button", { name: "Inspect Documentation refresh" }))
    const dialog = within(document.body).getByRole("dialog", { name: "Documentation refresh" })
    await expect(within(dialog).getByText("EX-103")).toBeVisible()
    await userEvent.click(within(dialog).getByRole("button", { name: "Return to records" }))
    await expect(dialog).not.toBeVisible()
  },
}
