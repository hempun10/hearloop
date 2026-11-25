import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { Link, useNavigate } from '@tanstack/react-router'
import { LayoutGrid, Tag } from 'lucide-react'
import { Controller, useForm, useWatch } from 'react-hook-form'
import { useOrg } from '#/features/orgs/use-org'
import { tagsQuery } from '../post.queries'
import { useStatuses } from '../use-statuses'
import { PropertyPicker } from './property-picker'
import { StatusIconFor } from './status-icon'
import { Button } from '@hearloop/ui/components/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@hearloop/ui/components/dialog'
import { FieldError } from '@hearloop/ui/components/field'
import { Kbd, KbdGroup } from '@hearloop/ui/components/kbd'
import { Textarea } from '@hearloop/ui/components/textarea'
import type { Post } from '#/db/schema'
import { type ComposeInput, composeSchema } from '../post.schema'
import { findSimilarPosts } from '../similar-posts'
import { useCreatePost } from '../use-post-mutations'

type Props = {
  org: string
  posts: Post[]
  open: boolean
  onOpenChange: (open: boolean) => void
  mustSignIn: boolean
  isMember?: boolean
  defaultCategory?: number | null
  /** Called with the new post instead of opening its page (the widget stays in its panel). */
  onPosted?: (post: { id: number; title: string }) => void
}

export function NewPostDialog({
  org,
  posts,
  open,
  onOpenChange,
  mustSignIn,
  isMember = false,
  defaultCategory = null,
  onPosted,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-0 p-0 sm:max-w-[560px]">
        {mustSignIn ? (
          <SignInToPost org={org} onCancel={() => onOpenChange(false)} />
        ) : (
          <NewPostForm
            org={org}
            posts={posts}
            isMember={isMember}
            defaultCategory={defaultCategory}
            onDone={() => onOpenChange(false)}
            onPosted={onPosted}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}

function SignInToPost({ org, onCancel }: { org: string; onCancel: () => void }) {
  return (
    <div className="p-6">
      <DialogHeader>
        <DialogTitle>Sign in to post</DialogTitle>
        <DialogDescription>
          This board asks people to sign in before posting. Voting stays open to everyone.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter className="mt-6">
        <Button variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button asChild>
          <Link to="/login" search={{ next: `/${org}` }}>
            Sign in
          </Link>
        </Button>
      </DialogFooter>
    </div>
  )
}

function NewPostForm({
  org,
  posts,
  isMember,
  defaultCategory,
  onDone,
  onPosted,
}: {
  org: string
  posts: Post[]
  isMember: boolean
  defaultCategory: number | null
  onDone: () => void
  onPosted?: Props['onPosted']
}) {
  const navigate = useNavigate()
  const create = useCreatePost(org)
  const { categories } = useOrg()
  const statuses = useStatuses()
  const form = useForm<ComposeInput>({
    resolver: zodResolver(composeSchema),
    defaultValues: { title: '', body: '', categoryId: defaultCategory, status: 'open', tags: [] },
  })
  const title = useWatch({ control: form.control, name: 'title' })
  const similar = findSimilarPosts(title, posts)
  const error = form.formState.errors.title?.message ?? form.formState.errors.root?.message

  const onSubmit = form.handleSubmit(async (input) => {
    try {
      const post = await create.mutateAsync(input)
      onDone()
      if (onPosted) onPosted(post)
      else await navigate({ to: '/$org/posts/$id', params: { org, id: String(post.id) } })
    } catch (e) {
      form.setError('root', { message: e instanceof Error ? e.message : 'Could not post. Try again.' })
    }
  })

  return (
    <form
      onSubmit={onSubmit}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
          e.preventDefault()
          onSubmit()
        }
      }}
    >
      <DialogHeader className="border-b px-5 py-3">
        <DialogTitle className="text-sm">New post</DialogTitle>
        <DialogDescription className="sr-only">
          Describe what you want built. Similar requests show up as you type.
        </DialogDescription>
      </DialogHeader>
      <div className="px-5 pt-4">
        <input
          {...form.register('title')}
          autoFocus
          maxLength={140}
          aria-label="Title"
          aria-invalid={!!form.formState.errors.title}
          placeholder="Short, specific title"
          className="w-full bg-transparent text-lg font-semibold outline-none placeholder:text-faint"
        />
        <Textarea
          {...form.register('body')}
          maxLength={4000}
          rows={5}
          aria-label="Details"
          placeholder="What should happen, and how would you know it works?"
          className="mt-3 resize-none border-0 bg-transparent! px-0 text-sm leading-6 text-muted-foreground shadow-none focus-visible:ring-0"
        />
      </div>
      {similar.length > 0 && (
        <div className="mx-5 mb-3 rounded-lg border bg-background/60 p-3" aria-live="polite">
          <p className="text-xs font-medium text-muted-foreground">Similar requests. Vote on one instead?</p>
          <ul className="mt-2 grid gap-1">
            {similar.map((p) => (
              <li key={p.id}>
                <Link
                  to="/$org/posts/$id"
                  params={{ org, id: String(p.id) }}
                  onClick={onDone}
                  className="flex items-center gap-2 rounded-md px-2 py-1.5 text-[13px] hover:bg-accent"
                >
                  <span className="min-w-0 flex-1 truncate">{p.title}</span>
                  <span className="text-xs text-faint tabular-nums">▲ {p.votes}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="flex flex-wrap items-center gap-2 border-t bg-background px-5 py-3">
        {categories.length > 0 && (
          <Controller
            name="categoryId"
            control={form.control}
            render={({ field }) => (
              <PropertyPicker
                what="board"
                className={pill}
                selected={[String(field.value ?? 'none')]}
                trigger={
                  <>
                    <LayoutGrid className="size-3.5 text-muted-foreground" />
                    {categories.find((c) => c.id === field.value)?.name ?? 'No board'}
                  </>
                }
                options={[
                  { value: 'none', label: 'No board', icon: <LayoutGrid className="size-4 text-muted-foreground" /> },
                  ...categories.map((c) => ({
                    value: String(c.id),
                    label: c.name,
                    icon: <LayoutGrid className="size-4 text-muted-foreground" />,
                  })),
                ]}
                onSelect={(v) => field.onChange(v === 'none' ? null : Number(v))}
              />
            )}
          />
        )}
        {isMember && (
          <Controller
            name="status"
            control={form.control}
            render={({ field }) => {
              const current = statuses.find((s) => s.key === field.value) ?? statuses[0]
              return (
                <PropertyPicker
                  what="status"
                  className={pill}
                  selected={[current.key]}
                  trigger={
                    <>
                      <StatusIconFor option={current} className="size-3.5" />
                      {current.label}
                    </>
                  }
                  options={statuses.map((s) => ({
                    value: s.key,
                    label: s.label,
                    icon: <StatusIconFor option={s} className="size-4" />,
                  }))}
                  onSelect={field.onChange}
                />
              )
            }}
          />
        )}
        <Controller
          name="tags"
          control={form.control}
          render={({ field }) => (
            <TagsPicker org={org} value={field.value} onChange={field.onChange} canCreate={isMember} />
          )}
        />
      </div>
      <DialogFooter className="flex-row items-center gap-3 border-t px-5 py-3 sm:justify-start">
        {error ? (
          <FieldError role="alert" className="text-xs">
            {error}
          </FieldError>
        ) : (
          <span className="inline-flex items-center gap-1 text-xs text-faint">
            <KbdGroup>
              <Kbd>⌘</Kbd>
              <Kbd>enter</Kbd>
            </KbdGroup>{' '}
            to post
          </span>
        )}
        <Button type="button" variant="ghost" className="ml-auto" onClick={onDone}>
          Cancel
        </Button>
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Posting' : 'Post'}
        </Button>
      </DialogFooter>
    </form>
  )
}
const pill = 'h-7 gap-1.5 rounded-md border border-input bg-secondary px-2.5 text-[13px] font-normal hover:bg-accent'

/** The board's tags to tick, up to five; members can also create one. */
function TagsPicker({
  org,
  value,
  onChange,
  canCreate,
}: {
  org: string
  value: string[]
  onChange: (tags: string[]) => void
  canCreate: boolean
}) {
  const { data: tags = [] } = useQuery(tagsQuery(org))
  if (!tags.length && !canCreate) return null
  const names = [...new Set([...tags.map((t) => t.name), ...value])]
  const add = (t: string) => value.length < 5 && onChange([...value, t])
  return (
    <PropertyPicker
      what="tags"
      multi
      className={pill}
      selected={value}
      trigger={
        <>
          <Tag className="size-3.5 text-muted-foreground" />
          {value.length ? value.join(', ') : 'Tags'}
        </>
      }
      options={names.map((t) => ({
        value: t,
        label: t,
        icon: <span className="size-2 rounded-full bg-muted-foreground/60" />,
      }))}
      onSelect={(t) => (value.includes(t) ? onChange(value.filter((x) => x !== t)) : add(t))}
      onCreate={canCreate ? (t) => add(t.toLowerCase().replace(/\s+/g, '-')) : undefined}
    />
  )
}
