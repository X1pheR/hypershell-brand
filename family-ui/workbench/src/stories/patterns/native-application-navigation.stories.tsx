import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, waitFor, within } from "@storybook/test"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuButton,
  SidebarMenuItem, SidebarProvider, SidebarTrigger, useSidebar,
} from "@/components/ui/sidebar"

// Neutral user goals: navigate, know the current view, and open/close responsive
// navigation. This story does not re-create any vanilla Hypershell app shell.
const pages = ["Overview", "Records", "Reports", "Help"] as const
type Page = (typeof pages)[number]
function NavigationContext({ selected }: { selected: Page }) {
  const { state, isMobile, openMobile } = useSidebar()
  return <p role="status" className="text-sm text-muted-foreground">
    Current view: {selected}. Navigation: {isMobile ? openMobile ? "mobile open" : "mobile closed" : state}.
  </p>
}

function PageMenuButton({ page, selected, onSelect }: {
  page: Page, selected: Page, onSelect: (page: Page) => void
}) {
  const { isMobile } = useSidebar()
  // The full label is already visible in the mobile Sheet. A hidden tooltip
  // adds an unnecessary dismissable layer and can consume its first Escape.
  return <SidebarMenuButton isActive={selected === page}
    tooltip={isMobile ? undefined : page} onClick={() => onSelect(page)}>
    {page}
  </SidebarMenuButton>
}

function NativeShellResearch({ initiallyExpanded }: { initiallyExpanded: boolean }) {
  const [selected, setSelected] = useState<Page>("Overview")
  return <SidebarProvider defaultOpen={initiallyExpanded}>
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-3 text-sm font-semibold">Example workspace</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Fictional views</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {pages.map(page => <SidebarMenuItem key={page}>
                <PageMenuButton page={page} selected={selected} onSelect={setSelected} />
              </SidebarMenuItem>)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="text-xs">No live navigation or authentication.</SidebarFooter>
    </Sidebar>
    <SidebarInset className="min-w-0">
      <header className="flex flex-wrap items-center gap-3 border-b px-4 py-3">
        <SidebarTrigger aria-label="Toggle navigation" />
        <strong>Native application navigation</strong>
        <Badge variant="outline">Synthetic</Badge>
      </header>
      <section className="min-w-0 p-4">
        <Card className="min-w-0">
          <CardHeader><CardTitle>{selected}</CardTitle>
            <CardDescription>Official Sidebar with contextual active page and responsive native Sheet on mobile.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <NavigationContext selected={selected} />
            <p className="text-sm">No product routes, custom vanilla sidebar, auth flow, server mutation or brand styling.</p>
          </CardContent>
        </Card>
      </section>
    </SidebarInset>
  </SidebarProvider>
}

const meta = {
  title: "Patterns/Native application shell and navigation",
  component: NativeShellResearch,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen", docs: { description: { component:
    "S01/S12 function-first alternative to a custom app shell, using the official SidebarProvider, Sidebar and SidebarInset. Responsive Sheet and Ctrl+B are upstream behavior; acceptance requires studying mobile focus, persistence and product routes before reuse." } } },
} satisfies Meta<typeof NativeShellResearch>
export default meta
type Story = StoryObj<typeof meta>

export const ExpandedNavigation: Story = { args: { initiallyExpanded: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("status")).toHaveTextContent("Current view: Overview")
    if (window.matchMedia("(max-width: 767px)").matches) {
      await waitFor(() => expect(canvas.getByRole("status")).toHaveTextContent("Navigation: mobile closed"))
      await userEvent.click(canvas.getByRole("button", { name: "Toggle navigation" }))
      const drawer = await within(document.body).findByRole("dialog", { name: "Sidebar" })
      await userEvent.click(within(drawer).getByRole("button", { name: "Reports" }))
      await userEvent.keyboard("{Escape}")
      await waitFor(() => expect(canvas.getByRole("status")).toHaveTextContent("Current view: Reports"))
      await expect(canvas.getByRole("status")).toHaveTextContent("Navigation: mobile closed")
    } else {
      await userEvent.click(canvas.getByRole("button", { name: "Reports" }))
      await expect(canvas.getByRole("status")).toHaveTextContent("Current view: Reports")
    }
  } }
export const CollapsedNavigation: Story = { args: { initiallyExpanded: false },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    if (window.matchMedia("(max-width: 767px)").matches) {
      await waitFor(() => expect(canvas.getByRole("status")).toHaveTextContent("Navigation: mobile closed"))
      await userEvent.click(canvas.getByRole("button", { name: "Toggle navigation" }))
      const drawer = await within(document.body).findByRole("dialog", { name: "Sidebar" })
      await waitFor(() => expect(drawer).toBeVisible())
      // Target a real focusable Sheet item: untargeted keyboard events in the
      // Storybook interaction runner can be delivered outside the modal frame.
      await userEvent.type(within(drawer).getByRole("button", { name: "Overview" }), "{Escape}")
      // Base UI keeps the page inert until its modal Sheet has finished closing.
      // Assert on the live dialog first; only query background roles after release.
      await waitFor(() => expect(within(document.body).queryByRole("dialog", { name: "Sidebar" })).not.toBeInTheDocument())
      await waitFor(() => expect(canvas.getByRole("status")).toHaveTextContent("Navigation: mobile closed"))
      await waitFor(() => expect(canvas.getByRole("button", { name: "Toggle navigation" })).toHaveFocus())
    } else {
      await expect(canvas.getByRole("status")).toHaveTextContent("Navigation: collapsed")
      await userEvent.click(canvas.getByRole("button", { name: "Toggle navigation" }))
      await expect(canvas.getByRole("status")).toHaveTextContent("Navigation: expanded")
    }
  } }
