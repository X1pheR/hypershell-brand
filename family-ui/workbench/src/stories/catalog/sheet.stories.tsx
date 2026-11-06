import type { Meta,StoryObj } from "@storybook/react-vite"
import * as C from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
const meta={title:"Catalog/Sheet",component:C.Sheet,tags:["autodocs"]} satisfies Meta<typeof C.Sheet>
export default meta
type Story=StoryObj<typeof meta>
export const Default:Story={render:()=><div className="p-6"><C.Sheet><C.SheetTrigger render={<Button/>}>Open sheet</C.SheetTrigger><C.SheetContent><C.SheetHeader><C.SheetTitle>Settings</C.SheetTitle><C.SheetDescription>Native sheet</C.SheetDescription></C.SheetHeader><C.SheetFooter><C.SheetClose render={<Button/>}>Close</C.SheetClose></C.SheetFooter></C.SheetContent></C.Sheet></div>}
export const Variants:Story={render:()=><div className="p-6"><C.Sheet><C.SheetTrigger render={<Button variant="outline"/>}>Open from left</C.SheetTrigger><C.SheetContent side="left"><C.SheetHeader><C.SheetTitle>Details</C.SheetTitle></C.SheetHeader></C.SheetContent></C.Sheet></div>}
