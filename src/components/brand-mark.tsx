import { cn } from '#/lib/utils'

/** hearloop's logo: an open loop around a dot. */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn('size-6 shrink-0 text-foreground', className)} aria-hidden>
      <path d="M12 4a8 8 0 1 1-8 8" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" />
      <circle cx="12" cy="12" r="2.5" fill="currentColor" />
    </svg>
  )
}
