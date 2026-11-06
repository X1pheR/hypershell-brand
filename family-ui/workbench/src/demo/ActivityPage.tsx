import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { activity } from "./data"

export function ActivityPage() {
  return <><div><p className="text-sm text-muted-foreground">Workspace / Activity</p><h1 className="mt-1 text-2xl font-semibold">Activity timeline</h1><p className="mt-1 text-sm text-muted-foreground">Illustrative events from the demo workspace.</p></div>
    <Card><CardHeader><CardTitle>Recent events</CardTitle><CardDescription>Records are fictional and are not sourced from a server.</CardDescription></CardHeader><CardContent><Table><TableHeader><TableRow><TableHead>Actor</TableHead><TableHead>Event</TableHead><TableHead>Category</TableHead><TableHead>When</TableHead></TableRow></TableHeader><TableBody>{activity.map(event => <TableRow key={event.who}><TableCell className="font-medium">{event.who}</TableCell><TableCell>{event.action}</TableCell><TableCell><Badge variant="outline">{event.kind}</Badge></TableCell><TableCell className="text-muted-foreground">{event.time}</TableCell></TableRow>)}</TableBody></Table></CardContent></Card>
  </>
}
