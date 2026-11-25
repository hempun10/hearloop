import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from '@hearloop/ui/components/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@hearloop/ui/components/tabs'
import { useSession } from '#/features/auth/use-session'
import { VerifiedBadge } from '#/features/changelog/components/verified-badge'
import { changelogQuery } from '#/features/changelog/changelog.queries'
import { useOrg } from '#/features/orgs/use-org'
import { NewPostDialog } from '#/features/posts/components/new-post-dialog'
import { StatusIconFor } from '#/features/posts/components/status-icon'
import { StatusLabel } from '#/features/posts/components/status-badge'
import { VoteButton } from '#/features/posts/components/vote-button'
import { postListQuery } from '#/features/posts/post.queries'
import { statusKey } from '#/features/posts/status'
import { useStatuses } from '#/features/posts/use-statuses'
import { WIDGET_TABS, readWidget, widgetTabs, type WidgetTab } from '#/features/widget/widget.schema'
import { longDate } from '#/lib/format'

const HEX = /^#[0-9a-f]{3,8}$/i
// What the loader on the host page may set: the resolved theme, accent, corners and tabs.
// They arrive in the URL, then as "hearloop:config" messages (the settings preview changes them live),
// which go back into the URL: the root reads theme, accent and corners from there.
const lookSchema = z.object({
  theme: z.enum(['dark', 'light']).optional().catch(undefined),
  accent: z.string().regex(HEX).optional().catch(undefined),
  radius: z.enum(['sharp', 'soft', 'round']).optional().catch(undefined),
  tabs: z.string().optional().catch(undefined),
})
type Look = z.infer<typeof lookSchema>

/** The panel inside the embeddable widget: public/widget.js loads it in an iframe on the customer's site. */
export const Route = createFileRoute('/$org/widget')({
  validateSearch: lookSchema.extend({ tab: z.enum(WIDGET_TABS).optional().catch(undefined) }),
  loader: ({ context, params }) =>
    Promise.all([
      context.queryClient.query(postListQuery(params.org)),
      context.queryClient.query(changelogQuery(params.org)),
    ]),
  component: WidgetPanel,
})

const NAMES: Record<WidgetTab, string> = { feedback: 'Feedback', roadmap: 'Roadmap', changelog: 'Changelog' }
const send = (msg: Record<string, unknown>) => window.parent.postMessage(msg, '*')
// links leave the customer's page in a new tab, never inside the small panel
const external = { target: '_blank', rel: 'noopener' } as const

function WidgetPanel() {
  const { org, isMember } = useOrg()
  const session = useSession()
  const search = Route.useSearch()
  const { data: posts } = useSuspenseQuery(postListQuery(org.slug))
  const { data: entries } = useSuspenseQuery(changelogQuery(org.slug))
  const navigate = useNavigate()
  const setLook = (look: Look) => navigate({ to: '.', search: (s) => ({ ...s, ...look }), replace: true })
  const tabs = useMemo(() => {
    const override = search.tabs
      ?.split(',')
      .filter((t): t is WidgetTab => (WIDGET_TABS as readonly string[]).includes(t))
    const saved = readWidget(org.widget)
    return widgetTabs(
      org,
      override?.length ? { ...saved, tabs: WIDGET_TABS.filter((t) => override.includes(t)) } : saved,
    )
  }, [org, search.tabs])
  const [tab, setTab] = useState<WidgetTab>(search.tab && tabs.includes(search.tab) ? search.tab : tabs[0])
  const [composing, setComposing] = useState(false)
  const current = tabs.includes(tab) ? tab : tabs[0]

  // talk to the loader: ready once, config and open from it, close and busy to it
  // biome-ignore lint/correctness/useExhaustiveDependencies: setLook only navigates
  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.source !== window.parent) return
      if (e.data?.type === 'hearloop:config' && e.data.config) setLook(lookSchema.parse(e.data.config))
      if (e.data?.type === 'hearloop:open') {
        if (e.data.tab) setTab(e.data.tab)
        else if (e.data.home) setTab(tabs[0])
      }
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !composing) send({ type: 'hearloop:close' })
    }
    addEventListener('message', onMessage)
    addEventListener('keydown', onKey)
    return () => {
      removeEventListener('message', onMessage)
      removeEventListener('keydown', onKey)
    }
  }, [tabs, composing])
  useEffect(() => {
    send({ type: 'hearloop:ready' })
  }, [])
  useEffect(() => {
    send({ type: 'hearloop:busy', busy: composing })
  }, [composing])
  useEffect(() => {
    if (current === 'changelog')
      send({ type: 'hearloop:changelog-seen', at: entries[0] ? new Date(entries[0].createdAt).getTime() : 0 })
  }, [current, entries])

  return (
    <div className="flex h-screen flex-col bg-background">
      <header className="flex items-center gap-2 border-b px-4 py-3">
        <h1 className="min-w-0 flex-1 truncate text-sm font-semibold">{org.name}</h1>
        <Button variant="ghost" size="icon-sm" aria-label="Close" onClick={() => send({ type: 'hearloop:close' })}>
          <X />
        </Button>
      </header>
      <Tabs value={current} onValueChange={(v) => setTab(v as WidgetTab)} className="min-h-0 flex-1 gap-0">
        {tabs.length > 1 && (
          <TabsList className="mx-4 mt-3">
            {tabs.map((t) => (
              <TabsTrigger key={t} value={t}>
                {NAMES[t]}
              </TabsTrigger>
            ))}
          </TabsList>
        )}
        <TabsContent value="feedback" className="min-h-0 overflow-y-auto px-4 pt-3 pb-4">
          <Button className="w-full bg-brand text-white hover:bg-brand/90" onClick={() => setComposing(true)}>
            Post idea
          </Button>
          {posts.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">No requests yet. Post the first idea.</p>
          ) : (
            <ol aria-label="Requests" className="mt-3">
              {posts.map((p) => (
                <li key={p.id} className="flex items-center gap-3 border-t py-3 first:border-t-0">
                  <div className="min-w-0 flex-1">
                    <a
                      href={`/${org.slug}/posts/${p.id}`}
                      {...external}
                      className="line-clamp-2 text-sm font-medium hover:underline"
                    >
                      {p.title}
                    </a>
                    {(p.status !== 'open' || p.statusId) && (
                      <div className="mt-1 text-xs text-faint">
                        <StatusLabel post={p} />
                      </div>
                    )}
                  </div>
                  <VoteButton org={org.slug} post={p} className="h-11 w-10" />
                </li>
              ))}
            </ol>
          )}
        </TabsContent>
        <TabsContent value="roadmap" className="min-h-0 overflow-y-auto px-4 pt-3 pb-4">
          <Roadmap />
        </TabsContent>
        <TabsContent value="changelog" className="min-h-0 overflow-y-auto px-4 pt-3 pb-4">
          <Changelog />
        </TabsContent>
      </Tabs>
      <NewPostDialog
        org={org.slug}
        posts={posts}
        open={composing}
        onOpenChange={setComposing}
        mustSignIn={org.whoCanPost === 'signed_in' && !session}
        isMember={isMember}
        onPosted={(p) => toast.success(`Posted "${p.title}". Thanks!`)}
      />
    </div>
  )
}

function Roadmap() {
  const { org } = useOrg()
  const { data: posts } = useSuspenseQuery(postListQuery(org.slug))
  const columns = useStatuses().filter((s) => s.kind !== 'open')
  return columns.map((status) => {
    const items = posts.filter((p) => statusKey(p) === status.key)
    return (
      <section key={status.key} aria-label={status.label} className="mb-4">
        <h2 className="flex items-center gap-2 pb-2 text-xs font-semibold">
          <StatusIconFor option={status} className="size-3.5" />
          {status.label}
          <span className="ml-auto font-normal text-faint tabular-nums">{items.length}</span>
        </h2>
        {items.length === 0 ? (
          <p className="text-xs text-faint">Nothing here yet.</p>
        ) : (
          items.map((p) => (
            <a
              key={p.id}
              href={`/${org.slug}/posts/${p.id}`}
              {...external}
              className="mb-1.5 block rounded-lg border bg-card px-3 py-2 text-sm hover:border-input"
            >
              {p.title}
            </a>
          ))
        )}
      </section>
    )
  })
}

function Changelog() {
  const { org } = useOrg()
  const { data: entries } = useSuspenseQuery(changelogQuery(org.slug))
  if (entries.length === 0)
    return <p className="py-8 text-center text-sm text-muted-foreground">Nothing shipped yet.</p>
  return (
    <ol aria-label="Changelog">
      {entries.map((e) => (
        <li key={e.id} className="border-t py-4 first:border-t-0">
          <time className="text-xs text-faint tabular-nums">{longDate(e.createdAt)}</time>
          <h2 className="mt-1 text-sm font-semibold">{e.title}</h2>
          <p className="mt-1 text-sm leading-6 whitespace-pre-wrap text-muted-foreground">{e.body}</p>
          <VerifiedBadge org={org.slug} postId={e.postId} verified={e.verified} className="mt-2" />
        </li>
      ))}
    </ol>
  )
}
