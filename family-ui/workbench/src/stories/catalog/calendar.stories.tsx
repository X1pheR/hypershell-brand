import type { Meta, StoryObj } from "@storybook/react-vite"
import * as C from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
// Preserve the visible day number in the accessible name (WCAG 2.5.3).
const labelDayButton = (date: Date, modifiers: { selected?: boolean; today?: boolean; disabled?: boolean }) =>
  `${date.getDate()} — ${date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}${modifiers.selected ? ", selected" : ""}${modifiers.today ? ", today" : ""}${modifiers.disabled ? ", unavailable" : ""}`
const meta={title:"Catalog/Calendar",component:C.Calendar,tags:["autodocs"],parameters:{layout:"padded"}} satisfies Meta<typeof C.Calendar>
export default meta
type Story=StoryObj<typeof meta>
export const Default:Story={render:()=> <div className="max-w-3xl p-6 text-foreground"><C.Calendar mode="single" selected={new Date(2026,10,6)} labels={{ labelDayButton }}/></div>}
export const Variants:Story={render:()=> <div className="max-w-3xl p-6 text-foreground"><C.Calendar mode="single" numberOfMonths={2} labels={{ labelDayButton }}/></div>}
