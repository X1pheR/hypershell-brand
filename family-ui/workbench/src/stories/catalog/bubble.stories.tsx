import type { Meta, StoryObj } from "@storybook/react-vite"
import * as C from "@/components/ui/bubble"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"

/** Official shadcn Base UI source; example compositions are test fixtures, not custom UI components. */
const meta = { title: "Catalog/Bubble", component: C.Bubble, tags: ["autodocs"], parameters: { layout: "padded", docs: { description: { component: "Unmodified native shadcn Base UI component. Examine supported variants and accessibility behavior before composing app screens." } } } } satisfies Meta<typeof C.Bubble>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { render: () => <div className="max-w-3xl p-6 text-foreground"><C.BubbleGroup><C.Bubble><C.BubbleContent>How can I help?</C.BubbleContent></C.Bubble></C.BubbleGroup></div> }

export const Variations: Story = { render: () => <div className="max-w-3xl p-6 text-foreground"><C.BubbleGroup><C.Bubble variant="secondary" align="end"><C.BubbleContent>A response example.</C.BubbleContent></C.Bubble><C.Bubble variant="outline"><C.BubbleContent>Another message.</C.BubbleContent></C.Bubble></C.BubbleGroup></div> }
