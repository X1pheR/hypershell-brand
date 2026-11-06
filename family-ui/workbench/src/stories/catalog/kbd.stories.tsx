import type { Meta, StoryObj } from "@storybook/react-vite"
import * as C from "@/components/ui/kbd"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
const meta={title:"Catalog/Kbd",component:C.Kbd,tags:["autodocs"],parameters:{layout:"padded"}} satisfies Meta<typeof C.Kbd>
export default meta
type Story=StoryObj<typeof meta>
export const Default:Story={parameters:{a11y:{test:"todo"}},render:()=> <div className="max-w-3xl p-6 text-foreground"><C.Kbd>Ctrl + K</C.Kbd></div>}
export const Variants:Story={render:()=> <div className="max-w-3xl p-6 text-foreground"><C.KbdGroup><C.Kbd>⌘</C.Kbd><C.Kbd>K</C.Kbd></C.KbdGroup></div>}
