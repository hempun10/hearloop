import { Check } from 'lucide-react'
import { Input } from '@hearloop/ui/components/input'
import { cn } from '@hearloop/ui/lib/utils'
import { ACCENT_SWATCHES, DEFAULT_ACCENT } from '../org.schema'

/** Preset swatches plus a free hex value. An empty value means the default accent. */
export function AccentPicker({ value, onChange }: { value: string; onChange: (hex: string) => void }) {
  const current = (value || DEFAULT_ACCENT).toLowerCase()
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="flex flex-wrap gap-1.5" role="radiogroup" aria-label="Accent colour">
        {ACCENT_SWATCHES.map((s) => {
          const selected = current === s.value
          return (
            <button
              key={s.value}
              type="button"
              role="radio"
              aria-checked={selected}
              aria-label={`${s.name} accent`}
              title={s.name}
              onClick={() => onChange(s.value)}
              className={cn(
                'inline-flex size-[22px] items-center justify-center rounded-full',
                selected && 'ring-2 ring-foreground ring-offset-2 ring-offset-background',
              )}
              style={{ background: s.value }}
            >
              {selected && <Check className="size-3 text-black/80" strokeWidth={3} />}
            </button>
          )
        })}
      </span>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={DEFAULT_ACCENT}
        aria-label="Accent hex"
        className="h-8 w-24 rounded-lg border-input bg-card px-2.5 text-[12px] tabular-nums shadow-none"
      />
    </div>
  )
}
