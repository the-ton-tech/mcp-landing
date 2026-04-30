import { CodeBlock } from '@/components/CodeBlock'
import { skillsAddCmd } from '@/lib/constants'
import { SectionHeading } from '@/components/ui/ton'

interface SkillItem {
  id: 'wallets' | 'docs'
  title: string
  about: string
  command: string
}

const SKILLS: SkillItem[] = [
  {
    id: 'wallets',
    title: 'TON Blockchain & Wallets',
    about:
      'A bundle of agent skills that teaches your AI assistant how to work with TON wallets and on-chain operations — checking balances, sending TON and jettons, swapping on DEX, managing NFTs, and creating agentic wallets.',
    command: skillsAddCmd('wallets'),
  },
  {
    id: 'docs',
    title: 'TON Documentation',
    about:
      'An agent skill that grounds your AI assistant in the official TON documentation: TL-B, TVM, FunC and Tolk, validator and staking topics, protocol architecture, and TEPs.',
    command: skillsAddCmd('docs'),
  },
]

export function SkillsSetup() {
  return (
    <section id="skills" className="guide-section">
      <SectionHeading title="Skills">
        <a href="https://agentskills.io/" target="_blank" rel="noreferrer noopener">
          Agent skills
        </a>
        {' '} are bundles of instructions and workflows that teach your AI assistant
        domain-specific knowledge. TON skills below come from{' '}
        <a href="https://github.com/ton-org/skills" target="_blank" rel="noreferrer noopener">
          ton-org/skills
        </a>
        {' '}and cover wallets, on-chain operations, and the official documentation.
      </SectionHeading>

      <div className="flex flex-col gap-4">
        {SKILLS.map(skill => (
          <div key={skill.id} className="flex flex-col gap-3">
            <h3 className="subsection-title">{skill.title}</h3>
            <p className="ton-copy">{skill.about}</p>
            <CodeBlock code={skill.command} lang="bash" />
          </div>
        ))}
      </div>
    </section>
  )
}
