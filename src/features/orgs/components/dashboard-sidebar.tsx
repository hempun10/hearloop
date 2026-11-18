import { Link, useMatchRoute } from '@tanstack/react-router'
import { ExternalLink, FlaskConical, Inbox, KanbanSquare, LogOut, ScrollText, Settings } from 'lucide-react'
import { Avatar, AvatarFallback } from '#/components/ui/avatar'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '#/components/ui/sidebar'
import { initial } from '#/components/user-menu'
import { useSession, useSignOut } from '#/features/auth/use-session'
import { useOrg } from '../use-org'
import { OrgLogo } from './org-logo'

const NAV = [
  { to: '/$org/dashboard', label: 'Inbox', icon: Inbox, exact: true },
  { to: '/$org/dashboard/roadmap', label: 'Roadmap', icon: KanbanSquare },
  { to: '/$org/dashboard/runs', label: 'Kane runs', icon: FlaskConical },
  { to: '/$org/dashboard/changelog', label: 'Changelog', icon: ScrollText },
  { to: '/$org/dashboard/settings', label: 'Settings', icon: Settings },
] as const

export function DashboardSidebar() {
  const { org } = useOrg()
  const session = useSession()
  const signOut = useSignOut()
  const params = { org: org.slug }
  const matchRoute = useMatchRoute()

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2.5 px-2 py-1.5">
          <OrgLogo name={org.name} logoUrl={org.logoUrl} />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{org.name}</p>
            <p className="truncate text-[11px] text-faint">/{org.slug}</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu aria-label="Dashboard">
              {NAV.map(({ to, label, icon: Icon, ...rest }) => (
                <SidebarMenuItem key={to}>
                  <SidebarMenuButton asChild isActive={!!matchRoute({ to, params, fuzzy: !('exact' in rest) })}>
                    <Link to={to} params={params}>
                      <Icon />
                      <span>{label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href={`/${org.slug}`} target="_blank" rel="noreferrer"><ExternalLink /><span>View public board</span></a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          {session && (
            <SidebarMenuItem>
              <SidebarMenuButton onClick={signOut} title="Sign out" className="h-10">
                <Avatar className="size-5"><AvatarFallback className="text-[10px] font-semibold">{initial(session.user.name || session.user.email)}</AvatarFallback></Avatar>
                <span className="min-w-0 flex-1 truncate">{session.user.email}</span>
                <LogOut className="text-faint" />
                <span className="sr-only">Sign out</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
