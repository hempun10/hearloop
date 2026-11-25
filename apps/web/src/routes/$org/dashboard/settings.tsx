import { Link, Outlet, createFileRoute, useMatchRoute } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { z } from 'zod'
import { Panel } from '#/features/dashboard/components/panel'
import { cn } from '@hearloop/ui/lib/utils'

export const Route = createFileRoute('/$org/dashboard/settings')({
  validateSearch: z.object({ welcome: z.boolean().optional().catch(undefined) }),
  component: SettingsLayout,
})

const NAV = [
  {
    group: 'Product',
    items: [
      ['/$org/dashboard/settings', 'General'],
      ['/$org/dashboard/settings/branding', 'Branding'],
      ['/$org/dashboard/settings/access', 'Access'],
      ['/$org/dashboard/settings/boards', 'Boards & tags'],
      ['/$org/dashboard/settings/statuses', 'Statuses'],
      ['/$org/dashboard/settings/widget', 'Widget'],
    ],
  },
  {
    group: 'Team',
    items: [
      ['/$org/dashboard/settings/team', 'Members'],
      ['/$org/dashboard/settings/notifications', 'Notifications'],
    ],
  },
  { group: 'Developers', items: [['/$org/dashboard/settings/token', 'Loop API token']] },
] as const

function SettingsLayout() {
  const params = Route.useParams()
  const matchRoute = useMatchRoute()
  return (
    <Panel title="Settings" className="flex flex-col md:flex-row">
      <nav
        data-settings-nav
        aria-label="Settings"
        className="flex shrink-0 flex-row gap-1 overflow-x-auto border-b px-3 py-2 md:w-[220px] md:flex-col md:overflow-x-hidden md:overflow-y-auto md:border-r md:border-b-0 md:pt-3 md:pb-4"
      >
        <Link
          to="/$org/dashboard"
          params={params}
          className="hidden h-[30px] items-center gap-2 rounded-md px-2 text-sm font-semibold select-none hover:bg-accent/60 md:flex"
        >
          <ArrowLeft className="size-[13px] text-faint" />
          Settings
        </Link>
        {NAV.map((g) => (
          <div key={g.group} className="flex flex-row gap-0.5 md:flex-col md:pt-3.5">
            <p className="hidden px-2 pb-1.5 text-xs font-medium text-muted-foreground md:block">{g.group}</p>
            {g.items.map(([to, label]) => (
              <Link
                key={to}
                to={to}
                params={params}
                preload="viewport"
                className={cn(
                  'flex h-7 items-center rounded-md px-2 text-[13px] whitespace-nowrap select-none',
                  matchRoute({ to, params })
                    ? 'bg-secondary font-semibold text-foreground'
                    : 'text-muted-foreground hover:bg-accent/60 hover:text-foreground',
                )}
              >
                {label}
              </Link>
            ))}
          </div>
        ))}
      </nav>
      <div className="min-w-0 flex-1 overflow-auto px-4 pt-5 pb-6 md:px-8 md:pt-7 md:pb-8">
        <div className="max-w-[920px]">
          <Outlet />
        </div>
      </div>
    </Panel>
  )
}
