import { Link } from '@tanstack/react-router'
import { Plus } from 'lucide-react'
import { Button } from '@hearloop/ui/components/button'
import type { Post } from '#/db/schema'
import { POST_STATUSES, STATUS_LABEL } from '../status'
import { StatusIcon } from './status-icon'

export function BoardSidebar({ org, posts, showRoadmap, onCompose }: { org: string; posts: Post[]; showRoadmap: boolean; onCompose: () => void }) {
  return (
    <aside className="w-full shrink-0 md:w-60">
      <Button size="lg" className="w-full" onClick={onCompose}><Plus />Post idea</Button>
      {showRoadmap && (
        <>
          <p className="mt-8 mb-2 px-2.5 text-xs font-medium text-muted-foreground">Roadmap</p>
          <ul>
            {POST_STATUSES.filter((s) => s !== 'open').map((s) => (
              <li key={s}>
                <Button variant="ghost" className="w-full justify-start gap-2.5 px-2.5 font-normal text-muted-foreground" asChild>
                  <Link to="/$org/roadmap" params={{ org }}>
                    <StatusIcon status={s} className="size-3.5" />
                    {STATUS_LABEL[s]}
                    <span className="ml-auto text-xs tabular-nums">{posts.filter((p) => p.status === s).length}</span>
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
