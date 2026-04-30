const TOC_ITEMS: { id: string; label: string }[] = [
  { id: 'getting-started', label: 'Getting started' },
  { id: 'skills', label: 'Skills' },
  { id: 'mcp', label: 'MCP' },
]

export function TableOfContents() {
  return (
    <nav
      className="toc-card"
      aria-labelledby="toc-title"
      lang="en"
    >
      <p
        id="toc-title"
        className="mb-3 text-xs font-semibold uppercase text-muted-foreground"
      >
        In this guide
      </p>
      <ul className="space-y-2 text-sm">
        {TOC_ITEMS.map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className="toc-link"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
