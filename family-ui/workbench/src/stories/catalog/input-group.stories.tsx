import type { Meta,StoryObj } from "@storybook/react-vite"
import * as C from "@/components/ui/input-group"
const meta={title:"Catalog/InputGroup",component:C.InputGroup,tags:["autodocs"]} satisfies Meta<typeof C.InputGroup>
export default meta
type Story=StoryObj<typeof meta>
export const Default:Story={render:()=><div className="p-6"><C.InputGroup className="w-72"><C.InputGroupAddon>@</C.InputGroupAddon><C.InputGroupInput placeholder="Username"/></C.InputGroup></div>}
export const Variants:Story={render:()=><div className="p-6"><C.InputGroup className="w-72"><C.InputGroupInput placeholder="Search"/><C.InputGroupAddon align="inline-end"><C.InputGroupButton size="icon-xs">⌕</C.InputGroupButton></C.InputGroupAddon></C.InputGroup></div>}
