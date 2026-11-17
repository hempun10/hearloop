export function ago(sec: number) {
  const s = Math.max(1, Math.floor(Date.now() / 1000 - sec))
  const steps: [number, string][] = [[604800, 'w'], [86400, 'd'], [3600, 'h'], [60, 'm']]
  for (const [n, u] of steps) if (s >= n) return `${Math.floor(s / n)}${u}`
  return 'now'
}
