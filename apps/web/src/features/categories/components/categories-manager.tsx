import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Button } from '@hearloop/ui/components/button'
import { FieldError } from '@hearloop/ui/components/field'
import { Input } from '@hearloop/ui/components/input'
import type { Category } from '#/db/schema'
import { RowMenu } from '#/features/dashboard/components/row-menu'
import { SectionHead } from '#/features/dashboard/components/panel'
import { useOrg } from '#/features/orgs/use-org'
import { TagChip } from '#/features/posts/components/post-tags'
import { postListQuery, tagsQuery } from '#/features/posts/post.queries'
import { type CategoryFields, categoryFieldsSchema } from '../category.schema'
import { createCategory, createTag, deleteCategory, removeTag, updateCategory } from '../category.functions'

const onError = (e: Error) => toast.error(e.message || 'That did not work.')
const posts = (n: number) => `${n} ${n === 1 ? 'post' : 'posts'}`
const input = 'h-8 rounded-lg bg-card px-2.5 text-[13px] shadow-none'

export function CategoriesManager({ org }: { org: string }) {
  const qc = useQueryClient()
  const { categories } = useOrg()
  const { data: all } = useSuspenseQuery(postListQuery(org))
  const [adding, setAdding] = useState(false)
  const [editing, setEditing] = useState<number | null>(null)
  const refresh = () => Promise.all([qc.invalidateQueries({ queryKey: ['org', org] }), qc.invalidateQueries({ queryKey: ['posts', org] })])
  const add = useMutation({ mutationFn: (c: CategoryFields) => createCategory({ data: { org, ...c } }), onSuccess: async () => { await refresh(); setAdding(false); toast.success('Board added') } })
  const save = useMutation({ mutationFn: (c: CategoryFields & { id: number }) => updateCategory({ data: { org, ...c } }), onSuccess: async () => { await refresh(); setEditing(null); toast.success('Board updated') } })
  const remove = useMutation({ mutationFn: (id: number) => deleteCategory({ data: { org, id } }), onSuccess: async () => { await refresh(); toast.success('Board deleted') }, onError })

  return (
    <>
      <SectionHead title="Boards" right={<Button variant="secondary" size="sm" onClick={() => setAdding(true)}><Plus className="size-3" />New board</Button>} />
      {categories.length === 0 && !adding && <p className="border-t py-4 text-sm text-faint">No boards yet. Requests then sit in one list.</p>}
      {categories.map((c) => editing === c.id ? (
        <CategoryForm key={c.id} initial={c} label={`Edit ${c.name}`} onSubmit={(v) => save.mutateAsync({ id: c.id, ...v })} onCancel={() => setEditing(null)} />
      ) : (
        <div key={c.id} data-testid="category-row" className="flex items-center gap-3.5 border-t py-3">
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <span className="text-[13px] font-semibold">{c.name}</span>
            <span className="text-xs text-faint">{c.description || 'No description'}</span>
          </div>
          <span className="text-xs text-faint tabular-nums">{posts(all.filter((p) => p.categoryId === c.id).length)}</span>
          <RowMenu name={c.name} what="Its requests stay on the board without a board." onEdit={() => setEditing(c.id)} onDelete={() => remove.mutate(c.id)} />
        </div>
      ))}
      {adding && <CategoryForm label="New board" onSubmit={(v) => add.mutateAsync(v)} onCancel={() => setAdding(false)} />}
      <div className="pt-8"><Tags org={org} /></div>
    </>
  )
}

function CategoryForm({ initial, label, onSubmit, onCancel }: { initial?: Category; label: string; onSubmit: (v: CategoryFields) => Promise<unknown>; onCancel: () => void }) {
  const form = useForm<CategoryFields>({ resolver: zodResolver(categoryFieldsSchema), defaultValues: { name: initial?.name ?? '', description: initial?.description ?? '' } })
  const submit = form.handleSubmit(async (v) => {
    try { await onSubmit(v) } catch (e) { form.setError('root', { message: e instanceof Error ? e.message : 'Could not save.' }) }
  })
  const { errors, isSubmitting } = form.formState
  return (
    <form onSubmit={submit} aria-label={label} className="flex flex-wrap items-center gap-2 border-t py-3">
      <Input {...form.register('name')} autoFocus maxLength={40} placeholder="Board name" aria-label="Board name" aria-invalid={!!errors.name} className={`${input} w-48`} />
      <Input {...form.register('description')} maxLength={160} placeholder="One-line description" aria-label="Board description" className={`${input} min-w-48 flex-1`} />
      <Button size="sm" type="submit" disabled={isSubmitting}>{initial ? 'Save' : 'Add'}</Button>
      <Button size="sm" variant="ghost" type="button" onClick={onCancel}>Cancel</Button>
      <FieldError className="w-full" errors={[errors.name, errors.root]} />
    </form>
  )
}

function Tags({ org }: { org: string }) {
  const qc = useQueryClient()
  const { data: tags } = useSuspenseQuery(tagsQuery(org))
  const [draft, setDraft] = useState<string | null>(null)
  const refresh = () => Promise.all([qc.invalidateQueries({ queryKey: ['tags', org] }), qc.invalidateQueries({ queryKey: ['posts', org] })])
  const add = useMutation({ mutationFn: (name: string) => createTag({ data: { org, name } }), onSuccess: async () => { await refresh(); setDraft(null); toast.success('Tag added') }, onError })
  const remove = useMutation({ mutationFn: (name: string) => removeTag({ data: { org, name } }), onSuccess: async () => { await refresh(); toast.success('Tag deleted') }, onError })
  return (
    <>
      <SectionHead title="Tags" right={<Button variant="secondary" size="sm" onClick={() => setDraft('')}><Plus className="size-3" />New tag</Button>} />
      {tags.length === 0 && draft === null && <p className="border-t py-4 text-sm text-faint">No tags yet.</p>}
      {tags.map((t) => (
        <div key={t.name} data-testid="tag-row" className="flex items-center gap-3 border-t py-2.5">
          <TagChip>{t.name}</TagChip>
          <span className="flex-1" />
          <span className="text-xs text-faint tabular-nums">{posts(t.posts)}</span>
          <RowMenu name={t.name} what="It comes off every request that has it." onDelete={() => remove.mutate(t.name)} />
        </div>
      ))}
      {draft !== null && (
        <form aria-label="New tag" className="flex items-center gap-2 border-t py-3" onSubmit={(e) => { e.preventDefault(); if (draft.trim()) add.mutate(draft) }}>
          <Input autoFocus value={draft} onChange={(e) => setDraft(e.target.value)} maxLength={32} placeholder="Tag name" aria-label="Tag name" className={`${input} w-48`} />
          <Button size="sm" type="submit" disabled={!draft.trim() || add.isPending}>Add</Button>
          <Button size="sm" variant="ghost" type="button" onClick={() => setDraft(null)}>Cancel</Button>
        </form>
      )}
    </>
  )
}
