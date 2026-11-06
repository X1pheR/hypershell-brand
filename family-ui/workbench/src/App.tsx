import { useEffect, useState } from "react"
import { HashRouter, NavLink, Navigate, Route, Routes } from "react-router"
import { Activity, BarChart3, Bell, Blocks, LayoutDashboard, Menu, Moon, Settings, Sun, Users, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Dashboard } from "@/demo/Dashboard"
import { Members } from "@/demo/Members"
import { SettingsPage } from "@/demo/SettingsPage"
import { ComponentsPage } from "@/demo/ComponentsPage"
import { ActivityPage } from "@/demo/ActivityPage"

const links = [
  { to: "/", label: "Overview", icon: LayoutDashboard },
  { to: "/members", label: "Team members", icon: Users },
  { to: "/activity", label: "Activity", icon: Activity },
  { to: "/components", label: "Components", icon: Blocks },
  { to: "/settings", label: "Settings", icon: Settings },
]
function NavItems({ close }: { close: () => void }) {
  return (
    <nav aria-label="Application pages" className="flex flex-col gap-1">
      {links.map(({ to, label, icon: Icon }) => (
        <NavLink key={to} to={to} end={to === "/"} onClick={close}
          className={({ isActive }) => `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent/70 hover:text-foreground"}`}>
          <Icon className="size-4" aria-hidden />{label}
        </NavLink>
      ))}
    </nav>
  )
}
function Shell() {
  const [theme, setTheme] = useState(() => localStorage.getItem("native-workbench-theme") === "dark" ? "dark" : "light")
  const [mobileOpen, setMobileOpen] = useState(false)
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
    localStorage.setItem("native-workbench-theme", theme)
  }, [theme])
  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background text-foreground">
        <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r bg-sidebar px-4 py-5 lg:flex">
          <div className="flex items-center gap-3 px-3">
            <div className="grid size-9 place-items-center rounded-lg bg-primary text-primary-foreground"><BarChart3 className="size-5" /></div>
            <div><div className="text-sm font-semibold">Acme Workspace</div><div className="text-xs text-muted-foreground">Native UI reference</div></div>
          </div>
          <Separator className="my-5" />
          <div className="px-3 pb-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Workspace</div>
          <NavItems close={() => setMobileOpen(false)} />
          <div className="mt-auto rounded-xl border bg-card p-3 text-xs text-muted-foreground">
            <div className="mb-1 font-medium text-foreground">UI reference • v0</div>
            Synthetic data. Only official shadcn/Base UI components. No Hypershell theme or product integration.
          </div>
        </aside>
        {mobileOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <button aria-label="Close navigation" className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
            <aside className="absolute inset-y-0 left-0 w-64 space-y-5 border-r bg-sidebar p-5">
              <div className="flex items-center justify-between font-semibold">Acme Workspace<Button variant="ghost" size="icon" aria-label="Close menu" onClick={() => setMobileOpen(false)}><X /></Button></div>
              <NavItems close={() => setMobileOpen(false)} />
            </aside>
          </div>
        )}
        <div className="min-w-0 lg:pl-64">
          <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-3 border-b bg-background/95 px-4 backdrop-blur sm:px-7">
            <div className="flex items-center gap-3">
              <Button className="lg:hidden" variant="outline" size="icon" aria-label="Open navigation" onClick={() => setMobileOpen(true)}><Menu /></Button>
              <div><span className="text-sm font-semibold">Application Showcase</span><span className="ml-2 hidden text-xs text-muted-foreground sm:inline">Native shadcn/ui + Base UI</span></div>
              <Badge variant="outline" className="hidden sm:inline-flex">Reference</Badge>
            </div>
            <div className="flex items-center gap-1.5">
              <Tooltip><TooltipTrigger render={<Button variant="ghost" size="icon" aria-label={theme === "dark" ? "Use light theme" : "Use dark theme"} onClick={() => setTheme(theme === "dark" ? "light" : "dark")} />}>{theme === "dark" ? <Sun /> : <Moon />}</TooltipTrigger><TooltipContent>Toggle light/dark</TooltipContent></Tooltip>
              <Tooltip><TooltipTrigger render={<Button variant="ghost" size="icon" aria-label="Notifications (demo only)" /> }><Bell /></TooltipTrigger><TooltipContent>No live notifications</TooltipContent></Tooltip>
              <span aria-label="Demo user" className="ml-2 grid size-8 place-items-center rounded-full bg-secondary text-xs font-semibold">OC</span>
            </div>
          </header>
          <main className="mx-auto w-full max-w-7xl space-y-6 p-4 pb-16 sm:p-7">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/members" element={<Members />} />
              <Route path="/activity" element={<ActivityPage />} />
              <Route path="/components" element={<ComponentsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <footer className="mx-auto max-w-7xl border-t px-4 py-5 text-xs text-muted-foreground sm:px-7">Native reference · Synthetic examples only · No backend connection · <a className="underline underline-offset-4" href="../storybook/">Storybook</a></footer>
        </div>
      </div>
    </TooltipProvider>
  )
}
export default function App() { return <HashRouter><Shell /></HashRouter> }
