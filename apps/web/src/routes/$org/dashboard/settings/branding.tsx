import { createFileRoute } from '@tanstack/react-router'
import { ChevronUp } from 'lucide-react'
import { Controller, useFormContext, useWatch } from 'react-hook-form'
import { FieldError } from '@hearloop/ui/components/field'
import { Input } from '@hearloop/ui/components/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@hearloop/ui/components/select'
import { Switch } from '@hearloop/ui/components/switch'
import { PageHead, Row, SectionHead, fieldClass } from '#/features/dashboard/components/panel'
import { AccentPicker } from '#/features/orgs/components/accent-picker'
import { OrgLogo } from '#/features/orgs/components/org-logo'
import { SettingsForm } from '#/features/orgs/components/settings-form'
import type { OrgSettings } from '#/features/orgs/org.schema'
import { useOrg } from '#/features/orgs/use-org'

export const Route = createFileRoute('/$org/dashboard/settings/branding')({ component: Branding })

function Branding() {
  const { org } = useOrg()
  return (
    <>
      <PageHead
        title="Branding"
        sub="How the public board looks to your users. The dashboard stays the same for everyone."
      />
      <SettingsForm key={org.slug} org={org} label="Branding settings">
        <Fields fallbackName={org.name} />
      </SettingsForm>
    </>
  )
}

function Fields({ fallbackName }: { fallbackName: string }) {
  const { control } = useFormContext<OrgSettings>()
  return (
    <>
      <SectionHead title="Appearance" />
      <Controller
        name="accent"
        control={control}
        render={({ field, fieldState }) => (
          <Row label="Accent" help="Voted pills, the active nav dot, links and focus rings on the public board.">
            <AccentPicker value={field.value} onChange={field.onChange} />
            <FieldError errors={[fieldState.error]} />
          </Row>
        )}
      />
      <Row label="Preview" help="Your board header with these settings.">
        <Preview fallbackName={fallbackName} />
      </Row>
      <Controller
        name="logoUrl"
        control={control}
        render={({ field, fieldState }) => (
          <Row label="Logo URL" help="A square image over https. Leave empty to use your initial." htmlFor="org-logo">
            <Input
              {...field}
              id="org-logo"
              type="url"
              placeholder="https://acme.com/logo.png"
              aria-invalid={fieldState.invalid}
              className={fieldClass}
            />
            <FieldError errors={[fieldState.error]} />
          </Row>
        )}
      />
      <Controller
        name="theme"
        control={control}
        render={({ field }) => (
          <Row label="Theme" help="Dark or light for every visitor." htmlFor="org-theme">
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger
                id="org-theme"
                size="sm"
                className="h-[30px] w-32 rounded-md border-input bg-card text-[13px] capitalize shadow-none"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent align="end">
                {(['dark', 'light'] as const).map((t) => (
                  <SelectItem key={t} value={t} className="capitalize">
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Row>
        )}
      />
      <SectionHead title="Footer" className="pt-7" />
      <Controller
        name="poweredBy"
        control={control}
        render={({ field }) => (
          <Row label="Powered by hearloop" help="A small credit in your board's footer." htmlFor="poweredBy">
            <Switch
              id="poweredBy"
              checked={field.value}
              onCheckedChange={field.onChange}
              className="data-[state=checked]:bg-brand"
            />
          </Row>
        )}
      />
    </>
  )
}

/** The board header with the unsaved values. */
function Preview({ fallbackName }: { fallbackName: string }) {
  const [name, tagline, accent, logoUrl, theme] = useWatch<OrgSettings>({
    name: ['name', 'tagline', 'accent', 'logoUrl', 'theme'],
  }) as [string, string, string, string, string]
  return (
    <div className={theme} style={accent ? ({ '--brand': accent } as React.CSSProperties) : undefined}>
      <div className="flex w-[280px] items-center gap-3 rounded-lg border bg-card p-3 text-foreground">
        <OrgLogo name={name || fallbackName} logoUrl={logoUrl || null} className="size-8" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] font-semibold">{name || fallbackName}</p>
          <p className="truncate text-xs text-muted-foreground">{tagline || 'Your tagline'}</p>
        </div>
        <span className="flex h-12 w-10 flex-col items-center justify-center rounded-lg border border-brand bg-brand text-xs font-semibold text-white">
          <ChevronUp className="size-3.5" strokeWidth={2.5} />
          12
        </span>
      </div>
    </div>
  )
}
