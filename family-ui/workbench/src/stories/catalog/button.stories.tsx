import type { Meta, StoryObj } from "@storybook/react-vite"
import * as C from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

const meta={title:"Catalog/Button",component:C.Button,tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:"Unmodified official shadcn/Base UI component. Demonstration examples are not production wrappers."}}}} satisfies Meta<typeof C.Button>
export default meta
type Story=StoryObj<typeof meta>
export const Default:Story={render:()=> <div className="max-w-3xl p-6 text-foreground"><C.Button>Primary action</C.Button></div>}
export const Variants:Story={parameters:{a11y:{test:"todo"}},render:()=> <div className="max-w-3xl p-6 text-foreground"><div className="flex flex-wrap gap-3"><C.Button variant="secondary">Secondary</C.Button><C.Button variant="outline">Outline</C.Button><C.Button variant="ghost">Ghost</C.Button><C.Button variant="link">Link</C.Button><C.Button variant="destructive">Destructive</C.Button></div></div>}
export const Sizes:Story={render:()=> <div className="max-w-3xl p-6 text-foreground"><div className="flex items-center gap-3"><C.Button size="xs">XS</C.Button><C.Button size="sm">Small</C.Button><C.Button size="lg">Large</C.Button></div></div>}
export const States:Story={render:()=> <div className="max-w-3xl p-6 text-foreground"><div className="flex gap-3"><C.Button disabled>Disabled</C.Button><C.Button><Spinner className="size-4"/>Loading</C.Button></div></div>}
