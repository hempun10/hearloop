import { Link } from '@tanstack/react-router'
import type { Post } from '#/db/schema'
import { timeAgo } from '#/lib/format'
import { cn } from '#/lib/utils'
import { STATUS_LABEL } from '../status'
import { StatusIcon } from './status-icon'
import { VoteButton } from './vote-button'

export function PostRow({ org, post, rank, selected, ref }: {
  org: string
  post: Post
  rank: number
  selected?: boolean
  ref?: React.Ref<HTMLLIElement>
}) {
  return (
    <li ref={ref} data-testid="post" aria-current={selected || undefined}
      className={cn('flex gap-4 border-t py-4 transition-colors first:border-t-0', selected && 'bg-card')}>
      <span className="w-8 shrink-0 pt-0.5 text-xs text-faint tabular-nums">{String(rank).padStart(2, '0')}</span>
      <div className="min-w-0 flex-1">
        <Link to="/$org/posts/$id" params={{ org, id: String(post.id) }} className="text-[15px] font-semibold hover:underline">
          {post.title}
        </Link>
        {post.body && <p className="mt-1.5 line-clamp-2 text-sm leading-6 text-muted-foreground">{post.body}</p>}
        <div className="mt-2 flex items-center gap-3 text-xs text-faint">
          {post.status !== 'open' && (
            <span data-testid="status" className="inline-flex items-center gap-1.5 font-medium text-foreground">
              <StatusIcon status={post.status} className="size-3.5" />
              {STATUS_LABEL[post.status]}
            </span>
          )}
          <span className="tabular-nums">{timeAgo(post.createdAt)}</span>
        </div>
      </div>
      <VoteButton org={org} post={post} />
    </li>
  )
}
