import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, within } from "@storybook/test"
import Markdown, { defaultUrlTransform } from "react-markdown"
import remarkGfm from "remark-gfm"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

// Demonstration only: no file writes, no server, no HTML/MDX execution.
// Preserve Markdown as data; avoid remote image loads and unsafe protocols.
const initial = [
  "# Fictional operations handbook",
  "",
  "This **neutral example** is not a live service runbook.",
  "",
  "## Checklist",
  "",
  "- [x] Review reference data",
  "- [ ] Confirm the next action",
  "",
  "## Reference table",
  "",
  "| Type | Count |",
  "| --- | ---: |",
  "| Accepted | 164 |",
  "| Pending | 34 |",
  "",
  "## Code example",
  "",
  "```typescript",
  "const synthetic = true",
  "```",
  "",
  "[Internal help](/help) · [Upstream documentation](https://commonmark.org)",
].join("\n")

const hostileSource = [
  "# Untrusted Markdown sample",
  "",
  "<script>window.__markdown_attack = true</script>",
  "",
  "<img src=x onerror=\"window.__markdown_attack=true\" />",
  "",
  "[Unsafe protocol](javascript:alert(1))",
  "",
  "![Remote tracking image](https://example.invalid/track.png)",
  "",
  "Ordinary **safe emphasis** must remain readable.",
].join("\n")

const allowed = [
  "h1", "h2", "h3", "h4", "h5", "h6", "p", "a", "blockquote", "br", "strong", "em", "del",
  "ul", "ol", "li", "input", "pre", "code", "hr", "table", "thead", "tbody", "tr", "th", "td",
] as const

function allowSafeUrl(raw: string): string {
  const librarySafe = defaultUrlTransform(raw)
  if (!librarySafe) return ""
  const url = librarySafe.trim()
  if (/^#[A-Za-z0-9_-]+$/.test(url) || /^\/(?!\/)[^\\]*$/.test(url)) return url
  try {
    const parsed = new URL(url)
    return parsed.protocol === "https:" ? parsed.toString() : ""
  } catch {
    return ""
  }
}

// Story-only native composition; do not promote a generic MarkdownViewer yet.
function SafeMarkdown({ source }: { source: string }) {
  if (!source.trim()) return (
    <p role="status" className="rounded-md border border-dashed p-6 text-sm text-muted-foreground">
      No Markdown content available. Nothing has been rendered.
    </p>
  )
  return (
    <article aria-label="Markdown preview" className="min-w-0 space-y-3 break-words text-sm leading-6">
      <Markdown
        remarkPlugins={[remarkGfm]}
        skipHtml
        allowedElements={[...allowed]}
        urlTransform={allowSafeUrl}
        components={{
          h1: ({ children }) => <h1 className="text-xl font-semibold">{children}</h1>,
          h2: ({ children }) => <h2 className="pt-2 text-lg font-semibold">{children}</h2>,
          h3: ({ children }) => <h3 className="font-semibold">{children}</h3>,
          p: ({ children }) => <p>{children}</p>,
          a: ({ href, children }) => href
            ? <a href={href} className="underline underline-offset-4" rel="noopener noreferrer">{children}</a>
            : <span>{children}</span>,
          ul: ({ children }) => <ul className="list-disc space-y-1 ps-6">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal space-y-1 ps-6">{children}</ol>,
          blockquote: ({ children }) => <blockquote className="border-s-4 ps-4 text-muted-foreground">{children}</blockquote>,
          pre: ({ children }) => <pre className="max-w-full overflow-x-auto rounded-md border bg-muted/30 p-3 font-mono text-xs">{children}</pre>,
          code: ({ children, className }) => <code className={className ?? "rounded bg-muted px-1 py-0.5 font-mono text-xs"}>{children}</code>,
          table: ({ children }) => <div className="max-w-full overflow-x-auto"><table className="w-full border-collapse text-sm">{children}</table></div>,
          th: ({ children }) => <th scope="col" className="border-b p-2 text-start font-semibold">{children}</th>,
          td: ({ children }) => <td className="border-b p-2">{children}</td>,
          input: ({ checked, ...props }) => <input {...props} type="checkbox" checked={checked} disabled aria-label={checked ? "Completed" : "Incomplete"} />,
        }}
      >{source}</Markdown>
    </article>
  )
}

type Kind = "read" | "edit" | "untrusted" | "empty"
function NativeMarkdownStudy({ kind }: { kind: Kind }) {
  const [source, setSource] = useState(initial)
  const editable = kind === "edit"
  const displayed = kind === "untrusted" ? hostileSource : kind === "empty" ? "" : source
  return <div className="mx-auto max-w-5xl space-y-4 p-4">
    <Card>
      <CardHeader>
        <CardTitle>{editable ? "Markdown source + native preview" : kind === "untrusted" ? "Unsafe input safely treated as text" : "Markdown reading and preview"}</CardTitle>
        <CardDescription>
          Native shadcn composition with reviewed Markdown parser and GFM. Synthetic text only.
          No executable HTML, remote images, MDX, Mermaid execution, autosave or Hypershell theme.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {editable && (
          <div className="space-y-2">
            <label htmlFor="markdown-source" className="text-sm font-medium">Markdown source</label>
            <Textarea id="markdown-source" value={source} onChange={event => setSource(event.target.value)}
              className="min-h-56 w-full font-mono text-sm" />
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="outline" onClick={() => setSource(initial)} disabled={source === initial}>Reset draft</Button>
              <span role="status" className="text-xs text-muted-foreground">
                {source === initial ? "Example unchanged" : "Unsaved local draft — nothing was sent"}
              </span>
            </div>
          </div>
        )}
        <div className="min-w-0 rounded-md border p-4">
          <SafeMarkdown source={displayed} />
        </div>
        <p className="text-xs text-muted-foreground">
          Only HTTPS links and local relative links are permitted; raw HTML is skipped and remote images are disallowed.
          Embedded Mermaid remains fenced source pending a separate security decision.
        </p>
      </CardContent>
    </Card>
  </div>
}

const meta = {
  title: "Patterns/Native Markdown reading and editing",
  component: NativeMarkdownStudy,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: { description: { component: "S26/S27 research only: safe CommonMark/GFM render plus optional native Textarea preview; no shared editor, external loading or executing untrusted extensions." } },
  },
} satisfies Meta<typeof NativeMarkdownStudy>
export default meta
type Story = StoryObj<typeof meta>

export const DocumentPreview: Story = {
  args: { kind: "read" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("heading", { name: "Fictional operations handbook" })).toBeVisible()
    await expect(canvas.getByRole("table")).toHaveTextContent("164")
    await expect(canvas.getByRole("link", { name: "Internal help" })).toHaveAttribute("href", "/help")
  },
}
export const SourceAndPreview: Story = {
  args: { kind: "edit" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.type(canvas.getByRole("textbox", { name: "Markdown source" }), "\n\nAdded review note")
    await expect(canvas.getByRole("status")).toHaveTextContent("Unsaved local draft")
    await expect(within(canvas.getByRole("article", { name: "Markdown preview" })).getByText(/Added review note/)).toBeVisible()
    await userEvent.click(canvas.getByRole("button", { name: "Reset draft" }))
    await expect(canvas.getByRole("status")).toHaveTextContent("Example unchanged")
  },
}
export const HostileMarkdown: Story = {
  args: { kind: "untrusted" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText(/safe emphasis/)).toBeVisible()
    await expect(canvasElement.querySelector("script")).toBeNull()
    await expect(canvasElement.querySelector("img")).toBeNull()
    await expect(canvasElement.querySelector('a[href^="javascript:"]')).toBeNull()
  },
}
export const NoDocument: Story = {
  args: { kind: "empty" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("status")).toHaveTextContent("No Markdown content available")
  },
}
