import { Outlet, createFileRoute, useLocation } from '@tanstack/react-router'
import { SiteFooter } from '#/components/site-footer'
import { SiteHeader } from '#/components/site-header'
import { Page } from '#/features/landing/components/frame'

export const Route = createFileRoute('/_site')({ component: SiteLayout })

const FOCUSED = ['/login', '/new', '/consent']

function SiteLayout() {
  // sign in, sign up, naming a board and approving an MCP client stay focused: no navbar, no footer
  const onAuth = useLocation({ select: (l) => FOCUSED.includes(l.pathname) })
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
