import type { ReactNode } from 'react'

export function Step({ n, last = false, title, children }: {
  n: number; last?: boolean; title: string; children: ReactNode
}) {
  return (
    <div className="relative flex gap-4">
      {!last && <div className="step-line" />}
      <div className="step-marker">
        {n}
      </div>
      <div className="min-w-0 flex-1 space-y-3 pb-7">
        <p className="step-title">{title}</p>
        {children}
      </div>
    </div>
  )
}
