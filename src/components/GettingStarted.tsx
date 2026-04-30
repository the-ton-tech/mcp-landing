import { Copy, Sparkles } from 'lucide-react'
import { CodeBlock } from '@/components/CodeBlock'
import { Step } from '@/components/Step'

const INSTALL_CMD = 'npx skills add ton-org/skills -y'

const TRY_PROMPT = 'What can I do with TON?'

export function GettingStarted() {
  return (
    <section id="getting-started" className="scroll-mt-28">
      <h2 className="mb-2 text-lg font-semibold text-foreground">Getting started</h2>
      <p className="mb-4 text-sm text-muted-foreground">
        TON MCP gives your AI agent live access to the TON blockchain and its documentation —
        check balances, send transactions, deploy contracts, and search official docs.
      </p>

      <Step n={1} title="Install skills">
        <p className="text-sm text-muted-foreground">
          Run the command below in your terminal to install the full skill bundle.
        </p>
        <CodeBlock code={INSTALL_CMD} lang="bash" />
      </Step>

      <Step n={2} title="Ask your agent">
        <p className="text-sm text-muted-foreground">
          Open your AI assistant and ask:
        </p>
        <div className="prompt-card relative flex items-center gap-3 overflow-hidden rounded-lg border border-border bg-card py-2.5 pl-4 pr-2 text-sm text-foreground transition-colors hover:border-primary/35 hover:bg-muted/30">
          <span className="absolute inset-y-0 left-0 w-0.5 bg-primary/60" aria-hidden />
          <Sparkles className="h-4 w-4 shrink-0 text-primary" aria-hidden />
          <span className="min-w-0 flex-1 leading-snug">{TRY_PROMPT}</span>
          <button
            type="button"
            className="code-copy-btn prompt-copy-btn shrink-0"
            data-copy-text={TRY_PROMPT}
            title="Copy prompt"
            aria-label="Copy prompt to clipboard"
          >
            <Copy className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
          </button>
        </div>
        <p className="text-xs text-muted-foreground">
          Your agent will list the TON tools it now has — balances, transactions, swaps, NFTs, contract deploys, and docs search. Pick whatever you need from there.
        </p>
      </Step>

      <Step n={3} last title="You're ready to go">
        <p className="text-sm text-muted-foreground">
          Your agent can now query balances, send TON, search documentation, and more.
          Scroll down to configure MCP servers or install individual skill packs.
        </p>
      </Step>
    </section>
  )
}
