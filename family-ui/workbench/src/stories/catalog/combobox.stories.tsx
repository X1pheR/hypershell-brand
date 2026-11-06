import type { Meta,StoryObj } from "@storybook/react-vite"
import * as C from "@/components/ui/combobox"
import { Button } from "@/components/ui/button"
const meta={title:"Catalog/Combobox",component:C.Combobox,tags:["autodocs"]} satisfies Meta<typeof C.Combobox>
export default meta
type Story=StoryObj<typeof meta>
export const Default:Story={render:()=><div className="max-w-md p-6"><C.Combobox items={["Amsterdam","Leeuwarden","Utrecht"]}><C.ComboboxInput aria-label="City" placeholder="Choose city" showTrigger={false}><C.ComboboxTrigger aria-label="Show city options" render={<Button variant="ghost" size="icon-xs" />}/></C.ComboboxInput><C.ComboboxContent><C.ComboboxList>{["Amsterdam","Leeuwarden","Utrecht"].map(x=><C.ComboboxItem key={x} value={x}>{x}</C.ComboboxItem>)}</C.ComboboxList></C.ComboboxContent></C.Combobox></div>}
export const Variants:Story={render:()=><div className="max-w-md p-6"><C.Combobox items={["Small","Medium","Large"]}><C.ComboboxInput aria-label="Size" placeholder="Choose size" showTrigger={false}><C.ComboboxTrigger aria-label="Show size options" render={<Button variant="ghost" size="icon-xs" />}/></C.ComboboxInput><C.ComboboxContent><C.ComboboxList>{["Small","Medium","Large"].map(x=><C.ComboboxItem key={x} value={x}>{x}</C.ComboboxItem>)}</C.ComboboxList></C.ComboboxContent></C.Combobox></div>}
