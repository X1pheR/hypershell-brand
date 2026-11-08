import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, within } from "@storybook/test"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { SafeMarkdown } from "./native-markdown-renderer"

// Help user outcomes, not a transplant of HomeSight or Reach help structure.
// Content is deterministic fictional Markdown and any Mermaid fence remains TEXT.
const topics = [
  { id: "overview", title: "Getting started", category: "Basics", source:
    "# Getting started\n\nThis is a **synthetic** guide to the neutral native UI reference.\n\n## Discover\n\nUse the help search to find a topic, then read the article on the right.\n\n## Safety\n\nNo example here changes a Hypershell service." },
  { id: "api", title: "API operations", category: "Technical", source:
    "# API operations\n\nA fictional **read-only** API contract.\n\n| Response | Meaning |\n| --- | --- |\n| 200 | Example success |\n| 403 | Example denied |\n\n## Example request\n\n```bash\ncurl --request GET 'https://example.invalid/api/v1/demo'\n```\n\nThis command is displayed as text only." },
  { id: "diagrams", title: "Technical diagrams", category: "Technical", source:
    "# Technical diagrams\n\nDiagram syntax is **not executed** in this reference. Mermaid needs a separate approved engine.\n\n```mermaid\nsequenceDiagram\n    Client->>Server: Request\n    Server-->>Client: Response\n```\n\nA source-only fallback remains accessible even if a diagram engine is unavailable." },
  { id: "states", title: "State definitions", category: "Reference", source:
    "# State definitions\n\n- **Loading:** the result has not arrived.\n- **Empty:** there are no records.\n- **Error:** the request failed.\n- **Denied:** the current user lacks access.\n\nDifferent outcomes must not be presented as fabricated success or zero values." },
] as const

function NativeHelpResearch({ initialTopic }: { initialTopic: string }) {
  const [selected, setSelected] = useState(initialTopic)
  const active = topics.find(t => t.id === selected) ?? topics[0]
  return <div className="mx-auto max-w-5xl p-4">
    <Card>
      <CardHeader>
        <CardTitle>Find and read native help</CardTitle>
        <CardDescription>Functional study of searchable help navigation with native Command and safe GFM renderer. No legacy documentation UI or Hypershell theme is reproduced.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid min-w-0 gap-4 md:grid-cols-[15rem_minmax(0,1fr)]">
          <nav aria-label="Help topics" className="min-w-0">
            <Command className="h-fit rounded-md border">
              <CommandInput aria-label="Find help topics" placeholder="Find help topics" />
              <CommandList>
                <CommandEmpty>No matching help topics.</CommandEmpty>
                {["Basics", "Technical", "Reference"].map(category => (
                  <CommandGroup key={category} heading={category}>
                    {topics.filter(t=>t.category===category).map(topic => (
                      <CommandItem key={topic.id} value={topic.title} onSelect={() => setSelected(topic.id)}
                        aria-current={selected===topic.id ? "page" : undefined}>
                        {topic.title}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                ))}
              </CommandList>
            </Command>
          </nav>
          <section aria-label="Selected help article" className="min-w-0 rounded-md border p-4">
            <SafeMarkdown source={active.source} />
          </section>
        </div>
      </CardContent>
    </Card>
  </div>
}

const meta = {
  title: "Patterns/Native help and documentation navigation",
  component: NativeHelpResearch,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen", docs: { description: { component: "S12/S13 neutral composition: native Command search and category navigation plus safe Markdown rendering, example code and blocked Mermaid source. Product-specific help URL routes/permissions remain separately owned." } } },
} satisfies Meta<typeof NativeHelpResearch>
export default meta
type Story = StoryObj<typeof meta>
export const SearchAndOpen: Story = { args: { initialTopic: "overview" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const field = canvas.getByPlaceholderText("Find help topics")
    await userEvent.type(field, "API")
    await userEvent.click(canvas.getByText("API operations"))
    await expect(within(canvas.getByRole("region", { name: "Selected help article" }))
      .getByRole("heading", { name: "API operations" })).toBeVisible()
    await expect(canvas.getByRole("table")).toHaveTextContent("403")
  },
}
export const NoSearchMatch: Story = { args: { initialTopic: "overview" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.type(canvas.getByPlaceholderText("Find help topics"), "no-results-xyz")
    await expect(canvas.getByText("No matching help topics.")).toBeVisible()
    await expect(canvas.getByRole("heading", { name: "Getting started" })).toBeVisible()
  },
}
export const DiagramSourceOnly: Story = { args: { initialTopic: "diagrams" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("heading", { name: "Technical diagrams" })).toBeVisible()
    await expect(canvasElement.querySelector("svg")).toBeNull()
    await expect(canvas.getByText(/sequenceDiagram/)).toBeVisible()
  },
}
