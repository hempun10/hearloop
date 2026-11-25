import { createFileRoute } from '@tanstack/react-router'
import { Controller, useFormContext } from 'react-hook-form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@hearloop/ui/components/select'
import { Switch } from '@hearloop/ui/components/switch'
import { PageHead, Row, SectionHead } from '#/features/dashboard/components/panel'
import { SettingsForm } from '#/features/orgs/components/settings-form'
import type { OrgSettings } from '#/features/orgs/org.schema'
import { useOrg } from '#/features/orgs/use-org'

export const Route = createFileRoute('/$org/dashboard/settings/access')({ component: Access })

function Access() {
  const { org } = useOrg()
  return (
    <>
      <PageHead title="Access" sub="Who can do what on the public board." />
      <SettingsForm key={org.slug} org={org} label="Access settings">
        <Fields />
      </SettingsForm>
    </>
  )
}

const TOGGLES = [
  ['showRoadmap', 'Public roadmap', 'Hide it if you do not want to promise an order.'],
  ['showChangelog', 'Public changelog', 'Hide it until you have shipped something.'],
] as const

function Fields() {
  const { control } = useFormContext<OrgSettings>()
  return (
    <>
      <SectionHead title="Posting" />
      <Controller
        name="whoCanPost"
        control={control}
        render={({ field }) => (
          <Row label="Who can post" help="Anyone can vote. Choose who can add new requests." htmlFor="who-can-post">
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger
                id="who-can-post"
                size="sm"
                className="h-[30px] rounded-md border-input bg-card text-[13px] shadow-none"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent align="end">
                <SelectItem value="anyone">Anyone, no account needed</SelectItem>
                <SelectItem value="signed_in">Only signed-in people</SelectItem>
              </SelectContent>
            </Select>
          </Row>
        )}
      />
      <SectionHead title="Public tabs" className="pt-7" />
      {TOGGLES.map(([name, label, help]) => (
        <Controller
          key={name}
          name={name}
          control={control}
          render={({ field }) => (
            <Row label={label} help={help} htmlFor={name}>
              <Switch
                id={name}
                checked={field.value}
                onCheckedChange={field.onChange}
                className="data-[state=checked]:bg-brand"
              />
            </Row>
          )}
        />
      ))}
    </>
  )
}
