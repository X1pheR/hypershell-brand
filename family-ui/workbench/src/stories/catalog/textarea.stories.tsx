import type { Meta, StoryObj } from "@storybook/react-vite"
import * as C from "@/components/ui/textarea"
import { Spinner } from "@/components/ui/spinner"

const meta={title:"Catalog/Textarea",component:C.Textarea,tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:"Unmodified official shadcn/Base UI component. Demonstration examples are not production wrappers."}}}} satisfies Meta<typeof C.Textarea>
export default meta
type Story=StoryObj<typeof meta>
export const Default:Story={render:()=> <div className="max-w-3xl p-6 text-foreground"><C.Textarea aria-label="Feedback" placeholder="Write feedback"/></div>}
export const Variants:Story={render:()=> <div className="max-w-3xl p-6 text-foreground"><C.Textarea aria-label="Description" rows={5} defaultValue="A longer editable description"/></div>}
export const States:Story={render:()=> <div className="max-w-3xl p-6 text-foreground"><C.Textarea aria-label="Disabled" disabled placeholder="Read only example"/></div>}
