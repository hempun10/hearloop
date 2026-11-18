import { createFileRoute, redirect, useNavigate, useRouter } from '@tanstack/react-router'
import { useState } from 'react'
import { createOrg } from '#/lib/fns'

const toSlug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 32)

export const Route = createFileRoute('/_site/new')({
  beforeLoad: ({ context }) => {
    if (!context.me) throw redirect({ to: '/login', search: { mode: 'signup', next: '/new' } })
  },
  component: NewOrg,
})

function NewOrg() {
  const router = useRouter()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [touched, setTouched] = useState(false)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const shown = touched ? slug : toSlug(name)

  async function submit(e: { preventDefault(): void }) {
    e.preventDefault()
    setError('')
    setBusy(true)
    try {
      const r = await createOrg({ data: { name, slug: shown } })
      if (!r.ok) throw new Error(r.error)
      await router.invalidate()
      navigate({ to: '/$org/dashboard/settings', params: { org: r.slug }, search: { welcome: true } })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not create the board.')
      setBusy(false)
    }
  }

  const input = 'h-10 w-full rounded-lg border border-line bg-surface px-3 text-[14px] outline-none placeholder:text-faint focus:border-muted'
  return (
    <main className="mx-auto max-w-[440px] px-4 pt-20">
      <h1 className="m-0 text-[24px] font-semibold">Name your board</h1>
      <p className="mt-2 text-[14px] text-muted">Your users post and vote here. You can change the name later.</p>
      <form onSubmit={submit} className="mt-8 grid gap-4" aria-label="Create board">
        <label className="grid gap-1.5 text-[13px] font-medium">Board name
          <input className={input} required maxLength={60} value={name} onChange={(e) => setName(e.target.value)} placeholder="Acme" autoFocus />
        </label>
        <label className="grid gap-1.5 text-[13px] font-medium">Address
          <div className="flex h-10 items-center rounded-lg border border-line bg-surface pl-3 text-[14px] focus-within:border-muted">
            <span className="text-faint">hearloop/</span>
            <input aria-label="Address" className="h-full min-w-0 flex-1 bg-transparent pr-3 outline-none" required value={shown}
              onChange={(e) => { setTouched(true); setSlug(toSlug(e.target.value)) }} placeholder="acme" />
          </div>
        </label>
        {error && <p role="alert" className="m-0 text-[13px] text-planned">{error}</p>}
        <button disabled={busy || !shown} className="h-10 rounded-lg bg-fg text-[14px] font-semibold text-bg hover:opacity-90 disabled:opacity-50">
          {busy ? 'Creating' : 'Create board'}
        </button>
      </form>
    </main>
  )
}
