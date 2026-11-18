export function StatsStrip({ stats }: { stats: { posts: number; votes: number; runs: number; shipped: number } }) {
  const items = [['Requests', stats.posts], ['Votes', stats.votes], ['Kane runs', stats.runs], ['Shipped', stats.shipped]] as const
  return (
    <section className="mx-auto mt-20 max-w-6xl px-4 md:px-8">
      <dl className="grid grid-cols-2 border-y md:grid-cols-4 md:divide-x">
        {items.map(([label, n]) => (
          <div key={label} className="flex flex-col-reverse px-6 py-8 text-center">
            <dt className="mt-1 text-[13px] text-muted-foreground">{label}</dt>
            <dd className="text-4xl font-semibold tracking-tight tabular-nums">{n}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
