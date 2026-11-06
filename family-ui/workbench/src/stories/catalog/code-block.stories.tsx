import type { Meta,StoryObj } from "@storybook/react-vite"
import * as C from "@/components/ui/code-block"
const meta={title:"Catalog/CodeBlock",component:C.CodeBlock,tags:["autodocs"]} satisfies Meta<typeof C.CodeBlock>
export default meta
type Story=StoryObj<typeof meta>
export const Default:Story={render:()=><div className="max-w-md p-6"><C.CodeBlock><C.CodeBlockHeader><C.CodeBlockTitle>example.ts</C.CodeBlockTitle></C.CodeBlockHeader><C.CodeBlockContent>const ready = true</C.CodeBlockContent></C.CodeBlock></div>}
export const Variants:Story={render:()=><div className="max-w-md p-6"><C.CodeBlock variant="destructive"><C.CodeBlockContent>Example error output</C.CodeBlockContent></C.CodeBlock></div>}
