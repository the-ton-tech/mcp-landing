import { Check, Copy, Sparkles } from 'lucide-react'
import { CodeBlock } from '@/components/CodeBlock'
import { Step } from '@/components/Step'
import { SectionHeading } from '@/components/ui/ton'
import { SKILLS_INSTALL_CMD } from '@/lib/constants'

const TRY_PROMPT = 'What can I do with TON?'

export function GettingStarted() {
  return (
    <section id="getting-started" className="guide-section">
      <SectionHeading title="Getting started" />

      <Step n={1} title="Install skills">
        <p className="ton-copy">
          Run this in your terminal to install the full TON skills bundle.
        </p>
        <CodeBlock code={SKILLS_INSTALL_CMD} lang="bash" />
      </Step>

      <Step n={2} title="Ask your agent">
        <p className="ton-copy">
          Open your AI assistant and ask:
        </p>
        <div className="prompt-card" data-copy-source>
          <Sparkles className="h-4 w-4 shrink-0 text-[var(--accent-default)]" aria-hidden />
          <span className="min-w-0 flex-1 leading-snug" data-copy-value>{TRY_PROMPT}</span>
          <button
            type="button"
            className="code-copy-btn prompt-copy-btn shrink-0"
            title="Copy prompt"
            aria-label="Copy prompt to clipboard"
          >
            <Copy className="copy-icon-default h-3.5 w-3.5" strokeWidth={2} aria-hidden />
            <Check className="copy-icon-copied h-3.5 w-3.5" strokeWidth={2.5} aria-hidden />
          </button>
        </div>
      </Step>

      <Step n={3} last title="You're ready to go">
        <p className="ton-copy">
          Your agent can now query balances, send TON, search documentation, and more.
          Scroll down to install individual skills or configure MCP servers directly.
        </p>
      </Step>
    </section>
  )
}
