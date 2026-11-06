import type { Meta, StoryObj } from "@storybook/react-vite"
import * as C from "@/components/ui/table"
const meta={title:"Catalog/Table",component:C.Table,tags:["autodocs"],parameters:{layout:"padded"}} satisfies Meta<typeof C.Table>
export default meta
type Story=StoryObj<typeof meta>
export const Default:Story={render:()=><div className="max-w-3xl p-6"><C.Table><C.TableHeader><C.TableRow><C.TableHead>Member</C.TableHead><C.TableHead>Role</C.TableHead></C.TableRow></C.TableHeader><C.TableBody><C.TableRow><C.TableCell>Olivia</C.TableCell><C.TableCell>Owner</C.TableCell></C.TableRow></C.TableBody></C.Table></div>}
export const Variants:Story={render:()=><div className="max-w-3xl p-6"><C.Table><C.TableHeader><C.TableRow><C.TableHead>Item</C.TableHead><C.TableHead>Status</C.TableHead></C.TableRow></C.TableHeader><C.TableBody><C.TableRow><C.TableCell>Build</C.TableCell><C.TableCell>Running</C.TableCell></C.TableRow><C.TableRow><C.TableCell>Audit</C.TableCell><C.TableCell>Ready</C.TableCell></C.TableRow></C.TableBody></C.Table></div>}
