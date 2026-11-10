import type { Meta, StoryObj } from "@storybook/react-vite"
import { ArrowRight, Download, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Separator } from "@/components/ui/separator"

function NativeActions() {
 return <section className="max-w-2xl space-y-5 p-5">
   <div><h2 className="text-lg font-semibold">Official Button</h2><p className="text-sm text-muted-foreground">Base UI primitives with the native shadcn base-nova styles.</p></div>
   <div className="flex flex-wrap items-center gap-2"><Button><Plus/>Primary</Button><Button variant="secondary">Secondary</Button><Button variant="outline">Outline</Button><Button variant="ghost">Ghost</Button><Button variant="link">Link</Button><Button variant="destructive">Destructive</Button></div>
   <Separator />
   <div className="flex flex-wrap items-center gap-2"><Button size="xs">XS</Button><Button size="sm">Small</Button><Button size="lg">Large</Button><Button size="icon" aria-label="Download"><Download /></Button><Button disabled>Disabled</Button></div>
   <div className="flex flex-wrap gap-2">{(["default","secondary","outline","destructive","ghost"] as const).map(variant=><Badge variant={variant} key={variant}>{variant}</Badge>)}</div>
   <ButtonGroup><Button variant="outline">Previous</Button><Button variant="outline">Next <ArrowRight/></Button></ButtonGroup>
 </section>
}
const meta={title:"Native/Actions/Buttons & Badges",component:NativeActions,parameters:{layout:"padded"},tags:["autodocs"]} satisfies Meta<typeof NativeActions>
export default meta
type Story=StoryObj<typeof meta>
export const AllVariants:Story={parameters:{a11y:{test:"todo"}},}
