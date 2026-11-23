import { EyeOff } from 'lucide-react'
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@hearloop/ui/components/empty'

export function NotPublic({ what }: { what: 'roadmap' | 'changelog' }) {
  return (
    <Empty className="mx-auto mt-16 max-w-md">
      <EmptyHeader>
        <EmptyMedia variant="icon"><EyeOff /></EmptyMedia>
        <EmptyTitle>Not public</EmptyTitle>
        <EmptyDescription>This board's {what} isn't public.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
