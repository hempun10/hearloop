import { useQuery } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { Button } from '@hearloop/ui/components/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@hearloop/ui/components/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@hearloop/ui/components/select'
import type { Post } from '#/db/schema'
import { postListQuery } from '../post.queries'
import { useMergePost } from '../use-post-mutations'

/** Merge this duplicate into another request: votes and comments move over, and this one leaves the board. */
export function MergePostDialog({ org, post }: { org: string; post: Post }) {
  const [open, setOpen] = useState(false)
  const [into, setInto] = useState('')
  const { data: posts = [] } = useQuery({ ...postListQuery(org), enabled: open })
  const merge = useMergePost(org)
  const navigate = useNavigate()
  const targets = posts.filter((p) => p.id !== post.id)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="w-full">
          Merge into…
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Merge “{post.title}”</DialogTitle>
          <DialogDescription>
            Its votes, comments and tags move to the request you pick, and it leaves the board.
          </DialogDescription>
        </DialogHeader>
        <Select value={into} onValueChange={setInto}>
          <SelectTrigger aria-label="Merge into" className="w-full">
            <SelectValue placeholder="Pick the request that stays" />
          </SelectTrigger>
          <SelectContent>
            {targets.map((p) => (
              <SelectItem key={p.id} value={String(p.id)}>
                {p.title} · {p.votes} votes
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            disabled={!into || merge.isPending}
            onClick={() =>
              merge.mutate(
                { id: post.id, into: Number(into) },
                {
                  onSuccess: () => {
                    setOpen(false)
                    navigate({ to: '/$org/posts/$id', params: { org, id: into } })
                  },
                },
              )
            }
          >
            {merge.isPending ? 'Merging' : 'Merge'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
