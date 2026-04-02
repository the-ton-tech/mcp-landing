/**
 * Build-time SSG.
 * 1. Renders React → static HTML (renderToStaticMarkup, zero client JS)
 * 2. Reads compiled Tailwind CSS from dist/out.css, inlines it, then removes the file
 * 3. Copies everything in public/ → dist/
 * 4. Writes dist/index.html
 *
 * Run: pnpm build
 */

import { renderToStaticMarkup } from 'react-dom/server'
import { createElement }        from 'react'
import { readFileSync, writeFileSync, unlinkSync, mkdirSync, readdirSync, copyFileSync } from 'fs'
import { fileURLToPath }        from 'url'
import { dirname, resolve }     from 'path'

import App from './src/App'

const __dirname = dirname(fileURLToPath(import.meta.url))
const distDir   = resolve(__dirname, 'dist')
const publicDir = resolve(__dirname, 'public')
const cssPath   = resolve(distDir, 'out.css')

const SITE_URL   = 'https://ton-mcp-landing.vercel.app/'
const SITE_TITLE = 'TON Developer MCP'
const SITE_DESC  = 'Connect AI assistants to the TON blockchain via the Model Context Protocol. Query balances, deploy contracts, and search the full documentation without leaving your IDE.'

// Official TON icon as inline SVG favicon
const FAVICON_SVG = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 237 237'><path fill='%234DB8FF' d='M118.204 0C183.486 0 236.408 52.922 236.408 118.205c0 65.282-52.922 118.203-118.204 118.203C52.922 236.408 0 183.487 0 118.205 0 52.922 52.922 0 118.204 0zm-44.103 62.196c-16.421 0-26.833 17.716-18.57 32.038l54.433 94.348c3.655 6.34 12.817 6.34 16.472 0l54.444-94.348c8.252-14.3-2.16-32.038-18.57-32.038H74.101zm88.187 16.645c3.743 0 5.946 3.971 4.162 7.066L137.856 137.1l-11.35 21.946V78.841h35.782zM109.872 78.852v80.172L98.538 137.09l-28.604-51.167-.083-.149c-1.633-3.073.558-6.921 4.243-6.921h35.778z'/></svg>`

// JSON-LD structured data — SoftwareApplication schema
const JSON_LD = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: SITE_TITLE,
  url: SITE_URL,
  description: SITE_DESC,
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  author: { '@type': 'Organization', name: 'TON Foundation', url: 'https://ton.org' },
  keywords: 'TON, blockchain, MCP, Model Context Protocol, AI, developer tools, smart contracts, FunC, Tolk',
})

// ── 1. Render React to static markup ─────────────────────────────────────
const body = renderToStaticMarkup(createElement(App))

// ── 2. Read and inline Tailwind CSS, then clean up intermediate file ──────
const css = readFileSync(cssPath, 'utf-8')
unlinkSync(cssPath)

// ── 3. Assemble final HTML ────────────────────────────────────────────────
const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <title>${SITE_TITLE}</title>
  <meta name="description" content="${SITE_DESC}" />
  <meta name="keywords" content="TON, blockchain, MCP, Model Context Protocol, AI assistant, developer tools, smart contracts, FunC, Tolk, agentic wallet" />
  <meta name="author" content="TON Foundation" />
  <meta name="theme-color" content="#4DB8FF" />
  <link rel="canonical" href="${SITE_URL}/" />

  <!-- Open Graph -->
  <meta property="og:type"        content="website" />
  <meta property="og:url"         content="${SITE_URL}/" />
  <meta property="og:title"       content="${SITE_TITLE}" />
  <meta property="og:description" content="${SITE_DESC}" />
  <meta property="og:site_name"   content="${SITE_TITLE}" />

  <!-- Twitter Card -->
  <meta name="twitter:card"        content="summary" />
  <meta name="twitter:title"       content="${SITE_TITLE}" />
  <meta name="twitter:description" content="${SITE_DESC}" />

  <!-- AI / LLM discoverability -->
  <link rel="alternate" type="text/plain" href="${SITE_URL}/llms.txt" title="LLM-readable site summary" />

  <!-- Structured data -->
  <script type="application/ld+json">${JSON_LD}</script>

  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,${FAVICON_SVG}" />
  <style>${css}</style>
</head>
<body>
${body}
</body>
</html>`

// ── 4. Write dist/index.html ──────────────────────────────────────────────
mkdirSync(distDir, { recursive: true })
writeFileSync(resolve(distDir, 'index.html'), html, 'utf-8')
console.log(`✓  dist/index.html  (${(html.length / 1024).toFixed(1)} KB, zero JS)`)

// ── 5. Copy public/ → dist/ ───────────────────────────────────────────────
for (const file of readdirSync(publicDir)) {
  copyFileSync(resolve(publicDir, file), resolve(distDir, file))
  console.log(`✓  dist/${file}  ← public/${file}`)
}
