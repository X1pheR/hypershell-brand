import type { Meta,StoryObj } from "@storybook/react-vite"
import * as C from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
const meta={title:"Catalog/RadioGroup",component:C.RadioGroup,tags:["autodocs"]} satisfies Meta<typeof C.RadioGroup>
export default meta
type Story=StoryObj<typeof meta>
export const Default:Story={render:()=> <div className="max-w-2xl p-6"><C.RadioGroup defaultValue="daily" className="flex gap-3"><label className="flex gap-2"><C.RadioGroupItem value="daily"/>Daily</label><label className="flex gap-2"><C.RadioGroupItem value="weekly"/>Weekly</label></C.RadioGroup></div>}
export const Variants:Story={render:()=> <div className="max-w-2xl p-6"><C.RadioGroup defaultValue="a" className="flex gap-3"><label className="flex gap-2"><C.RadioGroupItem value="a"/>Enabled</label><label className="flex gap-2"><C.RadioGroupItem value="b" disabled/>Disabled</label></C.RadioGroup></div>}
