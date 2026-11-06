import type { Meta,StoryObj } from "@storybook/react-vite"
import * as C from "@/components/ui/input-otp"
const meta={title:"Catalog/InputOTP",component:C.InputOTP,args:{maxLength:6,children:null},tags:["autodocs"]} satisfies Meta<typeof C.InputOTP>
export default meta
type Story=StoryObj<typeof meta>
export const Default:Story={args:{maxLength:6},render:()=><div className="p-6"><C.InputOTP maxLength={6}><C.InputOTPGroup>{[0,1,2,3,4,5].map(x=><C.InputOTPSlot key={x} index={x}/>)}</C.InputOTPGroup></C.InputOTP></div>}
export const Variants:Story={args:{maxLength:4,children:null},render:()=><div className="p-6"><C.InputOTP maxLength={4}><C.InputOTPGroup>{[0,1,2,3].map(x=><C.InputOTPSlot key={x} index={x}/>)}</C.InputOTPGroup></C.InputOTP></div>}
