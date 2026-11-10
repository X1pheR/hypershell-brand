import type { Meta, StoryObj } from "@storybook/react-vite"
import * as C from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
const meta={title:"Catalog/Slider",component:C.Slider,tags:["autodocs"],parameters:{layout:"padded"}} satisfies Meta<typeof C.Slider>
export default meta
type Story=StoryObj<typeof meta>
export const Default:Story={render:()=> <div className="max-w-3xl p-6 text-foreground"><label className="grid gap-2 text-sm">Volume<C.Slider defaultValue={35}/></label></div>}
export const Variants:Story={render:()=> <div className="max-w-3xl p-6 text-foreground"><label className="grid gap-2 text-sm">Brightness<C.Slider defaultValue={80} min={0} max={100} step={10}/></label></div>}
