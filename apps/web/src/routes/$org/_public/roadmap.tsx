import { useSuspenseQuery } from '@tanstack/react-query'
import { Link, createFileRoute } from '@tanstack/react-router'
import { ChevronUp } from 'lucide-react'
import { NotPublic } from '#/features/orgs/components/not-public'
import { useOrg } from '#/features/orgs/use-org'
import { StatusIconFor } from '#/features/posts/components/status-icon'
import { postListQuery } from '#/features/posts/post.queries'
import { statusKey } from '#/features/posts/status'
import { useStatuses } from '#/features/posts/use-statuses'

export const Route = createFileRoute('/$org/_public/roadmap')({
  loader: ({ context, params }) => context.queryClient.query(postListQuery(params.org)),
  component: RoadmapPage,
})

function RoadmapPage() {
  const { org } = useOrg()
  const { data: posts } = useSuspenseQuery(postListQuery(org.slug))
  const columns = useStatuses().filter((s) => s.kind !== 'open')
  if (!org.showRoadmap) return <NotPublic what="roadmap" />
  return (
    <main className="mx-auto max-w-6xl px-4 pt-10 md:px-8">
      <h1 className="text-2xl font-semibold">Roadmap</h1>
      <p className="mt-2 mb-8 text-sm text-muted-foreground">What {org.name} is planning, building and has shipped.</p>
      <div className="grid gap-6 md:grid-cols-3">
        {columns.map((status) => {
          const items = posts.filter((p) => statusKey(p) === status.key)
          return (
            <section key={status.key} aria-label={status.label}>
              <h2 className="flex items-center gap-2 border-b pb-3 text-[13px] font-semibold">
                <StatusIconFor option={status} className="size-3.5" />
                {status.label}
                <span className="ml-auto text-xs font-normal text-faint tabular-nums">{items.length}</span>
              </h2>
              {items.length === 0 ? (
                <p className="mt-4 text-[13px] text-faint">Nothing here yet.</p>
              ) : (
                <ul className="mt-3 grid gap-2">
                  {items.map((p) => (
                    <li key={p.id}>
                      <Link to="/$org/posts/$id" params={{ org: org.slug, id: String(p.id) }}
                        className="flex items-start gap-3 rounded-lg border bg-card p-3 transition-colors hover:border-input">
                        <span className="min-w-0 flex-1 text-sm font-medium">{p.title}</span>
                        <span className="inline-flex items-center text-xs text-faint tabular-nums"><ChevronUp className="size-3" />{p.votes}</span>
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
