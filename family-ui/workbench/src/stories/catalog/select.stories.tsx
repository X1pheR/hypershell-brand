import type { Meta, StoryObj } from "@storybook/react-vite"
import * as C from "@/components/ui/select"
const meta={title:"Catalog/Select",component:C.Select,tags:["autodocs"],parameters:{layout:"padded"}} satisfies Meta<typeof C.Select>
export default meta
type Story=StoryObj<typeof meta>
export const Default:Story={render:()=><div className="max-w-3xl p-6"><C.Select defaultValue="viewer"><C.SelectTrigger aria-label="Team role" className="w-52"><C.SelectValue/></C.SelectTrigger><C.SelectContent><C.SelectItem value="viewer">Viewer</C.SelectItem><C.SelectItem value="editor">Editor</C.SelectItem></C.SelectContent></C.Select></div>}
export const Variants:Story={render:()=><div className="max-w-3xl p-6"><C.Select defaultValue="small"><C.SelectTrigger aria-label="Size" className="w-52"><C.SelectValue/></C.SelectTrigger><C.SelectContent><C.SelectItem value="small">Small</C.SelectItem><C.SelectItem value="large">Large</C.SelectItem></C.SelectContent></C.Select></div>}
