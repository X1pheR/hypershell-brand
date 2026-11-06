import type { Meta, StoryObj } from "@storybook/react-vite"
import * as C from "@/components/ui/message-scroller"
const meta={title:"Catalog/Message Scroller",component:C.MessageScroller,tags:["autodocs"]} satisfies Meta<typeof C.MessageScroller>
export default meta
type Story=StoryObj<typeof meta>
export const Default:Story={render:()=> <C.MessageScrollerProvider><C.MessageScroller className="h-48 w-80 rounded-lg border"><C.MessageScrollerViewport><C.MessageScrollerContent className="p-3">{Array.from({length:12},(_,i)=><C.MessageScrollerItem key={i}><div className="rounded bg-muted p-2 text-sm">Example message {i+1}</div></C.MessageScrollerItem>)}</C.MessageScrollerContent></C.MessageScrollerViewport><C.MessageScrollerButton/></C.MessageScroller></C.MessageScrollerProvider>}
export const Variants:Story={render:()=> <C.MessageScrollerProvider><C.MessageScroller className="h-32 w-72 rounded-lg border"><C.MessageScrollerViewport><C.MessageScrollerContent className="p-3">{Array.from({length:8},(_,i)=><C.MessageScrollerItem key={i}>Log event {i+1}</C.MessageScrollerItem>)}</C.MessageScrollerContent></C.MessageScrollerViewport></C.MessageScroller></C.MessageScrollerProvider>}
