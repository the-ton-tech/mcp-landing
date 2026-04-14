import { ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'

const LINKS = [
  { label: 'Skills', href: 'https://github.com/ton-org/skills' },
  { label: 'Agentic Wallets', href: 'https://agents.ton.org' },
  { label: 'Dashboard', href: 'https://agents.ton.org/dashboard' },
  { label: 'Docs MCP', href: 'https://docs.ton.org/mcp' },
]

export function Footer() {
  return (
    <footer className="mt-14 border-t border-border pt-8">
      <nav className="flex flex-wrap gap-2" aria-label="External links">
        {LINKS.map(({ label, href }) => (
          <Button key={label} variant="outline" size="sm" asChild>
            <a href={href} target="_blank" rel="noopener noreferrer">
              {label}
              <ExternalLink className="opacity-50" aria-hidden />
            </a>
          </Button>
        ))}
      </nav>
    </footer>
  )
}
