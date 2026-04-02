import type { ReactNode } from 'react'
import { Badge }     from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent } from '@/components/ui/card'

// ── Server definitions ────────────────────────────────────────────────────

const SERVERS = [
  {
    id:      'docs',
    name:    'TON Docs',
    label:   'Remote · HTTP',
    color:   'primary' as const,
    desc:    'Read-only access to the full TON documentation via a public HTTP endpoint. No installation required.',
    caps:    ['TON documentation search', 'API reference', 'FunC / Tolk guides', 'TL-B schemas'],
  },
  {
    id:      'mcp',
    name:    'TON MCP',
    label:   'Local · npx',
    color:   'secondary' as const,
    desc:    'Full blockchain capabilities running locally via npx. Query balances, send transactions, deploy contracts.',
    caps:    ['Wallet & balance queries', 'Send transactions', 'Deploy contracts', 'Jetton / NFT operations'],
  },
]

// ── IDE configs ───────────────────────────────────────────────────────────

const CLAUDE_COMMANDS = `claude mcp add --transport http ton-docs https://docs.ton.org/mcp
claude mcp add ton -- npx -y @ton/mcp@alpha`

const CURSOR_CONFIG = `{
  "mcpServers": {
    "ton-docs": {
      "type": "http",
      "url": "https://docs.ton.org/mcp"
    },
    "ton": {
      "command": "npx",
      "args": ["-y", "@ton/mcp@alpha"]
    }
  }
}`

const VSCODE_CONFIG = `{
  "servers": {
    "ton-docs": {
      "type": "http",
      "url": "https://docs.ton.org/mcp"
    },
    "ton": {
      "command": "npx",
      "args": ["-y", "@ton/mcp@alpha"]
    }
  }
}`

const VERIFY_OUTPUT =
  'ton-docs · ton_search_docs\nton     · ton_get_balance, ton_send_transaction, …'

const TABS: TabConfig[] = [
  {
    id:    'claude',
    label: 'Claude Code',
    step1: { title: 'Run both commands in your terminal:', code: CLAUDE_COMMANDS, lang: 'bash' },
  },
  {
    id:    'cursor',
    label: 'Cursor',
    step1: { title: 'Add to Cursor MCP settings (Settings → MCP → Add server):', code: CURSOR_CONFIG, lang: 'json' },
  },
  {
    id:    'windsurf',
    label: 'Windsurf',
    step1: { title: 'Add to ~/.codeium/windsurf/mcp_config.json:', code: CURSOR_CONFIG, lang: 'json' },
  },
  {
    id:    'vscode',
    label: 'VS Code',
    step1: { title: 'Add to .vscode/mcp.json in your project:', code: VSCODE_CONFIG, lang: 'json' },
  },
]

const QUERIES = [
  'What is the TON balance of my address?',
  'Show the last 10 transactions for this address.',
  'Create agentic wallet for me.',
  'Swap 0.5 TON for USDT',
  'What are best practices for writing secure FunC contracts?',
  'Explain the TON sharding model from the docs.',
]

// ── Types ─────────────────────────────────────────────────────────────────

interface CodeSnippet { title: string; code: string; lang: string }
interface TabConfig   { id: string; label: string; step1: CodeSnippet }

// ── Primitives ────────────────────────────────────────────────────────────

function CodeBlock({ code, lang }: { code: string; lang: string }) {
  return (
    <div className="code-wrap">
      <div className="code-header">
        <span className="code-dot bg-primary/70" />
        <span className="font-mono text-xs text-[hsl(210_10%_50%)]">{lang}</span>
      </div>
      <pre className="code-body"><code>{code}</code></pre>
    </div>
  )
}

function Step({ n, last = false, title, children }: {
  n: number; last?: boolean; title: string; children: ReactNode
}) {
  return (
    <div className="relative flex gap-4">
      {!last && <div className="step-line" />}
      <div className="relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground ring-4 ring-primary/10">
        {n}
      </div>
      <div className="flex-1 space-y-2.5 pb-6">
        <p className="pt-0.5 text-sm font-medium text-foreground">{title}</p>
        {children}
      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────

export function SetupGuide() {
  return (
    <section>
      {/* Server overview cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        {SERVERS.map(s => (
          <Card key={s.id} className="relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-0.5 bg-primary opacity-60" />
            <CardContent className="p-5">
              <div className="mb-3 flex items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-foreground">{s.name}</p>
                  <p className="text-xs text-muted-foreground">{s.desc}</p>
                </div>
                <Badge variant="secondary" className="shrink-0 text-xs">{s.label}</Badge>
              </div>
              <ul className="space-y-1">
                {s.caps.map(c => (
                  <li key={c} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="text-primary">✓</span>
                    {c}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="mb-1 text-lg font-semibold text-foreground">Quick Setup Guide</h2>
      <p className="mb-5 text-sm text-muted-foreground">
        Add both servers to your IDE with a single config block:
      </p>

      {/* CSS-only tabs */}
      <div>
        {TABS.map(t => (
          <input key={t.id} className="tab-radio" type="radio"
                 id={`t-${t.id}`} name="ide" defaultChecked={t.id === 'claude'} />
        ))}

        <div className="tab-list flex flex-wrap gap-1">
          {TABS.map(t => (
            <label key={t.id} htmlFor={`t-${t.id}`} className={`tab-btn l-${t.id}`}>
              {t.label}
            </label>
          ))}
        </div>

        <div className="tab-panels rounded-b-lg rounded-tr-lg border border-border bg-background p-6">
          {TABS.map(t => (
            <div key={t.id} className={`tab-panel p-${t.id}`}>
              <div className="space-y-0">
                <Step n={1} title={t.step1.title}>
                  <CodeBlock code={t.step1.code} lang={t.step1.lang} />
                </Step>
                <Step n={2} last title="Verify both servers are connected">
                  <p className="text-sm text-muted-foreground">
                    Ask your IDE assistant to list tools — you should see:
                  </p>
                  <CodeBlock code={VERIFY_OUTPUT} lang="output" />
                </Step>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Example queries */}
      <div className="mt-8">
        <div className="mb-3 flex items-center gap-3">
          <p className="text-sm font-semibold text-foreground">Example Queries</p>
          <Separator className="flex-1" />
        </div>
        <div className="grid gap-1 sm:grid-cols-2">
          {QUERIES.map((q, i) => (
            <div key={q} className="query-item">
              <Badge variant="secondary" className="shrink-0 tabular-nums">{i + 1}</Badge>
              <span className="text-foreground/80">"{q}"</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
