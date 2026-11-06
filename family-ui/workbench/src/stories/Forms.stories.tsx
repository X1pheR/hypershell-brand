import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

function NativeForms() {
 const [saved, setSaved] = useState(false)
 return <form onSubmit={e=>{e.preventDefault();setSaved(true)}} className="grid w-full max-w-xl gap-5 rounded-xl border bg-card p-5 text-card-foreground">
  <h2 className="text-base font-semibold">Form controls</h2>
  <div className="space-y-2"><Label htmlFor="story-name">Project name</Label><Input id="story-name" placeholder="Example project" required/></div>
  <div className="space-y-2"><Label htmlFor="story-description">Description</Label><Textarea id="story-description" placeholder="What is this project about?"/></div>
  <div className="space-y-2"><Label htmlFor="story-native-select">Native select</Label><NativeSelect id="story-native-select"><NativeSelectOption>Europe</NativeSelectOption><NativeSelectOption>North America</NativeSelectOption></NativeSelect></div>
  <div className="space-y-2"><Label htmlFor="story-select">Base UI select</Label><Select defaultValue="viewer"><SelectTrigger id="story-select" aria-label="Base UI select" className="w-full"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="viewer">Viewer</SelectItem><SelectItem value="editor">Editor</SelectItem><SelectItem value="owner">Owner</SelectItem></SelectContent></Select></div>
  <div className="flex items-center gap-3"><Checkbox id="story-checkbox" defaultChecked/><Label htmlFor="story-checkbox">Accept terms (demo)</Label></div>
  <div className="flex items-center justify-between gap-3"><Label htmlFor="story-switch">Send notifications</Label><Switch id="story-switch" defaultChecked /></div>
  <div className="space-y-3"><Label>Priority</Label><RadioGroup defaultValue="normal" aria-label="Priority" className="flex flex-wrap gap-4">{["low","normal","high"].map(value=><div className="flex items-center gap-2" key={value}><RadioGroupItem value={value} id={`prio-${value}`} aria-label={`Priority ${value}`} /><Label htmlFor={`prio-${value}`}>{value}</Label></div>)}</RadioGroup></div>
  <div className="space-y-2"><label className="grid gap-2 text-sm">Volume<Slider defaultValue={50}/></label></div>
  <div className="flex items-center gap-3"><Button type="submit">Save form</Button>{saved && <span role="status" className="text-sm text-muted-foreground">Saved locally</span>}</div>
 </form>
}
const meta={title:"Native/Forms/Inputs & Selection",component:NativeForms,parameters:{layout:"padded"},tags:["autodocs"]} satisfies Meta<typeof NativeForms>
export default meta
type Story=StoryObj<typeof meta>
export const InteractiveForm:Story={}
