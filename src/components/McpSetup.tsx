import { CodeBlock } from '@/components/CodeBlock'
import { Step } from '@/components/Step'
import { Callout, Eyebrow, FeatureCard, PickerOption, SectionHeading } from '@/components/ui/ton'

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


export function McpSetup() {
  return (
    <section id="mcp" className="guide-section">
      <SectionHeading title="MCP">
        Configure Model Context Protocol servers so your AI agent can read TON documentation and call live chain operations directly from your IDE.
      </SectionHeading>

      <Eyebrow>Servers</Eyebrow>
      <div className="mb-6 grid items-stretch gap-4 sm:grid-cols-2">
        {MCP_SERVER_CARDS.map(card => (
          <FeatureCard
            key={card.id}
            title={card.title}
            label={card.label}
            tags={card.tags}
            titleClassName="font-mono text-sm"
          >
            {card.about}
          </FeatureCard>
        ))}
      </div>

      <div className="mcp-config-scope">
        <Eyebrow>Include in config</Eyebrow>
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <PickerOption id="mcp-docs">
            <span className="font-medium text-foreground">TON Docs MCP</span>
            {' '}
            — remote HTTP
          </PickerOption>
          <PickerOption id="mcp-chain">
            <span className="font-medium text-foreground">TON chain MCP</span>
            {' '}
            — local via{' '}
            <span className="ton-inline-code">npx -y @ton/mcp@alpha</span>
            .
          </PickerOption>
        </div>

        <Callout>
          To let your AI agent use TON — pick your IDE below, copy the snippet, and follow the two steps.
        </Callout>
        <p className="mb-4 text-xs text-muted-foreground">
          The snippet updates automatically when you toggle servers above — no JavaScript required.
        </p>

        <div>
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

          <div className="tab-panels">
            {IDE_TABS.map(tab => (
              <div key={tab.id} className={`tab-panel p-${tab.id}`}>
                <Step n={1} title={tab.step1Title}>
                  {tab.id === 'claude' && <McpClaudeConfigSlots />}
                  {(tab.id === 'cursor' || tab.id === 'windsurf') && <McpJsonConfigSlots vscode={false} />}
                  {tab.id === 'vscode' && <McpJsonConfigSlots vscode />}
                </Step>
                <Step n={2} last title="Verify the connection">
                  <p className="ton-copy">
                    Ask your assistant to list available tools — you should see:
                  </p>
                  <McpVerifySlots />
                </Step>
              </div>
            ))}
          </div>

          <p className="mt-3 text-xs text-muted-foreground">
            Don&apos;t see your client? Any MCP-compatible app — Claude Desktop, Zed, Continue, and others — works with the same server URLs above.
          </p>
        </div>
      </div>
    </section>
  )
}
