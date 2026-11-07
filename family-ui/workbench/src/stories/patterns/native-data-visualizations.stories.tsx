import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, within } from "@storybook/test"
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Line, LineChart,
  Pie, PieChart, PolarAngleAxis, PolarGrid, Radar, RadarChart, RadialBar,
  RadialBarChart, Scatter, ScatterChart, XAxis, YAxis,
} from "recharts"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Native shadcn Chart + pinned Recharts only. One synthetic and internally
// consistent dataset; none of these figures represent Hypershell telemetry.
const days = [
  { day: "Mon", accepted: 16, pending: 4, duration: 42 },
  { day: "Tue", accepted: 22, pending: 5, duration: 38 },
  { day: "Wed", accepted: 19, pending: 3, duration: 47 },
  { day: "Thu", accepted: 27, pending: 7, duration: 34 },
  { day: "Fri", accepted: 24, pending: 6, duration: 37 },
  { day: "Sat", accepted: 30, pending: 4, duration: 31 },
  { day: "Sun", accepted: 26, pending: 5, duration: 36 },
] as const

const totals = [
  { category: "Accepted", count: 164, fill: "var(--chart-1)" },
  { category: "Pending", count: 34, fill: "var(--chart-2)" },
] as const
const categories = [
  { category: "Forms", count: 31 },
  { category: "Tables", count: 24 },
  { category: "Navigation", count: 19 },
  { category: "Feedback", count: 15 },
] as const
const dimensions = [
  { area: "Clarity", optionA: 78, optionB: 60 },
  { area: "Keyboard", optionA: 74, optionB: 83 },
  { area: "Touch", optionA: 62, optionB: 75 },
  { area: "Density", optionA: 81, optionB: 61 },
  { area: "Recovery", optionA: 69, optionB: 72 },
] as const

const config = {
  accepted: { label: "Accepted", color: "var(--chart-1)" },
  pending: { label: "Pending", color: "var(--chart-2)" },
  duration: { label: "Duration (ms)", color: "var(--chart-3)" },
  count: { label: "Examples", color: "var(--chart-1)" },
  share: { label: "Accepted (%)", color: "var(--chart-1)" },
  optionA: { label: "Option A", color: "var(--chart-1)" },
  optionB: { label: "Option B", color: "var(--chart-2)" },
} satisfies ChartConfig

type Kind =
  | "line" | "area" | "stacked" | "horizontal" | "donut"
  | "radar" | "radial" | "scatter" | "interactive" | "empty"

function ReadableData({ kind }: { kind: Kind }) {
  if (kind === "empty") return null
  const rows: Array<Record<string, string | number>> =
    kind === "donut" || kind === "radial"
      ? totals.map(({ category, count }) => ({ category, count }))
      : kind === "horizontal"
        ? categories.map(row => ({ ...row }))
        : kind === "radar"
          ? dimensions.map(row => ({ ...row }))
          : days.map(row => ({ ...row }))
  const columns = Object.keys(rows[0])
  return (
    <details className="mt-3 rounded-md border px-3 py-2 text-sm" data-testid="chart-data">
      <summary className="cursor-pointer font-medium">View exact example data</summary>
      <Table>
        <caption className="sr-only">Synthetic numeric values used in this chart</caption>
        <TableHeader><TableRow>{columns.map(c => <TableHead scope="col" key={c}>{c}</TableHead>)}</TableRow></TableHeader>
        <TableBody>{rows.map((row, i) => <TableRow key={i}>{columns.map(c => <TableCell key={c}>{row[c]}</TableCell>)}</TableRow>)}</TableBody>
      </Table>
    </details>
  )
}

function NativeChartResearch({ kind }: { kind: Kind }) {
  const [series, setSeries] = useState<"accepted" | "pending">("accepted")
  const title: Record<Kind, string> = {
    line: "Line · ordered trend",
    area: "Area · volume over time",
    stacked: "Bar · additive status breakdown",
    horizontal: "Horizontal bar · category comparison",
    donut: "Donut · part of one total",
    radar: "Radar · multi-axis comparison",
    radial: "Radial bar · one fraction",
    scatter: "Scatter · relationship between readings",
    interactive: "Interactive chart · switch displayed measure",
    empty: "Chart state · no measurements",
  }
  return (
    <div className="mx-auto w-full max-w-4xl min-w-0 space-y-4 p-4">
      <Card className="min-w-0">
        <CardHeader>
          <CardTitle>{title[kind]}</CardTitle>
          <CardDescription>
            Native shadcn Chart with pinned Recharts. Fictional measurements, no live infrastructure
            or product API. Comparison example only; no branded palette or shared chart wrapper.
          </CardDescription>
        </CardHeader>
        <CardContent className="min-w-0">
          {kind === "interactive" && (
            <div role="group" aria-label="Displayed measure" className="mb-4 flex flex-wrap gap-2">
              {(["accepted", "pending"] as const).map(v => (
                <Button key={v} size="sm" variant={series === v ? "default" : "outline"}
                  aria-pressed={series === v} onClick={() => setSeries(v)}>
                  {v === "accepted" ? "Accepted" : "Pending"}
                </Button>
              ))}
            </div>
          )}
          {kind === "empty" ? (
            <div role="status" className="rounded-md border border-dashed p-8 text-center text-sm text-muted-foreground">
              No measurements available. No chart or fabricated zero readings are displayed.
            </div>
          ) : (
            <figure aria-label={title[kind]} className="min-w-0">
              <ChartContainer config={config} className="h-64 w-full min-w-0 aspect-auto">
                {kind === "line" ? (
                  <LineChart accessibilityLayer data={days}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="day" tickLine={false} axisLine={false} />
                    <YAxis width={34} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line dataKey="duration" type="monotone" stroke="var(--color-duration)" strokeWidth={2} dot={{ r: 3 }} />
                  </LineChart>
                ) : kind === "area" ? (
                  <AreaChart accessibilityLayer data={days}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="day" tickLine={false} axisLine={false} />
                    <YAxis width={34} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area dataKey="accepted" type="monotone" fill="var(--color-accepted)" fillOpacity={0.25} stroke="var(--color-accepted)" />
                  </AreaChart>
                ) : kind === "stacked" ? (
                  <BarChart accessibilityLayer data={days}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="day" tickLine={false} axisLine={false} />
                    <YAxis width={34} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Bar dataKey="accepted" stackId="total" fill="var(--color-accepted)" />
                    <Bar dataKey="pending" stackId="total" fill="var(--color-pending)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                ) : kind === "horizontal" ? (
                  <BarChart accessibilityLayer data={categories} layout="vertical">
                    <CartesianGrid horizontal={false} />
                    <XAxis type="number" />
                    <YAxis dataKey="category" type="category" width={92} tickLine={false} axisLine={false} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="count" fill="var(--color-count)" radius={4} />
                  </BarChart>
                ) : kind === "donut" ? (
                  <PieChart accessibilityLayer>
                    <ChartTooltip content={<ChartTooltipContent nameKey="category" />} />
                    <Pie data={totals} dataKey="count" nameKey="category" innerRadius={56} outerRadius={92}>
                      {totals.map(row => <Cell key={row.category} fill={row.fill} />)}
                    </Pie>
                    <ChartLegend content={<ChartLegendContent nameKey="category" />} />
                  </PieChart>
                ) : kind === "radar" ? (
                  <RadarChart accessibilityLayer data={dimensions} outerRadius="68%">
                    <PolarGrid />
                    <PolarAngleAxis dataKey="area" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Radar dataKey="optionA" name="Option A" stroke="var(--color-optionA)" fill="var(--color-optionA)" fillOpacity={0.25} />
                    <Radar dataKey="optionB" name="Option B" stroke="var(--color-optionB)" fill="var(--color-optionB)" fillOpacity={0.15} />
                    <ChartLegend content={<ChartLegendContent />} />
                  </RadarChart>
                ) : kind === "radial" ? (
                  <RadialBarChart accessibilityLayer data={[{ name: "Accepted", share: 164 / 198 * 100, fill: "var(--chart-1)" }]}
                    innerRadius="50%" outerRadius="90%" startAngle={90} endAngle={-270}>
                    <PolarGrid gridType="circle" radialLines={false} />
                    <RadialBar dataKey="share" background cornerRadius={8} />
                    <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
                  </RadialBarChart>
                ) : kind === "scatter" ? (
                  <ScatterChart accessibilityLayer>
                    <CartesianGrid />
                    <XAxis type="number" dataKey="duration" name="Duration (ms)" unit="ms" />
                    <YAxis type="number" dataKey="accepted" name="Accepted" width={35} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Scatter data={days} fill="var(--chart-1)" name="Synthetic observations" />
                  </ScatterChart>
                ) : (
                  <LineChart accessibilityLayer data={days}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="day" tickLine={false} axisLine={false} />
                    <YAxis width={34} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line key={series} dataKey={series} type="monotone" stroke={`var(--color-${series})`} strokeWidth={2} dot={{ r: 3 }} />
                  </LineChart>
                )}
              </ChartContainer>
              <figcaption className="mt-2 text-xs text-muted-foreground">
                Visual example only. Exact values are available in the data table below.
              </figcaption>
              <ReadableData kind={kind} />
            </figure>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

const meta = {
  title: "Patterns/Native charts and data visualization",
  component: NativeChartResearch,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: { description: { component:
      "Functional native chart gallery built only from the pinned official shadcn Chart primitives " +
      "and Recharts. No custom chart engine, Hypershell theme, live data or product-specific UI. " +
      "Accessible numeric data is available via an expandable table for every plot." } },
  },
} satisfies Meta<typeof NativeChartResearch>
export default meta
type Story = StoryObj<typeof meta>
export const LineTrend: Story = { args: { kind: "line" } }
export const AreaTrend: Story = { args: { kind: "area" } }
export const StackedBars: Story = { args: { kind: "stacked" } }
export const HorizontalBars: Story = { args: { kind: "horizontal" } }
export const DonutPartToWhole: Story = { args: { kind: "donut" } }
export const RadarComparison: Story = { args: { kind: "radar" } }
export const RadialShare: Story = { args: { kind: "radial" } }
export const ScatterRelationship: Story = { args: { kind: "scatter" } }
export const MissingMeasurements: Story = { args: { kind: "empty" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("status")).toHaveTextContent("No measurements available")
    await expect(canvas.queryByRole("img")).not.toBeInTheDocument()
  } }
export const InteractiveMeasure: Story = {
  args: { kind: "interactive" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const accepted = canvas.getByRole("button", { name: "Accepted" })
    const pending = canvas.getByRole("button", { name: "Pending" })
    await expect(accepted).toHaveAttribute("aria-pressed", "true")
    await userEvent.click(pending)
    await expect(pending).toHaveAttribute("aria-pressed", "true")
    await expect(accepted).toHaveAttribute("aria-pressed", "false")
    await userEvent.click(canvas.getByText("View exact example data"))
    await expect(canvas.getByRole("table")).toBeVisible()
  },
}
