import { createFileRoute } from '@tanstack/react-router'
import { listRuns } from '#/lib/fns'
import { ago } from '#/lib/time'
import { PageHead } from '../dashboard'

export const Route = createFileRoute('/$org/dashboard/runs')({
  loader: ({ params }) => listRuns({ data: params.org }),
  component: Runs,
})

function Runs() {
  const runs = Route.useLoaderData()
  const { org } = Route.useParams()
  const passed = runs.filter((r) => r.passed).length
  return (
    <>
      <PageHead title="Kane runs">
        <span className="text-[12px] text-muted tabular-nums">{runs.length} runs · {passed} passed · {runs.length - passed} failed</span>
      </PageHead>
      {runs.length === 0 ? (
        <p className="px-6 py-10 text-[14px] text-muted">No Kane runs yet. Generate a loop token in Settings and run <code className="font-mono text-[13px]">bun run loop</code>.</p>
      ) : (
        <ul className="m-0 list-none p-0">
          {runs.map((r) => (
            <li key={r.id} data-testid="run-row" className="border-b border-line">
              <details className="group">
                <summary className="flex h-[52px] cursor-pointer list-none items-center gap-3 px-6 hover:bg-surface/60">
                  <span className={`size-2 shrink-0 rounded-full ${r.passed ? 'bg-shipped' : 'bg-planned'}`} />
                  <span className="w-14 text-[12px] font-medium">{r.passed ? 'Passed' : 'Failed'}</span>
                  <span className="min-w-0 flex-1 truncate text-[14px]">{r.title}</span>
                  <span className="text-[12px] text-faint tabular-nums">{ago(r.created_at)}</span>
                  <svg viewBox="0 0 12 12" className="size-3 text-faint transition-transform group-open:rotate-90" aria-hidden><path d="M4.5 3 7.5 6l-3 3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                </summary>
                <div className="px-6 pb-4">
                  <pre className="m-0 overflow-x-auto rounded-lg bg-surface p-3 font-mono text-[12px] leading-5 whitespace-pre-wrap text-muted">{r.summary}</pre>
                  <a href={`/${org}/posts/${r.post_id}`} target="_blank" rel="noreferrer" className="mt-2 inline-block text-[12px] text-link hover:underline">Open post</a>
                </div>
              </details>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
