import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from '@tanstack/react-router'
import { useForm, useWatch } from 'react-hook-form'
import { Button } from '#/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '#/components/ui/dialog'
import { FieldError } from '#/components/ui/field'
import { Kbd, KbdGroup } from '#/components/ui/kbd'
import { Textarea } from '#/components/ui/textarea'
import type { Post } from '#/db/schema'
import { type NewPostInput, newPostSchema } from '../post.schema'
import { findSimilarPosts } from '../similar-posts'
import { useCreatePost } from '../use-post-mutations'

type Props = { org: string; posts: Post[]; open: boolean; onOpenChange: (open: boolean) => void; mustSignIn: boolean }

export function NewPostDialog({ org, posts, open, onOpenChange, mustSignIn }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-0 p-0 sm:max-w-[560px]">
        {mustSignIn ? <SignInToPost org={org} onCancel={() => onOpenChange(false)} /> : <NewPostForm org={org} posts={posts} onDone={() => onOpenChange(false)} />}
      </DialogContent>
    </Dialog>
  )
}

function SignInToPost({ org, onCancel }: { org: string; onCancel: () => void }) {
  return (
    <div className="p-6">
      <DialogHeader>
        <DialogTitle>Sign in to post</DialogTitle>
        <DialogDescription>This board asks people to sign in before posting. Voting stays open to everyone.</DialogDescription>
      </DialogHeader>
      <DialogFooter className="mt-6">
        <Button variant="ghost" onClick={onCancel}>Cancel</Button>
        <Button asChild>
          <Link to="/login" search={{ next: `/${org}` }}>Sign in</Link>
        </Button>
      </DialogFooter>
    </div>
  )
}

function NewPostForm({ org, posts, onDone }: { org: string; posts: Post[]; onDone: () => void }) {
  const navigate = useNavigate()
  const create = useCreatePost(org)
  const form = useForm<NewPostInput>({ resolver: zodResolver(newPostSchema), defaultValues: { title: '', body: '' } })
  const title = useWatch({ control: form.control, name: 'title' })
  const similar = findSimilarPosts(title, posts)
  const error = form.formState.errors.title?.message ?? form.formState.errors.root?.message

  const onSubmit = form.handleSubmit(async (input) => {
    try {
      const post = await create.mutateAsync(input)
      onDone()
      await navigate({ to: '/$org/posts/$id', params: { org, id: String(post.id) } })
    } catch (e) {
      form.setError('root', { message: e instanceof Error ? e.message : 'Could not post. Try again.' })
    }
  })

  return (
    <form onSubmit={onSubmit} onKeyDown={(e) => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); onSubmit() } }}>
      <DialogHeader className="border-b px-5 py-3">
        <DialogTitle className="text-sm">New post</DialogTitle>
        <DialogDescription className="sr-only">Describe what you want built. Similar requests show up as you type.</DialogDescription>
      </DialogHeader>
      <div className="px-5 pt-4">
        <input {...form.register('title')} autoFocus maxLength={140} aria-label="Title" aria-invalid={!!form.formState.errors.title}
          placeholder="Short, specific title" className="w-full bg-transparent text-lg font-semibold outline-none placeholder:text-faint" />
        <Textarea {...form.register('body')} maxLength={4000} rows={5} aria-label="Details"
          placeholder="What should happen, and how would you know it works?"
          className="mt-3 resize-none border-0 bg-transparent! px-0 text-sm leading-6 text-muted-foreground shadow-none focus-visible:ring-0" />
      </div>
      {similar.length > 0 && (
        <div className="mx-5 mb-3 rounded-lg border bg-background/60 p-3" aria-live="polite">
          <p className="text-xs font-medium text-muted-foreground">Similar requests. Vote on one instead?</p>
          <ul className="mt-2 grid gap-1">
            {similar.map((p) => (
              <li key={p.id}>
                <Link to="/$org/posts/$id" params={{ org, id: String(p.id) }} onClick={onDone}
                  className="flex items-center gap-2 rounded-md px-2 py-1.5 text-[13px] hover:bg-accent">
                  <span className="min-w-0 flex-1 truncate">{p.title}</span>
                  <span className="text-xs text-faint tabular-nums">▲ {p.votes}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      <DialogFooter className="flex-row items-center gap-3 border-t px-5 py-3 sm:justify-start">
        {error ? (
          <FieldError role="alert" className="text-xs">{error}</FieldError>
        ) : (
          <span className="inline-flex items-center gap-1 text-xs text-faint"><KbdGroup><Kbd>⌘</Kbd><Kbd>enter</Kbd></KbdGroup> to post</span>
        )}
        <Button type="button" variant="ghost" className="ml-auto" onClick={onDone}>Cancel</Button>
        <Button type="submit" disabled={form.formState.isSubmitting}>{form.formState.isSubmitting ? 'Posting' : 'Post'}</Button>
      </DialogFooter>
    </form>
  )
}
