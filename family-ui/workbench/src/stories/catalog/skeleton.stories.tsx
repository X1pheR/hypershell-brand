import type { Meta, StoryObj } from "@storybook/react-vite"
import * as C from "@/components/ui/skeleton"
import { Spinner } from "@/components/ui/spinner"

const meta={title:"Catalog/Skeleton",component:C.Skeleton,tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:"Unmodified official shadcn/Base UI component. Demonstration examples are not production wrappers."}}}} satisfies Meta<typeof C.Skeleton>
export default meta
type Story=StoryObj<typeof meta>
export const Default:Story={render:()=> <div className="max-w-3xl p-6 text-foreground"><C.Skeleton className="h-8 w-56"/></div>}
export const Variants:Story={render:()=> <div className="max-w-3xl p-6 text-foreground"><div className="flex gap-3"><C.Skeleton className="size-12 rounded-full"/><div className="space-y-2"><C.Skeleton className="h-3 w-32"/><C.Skeleton className="h-3 w-52"/></div></div></div>}
export const States:Story={render:()=> <div className="max-w-3xl p-6 text-foreground"><div className="space-y-2"><C.Skeleton className="h-28 w-72"/><C.Skeleton className="h-4 w-40"/></div></div>}
