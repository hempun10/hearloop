import type { ReactNode } from 'react'
import { FieldDescription, FieldGroup, FieldLegend, FieldSet } from '#/components/ui/field'

export function SettingsSection({ title, description, children }: { title: string; description?: string; children: ReactNode }) {
  return (
    <FieldSet className="mt-10 border-t pt-6">
      <FieldLegend>{title}</FieldLegend>
      {description && <FieldDescription>{description}</FieldDescription>}
      <FieldGroup>{children}</FieldGroup>
    </FieldSet>
  )
}
