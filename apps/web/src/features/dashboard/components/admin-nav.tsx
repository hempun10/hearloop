import { useSuspenseQuery } from '@tanstack/react-query'
import { Link, useMatchRoute } from '@tanstack/react-router'
import { ChevronDown, ExternalLink, FlaskConical, Inbox, LogOut, Map, Megaphone, PanelLeft, Plus, Settings } from 'lucide-react'
import type { ReactElement, ReactNode } from 'react'
import { Avatar, AvatarFallback } from '@hearloop/ui/components/avatar'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from '@hearloop/ui/components/dropdown-menu'
import { Tooltip, TooltipContent, TooltipTrigger } from '@hearloop/ui/components/tooltip'
import { initial } from '#/components/user-menu'
import { useSession, useSignOut } from '#/features/auth/use-session'
import { OrgLogo } from '#/features/orgs/components/org-logo'
import { useOrg } from '#/features/orgs/use-org'
import { postListQuery } from '#/features/posts/post.queries'
import { cn } from '@hearloop/ui/lib/utils'

const NAV = [
  { to: '/$org/dashboard', label: 'Posts', icon: Inbox, exact: true },
  { to: '/$org/dashboard/roadmap', label: 'Roadmap', icon: Map },
  { to: '/$org/dashboard/runs', label: 'Kane runs', icon: FlaskConical },
  { to: '/$org/dashboard/changelog', label: 'Changelog', icon: Megaphone },
] as const
const SETTINGS = '/$org/dashboard/settings'

type NavProps = { onNewPost: () => void; onToggle?: () => void }

const itemClass = (on: boolean) => cn(
  'flex h-8 w-full cursor-pointer items-center gap-2.5 rounded-md px-2 text-[13px] font-medium select-none',
  on ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:bg-accent/60 hover:text-foreground',
)
const railClass = (on: boolean) => cn(
  'inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-lg select-none',
  on ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:bg-accent/60 hover:text-foreground',
)

function useNav() {
  const { org } = useOrg()
  const params = { org: org.slug }
  const matchRoute = useMatchRoute()
  const { data: posts } = useSuspenseQuery(postListQuery(org.slug))
  const isOn = (to: string, exact?: boolean) => !!matchRoute({ to, params, fuzzy: !exact })
  return { org, params, isOn, total: posts.length }
}

/** Expanded nav: board switcher, pages, account. Same destinations as the rail. */
export function AdminSidebar({ onNewPost, onToggle }: NavProps) {
  const { org, params, isOn, total } = useNav()
  return (
    <div className="flex h-full min-h-0 w-[200px] flex-col px-3 pt-3.5 pb-4">
      <div className="flex shrink-0 items-center justify-between px-1">
        <BoardMenu>
          <button type="button" className="group/ws flex h-7 min-w-0 items-center gap-2 rounded-md pr-1.5 pl-0.5 text-sm font-semibold outline-none hover:bg-accent/60 focus-visible:ring-1 focus-visible:ring-ring">
            <OrgLogo name={org.name} logoUrl={org.logoUrl} className="size-[18px] rounded text-[10px]" />
            <span className="truncate text-[15px]">{org.name}</span>
            <ChevronDown className="size-3 text-faint opacity-0 group-hover/ws:opacity-100" />
          </button>
        </BoardMenu>
        {onToggle && (
          <button type="button" onClick={onToggle} title="Collapse sidebar" className="inline-flex size-7 items-center justify-center rounded-md text-faint hover:bg-accent hover:text-foreground">
            <PanelLeft className="size-[15px]" />
          </button>
        )}
      </div>
      <nav aria-label="Dashboard" className="-mx-3 min-h-0 flex-1 overflow-y-auto px-3 pt-4 pb-3 [scrollbar-width:none]">
        <div className="flex flex-col gap-1">
          {NAV.map(({ to, label, icon: Icon, ...rest }) => {
            const on = isOn(to, 'exact' in rest)
            return (
              <Link key={to} to={to} params={params} preload="viewport" className={itemClass(on)}>
                <Icon className={cn('size-4 shrink-0', on ? 'text-foreground' : 'text-muted-foreground')} />
                <span className="min-w-0 flex-1 truncate">{label}</span>
                {to === '/$org/dashboard' && <span className="text-[13px] text-faint tabular-nums">{total}</span>}
              </Link>
            )
          })}
          <button type="button" onClick={onNewPost} className={itemClass(false)}>
            <Plus className="size-4 shrink-0" />New post
          </button>
        </div>
      </nav>
      <div className="flex shrink-0 flex-col gap-0.5 border-t pt-3">
        <a href={`/${org.slug}`} target="_blank" rel="noreferrer" className={itemClass(false)}>
          <ExternalLink className="size-4 shrink-0" />View public board
        </a>
        <Link to={SETTINGS} params={params} preload="viewport" className={itemClass(isOn(SETTINGS))}>
          <Settings className="size-4 shrink-0" />Settings
        </Link>
        <AccountMenu side="top">
          <button type="button" className="flex h-9 w-full items-center gap-2 rounded-md px-2 outline-none hover:bg-accent/60 focus-visible:ring-1 focus-visible:ring-ring">
            <AccountAvatar />
            <AccountName />
            <ChevronDown className="size-3 text-faint" />
          </button>
        </AccountMenu>
      </div>
    </div>
  )
}

/** 56px rail: icons only, labels in tooltips. */
export function AdminRail({ onNewPost, onToggle }: NavProps) {
  const { org, params, isOn } = useNav()
  return (
    <div className="flex h-full min-h-0 w-14 flex-col items-center py-3.5">
      <nav aria-label="Dashboard" className="flex min-h-0 w-full flex-1 flex-col items-center gap-1 overflow-y-auto [scrollbar-width:none]">
        <BoardMenu side="right">
          <button type="button" aria-label={org.name} className="mb-2.5 inline-flex size-9 shrink-0 items-center justify-center rounded-lg outline-none hover:bg-accent/60 focus-visible:ring-1 focus-visible:ring-ring">
            <OrgLogo name={org.name} logoUrl={org.logoUrl} className="size-5 rounded text-[10px]" />
          </button>
        </BoardMenu>
        {NAV.map(({ to, label, icon: Icon, ...rest }) => (
          <Tip key={to} label={label}>
            <Link to={to} params={params} preload="viewport" aria-label={label} className={railClass(isOn(to, 'exact' in rest))}>
              <Icon className="size-[17px]" />
            </Link>
          </Tip>
        ))}
        <Tip label="New post">
          <button type="button" onClick={onNewPost} aria-label="New post" className={railClass(false)}><Plus className="size-[17px]" /></button>
        </Tip>
      </nav>
      <div className="flex shrink-0 flex-col items-center gap-1 pt-1">
        {onToggle && (
          <Tip label="Expand sidebar">
            <button type="button" onClick={onToggle} aria-label="Expand sidebar" className={railClass(false)}><PanelLeft className="size-[17px]" /></button>
          </Tip>
        )}
        <Tip label="View public board">
          <a href={`/${org.slug}`} target="_blank" rel="noreferrer" aria-label="View public board" className={railClass(false)}><ExternalLink className="size-[17px]" /></a>
        </Tip>
        <Tip label="Settings">
          <Link to={SETTINGS} params={params} preload="viewport" aria-label="Settings" className={railClass(isOn(SETTINGS))}><Settings className="size-[17px]" /></Link>
        </Tip>
        <AccountMenu side="right">
          <button type="button" aria-label="Account" className="mt-1.5 rounded-full outline-none focus-visible:ring-1 focus-visible:ring-ring"><AccountAvatar /></button>
        </AccountMenu>
      </div>
    </div>
  )
}

function Tip({ label, children }: { label: string; children: ReactElement }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side="right" sideOffset={8}>{label}</TooltipContent>
    </Tooltip>
  )
}

/** Every board you belong to, then "New board". */
function BoardMenu({ children, side }: { children: ReactElement; side?: 'right' }) {
  const session = useSession()
  const { org } = useOrg()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent align="start" side={side} className="min-w-52">
        <DropdownMenuLabel className="text-xs font-medium text-muted-foreground">Boards</DropdownMenuLabel>
        {session?.orgs.map((o) => (
          <DropdownMenuItem key={o.slug} disabled={o.slug === org.slug} asChild>
            <Link to="/$org/dashboard" params={{ org: o.slug }}>
              <span className="flex-1 truncate">{o.name}</span>
              <span className="text-xs text-faint">/{o.slug}</span>
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild><Link to="/new"><Plus className="size-3.5" />New board</Link></DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function AccountMenu({ children, side }: { children: ReactElement; side: 'top' | 'right' }) {
  const signOut = useSignOut()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent align="start" side={side} className="min-w-48">
        <DropdownMenuItem onSelect={signOut}><LogOut className="size-4" />Sign out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function AccountAvatar() {
  const session = useSession()
  return (
    <Avatar className="size-[22px] border border-input">
      <AvatarFallback className="bg-accent text-[10px] font-semibold">{initial(session?.user.name || session?.user.email || '?')}</AvatarFallback>
    </Avatar>
  )
}

function AccountName(): ReactNode {
  const session = useSession()
  return <span className="min-w-0 flex-1 truncate text-left text-[13px]">{session?.user.name || session?.user.email}</span>
}
