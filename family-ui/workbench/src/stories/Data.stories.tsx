import type { Meta, StoryObj } from "@storybook/react-vite"
import { Bell, CircleAlert } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress, ProgressLabel, ProgressValue } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

function NativeData(){
 return <section className="grid w-full max-w-4xl gap-5 p-5 lg:grid-cols-2">
  <Card><CardHeader><CardTitle>Table & status</CardTitle><CardDescription>Records are illustrative</CardDescription></CardHeader><CardContent><Table><TableHeader><TableRow><TableHead>User</TableHead><TableHead>Access</TableHead><TableHead>Status</TableHead></TableRow></TableHeader><TableBody>
  {[["Olivia","Owner","Active"],["Noah","Editor","Active"],["Ava","Viewer","Invited"]].map(([name,role,status])=><TableRow key={name}><TableCell><div className="flex items-center gap-2"><Avatar><AvatarFallback>{name[0]}</AvatarFallback></Avatar>{name}</div></TableCell><TableCell>{role}</TableCell><TableCell><Badge variant={status==="Active"?"secondary":"outline"}>{status}</Badge></TableCell></TableRow>)}
  </TableBody></Table></CardContent></Card>
  <Card><CardHeader><CardTitle>Progress & loading</CardTitle><CardDescription>Indicators and skeletons</CardDescription></CardHeader><CardContent className="space-y-5"><Progress value={72}><ProgressLabel>Review completion</ProgressLabel><ProgressValue/></Progress>
  <div className="flex items-center gap-3"><Skeleton className="size-11 rounded-full"/><div className="flex-1 space-y-2"><Skeleton className="h-3 w-1/3"/><Skeleton className="h-3 w-3/4"/></div></div>
  <div className="flex flex-wrap gap-2"><Badge>Default</Badge><Badge variant="outline">Outline</Badge><Badge variant="destructive">Destructive</Badge></div>
  </CardContent></Card>
  <Card><CardHeader><CardTitle>Alerts</CardTitle><CardDescription>Semantic feedback</CardDescription></CardHeader><CardContent className="space-y-3"><Alert><Bell/><AlertTitle>New message</AlertTitle><AlertDescription>This alert is only a UI example.</AlertDescription></Alert><Alert variant="destructive"><CircleAlert/><AlertTitle>Validation failed</AlertTitle><AlertDescription>Example error, no backend request.</AlertDescription></Alert></CardContent></Card>
  <Card><CardHeader><CardTitle>Date picker</CardTitle><CardDescription>Native calendar</CardDescription></CardHeader><CardContent><Calendar mode="single" selected={new Date(2026,10,6)} className="rounded-lg border"/></CardContent></Card>
 </section>
}
const meta={title:"Native/Data/Tables & Feedback",component:NativeData,parameters:{layout:"fullscreen"},tags:["autodocs"]} satisfies Meta<typeof NativeData>
export default meta
type Story=StoryObj<typeof meta>
export const Examples:Story={}
