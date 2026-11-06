import type { Meta, StoryObj } from "@storybook/react-vite"
import * as C from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"

/** Official shadcn Base UI source; example compositions are test fixtures, not custom UI components. */
const meta = { title: "Catalog/Alert Dialog", component: C.AlertDialog, tags: ["autodocs"], parameters: { layout: "padded", docs: { description: { component: "Unmodified native shadcn Base UI component. Examine supported variants and accessibility behavior before composing app screens." } } } } satisfies Meta<typeof C.AlertDialog>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { render: () => <div className="max-w-3xl p-6 text-foreground"><C.AlertDialog><C.AlertDialogTrigger render={<Button variant="destructive"/>}>Delete project</C.AlertDialogTrigger><C.AlertDialogContent><C.AlertDialogHeader><C.AlertDialogTitle>Delete project?</C.AlertDialogTitle><C.AlertDialogDescription>This is a local demonstration. No data will be deleted.</C.AlertDialogDescription></C.AlertDialogHeader><C.AlertDialogFooter><C.AlertDialogCancel>Cancel</C.AlertDialogCancel><C.AlertDialogAction>Confirm</C.AlertDialogAction></C.AlertDialogFooter></C.AlertDialogContent></C.AlertDialog></div> }

export const Variations: Story = { render: () => <div className="max-w-3xl p-6 text-foreground"><C.AlertDialog><C.AlertDialogTrigger render={<Button variant="outline"/>}>Review warning</C.AlertDialogTrigger><C.AlertDialogContent><C.AlertDialogHeader><C.AlertDialogTitle>Important action</C.AlertDialogTitle><C.AlertDialogDescription>Review this before proceeding.</C.AlertDialogDescription></C.AlertDialogHeader><C.AlertDialogFooter><C.AlertDialogCancel>Go back</C.AlertDialogCancel><C.AlertDialogAction>Continue</C.AlertDialogAction></C.AlertDialogFooter></C.AlertDialogContent></C.AlertDialog></div> }
