import { createFileRoute } from '@tanstack/react-router'
import { PartyPopper } from 'lucide-react'
import { Controller, useFormContext } from 'react-hook-form'
import { Alert, AlertDescription, AlertTitle } from '#/components/ui/alert'
import { FieldError } from '#/components/ui/field'
import { Input } from '#/components/ui/input'
import { PageHead, Row, SectionHead, fieldClass } from '#/features/dashboard/components/panel'
import { SettingsForm } from '#/features/orgs/components/settings-form'
import type { OrgSettings } from '#/features/orgs/org.schema'
import { useOrg } from '#/features/orgs/use-org'

export const Route = createFileRoute('/$org/dashboard/settings/')({ component: General })

function General() {
  const { org } = useOrg()
  const { welcome } = Route.useSearch()
  return (
    <>
      {welcome && (
        <Alert className="mb-7">
          <PartyPopper />
          <AlertTitle>{org.name} is live.</AlertTitle>
          <AlertDescription>Make it look like yours, share the board link, then give the loop a token so an agent can build and Kane can verify.</AlertDescription>
        </Alert>
      )}
      <PageHead title="General" sub="What visitors see at the top of your public board." />
      <SettingsForm key={org.slug} org={org} label="General settings">
        <SectionHead title="Board" />
        <Fields />
      </SettingsForm>
    </>
  )
}

function Fields() {
  const { control } = useFormContext<OrgSettings>()
  return (
    <>
      <Controller name="name" control={control} render={({ field, fieldState }) => (
        <Row label="Board name" help="Shown next to the logo and in the page title." htmlFor="org-name">
          <Input {...field} id="org-name" maxLength={60} aria-invalid={fieldState.invalid} className={fieldClass} />
          <FieldError errors={[fieldState.error]} />
        </Row>
      )} />
      <Controller name="tagline" control={control} render={({ field }) => (
        <Row label="Tagline" help="One line under the board name. Leave empty to hide." htmlFor="org-tagline">
          <Input {...field} id="org-tagline" maxLength={160} placeholder="Tell us what to build next." className={fieldClass} />
        </Row>
      )} />
    </>
  )
}
