import type { ReactNode } from 'react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { CodeBlock } from '@/components/CodeBlock'

// ── Types ─────────────────────────────────────────────────────────────────

interface IdeTabMeta {
  id: 'claude' | 'cursor' | 'windsurf' | 'vscode'
  label: string
  step1Title: string
}

// ── MCP data ──────────────────────────────────────────────────────────────

const CMD_CLAUDE_DOCS = 'claude mcp add --transport http ton-docs https://docs.ton.org/mcp'
const CMD_CLAUDE_CHAIN = 'claude mcp add ton -- npx -y @ton/mcp@alpha'

const MCP_CLAUDE_BOTH = `${CMD_CLAUDE_DOCS}\n${CMD_CLAUDE_CHAIN}`
const MCP_CLAUDE_DOCS_ONLY = CMD_CLAUDE_DOCS
const MCP_CLAUDE_CHAIN_ONLY = CMD_CLAUDE_CHAIN
const MCP_CLAUDE_NONE = '# Enable at least one server using the checkboxes above.'

const MCP_CURSOR_BOTH = `{
  "mcpServers": {
    "ton-docs": {
      "url": "https://docs.ton.org/mcp"
    },
    "ton": {
      "command": "npx",
      "args": ["-y", "@ton/mcp@alpha"]
    }
  }
}`

const MCP_CURSOR_DOCS = `{
  "mcpServers": {
    "ton-docs": {
      "url": "https://docs.ton.org/mcp"
    }
  }
}`

const MCP_CURSOR_CHAIN = `{
  "mcpServers": {
    "ton": {
      "command": "npx",
      "args": ["-y", "@ton/mcp@alpha"]
    }
  }
}`

const MCP_CURSOR_NONE = `{ "mcpServers": {} }`

const MCP_VSCODE_BOTH = `{
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

const MCP_VSCODE_DOCS = `{
  "servers": {
    "ton-docs": {
      "type": "http",
      "url": "https://docs.ton.org/mcp"
    }
  }
}`

const MCP_VSCODE_CHAIN = `{
  "servers": {
    "ton": {
      "command": "npx",
      "args": ["-y", "@ton/mcp@alpha"]
    }
  }
}`

const MCP_VSCODE_NONE = `{ "servers": {} }`

const MCP_VERIFY_BOTH =
  'ton-docs · search_ton_docs\nton     · get_balance, send_ton, get_transactions, …'
const MCP_VERIFY_DOCS = 'ton-docs · search_ton_docs'
const MCP_VERIFY_CHAIN = 'ton · get_balance, send_ton, get_transactions, …'
const MCP_VERIFY_NONE = '# No servers selected — turn on docs and/or chain MCP above.'

interface McpServerCard {
  id: 'http-docs' | 'local-chain'
  title: string
  label: string
  about: string
  tags: string[]
}

const MCP_SERVER_CARDS: McpServerCard[] = [
  {
    id: 'http-docs',
    title: 'ton-docs',
    label: 'Documentation MCP',
    about:
      'Remote HTTP server — no local install. Search and read the official TON documentation (`ton_search_docs` and related tools). Point your IDE at `https://docs.ton.org/mcp`.',
    tags: ['http', 'docs.ton.org', 'read-only'],
  },
  {
    id: 'local-chain',
    title: '@ton/mcp',
    label: 'Chain MCP (alpha)',
    about:
      'Runs locally via `npx -y @ton/mcp@alpha`: live balances, transaction history, sends, contract deploy, Jettons and NFTs. Pair with the docs server when you want both reference material and chain access.',
    tags: ['npx', 'chain', 'alpha'],
  },
]

const IDE_TABS: IdeTabMeta[] = [
  {
    id: 'claude',
    label: 'Claude Code',
    step1Title: 'Run in your terminal:',
  },
  {
    id: 'cursor',
    label: 'Cursor',
    step1Title: 'Add to Cursor MCP settings (Settings → MCP → Add server):',
  },
  {
    id: 'windsurf',
    label: 'Windsurf',
    step1Title: 'Add to ~/.codeium/windsurf/mcp_config.json:',
  },
  {
    id: 'vscode',
    label: 'VS Code',
    step1Title: 'Add to .vscode/mcp.json in your project:',
  },
]

function McpClaudeConfigSlots() {
  return (
    <>
      <div className="mcp-code-slot mcp-slot-both">
        <CodeBlock code={MCP_CLAUDE_BOTH} lang="bash" />
      </div>
      <div className="mcp-code-slot mcp-slot-docs">
        <CodeBlock code={MCP_CLAUDE_DOCS_ONLY} lang="bash" />
      </div>
      <div className="mcp-code-slot mcp-slot-chain">
        <CodeBlock code={MCP_CLAUDE_CHAIN_ONLY} lang="bash" />
      </div>
      <div className="mcp-code-slot mcp-slot-none">
        <CodeBlock code={MCP_CLAUDE_NONE} lang="bash" />
      </div>
    </>
  )
}

function McpJsonConfigSlots({ vscode }: { vscode: boolean }) {
  const both = vscode ? MCP_VSCODE_BOTH : MCP_CURSOR_BOTH
  const docs = vscode ? MCP_VSCODE_DOCS : MCP_CURSOR_DOCS
  const chain = vscode ? MCP_VSCODE_CHAIN : MCP_CURSOR_CHAIN
  const none = vscode ? MCP_VSCODE_NONE : MCP_CURSOR_NONE
  return (
    <>
      <div className="mcp-code-slot mcp-slot-both">
        <CodeBlock code={both} lang="json" />
      </div>
      <div className="mcp-code-slot mcp-slot-docs">
        <CodeBlock code={docs} lang="json" />
      </div>
      <div className="mcp-code-slot mcp-slot-chain">
        <CodeBlock code={chain} lang="json" />
      </div>
      <div className="mcp-code-slot mcp-slot-none">
        <CodeBlock code={none} lang="json" />
      </div>
    </>
  )
}

function McpVerifySlots() {
  return (
    <>
      <div className="mcp-code-slot mcp-slot-both">
        <CodeBlock code={MCP_VERIFY_BOTH} lang="output" />
      </div>
      <div className="mcp-code-slot mcp-slot-docs">
        <CodeBlock code={MCP_VERIFY_DOCS} lang="output" />
      </div>
      <div className="mcp-code-slot mcp-slot-chain">
        <CodeBlock code={MCP_VERIFY_CHAIN} lang="output" />
      </div>
      <div className="mcp-code-slot mcp-slot-none">
        <CodeBlock code={MCP_VERIFY_NONE} lang="output" />
      </div>
    </>
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
      <div className="min-w-0 flex-1 space-y-2.5 pb-6">
        <p className="pt-0.5 text-sm font-medium text-foreground">{title}</p>
        {children}
      </div>
    </div>
  )
}

export function McpSetup() {
  return (
    <section id="mcp" className="scroll-mt-28 mt-2 border-t border-border pt-10">
      <h2 className="mb-6 text-lg font-semibold text-foreground">MCP</h2>

      <h3 className="mb-2 text-xs font-medium text-foreground">Servers</h3>
      <div className="mb-6 grid items-stretch gap-4 sm:grid-cols-2">
        {MCP_SERVER_CARDS.map(card => (
          <Card
            key={card.id}
            className="relative flex h-full flex-col overflow-hidden border-border"
          >
            <div className="absolute inset-x-0 top-0 h-0.5 bg-primary opacity-60" />
            <CardContent className="flex flex-1 flex-col p-5">
              <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
                <p className="font-mono text-sm font-semibold text-foreground">{card.title}</p>
                <Badge variant="secondary" className="text-[10px] font-medium">
                  {card.label}
                </Badge>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">{card.about}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {card.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="text-[10px] font-normal">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mcp-config-scope">
        <h3 className="mb-2 text-xs font-medium text-foreground">Include in config</h3>
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <label
            htmlFor="mcp-docs"
            className="flex min-w-0 flex-1 cursor-pointer items-start gap-3 rounded-lg border border-border bg-card p-3 transition-colors hover:border-primary/40 has-[:checked]:border-primary/55 has-[:checked]:bg-muted/30"
          >
            <input
              id="mcp-docs"
              type="checkbox"
              className="mt-0.5 h-4 w-4 shrink-0 rounded border-border accent-primary"
              defaultChecked
            />
            <span className="min-w-0 text-xs leading-relaxed text-muted-foreground">
              <span className="font-medium text-foreground">TON Docs MCP</span>
              {' '}
              — remote HTTP
            </span>
          </label>
          <label
            htmlFor="mcp-chain"
            className="flex min-w-0 flex-1 cursor-pointer items-start gap-3 rounded-lg border border-border bg-card p-3 transition-colors hover:border-primary/40 has-[:checked]:border-primary/55 has-[:checked]:bg-muted/30"
          >
            <input
              id="mcp-chain"
              type="checkbox"
              className="mt-0.5 h-4 w-4 shrink-0 rounded border-border accent-primary"
              defaultChecked
            />
            <span className="min-w-0 text-xs leading-relaxed text-muted-foreground">
              <span className="font-medium text-foreground">TON chain MCP</span>
              {' '}
              — local via{' '}
              <span className="font-mono text-[11px] text-foreground/85">npx -y @ton/mcp@alpha</span>
              .
            </span>
          </label>
        </div>

        <p className="mb-2 rounded-lg border border-primary/25 bg-primary/5 px-4 py-3 text-sm text-foreground/90">
          To let your AI agent use TON — pick your IDE below, copy the snippet, and follow the two steps.
        </p>
        <p className="mb-3 text-xs text-muted-foreground">
          The snippet updates automatically when you toggle servers above — no JavaScript required.
        </p>

        <div className="mb-10">
          {IDE_TABS.map(tab => (
            <input key={tab.id} className="tab-radio" type="radio"
                   id={`t-${tab.id}`} name="ide" defaultChecked={tab.id === 'claude'} />
          ))}

          <div className="tab-list flex gap-1">
            {IDE_TABS.map(tab => (
              <label key={tab.id} htmlFor={`t-${tab.id}`} className={`tab-btn l-${tab.id}`}>
                {tab.label}
              </label>
            ))}
          </div>

          <div className="tab-panels rounded-b-lg rounded-tr-lg border border-border bg-background p-4 sm:p-6">
            {IDE_TABS.map(tab => (
              <div key={tab.id} className={`tab-panel p-${tab.id}`}>
                <Step n={1} title={tab.step1Title}>
                  {tab.id === 'claude' && <McpClaudeConfigSlots />}
                  {(tab.id === 'cursor' || tab.id === 'windsurf') && <McpJsonConfigSlots vscode={false} />}
                  {tab.id === 'vscode' && <McpJsonConfigSlots vscode />}
                </Step>
                <Step n={2} last title="Verify the connection">
                  <p className="text-sm text-muted-foreground">
                    Ask your assistant to list available tools — you should see:
                  </p>
                  <McpVerifySlots />
                </Step>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
