import { X } from 'lucide-react'
import { useState } from 'react'
import { Badge } from '@hearloop/ui/components/badge'
import { Input } from '@hearloop/ui/components/input'
import { useSetTags } from '../use-post-mutations'

export function TagList({ tags }: { tags: string[] }) {
  if (!tags.length) return null
  return (
    <ul aria-label="Tags" className="flex flex-wrap gap-1.5">
      {tags.map((t) => <li key={t}><Badge variant="secondary">{t}</Badge></li>)}
    </ul>
  )
}

/** Members add a tag by typing it and pressing Enter, and remove one with its x. */
export function TagEditor({ org, id, tags }: { org: string; id: number; tags: string[] }) {
  const save = useSetTags(org, id)
  const [draft, setDraft] = useState('')
  return (
    <div className="grid gap-2">
      {tags.length > 0 && (
        <ul aria-label="Tags" className="flex flex-wrap gap-1.5">
          {tags.map((t) => (
            <li key={t}>
              <Badge variant="secondary" className="gap-1 pr-1">
                {t}
                <button type="button" aria-label={`Remove tag ${t}`} className="rounded-sm hover:text-foreground"
                  onClick={() => save.mutate(tags.filter((x) => x !== t))}><X className="size-3" /></button>
              </Badge>
            </li>
          ))}
        </ul>
      )}
      <Input value={draft} onChange={(e) => setDraft(e.target.value)} maxLength={32} placeholder="Add a tag" aria-label="Add a tag" className="h-8 text-[13px]"
        onKeyDown={(e) => {
          if (e.key !== 'Enter' || !draft.trim()) return
          e.preventDefault()
          save.mutate([...tags, draft], { onSuccess: () => setDraft('') })
        }} />
    </div>
  )
}
