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
  about: string
  commands: Record<IdeId, { code: string, lang: Lang }>
}

const MCP_SERVERS: McpServer[] = [
  {
    id: 'chain',
    title: 'TON Blockchain MCP',
    about:
      'A local Model Context Protocol server that gives your AI agent direct access to the TON blockchain — read balances and transaction history, send TON and jettons, deploy contracts, swap on DEX, and operate agentic wallets.',
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
    title: 'TON Documentation MCP',
    about:
      'A hosted Model Context Protocol server that lets your AI agent search and read the official TON documentation, TEPs, and SDK guides directly from docs.ton.org/mcp — no local install.',
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
        MCPs are Model Context Protocol servers — they expose tools your AI
        agent can call directly from your IDE. The TON MCPs below give your
        agent live access to the blockchain and to the official documentation.
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

      <div className="flex flex-col gap-4">
        {MCP_SERVERS.map(server => (
          <div key={server.id} className="flex flex-col gap-3">
            <h3 className="subsection-title">{server.title}</h3>
            <p className="ton-copy">{server.about}</p>
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
