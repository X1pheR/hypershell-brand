import type { Meta,StoryObj } from "@storybook/react-vite"
import * as C from "@/components/ui/carousel"
const meta={title:"Catalog/Carousel",component:C.Carousel,tags:["autodocs"],parameters:{layout:"padded"}} satisfies Meta<typeof C.Carousel>
export default meta
type Story=StoryObj<typeof meta>
export const Default:Story={render:()=><div className="w-80 p-8"><C.Carousel><C.CarouselContent>{["One","Two","Three"].map(x=><C.CarouselItem key={x}><div className="grid h-32 place-items-center rounded-lg border bg-muted">{x}</div></C.CarouselItem>)}</C.CarouselContent><C.CarouselPrevious/><C.CarouselNext/></C.Carousel></div>}
export const Variants:Story={render:()=><div className="w-96 p-8"><C.Carousel><C.CarouselContent>{[1,2,3,4].map(x=><C.CarouselItem className="basis-1/2" key={x}><div className="grid h-28 place-items-center rounded-lg border">{x}</div></C.CarouselItem>)}</C.CarouselContent><C.CarouselPrevious/><C.CarouselNext/></C.Carousel></div>}
