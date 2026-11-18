import { Outlet, createFileRoute, useLocation } from '@tanstack/react-router'
import { SiteFooter } from '#/components/site-footer'
import { SiteHeader } from '#/components/site-header'
import { Page } from '#/features/landing/components/frame'

export const Route = createFileRoute('/_site')({ component: SiteLayout })

function SiteLayout() {
  // sign in, sign up and naming a board stay focused: no navbar, no footer
  const onAuth = useLocation({ select: (l) => l.pathname === '/login' || l.pathname === '/new' })
  return (
    <div className="isolate min-h-svh">
      <Page>
        {!onAuth && <SiteHeader />}
        <Outlet />
        {!onAuth && <SiteFooter />}
      </Page>
    </div>
  )
}
