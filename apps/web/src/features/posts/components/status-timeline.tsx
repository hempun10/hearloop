import { Fragment } from 'react'
import { cn } from '@hearloop/ui/lib/utils'
import { POST_STATUSES, STATUS_COLOR, STATUS_LABEL, type PostStatus } from '../status'

export function StatusTimeline({ status }: { status: PostStatus }) {
  const reached = POST_STATUSES.indexOf(status)
  return (
    <ol className="flex items-center" aria-label="Status timeline">
      {POST_STATUSES.map((s, i) => (
        <Fragment key={s}>
          <li className="flex items-center gap-2" aria-current={i === reached ? 'step' : undefined}>
            <span className={cn('size-2 shrink-0 rounded-full', i <= reached ? STATUS_COLOR[s].bg : 'bg-input', i === reached && 'ring-4 ring-current/20', STATUS_COLOR[s].text)} />
            <span className={cn('text-xs', i <= reached ? 'text-foreground' : 'text-faint')}>{STATUS_LABEL[s]}</span>
          </li>
          {i < POST_STATUSES.length - 1 && <li aria-hidden className="mx-3 h-px flex-1 bg-border" />}
        </Fragment>
      ))}
    </ol>
  )
}
