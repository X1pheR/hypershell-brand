import type { Meta, StoryObj } from "@storybook/react-vite"
import * as C from "@/components/ui/spinner"
import { Spinner } from "@/components/ui/spinner"

const meta={title:"Catalog/Spinner",component:C.Spinner,tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:"Unmodified official shadcn/Base UI component. Demonstration examples are not production wrappers."}}}} satisfies Meta<typeof C.Spinner>
export default meta
type Story=StoryObj<typeof meta>
export const Default:Story={render:()=> <div className="max-w-3xl p-6 text-foreground"><C.Spinner/></div>}
export const Variants:Story={render:()=> <div className="max-w-3xl p-6 text-foreground"><div className="flex gap-3"><C.Spinner className="size-3"/><C.Spinner className="size-6"/><C.Spinner className="size-9"/></div></div>}
export const States:Story={render:()=> <div className="max-w-3xl p-6 text-foreground"><div className="flex items-center gap-2 text-sm"><C.Spinner/>Loading (demo)</div></div>}
