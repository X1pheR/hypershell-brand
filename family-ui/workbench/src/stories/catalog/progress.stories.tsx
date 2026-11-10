import type { Meta, StoryObj } from "@storybook/react-vite"
import * as C from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
const meta={title:"Catalog/Progress",component:C.Progress,args:{value:50},tags:["autodocs"],parameters:{layout:"padded"}} satisfies Meta<typeof C.Progress>
export default meta
type Story=StoryObj<typeof meta>
export const Default:Story={render:()=> <div className="max-w-3xl p-6 text-foreground"><C.Progress value={30}><C.ProgressLabel>Working</C.ProgressLabel><C.ProgressValue/></C.Progress></div>}
export const Variants:Story={render:()=> <div className="max-w-3xl p-6 text-foreground"><C.Progress value={90}><C.ProgressLabel>Almost done</C.ProgressLabel><C.ProgressValue/></C.Progress></div>}
