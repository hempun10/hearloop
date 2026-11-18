// The real loop, replayed: the latest passing Kane run, or the shape of one.
const FALLBACK_STEPS = ['Opened the board and found the new control', 'Exercised it the way the request described', 'Checked the result on the page']

/** Kane's own words from a run summary ("Objective…\nKane: passed…\nstep\nstep…"). */
export const kaneSteps = (summary: string, max: number) => summary.split('\n').slice(2).filter(Boolean).slice(0, max)

export function LoopTerminal({ run }: { run: { title: string; summary: string } | null }) {
  const steps = run ? kaneSteps(run.summary, 3) : FALLBACK_STEPS
  const lines: [string, string][] = [
    ['text-faint', '$ bun run loop'],
    ['text-foreground', `▶ ${run?.title ?? 'Top request'}`],
    ['text-muted-foreground', '  agent building… done, build passed'],
    ['text-muted-foreground', '  Kane verifying in a real browser'],
    ...steps.map((s): [string, string] => ['text-muted-foreground', `    · ${s}`]),
    ['text-status-shipped', '  ✓ passed. Shipped and announced.'],
  ]
  return (
    <div className="border-beam mx-auto mt-16 max-w-3xl rounded-2xl border bg-card/90 text-left shadow-[0_30px_80px_-20px_rgb(0_0_0/0.6)]">
      <div className="flex items-center gap-1.5 border-b px-4 py-3">
        {[0, 1, 2].map((i) => <span key={i} className="size-2.5 rounded-full bg-input" />)}
        <span className="ml-3 font-mono text-[11px] text-faint">hearloop-v2 — loop</span>
      </div>
      <pre className="overflow-x-auto p-5 font-mono text-xs leading-6 whitespace-pre-wrap">
        {lines.map(([cls, text], i) => (
          <span key={i} className={`type-in block ${cls}`} style={{ animationDelay: `${400 + i * 350}ms` }}>{text}</span>
        ))}
      </pre>
    </div>
  )
}
