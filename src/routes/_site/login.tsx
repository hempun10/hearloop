import { Link, createFileRoute, redirect, useNavigate, useRouter } from '@tanstack/react-router'
import { useState } from 'react'
import { Mark } from '#/components/Header'
import { authClient } from '#/lib/auth-client'
import { me } from '#/lib/fns'

type Search = { mode?: 'signup'; next?: string }
// only same-site paths, never //evil.com
const safeNext = (n?: string) => (n && n.startsWith('/') && !n.startsWith('//') ? n : undefined)

export const Route = createFileRoute('/_site/login')({
  validateSearch: (s: Record<string, unknown>): Search => ({
    mode: s.mode === 'signup' ? 'signup' : undefined,
    next: typeof s.next === 'string' ? s.next : undefined,
  }),
  beforeLoad: ({ context, search }) => {
    if (context.me) throw redirect({ to: safeNext(search.next) ?? (context.me.orgs[0] ? `/${context.me.orgs[0].slug}` : '/new') })
  },
  component: Login,
})

function Login() {
  const { mode, next } = Route.useSearch()
  const signup = mode === 'signup'
  const router = useRouter()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function submit(e: { preventDefault(): void }) {
    e.preventDefault()
    setError('')
    setBusy(true)
    const res = signup
      ? await authClient.signUp.email({ email, password, name: name.trim() || email.split('@')[0] })
      : await authClient.signIn.email({ email, password })
    if (res.error) {
      setError(res.error.message ?? 'Something went wrong. Try again.')
      setBusy(false)
      return
    }
    const m = await me()
    await router.invalidate()
    navigate({ to: safeNext(next) ?? (m?.orgs[0] ? `/${m.orgs[0].slug}` : '/new') })
  }

  const input = 'h-10 w-full rounded-lg border border-line bg-surface px-3 text-[14px] outline-none placeholder:text-faint focus:border-muted'
  return (
    <main className="mx-auto max-w-[380px] px-4 pt-20">
      <Mark className="size-9" />
      <h1 className="mt-6 mb-0 text-[24px] font-semibold">{signup ? 'Create your account' : 'Sign in'}</h1>
      <p className="mt-2 text-[14px] text-muted">{signup ? 'Then name your board. It takes a minute.' : 'Welcome back.'}</p>
      <form onSubmit={submit} className="mt-8 grid gap-3" aria-label={signup ? 'Sign up' : 'Sign in'}>
        {signup && (
          <label className="grid gap-1.5 text-[13px] font-medium">Name
            <input className={input} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" placeholder="Ada Lovelace" />
          </label>
        )}
        <label className="grid gap-1.5 text-[13px] font-medium">Email
          <input className={input} type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" placeholder="you@company.com" />
        </label>
        <label className="grid gap-1.5 text-[13px] font-medium">Password
          <input className={input} type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)}
            autoComplete={signup ? 'new-password' : 'current-password'} placeholder={signup ? 'At least 8 characters' : ''} />
        </label>
        {error && <p role="alert" className="m-0 text-[13px] text-planned">{error}</p>}
        <button disabled={busy} className="mt-2 h-10 rounded-lg bg-fg text-[14px] font-semibold text-bg transition-colors hover:opacity-90 disabled:opacity-50">
          {busy ? 'One moment' : signup ? 'Create account' : 'Sign in'}
        </button>
      </form>
      <p className="mt-6 text-[13px] text-muted">
        {signup ? 'Already have an account? ' : 'New to hearloop? '}
        <Link to="/login" search={{ mode: signup ? undefined : 'signup', next }} className="font-medium text-fg hover:underline">
          {signup ? 'Sign in' : 'Create an account'}
        </Link>
      </p>
    </main>
  )
}
