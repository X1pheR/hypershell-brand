import type { Meta,StoryObj } from "@storybook/react-vite"
import * as C from "@/components/ui/marker"
import { Button } from "@/components/ui/button"
const meta={title:"Catalog/Marker",component:C.Marker,tags:["autodocs"]} satisfies Meta<typeof C.Marker>
export default meta
type Story=StoryObj<typeof meta>
export const Default:Story={render:()=><div className="p-6"><C.Marker><C.MarkerIcon>✓</C.MarkerIcon><C.MarkerContent>Completed</C.MarkerContent></C.Marker></div>}
export const Variants:Story={render:()=><div className="p-6"><C.Marker><C.MarkerIcon>!</C.MarkerIcon><C.MarkerContent>Needs review</C.MarkerContent></C.Marker></div>}
