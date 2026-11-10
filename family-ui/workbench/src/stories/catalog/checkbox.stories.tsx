import type { Meta, StoryObj } from "@storybook/react-vite"
import * as C from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
const meta={title:"Catalog/Checkbox",component:C.Checkbox,tags:["autodocs"],parameters:{layout:"padded"}} satisfies Meta<typeof C.Checkbox>
export default meta
type Story=StoryObj<typeof meta>
export const Default:Story={render:()=> <div className="max-w-3xl p-6 text-foreground"><label className="flex items-center gap-2"><C.Checkbox defaultChecked/>Enabled</label></div>}
export const Variants:Story={render:()=> <div className="max-w-3xl p-6 text-foreground"><div className="flex gap-4"><C.Checkbox aria-label="Unchecked"/><C.Checkbox disabled aria-label="Disabled"/></div></div>}
