import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, waitFor, within } from "@storybook/test"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const initial = {
  name: "Synthetic API reference",
  endpoint: "https://example.invalid/v1",
  description: "Fictional documentation entry, not an actual integration.",
}
type FormView = "ready" | "invalid" | "pending" | "denied"

function NativeDraftReview({ view }: { view: FormView }) {
  const [draft, setDraft] = useState({ ...initial, name: view === "invalid" ? "A" : initial.name })
  const [accepted, setAccepted] = useState({ ...initial })
  const [reviewOpen, setReviewOpen] = useState(false)
  const [notice, setNotice] = useState("")
  const pending = view === "pending"
  const denied = view === "denied"
  const validName = draft.name.trim().length >= 3
  const validUrl = (() => { try { return new URL(draft.endpoint).protocol === "https:" } catch { return false } })()
  const valid = validName && validUrl
  const dirty = JSON.stringify(draft) !== JSON.stringify(accepted)
  const canReview = valid && dirty && !pending && !denied

  function acceptLocalDraft() {
    setAccepted({ ...draft })
    setReviewOpen(false)
    setNotice("Local example draft confirmed; no server or configuration was changed.")
  }
  function discardDraft() {
    setDraft({ ...accepted })
    setNotice("Unsaved local edits discarded.")
  }
  return <div className="mx-auto max-w-3xl p-4">
    <Card>
      <CardHeader>
        <CardTitle>Draft, review and confirm a fictional change</CardTitle>
        <CardDescription>Native shadcn Input, Textarea, Button and Dialog. This example does not contain persistence, authorization or an actual API call.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {denied ? (
          <p role="alert" className="rounded-md border p-5">You cannot edit this fictional example. No editing controls are shown.</p>
        ) : <>
          <div className="space-y-2">
            <label htmlFor="draft-name" className="text-sm font-medium">Display name</label>
            <Input id="draft-name" value={draft.name} disabled={pending}
              aria-invalid={!validName} aria-describedby={!validName ? "draft-name-error" : undefined}
              onChange={event => setDraft(previous => ({ ...previous, name: event.target.value }))} />
            {!validName && <p id="draft-name-error" role="alert" className="text-sm text-destructive">Name requires at least 3 characters.</p>}
          </div>
          <div className="space-y-2">
            <label htmlFor="draft-endpoint" className="text-sm font-medium">HTTPS documentation endpoint</label>
            <Input id="draft-endpoint" value={draft.endpoint} disabled={pending}
              aria-invalid={!validUrl} aria-describedby={!validUrl ? "draft-url-error" : undefined}
              onChange={event => setDraft(previous => ({ ...previous, endpoint: event.target.value }))} />
            {!validUrl && <p id="draft-url-error" role="alert" className="text-sm text-destructive">A valid HTTPS URL is required.</p>}
          </div>
          <div className="space-y-2">
            <label htmlFor="draft-description" className="text-sm font-medium">Description</label>
            <Textarea id="draft-description" value={draft.description} disabled={pending} className="min-h-28"
              onChange={event => setDraft(previous => ({ ...previous, description: event.target.value }))} />
          </div>
          <p role="status" className="text-sm text-muted-foreground">
            {pending ? "Waiting for a fictional request; editing is disabled." : dirty ? "Local edits not confirmed." : "No pending changes."}
          </p>
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => setReviewOpen(true)} disabled={!canReview}>Review draft</Button>
            <Button variant="outline" onClick={discardDraft} disabled={!dirty || pending}>Discard local edits</Button>
          </div>
          {notice && <p role="status" className="rounded border p-3 text-sm">{notice}</p>}
          <Dialog open={reviewOpen} onOpenChange={setReviewOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Review local draft</DialogTitle>
                <DialogDescription>Confirming only changes the synthetic browser state. It does not apply a Hypershell configuration.</DialogDescription>
              </DialogHeader>
              <dl className="grid grid-cols-[5rem_1fr] gap-2 break-all text-sm">
                <dt>Name</dt><dd>{draft.name}</dd>
                <dt>Endpoint</dt><dd>{draft.endpoint}</dd>
                <dt>Details</dt><dd>{draft.description}</dd>
              </dl>
              <DialogFooter>
                <Button variant="outline" onClick={() => setReviewOpen(false)}>Return to editing</Button>
                <Button onClick={acceptLocalDraft}>Confirm local draft</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>}
      </CardContent>
    </Card>
  </div>
}

const meta = {
  title: "Patterns/Native draft validation and review",
  component: NativeDraftReview,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen", docs: { description: { component: "S09/S10 functional research: validated fields, local draft/dirty status, review modal, discard and honest pending/denied states. No backend changes, universal wizard, legacy layout or theme." } } },
} satisfies Meta<typeof NativeDraftReview>

export default meta
type Story = StoryObj<typeof meta>

export const ReviewAndConfirm: Story = { args: { view: "ready" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.type(canvas.getByRole("textbox", { name: "Display name" }), " checked")
    await expect(canvas.getByRole("status")).toHaveTextContent("Local edits not confirmed")
    await userEvent.click(canvas.getByRole("button", { name: "Review draft" }))
    const dialog = await within(document.body).findByRole("dialog", { name: "Review local draft" })
    await expect(within(dialog).getByText(/checked/)).toBeVisible()
    await userEvent.click(within(dialog).getByRole("button", { name: "Return to editing" }))
    await waitFor(() => expect(dialog).not.toBeVisible())
    await expect(canvas.getByRole("button", { name: "Review draft" })).toBeEnabled()
    await userEvent.click(canvas.getByRole("button", { name: "Review draft" }))
    const again = await within(document.body).findByRole("dialog", { name: "Review local draft" })
    await userEvent.click(within(again).getByRole("button", { name: "Confirm local draft" }))
    await expect(canvas.getByText(/no server or configuration was changed/)).toBeVisible()
  },
}
export const ValidationErrors: Story = { args: { view: "invalid" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("alert")).toHaveTextContent("Name requires at least 3 characters")
    await expect(canvas.getByRole("button", { name: "Review draft" })).toBeDisabled()
    await userEvent.type(canvas.getByRole("textbox", { name: "Display name" }), "BC")
    await expect(canvas.queryByRole("alert")).not.toBeInTheDocument()
    await expect(canvas.getByRole("button", { name: "Review draft" })).toBeEnabled()
  },
}
export const PendingRequest: Story = { args: { view: "pending" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("status")).toHaveTextContent("Waiting for a fictional request")
    await expect(canvas.getByRole("textbox", { name: "Display name" })).toBeDisabled()
  },
}
export const PermissionDenied: Story = { args: { view: "denied" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("alert")).toHaveTextContent("You cannot edit")
    await expect(canvas.queryByRole("textbox", { name: "Display name" })).not.toBeInTheDocument()
  },
}
