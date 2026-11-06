import type { Meta, StoryObj } from "@storybook/react-vite"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
function Welcome() {
  return <Card className="max-w-xl">
    <CardHeader><CardTitle>Native shadcn / Base UI reference</CardTitle><CardDescription>OCI workbench, neutral base-nova preset</CardDescription></CardHeader>
    <CardContent className="space-y-3 text-sm">
      <Badge variant="secondary">Official sources installed</Badge>
      <p>Component source files originate from the official shadcn registry and use Base UI primitives. Their source and theme have not been altered for Hypershell.</p>
      <p>These stories demonstrate common component families. The accompanying Application Showcase combines native components into full example screens with synthetic data.</p>
      <p className="text-muted-foreground">The public Storybook manager preview is subject to the site's inherited CSP. Standalone story pages are available from the workbench landing.</p>
    </CardContent>
  </Card>
}
const meta={title:"Workbench/Introduction",component:Welcome,parameters:{layout:"centered"},tags:["autodocs"]} satisfies Meta<typeof Welcome>
export default meta
type Story=StoryObj<typeof meta>
export const Reference:Story={}
