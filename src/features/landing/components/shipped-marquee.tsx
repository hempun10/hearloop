import { Link } from '@tanstack/react-router'
import type { ChangelogEntry } from '#/db/schema'
import { DEMO_ORG } from '../landing.functions'

export function ShippedMarquee({ entries }: { entries: Pick<ChangelogEntry, 'postId' | 'title'>[] }) {
  if (!entries.length) return null
  // repeat enough to fill the strip twice, so the CSS loop is seamless
  const loop = Array.from({ length: Math.max(2, Math.ceil(8 / entries.length)) * 2 }, () => entries).flat()
  return (
    <section className="pt-24" aria-label="Recently shipped">
      <p className="mb-5 text-center text-xs text-faint">Recently shipped, each one verified with Kane CLI</p>
      <div className="marquee overflow-hidden">
        <div className="flex w-max gap-3">
          {loop.map((e, i) => {
            const copy = i >= entries.length
            return (
              <Link key={i} to="/$org/posts/$id" params={{ org: DEMO_ORG, id: String(e.postId) }} aria-hidden={copy || undefined} tabIndex={copy ? -1 : undefined}
                className="flex shrink-0 items-center gap-2 rounded-full border bg-card px-4 py-2 text-[13px] text-muted-foreground hover:text-foreground">
                <span className="size-1.5 rounded-full bg-status-shipped" />{e.title}
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
