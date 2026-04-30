import { CodeBlock } from '@/components/CodeBlock'
import { skillsAddCmd } from '@/lib/constants'
import { SectionHeading } from '@/components/ui/ton'

interface SkillItem {
  id: 'wallets' | 'docs'
  title: string
  subtitle: string
  about: string
  includes: string[]
  command: string
}

const SKILLS: SkillItem[] = [
  {
    id: 'wallets',
    title: 'wallets',
    subtitle: 'TON MCP & agentic wallets',
    about:
      'Domain-specific instructions and workflows for wallet operations, DeFi, NFTs, and the agentic wallet lifecycle. Pairs with the @ton/mcp server below.',
    includes: [
      'ton-balance — TON & jetton balances, token lists, transaction history',
      'ton-send — send TON and jettons to addresses or TON DNS (.ton, .t.me)',
      'ton-swap — swap and trade jettons on TON DEX (Omniston)',
      'ton-nfts — list, inspect, and transfer NFTs',
      'ton-create-wallet — create and deploy an agentic wallet on-chain',
      'ton-manage-wallets — import, switch accounts, rotate operator keys',
      'ton-cli — run TON MCP tools directly from the CLI',
      'ton-xstocks — buy and sell Backed xStocks (tokenized equities)',
    ],
    command: skillsAddCmd('wallets'),
  },
  {
    id: 'docs',
    title: 'docs',
    subtitle: 'Documentation & standards',
    about:
      'Answers grounded in official TON material — TL-B, TVM, FunC and Tolk, validator and staking topics, protocol architecture, and TEPs.',
    includes: [
      'ton-docs — official TON documentation, TEPs, and SDK topics via the TON Docs MCP server',
    ],
    command: skillsAddCmd('docs'),
  },
]

export function SkillsSetup() {
  return (
    <section id="skills" className="guide-section">
      <SectionHeading title="Skills">
        Packaged{' '}
        <a href="https://agentskills.io/" target="_blank" rel="noreferrer noopener">
          agent skills
        </a>
        {' '}from{' '}
        <a href="https://github.com/ton-org/skills" target="_blank" rel="noreferrer noopener">
          ton-org/skills
        </a>
        . Pick the groups your AI agent needs — install each one independently.
      </SectionHeading>

      <div className="flex flex-col gap-8">
        {SKILLS.map(skill => (
          <div key={skill.id} className="flex flex-col gap-3">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className="text-lg font-semibold capitalize">{skill.title}</h3>
              <span className="text-sm text-muted-foreground">{skill.subtitle}</span>
            </div>
            <p className="ton-copy">{skill.about}</p>
            <ul className="ml-5 list-disc space-y-1 text-sm text-muted-foreground">
              {skill.includes.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <CodeBlock code={skill.command} lang="bash" />
          </div>
        ))}
      </div>
    </section>
  )
}
