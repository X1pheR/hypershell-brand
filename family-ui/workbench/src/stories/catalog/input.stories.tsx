import type { Meta, StoryObj } from "@storybook/react-vite"
import * as C from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"

const meta={title:"Catalog/Input",component:C.Input,tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:"Unmodified official shadcn/Base UI component. Demonstration examples are not production wrappers."}}}} satisfies Meta<typeof C.Input>
export default meta
type Story=StoryObj<typeof meta>
export const Default:Story={render:()=> <div className="max-w-3xl p-6 text-foreground"><C.Input aria-label="Name" placeholder="Enter your name"/></div>}
export const Variants:Story={render:()=> <div className="max-w-3xl p-6 text-foreground"><div className="space-y-3"><C.Input type="email" aria-label="Email" placeholder="name@example.test"/><C.Input type="password" aria-label="Password" placeholder="Password"/></div></div>}
export const States:Story={render:()=> <div className="max-w-3xl p-6 text-foreground"><div className="space-y-3"><C.Input disabled placeholder="Disabled"/><C.Input aria-invalid="true" placeholder="Invalid input"/></div></div>}
