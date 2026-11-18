import { Search } from 'lucide-react'
import { type ReactNode, useRef, useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { Kbd } from '#/components/ui/kbd'
import { cn } from '#/lib/utils'

/** The rounded panel every dashboard page lives in, with its 52px top bar. */
export function Panel({ title, actions, aside, onSearch, className, children }: {
  title: ReactNode
  actions?: ReactNode
  aside?: ReactNode
  onSearch?: (q: string) => void
  className?: string
  children: ReactNode
}) {
  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col p-3 md:pl-0">
      <div className="flex min-h-0 flex-1 overflow-hidden rounded-xl border bg-background">
        {aside}
        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <div className="flex h-[52px] shrink-0 items-center justify-between gap-3 border-b pr-5 pl-12 md:pl-5">
            <h1 className="truncate text-[17px] font-semibold">{title}</h1>
            <div className="flex items-center gap-2">
              {actions}
              {onSearch && <PanelSearch onSearch={onSearch} />}
            </div>
          </div>
          <div key={typeof title === 'string' ? title : undefined}
            className={cn('scrollbar-thin min-h-0 flex-1 overflow-auto animate-in fade-in-0 duration-150 motion-reduce:animate-none', className)}>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

function PanelSearch({ onSearch }: { onSearch: (q: string) => void }) {
  const [q, setQ] = useState('')
  const ref = useRef<HTMLInputElement>(null)
  useHotkeys('mod+k', (e) => { e.preventDefault(); ref.current?.focus() })
  const set = (v: string) => { setQ(v); onSearch(v) }
  return (
    <div className="relative hidden md:block">
      <Search className="pointer-events-none absolute top-1/2 left-2.5 size-[13px] -translate-y-1/2 text-faint" />
      <input ref={ref} type="search" value={q} onChange={(e) => set(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Escape') { set(''); e.currentTarget.blur() } }}
        placeholder="Search posts" aria-label="Search posts"
        className="h-[30px] w-[220px] rounded-lg border bg-card pr-10 pl-7 text-[13px] outline-none placeholder:text-faint focus:border-ring/60 [&::-webkit-search-cancel-button]:hidden" />
      <Kbd className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2">⌘K</Kbd>
    </div>
  )
}

export function PageHead({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="flex flex-col gap-1 pb-7">
      <h2 className="text-xl font-semibold tracking-[-0.02em]">{title}</h2>
      <p className="text-[13px] text-muted-foreground">{sub}</p>
    </div>
  )
}

export function SectionHead({ title, className }: { title: string; className?: string }) {
  return <h3 className={cn('pb-2 text-sm font-semibold', className)}>{title}</h3>
}

/** Settings row: label and help left, control right, hairline above. The control wraps under the label when it can't fit. */
export function Row({ label, help, htmlFor, children }: { label: string; help?: ReactNode; htmlFor?: string; children: ReactNode }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2.5 border-t py-3.5">
      <div className="flex min-w-[180px] flex-[1_1_200px] flex-col gap-0.5">
        <label htmlFor={htmlFor} className="text-[13px] font-semibold">{label}</label>
        {help && <div className="text-xs text-faint">{help}</div>}
      </div>
      <div className="max-w-full min-w-0">{children}</div>
    </div>
  )
}

/** Old-dashboard input look for shadcn Input/Select triggers. */
export const fieldClass = 'h-8 w-[280px] max-w-full rounded-lg border-input bg-card px-2.5 text-[13px] shadow-none'
