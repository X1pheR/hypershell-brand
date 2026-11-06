import type { Meta, StoryObj } from "@storybook/react-vite"
import * as C from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
const meta={title:"Catalog/ScrollArea",component:C.ScrollArea,tags:["autodocs"],parameters:{layout:"padded"}} satisfies Meta<typeof C.ScrollArea>
export default meta
type Story=StoryObj<typeof meta>
export const Default:Story={render:()=> <div className="max-w-3xl p-6 text-foreground"><C.ScrollArea className="h-40 w-60 rounded-md border p-3">{Array.from({length:22},(_,i)=><p key={i}>Item {i+1}</p>)}</C.ScrollArea></div>}
export const Variants:Story={render:()=> <div className="max-w-3xl p-6 text-foreground"><C.ScrollArea className="h-20 w-64 rounded-md border p-3"><p className="w-160">Wide horizontal scrolling content here</p><C.ScrollBar orientation="horizontal"/></C.ScrollArea></div>}
