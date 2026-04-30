import { Check, Copy } from 'lucide-react'

export function CodeBlock({ code, lang }: { code: string; lang: string }) {
  const isOutput = lang === 'output'
  return (
    <div className="code-wrap">
      <div className="code-header">
        <div className="flex min-w-0 items-center gap-2">
          <span className="code-dot bg-primary/70" />
          <span className="font-mono text-xs text-[hsl(210_10%_50%)]">{isOutput ? 'output' : lang}</span>
        </div>
        {!isOutput && (
          <button
            type="button"
            className="code-copy-btn"
            title="Copy"
            aria-label="Copy to clipboard"
          >
            <Copy className="copy-icon-default h-3.5 w-3.5" strokeWidth={2} aria-hidden />
            <Check className="copy-icon-copied h-3.5 w-3.5" strokeWidth={2.5} aria-hidden />
          </button>
        )}
      </div>
      <pre className={`code-body${isOutput ? ' code-body-output' : ''}`}><code>{code}</code></pre>
    </div>
  )
}
