import type { Meta, StoryObj } from "@storybook/react-vite"
import * as C from "@/components/ui/tabs"
const meta={title:"Catalog/Tabs",component:C.Tabs,tags:["autodocs"],parameters:{layout:"padded"}} satisfies Meta<typeof C.Tabs>
export default meta
type Story=StoryObj<typeof meta>
export const Default:Story={render:()=><div className="max-w-3xl p-6"><C.Tabs defaultValue="overview"><C.TabsList><C.TabsTrigger value="overview">Overview</C.TabsTrigger><C.TabsTrigger value="settings">Settings</C.TabsTrigger></C.TabsList><C.TabsContent value="overview">Overview content</C.TabsContent><C.TabsContent value="settings">Settings content</C.TabsContent></C.Tabs></div>}
export const Variants:Story={render:()=><div className="max-w-3xl p-6"><C.Tabs defaultValue="one"><C.TabsList><C.TabsTrigger value="one">First</C.TabsTrigger><C.TabsTrigger value="two" disabled>Unavailable</C.TabsTrigger></C.TabsList><C.TabsContent value="one">First panel</C.TabsContent></C.Tabs></div>}
