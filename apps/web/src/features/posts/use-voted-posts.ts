import { useCallback, useSyncExternalStore } from 'react'

// ponytail: per-browser vote dedupe; move to per-account votes if abuse matters
const KEY = 'hearloop:voted'
const listeners = new Set<() => void>()
const read = () => (typeof localStorage === 'undefined' ? '[]' : (localStorage.getItem(KEY) ?? '[]'))

function subscribe(cb: () => void) {
  listeners.add(cb)
  window.addEventListener('storage', cb)
  return () => { listeners.delete(cb); window.removeEventListener('storage', cb) }
}

/** Whether this browser already voted for a post, and a way to record it. */
export function useVoted(id: number) {
  const raw = useSyncExternalStore(subscribe, read, () => '[]')
  const voted = (JSON.parse(raw) as number[]).includes(id)
  const markVoted = useCallback(() => {
    localStorage.setItem(KEY, JSON.stringify([...new Set([...(JSON.parse(read()) as number[]), id])]))
    listeners.forEach((l) => l())
  }, [id])
  const unmark = useCallback(() => {
    localStorage.setItem(KEY, JSON.stringify((JSON.parse(read()) as number[]).filter((x) => x !== id)))
    listeners.forEach((l) => l())
  }, [id])
  return { voted, markVoted, unmark }
}
