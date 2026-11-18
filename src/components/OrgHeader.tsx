import { Link, useLoaderData, useNavigate, useRouteContext, useRouter, useRouterState } from '@tanstack/react-router'
import { authClient } from '#/lib/auth-client'
import OrgLogo from './OrgLogo'

export default function OrgHeader() {
  const { org, member } = useLoaderData({ from: '/$org' })
  const { me } = useRouteContext({ from: '__root__' })
  const path = useRouterState({ select: (s) => s.location.pathname })
  const router = useRouter()
  const navigate = useNavigate()
  const base = `/${org.slug}`
  const links = [
    { to: base, label: 'Board', active: path === base || path.startsWith(`${base}/posts`) },
    org.show_roadmap ? { to: `${base}/roadmap`, label: 'Roadmap', active: path.startsWith(`${base}/roadmap`) } : null,
    org.show_changelog ? { to: `${base}/changelog`, label: 'Changelog', active: path.startsWith(`${base}/changelog`) } : null,
  ].filter((l) => l !== null)

  async function signOut() {
    await authClient.signOut()
    await router.invalidate()
    navigate({ to: base })
  }

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[1072px] items-center gap-4 px-4 md:px-8">
        <Link to="/$org" params={{ org: org.slug }} className="flex min-w-0 items-center gap-2.5 text-[14px] font-semibold tracking-[-0.01em]">
          <OrgLogo org={org} className="size-6" />
          <span className="max-w-[180px] truncate">{org.name}</span>
        </Link>
        <span className="hidden h-4 w-px bg-line-strong sm:block" aria-hidden />
        <nav className="hidden items-center gap-0.5 sm:flex">
          {links.map((l) => (
            <Link key={l.label} to={l.to} aria-current={l.active ? 'page' : undefined}
              className={`group inline-flex h-8 items-center gap-[7px] rounded-md px-2.5 text-[13px] font-medium transition-colors duration-150 hover:bg-hover/60 ${l.active ? 'text-fg' : 'text-faint hover:text-muted'}`}>
              <span className={`size-[5px] rounded-full ${l.active ? 'bg-link' : 'bg-transparent group-hover:bg-line-strong'}`} />
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          {member && (
            <Link to="/$org/dashboard" params={{ org: org.slug }} className="inline-flex h-8 items-center rounded-md border border-line px-3 text-[13px] font-medium text-muted hover:bg-hover hover:text-fg">
              Dashboard
            </Link>
          )}
          {me ? (
            <button onClick={signOut} title={me.user.email} className="flex h-8 items-center gap-2 rounded-md px-2 text-[13px] text-muted hover:bg-hover hover:text-fg">
              <span className="flex size-6 items-center justify-center rounded-full bg-raised text-[11px] font-semibold text-fg">{(me.user.name || me.user.email).charAt(0).toUpperCase()}</span>
              Sign out
            </button>
          ) : (
            <Link to="/login" search={{ next: path }} className="inline-flex h-8 items-center rounded-md border border-line px-3 text-[13px] font-medium text-muted hover:bg-hover hover:text-fg">
              Sign in
            </Link>
          )}
        </div>
      </div>
      <nav className="flex gap-1 border-t border-line px-4 py-1.5 sm:hidden">
        {links.map((l) => (
          <Link key={l.label} to={l.to} className={`rounded-md px-2.5 py-1 text-[13px] ${l.active ? 'bg-hover text-fg' : 'text-muted'}`}>{l.label}</Link>
        ))}
      </nav>
    </header>
  )
}
