import type { Meta, StoryObj } from "@storybook/react-vite"
import * as C from "@/components/ui/aspect-ratio"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"

/** Official shadcn Base UI source; example compositions are test fixtures, not custom UI components. */
const meta = { title: "Catalog/Aspect Ratio", component: C.AspectRatio, args: { ratio: 1 }, tags: ["autodocs"], parameters: { layout: "padded", docs: { description: { component: "Unmodified native shadcn Base UI component. Examine supported variants and accessibility behavior before composing app screens." } } } } satisfies Meta<typeof C.AspectRatio>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { render: () => <div className="max-w-3xl p-6 text-foreground"><C.AspectRatio ratio={16/9} className="w-80 rounded-lg bg-muted"><div className="grid size-full place-items-center text-sm text-muted-foreground">16:9 media</div></C.AspectRatio></div> }

export const Variations: Story = { render: () => <div className="max-w-3xl p-6 text-foreground"><C.AspectRatio ratio={1} className="w-48 rounded-lg bg-secondary"><div className="grid size-full place-items-center">Square</div></C.AspectRatio></div> }
