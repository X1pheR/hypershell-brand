import type { Meta,StoryObj } from "@storybook/react-vite"
import * as C from "@/components/ui/message"
const meta={title:"Catalog/Message",component:C.Message,tags:["autodocs"]} satisfies Meta<typeof C.Message>
export default meta
type Story=StoryObj<typeof meta>
export const Default:Story={render:()=><div className="max-w-xl p-6"><C.MessageGroup><C.Message><C.MessageAvatar>OC</C.MessageAvatar><C.MessageContent><C.MessageHeader>Olivia</C.MessageHeader><div className="rounded-lg bg-muted p-3">Hello</div></C.MessageContent></C.Message></C.MessageGroup></div>}
export const Variants:Story={render:()=><div className="max-w-xl p-6"><C.MessageGroup><C.Message align="end"><C.MessageContent><div className="rounded-lg bg-primary p-3 text-primary-foreground">Reply</div></C.MessageContent></C.Message></C.MessageGroup></div>}
