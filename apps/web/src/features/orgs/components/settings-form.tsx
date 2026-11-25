import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Button } from '@hearloop/ui/components/button'
import { FieldError } from '@hearloop/ui/components/field'
import { ArrowBox } from '#/features/landing/components/cta'
import type { PublicOrg } from '../org.server'
import { updateOrg } from '../org.functions'
import { type OrgSettings, orgSettingsSchema } from '../org.schema'
import { orgQuery } from '../org.queries'

const toForm = (org: PublicOrg): OrgSettings => ({
  name: org.name,
  tagline: org.tagline,
  accent: org.accent ?? '',
  logoUrl: org.logoUrl ?? '',
  theme: org.theme,
  poweredBy: org.poweredBy,
  showRoadmap: org.showRoadmap,
  showChangelog: org.showChangelog,
  whoCanPost: org.whoCanPost,
})

/**
 * One settings form for the board. Each settings page renders only its own rows
 * (read with useFormContext); saving sends every field, so untouched ones keep their values.
 */
export function SettingsForm({ org, label, children }: { org: PublicOrg; label: string; children: ReactNode }) {
  const qc = useQueryClient()
  const form = useForm<OrgSettings>({ resolver: zodResolver(orgSettingsSchema), defaultValues: toForm(org) })
  const save = useMutation({
    mutationFn: (settings: OrgSettings) => updateOrg({ data: { org: org.slug, settings } }),
    onSuccess: async (_r, settings) => {
      form.reset(settings)
      await qc.invalidateQueries({ queryKey: orgQuery(org.slug).queryKey })
      toast.success('Saved')
    },
    onError: (e) => form.setError('root', { message: e.message }),
  })
  const { isDirty, errors } = form.formState

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit((s) => save.mutate(s))} aria-label={label} noValidate>
        {children}
        <div className="flex items-center justify-end gap-3 border-t pt-4">
          {errors.root && (
            <FieldError role="alert" className="mr-auto">
              {errors.root.message}
            </FieldError>
          )}
          <span className="text-xs text-faint">{isDirty ? 'Unsaved changes' : 'Saved'}</span>
          <Button type="submit" variant="cta" size="sm" className="pr-[38px]" disabled={!isDirty || save.isPending}>
            {save.isPending ? 'Saving' : 'Save changes'}
            <ArrowBox />
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}
