import { Link, useNavigate, useParams, useRouteContext, useRouter } from '@tanstack/react-router'
import { authClient } from '#/lib/auth-client'

export default function Header() {
  const { me } = useRouteContext({ from: '__root__' })
  const { org } = useParams({ strict: false }) as { org?: string }
  const router = useRouter()
  const navigate = useNavigate()
  const home = me?.orgs[0]?.slug
  const member = !!org && !!me?.orgs.some((o) => o.slug === org)

  async function signOut() {
    await authClient.signOut()
    await router.invalidate()
    navigate({ to: '/' })
  }

  const nav = (to: string, label: string, active: boolean) => (
    <Link
      key={label}
      to={to}
      aria-current={active ? 'page' : undefined}
      className={`group inline-flex h-8 items-center gap-[7px] rounded-md px-2.5 text-[13px] font-medium transition-colors duration-150 hover:bg-hover/60 ${active ? 'text-fg' : 'text-faint hover:text-muted'}`}
    >
      <span className={`size-[5px] rounded-full ${active ? 'bg-link' : 'bg-transparent group-hover:bg-line-strong'}`} />
      {label}
    </Link>
  )
  const path = router.state.location.pathname

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[1072px] items-center gap-4 px-4 md:px-8">
        <Link to="/" className="flex items-center gap-2.5 text-[14px] font-semibold tracking-[-0.01em]">
          <Mark />
          <span className="hidden sm:inline">hearloop</span>
        </Link>
        <span className="h-4 w-px bg-line-strong" aria-hidden />
        <nav className="flex min-w-0 items-center gap-0.5">
          {org ? (
            <>
              <span className="mr-1 max-w-[140px] truncate text-[13px] font-semibold">{org}</span>
              {nav(`/${org}`, 'Board', path === `/${org}` || path.startsWith(`/${org}/posts`))}
              {nav(`/${org}/changelog`, 'Changelog', path.startsWith(`/${org}/changelog`))}
              {member && nav(`/${org}/settings`, 'Settings', path.startsWith(`/${org}/settings`))}
            </>
          ) : (
            <>
              {path === '/' && <a href="#how" className="hidden h-8 items-center rounded-md px-2.5 text-[13px] font-medium text-faint hover:bg-hover/60 hover:text-muted sm:inline-flex">How it works</a>}
              {nav('/demo', 'Live demo', false)}
            </>
          )}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          {me ? (
            <>
              {home && home !== org && <Link to="/$org" params={{ org: home }} className="hidden h-8 items-center rounded-md px-3 text-[13px] font-medium text-muted hover:bg-hover sm:inline-flex">Your board</Link>}
              {!home && <Link to="/new" className="inline-flex h-8 items-center rounded-md bg-fg px-3 text-[13px] font-semibold text-bg hover:bg-white">Create your board</Link>}
              <span className="hidden max-w-[160px] truncate text-[12px] text-faint md:inline" title={me.user.email}>{me.user.email}</span>
              <button onClick={signOut} className="h-8 rounded-md border border-line px-3 text-[13px] text-muted hover:bg-hover hover:text-fg">Sign out</button>
            </>
          ) : (
            <>
              <Link to="/login" className="h-8 rounded-md px-3 text-[13px] leading-8 font-medium text-muted hover:bg-hover hover:text-fg">Sign in</Link>
              <Link to="/login" search={{ mode: 'signup' }} className="inline-flex h-8 items-center rounded-md bg-fg px-3 text-[13px] font-semibold text-bg transition-colors hover:bg-white">
                Create your board
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export function Mark({ className = 'size-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <rect width="24" height="24" rx="6" fill="#ededf0" />
      <path d="M8 12a4 4 0 1 1 4 4" stroke="#0d0d0f" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <circle cx="9.5" cy="16" r="1.4" fill="#6e8bff" />
    </svg>
  )
}
