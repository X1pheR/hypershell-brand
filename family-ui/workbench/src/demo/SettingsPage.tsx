import { useState } from "react"
import { CheckCircle2, LockKeyhole } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

export function SettingsPage() {
 const [saved, setSaved] = useState(false)
 return <>
   <div><p className="text-sm text-muted-foreground">Workspace / Settings</p><h1 className="mt-1 text-2xl font-semibold">Settings</h1><p className="mt-1 text-sm text-muted-foreground">Try a form, tabs and switches. Saves remain local to this page.</p></div>
   <Tabs defaultValue="general" className="gap-5"><TabsList><TabsTrigger value="general">General</TabsTrigger><TabsTrigger value="notifications">Notifications</TabsTrigger><TabsTrigger value="security">Security</TabsTrigger></TabsList>
   <TabsContent value="general"><Card><CardHeader><CardTitle>Workspace profile</CardTitle><CardDescription>Native fields with sample values.</CardDescription></CardHeader><CardContent>
      <form className="max-w-xl space-y-5" onSubmit={e=>{e.preventDefault();setSaved(true)}}>
       <div className="space-y-2"><Label htmlFor="workspace-name">Workspace name</Label><Input id="workspace-name" defaultValue="Acme Workspace" required /></div>
       <div className="space-y-2"><Label htmlFor="workspace-email">Contact email</Label><Input id="workspace-email" type="email" defaultValue="hello@example.test" required /></div>
       <div className="space-y-2"><Label htmlFor="workspace-region">Region</Label><NativeSelect id="workspace-region" defaultValue="eu"><NativeSelectOption value="eu">Europe</NativeSelectOption><NativeSelectOption value="us">North America</NativeSelectOption><NativeSelectOption value="ap">Asia Pacific</NativeSelectOption></NativeSelect></div>
       <div className="space-y-2"><Label htmlFor="workspace-description">Description</Label><Textarea id="workspace-description" defaultValue="A sample workspace showcasing native components." rows={3} /></div>
       <Separator /><div className="flex flex-wrap items-center gap-3"><Button type="submit">Save changes</Button>{saved && <span role="status" className="flex items-center gap-2 text-sm text-muted-foreground"><CheckCircle2 className="size-4" />Saved locally (demo only)</span>}</div>
      </form>
    </CardContent></Card></TabsContent>
   <TabsContent value="notifications"><Card><CardHeader><CardTitle>Notifications</CardTitle><CardDescription>Interactive local toggles, no delivery systems attached.</CardDescription></CardHeader><CardContent className="space-y-5">
     {["Email notifications","Weekly digest","Mention alerts"].map((label,i)=><div key={label} className="flex items-center justify-between gap-4 rounded-lg border p-4"><div><Label htmlFor={`setting-${i}`}>{label}</Label><p className="mt-1 text-xs text-muted-foreground">Demo preference only — no messages are sent.</p></div><Switch id={`setting-${i}`} defaultChecked={i!==1} /></div>)}
     <div className="flex items-center gap-3"><Checkbox id="product-updates" defaultChecked/><Label htmlFor="product-updates">Receive product announcements (demo)</Label></div>
   </CardContent></Card></TabsContent>
   <TabsContent value="security"><Card><CardHeader><CardTitle>Security settings</CardTitle><CardDescription>No real account, identity or credential operations.</CardDescription></CardHeader><CardContent><Alert><LockKeyhole /><AlertTitle>Reference mode</AlertTitle><AlertDescription>Authentication and sensitive settings are intentionally disabled. This is a static UI demonstration.</AlertDescription></Alert></CardContent></Card></TabsContent>
   </Tabs>
 </>
}
