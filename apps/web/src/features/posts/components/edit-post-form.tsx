import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@hearloop/ui/components/button'
import { Field, FieldError, FieldLabel } from '@hearloop/ui/components/field'
import { Input } from '@hearloop/ui/components/input'
import { Textarea } from '@hearloop/ui/components/textarea'
import type { Post } from '#/db/schema'
import { type NewPostInput, newPostSchema } from '../post.schema'
import { useEditPost } from '../use-post-mutations'

export function EditPostForm({ org, post, onDone }: { org: string; post: Post; onDone: () => void }) {
  const save = useEditPost(org, post.id)
  const form = useForm<NewPostInput>({ resolver: zodResolver(newPostSchema), defaultValues: { title: post.title, body: post.body } })
  const onSubmit = form.handleSubmit(async (input) => {
    try {
      await save.mutateAsync(input)
      onDone()
    } catch (e) {
      form.setError('root', { message: e instanceof Error ? e.message : 'Could not save. Try again.' })
    }
  })
  const { errors } = form.formState
  return (
    <form onSubmit={onSubmit} aria-label="Edit request" className="mt-5 grid gap-4">
      <Field>
        <FieldLabel htmlFor="edit-title">Title</FieldLabel>
        <Input id="edit-title" {...form.register('title')} maxLength={140} aria-invalid={!!errors.title} autoFocus />
        <FieldError errors={[errors.title]} />
      </Field>
      <Field>
        <FieldLabel htmlFor="edit-body">Details</FieldLabel>
        <Textarea id="edit-body" {...form.register('body')} rows={6} maxLength={4000} />
      </Field>
      {errors.root && <FieldError role="alert">{errors.root.message}</FieldError>}
      <div className="flex gap-2">
        <Button type="submit" size="sm" disabled={form.formState.isSubmitting}>{form.formState.isSubmitting ? 'Saving' : 'Save'}</Button>
        <Button type="button" size="sm" variant="ghost" onClick={onDone}>Cancel</Button>
      </div>
    </form>
  )
}
