import { Check } from 'lucide-react'
import { InputGroup, InputGroupAddon, InputGroupInput } from '#/components/ui/input-group'
import { cn } from '#/lib/utils'
import { ACCENT_SWATCHES, DEFAULT_ACCENT } from '../org.schema'

/** Preset swatches plus a free hex value. An empty value means the default accent. */
export function AccentPicker({ value, onChange }: { value: string; onChange: (hex: string) => void }) {
  const current = (value || DEFAULT_ACCENT).toLowerCase()
  return (
    <div className="flex flex-wrap items-center gap-2" role="radiogroup" aria-label="Accent colour">
      {ACCENT_SWATCHES.map((s) => {
        const selected = current === s.value
        return (
          <button key={s.value} type="button" role="radio" aria-checked={selected} aria-label={`${s.name} accent`} title={s.name}
            onClick={() => onChange(s.value)}
            className={cn('flex size-7 items-center justify-center rounded-full border-2 transition-transform hover:scale-110', selected ? 'border-foreground' : 'border-transparent')}
            style={{ background: s.value }}>
            {selected && <Check className="size-3.5 text-black/70" strokeWidth={3} />}
          </button>
        )
      })}
      <InputGroup className="w-36">
        <InputGroupAddon>
          <input type="color" value={current} onChange={(e) => onChange(e.target.value)} aria-label="Custom accent"
            className="size-5 cursor-pointer rounded-full border-0 bg-transparent p-0" />
        </InputGroupAddon>
        <InputGroupInput value={value} onChange={(e) => onChange(e.target.value)} placeholder={DEFAULT_ACCENT} aria-label="Accent hex" className="font-mono text-[13px]" />
      </InputGroup>
    </div>
  )
}
