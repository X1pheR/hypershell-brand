import type { Meta,StoryObj } from "@storybook/react-vite"
import * as C from "@/components/ui/resizable"
const meta={title:"Catalog/ResizablePanelGroup",component:C.ResizablePanelGroup,tags:["autodocs"]} satisfies Meta<typeof C.ResizablePanelGroup>
export default meta
type Story=StoryObj<typeof meta>
export const Default:Story={render:()=><div className="p-6"><C.ResizablePanelGroup orientation="horizontal" className="h-40 w-96 rounded-lg border"><C.ResizablePanel defaultSize={50}>Left</C.ResizablePanel><C.ResizableHandle withHandle aria-label="Resize horizontal panels"/><C.ResizablePanel defaultSize={50}>Right</C.ResizablePanel></C.ResizablePanelGroup></div>}
export const Variants:Story={render:()=><div className="p-6"><C.ResizablePanelGroup orientation="vertical" className="h-48 w-80 rounded-lg border"><C.ResizablePanel defaultSize={40}>Top</C.ResizablePanel><C.ResizableHandle aria-label="Resize vertical panels"/><C.ResizablePanel defaultSize={60}>Bottom</C.ResizablePanel></C.ResizablePanelGroup></div>}
