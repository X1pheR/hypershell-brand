import type { Meta, StoryObj } from "@storybook/react-vite"
import * as C from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
const meta={title:"Catalog/Dialog",component:C.Dialog,tags:["autodocs"],parameters:{layout:"padded"}} satisfies Meta<typeof C.Dialog>
export default meta
type Story=StoryObj<typeof meta>
export const Default:Story={render:()=> <div className="max-w-3xl p-6 text-foreground"><C.Dialog><C.DialogTrigger render={<Button/>}>Open dialog</C.DialogTrigger><C.DialogContent><C.DialogHeader><C.DialogTitle>Native dialog</C.DialogTitle><C.DialogDescription>Press Escape to close.</C.DialogDescription></C.DialogHeader><C.DialogFooter><C.DialogClose render={<Button/>}>Done</C.DialogClose></C.DialogFooter></C.DialogContent></C.Dialog></div>}
export const Variants:Story={render:()=> <div className="max-w-3xl p-6 text-foreground"><C.Dialog><C.DialogTrigger render={<Button variant="outline"/>}>Edit profile</C.DialogTrigger><C.DialogContent><C.DialogHeader><C.DialogTitle>Profile</C.DialogTitle><C.DialogDescription>Example form</C.DialogDescription></C.DialogHeader><Input aria-label="Profile name" placeholder="Name"/><C.DialogFooter><C.DialogClose render={<Button/>}>Close</C.DialogClose></C.DialogFooter></C.DialogContent></C.Dialog></div>}
