import type { Meta,StoryObj } from "@storybook/react-vite"
import * as C from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
const meta={title:"Catalog/Collapsible",component:C.Collapsible,tags:["autodocs"]} satisfies Meta<typeof C.Collapsible>
export default meta
type Story=StoryObj<typeof meta>
export const Default:Story={render:()=> <div className="max-w-2xl p-6"><C.Collapsible><C.CollapsibleTrigger render={<Button variant="outline"/>}>Expand details</C.CollapsibleTrigger><C.CollapsibleContent className="p-3">Hidden content</C.CollapsibleContent></C.Collapsible></div>}
export const Variants:Story={render:()=> <div className="max-w-2xl p-6"><C.Collapsible defaultOpen><C.CollapsibleTrigger render={<Button variant="outline"/>}>Expanded</C.CollapsibleTrigger><C.CollapsibleContent>Visible from the start</C.CollapsibleContent></C.Collapsible></div>}
