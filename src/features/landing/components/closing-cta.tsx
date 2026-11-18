import { PrimaryCta } from './cta-link'

export function ClosingCta() {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-28 pb-24 md:px-8">
      <div className="border-beam relative overflow-hidden rounded-3xl border bg-card px-6 py-16 text-center">
        <div className="dot-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden />
        <div className="hero-glow pointer-events-none absolute inset-0" aria-hidden />
        <h2 className="relative text-3xl font-semibold sm:text-4xl">Your users have opinions.</h2>
        <p className="relative mt-3 text-[15px] text-muted-foreground">Give them a board. Watch their requests get built and proven.</p>
        <PrimaryCta className="relative mt-8" />
      </div>
    </section>
  )
}
