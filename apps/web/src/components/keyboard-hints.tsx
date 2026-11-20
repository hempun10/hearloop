import { Kbd } from '@hearloop/ui/components/kbd'

const HINTS = [
  [['j', 'k'], 'move'],
  [['v'], 'vote'],
  [['enter'], 'open'],
  [['c'], 'new post'],
] as const

export function KeyboardHints() {
  return (
    <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-5 gap-y-2 px-4 text-xs text-faint">
      {HINTS.map(([keys, label]) => (
        <span key={label} className="inline-flex items-center gap-1">
          {keys.map((k) => <Kbd key={k}>{k}</Kbd>)} {label}
        </span>
      ))}
    </div>
  )
}
