import type { Meta,StoryObj } from "@storybook/react-vite"
import * as C from "@/components/ui/menubar"
const meta={title:"Catalog/Menubar",component:C.Menubar,tags:["autodocs"]} satisfies Meta<typeof C.Menubar>
export default meta
type Story=StoryObj<typeof meta>
export const Default:Story={render:()=><div className="p-6"><C.Menubar><C.MenubarMenu><C.MenubarTrigger>File</C.MenubarTrigger><C.MenubarContent><C.MenubarGroup><C.MenubarItem>New</C.MenubarItem><C.MenubarItem>Save</C.MenubarItem></C.MenubarGroup></C.MenubarContent></C.MenubarMenu></C.Menubar></div>}
export const Variants:Story={render:()=><div className="p-6"><C.Menubar><C.MenubarMenu><C.MenubarTrigger>Edit</C.MenubarTrigger><C.MenubarContent><C.MenubarGroup><C.MenubarItem>Copy</C.MenubarItem><C.MenubarItem>Paste</C.MenubarItem></C.MenubarGroup></C.MenubarContent></C.MenubarMenu></C.Menubar></div>}
