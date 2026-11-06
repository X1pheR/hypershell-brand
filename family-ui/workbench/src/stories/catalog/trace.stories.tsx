import type { Meta,StoryObj } from "@storybook/react-vite"
import * as C from "@/components/ui/trace"
const meta={title:"Catalog/Trace",component:C.Trace,tags:["autodocs"]} satisfies Meta<typeof C.Trace>
export default meta
type Story=StoryObj<typeof meta>
export const Default:Story={render:()=><div className="max-w-xl p-6"><C.Trace><C.TraceLine status="running"><C.TraceIcon>↻</C.TraceIcon><C.TraceTitle>Loading</C.TraceTitle><C.TraceDescription>In progress</C.TraceDescription></C.TraceLine></C.Trace></div>}
export const Variants:Story={render:()=><div className="max-w-xl p-6"><C.Trace><C.TraceLine status="error"><C.TraceIcon>!</C.TraceIcon><C.TraceTitle>Failed operation</C.TraceTitle></C.TraceLine><C.TraceLine status="pending"><C.TraceTitle>Pending</C.TraceTitle></C.TraceLine></C.Trace></div>}
