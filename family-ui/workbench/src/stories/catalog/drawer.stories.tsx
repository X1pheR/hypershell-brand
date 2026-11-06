import type { Meta,StoryObj } from "@storybook/react-vite"
import * as C from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
const meta={title:"Catalog/Drawer",component:C.Drawer,tags:["autodocs"]} satisfies Meta<typeof C.Drawer>
export default meta
type Story=StoryObj<typeof meta>
export const Default:Story={render:()=><div className="p-6"><C.Drawer><C.DrawerTrigger render={<Button/>}>Open drawer</C.DrawerTrigger><C.DrawerContent><C.DrawerHeader><C.DrawerTitle>Details</C.DrawerTitle><C.DrawerDescription>Native drawer</C.DrawerDescription></C.DrawerHeader><C.DrawerFooter><C.DrawerClose render={<Button/>}>Close</C.DrawerClose></C.DrawerFooter></C.DrawerContent></C.Drawer></div>}
export const Variants:Story={render:()=><div className="p-6"><C.Drawer swipeDirection="right"><C.DrawerTrigger render={<Button variant="outline"/>}>Side drawer</C.DrawerTrigger><C.DrawerContent><C.DrawerHeader><C.DrawerTitle>Settings</C.DrawerTitle></C.DrawerHeader><C.DrawerFooter><C.DrawerClose render={<Button/>}>Done</C.DrawerClose></C.DrawerFooter></C.DrawerContent></C.Drawer></div>}
