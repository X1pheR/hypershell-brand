import type { Meta,StoryObj } from "@storybook/react-vite"
import * as C from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
const meta={title:"Catalog/Field",component:C.Field,tags:["autodocs"]} satisfies Meta<typeof C.Field>
export default meta
type Story=StoryObj<typeof meta>
export const Default:Story={render:()=> <div className="max-w-2xl p-6"><C.Field><C.FieldLabel htmlFor="native-field">Email</C.FieldLabel><Input id="native-field" placeholder="name@example.test"/><C.FieldDescription>Native labeled input</C.FieldDescription></C.Field></div>}
export const Variants:Story={render:()=> <div className="max-w-2xl p-6"><C.Field data-invalid><C.FieldLabel htmlFor="invalid-field">Required</C.FieldLabel><Input id="invalid-field" aria-invalid/><C.FieldError>Please enter a value</C.FieldError></C.Field></div>}
