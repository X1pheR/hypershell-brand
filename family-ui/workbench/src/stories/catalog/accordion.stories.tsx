import type { Meta, StoryObj } from "@storybook/react-vite"
import * as C from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"

/** Official shadcn Base UI source; example compositions are test fixtures, not custom UI components. */
const meta = { title: "Catalog/Accordion", component: C.Accordion, tags: ["autodocs"], parameters: { layout: "padded", docs: { description: { component: "Unmodified native shadcn Base UI component. Examine supported variants and accessibility behavior before composing app screens." } } } } satisfies Meta<typeof C.Accordion>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { render: () => <div className="max-w-3xl p-6 text-foreground"><C.Accordion defaultValue={["item-1"]}><C.AccordionItem value="item-1"><C.AccordionTrigger>What is included?</C.AccordionTrigger><C.AccordionContent>Native Base UI accordion behavior.</C.AccordionContent></C.AccordionItem></C.Accordion></div> }

export const Variations: Story = { render: () => <div className="max-w-3xl p-6 text-foreground"><C.Accordion><C.AccordionItem value="one"><C.AccordionTrigger>Collapsed question</C.AccordionTrigger><C.AccordionContent>Answer.</C.AccordionContent></C.AccordionItem><C.AccordionItem value="two"><C.AccordionTrigger>Second question</C.AccordionTrigger><C.AccordionContent>More detail.</C.AccordionContent></C.AccordionItem></C.Accordion></div> }
