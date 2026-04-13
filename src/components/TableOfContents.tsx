const TOC_ITEMS: { id: string; label: string }[] = [
  { id: 'skills', label: 'Skills' },
  { id: 'mcp', label: 'MCP' },
]

export function TableOfContents() {
  return (
    <nav
      className="rounded-lg border border-border bg-muted/20 p-4"
      aria-labelledby="toc-title"
      lang="en"
    >
      <p
        id="toc-title"
        className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground"
      >
        In this guide
      </p>
      <ul className="space-y-2 text-sm">
        {TOC_ITEMS.map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className="font-medium text-foreground/90 underline decoration-border underline-offset-4 transition-colors hover:text-primary hover:decoration-primary/60"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
