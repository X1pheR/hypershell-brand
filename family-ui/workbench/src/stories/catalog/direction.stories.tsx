import type { Meta,StoryObj } from "@storybook/react-vite"
import * as C from "@/components/ui/direction"
const meta={title:"Catalog/DirectionProvider",component:C.DirectionProvider,args:{direction:"ltr",children:""},tags:["autodocs"]} satisfies Meta<typeof C.DirectionProvider>
export default meta
type Story=StoryObj<typeof meta>
export const Default:Story={render:()=><div className="p-6"><C.DirectionProvider direction="rtl"><div className="rounded-lg border p-5">Right-to-left content</div></C.DirectionProvider></div>}
export const Variants:Story={render:()=><div className="p-6"><C.DirectionProvider direction="ltr"><div className="rounded-lg border p-5">Left-to-right content</div></C.DirectionProvider></div>}
