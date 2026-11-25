import { zodResolver } from '@hookform/resolvers/zod'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { ArrowUp, Lock, Trash2 } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
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
import { Badge } from '@hearloop/ui/components/badge'
import { Button } from '@hearloop/ui/components/button'
import { Field, FieldError, FieldLabel } from '@hearloop/ui/components/field'
import { Switch } from '@hearloop/ui/components/switch'
import { Input } from '@hearloop/ui/components/input'
import { Textarea } from '@hearloop/ui/components/textarea'
import { useSession } from '#/features/auth/use-session'
import { Initials } from '#/features/posts/components/assignee-select'
import { cn } from '@hearloop/ui/lib/utils'
import type { comments as commentsTable } from '#/db/schema'
import { timeAgo } from '#/lib/format'
import { commentsQuery } from '../comment.queries'
import { type NewCommentInput, newCommentSchema } from '../comment.schema'
import { useAddComment, useRemoveComment } from '../use-comments'

type Comment = typeof commentsTable.$inferSelect

export function Comments({
  org,
  postId,
  signedIn,
  isMember,
}: {
  org: string
  postId: number
  signedIn: boolean
  isMember: boolean
}) {
  const { data: comments } = useSuspenseQuery(commentsQuery(org, postId))
  const remove = useRemoveComment(org, postId)
  const session = useSession()
  const threads = comments.filter((c) => !c.parentId)
  const repliesOf = (id: number) => comments.filter((c) => c.parentId === id)
  const me = session?.user.name || session?.user.email || ''
  return (
    <section aria-labelledby="comments-heading">
      <h2 id="comments-heading" className="mt-12 mb-3 text-[15px] font-semibold">
        Comments
      </h2>
      {comments.length === 0 && <p className="pb-2 text-sm text-muted-foreground">No comments yet.</p>}
      <ol aria-label="Comments" className="grid gap-4">
        {threads.map((c) => (
          <li key={c.id} className={cn('overflow-hidden rounded-xl border bg-card', c.internal && 'border-dashed')}>
            <Entry c={c} canRemove={isMember} onRemove={() => remove.mutate(c.id)} />
            {repliesOf(c.id).map((r) => (
              <Entry key={r.id} c={r} canRemove={isMember} onRemove={() => remove.mutate(r.id)} />
            ))}
            {signedIn && <ReplyForm org={org} postId={postId} parent={c} me={me} />}
          </li>
        ))}
      </ol>
      {signedIn ? (
        <CommentForm org={org} postId={postId} isMember={isMember} />
      ) : (
        <p className="mt-4 text-sm text-muted-foreground">
          <Link to="/login" search={{ next: `/${org}/posts/${postId}` }} className="text-foreground underline">
            Sign in
          </Link>{' '}
          to comment.
        </p>
      )}
    </section>
  )
}

function Entry({ c, canRemove, onRemove }: { c: Comment; canRemove: boolean; onRemove: () => void }) {
  return (
    <div data-testid="comment" className="px-5 pt-4 pb-3">
      <p className="flex items-center gap-2 text-[13px]">
        <Initials name={c.author} className="size-6 text-[10px]" />
        <span className="font-medium">{c.author}</span>
        {c.team && <Badge variant="secondary">Team</Badge>}
        {c.internal && !c.parentId && (
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Lock className="size-3" />
            Internal note
          </span>
        )}
        <span className="text-faint">{timeAgo(c.createdAt)}</span>
        {canRemove && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-auto size-7 text-faint" aria-label="Remove comment">
                <Trash2 className="size-3.5" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Remove this comment?</AlertDialogTitle>
                <AlertDialogDescription>
                  It disappears from the request for everyone{c.parentId ? '' : ', with its replies'}.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onRemove}>Remove</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </p>
      <p className="mt-2 pl-8 text-sm leading-6 whitespace-pre-wrap">{c.body}</p>
    </div>
  )
}

function ReplyForm({ org, postId, parent, me }: { org: string; postId: number; parent: Comment; me: string }) {
  const add = useAddComment(org, postId)
  const form = useForm<NewCommentInput>({
    resolver: zodResolver(newCommentSchema),
    defaultValues: { body: '', internal: parent.internal, parentId: parent.id },
  })
  const onSubmit = form.handleSubmit(async (input) => {
    try {
      await add.mutateAsync(input)
      form.reset({ body: '', internal: parent.internal, parentId: parent.id })
    } catch (e) {
      form.setError('root', { message: e instanceof Error ? e.message : 'Could not post the reply.' })
    }
  })
  const error = form.formState.errors.root?.message
  return (
    <form
      onSubmit={onSubmit}
      aria-label={`Reply to ${parent.author}`}
      className="flex items-center gap-3 border-t px-5 py-2.5"
    >
      <Initials name={me} className="size-6 text-[10px]" />
      <Input
        {...form.register('body')}
        maxLength={4000}
        placeholder="Leave a reply…"
        aria-label="Reply"
        className="h-8 flex-1 border-0 bg-transparent px-0 text-sm shadow-none focus-visible:ring-0 dark:bg-transparent"
      />
      {error && (
        <span role="alert" className="text-xs text-destructive">
          {error}
        </span>
      )}
      <Button
        type="submit"
        size="icon"
        aria-label="Reply"
        disabled={form.formState.isSubmitting}
        className="size-8 rounded-full bg-secondary text-foreground hover:bg-accent"
      >
        <ArrowUp className="size-4" />
      </Button>
    </form>
  )
}

function CommentForm({ org, postId, isMember }: { org: string; postId: number; isMember: boolean }) {
  const add = useAddComment(org, postId)
  const form = useForm<NewCommentInput>({
    resolver: zodResolver(newCommentSchema),
    defaultValues: { body: '', internal: false },
  })
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
    <form onSubmit={onSubmit} className="mt-4">
      <Field className="gap-1.5">
        <FieldLabel htmlFor="comment-body" className="sr-only">
          Comment
        </FieldLabel>
        <div className="rounded-xl border bg-card shadow-xs focus-within:border-ring/60">
          <Textarea
            id="comment-body"
            {...form.register('body')}
            rows={2}
            maxLength={4000}
            placeholder="Leave a comment…"
            aria-invalid={!!form.formState.errors.body}
            className="min-h-16 resize-none border-0 bg-transparent px-4 pt-3.5 text-[14px] shadow-none focus-visible:ring-0 dark:bg-transparent"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                onSubmit()
              }
            }}
          />
          <div className="flex items-center gap-3 px-3 pb-3">
            {isMember && (
              <Controller
                control={form.control}
                name="internal"
                render={({ field }) => (
                  <Field orientation="horizontal" className="w-auto">
                    <Switch id="comment-internal" size="sm" checked={field.value} onCheckedChange={field.onChange} />
                    <FieldLabel htmlFor="comment-internal" className="text-xs font-normal text-muted-foreground">
                      Internal note (team only)
                    </FieldLabel>
                  </Field>
                )}
              />
            )}
            <Button
              type="submit"
              size="icon"
              aria-label="Comment"
              title="Comment (⌘ ↵)"
              disabled={form.formState.isSubmitting}
              className="ml-auto size-8 rounded-full bg-secondary text-foreground hover:bg-accent"
            >
              <ArrowUp className="size-4" />
            </Button>
          </div>
        </div>
        {error && <FieldError role="alert">{error}</FieldError>}
      </Field>
    </form>
  )
}
