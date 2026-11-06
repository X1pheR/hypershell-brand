import type { Meta, StoryObj } from "@storybook/react-vite"
import * as C from "@/components/ui/badge"
import { Spinner } from "@/components/ui/spinner"

const meta={title:"Catalog/Badge",component:C.Badge,tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:"Unmodified official shadcn/Base UI component. Demonstration examples are not production wrappers."}}}} satisfies Meta<typeof C.Badge>
export default meta
type Story=StoryObj<typeof meta>
export const Default:Story={render:()=> <div className="max-w-3xl p-6 text-foreground"><C.Badge>Default</C.Badge></div>}
export const Variants:Story={parameters:{a11y:{test:"todo"}},render:()=> <div className="max-w-3xl p-6 text-foreground"><div className="flex gap-3"><C.Badge variant="secondary">Secondary</C.Badge><C.Badge variant="outline">Outline</C.Badge><C.Badge variant="destructive">Destructive</C.Badge></div></div>}
export const States:Story={render:()=> <div className="max-w-3xl p-6 text-foreground"><div className="flex gap-3"><C.Badge>Active</C.Badge><C.Badge variant="outline">Pending</C.Badge></div></div>}
