import type { Meta, StoryObj } from "@storybook/react-vite"
import * as C from "@/components/ui/separator"
import { Spinner } from "@/components/ui/spinner"

const meta={title:"Catalog/Separator",component:C.Separator,tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:"Unmodified official shadcn/Base UI component. Demonstration examples are not production wrappers."}}}} satisfies Meta<typeof C.Separator>
export default meta
type Story=StoryObj<typeof meta>
export const Default:Story={render:()=> <div className="max-w-3xl p-6 text-foreground"><div className="w-72 space-y-3"><p>Section one</p><C.Separator/><p>Section two</p></div></div>}
export const Variants:Story={render:()=> <div className="max-w-3xl p-6 text-foreground"><div className="flex h-12 items-center gap-4">Left<C.Separator orientation="vertical"/>Right</div></div>}
