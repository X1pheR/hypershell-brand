import { AlertCircle, Bell, ChevronDown, Download, Plus, Search, Settings2 } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress, ProgressLabel, ProgressValue } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

export function ComponentsPage() {
 return <>
  <div><p className="text-sm text-muted-foreground">Workspace / Components</p><h1 className="mt-1 text-2xl font-semibold">Native components</h1><p className="mt-1 text-sm text-muted-foreground">Reusable examples built from the official imported shadcn/Base UI sources. Storybook provides the individual component stories.</p></div>
  <div className="grid gap-5 xl:grid-cols-2">
   <Card><CardHeader><CardTitle>Buttons &amp; actions</CardTitle><CardDescription>Variants, sizes and disabled states</CardDescription></CardHeader><CardContent className="space-y-4">
    <div className="flex flex-wrap items-center gap-2"><Button><Plus /> Create</Button><Button variant="secondary">Secondary</Button><Button variant="outline">Outline</Button><Button variant="ghost">Ghost</Button><Button variant="destructive">Destructive</Button><Button variant="link">Text link</Button></div>
    <Separator/><div className="flex flex-wrap items-center gap-2"><Button size="xs">Extra small</Button><Button size="sm">Small</Button><Button size="lg">Large</Button><Button disabled>Disabled</Button><Tooltip><TooltipTrigger render={<Button variant="outline" size="icon" aria-label="Download example" />}><Download /></TooltipTrigger><TooltipContent>Download example</TooltipContent></Tooltip></div>
    <div className="flex flex-wrap gap-2">{(["default","secondary","outline","destructive"] as const).map(variant=><Badge key={variant} variant={variant}>{variant}</Badge>)}</div>
   </CardContent></Card>
   <Card><CardHeader><CardTitle>Inputs &amp; selections</CardTitle><CardDescription>Common form controls</CardDescription></CardHeader><CardContent className="space-y-4">
    <div className="space-y-2"><Label htmlFor="preview-input">Email address</Label><div className="relative"><Search className="absolute top-2 left-2.5 size-4 text-muted-foreground"/><Input id="preview-input" className="pl-9" placeholder="you@example.test" /></div></div>
    <div className="space-y-2"><Label htmlFor="preview-select">Access level</Label><Select defaultValue="editor"><SelectTrigger id="preview-select" className="w-full"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="viewer">Viewer</SelectItem><SelectItem value="editor">Editor</SelectItem><SelectItem value="owner">Owner</SelectItem></SelectContent></Select></div>
    <div className="flex items-center justify-between"><div className="flex items-center gap-2"><Checkbox id="preview-check" defaultChecked/><Label htmlFor="preview-check">Enabled</Label></div><div className="flex items-center gap-2"><Label htmlFor="preview-switch">Notifications</Label><Switch id="preview-switch" defaultChecked/></div></div>
    <Slider defaultValue={40} aria-label="Example volume"/>
   </CardContent></Card>
   <Card><CardHeader><CardTitle>Feedback &amp; progress</CardTitle><CardDescription>Status indicators, alerts and loading</CardDescription></CardHeader><CardContent className="space-y-5">
     <Alert><Bell/><AlertTitle>New release available</AlertTitle><AlertDescription>Everything here is fictional demonstration content.</AlertDescription></Alert>
     <Alert variant="destructive"><AlertCircle/><AlertTitle>Example validation error</AlertTitle><AlertDescription>This shows a destructive alert variant, not an actual system error.</AlertDescription></Alert>
     <Progress value={64}><ProgressLabel>Project completion</ProgressLabel><ProgressValue /></Progress>
     <div className="flex items-center gap-3"><Skeleton className="size-9 rounded-full"/><div className="flex-1 space-y-2"><Skeleton className="h-3 w-1/3"/><Skeleton className="h-3 w-2/3"/></div></div>
   </CardContent></Card>
   <Card><CardHeader><CardTitle>Overlays &amp; navigation</CardTitle><CardDescription>Dialog, tabs, accordion and avatar</CardDescription></CardHeader><CardContent className="space-y-4">
    <div className="flex items-center gap-3"><Avatar><AvatarFallback>OC</AvatarFallback></Avatar><span className="text-sm">Olivia Carter</span>
      <Dialog><DialogTrigger render={<Button variant="outline" size="sm" className="ml-auto" />}><Settings2/> Open dialog</DialogTrigger><DialogContent><DialogHeader><DialogTitle>Native dialog example</DialogTitle><DialogDescription>Accessible dialog behavior is supplied by Base UI.</DialogDescription></DialogHeader><p className="text-sm">Try Escape, focus cycling and the close control.</p><DialogFooter><DialogClose render={<Button />}>Done</DialogClose></DialogFooter></DialogContent></Dialog>
    </div>
    <Tabs defaultValue="first"><TabsList><TabsTrigger value="first">Overview</TabsTrigger><TabsTrigger value="second">Details</TabsTrigger></TabsList><TabsContent value="first" className="rounded-lg border p-3 text-sm text-muted-foreground">First tab panel</TabsContent><TabsContent value="second" className="rounded-lg border p-3 text-sm">Second tab panel</TabsContent></Tabs>
    <Accordion><AccordionItem value="example"><AccordionTrigger>Expand sample details <ChevronDown className="sr-only"/></AccordionTrigger><AccordionContent>This is the native Base UI accordion interaction.</AccordionContent></AccordionItem></Accordion>
   </CardContent></Card>
  </div>
 </>
}
