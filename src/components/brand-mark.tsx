import { cn } from '#/lib/utils'

/** hearloop's logo. */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn('size-6 shrink-0', className)} aria-hidden>
      <rect width="24" height="24" rx="6" fill="#ededf0" />
      <path d="M8 12a4 4 0 1 1 4 4" stroke="#0d0d0f" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <circle cx="9.5" cy="16" r="1.4" fill="#6e8bff" />
    </svg>
  )
}
