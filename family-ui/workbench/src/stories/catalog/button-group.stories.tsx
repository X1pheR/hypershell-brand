import type { Meta, StoryObj } from "@storybook/react-vite"
import * as C from "@/components/ui/button-group"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
const meta={title:"Catalog/ButtonGroup",component:C.ButtonGroup,tags:["autodocs"],parameters:{layout:"padded"}} satisfies Meta<typeof C.ButtonGroup>
export default meta
type Story=StoryObj<typeof meta>
export const Default:Story={render:()=> <div className="max-w-3xl p-6 text-foreground"><C.ButtonGroup><Button variant="outline">Previous</Button><Button variant="outline">Next</Button></C.ButtonGroup></div>}
export const Variants:Story={render:()=> <div className="max-w-3xl p-6 text-foreground"><C.ButtonGroup><Button>Save</Button><C.ButtonGroupSeparator/><Button variant="outline">Cancel</Button></C.ButtonGroup></div>}
