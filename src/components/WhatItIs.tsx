import { ExternalLink } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { SectionHeading } from '@/components/ui/ton'

export function WhatItIs() {
  return (
    <section id="what-it-is" className="guide-section hero-section">
      <SectionHeading title="What it is TON MCP">
        TON MCP gives your AI agent live access to the TON blockchain and its documentation —
        check balances, send transactions, deploy contracts, and search official docs.
      </SectionHeading>
      <div className="hero-actions">
        <Button size="lg" className="w-full sm:w-auto" asChild>
          <a href="https://github.com/ton-org/skills" target="_blank" rel="noopener noreferrer">
            GitHub
            <ExternalLink className="opacity-70" aria-hidden />
          </a>
        </Button>
        <Button variant="outline" size="lg" className="w-full sm:w-auto" asChild>
          <a href="https://docs.ton.org/ecosystem/ai/mcp" target="_blank" rel="noopener noreferrer">
            Documentation
            <ExternalLink className="opacity-60" aria-hidden />
          </a>
        </Button>
      </div>
    </section>
  )
}
