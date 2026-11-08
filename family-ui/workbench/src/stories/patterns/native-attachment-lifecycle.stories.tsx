import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, within } from "@storybook/test"
import {
  Attachment, AttachmentActions, AttachmentAction, AttachmentContent,
  AttachmentDescription, AttachmentGroup, AttachmentMedia, AttachmentTitle,
} from "@/components/ui/attachment"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

// Pure visual / functional status prototype. Files are NEVER read, selected,
// uploaded, downloaded, retained, exported or transferred.
type Phase = "idle" | "uploading" | "processing" | "error" | "done"
const copy: Record<Phase,{status:string,description:string}> = {
  idle: { status: "Not started", description: "No file was selected; nothing is being transferred." },
  uploading: { status: "Pending example", description: "Illustrative 35% upload state; no transfer or network request exists." },
  processing: { status: "Processing example", description: "This is a visual state only; no conversion or virus scan occurred." },
  error: { status: "Synthetic failure", description: "The imagined transfer failed. No file is stored." },
  done: { status: "Synthetic complete", description: "Status illustration only; no file exists to download." },
}

function NativeAttachmentStudy({ initial }: { initial: Phase }) {
  const [phase, setPhase] = useState<Phase>(initial)
  const data = copy[phase]
  return <div className="mx-auto max-w-4xl p-4">
    <Card>
      <CardHeader>
        <CardTitle>File and artifact lifecycle states</CardTitle>
        <CardDescription>Native shadcn Attachment and Progress. No file API, upload, download, credential, remote request or Hypershell brand styling.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <AttachmentGroup aria-label="Example attachments">
          <Attachment state={phase}>
            <AttachmentMedia aria-hidden="true">DOC</AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>fictional-report.md</AttachmentTitle>
              <AttachmentDescription>{data.description}</AttachmentDescription>
            </AttachmentContent>
            {phase === "error" && (
              <AttachmentActions>
                <AttachmentAction onClick={() => setPhase("idle")} aria-label="Reset fictional upload error">Reset</AttachmentAction>
              </AttachmentActions>
            )}
          </Attachment>
        </AttachmentGroup>
        <p role={phase === "error" ? "alert" : "status"} className="text-sm">{data.status}</p>
        {phase === "uploading" && <div className="space-y-2">
          <Progress aria-label="Illustrative upload progress" value={35} />
          <p className="text-xs text-muted-foreground">35% example progress — no transfer has started.</p>
        </div>}
        <p className="text-xs text-muted-foreground">
          Actual file origin, authorization, scanning, resumable transfer, retention, preview and download are owned by a consuming product.
        </p>
      </CardContent>
    </Card>
  </div>
}

const meta = {
  title: "Patterns/Native attachment states",
  component: NativeAttachmentStudy,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen", docs: { description: { component: "S18 native Attachment candidate: honest idle/uploading/processing/error/done states only, explicitly without file access or transfer. A real upload protocol must be separately accepted in its product." } } },
} satisfies Meta<typeof NativeAttachmentStudy>
export default meta
type Story = StoryObj<typeof meta>
export const NoFile: Story = { args: { initial: "idle" }, play: async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  await expect(canvas.getByRole("status")).toHaveTextContent("Not started")
} }
export const IllustrativeProgress: Story = { args: { initial: "uploading" }, play: async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  await expect(canvas.getByRole("progressbar", { name: "Illustrative upload progress" })).toHaveAttribute("aria-valuenow","35")
} }
export const Processing: Story = { args: { initial: "processing" }, play: async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  await expect(canvas.getByRole("status")).toHaveTextContent("Processing example")
} }
export const FailedWithReset: Story = { args: { initial: "error" }, play: async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  await expect(canvas.getByRole("alert")).toHaveTextContent("Synthetic failure")
  await userEvent.click(canvas.getByRole("button", { name: "Reset fictional upload error" }))
  await expect(canvas.getByRole("status")).toHaveTextContent("Not started")
} }
export const FictionalCompleted: Story = { args: { initial: "done" }, play: async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  await expect(canvas.getByRole("status")).toHaveTextContent("Synthetic complete")
} }
