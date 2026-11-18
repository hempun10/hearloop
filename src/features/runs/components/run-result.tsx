import { cn } from '#/lib/utils'

/** "Passed" / "Failed" with a status dot. */
export function RunResult({ passed, className }: { passed: boolean; className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2 text-[13px] font-medium', className)}>
      <span className={cn('size-2 shrink-0 rounded-full', passed ? 'bg-status-shipped' : 'bg-status-planned')} />
      {passed ? 'Passed' : 'Failed'}
    </span>
  )
}

/** Kane's step-by-step report, as the loop recorded it. */
export function RunReport({ summary, className }: { summary: string; className?: string }) {
  return (
    <pre className={cn('overflow-x-auto rounded-lg bg-card p-3 font-mono text-xs leading-5 whitespace-pre-wrap text-muted-foreground', className)}>
      {summary}
    </pre>
  )
}
