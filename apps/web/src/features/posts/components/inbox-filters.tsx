import { CircleDashed, LayoutGrid, ListFilter, Tag, X, type LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import {
  DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuSub, DropdownMenuSubContent,
  DropdownMenuSubTrigger, DropdownMenuTrigger,
} from '@hearloop/ui/components/dropdown-menu'
import { Button } from '@hearloop/ui/components/button'
import { cn } from '@hearloop/ui/lib/utils'

export type FilterValue = string | number
/** One column you can filter on, with the values it can take. */
export type FilterField = { key: string; label: string; icon: LucideIcon; plural: string; options: { value: FilterValue; label: string; icon?: ReactNode }[] }
type Props = { fields: FilterField[]; value: Record<string, FilterValue[] | undefined>; onChange: (key: string, values: FilterValue[]) => void }

const toggle = (list: FilterValue[], v: FilterValue) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v])

function Options({ field, selected, onChange }: { field: FilterField; selected: FilterValue[]; onChange: (values: FilterValue[]) => void }) {
  return field.options.map((o) => (
    <DropdownMenuCheckboxItem key={String(o.value)} checked={selected.includes(o.value)} onSelect={(e) => e.preventDefault()}
      onCheckedChange={() => onChange(toggle(selected, o.value))} className="text-[13px]">
      {o.icon}{o.label}
    </DropdownMenuCheckboxItem>
  ))
}

/** "Filter" opens the columns; each column opens its values to tick, as in Linear. */
export function FilterMenu({ fields, value, onChange, className }: Props & { className?: string }) {
  const active = fields.some((f) => value[f.key]?.length)
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={cn(className, active ? 'text-foreground' : 'text-muted-foreground')}>
        <ListFilter className="size-3.5" />Filter
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-44">
        {fields.filter((f) => f.options.length).map((f) => (
          <DropdownMenuSub key={f.key}>
            <DropdownMenuSubTrigger className="text-[13px]"><f.icon className="size-3.5 text-muted-foreground" />{f.label}</DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="min-w-48">
              <Options field={f} selected={value[f.key] ?? []} onChange={(v) => onChange(f.key, v)} />
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

/** One chip per active filter: column · operator · values · clear. */
export function FilterChips({ fields, value, onChange, onClearAll }: Props & { onClearAll: () => void }) {
  const active = fields.filter((f) => value[f.key]?.length)
  if (!active.length) return null
  return (
    <div className="flex flex-wrap items-center gap-1.5 px-4 pb-2.5 animate-in fade-in-0 slide-in-from-top-1 duration-150 motion-reduce:animate-none">
      {active.map((f) => {
        const selected = value[f.key]!
        const picked = f.options.filter((o) => selected.includes(o.value))
        return (
          <span key={f.key} data-testid="filter-chip" className="inline-flex h-7 items-center divide-x rounded-md border bg-card text-xs">
            <span className="inline-flex h-full items-center gap-1.5 px-2 font-medium"><f.icon className="size-3 text-muted-foreground" />{f.label}</span>
            <span className="inline-flex h-full items-center px-2 text-muted-foreground">{selected.length > 1 ? 'is any of' : 'is'}</span>
            <DropdownMenu>
              <DropdownMenuTrigger aria-label={`Change ${f.label.toLowerCase()} filter`} className="inline-flex h-full items-center gap-1.5 px-2 outline-none hover:bg-accent">
                {picked.slice(0, 3).map((o) => <span key={String(o.value)} className="inline-flex">{o.icon}</span>)}
                {picked.length <= 2 ? picked.map((o) => o.label).join(', ') : `${picked.length} ${f.plural}`}
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="min-w-48">
                <Options field={f} selected={selected} onChange={(v) => onChange(f.key, v)} />
              </DropdownMenuContent>
            </DropdownMenu>
            <button type="button" aria-label={`Clear ${f.label.toLowerCase()} filter`} onClick={() => onChange(f.key, [])}
              className="inline-flex h-full items-center px-1.5 text-faint hover:bg-accent hover:text-foreground"><X className="size-3" /></button>
          </span>
        )
      })}
      {active.length > 1 && <Button variant="ghost" size="sm" className="h-7 px-2 text-xs text-muted-foreground" onClick={onClearAll}>Clear all</Button>}
    </div>
  )
}

export const FILTER_ICONS = { status: CircleDashed, board: LayoutGrid, tag: Tag }
