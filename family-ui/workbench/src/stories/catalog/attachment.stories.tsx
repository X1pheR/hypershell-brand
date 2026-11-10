import type { Meta, StoryObj } from "@storybook/react-vite"
import * as C from "@/components/ui/attachment"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"

/** Official shadcn Base UI source; example compositions are test fixtures, not custom UI components. */
const meta = { title: "Catalog/Attachment", component: C.Attachment, tags: ["autodocs"], parameters: { layout: "padded", docs: { description: { component: "Unmodified native shadcn Base UI component. Examine supported variants and accessibility behavior before composing app screens." } } } } satisfies Meta<typeof C.Attachment>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { render: () => <div className="max-w-3xl p-6 text-foreground"><C.Attachment><C.AttachmentMedia>📄</C.AttachmentMedia><C.AttachmentContent><C.AttachmentTitle>report.pdf</C.AttachmentTitle><C.AttachmentDescription>Ready to download</C.AttachmentDescription></C.AttachmentContent></C.Attachment></div> }

export const Variations: Story = { render: () => <div className="max-w-3xl p-6 text-foreground"><C.Attachment state="uploading" size="sm"><C.AttachmentMedia>↑</C.AttachmentMedia><C.AttachmentContent><C.AttachmentTitle>Uploading document</C.AttachmentTitle></C.AttachmentContent></C.Attachment></div> }
