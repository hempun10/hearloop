import { PrimaryCta } from './cta'

export function Closing() {
  return (
    <section className="w-full">
      <div className="relative h-[400px] w-full overflow-hidden rounded-xl border bg-card shadow-xl">
        <div aria-hidden className="absolute inset-0 [background:radial-gradient(60%_80%_at_50%_0%,color-mix(in_oklch,var(--brand)_28%,transparent),transparent_70%)]" />
        <div className="absolute inset-0 -top-24 flex flex-col items-center justify-center md:-top-40">
          <h2 className="max-w-xs text-center text-3xl font-medium tracking-tighter text-balance md:max-w-xl md:text-7xl">Your users have opinions.</h2>
          <div className="absolute bottom-10 flex flex-col items-center gap-3">
            <PrimaryCta />
            <span className="text-sm text-muted-foreground">Your board is live in under a minute.</span>
          </div>
        </div>
      </div>
    </section>
  )
}
