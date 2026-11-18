import { createFileRoute, redirect } from '@tanstack/react-router'
import { useState } from 'react'
import { getOrg, hasToken, regenerateToken } from '#/lib/fns'

export const Route = createFileRoute('/$org/settings')({
  validateSearch: (s: Record<string, unknown>): { welcome?: boolean } => (s.welcome ? { welcome: true } : {}),
  beforeLoad: ({ context, params }) => {
    if (!context.me) throw redirect({ to: '/login', search: { next: `/${params.org}/settings` } })
  },
  loader: async ({ params }) => {
    const r = await getOrg({ data: params.org })
    if (!r?.member) throw redirect({ to: '/$org', params })
    return { org: r.org, hasToken: await hasToken({ data: params.org }) }
  },
  component: Settings,
})

function Settings() {
  const { org, hasToken: had } = Route.useLoaderData()
  const { welcome } = Route.useSearch()
  const [token, setToken] = useState('')
  const [busy, setBusy] = useState(false)
  const [copied, setCopied] = useState(false)
  const origin = typeof window === 'undefined' ? '' : window.location.origin
  const boardUrl = `${origin}/${org.slug}`

  async function generate() {
    if (had && !token && !confirm('The old token stops working right away. Continue?')) return
    setBusy(true)
    setToken(await regenerateToken({ data: org.slug }))
    setBusy(false)
  }

  const cmd = `APP_URL=${origin} ORG=${org.slug} API_TOKEN=${token || '<token>'} bun run loop`
  return (
    <main className="mx-auto max-w-[720px] px-4 pt-10">
      {welcome && (
        <p className="mb-8 rounded-xl border border-line bg-surface p-4 text-[14px] leading-6">
          <span className="font-semibold">{org.name} is live.</span> <span className="text-muted">Share the board link with your users, then give the loop a token so an agent can build and Kane can verify.</span>
        </p>
      )}
      <h1 className="m-0 text-[24px] font-semibold">Settings</h1>

      <section className="mt-8 border-t border-line pt-6">
        <h2 className="m-0 text-[15px] font-semibold">Board</h2>
        <dl className="mt-4 grid grid-cols-[120px_1fr] gap-y-3 text-[14px]">
          <dt className="text-faint">Name</dt><dd className="m-0">{org.name}</dd>
          <dt className="text-faint">Public link</dt>
          <dd className="m-0 flex items-center gap-2">
            <a href={boardUrl} className="truncate text-link hover:underline">{boardUrl}</a>
            <button onClick={() => { navigator.clipboard.writeText(boardUrl); setCopied(true); setTimeout(() => setCopied(false), 1500) }}
              className="h-7 shrink-0 rounded-md border border-line px-2 text-[12px] text-muted hover:bg-hover">{copied ? 'Copied' : 'Copy'}</button>
          </dd>
        </dl>
      </section>

      <section className="mt-10 border-t border-line pt-6">
        <h2 className="m-0 text-[15px] font-semibold">Loop API token</h2>
        <p className="mt-2 text-[14px] leading-6 text-muted">
          The loop uses this token to move posts to building and to record Kane's verdict. It is shown once; we only keep a hash.
        </p>
        {token ? (
          <div className="mt-4 rounded-lg border border-line bg-surface p-3">
            <p className="m-0 text-[12px] text-planned">Copy it now. You won't see it again.</p>
            <code className="mt-2 block font-mono text-[13px] break-all" data-testid="token">{token}</code>
          </div>
        ) : (
          <p className="mt-4 text-[13px] text-faint">{had ? 'A token is set.' : 'No token yet.'}</p>
        )}
        <button onClick={generate} disabled={busy}
          className="mt-4 h-9 rounded-md border border-line-strong bg-raised px-3 text-[13px] font-semibold shadow-[inset_0_1px_0_rgb(255_255_255/0.06)] hover:bg-hover disabled:opacity-50">
          {busy ? 'Generating' : had || token ? 'Regenerate token' : 'Generate token'}
        </button>

        <p className="mt-8 mb-2 text-[12px] font-medium text-muted">Run the loop</p>
        <pre className="m-0 overflow-x-auto rounded-lg bg-surface p-3 font-mono text-[12px] leading-5 text-muted">{cmd}</pre>
      </section>
    </main>
  )
}
