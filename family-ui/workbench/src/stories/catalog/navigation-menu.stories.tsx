import type { Meta,StoryObj } from "@storybook/react-vite"
import * as C from "@/components/ui/navigation-menu"
const meta={title:"Catalog/NavigationMenu",component:C.NavigationMenu,tags:["autodocs"]} satisfies Meta<typeof C.NavigationMenu>
export default meta
type Story=StoryObj<typeof meta>
export const Default:Story={render:()=><div className="p-6"><C.NavigationMenu><C.NavigationMenuList><C.NavigationMenuItem><C.NavigationMenuLink href="#">Overview</C.NavigationMenuLink></C.NavigationMenuItem><C.NavigationMenuItem><C.NavigationMenuLink href="#">Reports</C.NavigationMenuLink></C.NavigationMenuItem></C.NavigationMenuList></C.NavigationMenu></div>}
export const Variants:Story={render:()=><div className="p-6"><C.NavigationMenu><C.NavigationMenuList><C.NavigationMenuItem><C.NavigationMenuLink href="#">Documentation</C.NavigationMenuLink></C.NavigationMenuItem></C.NavigationMenuList></C.NavigationMenu></div>}
