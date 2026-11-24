import { useSuspenseQuery } from '@tanstack/react-query'
import { Link, createFileRoute } from '@tanstack/react-router'
import { Search } from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'
import { z } from 'zod'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@hearloop/ui/components/input-group'
import { useSession } from '#/features/auth/use-session'
import { useOrg } from '#/features/orgs/use-org'
import { BoardSidebar } from '#/features/posts/components/board-sidebar'
import { NewPostDialog } from '#/features/posts/components/new-post-dialog'
import { PostRow } from '#/features/posts/components/post-row'
import { postListQuery } from '#/features/posts/post.queries'
import { useBoardShortcuts } from '#/features/posts/use-board-shortcuts'
import { cn } from '@hearloop/ui/lib/utils'

const SORTS = { top: 'Top', new: 'New' } as const

export const Route = createFileRoute('/$org/_public/')({
  validateSearch: z.object({
    sort: z.enum(['top', 'new']).optional().catch(undefined),
    category: z.number().int().positive().optional().catch(undefined),
  }),
  loader: ({ context, params }) => context.queryClient.query(postListQuery(params.org)),
  component: BoardPage,
})

function BoardPage() {
  const { org, categories, isMember } = useOrg()
  const session = useSession()
  const { sort = 'top', category } = Route.useSearch()
  const { data: all } = useSuspenseQuery(postListQuery(org.slug))
  const [search, setSearch] = useState('')
  const [composing, setComposing] = useState(false)
  const compose = useCallback(() => setComposing(true), [])

  const needle = search.trim().toLowerCase()
  const posts = useMemo(() => {
    const inCategory = category ? all.filter((p) => p.categoryId === category) : all
    const sorted = sort === 'new' ? [...inCategory].sort((a, b) => b.id - a.id) : inCategory
    return needle ? sorted.filter((p) => p.title.toLowerCase().includes(needle)) : sorted
  }, [all, sort, needle, category])
  const { selected, resetSelection, rowRef } = useBoardShortcuts({ org: org.slug, posts, onCompose: compose, enabled: !composing })

  return (
    <main className="mx-auto max-w-5xl px-4 pt-10 md:px-0">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">{org.name}</h1>
        {org.tagline && <p className="mt-1.5 max-w-xl text-sm leading-6 text-muted-foreground">{org.tagline}</p>}
      </div>
      <div className="flex flex-col gap-12 md:flex-row">
        <section className="min-w-0 flex-1 md:max-w-[720px]">
          <div className="mb-4 flex items-center gap-5 text-sm">
            {Object.entries(SORTS).map(([key, label]) => (
              <Link key={key} to="/$org" params={{ org: org.slug }} search={{ sort: key === 'top' ? undefined : 'new', category }}
                className={cn(sort === key ? 'font-semibold text-foreground' : 'text-muted-foreground hover:text-foreground')}>
                {label}
              </Link>
            ))}
            <span className="ml-auto text-xs text-muted-foreground tabular-nums">{posts.length} posts</span>
          </div>

          <InputGroup className="mb-4">
            <InputGroupAddon><Search /></InputGroupAddon>
            <InputGroupInput type="search" value={search} placeholder="Search requests" aria-label="Search requests"
              onChange={(e) => { setSearch(e.target.value); resetSelection() }}
              onKeyDown={(e) => { if (e.key === 'Escape') setSearch('') }} />
          </InputGroup>

          {posts.length === 0 ? (
            <p className="border-t py-10 text-sm text-muted-foreground">
              {needle ? `No requests match "${search.trim()}".` : 'No requests yet. Post the first idea.'}
            </p>
          ) : (
            <ol aria-label="Requests">
              {posts.map((p, i) => <PostRow key={p.id} ref={rowRef(i)} org={org.slug} post={p} rank={i + 1} selected={selected === i} />)}
            </ol>
          )}
        </section>
        <BoardSidebar org={org.slug} posts={all} showRoadmap={org.showRoadmap} onCompose={compose} categories={categories} category={category} sort={sort} />
      </div>

      <NewPostDialog org={org.slug} posts={all} open={composing} onOpenChange={setComposing}
        mustSignIn={org.whoCanPost === 'signed_in' && !session} isMember={isMember} defaultCategory={category ?? null} />
    </main>
  )
}
