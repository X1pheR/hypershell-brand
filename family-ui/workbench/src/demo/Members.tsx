import { useMemo, useState } from "react"
import { CheckCircle2, Search, UserPlus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { members as seed, type Member } from "./data"

function statusVariant(status: Member["status"]): "secondary" | "outline" | "destructive" {
  return status === "Active" ? "secondary" : status === "Invited" ? "outline" : "destructive"
}
export function Members() {
  const [rows, setRows] = useState(seed)
  const [query, setQuery] = useState("")
  const [status, setStatus] = useState("All")
  const [sort, setSort] = useState("name")
  const [email, setEmail] = useState("")
  const [role, setRole] = useState<Member["role"]>("Viewer")
  const [open, setOpen] = useState(false)
  const [notice, setNotice] = useState("")
  const [selected, setSelected] = useState<Member | null>(null)
  const filtered = useMemo(() => rows.filter(m =>
    (status === "All" || m.status === status) &&
    `${m.name} ${m.email}`.toLowerCase().includes(query.toLowerCase())
  ).sort((a, b) => sort === "joined" ? b.joined.localeCompare(a.joined) : a.name.localeCompare(b.name)), [rows, query, status, sort])
  function invite(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!email.trim()) return
    const entry = { id: `M-${Date.now()}`, name: email.split("@")[0], email, role, status: "Invited" as const, joined: new Date().toISOString().slice(0,10) }
    setRows(prev => [entry, ...prev])
    setNotice(`Invitation prepared for ${email} (demo only — no email was sent).`)
    setEmail("")
    setOpen(false)
  }
  return <>
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div><p className="mb-1 text-sm text-muted-foreground">Workspace / People</p><h1 className="text-2xl font-semibold tracking-tight">Team members</h1><p className="mt-1 text-sm text-muted-foreground">Search, filter, view and invite fictional users.</p></div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger render={<Button />}><UserPlus /> Invite member</DialogTrigger>
        <DialogContent>
          <DialogHeader><DialogTitle>Invite a team member</DialogTitle><DialogDescription>Try the native dialog and input controls. No invitation will actually be sent.</DialogDescription></DialogHeader>
          <form id="invite-form" onSubmit={invite} className="space-y-4">
            <div className="space-y-2"><Label htmlFor="invite-email">Email address</Label><Input id="invite-email" type="email" placeholder="name@example.test" required value={email} onChange={e => setEmail(e.target.value)} /></div>
            <div className="space-y-2"><Label htmlFor="invite-role">Role</Label><NativeSelect id="invite-role" className="w-full" value={role} onChange={e => setRole(e.target.value as Member["role"])}><NativeSelectOption>Viewer</NativeSelectOption><NativeSelectOption>Editor</NativeSelectOption><NativeSelectOption>Owner</NativeSelectOption></NativeSelect></div>
          </form>
          <DialogFooter><DialogClose render={<Button variant="outline" />}>Cancel</DialogClose><Button type="submit" form="invite-form">Add to demo</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
    {notice && <div role="status" className="flex items-center gap-2 rounded-lg border bg-secondary/50 p-3 text-sm"><CheckCircle2 className="size-4" />{notice}</div>}
    <Card>
      <CardHeader><CardTitle>Members <span className="ml-2 text-sm text-muted-foreground">({rows.length})</span></CardTitle><CardDescription>All records are synthetic and live only in this browser session.</CardDescription></CardHeader>
      <CardContent className="space-y-5">
        <div className="flex flex-wrap gap-3">
          <div className="relative min-w-[210px] flex-1"><Search className="absolute top-2 left-2.5 size-4 text-muted-foreground"/><Input aria-label="Search members" placeholder="Search name or email…" className="pl-9" value={query} onChange={e => setQuery(e.target.value)} /></div>
          <NativeSelect aria-label="Filter by status" value={status} onChange={e=>setStatus(e.target.value)}><NativeSelectOption value="All">All statuses</NativeSelectOption><NativeSelectOption>Active</NativeSelectOption><NativeSelectOption>Invited</NativeSelectOption><NativeSelectOption>Suspended</NativeSelectOption></NativeSelect>
          <NativeSelect aria-label="Sort members" value={sort} onChange={e=>setSort(e.target.value)}><NativeSelectOption value="name">Sort: Name</NativeSelectOption><NativeSelectOption value="joined">Sort: Newest</NativeSelectOption></NativeSelect>
        </div>
        <Table><TableHeader><TableRow><TableHead>Member</TableHead><TableHead>Role</TableHead><TableHead>Status</TableHead><TableHead>Joined</TableHead><TableHead><span className="sr-only">Action</span></TableHead></TableRow></TableHeader>
          <TableBody>{filtered.map(m=><TableRow key={m.id}><TableCell><div className="flex items-center gap-3"><span className="grid size-8 shrink-0 place-items-center rounded-full bg-muted font-semibold">{m.name.slice(0,1).toUpperCase()}</span><div><div className="font-medium">{m.name}</div><div className="text-xs text-muted-foreground">{m.email}</div></div></div></TableCell><TableCell>{m.role}</TableCell><TableCell><Badge variant={statusVariant(m.status)}>{m.status}</Badge></TableCell><TableCell className="text-muted-foreground">{m.joined}</TableCell><TableCell><Button size="sm" variant="ghost" onClick={()=>setSelected(m)}>Details</Button></TableCell></TableRow>)}</TableBody>
        </Table>
        {filtered.length === 0 && <p role="status" className="rounded-lg bg-muted p-8 text-center text-sm text-muted-foreground">No members match your search and filters.</p>}
        <p className="text-xs text-muted-foreground">Showing {filtered.length} of {rows.length} fictional users.</p>
      </CardContent>
    </Card>
    <Dialog open={selected !== null} onOpenChange={open => {if (!open) setSelected(null)}}>
      <DialogContent><DialogHeader><DialogTitle>Member details</DialogTitle><DialogDescription>Sample record • {selected?.id}</DialogDescription></DialogHeader>{selected && <dl className="grid grid-cols-3 gap-4 text-sm"><dt className="text-muted-foreground">Name</dt><dd className="col-span-2 font-medium">{selected.name}</dd><dt className="text-muted-foreground">Email</dt><dd className="col-span-2">{selected.email}</dd><dt className="text-muted-foreground">Role</dt><dd className="col-span-2">{selected.role}</dd><dt className="text-muted-foreground">Status</dt><dd className="col-span-2"><Badge variant={statusVariant(selected.status)}>{selected.status}</Badge></dd></dl>}<DialogFooter><DialogClose render={<Button />}>Close</DialogClose></DialogFooter></DialogContent>
    </Dialog>
  </>
}
