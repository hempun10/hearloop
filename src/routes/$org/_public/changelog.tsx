import { Link, createFileRoute, useLoaderData } from '@tanstack/react-router'
import { Hidden } from './roadmap'
import { listChangelog } from '#/lib/fns'

export const Route = createFileRoute('/$org/_public/changelog')({
  loader: ({ params }) => listChangelog({ data: params.org }),
  component: Changelog,
})

const fmt = (sec: number) => new Date(sec * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

function Changelog() {
  const entries = Route.useLoaderData()
  const { org } = Route.useParams()
  const parent = useLoaderData({ from: '/$org' })
  if (!parent.org.show_changelog) return <Hidden what="changelog" />
  return (
    <main className="mx-auto max-w-[1008px] px-4 pt-10 md:px-0">
      <h1 className="m-0 text-[24px] font-semibold">Changelog</h1>
      <p className="mt-2 mb-10 text-[14px] text-muted">Every entry here passed a Kane CLI verification before it was published.</p>
      {entries.length === 0 ? (
        <p className="border-t border-line pt-6 text-[14px] text-muted">Nothing shipped yet. The first passing Kane run lands here.</p>
      ) : (
        <ol className="m-0 list-none p-0">
          {entries.map((e) => (
            <li key={e.id} data-testid="entry" className="flex flex-col gap-2 border-t border-line py-8 md:flex-row md:gap-12">
              <time className="w-[160px] shrink-0 text-[13px] text-muted tabular-nums">{fmt(e.created_at)}</time>
              <div className="min-w-0 flex-1 md:max-w-[720px]">
                <h2 className="m-0 text-[18px] font-semibold">{e.title}</h2>
                <p className="mt-2 mb-0 whitespace-pre-wrap text-[15px] leading-7 text-muted">{e.body}</p>
                <Link to="/$org/posts/$id" params={{ org, id: String(e.post_id) }}
                  className="mt-4 inline-flex items-center gap-1.5 rounded-md bg-shipped/10 px-2 py-0.5 text-[12px] font-medium text-fg hover:bg-shipped/20">
                  <span className="size-1.5 rounded-full bg-shipped" />
                  Verified with Kane CLI · from post #{e.post_id}
                </Link>
              </div>
            </li>
          ))}
        </ol>
      )}
    </main>
  )
}
