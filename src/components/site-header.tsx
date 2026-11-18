import { Link, useLocation } from '@tanstack/react-router'
import { Button } from '#/components/ui/button'
import { Separator } from '#/components/ui/separator'
import { useSession, useSignOut } from '#/features/auth/use-session'
import { BrandMark } from './brand-mark'
import { NavLink } from './nav-link'
import { UserMenu } from './user-menu'

export function SiteHeader() {
  const session = useSession()
  const signOut = useSignOut()
  const onHome = useLocation({ select: (l) => l.pathname === '/' })
  const home = session?.orgs[0]?.slug

  return (
    <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-4 md:px-8">
        <Link to="/" className="flex items-center gap-2.5 text-sm font-semibold tracking-tight">
          <BrandMark />
          <span className="hidden sm:inline">hearloop</span>
        </Link>
        <Separator orientation="vertical" className="h-4!" />
        <nav className="flex min-w-0 items-center gap-0.5">
          {onHome && (
            <Button variant="ghost" size="sm" className="hidden text-faint sm:inline-flex" asChild>
              <a href="#how">How it works</a>
            </Button>
          )}
          <NavLink to="/$org" params={{ org: 'demo' }}>Live demo</NavLink>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          {session ? (
            <>
              {home ? (
                <Button variant="ghost" size="sm" className="hidden sm:inline-flex" asChild>
                  <Link to="/$org" params={{ org: home }}>Your board</Link>
                </Button>
              ) : (
                <Button size="sm" asChild>
                  <Link to="/new">Create your board</Link>
                </Button>
              )}
              <UserMenu user={session.user} onSignOut={signOut} />
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/login">Sign in</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/login" search={{ mode: 'signup' }}>Create your board</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
