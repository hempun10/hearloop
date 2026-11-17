import { useEffect, useState } from 'react'
import { vote } from '#/lib/fns'

// ponytail: per-browser vote dedupe via localStorage; add accounts if abuse matters
const KEY = 'hearloop:voted'
const read = () => new Set<number>(JSON.parse(localStorage.getItem(KEY) ?? '[]'))

export default function VoteButton({ id, count }: { id: number; count: number }) {
  const [voted, setVoted] = useState(false)
  const [shown, setShown] = useState(count)
  useEffect(() => setVoted(read().has(id)), [id])
  useEffect(() => setShown(count), [count])

  async function onClick(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    if (voted) return
    const v = read().add(id)
    localStorage.setItem(KEY, JSON.stringify([...v]))
    setVoted(true)
    setShown((n) => n + 1) // optimistic
    await vote({ data: id }).catch(() => {
      setVoted(false)
      setShown((n) => n - 1)
    })
  }

  return (
    <button
      type="button"
      data-vote
      onClick={onClick}
      aria-pressed={voted}
      aria-label={`${shown} votes, ${voted ? 'voted' : 'vote'}`}
      className={`flex h-14 w-12 shrink-0 flex-col items-center justify-center gap-0.5 rounded-lg border transition-[background-color,border-color,color,box-shadow] duration-200 ease-out active:translate-y-px ${
        voted
          ? 'border-link bg-link text-bg shadow-[0_2px_10px_color-mix(in_oklch,var(--color-link)_28%,transparent)]'
          : 'border-line bg-surface text-muted hover:border-line-strong hover:text-fg'
      }`}
    >
      <svg viewBox="0 0 12 12" className="size-3" aria-hidden>
        <path d="M2.5 7.5 6 4l3.5 3.5" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span data-testid="votes" className={`text-[13px] leading-none font-semibold tabular-nums ${voted ? 'text-bg' : 'text-fg'}`}>{shown}</span>
    </button>
  )
}
