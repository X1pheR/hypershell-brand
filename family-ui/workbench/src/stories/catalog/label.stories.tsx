import type { Meta, StoryObj } from "@storybook/react-vite"
import * as C from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
const meta={title:"Catalog/Label",component:C.Label,tags:["autodocs"],parameters:{layout:"padded"}} satisfies Meta<typeof C.Label>
export default meta
type Story=StoryObj<typeof meta>
export const Default:Story={render:()=> <div className="max-w-3xl p-6 text-foreground"><C.Label htmlFor="sample-name">Name</C.Label></div>}
export const Variants:Story={render:()=> <div className="max-w-3xl p-6 text-foreground"><div className="space-y-2"><C.Label htmlFor="sample-email">Email</C.Label><Input id="sample-email" placeholder="name@example.test"/></div></div>}
