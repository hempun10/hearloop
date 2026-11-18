import { createFileRoute, useRouter } from '@tanstack/react-router'
import { listChangelog, removeEntry } from '#/lib/fns'
import { PageHead } from '../dashboard'

export const Route = createFileRoute('/$org/dashboard/changelog')({
  loader: ({ params }) => listChangelog({ data: params.org }),
  component: Changelog,
})

const fmt = (sec: number) => new Date(sec * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

function Changelog() {
  const entries = Route.useLoaderData()
  const { org } = Route.useParams()
  const router = useRouter()

  async function remove(id: number, title: string) {
    if (!confirm(`Remove "${title}" from the public changelog? The post stays shipped.`)) return
    await removeEntry({ data: { org, id } })
    router.invalidate()
  }

  return (
    <>
      <PageHead title="Changelog">
        <a href={`/${org}/changelog`} target="_blank" rel="noreferrer" className="text-[12px] text-link hover:underline">View public page</a>
      </PageHead>
      <p className="border-b border-line px-6 py-3 text-[13px] text-muted">Entries are written by the agent and published only when Kane CLI passes. You can remove one here.</p>
      {entries.length === 0 ? (
        <p className="px-6 py-10 text-[14px] text-muted">Nothing shipped yet.</p>
      ) : (
        <ul className="m-0 list-none p-0">
          {entries.map((e) => (
            <li key={e.id} className="flex gap-6 border-b border-line px-6 py-5">
              <time className="w-[110px] shrink-0 text-[12px] text-faint tabular-nums">{fmt(e.created_at)}</time>
              <div className="min-w-0 flex-1">
                <p className="m-0 text-[14px] font-semibold">{e.title}</p>
                <p className="mt-1 mb-0 text-[13px] leading-6 text-muted">{e.body}</p>
              </div>
              <button onClick={() => remove(e.id, e.title)} className="h-7 shrink-0 rounded-md border border-line px-2.5 text-[12px] text-muted hover:bg-hover hover:text-fg">Remove</button>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
