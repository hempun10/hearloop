import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useState } from 'react'
import { STATUS_LABEL, StatusIcon } from '#/components/StatusPill'
import { listPosts, setPostStatus } from '#/lib/fns'
import { STATUSES, type Status } from '#/lib/types'
import { PageHead } from '../dashboard'

export const Route = createFileRoute('/$org/dashboard/roadmap')({
  loader: ({ params }) => listPosts({ data: params.org }),
  component: Roadmap,
})

function Roadmap() {
  const all = Route.useLoaderData()
  const { org } = Route.useParams()
  const router = useRouter()
  const [moved, setMoved] = useState<Record<number, Status>>({})
  const [over, setOver] = useState<Status | null>(null)
  const posts = all.map((p) => (moved[p.id] ? { ...p, status: moved[p.id] } : p))

  async function drop(s: Status, id: number) {
    setOver(null)
    if (!id || posts.find((p) => p.id === id)?.status === s) return
    setMoved((m) => ({ ...m, [id]: s }))
    await setPostStatus({ data: { org, id, status: s } })
    await router.invalidate()
    setMoved((m) => { const n = { ...m }; delete n[id]; return n })
  }

  return (
    <>
      <PageHead title="Roadmap"><span className="text-[12px] text-faint">Drag a card to change its status</span></PageHead>
      <div className="grid gap-4 p-6 md:grid-cols-2 xl:grid-cols-4">
        {STATUSES.map((s) => {
          const items = posts.filter((p) => p.status === s)
          return (
            <section key={s} aria-label={STATUS_LABEL[s]}
              onDragOver={(e) => { e.preventDefault(); setOver(s) }}
              onDragLeave={() => setOver((o) => (o === s ? null : o))}
              onDrop={(e) => drop(s, Number(e.dataTransfer.getData('text/plain')))}
              className={`min-h-[240px] rounded-xl border p-3 transition-colors ${over === s ? 'border-link bg-link/5' : 'border-line bg-surface/40'}`}>
              <h2 className="m-0 mb-3 flex items-center gap-2 px-1 text-[13px] font-semibold">
                <StatusIcon status={s} className="size-3.5" />{STATUS_LABEL[s]}
                <span className="ml-auto text-[12px] font-normal text-faint tabular-nums">{items.length}</span>
              </h2>
              <ul className="m-0 grid list-none gap-2 p-0">
                {items.map((p) => (
                  <li key={p.id} draggable onDragStart={(e) => e.dataTransfer.setData('text/plain', String(p.id))}
                    className="cursor-grab rounded-lg border border-line bg-bg p-3 active:cursor-grabbing">
                    <p className="m-0 text-[13px] leading-5 font-medium">{p.title}</p>
                    <div className="mt-2 flex items-center justify-between text-[12px] text-faint">
                      <span className="tabular-nums">▲ {p.votes}</span>
                      {/* keyboard alternative to dragging */}
                      <select value={p.status} onChange={(e) => drop(e.target.value as Status, p.id)} aria-label={`Move ${p.title}`}
                        className="h-6 rounded border border-line bg-surface px-1 text-[11px] text-muted outline-none">
                        {STATUSES.map((x) => <option key={x} value={x}>{STATUS_LABEL[x]}</option>)}
                      </select>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )
        })}
      </div>
    </>
  )
}
