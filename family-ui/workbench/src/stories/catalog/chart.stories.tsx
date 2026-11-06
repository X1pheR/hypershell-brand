import type { Meta,StoryObj } from "@storybook/react-vite"
import * as C from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
const config={count:{label:"Events",color:"var(--chart-1)"}}
const data=[{name:"Mon",count:14},{name:"Tue",count:23},{name:"Wed",count:18}]
const meta={title:"Catalog/Chart",component:C.ChartContainer,args:{config,children:<BarChart/>},tags:["autodocs"]} satisfies Meta<typeof C.ChartContainer>
export default meta
type Story=StoryObj<typeof meta>
export const Default:Story={render:()=><C.ChartContainer className="h-52 w-80" config={config}><BarChart data={data}><CartesianGrid vertical={false}/><XAxis dataKey="name"/><Bar dataKey="count" fill="var(--color-count)" radius={4}/></BarChart></C.ChartContainer>}
export const Variants:Story={render:()=><C.ChartContainer className="h-52 w-96" config={config}><BarChart data={data}><XAxis dataKey="name"/><Bar dataKey="count" fill="var(--color-count)" radius={6}/></BarChart></C.ChartContainer>}
