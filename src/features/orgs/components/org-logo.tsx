import { Avatar, AvatarFallback, AvatarImage } from '#/components/ui/avatar'
import { initial } from '#/components/user-menu'
import { cn } from '#/lib/utils'

export function OrgLogo({ name, logoUrl, className }: { name: string; logoUrl?: string | null; className?: string }) {
  return (
    <Avatar className={cn('size-7 rounded-md', className)}>
      {logoUrl && <AvatarImage src={logoUrl} alt="" className="object-cover" />}
      <AvatarFallback className="rounded-md bg-brand text-[13px] font-semibold text-white">{initial(name)}</AvatarFallback>
    </Avatar>
  )
}
