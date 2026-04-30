import type { ReactNode } from 'react'

export function Step({ n, last = false, title, children }: {
  n: number; last?: boolean; title: string; children: ReactNode
}) {
  return (
    <div className="relative flex gap-4">
      {!last && <div className="step-line" />}
      <div className="relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground ring-4 ring-primary/10">
        {n}
      </div>
      <div className="min-w-0 flex-1 space-y-2.5 pb-6">
        <p className="pt-0.5 text-sm font-medium text-foreground">{title}</p>
        {children}
      </div>
    </div>
  )
}