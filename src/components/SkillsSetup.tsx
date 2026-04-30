import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { CodeBlock } from '@/components/CodeBlock'
import { SKILLS_INSTALL_CMD, skillsAddCmd } from '@/lib/constants'

interface SkillTryPrompt {
  text: string
  required?: boolean
}

interface SkillCard {
  id: 'docs' | 'wallets'
  title: string
  label: string
  about: string
  tryAsking: SkillTryPrompt[]
  tags: string[]
}

const SKILLS_GRANULAR: Record<'all' | 'd' | 'w' | 'none', string> = {
  all: SKILLS_INSTALL_CMD,
  d: skillsAddCmd('docs'),
  w: skillsAddCmd('wallets'),
  none: '# Select at least one topic using the checkboxes above.',
}

const SKILL_CARDS: SkillCard[] = [
  {
    id: 'docs',
    title: 'docs',
    label: 'Documentation',
    about:
      'Answers grounded in official TON material: TL-B, TVM, FunC and Tolk, validator and staking topics, protocol architecture. Installed at `ton-org/skills/docs`.',
    tags: ['documentation', 'tl-b', 'reference'],
    tryAsking: [
      { text: 'What are best practices for writing secure FunC contracts?' },
      { text: 'Explain the TON sharding model.' },
      { text: 'How does the Jetton standard work?' },
      { text: 'What is the difference between basechain and masterchain?' },
    ],
  },
  {
    id: 'wallets',
    title: 'wallets',
    label: 'Wallets & chain',
    about:
      'Live chain operations: balances and history, sends, swaps, Jettons and NFTs, agentic wallet workflows. Installed at `ton-org/skills/wallets`.',
    tryAsking: [
      { text: 'Create an agentic wallet for me.', required: true },
      { text: 'What is the TON balance of my address?' },
      { text: 'Show the last 10 transactions for this address.' },
      { text: 'Swap 0.5 TON for USDT.' },
    ],
    tags: ['chain', 'wallets', 'agentic'],
  },
]

function SkillsGranularInstallSlots() {
  const { all, d, w, none } = SKILLS_GRANULAR
  return (
    <>
      <div className="skill-code-slot skill-slot-all">
        <CodeBlock code={all} lang="bash" />
      </div>
      <div className="skill-code-slot skill-slot-d">
        <CodeBlock code={d} lang="bash" />
      </div>
      <div className="skill-code-slot skill-slot-w">
        <CodeBlock code={w} lang="bash" />
      </div>
      <div className="skill-code-slot skill-slot-none">
        <CodeBlock code={none} lang="bash" />
      </div>
    </>
  )
}

export function SkillsSetup() {
  return (
    <section id="skills" className="scroll-mt-28">
      <h2 className="mb-2 text-lg font-semibold text-foreground">Skills</h2>
      <p className="mb-4 text-sm text-muted-foreground">
        Install the full bundle in one command, or pick individual skills below — currently{' '}
        <span className="font-mono text-[11px] text-foreground/80">docs</span>
        {' '}and{' '}
        <span className="font-mono text-[11px] text-foreground/80">wallets</span>
        .
      </p>

      <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Full bundle</h3>
      <div className="mb-6">
        <CodeBlock code={SKILLS_INSTALL_CMD} lang="bash" />
      </div>

      <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">What&apos;s in the bundle</h3>
      <div className="mb-6 grid items-stretch gap-4 sm:grid-cols-2">
        {SKILL_CARDS.map(card => (
          <Card
            key={card.id}
            className="relative flex h-full flex-col overflow-hidden border-border"
          >
            <div className="absolute inset-x-0 top-0 h-0.5 bg-primary opacity-60" />
            <CardContent className="flex flex-1 flex-col p-0">
              <div className="space-y-2 p-5">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <p className="font-semibold capitalize text-foreground">{card.title}</p>
                  <Badge variant="secondary" className="shrink-0 text-[10px] font-medium">
                    {card.label}
                  </Badge>
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {card.about}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {card.tags.map(t => (
                    <Badge key={t} variant="outline" className="text-[10px] font-normal">
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mt-auto border-t border-border/60 bg-muted/20 px-4 py-3">
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                  Try asking
                </p>
                <ul className="space-y-2">

                  {card.tryAsking.map((p, i) => (
                    <li
                      key={`${card.id}-try-${i}`}
                      className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 text-[11px] leading-snug text-foreground/85"
                    >
                      <Badge variant="secondary" className="shrink-0 tabular-nums text-[10px]">
                        {i + 1}
                      </Badge>
                      {p.required && (
                        <Badge
                          variant="outline"
                          className="shrink-0 border-primary/55 px-1.5 py-0 text-[9px] font-medium text-primary"
                        >
                          Required
                        </Badge>
                      )}
                      <span className="min-w-0">&ldquo;{p.text}&rdquo;</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="skill-bundle-scope">
        <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Install selected skills only</h3>
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          <label
            htmlFor="skill-pick-docs"
            className="flex min-w-0 flex-1 cursor-pointer items-start gap-3 rounded-lg border border-border bg-card p-3 transition-colors hover:border-primary/40 has-[:checked]:border-primary/55 has-[:checked]:bg-muted/30 has-[:focus-visible]:outline-none has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary/60 has-[:focus-visible]:ring-offset-2"
          >
            <input
              id="skill-pick-docs"
              type="checkbox"
              className="brand-checkbox mt-0.5"
              defaultChecked
            />
            <span className="min-w-0 text-xs leading-relaxed text-muted-foreground">
              <span className="font-medium text-foreground">docs</span>
              {' '}
              — documentation &amp; reference skills
            </span>
          </label>
          <label
            htmlFor="skill-pick-wallets"
            className="flex min-w-0 flex-1 cursor-pointer items-start gap-3 rounded-lg border border-border bg-card p-3 transition-colors hover:border-primary/40 has-[:checked]:border-primary/55 has-[:checked]:bg-muted/30 has-[:focus-visible]:outline-none has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary/60 has-[:focus-visible]:ring-offset-2"
          >
            <input
              id="skill-pick-wallets"
              type="checkbox"
              className="brand-checkbox mt-0.5"
              defaultChecked
            />
            <span className="min-w-0 text-xs leading-relaxed text-muted-foreground">
              <span className="font-medium text-foreground">wallets</span>
              {' '}
              — chain, agentic wallet, swaps
            </span>
          </label>
        </div>
        <SkillsGranularInstallSlots />
      </div>
    </section>
  )
}
