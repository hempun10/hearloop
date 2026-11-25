import { Trash2 } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@hearloop/ui/components/alert-dialog'
import { Button, buttonVariants } from '@hearloop/ui/components/button'
import type { Post } from '#/db/schema'
import { useDeletePost } from '../use-post-mutations'

export function DeletePostButton({
  org,
  post,
  className,
}: {
  org: string
  post: Pick<Post, 'id' | 'title'>
  className?: string
}) {
  const remove = useDeletePost(org)
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon-sm" aria-label={`Delete ${post.title}`} className={className}>
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete “{post.title}”?</AlertDialogTitle>
          <AlertDialogDescription>
            Its votes, Kane runs and changelog entry go too. This can’t be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className={buttonVariants({ variant: 'destructive' })} onClick={() => remove.mutate(post)}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
