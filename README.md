# TON MCP — landing page

Landing page for **TON MCP** — agent skills and Model Context Protocol servers
that give an AI agent live access to the TON blockchain and its official
documentation.

Live: <https://mcp.ton.org>

Static site: React components are pre-rendered to a single `dist/index.html`
at build time. No client-side hydration; the only runtime JS is a tiny inline
"copy to clipboard" handler.

## Develop

```bash
pnpm install
pnpm dev      # http://localhost:5173 with live reload
pnpm build    # emit dist/
pnpm preview  # serve the built dist/ on http://localhost:4173
```

## License

MIT.
