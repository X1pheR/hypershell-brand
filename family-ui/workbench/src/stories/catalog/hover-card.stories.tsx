import type { Meta, StoryObj } from "@storybook/react-vite"
import * as C from "@/components/ui/hover-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
const meta={title:"Catalog/HoverCard",component:C.HoverCard,tags:["autodocs"],parameters:{layout:"padded"}} satisfies Meta<typeof C.HoverCard>
export default meta
type Story=StoryObj<typeof meta>
export const Default:Story={render:()=> <div className="max-w-3xl p-6 text-foreground"><C.HoverCard><C.HoverCardTrigger render={<Button variant="link"/>}>Hover to preview</C.HoverCardTrigger><C.HoverCardContent>Additional context</C.HoverCardContent></C.HoverCard></div>}
export const Variants:Story={render:()=> <div className="max-w-3xl p-6 text-foreground"><C.HoverCard><C.HoverCardTrigger render={<Button variant="outline"/>}>User profile</C.HoverCardTrigger><C.HoverCardContent>Olivia Carter — Owner</C.HoverCardContent></C.HoverCard></div>}
