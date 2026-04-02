/**
 * Build-time SSG.
 * 1. Renders React → static HTML (renderToStaticMarkup, zero client JS)
 * 2. Reads compiled Tailwind CSS from dist/out.css, inlines it, then removes the file
 * 3. Writes a single self-contained dist/index.html
 *
 * Run: pnpm build
 */

import { renderToStaticMarkup } from 'react-dom/server'
import { createElement }        from 'react'
import { readFileSync, writeFileSync, unlinkSync, mkdirSync } from 'fs'
import { fileURLToPath }        from 'url'
import { dirname, resolve }     from 'path'

import App from './src/App'

const __dirname = dirname(fileURLToPath(import.meta.url))
const distDir   = resolve(__dirname, 'dist')
const cssPath   = resolve(distDir, 'out.css')

const FAVICON_SVG = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 237 237'><path fill='%234DB8FF' d='M118.204 0C183.486 0 236.408 52.922 236.408 118.205c0 65.282-52.922 118.203-118.204 118.203C52.922 236.408 0 183.487 0 118.205 0 52.922 52.922 0 118.204 0zm-44.103 62.196c-16.421 0-26.833 17.716-18.57 32.038l54.433 94.348c3.655 6.34 12.817 6.34 16.472 0l54.444-94.348c8.252-14.3-2.16-32.038-18.57-32.038H74.101zm88.187 16.645c3.743 0 5.946 3.971 4.162 7.066L137.856 137.1l-11.35 21.946V78.841h35.782zM109.872 78.852v80.172L98.538 137.09l-28.604-51.167-.083-.149c-1.633-3.073.558-6.921 4.243-6.921h35.778z'/></svg>`

// ── 1. Render React to static markup ─────────────────────────────────────
const body = renderToStaticMarkup(createElement(App))

const css = readFileSync(cssPath, 'utf-8')
unlinkSync(cssPath)

// ── 3. Assemble final HTML ────────────────────────────────────────────────
const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="TON MCP Server — Connect AI assistants to the TON blockchain in minutes." />
  <title>TON MCP Server</title>
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,${FAVICON_SVG}" />
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
