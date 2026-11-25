import { Link, useLocation } from '@tanstack/react-router'
import { NavLink } from '#/components/nav-link'
import { Button } from '@hearloop/ui/components/button'
import { Separator } from '@hearloop/ui/components/separator'
import { UserMenu } from '#/components/user-menu'
import { useSession, useSignOut } from '#/features/auth/use-session'
import { useOrg } from '../use-org'
import { OrgLogo } from './org-logo'

/** A board's own header: its name and logo, never hearloop's. */
export function OrgHeader() {
  const { org, isMember } = useOrg()
  const session = useSession()
  const signOut = useSignOut(`/${org.slug}`)
  const path = useLocation({ select: (l) => l.pathname })
  const params = { org: org.slug }

  const links = (
    <>
      <NavLink to="/$org" params={params} activeOptions={{ exact: true }}>
        Board
      </NavLink>
      {org.showRoadmap && (
        <NavLink to="/$org/roadmap" params={params}>
          Roadmap
        </NavLink>
      )}
      {org.showChangelog && (
        <NavLink to="/$org/changelog" params={params}>
          Changelog
        </NavLink>
      )}
    </>
  )

  return (
    <header className="sticky top-0 z-30 border-b bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-4 md:px-8">
        <Link
          to="/$org"
          params={params}
          className="flex min-w-0 items-center gap-2.5 text-sm font-semibold tracking-tight"
        >
          <OrgLogo name={org.name} logoUrl={org.logoUrl} className="size-6" />
          <span className="max-w-44 truncate">{org.name}</span>
        </Link>
        <Separator orientation="vertical" className="hidden h-4! sm:block" />
        <nav className="hidden items-center gap-0.5 sm:flex">{links}</nav>
        <div className="ml-auto flex items-center gap-2">
          {isMember && (
            <Button variant="outline" size="sm" asChild>
              <Link to="/$org/dashboard" params={params}>
                Dashboard
              </Link>
            </Button>
          )}
          {session ? (
            <UserMenu user={session.user} onSignOut={signOut} />
          ) : (
            <Button variant="outline" size="sm" asChild>
              <Link to="/login" search={{ next: path }}>
                Sign in
              </Link>
            </Button>
          )}
        </div>
      </div>
      <nav className="flex gap-1 border-t px-4 py-1.5 sm:hidden">{links}</nav>
    </header>
  )
}
