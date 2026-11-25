import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { Check, ChevronDown, ChevronUp, Plus } from 'lucide-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Button } from '@hearloop/ui/components/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@hearloop/ui/components/dropdown-menu'
import { FieldError } from '@hearloop/ui/components/field'
import { Input } from '@hearloop/ui/components/input'
import { cn } from '@hearloop/ui/lib/utils'
import { RowMenu } from '#/features/dashboard/components/row-menu'
import { SectionHead } from '#/features/dashboard/components/panel'
import { useOrg } from '#/features/orgs/use-org'
import { statusColor } from '#/features/posts/components/status-badge'
import { postListQuery } from '#/features/posts/post.queries'
import { POST_STATUSES, STATUS_LABEL, statusKey } from '#/features/posts/status'
import { useStatuses } from '#/features/posts/use-statuses'
import { type NewStatusInput, STATUS_SWATCHES, newStatusSchema } from '../status.schema'
import { createStatus, deleteStatusDef, reorderStatus, updateStatusDef } from '../status.functions'

const onError = (e: Error) => toast.error(e.message || 'That did not work.')
const KIND_HELP: Record<NewStatusInput['kind'], string> = {
  open: 'New posts land here',
  planned: 'Approved; agents may build it',
  building: 'Being built',
  shipped: 'Shipped; goes on the changelog',
}

export function StatusesManager({ org }: { org: string }) {
  const qc = useQueryClient()
  const options = useStatuses()
  const { statuses } = useOrg()
  const { data: all } = useSuspenseQuery(postListQuery(org))
  const [adding, setAdding] = useState(false)
  const [editing, setEditing] = useState<number | null>(null)
  const refresh = () =>
    Promise.all([qc.invalidateQueries({ queryKey: ['org', org] }), qc.invalidateQueries({ queryKey: ['posts', org] })])
  const add = useMutation({
    mutationFn: (s: NewStatusInput) => createStatus({ data: { org, ...s } }),
    onSuccess: async () => {
      await refresh()
      setAdding(false)
      toast.success('Status added')
    },
  })
  const save = useMutation({
    mutationFn: (s: { id: number; name: string; color: string }) => updateStatusDef({ data: { org, ...s } }),
    onSuccess: async () => {
      await refresh()
      setEditing(null)
      toast.success('Saved')
    },
  })
  const remove = useMutation({
    mutationFn: (id: number) => deleteStatusDef({ data: { org, id } }),
    onSuccess: async () => {
      await refresh()
      toast.success('Status deleted')
    },
    onError,
  })
  const move = useMutation({
    mutationFn: ({ id, dir }: { id: number; dir: -1 | 1 }) => reorderStatus({ data: { org, id, dir } }),
    onSuccess: refresh,
    onError,
  })

  return (
    <>
      <SectionHead
        title="Statuses"
        right={
          <Button variant="secondary" size="sm" onClick={() => setAdding(true)}>
            <Plus className="size-3" />
            New status
          </Button>
        }
      />
      {options.map((s) => {
        const own = statuses.find((x) => x.id === s.id)
        if (own && editing === own.id) {
          return (
            <StatusForm
              key={s.key}
              initial={own}
              onSubmit={(v) => save.mutateAsync({ id: own.id, name: v.name, color: v.color })}
              onCancel={() => setEditing(null)}
            />
          )
        }
        const peers = options.filter((o) => o.kind === s.kind && o.id)
        const i = peers.findIndex((o) => o.key === s.key)
        const count = all.filter((p) => statusKey(p) === s.key).length
        return (
          <div key={s.key} data-testid="status-row" className="flex items-center gap-3 border-t py-2.5">
            <span className="flex w-3 flex-col">
              {own && (
                <>
                  <button
                    type="button"
                    aria-label={`Move ${s.label} up`}
                    disabled={i === 0}
                    onClick={() => move.mutate({ id: own.id, dir: -1 })}
                    className="text-faint hover:text-foreground disabled:opacity-30"
                  >
                    <ChevronUp className="size-3" />
                  </button>
                  <button
                    type="button"
                    aria-label={`Move ${s.label} down`}
                    disabled={i === peers.length - 1}
                    onClick={() => move.mutate({ id: own.id, dir: 1 })}
                    className="text-faint hover:text-foreground disabled:opacity-30"
                  >
                    <ChevronDown className="size-3" />
                  </button>
                </>
              )}
            </span>
            <span className="size-2.5 rounded-full" style={{ background: statusColor(s) }} />
            <span className="w-40 text-[13px] font-semibold">{s.label}</span>
            <span className="text-[11px] text-faint">{own ? STATUS_LABEL[s.kind].toLowerCase() : 'built in'}</span>
            <span className="flex-1" />
            <span className="text-xs text-faint tabular-nums">
              {count} {count === 1 ? 'post' : 'posts'}
            </span>
            {own ? (
              <RowMenu
                name={s.label}
                what={`Its requests stay ${STATUS_LABEL[s.kind]}.`}
                onEdit={() => setEditing(own.id)}
                onDelete={() => remove.mutate(own.id)}
              />
            ) : (
              <span className="w-[26px]" />
            )}
          </div>
        )
      })}
      {adding && <StatusForm onSubmit={(v) => add.mutateAsync(v)} onCancel={() => setAdding(false)} />}
      <p className="pt-4 text-xs text-faint">
        Each status has a kind that tells hearloop what it means, and sits after it on the roadmap. Shipped kinds go on
        the changelog; coding agents and Kane CLI use the built-ins.
      </p>
    </>
  )
}

function StatusForm({
  initial,
  onSubmit,
  onCancel,
}: {
  initial?: { name: string; color: string; kind: NewStatusInput['kind'] }
  onSubmit: (v: NewStatusInput) => Promise<unknown>
  onCancel: () => void
}) {
  const form = useForm<NewStatusInput>({
    resolver: zodResolver(newStatusSchema),
    defaultValues: initial ?? { name: '', color: STATUS_SWATCHES[1], kind: 'planned' },
  })
  const submit = form.handleSubmit(async (v) => {
    try {
      await onSubmit(v)
    } catch (e) {
      form.setError('root', { message: e instanceof Error ? e.message : 'Could not save.' })
    }
  })
  const { errors, isSubmitting } = form.formState
  return (
    <form
      onSubmit={submit}
      aria-label={initial ? `Edit ${initial.name}` : 'New status'}
      className="flex flex-col gap-3 border-t py-3"
    >
      <div className="flex flex-wrap items-center gap-2">
        <Input
          {...form.register('name')}
          autoFocus
          maxLength={32}
          placeholder="Label"
          aria-label="Status name"
          aria-invalid={!!errors.name}
          className="h-8 w-48 rounded-lg bg-card px-2.5 text-[13px] shadow-none"
        />
        <Controller
          name="color"
          control={form.control}
          render={({ field }) => (
            <>
              <span role="radiogroup" aria-label="Colour" className="flex gap-1.5">
                {STATUS_SWATCHES.map((c) => (
                  <button
                    key={c}
                    type="button"
                    role="radio"
                    aria-checked={field.value === c}
                    aria-label={c}
                    onClick={() => field.onChange(c)}
                    className={cn(
                      'inline-flex size-[22px] items-center justify-center rounded-full',
                      field.value === c && 'ring-2 ring-foreground ring-offset-2 ring-offset-background',
                    )}
                    style={{ background: c }}
                  >
                    {field.value === c && <Check className="size-2.5 text-black/80" strokeWidth={3} />}
                  </button>
                ))}
              </span>
              <Input
                value={field.value}
                onChange={field.onChange}
                aria-label="Colour hex"
                className="h-8 w-24 rounded-lg bg-card px-2.5 text-[12px] tabular-nums shadow-none"
              />
            </>
          )}
        />
      </div>
      <div className="flex items-center gap-3">
        <Controller
          name="kind"
          control={form.control}
          render={({ field }) => (
            <DropdownMenu>
              <DropdownMenuTrigger
                disabled={!!initial}
                aria-label="Kind"
                className="inline-flex h-8 items-center gap-2 rounded-lg border border-input bg-card pr-2 pl-2.5 text-[13px] outline-none hover:bg-accent disabled:opacity-60"
              >
                <span className="text-faint">kind</span> {STATUS_LABEL[field.value].toLowerCase()}{' '}
                <ChevronDown className="size-3 text-faint" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="min-w-64">
                {POST_STATUSES.map((k) => (
                  <DropdownMenuItem key={k} onSelect={() => field.onChange(k)}>
                    <span className="w-20 font-semibold">{STATUS_LABEL[k].toLowerCase()}</span>
                    <span className="text-xs text-muted-foreground">{KIND_HELP[k]}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        />
        <FieldError errors={[errors.name, errors.color, errors.root]} />
        <span className="flex-1" />
        <Button size="sm" variant="ghost" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button size="sm" type="submit" disabled={isSubmitting}>
          Save
        </Button>
      </div>
    </form>
  )
}
