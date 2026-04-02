import { Card, CardContent } from '@/components/ui/card'

const ITEMS = [
  {
    icon: '📖',
    title: 'Documentation Search',
    desc:  'Ask anything about TON — TL-B schemas, FunC / Tolk syntax, staking mechanics — and get answers grounded in the official docs.',
  },
  {
    icon: '⛓️',
    title: 'Live Chain Data',
    desc:  'Pull real-time balances, transaction history, and contract state from TON mainnet without switching context.',
  },
  {
    icon: '🚀',
    title: 'Blockchain Operations',
    desc:  'Deploy Jettons, NFTs, and custom contracts through natural language. Encoding, fees, and signing are handled for you.',
  },
  {
    icon: '🤖',
    title: 'Agentic Wallets',
    desc:  'Create on-chain agent wallets at agents.ton.org and let your AI send, receive, and swap TON autonomously.',
  },
  {
    icon: '🔒',
    title: 'Secure by Design',
    desc:  'Your keys never leave your machine. The docs server is fully read-only; the local server signs everything locally.',
  },
  {
    icon: '⚡',
    title: 'No Setup Overhead',
    desc:  'The docs server needs just a URL — nothing to install. The local server runs on-demand via npx with no global dependencies.',
  },
]

export function Features() {
  return (
    <div className="mt-10 border-t border-border pt-10">
      <p className="mb-5 text-sm font-semibold text-foreground">What you can do</p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {ITEMS.map(({ icon, title, desc }) => (
          <Card key={title}>
            <CardContent className="p-4">
              <div className="mb-2 flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-base">
                  {icon}
                </span>
                <p className="text-sm font-semibold text-foreground">{title}</p>
              </div>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
