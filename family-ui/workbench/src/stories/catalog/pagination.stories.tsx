import type { Meta,StoryObj } from "@storybook/react-vite"
import * as C from "@/components/ui/pagination"
const meta={title:"Catalog/Pagination",component:C.Pagination,tags:["autodocs"]} satisfies Meta<typeof C.Pagination>
export default meta
type Story=StoryObj<typeof meta>
export const Default:Story={render:()=><div className="p-6"><C.Pagination><C.PaginationContent><C.PaginationItem><C.PaginationPrevious href="#"/></C.PaginationItem><C.PaginationItem><C.PaginationLink href="#" isActive>1</C.PaginationLink></C.PaginationItem><C.PaginationItem><C.PaginationLink href="#">2</C.PaginationLink></C.PaginationItem><C.PaginationItem><C.PaginationNext href="#"/></C.PaginationItem></C.PaginationContent></C.Pagination></div>}
export const Variants:Story={render:()=><div className="p-6"><C.Pagination><C.PaginationContent><C.PaginationItem><C.PaginationLink href="#">1</C.PaginationLink></C.PaginationItem><C.PaginationItem><C.PaginationEllipsis/></C.PaginationItem><C.PaginationItem><C.PaginationLink href="#" isActive>10</C.PaginationLink></C.PaginationItem></C.PaginationContent></C.Pagination></div>}
