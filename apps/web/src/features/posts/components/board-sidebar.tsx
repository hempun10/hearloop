import { Link } from '@tanstack/react-router'
import { Plus } from 'lucide-react'
import { Button } from '@hearloop/ui/components/button'
import type { Category, Post } from '#/db/schema'
import { cn } from '@hearloop/ui/lib/utils'
import { statusKey } from '../status'
import { useStatuses } from '../use-statuses'
import { StatusIconFor } from './status-icon'

export function BoardSidebar({
  org,
  posts,
  showRoadmap,
  onCompose,
  categories,
  category,
  sort,
}: {
  org: string
  posts: Post[]
  showRoadmap: boolean
  onCompose: () => void
  categories: Category[]
  category?: number
  sort: 'top' | 'new'
}) {
  const statuses = useStatuses().filter((s) => s.kind !== 'open')
  const sortSearch = sort === 'new' ? ('new' as const) : undefined
  const item = (on: boolean) =>
    cn('w-full justify-start gap-2.5 px-2.5 font-normal', on ? 'bg-secondary text-foreground' : 'text-muted-foreground')
  return (
    <aside className="w-full shrink-0 md:w-60">
      <Button size="lg" className="w-full" onClick={onCompose}>
        <Plus />
        Post idea
      </Button>
      {categories.length > 0 && (
        <nav aria-label="Boards">
          <p className="mt-8 mb-2 px-2.5 text-xs font-medium text-muted-foreground">Boards</p>
          <ul>
            <li>
              <Button variant="ghost" className={item(!category)} asChild>
                <Link to="/$org" params={{ org }} search={{ sort: sortSearch }}>
                  All
                  <span className="ml-auto text-xs tabular-nums">{posts.length}</span>
                </Link>
              </Button>
            </li>
            {categories.map((c) => (
              <li key={c.id}>
                <Button variant="ghost" className={item(category === c.id)} asChild>
                  <Link
                    to="/$org"
                    params={{ org }}
                    search={{ sort: sortSearch, category: c.id }}
                    title={c.description || undefined}
                  >
                    <span className="truncate">{c.name}</span>
                    <span className="ml-auto text-xs tabular-nums">
                      {posts.filter((p) => p.categoryId === c.id).length}
                    </span>
                  </Link>
                </Button>
              </li>
            ))}
          </ul>
        </nav>
      )}
      {showRoadmap && (
        <>
          <p className="mt-8 mb-2 px-2.5 text-xs font-medium text-muted-foreground">Roadmap</p>
          <ul>
            {statuses.map((s) => (
              <li key={s.key}>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2.5 px-2.5 font-normal text-muted-foreground"
                  asChild
                >
                  <Link to="/$org/roadmap" params={{ org }}>
                    <StatusIconFor option={s} className="size-3.5" />
                    {s.label}
                    <span className="ml-auto text-xs tabular-nums">
                      {posts.filter((p) => statusKey(p) === s.key).length}
                    </span>
                  </Link>
                </Button>
              </li>
            ))}
          </ul>
        </>
      )}
      <p className="mt-8 px-2.5 text-xs leading-5 text-faint">
        The top request is picked up by a coding agent. It ships only after Kane CLI verifies it in a real browser.
      </p>
    </aside>
  )
}
