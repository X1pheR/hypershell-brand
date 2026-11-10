import type { Meta,StoryObj } from "@storybook/react-vite"
import * as C from "@/components/ui/toggle"
const meta={title:"Catalog/Toggle",component:C.Toggle,tags:["autodocs"]} satisfies Meta<typeof C.Toggle>
export default meta
type Story=StoryObj<typeof meta>
export const Default:Story={render:()=><div className="p-6"><C.Toggle aria-label="Bold">Bold</C.Toggle></div>}
export const Variants:Story={render:()=><div className="p-6"><div className="flex gap-2"><C.Toggle variant="outline" aria-label="Italic">Italic</C.Toggle><C.Toggle disabled>Unavailable</C.Toggle></div></div>}
