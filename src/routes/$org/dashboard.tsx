import { Link, Outlet, createFileRoute, redirect, useLoaderData, useNavigate, useRouteContext, useRouter, useRouterState } from '@tanstack/react-router'
import OrgLogo from '#/components/OrgLogo'
import { authClient } from '#/lib/auth-client'

export const Route = createFileRoute('/$org/dashboard')({
  beforeLoad: ({ context, params, location }) => {
    if (!context.me) throw redirect({ to: '/login', search: { next: location.pathname } })
    if (!context.me.orgs.some((o) => o.slug === params.org)) throw redirect({ to: '/$org', params })
  },
  component: Dashboard,
})

const ICON: Record<string, string> = {
  inbox: 'M2.5 9.5h3l1 2h3l1-2h3M2.5 9.5v3a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-3l-2-6h-7z',
  roadmap: 'M2.5 3.5h3v9h-3zM6.5 3.5h3v6h-3zM10.5 3.5h3v4h-3z',
  runs: 'M8 2.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11zM5.5 8.2 7.2 10l3.3-3.6',
  changelog: 'M4 2.5h8v11H4zM6 5.5h4M6 8h4M6 10.5h2.5',
  settings: 'M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM8 1.5v2M8 12.5v2M1.5 8h2M12.5 8h2M3.4 3.4l1.4 1.4M11.2 11.2l1.4 1.4M3.4 12.6l1.4-1.4M11.2 4.8l1.4-1.4',
}

function Dashboard() {
  const { org } = useLoaderData({ from: '/$org' })
  const { me } = useRouteContext({ from: '__root__' })
  const path = useRouterState({ select: (s) => s.location.pathname })
  const router = useRouter()
  const navigate = useNavigate()
  const base = `/${org.slug}/dashboard`
  const items = [
    ['inbox', 'Inbox', base],
    ['roadmap', 'Roadmap', `${base}/roadmap`],
    ['runs', 'Kane runs', `${base}/runs`],
    ['changelog', 'Changelog', `${base}/changelog`],
    ['settings', 'Settings', `${base}/settings`],
  ] as const

  async function signOut() {
    await authClient.signOut()
    await router.invalidate()
    navigate({ to: '/' })
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <aside className="flex shrink-0 flex-col border-b border-line bg-surface/40 md:sticky md:top-0 md:h-screen md:w-[232px] md:border-r md:border-b-0">
        <div className="flex items-center gap-2.5 px-4 py-4">
          <OrgLogo org={org} className="size-7" />
          <div className="min-w-0">
            <p className="m-0 truncate text-[14px] font-semibold">{org.name}</p>
            <p className="m-0 truncate text-[11px] text-faint">/{org.slug}</p>
          </div>
        </div>
        <nav className="flex gap-0.5 overflow-x-auto px-2 pb-2 md:flex-col md:pb-0" aria-label="Dashboard">
          {items.map(([key, label, to]) => {
            const active = key === 'inbox' ? path === base || path === `${base}/` : path.startsWith(to)
            return (
              <Link key={key} to={to} aria-current={active ? 'page' : undefined}
                className={`flex h-8 shrink-0 items-center gap-2.5 rounded-md px-2.5 text-[13px] font-medium transition-colors ${active ? 'bg-hover text-fg' : 'text-muted hover:bg-hover/60 hover:text-fg'}`}>
                <svg viewBox="0 0 16 16" className="size-4" aria-hidden><path d={ICON[key]} fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                {label}
              </Link>
            )
          })}
        </nav>
        <div className="mt-auto hidden border-t border-line p-2 md:block">
          <a href={`/${org.slug}`} target="_blank" rel="noreferrer" className="flex h-8 items-center gap-2.5 rounded-md px-2.5 text-[13px] text-muted hover:bg-hover hover:text-fg">
            <svg viewBox="0 0 16 16" className="size-4" aria-hidden><path d="M9.5 2.5h4v4M13.5 2.5 7.5 8.5M11.5 9.5v3a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1h3" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
            View public board
          </a>
          <button onClick={signOut} className="flex h-8 w-full items-center gap-2.5 rounded-md px-2.5 text-left text-[13px] text-muted hover:bg-hover hover:text-fg" title="Sign out">
            <span className="flex size-5 items-center justify-center rounded-full bg-raised text-[10px] font-semibold text-fg">{(me?.user.name || me?.user.email || '?').charAt(0).toUpperCase()}</span>
            <span className="min-w-0 flex-1 truncate">{me?.user.email}</span>
            <span className="text-[11px] text-faint">Sign out</span>
          </button>
        </div>
      </aside>
      <div className="min-w-0 flex-1">
        <Outlet />
      </div>
    </div>
  )
}

export function PageHead({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div className="flex h-14 items-center gap-3 border-b border-line px-6">
      <h1 className="m-0 text-[15px] font-semibold">{title}</h1>
      <div className="ml-auto flex items-center gap-2">{children}</div>
    </div>
  )
}
