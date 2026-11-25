import { ChevronUp } from 'lucide-react'
import type { Post } from '#/db/schema'
import { cn } from '@hearloop/ui/lib/utils'
import { useVotePost } from '../use-post-mutations'
import { useVoted } from '../use-voted-posts'

export function VoteButton({
  org,
  post,
  className,
}: {
  org: string
  post: Pick<Post, 'id' | 'votes'>
  className?: string
}) {
  const { voted, markVoted, unmark } = useVoted(post.id)
  const vote = useVotePost(org)

  function onClick(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    if (voted) return
    markVoted()
    vote.mutate(post.id, { onError: unmark })
  }

  return (
    <button
      type="button"
      data-vote
      onClick={onClick}
      aria-pressed={voted}
      aria-label={`${post.votes} votes, ${voted ? 'voted' : 'vote'}`}
      className={cn(
        'flex h-14 w-12 shrink-0 flex-col items-center justify-center gap-0.5 rounded-lg border transition-[background-color,border-color,color,box-shadow] duration-200 active:translate-y-px',
        voted
          ? 'border-brand bg-brand text-background shadow-[0_2px_10px_color-mix(in_oklch,var(--brand)_28%,transparent)]'
          : 'bg-card text-muted-foreground hover:border-input hover:text-foreground',
        className,
      )}
    >
      <ChevronUp className="size-3.5" strokeWidth={2.5} aria-hidden />
      <span
        data-testid="votes"
        className={cn(
          'text-[13px] leading-none font-semibold tabular-nums',
          voted ? 'text-background' : 'text-foreground',
        )}
      >
        {post.votes}
      </span>
    </button>
  )
}
