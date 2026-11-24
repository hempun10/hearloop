import { zodResolver } from '@hookform/resolvers/zod'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { Lock, Trash2 } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@hearloop/ui/components/alert-dialog'
import { Badge } from '@hearloop/ui/components/badge'
import { Button } from '@hearloop/ui/components/button'
import { Field, FieldError, FieldLabel } from '@hearloop/ui/components/field'
import { Switch } from '@hearloop/ui/components/switch'
import { Textarea } from '@hearloop/ui/components/textarea'
import { cn } from '@hearloop/ui/lib/utils'
import { timeAgo } from '#/lib/format'
import { commentsQuery } from '../comment.queries'
import { type NewCommentInput, newCommentSchema } from '../comment.schema'
import { useAddComment, useRemoveComment } from '../use-comments'

export function Comments({ org, postId, signedIn, isMember }: { org: string; postId: number; signedIn: boolean; isMember: boolean }) {
  const { data: comments } = useSuspenseQuery(commentsQuery(org, postId))
  const remove = useRemoveComment(org, postId)
  return (
    <section aria-labelledby="comments-heading">
      <h2 id="comments-heading" className="mt-12 mb-3 text-[15px] font-semibold">Comments</h2>
      {comments.length === 0 && <p className="border-t pt-4 text-sm text-muted-foreground">No comments yet.</p>}
      <ol aria-label="Comments">
        {comments.map((c) => (
          <li key={c.id} data-testid="comment" className={cn('border-t py-4', c.internal && 'rounded-md border border-dashed bg-card/50 px-3')}>
            <p className="flex items-center gap-2 text-[13px]">
              <span className="font-medium">{c.author}</span>
              {c.team && <Badge variant="secondary">Team</Badge>}
              {c.internal && <span className="inline-flex items-center gap-1 text-xs text-muted-foreground"><Lock className="size-3" />Internal note</span>}
              <span className="text-faint">{timeAgo(c.createdAt)}</span>
              {isMember && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="ml-auto size-7" aria-label="Remove comment"><Trash2 className="size-3.5" /></Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Remove this comment?</AlertDialogTitle>
                      <AlertDialogDescription>It disappears from the request for everyone.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => remove.mutate(c.id)}>Remove</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </p>
            <p className="mt-1.5 text-sm leading-6 whitespace-pre-wrap text-muted-foreground">{c.body}</p>
          </li>
        ))}
      </ol>
      {signedIn ? <CommentForm org={org} postId={postId} isMember={isMember} /> : (
        <p className="border-t pt-4 text-sm text-muted-foreground">
          <Link to="/login" search={{ next: `/${org}/posts/${postId}` }} className="text-foreground underline">Sign in</Link> to comment.
        </p>
      )}
    </section>
  )
}

function CommentForm({ org, postId, isMember }: { org: string; postId: number; isMember: boolean }) {
  const add = useAddComment(org, postId)
  const form = useForm<NewCommentInput>({ resolver: zodResolver(newCommentSchema), defaultValues: { body: '', internal: false } })
  const onSubmit = form.handleSubmit(async (input) => {
    try {
      await add.mutateAsync(input)
      form.reset({ body: '', internal: input.internal })
    } catch (e) {
      form.setError('root', { message: e instanceof Error ? e.message : 'Could not post the comment.' })
    }
  })
  const error = form.formState.errors.body?.message ?? form.formState.errors.root?.message
  return (
    <form onSubmit={onSubmit} className="grid gap-3 border-t pt-4">
      <Field>
        <FieldLabel htmlFor="comment-body" className="sr-only">Comment</FieldLabel>
        <Textarea id="comment-body" {...form.register('body')} rows={3} maxLength={4000} placeholder="Write a comment" aria-invalid={!!form.formState.errors.body} />
        {error && <FieldError role="alert">{error}</FieldError>}
      </Field>
      <div className="flex items-center gap-3">
        {isMember && (
          <Controller control={form.control} name="internal" render={({ field }) => (
            <Field orientation="horizontal" className="w-auto">
              <Switch id="comment-internal" checked={field.value} onCheckedChange={field.onChange} />
              <FieldLabel htmlFor="comment-internal" className="text-[13px] font-normal">Internal note (team only)</FieldLabel>
            </Field>
          )} />
        )}
        <Button type="submit" size="sm" className="ml-auto" disabled={form.formState.isSubmitting}>{form.formState.isSubmitting ? 'Posting' : 'Comment'}</Button>
      </div>
    </form>
  )
}
