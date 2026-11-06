import type { Meta, StoryObj } from "@storybook/react-vite"
import * as C from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
const meta={title:"Catalog/Avatar",component:C.Avatar,tags:["autodocs"],parameters:{layout:"padded"}} satisfies Meta<typeof C.Avatar>
export default meta
type Story=StoryObj<typeof meta>
export const Default:Story={parameters:{a11y:{test:"todo"}},render:()=> <div className="max-w-3xl p-6 text-foreground"><C.Avatar><C.AvatarFallback>OC</C.AvatarFallback></C.Avatar></div>}
export const Variants:Story={parameters:{a11y:{test:"todo"}},render:()=> <div className="max-w-3xl p-6 text-foreground"><C.AvatarGroup><C.Avatar><C.AvatarFallback>AB</C.AvatarFallback></C.Avatar><C.Avatar><C.AvatarFallback>CD</C.AvatarFallback></C.Avatar></C.AvatarGroup></div>}
