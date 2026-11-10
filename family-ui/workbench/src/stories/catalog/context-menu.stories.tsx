import type { Meta,StoryObj } from "@storybook/react-vite"
import * as C from "@/components/ui/context-menu"
const meta={title:"Catalog/ContextMenu",component:C.ContextMenu,tags:["autodocs"]} satisfies Meta<typeof C.ContextMenu>
export default meta
type Story=StoryObj<typeof meta>
export const Default:Story={render:()=><div className="p-6"><C.ContextMenu><C.ContextMenuTrigger render={<div className="rounded border border-dashed p-8">Right-click here</div>}/><C.ContextMenuContent><C.ContextMenuItem>Copy</C.ContextMenuItem><C.ContextMenuItem>Share</C.ContextMenuItem></C.ContextMenuContent></C.ContextMenu></div>}
export const Variants:Story={render:()=><div className="p-6"><C.ContextMenu><C.ContextMenuTrigger render={<div className="rounded bg-muted p-6">Context actions</div>}/><C.ContextMenuContent><C.ContextMenuItem>Refresh</C.ContextMenuItem></C.ContextMenuContent></C.ContextMenu></div>}
