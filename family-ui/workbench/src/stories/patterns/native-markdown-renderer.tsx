import Markdown, { defaultUrlTransform } from "react-markdown"
import remarkGfm from "remark-gfm"

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
export function SafeMarkdown({ source }: { source: string }) {
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
