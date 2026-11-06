import type { Meta,StoryObj } from "@storybook/react-vite"
import * as C from "@/components/ui/command"
const meta={title:"Catalog/Command",component:C.Command,tags:["autodocs"],parameters:{layout:"padded"}} satisfies Meta<typeof C.Command>
export default meta
type Story=StoryObj<typeof meta>
export const Default:Story={render:()=> <div className="max-w-2xl p-6"><C.Command className="w-72 rounded-lg border"><C.CommandInput placeholder="Search actions"/><C.CommandList><C.CommandEmpty>No matches</C.CommandEmpty><C.CommandGroup heading="Actions"><C.CommandItem>Open dashboard</C.CommandItem><C.CommandItem>Search members</C.CommandItem></C.CommandGroup></C.CommandList></C.Command></div>}
export const Variants:Story={render:()=> <div className="max-w-2xl p-6"><C.Command className="w-72 rounded-lg border"><C.CommandInput placeholder="Search navigation"/><C.CommandList><C.CommandGroup heading="Views"><C.CommandItem>Reports</C.CommandItem><C.CommandItem>Settings</C.CommandItem></C.CommandGroup></C.CommandList></C.Command></div>}
