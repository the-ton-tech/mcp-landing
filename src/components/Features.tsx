import { Card, CardContent } from '@/components/ui/card'

const ITEMS = [
  {
    icon: '📖',
    title: 'Documentation Search',
    desc:  'Instantly query the full TON docs — TL-B schemas, FunC / Tact references, and architecture guides — right inside your IDE.',
  },
  {
    icon: '⛓️',
    title: 'Live Blockchain Data',
    desc:  'Fetch real-time balances, transaction history, and contract state from the TON mainnet without leaving your editor.',
  },
  {
    icon: '🚀',
    title: 'Blockchain Operations',
    desc:  'Interact with Jetton, NFT, and custom smart contracts via natural language. The MCP handles encoding and signing.',
  },
  {
    icon: '🤖',
    title: 'Agentic Wallets',
    desc:  'Spin up on-chain agent wallets at agents.ton.org and let your AI assistant send and receive TON autonomously.',
  },
  {
    icon: '🔒',
    title: 'Secure by Default',
    desc:  'Keys never leave your device. The local server signs locally; the remote docs server is completely read-only.',
  },
  {
    icon: '⚡',
    title: 'Zero Configuration',
    desc:  'The public docs server needs no install — one command and it\'s live. The local server runs via npx with no global deps.',
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
