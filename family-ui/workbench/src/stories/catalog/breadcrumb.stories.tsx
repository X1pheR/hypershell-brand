import type { Meta, StoryObj } from "@storybook/react-vite"
import * as C from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"

/** Official shadcn Base UI source; example compositions are test fixtures, not custom UI components. */
const meta = { title: "Catalog/Breadcrumb", component: C.Breadcrumb, tags: ["autodocs"], parameters: { layout: "padded", docs: { description: { component: "Unmodified native shadcn Base UI component. Examine supported variants and accessibility behavior before composing app screens." } } } } satisfies Meta<typeof C.Breadcrumb>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { render: () => <div className="max-w-3xl p-6 text-foreground"><C.Breadcrumb><C.BreadcrumbList><C.BreadcrumbItem><C.BreadcrumbLink href="#">Home</C.BreadcrumbLink></C.BreadcrumbItem><C.BreadcrumbSeparator/><C.BreadcrumbItem><C.BreadcrumbPage>Overview</C.BreadcrumbPage></C.BreadcrumbItem></C.BreadcrumbList></C.Breadcrumb></div> }

export const Variations: Story = { render: () => <div className="max-w-3xl p-6 text-foreground"><C.Breadcrumb><C.BreadcrumbList><C.BreadcrumbItem><C.BreadcrumbLink href="#">Workspace</C.BreadcrumbLink></C.BreadcrumbItem><C.BreadcrumbSeparator/><C.BreadcrumbItem><C.BreadcrumbLink href="#">Teams</C.BreadcrumbLink></C.BreadcrumbItem><C.BreadcrumbSeparator/><C.BreadcrumbItem><C.BreadcrumbPage>Members</C.BreadcrumbPage></C.BreadcrumbItem></C.BreadcrumbList></C.Breadcrumb></div> }
