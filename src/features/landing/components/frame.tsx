import type { ReactNode } from 'react'
import { cn } from '#/lib/utils'

// The magicui agent-template framing: an outer column with two inner rails,
// framed sections with striped gutters, a hairline between every section.

export function Page({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('relative mx-auto max-w-7xl md:border-x', className)}>
      <div aria-hidden className="absolute top-0 left-6 z-10 hidden h-full w-px border-l md:block" />
      <div aria-hidden className="absolute top-0 right-6 z-10 hidden h-full w-px border-r md:block" />
      {children}
    </div>
  )
}

function Stripes({ side }: { side: 'left' | 'right' }) {
  return (
    <div aria-hidden className={cn(
      'absolute top-0 hidden h-full w-14 bg-[size:10px_10px] text-foreground/5 [background-image:repeating-linear-gradient(315deg,currentColor_0_1px,#0000_0_50%)] md:block',
      side === 'left' ? '-left-14' : '-right-14',
    )} />
  )
}

export function Framed({ id, children, className }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={cn('relative flex w-full scroll-mt-20 flex-col items-center justify-center px-0 md:px-10', className)}>
      <div className="relative w-full border-x md:mx-10">
        <Stripes side="left" />
        <Stripes side="right" />
        {children}
      </div>
    </section>
  )
}

export function SectionHeader({ title, sub, className }: { title: ReactNode; sub?: ReactNode; className?: string }) {
  return (
    <div className={cn('w-full border-b p-6 md:p-14', className)}>
      <div className="mx-auto flex max-w-xl flex-col items-center justify-center gap-2 text-center">
        <h2 className="text-3xl font-medium tracking-tighter text-balance md:text-4xl">{title}</h2>
        {sub ? <p className="font-medium text-balance text-muted-foreground">{sub}</p> : null}
      </div>
    </div>
  )
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('text-[13px] font-medium text-brand', className)}>{children}</div>
}
