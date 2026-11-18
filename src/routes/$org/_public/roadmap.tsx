import { Link, createFileRoute, useLoaderData } from '@tanstack/react-router'
import { STATUS_LABEL, StatusIcon } from '#/components/StatusPill'
import { listPosts } from '#/lib/fns'
import type { Status } from '#/lib/types'

const COLS: Status[] = ['planned', 'building', 'shipped']

export const Route = createFileRoute('/$org/_public/roadmap')({
  loader: ({ params }) => listPosts({ data: params.org }),
  component: Roadmap,
})

function Roadmap() {
  const posts = Route.useLoaderData()
  const { org } = useLoaderData({ from: '/$org' })
  if (!org.show_roadmap) return <Hidden what="roadmap" />
  return (
    <main className="mx-auto max-w-[1072px] px-4 pt-10 md:px-8">
      <h1 className="m-0 text-[24px] font-semibold">Roadmap</h1>
      <p className="mt-2 mb-8 text-[14px] text-muted">What {org.name} is planning, building and has shipped.</p>
      <div className="grid gap-6 md:grid-cols-3">
        {COLS.map((s) => {
          const items = posts.filter((p) => p.status === s)
          return (
            <section key={s} aria-label={STATUS_LABEL[s]}>
              <h2 className="m-0 flex items-center gap-2 border-b border-line pb-3 text-[13px] font-semibold">
                <StatusIcon status={s} className="size-3.5" />{STATUS_LABEL[s]}
                <span className="ml-auto text-[12px] font-normal text-faint tabular-nums">{items.length}</span>
              </h2>
              {items.length === 0 ? (
                <p className="mt-4 text-[13px] text-faint">Nothing here yet.</p>
              ) : (
                <ul className="m-0 mt-3 grid list-none gap-2 p-0">
                  {items.map((p) => (
                    <li key={p.id}>
                      <Link to="/$org/posts/$id" params={{ org: org.slug, id: String(p.id) }}
                        className="flex items-start gap-3 rounded-lg border border-line bg-surface p-3 transition-colors hover:border-line-strong">
                        <span className="min-w-0 flex-1 text-[14px] font-medium">{p.title}</span>
                        <span className="text-[12px] text-faint tabular-nums">▲ {p.votes}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )
        })}
      </div>
    </main>
  )
}

export function Hidden({ what }: { what: string }) {
  return <main className="mx-auto max-w-[720px] px-4 pt-24 text-center"><p className="text-[14px] text-muted">This board's {what} isn't public.</p></main>
}
