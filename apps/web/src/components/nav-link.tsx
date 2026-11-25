import { Link, type LinkProps } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import { cn } from '@hearloop/ui/lib/utils'

/** Header link with an accent dot when active. Used by the site and board headers. */
export function NavLink({ children, className, ...props }: LinkProps & { children: ReactNode; className?: string }) {
  return (
    <Link
      {...props}
      className={cn(
        'group inline-flex h-8 items-center gap-[7px] rounded-md px-2.5 text-[13px] font-medium text-faint transition-colors hover:bg-accent/60 hover:text-muted-foreground data-[status=active]:text-foreground',
        className,
      )}
    >
      <span
        className="size-[5px] rounded-full bg-transparent group-hover:bg-input group-data-[status=active]:bg-brand"
        aria-hidden
      />
      {children}
    </Link>
  )
}
