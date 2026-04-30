import { ExternalLink } from 'lucide-react'

import { buttonVariants } from '@/components/ui/button'
import { SectionHeading } from '@/components/ui/ton'
import { cn } from '@/lib/utils'

export function WhatItIs() {
  return (
    <section id="what-it-is" className="guide-section hero-section">
      <SectionHeading title="What it is TON MCP">
        TON MCP gives your AI agent live access to the TON blockchain and its documentation —
        check balances, send transactions, deploy contracts, and search official docs.
      </SectionHeading>
      <div className="hero-actions">
        <a
          href="#getting-started"
          className={cn(buttonVariants(), 'w-full sm:w-auto')}
        >
          Get started
        </a>
        <a
          href="https://docs.ton.org/ecosystem/ai/mcp"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: 'outline' }), 'w-full sm:w-auto')}
        >
          Documentation
          <ExternalLink className="opacity-60" aria-hidden />
        </a>
      </div>
    </section>
  )
}
