import type { Meta,StoryObj } from "@storybook/react-vite"
import * as C from "@/components/ui/combobox"
const meta={title:"Catalog/Combobox",component:C.Combobox,tags:["autodocs"]} satisfies Meta<typeof C.Combobox>
export default meta
type Story=StoryObj<typeof meta>
export const Default:Story={render:()=><div className="max-w-md p-6"><C.Combobox items={["Amsterdam","Leeuwarden","Utrecht"]}><C.ComboboxInput placeholder="Choose city"/><C.ComboboxContent><C.ComboboxList>{["Amsterdam","Leeuwarden","Utrecht"].map(x=><C.ComboboxItem key={x} value={x}>{x}</C.ComboboxItem>)}</C.ComboboxList></C.ComboboxContent></C.Combobox></div>}
export const Variants:Story={render:()=><div className="max-w-md p-6"><C.Combobox items={["Small","Medium","Large"]}><C.ComboboxInput placeholder="Choose size"/><C.ComboboxContent><C.ComboboxList>{["Small","Medium","Large"].map(x=><C.ComboboxItem key={x} value={x}>{x}</C.ComboboxItem>)}</C.ComboboxList></C.ComboboxContent></C.Combobox></div>}
