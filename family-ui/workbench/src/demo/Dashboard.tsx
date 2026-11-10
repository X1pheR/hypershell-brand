import { ArrowDownRight, ArrowUpRight, CalendarDays, CircleCheck, Clock3, Plus, Users } from "lucide-react"
import { Link } from "react-router"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress, ProgressLabel, ProgressValue } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { activity, members } from "./data"

const metrics = [
  { label: "Total members", value: members.length.toString(), trend: "+12.8%", up: true, icon: Users },
  { label: "Active members", value: members.filter(m => m.status === "Active").length.toString(), trend: "+8.2%", up: true, icon: CircleCheck },
  { label: "Pending invitations", value: members.filter(m => m.status === "Invited").length.toString(), trend: "2 waiting", up: false, icon: Clock3 },
  { label: "Reviews completed", value: "24", trend: "+4 this week", up: true, icon: CalendarDays },
]
const weeks = [34, 50, 42, 68, 55, 74, 65, 82, 70, 95, 78, 88]

export function Dashboard() {
  return <>
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div className="space-y-1"><div className="text-sm text-muted-foreground">Workspace / Overview</div><h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Good morning, Olivia</h1><p className="text-sm text-muted-foreground">Here's what's happening in your workspace today.</p></div>
      <Button render={<Link to="/members" />}><Plus /> Invite team member</Button>
    </div>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map(({ label, value, trend, up, icon: Icon }) => <Card key={label}>
        <CardHeader className="flex flex-row items-center justify-between"><CardDescription>{label}</CardDescription><Icon className="size-4 text-muted-foreground" /></CardHeader>
        <CardContent className="flex items-end justify-between gap-3"><div className="text-3xl font-semibold tabular-nums">{value}</div><Badge variant={up ? "secondary" : "outline"}>{up ? <ArrowUpRight /> : <ArrowDownRight />}{trend}</Badge></CardContent>
      </Card>)}
    </div>
    <div className="grid gap-5 xl:grid-cols-[1.6fr_1fr]">
      <Card>
        <CardHeader><CardTitle>Workspace activity</CardTitle><CardDescription>Illustrative weekly activity, not real telemetry.</CardDescription></CardHeader>
        <CardContent>
          <div role="img" aria-label="Synthetic activity chart showing a gradual increase over twelve weeks" className="flex h-48 items-end gap-2 rounded-xl border-b border-border px-2 py-2 sm:gap-4">
            {weeks.map((v, i) => <div key={i} className="flex flex-1 flex-col items-center gap-2" title={`Week ${i + 1}: ${v} activity units`}><div className="w-full rounded-t-md bg-primary/80" style={{ height: `${v * 1.55}px` }} /><span className="text-[10px] text-muted-foreground">{i % 2 === 0 ? `W${i + 1}` : ""}</span></div>)}
          </div>
          <div className="mt-4 flex items-center justify-between text-sm"><span className="text-muted-foreground">Last 12 weeks</span><Badge variant="secondary">+21.6% vs previous period</Badge></div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Project progress</CardTitle><CardDescription>Four fictional example initiatives</CardDescription></CardHeader>
        <CardContent className="space-y-5">
          {[
            ["Design system review", 86], ["Accessibility audit", 62], ["Reporting workspace", 44], ["Team onboarding", 92]
          ].map(([label, value]) => <Progress key={label} value={Number(value)} className="gap-2"><ProgressLabel>{label}</ProgressLabel><ProgressValue /></Progress>)}
          <Separator />
          <div className="text-xs text-muted-foreground">Progress values are fixed demonstration data.</div>
        </CardContent>
      </Card>
    </div>
    <Card>
      <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-3"><div><CardTitle>Recent activity</CardTitle><CardDescription>Updates across the example workspace</CardDescription></div><Button variant="outline" size="sm" render={<Link to="/activity" />}>View all</Button></CardHeader>
      <CardContent className="divide-y">
        {activity.map((entry, i) => <div className="flex flex-wrap items-center justify-between gap-3 py-3 first:pt-0 last:pb-0" key={entry.who}><div className="flex items-center gap-3"><div className="grid size-9 shrink-0 place-items-center rounded-full bg-muted text-xs font-semibold">{entry.who.split(" ").map(n=>n[0]).join("")}</div><div className="text-sm"><span className="font-medium">{entry.who}</span><p className="text-muted-foreground">{entry.action}</p></div></div><div className="flex items-center gap-2"><Badge variant="outline">{entry.kind}</Badge><span className="min-w-18 text-right text-xs text-muted-foreground">{i===0?"Now":entry.time}</span></div></div>)}
      </CardContent>
    </Card>
  </>
}
