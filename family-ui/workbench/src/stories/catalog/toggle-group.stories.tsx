import type { Meta,StoryObj } from "@storybook/react-vite"
import * as C from "@/components/ui/toggle-group"
const meta={title:"Catalog/ToggleGroup",component:C.ToggleGroup,tags:["autodocs"]} satisfies Meta<typeof C.ToggleGroup>
export default meta
type Story=StoryObj<typeof meta>
export const Default:Story={render:()=><div className="p-6"><C.ToggleGroup defaultValue={["left"]} multiple><C.ToggleGroupItem value="left">Left</C.ToggleGroupItem><C.ToggleGroupItem value="center">Center</C.ToggleGroupItem><C.ToggleGroupItem value="right">Right</C.ToggleGroupItem></C.ToggleGroup></div>}
export const Variants:Story={render:()=><div className="p-6"><C.ToggleGroup defaultValue={["a"]} multiple><C.ToggleGroupItem value="a">A</C.ToggleGroupItem><C.ToggleGroupItem value="b">B</C.ToggleGroupItem></C.ToggleGroup></div>}
