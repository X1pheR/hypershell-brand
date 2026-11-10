import type { Meta,StoryObj } from "@storybook/react-vite"
import * as C from "@/components/ui/item"
import { Button } from "@/components/ui/button"
const meta={title:"Catalog/Item",component:C.Item,tags:["autodocs"]} satisfies Meta<typeof C.Item>
export default meta
type Story=StoryObj<typeof meta>
export const Default:Story={render:()=><div className="p-6"><C.Item><C.ItemContent><C.ItemTitle>Report ready</C.ItemTitle><C.ItemDescription>Created today</C.ItemDescription></C.ItemContent><C.ItemActions><Button size="sm">Open</Button></C.ItemActions></C.Item></div>}
export const Variants:Story={render:()=><div className="p-6"><C.Item variant="outline"><C.ItemContent><C.ItemTitle>File</C.ItemTitle><C.ItemDescription>Documentation PDF</C.ItemDescription></C.ItemContent></C.Item></div>}
