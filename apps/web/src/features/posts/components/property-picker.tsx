import { Check, Plus } from 'lucide-react'
import { type ReactNode, useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@hearloop/ui/components/command'
import { Kbd } from '@hearloop/ui/components/kbd'
import { Popover, PopoverContent, PopoverTrigger } from '@hearloop/ui/components/popover'
import { cn } from '@hearloop/ui/lib/utils'

type PickerOption = { value: string; label: string; icon?: ReactNode }

type Props = {
  /** what it sets, e.g. "status": the trigger's name and the search's "Change status…" */
  what: string
  hint?: string
  trigger: ReactNode
  options: PickerOption[]
  selected: string[]
  onSelect: (value: string) => void
  /** many values (tags): the menu stays open and ticks toggle */
  multi?: boolean
  /** offer "Create …" for a typed value that isn't listed */
  onCreate?: (value: string) => void
  className?: string
}

/** A Linear-style property menu: a quiet pill that opens a search, then the options with a tick and number keys 1–9. */
export function PropertyPicker({
  what,
  hint,
  trigger,
  options,
  selected,
  onSelect,
  multi,
  onCreate,
  className,
}: Props) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  // the hint key opens it (react-hotkeys-hook ignores keys typed into fields)
  useHotkeys(
    hint?.toLowerCase() ?? '',
    (e) => {
      e.preventDefault()
      setOpen(true)
    },
    { enabled: !!hint },
    [hint],
  )
  const pick = (v: string) => {
    onSelect(v)
    if (!multi) setOpen(false)
  }
  const typed = search.trim()
  const canCreate = onCreate && typed && !options.some((o) => o.label.toLowerCase() === typed.toLowerCase())
  return (
    <Popover
      open={open}
      onOpenChange={(o) => {
        setOpen(o)
        if (!o) setSearch('')
      }}
    >
      <PopoverTrigger
        aria-label={`Change ${what}`}
        className={cn(
          'inline-flex h-8 max-w-full items-center gap-2 rounded-md px-2 text-[13px] font-medium outline-none hover:bg-accent focus-visible:ring-1 focus-visible:ring-ring data-[state=open]:bg-accent',
          className,
        )}
      >
        {trigger}
      </PopoverTrigger>
      <PopoverContent align="start" className="w-64 overflow-hidden rounded-xl p-0">
        <Command
          onKeyDown={(e) => {
            // number keys pick an option while the search is empty, as in Linear
            const n = Number(e.key)
            if (search || !Number.isInteger(n) || n < 1 || n > Math.min(9, options.length)) return
            e.preventDefault()
            pick(options[n - 1].value)
          }}
        >
          <div className="relative">
            <CommandInput
              value={search}
              onValueChange={setSearch}
              placeholder={`Change ${what}…`}
              className="h-11 text-[13px]"
            />
            {hint && <Kbd className="absolute top-1/2 right-3 -translate-y-1/2">{hint}</Kbd>}
          </div>
          <CommandList className="max-h-72 p-1">
            {!canCreate && (
              <CommandEmpty className="py-4 text-center text-[13px] text-muted-foreground">No match.</CommandEmpty>
            )}
            <CommandGroup className="p-0">
              {options.map((o, i) => (
                <CommandItem
                  key={o.value}
                  value={`${o.label} ${o.value}`}
                  onSelect={() => pick(o.value)}
                  className="h-9 gap-2.5 rounded-lg px-2.5 text-[13px]"
                >
                  {o.icon}
                  <span className="flex-1 truncate">{o.label}</span>
                  {selected.includes(o.value) && <Check className="size-3.5" />}
                  {i < 9 && <span className="w-3 text-right text-xs text-faint tabular-nums">{i + 1}</span>}
                </CommandItem>
              ))}
              {canCreate && (
                <CommandItem
                  value={`create ${typed}`}
                  onSelect={() => {
                    onCreate(typed)
                    setSearch('')
                  }}
                  className="h-9 gap-2.5 rounded-lg px-2.5 text-[13px]"
                >
                  <Plus className="size-3.5 text-muted-foreground" />
                  Create “{typed}”
                </CommandItem>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
