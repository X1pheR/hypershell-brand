import type { Meta, StoryObj } from "@storybook/react-vite"
import * as C from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
const meta={title:"Catalog/DropdownMenu",component:C.DropdownMenu,tags:["autodocs"],parameters:{layout:"padded"}} satisfies Meta<typeof C.DropdownMenu>
export default meta
type Story=StoryObj<typeof meta>
export const Default:Story={render:()=> <div className="max-w-3xl p-6 text-foreground"><C.DropdownMenu><C.DropdownMenuTrigger render={<Button/>}>Open actions</C.DropdownMenuTrigger><C.DropdownMenuContent><C.DropdownMenuGroup><C.DropdownMenuLabel>Actions</C.DropdownMenuLabel><C.DropdownMenuItem>Copy</C.DropdownMenuItem><C.DropdownMenuItem>Export</C.DropdownMenuItem></C.DropdownMenuGroup></C.DropdownMenuContent></C.DropdownMenu></div>}
export const Variants:Story={render:()=> <div className="max-w-3xl p-6 text-foreground"><C.DropdownMenu><C.DropdownMenuTrigger render={<Button variant="outline"/>}>More</C.DropdownMenuTrigger><C.DropdownMenuContent><C.DropdownMenuGroup><C.DropdownMenuItem>Rename</C.DropdownMenuItem><C.DropdownMenuItem variant="destructive">Delete</C.DropdownMenuItem></C.DropdownMenuGroup></C.DropdownMenuContent></C.DropdownMenu></div>}
