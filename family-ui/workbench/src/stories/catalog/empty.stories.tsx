import type { Meta, StoryObj } from "@storybook/react-vite"
import * as C from "@/components/ui/empty"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
const meta={title:"Catalog/Empty",component:C.Empty,tags:["autodocs"],parameters:{layout:"padded"}} satisfies Meta<typeof C.Empty>
export default meta
type Story=StoryObj<typeof meta>
export const Default:Story={render:()=><div className="max-w-3xl p-6 text-foreground"><C.Empty><C.EmptyHeader><C.EmptyTitle>No results</C.EmptyTitle><C.EmptyDescription>Try another search.</C.EmptyDescription></C.EmptyHeader></C.Empty></div>}
export const Variants:Story={render:()=><div className="max-w-3xl p-6 text-foreground"><C.Empty><C.EmptyHeader><C.EmptyTitle>All caught up</C.EmptyTitle><C.EmptyDescription>No outstanding items.</C.EmptyDescription></C.EmptyHeader><C.EmptyContent><Button>New item</Button></C.EmptyContent></C.Empty></div>}
