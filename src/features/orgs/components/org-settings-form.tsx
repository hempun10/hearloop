import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Check, ChevronUp } from 'lucide-react'
import { Controller, useForm, useWatch } from 'react-hook-form'
import { toast } from 'sonner'
import { Button } from '#/components/ui/button'
import { Field, FieldContent, FieldDescription, FieldError, FieldLabel } from '#/components/ui/field'
import { Input } from '#/components/ui/input'
import { RadioGroup, RadioGroupItem } from '#/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '#/components/ui/select'
import { Switch } from '#/components/ui/switch'
import type { PublicOrg } from '../org.server'
import { updateOrg } from '../org.functions'
import { type OrgSettings, orgSettingsSchema } from '../org.schema'
import { orgQuery } from '../org.queries'
import { AccentPicker } from './accent-picker'
import { OrgLogo } from './org-logo'
import { SettingsSection } from './settings-section'

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

export function OrgSettingsForm({ org }: { org: PublicOrg }) {
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
  const saved = save.isSuccess && !form.formState.isDirty

  return (
    <form onSubmit={form.handleSubmit((s) => save.mutate(s))} aria-label="Board settings" noValidate>
      <SettingsSection title="General">
        <Controller name="name" control={form.control} render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="org-name">Board name</FieldLabel>
            <Input {...field} id="org-name" maxLength={60} aria-invalid={fieldState.invalid} />
            <FieldError errors={[fieldState.error]} />
          </Field>
        )} />
        <Controller name="tagline" control={form.control} render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="org-tagline">Tagline</FieldLabel>
            <Input {...field} id="org-tagline" maxLength={160} placeholder="Tell us what to build next. We read every post." />
            <FieldDescription>Shown under the name on your public board.</FieldDescription>
          </Field>
        )} />
      </SettingsSection>

      <SettingsSection title="Branding" description="Your board shows your name, logo and colour instead of hearloop's.">
        <BrandPreview control={form.control} fallbackName={org.name} />
        <Controller name="accent" control={form.control} render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Accent colour</FieldLabel>
            <AccentPicker value={field.value} onChange={field.onChange} />
            {fieldState.error ? <FieldError errors={[fieldState.error]} /> : <FieldDescription>Used for the voted pill, active states and links.</FieldDescription>}
          </Field>
        )} />
        <Controller name="logoUrl" control={form.control} render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="org-logo">Logo URL</FieldLabel>
            <Input {...field} id="org-logo" type="url" placeholder="https://acme.com/logo.png" aria-invalid={fieldState.invalid} />
            {fieldState.error ? <FieldError errors={[fieldState.error]} /> : <FieldDescription>A square image over https. Leave empty to use your initial.</FieldDescription>}
          </Field>
        )} />
        <Controller name="theme" control={form.control} render={({ field }) => (
          <Field>
            <FieldLabel>Theme</FieldLabel>
            <RadioGroup value={field.value} onValueChange={field.onChange} aria-label="Theme" className="flex gap-6">
              {(['dark', 'light'] as const).map((t) => (
                <Field key={t} orientation="horizontal" className="w-auto">
                  <RadioGroupItem value={t} id={`theme-${t}`} />
                  <FieldLabel htmlFor={`theme-${t}`} className="font-normal capitalize">{t}</FieldLabel>
                </Field>
              ))}
            </RadioGroup>
          </Field>
        )} />
        <SwitchField control={form.control} name="poweredBy" label="Show “Powered by hearloop”" description="A small line in your board's footer." />
      </SettingsSection>

      <SettingsSection title="Access">
        <Controller name="whoCanPost" control={form.control} render={({ field }) => (
          <Field>
            <FieldLabel htmlFor="who-can-post">Who can post</FieldLabel>
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger id="who-can-post" className="w-full"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="anyone">Anyone, no account needed</SelectItem>
                <SelectItem value="signed_in">Only signed-in people</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        )} />
        <SwitchField control={form.control} name="showRoadmap" label="Public roadmap" />
        <SwitchField control={form.control} name="showChangelog" label="Public changelog" />
      </SettingsSection>

      <div className="sticky bottom-0 mt-8 flex items-center gap-3 border-t bg-background/90 py-4 backdrop-blur">
        {form.formState.errors.root && <FieldError role="alert">{form.formState.errors.root.message}</FieldError>}
        {saved && <span className="inline-flex items-center gap-1.5 text-[13px] text-status-shipped"><Check className="size-4" />Saved</span>}
        <Button type="submit" className="ml-auto" disabled={save.isPending}>{save.isPending ? 'Saving' : 'Save changes'}</Button>
      </div>
    </form>
  )
}

function SwitchField({ control, name, label, description }: {
  control: ReturnType<typeof useForm<OrgSettings>>['control']
  name: 'poweredBy' | 'showRoadmap' | 'showChangelog'
  label: string
  description?: string
}) {
  return (
    <Controller name={name} control={control} render={({ field }) => (
      <Field orientation="horizontal">
        <Switch id={name} checked={field.value} onCheckedChange={field.onChange} />
        <FieldContent>
          <FieldLabel htmlFor={name}>{label}</FieldLabel>
          {description && <FieldDescription>{description}</FieldDescription>}
        </FieldContent>
      </Field>
    )} />
  )
}

/** How the board header will look with the unsaved values. */
function BrandPreview({ control, fallbackName }: { control: ReturnType<typeof useForm<OrgSettings>>['control']; fallbackName: string }) {
  const [name, tagline, accent, logoUrl, theme] = useWatch({ control, name: ['name', 'tagline', 'accent', 'logoUrl', 'theme'] })
  return (
    <div className={theme} style={accent ? ({ '--brand': accent } as React.CSSProperties) : undefined}>
      <div className="flex items-center gap-4 rounded-xl border bg-card p-4 text-foreground">
        <OrgLogo name={name || fallbackName} logoUrl={logoUrl || null} className="size-9" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">{name || fallbackName}</p>
          <p className="truncate text-xs text-muted-foreground">{tagline || 'Preview'}</p>
        </div>
        <span className="flex h-12 w-10 flex-col items-center justify-center rounded-lg border border-brand bg-brand text-xs font-semibold text-white">
          <ChevronUp className="size-3.5" strokeWidth={2.5} />12
        </span>
      </div>
    </div>
  )
}
