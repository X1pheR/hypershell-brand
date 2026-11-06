import type { Meta, StoryObj } from "@storybook/react-vite"
import * as C from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
const meta={title:"Catalog/Card",component:C.Card,tags:["autodocs"],parameters:{layout:"padded"}} satisfies Meta<typeof C.Card>
export default meta
type Story=StoryObj<typeof meta>
export const Default:Story={render:()=> <div className="max-w-3xl p-6 text-foreground"><C.Card className="w-80"><C.CardHeader><C.CardTitle>Account</C.CardTitle><C.CardDescription>Sample details</C.CardDescription></C.CardHeader><C.CardContent>Reusable content</C.CardContent></C.Card></div>}
export const Variants:Story={render:()=> <div className="max-w-3xl p-6 text-foreground"><C.Card className="w-80"><C.CardHeader><C.CardTitle>Settings</C.CardTitle></C.CardHeader><C.CardContent>Configuration</C.CardContent><C.CardFooter><Button size="sm">Save</Button></C.CardFooter></C.Card></div>}
