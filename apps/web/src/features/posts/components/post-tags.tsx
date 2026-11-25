import { cn } from '@hearloop/ui/lib/utils'

export function TagChip({
  children,
  active,
  className,
}: {
  children: React.ReactNode
  active?: boolean
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex h-5 items-center gap-1 rounded-md border bg-secondary px-1.5 text-[12px] text-muted-foreground',
        active && 'border-foreground/40 text-foreground',
        className,
      )}
    >
      {children}
    </span>
  )
}

export function TagList({ tags }: { tags: string[] }) {
  if (!tags.length) return null
  return (
    <ul aria-label="Tags" className="flex flex-wrap gap-1.5">
      {tags.map((t) => (
        <li key={t}>
          <TagChip>{t}</TagChip>
        </li>
      ))}
    </ul>
  )
}
