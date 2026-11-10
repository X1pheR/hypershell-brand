import type { Meta, StoryObj } from "@storybook/react-vite"
import * as C from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
const meta={title:"Catalog/Tooltip",component:C.Tooltip,tags:["autodocs"],parameters:{layout:"padded"}} satisfies Meta<typeof C.Tooltip>
export default meta
type Story=StoryObj<typeof meta>
export const Default:Story={render:()=> <div className="max-w-3xl p-6 text-foreground"><C.TooltipProvider><C.Tooltip><C.TooltipTrigger render={<Button variant="outline"/>}>Hover or focus</C.TooltipTrigger><C.TooltipContent>Native tooltip</C.TooltipContent></C.Tooltip></C.TooltipProvider></div>}
export const Variants:Story={render:()=> <div className="max-w-3xl p-6 text-foreground"><C.TooltipProvider><C.Tooltip><C.TooltipTrigger render={<Button/>}>More info</C.TooltipTrigger><C.TooltipContent side="right">Additional context</C.TooltipContent></C.Tooltip></C.TooltipProvider></div>}
