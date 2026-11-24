
export const initials = (name: string) => name.split(/\s+/).map((w) => w[0]).join('').slice(0, 2).toUpperCase()

export function Initials({ name, className = 'size-5 text-[9px]' }: { name: string; className?: string }) {
  return <span title={name} className={`inline-flex shrink-0 items-center justify-center rounded-full bg-secondary font-semibold text-foreground ring-1 ring-border ${className}`}>{initials(name)}</span>
}
