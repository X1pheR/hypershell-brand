import type { Meta, StoryObj } from "@storybook/react-vite"
import * as C from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"

/** Official shadcn Base UI source; example compositions are test fixtures, not custom UI components. */
const meta = { title: "Catalog/Alert", component: C.Alert, tags: ["autodocs"], parameters: { layout: "padded", docs: { description: { component: "Unmodified native shadcn Base UI component. Examine supported variants and accessibility behavior before composing app screens." } } } } satisfies Meta<typeof C.Alert>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { render: () => <div className="max-w-3xl p-6 text-foreground"><C.Alert><C.AlertTitle>Information</C.AlertTitle><C.AlertDescription>Native informational alert.</C.AlertDescription></C.Alert></div> }

export const Variations: Story = { render: () => <div className="max-w-3xl p-6 text-foreground"><C.Alert variant="destructive"><C.AlertTitle>Action needed</C.AlertTitle><C.AlertDescription>Example validation feedback, not a real issue.</C.AlertDescription></C.Alert></div> }
