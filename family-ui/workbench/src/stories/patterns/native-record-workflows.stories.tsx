import { useMemo, useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, waitFor, within } from "@storybook/test"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// All actions remain local and fictional. A product owns server pagination,
// rights, concurrency/version checks and actual task mutations.
const original = [
  { id: "EX-101", name: "North review", status: "Pending" },
  { id: "EX-102", name: "West check", status: "Pending" },
  { id: "EX-103", name: "South audit", status: "Ready" },
  { id: "EX-104", name: "East document", status: "Pending" },
  { id: "EX-105", name: "Network note", status: "Ready" },
  { id: "EX-106", name: "Service reference", status: "Pending" },
  { id: "EX-107", name: "API description", status: "Pending" },
  { id: "EX-108", name: "Backlog review", status: "Ready" },
] as const

type Row = { id: string, name: string, status: string }
type View = "ready" | "empty" | "loading" | "error" | "denied"
const pageSize = 4

function NativeRecordWorkflow({ view }: { view: View }) {
  const [rows, setRows] = useState<Row[]>(original.map(row => ({ ...row })))
  const [query, setQuery] = useState(view === "empty" ? "no-match-xyz" : "")
  const [sortAscending, setSortAscending] = useState(true)
  const [page, setPage] = useState(0)
  const [selected, setSelected] = useState<Set<string>>(() => new Set())
  const [reviewOpen, setReviewOpen] = useState(false)
  const [notice, setNotice] = useState("")
  const [loadState, setLoadState] = useState<View>(view)

  const filtered = useMemo(() => rows.filter(row =>
    (row.name + " " + row.id).toLocaleLowerCase("en").includes(query.toLocaleLowerCase("en"))
  ).sort((a,b) => sortAscending ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)),
  [rows, query, sortAscending])
  const countPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const currentPage = Math.min(page, countPages - 1)
  const visible = filtered.slice(currentPage * pageSize, (currentPage + 1) * pageSize)
  const visibleSelected = visible.filter(row => selected.has(row.id)).length
  const allVisible = visible.length > 0 && visibleSelected === visible.length
  const partialVisible = visibleSelected > 0 && !allVisible
  const toggleOne = (id: string, next: boolean) => setSelected(previous => {
    const copy = new Set(previous)
    if (next) copy.add(id); else copy.delete(id)
    return copy
  })
  const togglePage = (next: boolean) => setSelected(previous => {
    const copy = new Set(previous)
    for (const row of visible) if (next) copy.add(row.id); else copy.delete(row.id)
    return copy
  })
  const resetQuery = (value: string) => { setQuery(value); setPage(0) }
  function applySimulatedReview() {
    setRows(previous => previous.map(row => selected.has(row.id) ? { ...row, status: "Reviewed" } : row))
    setNotice(`${selected.size} example record(s) reviewed locally; no backend change.`)
    setSelected(new Set()); setReviewOpen(false)
  }

  return <div className="mx-auto max-w-5xl p-4">
    <Card>
      <CardHeader>
        <CardTitle>Browse and review fictional records</CardTitle>
        <CardDescription>Native shadcn Table, Checkbox, Input and Dialog. Search, sort, page, select and confirm locally. No live records, server changes or copied vanilla DataGrid.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {loadState === "loading" ? (
          <p role="status" className="rounded-md border border-dashed p-6">Loading sample records…</p>
        ) : loadState === "error" ? (
          <div role="alert" className="space-y-3 rounded-md border p-6">
            <p>Example data unavailable. No stale rows or fabricated zero count are shown.</p>
            <Button variant="outline" onClick={() => setLoadState("ready")}>Retry local sample</Button>
          </div>
        ) : loadState === "denied" ? (
          <p role="alert" className="rounded-md border p-6">Access denied to this fictional record set. No records or actions are exposed.</p>
        ) : <>
          <div className="flex flex-wrap items-end gap-3">
            <div className="min-w-40 flex-1 space-y-1">
              <label htmlFor="record-search" className="text-sm font-medium">Find records</label>
              <Input id="record-search" value={query} onChange={event => resetQuery(event.target.value)}
                placeholder="Name or reference" />
            </div>
            <Button variant="outline" onClick={() => setSortAscending(value => !value)}>
              Sort name {sortAscending ? "A–Z" : "Z–A"}
            </Button>
            <Button disabled={selected.size === 0} onClick={() => setReviewOpen(true)}>
              Review selected ({selected.size})
            </Button>
          </div>
          <div className="text-sm text-muted-foreground" role="status">
            {filtered.length} matching example record(s) · {selected.size} selected across pages
          </div>
          {filtered.length === 0 ? (
            <div className="space-y-2 rounded-md border border-dashed p-5 text-center">
              <p role="status">No records match this search.</p>
              <Button variant="outline" onClick={() => resetQuery("")}>Clear search</Button>
            </div>
          ) : (
            <Table>
              <caption className="sr-only">Fictional record search results; selection applies to visible page only</caption>
              <TableHeader>
                <TableRow>
                  <TableHead scope="col">
                    <Checkbox aria-label="Select all visible records" checked={allVisible}
                      indeterminate={partialVisible} onCheckedChange={togglePage} />
                  </TableHead>
                  <TableHead scope="col">Reference</TableHead>
                  <TableHead scope="col">Name</TableHead>
                  <TableHead scope="col">State</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {visible.map(row => <TableRow key={row.id} data-state={selected.has(row.id) ? "selected" : undefined}>
                  <TableCell>
                    <Checkbox aria-label={`Select ${row.id}`} checked={selected.has(row.id)}
                      onCheckedChange={checked => toggleOne(row.id, checked)} />
                  </TableCell>
                  <TableCell>{row.id}</TableCell>
                  <TableCell className="whitespace-normal">{row.name}</TableCell>
                  <TableCell><Badge variant="outline">{row.status}</Badge></TableCell>
                </TableRow>)}
              </TableBody>
            </Table>
          )}
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm text-muted-foreground">Page {currentPage+1} of {countPages}</span>
            <div className="flex gap-2">
              <Button variant="outline" disabled={currentPage === 0} onClick={() => setPage(n => Math.max(0,n-1))}>Previous page</Button>
              <Button variant="outline" disabled={currentPage >= countPages-1} onClick={() => setPage(n => Math.min(countPages-1,n+1))}>Next page</Button>
            </div>
          </div>
          {notice && <p role="status" className="rounded border p-3 text-sm">{notice}</p>}
          <Dialog open={reviewOpen} onOpenChange={setReviewOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Review {selected.size} selected sample records?</DialogTitle>
                <DialogDescription>This is a local demonstration only. No Hypershell data or service will be changed.</DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setReviewOpen(false)}>Cancel review</Button>
                <Button onClick={applySimulatedReview}>Confirm simulated review</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>}
      </CardContent>
    </Card>
  </div>
}

const meta = {
  title: "Patterns/Native record list and review",
  component: NativeRecordWorkflow,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen", docs: { description: { component: "S03/S06/S10/S14 native function-first comparison. Eight synthetic rows, deterministic filter/sort/pagination and page-scoped checkbox semantics, modal confirmation with local-only state, and explicit empty/loading/error/denied states. Not a general DataGrid." } } },
} satisfies Meta<typeof NativeRecordWorkflow>
export default meta
type Story = StoryObj<typeof meta>

export const SearchSortAndPage: Story = {
  args: { view: "ready" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("table")).toBeVisible()
    await userEvent.type(canvas.getByRole("textbox", { name: "Find records" }), "Network")
    await expect(canvas.getByRole("table")).toHaveTextContent("Network note")
    await expect(canvas.getByRole("table")).not.toHaveTextContent("West check")
    await userEvent.clear(canvas.getByRole("textbox", { name: "Find records" }))
    await userEvent.click(canvas.getByRole("button", { name: "Next page" }))
    await expect(canvas.getByText("Page 2 of 2")).toBeVisible()
    await userEvent.click(canvas.getByRole("button", { name: /Sort name Z–A/ }))
    await expect(canvas.getByText("Page 2 of 2")).toBeVisible()
  },
}
export const BulkReviewConfirmation: Story = {
  args: { view: "ready" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole("checkbox", { name: "Select all visible records" }))
    await expect(canvas.getByRole("button", { name: "Review selected (4)" })).toBeEnabled()
    await userEvent.click(canvas.getByRole("button", { name: "Review selected (4)" }))
    const dialog = await within(document.body).findByRole("dialog", { name: /Review 4 selected sample records/ })
    await userEvent.click(within(dialog).getByRole("button", { name: "Cancel review" }))
    await waitFor(() => expect(dialog).not.toBeVisible())
    await expect(canvas.getByRole("button", { name: "Review selected (4)" })).toBeEnabled()
    await userEvent.click(canvas.getByRole("button", { name: "Review selected (4)" }))
    const reOpen = await within(document.body).findByRole("dialog", { name: /Review 4 selected sample records/ })
    await userEvent.click(within(reOpen).getByRole("button", { name: "Confirm simulated review" }))
    await expect(canvas.getByText(/4 example record\(s\) reviewed locally/)).toBeVisible()
    await expect(canvas.getByRole("button", { name: "Review selected (0)" })).toBeDisabled()
  },
}
export const NoResults: Story = { args: { view: "empty" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText("No records match this search.")).toBeVisible()
    await userEvent.click(canvas.getByRole("button", { name: "Clear search" }))
    await expect(canvas.getByRole("table")).toBeVisible()
  } }
export const LoadingState: Story = { args: { view: "loading" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("status")).toHaveTextContent("Loading sample records")
    await expect(canvas.queryByRole("table")).not.toBeInTheDocument()
  } }
export const RecoverableError: Story = { args: { view: "error" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("alert")).toHaveTextContent("Example data unavailable")
    await userEvent.click(canvas.getByRole("button", { name: "Retry local sample" }))
    await expect(canvas.getByRole("table")).toBeVisible()
  } }
export const ForbiddenState: Story = { args: { view: "denied" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("alert")).toHaveTextContent("Access denied")
    await expect(canvas.queryByRole("table")).not.toBeInTheDocument()
    await expect(canvas.queryByRole("button", { name: /Review selected/ })).not.toBeInTheDocument()
  } }
