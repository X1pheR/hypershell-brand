import type { Meta, StoryObj } from "@storybook/react-vite"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
function NativeOverlays(){
 return <TooltipProvider><section className="max-w-2xl space-y-6 p-5">
  <h2 className="text-lg font-semibold">Base UI interactions</h2>
  <div className="flex flex-wrap gap-3">
   <Dialog><DialogTrigger render={<Button/>}>Open dialog</DialogTrigger><DialogContent><DialogHeader><DialogTitle>Native modal</DialogTitle><DialogDescription>Keyboard focus, Escape and background inerting are handled by Base UI.</DialogDescription></DialogHeader><p className="text-sm">Try Tab and Escape.</p><DialogFooter><DialogClose render={<Button/>}>Close</DialogClose></DialogFooter></DialogContent></Dialog>
   <DropdownMenu>
    <DropdownMenuTrigger render={<Button variant="outline" />}>Open menu</DropdownMenuTrigger>
    <DropdownMenuContent>
     <DropdownMenuGroup>
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>Export</DropdownMenuItem>
      <DropdownMenuItem>Duplicate</DropdownMenuItem>
      <DropdownMenuItem variant="destructive">Delete (demo)</DropdownMenuItem>
     </DropdownMenuGroup>
    </DropdownMenuContent>
   </DropdownMenu>
   <Popover><PopoverTrigger render={<Button variant="outline"/>}>Popover</PopoverTrigger><PopoverContent>Popover content from official shadcn.</PopoverContent></Popover>
   <Tooltip><TooltipTrigger render={<Button variant="secondary"/>}>Hover or focus</TooltipTrigger><TooltipContent>Native Tooltip</TooltipContent></Tooltip>
   <HoverCard><HoverCardTrigger render={<Button variant="link"/>}>Hover card</HoverCardTrigger><HoverCardContent>Additional context with no actual API call.</HoverCardContent></HoverCard>
  </div>
  <Tabs defaultValue="one"><TabsList><TabsTrigger value="one">First tab</TabsTrigger><TabsTrigger value="two">Second tab</TabsTrigger></TabsList><TabsContent value="one" className="rounded-lg border p-4">First tab content</TabsContent><TabsContent value="two" className="rounded-lg border p-4">Second tab content</TabsContent></Tabs>
  <Accordion><AccordionItem value="accessibility"><AccordionTrigger>Accessibility behavior</AccordionTrigger><AccordionContent>ARIA patterns, focus management and keyboard interactions originate in Base UI.</AccordionContent></AccordionItem><AccordionItem value="styling"><AccordionTrigger>What provides styling?</AccordionTrigger><AccordionContent>Original shadcn class names with neutral Tailwind theme tokens.</AccordionContent></AccordionItem></Accordion>
 </section></TooltipProvider>
}
const meta={title:"Native/Overlays/Menus & Dialogs",component:NativeOverlays,parameters:{layout:"padded"},tags:["autodocs"]} satisfies Meta<typeof NativeOverlays>
export default meta
type Story=StoryObj<typeof meta>
export const Interactions:Story={}
