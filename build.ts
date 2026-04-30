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
import { readFileSync, writeFileSync, unlinkSync, mkdirSync, readdirSync, copyFileSync, statSync } from 'fs'
import { fileURLToPath }        from 'url'
import { dirname, resolve, relative } from 'path'

import App from './src/App'

const __dirname = dirname(fileURLToPath(import.meta.url))
const distDir   = resolve(__dirname, 'dist')
const publicDir = resolve(__dirname, 'public')
const cssPath   = resolve(distDir, 'out.css')

const SITE_URL   = 'https://mcp.ton.org'
const SITE_TITLE = 'TON MCP — AI Agent Tools for TON Blockchain'
const SITE_DESC  = 'Give your AI assistant live access to the TON blockchain. Query balances, send transactions, deploy contracts, and search official TON documentation — all via the Model Context Protocol.'
const SITE_TITLE_SHORT = 'TON MCP'
const SITE_KEYWORDS = 'TON, blockchain, MCP, Model Context Protocol, AI agent, developer tools, smart contracts, FunC, Tolk, agentic wallet, skills, Claude, Cursor, Windsurf, VS Code'

// JSON-LD structured data — SoftwareApplication schema
const JSON_LD = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: SITE_TITLE_SHORT,
  url: SITE_URL,
  description: SITE_DESC,
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  author: { '@type': 'Organization', name: 'TON Foundation', url: 'https://ton.org' },
  keywords: SITE_KEYWORDS,
})

// ── 1. Render React to static markup ─────────────────────────────────────
const body = renderToStaticMarkup(createElement(App))

// ── 2. Read and inline Tailwind CSS, then clean up intermediate file ──────
//      In WATCH mode, leave dist/out.css in place so `tailwindcss --watch`
//      keeps updating the same file (otherwise we'd loop: unlink → tailwind
//      rewrites → tsx re-runs build.ts → unlink → ...).
const css = readFileSync(cssPath, 'utf-8')
if (!process.env.WATCH) unlinkSync(cssPath)

// ── 3. Assemble final HTML ────────────────────────────────────────────────
const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <title>${SITE_TITLE}</title>
  <meta name="description" content="${SITE_DESC}" />
  <meta name="keywords" content="${SITE_KEYWORDS}" />
  <meta name="author" content="TON Foundation" />
  <meta name="robots" content="index, follow" />
  <meta name="theme-color" content="#0098EA" />
  <link rel="canonical" href="${SITE_URL}/" />

  <!-- Open Graph -->
  <meta property="og:type"        content="website" />
  <meta property="og:url"         content="${SITE_URL}/" />
  <meta property="og:title"       content="${SITE_TITLE}" />
  <meta property="og:description" content="${SITE_DESC}" />
  <meta property="og:site_name"   content="TON" />
  <meta property="og:locale"      content="en_US" />

  <!-- Twitter Card -->
  <meta name="twitter:card"        content="summary_large_image" />
  <meta name="twitter:site"        content="@ton_blockchain" />
  <meta name="twitter:title"       content="${SITE_TITLE}" />
  <meta name="twitter:description" content="${SITE_DESC}" />

  <!-- AI / LLM discoverability (RFC 8288 link relations; Pages can't set HTTP Link headers, so these ship in <head>) -->
  <link rel="alternate" type="text/plain" href="${SITE_URL}/llms.txt" title="LLM-readable site summary" />
  <link rel="sitemap" type="application/xml" href="${SITE_URL}/sitemap.xml" />

  <!-- Structured data -->
  <script type="application/ld+json">${JSON_LD}</script>

  <link rel="icon" type="image/png" sizes="32x32" href="/favicon_32x32.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon_16x16.png" />
  <link rel="apple-touch-icon" sizes="180x180" href="/apple_touch_icon.png" />
  <link rel="mask-icon" href="/safari_pinned_tab.svg" color="#0098EA" />
  <style>${css}</style>
</head>
<body>
${body}
</body>
</html>`

// ── 4. Write dist/index.html ──────────────────────────────────────────────
mkdirSync(distDir, { recursive: true })
writeFileSync(resolve(distDir, 'index.html'), html, 'utf-8')
console.log(`✓  dist/index.html  (${(html.length / 1024).toFixed(1)} KB, SSG + inline copy helper)`)

// ── 5. Copy public/ → dist/ (recursive, preserves nested dirs like .well-known/) ─
function copyDir(src: string, dest: string) {
  mkdirSync(dest, { recursive: true })
  for (const entry of readdirSync(src)) {
    const srcPath  = resolve(src, entry)
    const destPath = resolve(dest, entry)
    if (statSync(srcPath).isDirectory()) {
      copyDir(srcPath, destPath)
    } else {
      copyFileSync(srcPath, destPath)
      console.log(`✓  dist/${relative(distDir, destPath)}  ← public/${relative(publicDir, srcPath)}`)
    }
  }
}
copyDir(publicDir, distDir)
