/**
 * Build-time SSG.
 * 1. Renders React → static HTML (renderToStaticMarkup, zero client JS)
 * 2. Reads compiled Tailwind CSS from dist/out.css
 * 3. Writes a single self-contained dist/index.html
 *
 * Run: npm run build
 */

import { renderToStaticMarkup } from 'react-dom/server'
import { createElement }        from 'react'
import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { fileURLToPath }        from 'url'
import { dirname, resolve }     from 'path'

import App from './src/App'

const __dirname = dirname(fileURLToPath(import.meta.url))
const distDir   = resolve(__dirname, 'dist')

// ── 1. Render React to static markup ─────────────────────────────────────
const body = renderToStaticMarkup(createElement(App))

// ── 2. Read Tailwind CSS (compiled by build:css step) ─────────────────────
const css = readFileSync(resolve(distDir, 'out.css'), 'utf-8')

// ── 3. Assemble final HTML — no inline JS at all ─────────────────────────
const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="TON MCP Server — Connect AI assistants to the TON blockchain in minutes." />
  <title>TON MCP Server</title>
  <style>${css}</style>
</head>
<body>
${body}
</body>
</html>`

// ── 4. Write output ───────────────────────────────────────────────────────
mkdirSync(distDir, { recursive: true })
writeFileSync(resolve(distDir, 'index.html'), html, 'utf-8')

const kb = (html.length / 1024).toFixed(1)
console.log(`✓  dist/index.html  (${kb} KB, zero JS)`)
