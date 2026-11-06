import type { Meta, StoryObj } from "@storybook/react-vite"
import * as C from "@/components/ui/switch"
import { Spinner } from "@/components/ui/spinner"

const meta={title:"Catalog/Switch",component:C.Switch,tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:"Unmodified official shadcn/Base UI component. Demonstration examples are not production wrappers."}}}} satisfies Meta<typeof C.Switch>
export default meta
type Story=StoryObj<typeof meta>
export const Default:Story={render:()=> <div className="max-w-3xl p-6 text-foreground"><label className="flex items-center gap-3"><C.Switch defaultChecked/>Notifications</label></div>}
export const Variants:Story={render:()=> <div className="max-w-3xl p-6 text-foreground"><div className="flex flex-col gap-3"><label className="flex items-center gap-3"><C.Switch/>Off</label><label className="flex items-center gap-3"><C.Switch defaultChecked/>On</label></div></div>}
export const States:Story={render:()=> <div className="max-w-3xl p-6 text-foreground"><label className="flex items-center gap-3"><C.Switch disabled/>Disabled</label></div>}
