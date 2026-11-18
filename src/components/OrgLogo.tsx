import type { Org } from '#/lib/types'

export default function OrgLogo({ org, className = 'size-7' }: { org: Pick<Org, 'name' | 'logo_url'>; className?: string }) {
  if (org.logo_url) return <img src={org.logo_url} alt="" className={`${className} shrink-0 rounded-md object-cover`} />
  return (
    <span className={`${className} flex shrink-0 items-center justify-center rounded-md bg-link text-[13px] font-semibold text-white`} aria-hidden>
      {org.name.trim().charAt(0).toUpperCase() || '?'}
    </span>
  )
}
