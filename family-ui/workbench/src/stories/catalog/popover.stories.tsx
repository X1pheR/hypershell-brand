import type { Meta, StoryObj } from "@storybook/react-vite"
import * as C from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
const meta={title:"Catalog/Popover",component:C.Popover,tags:["autodocs"],parameters:{layout:"padded"}} satisfies Meta<typeof C.Popover>
export default meta
type Story=StoryObj<typeof meta>
export const Default:Story={render:()=> <div className="max-w-3xl p-6 text-foreground"><C.Popover><C.PopoverTrigger render={<Button variant="outline"/>}>Open popover</C.PopoverTrigger><C.PopoverContent>Native Base UI popover</C.PopoverContent></C.Popover></div>}
export const Variants:Story={render:()=> <div className="max-w-3xl p-6 text-foreground"><C.Popover><C.PopoverTrigger render={<Button/>}>Preferences</C.PopoverTrigger><C.PopoverContent><C.PopoverHeader><C.PopoverTitle>Settings</C.PopoverTitle><C.PopoverDescription>Options for this view</C.PopoverDescription></C.PopoverHeader></C.PopoverContent></C.Popover></div>}
