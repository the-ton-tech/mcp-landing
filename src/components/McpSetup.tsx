import { CodeBlock } from '@/components/CodeBlock'
import { SectionHeading } from '@/components/ui/ton'

interface IdeTabMeta {
  id: 'claude' | 'cursor' | 'windsurf' | 'vscode'
  label: string
}

const IDE_TABS: IdeTabMeta[] = [
  { id: 'claude',   label: 'Claude Code' },
  { id: 'cursor',   label: 'Cursor' },
  { id: 'windsurf', label: 'Windsurf' },
  { id: 'vscode',   label: 'VS Code' },
]

type IdeId = IdeTabMeta['id']
type Lang = 'bash' | 'json'

interface McpServer {
  id: 'chain' | 'docs'
  title: string
  subtitle: string
  about: string
  highlights: string[]
  commands: Record<IdeId, { code: string, lang: Lang }>
}

const MCP_SERVERS: McpServer[] = [
  {
    id: 'chain',
    title: '@ton/mcp',
    subtitle: 'Chain MCP — local · alpha',
    about:
      'Runs locally via npx. Live chain access for your AI agent: balances, transaction history, sends, contract deploy, jettons, NFTs, swaps and agentic-wallet workflows.',
    highlights: [
      'Pairs with the wallets skills above',
      'No API keys — uses your local agentic wallet',
      'Tools: get_balance, send_ton, get_transactions, swap, deploy_contract, …',
    ],
    commands: {
      claude: { code: 'claude mcp add ton -- npx -y @ton/mcp@alpha', lang: 'bash' },
      cursor: {
        code: `{
  "mcpServers": {
    "ton": {
      "command": "npx",
      "args": ["-y", "@ton/mcp@alpha"]
    }
  }
}`,
        lang: 'json',
      },
      windsurf: {
        code: `{
  "mcpServers": {
    "ton": {
      "command": "npx",
      "args": ["-y", "@ton/mcp@alpha"]
    }
  }
}`,
        lang: 'json',
      },
      vscode: {
        code: `{
  "servers": {
    "ton": {
      "command": "npx",
      "args": ["-y", "@ton/mcp@alpha"]
    }
  }
}`,
        lang: 'json',
      },
    },
  },
  {
    id: 'docs',
    title: 'ton-docs',
    subtitle: 'Documentation MCP — remote · read-only',
    about:
      'Hosted HTTP server at docs.ton.org/mcp. Search and read the official TON documentation, TEPs, and SDK guides — no local install required.',
    highlights: [
      'Pairs with the docs skill above',
      'Remote HTTP transport — no npm install',
      'Tools: search_ton_docs, fetch_ton_doc, …',
    ],
    commands: {
      claude: { code: 'claude mcp add --transport http ton-docs https://docs.ton.org/mcp', lang: 'bash' },
      cursor: {
        code: `{
  "mcpServers": {
    "ton-docs": {
      "url": "https://docs.ton.org/mcp"
    }
  }
}`,
        lang: 'json',
      },
      windsurf: {
        code: `{
  "mcpServers": {
    "ton-docs": {
      "url": "https://docs.ton.org/mcp"
    }
  }
}`,
        lang: 'json',
      },
      vscode: {
        code: `{
  "servers": {
    "ton-docs": {
      "type": "http",
      "url": "https://docs.ton.org/mcp"
    }
  }
}`,
        lang: 'json',
      },
    },
  },
]

function IdeTabStrip() {
  return (
    <div className="tab-list flex gap-1">
      {IDE_TABS.map(tab => (
        <label key={tab.id} htmlFor={`t-${tab.id}`} className={`tab-btn l-${tab.id}`}>
          {tab.label}
        </label>
      ))}
    </div>
  )
}

function CommandPanel({ commands }: { commands: McpServer['commands'] }) {
  return (
    <div className="ide-panel">
      {IDE_TABS.map(tab => (
        <div key={tab.id} className={`ide-slot ide-slot-${tab.id}`}>
          <CodeBlock code={commands[tab.id].code} lang={commands[tab.id].lang} />
        </div>
      ))}
    </div>
  )
}

export function McpSetup() {
  return (
    <section id="mcp" className="guide-section mcp-section">
      <SectionHeading title="MCPs">
        Configure Model Context Protocol servers so your AI agent can read TON
        documentation and call live chain operations directly from your IDE.
        Pick your IDE once — both snippets below update together.
      </SectionHeading>

      {IDE_TABS.map(tab => (
        <input
          key={tab.id}
          className="tab-radio"
          type="radio"
          id={`t-${tab.id}`}
          name="ide"
          defaultChecked={tab.id === 'claude'}
        />
      ))}

      <div className="flex flex-col gap-8">
        {MCP_SERVERS.map(server => (
          <div key={server.id} className="flex flex-col gap-3">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className="font-mono text-lg font-semibold">{server.title}</h3>
              <span className="text-sm text-muted-foreground">{server.subtitle}</span>
            </div>
            <p className="ton-copy">{server.about}</p>
            <ul className="ml-5 list-disc space-y-1 text-sm text-muted-foreground">
              {server.highlights.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="ide-tabbed">
              <IdeTabStrip />
              <CommandPanel commands={server.commands} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
