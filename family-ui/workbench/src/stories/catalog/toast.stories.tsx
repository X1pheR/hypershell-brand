import type { Meta, StoryObj } from "@storybook/react-vite"
import * as C from "@/components/ui/toast"
import { Button } from "@/components/ui/button"
const meta={title:"Catalog/Toast",component:C.Toaster,tags:["autodocs"]} satisfies Meta<typeof C.Toaster>
export default meta
type Story=StoryObj<typeof meta>
export const Default:Story={render:()=><C.Toaster><div className="p-6"><Button onClick={()=>C.toast.add({title:"Saved",description:"Local demonstration",type:"success"})}>Success toast</Button></div></C.Toaster>}
export const Variants:Story={parameters:{a11y:{test:"todo"}},render:()=><C.Toaster><div className="flex gap-3 p-6"><Button onClick={()=>C.toast.add({title:"Information",description:"Example toast",type:"info"})}>Information</Button><Button variant="destructive" onClick={()=>C.toast.add({title:"An error",description:"Demo only",type:"error"})}>Error</Button></div></C.Toaster>}
