import type { Meta, StoryObj } from "@storybook/react-vite"
import * as C from "@/components/ui/native-select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
const meta={title:"Catalog/NativeSelect",component:C.NativeSelect,tags:["autodocs"],parameters:{layout:"padded"}} satisfies Meta<typeof C.NativeSelect>
export default meta
type Story=StoryObj<typeof meta>
export const Default:Story={render:()=> <div className="max-w-3xl p-6 text-foreground"><C.NativeSelect aria-label="Region"><C.NativeSelectOption>Europe</C.NativeSelectOption><C.NativeSelectOption>America</C.NativeSelectOption></C.NativeSelect></div>}
export const Variants:Story={render:()=> <div className="max-w-3xl p-6 text-foreground"><C.NativeSelect disabled aria-label="Unavailable"><C.NativeSelectOption>Disabled</C.NativeSelectOption></C.NativeSelect></div>}
