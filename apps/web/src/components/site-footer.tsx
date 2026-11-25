import { Link } from '@tanstack/react-router'
import { DEMO_ORG } from '#/features/landing/landing.functions'
import { BrandMark } from '@hearloop/ui/components/brand-mark'
import { DOCS_URL } from '#/lib/site'

const item = 'text-[15px]/snug text-muted-foreground hover:text-foreground'

export function SiteFooter() {
  return (
    <footer className="w-full border-t">
      <div className="flex flex-col gap-y-8 p-6 md:flex-row md:items-center md:justify-between md:p-10">
        <div className="flex max-w-xs flex-col items-start gap-y-5">
          <Link to="/" className="flex items-center gap-2.5 text-xl font-semibold">
            <BrandMark className="size-[30px]" />
            hearloop
          </Link>
          <p className="font-medium tracking-tight text-muted-foreground">
            The feedback board where requests are built by an agent and proven by Kane CLI before they ship.
          </p>
          <p className="text-xs text-muted-foreground">Built for the KaneCLI Online Hackathon · November 2026</p>
        </div>
        <div className="md:w-1/2">
          <div className="flex flex-col gap-y-6 md:flex-row md:justify-between lg:pl-10">
            <Column title="Product">
              <Link to="/$org" params={{ org: DEMO_ORG }} className={item}>
                Live demo
              </Link>
              <a href="/#how" className={item}>
                How it works
              </a>
              <a href="/#faq" className={item}>
                FAQ
              </a>
              <a href={DOCS_URL} className={item}>
                Docs
              </a>
            </Column>
            <Column title="Account">
              <Link to="/login" className={item}>
                Sign in
              </Link>
              <Link to="/login" search={{ mode: 'signup' }} className={item}>
                Create your board
              </Link>
            </Column>
            <Column title="Built with">
              {['Claude Code', 'Kane CLI', 'Cloudflare Workers'].map((t) => (
                <span key={t} className={item}>
                  {t}
                </span>
              ))}
            </Column>
          </div>
        </div>
      </div>
      <div className="relative z-0 mt-16 h-40 w-full md:h-56">
        <div className="absolute inset-0 z-10 bg-linear-to-t from-transparent from-40% to-background" />
        <div
          aria-hidden
          className="absolute inset-0 mx-6 bg-[size:14px_14px] text-foreground/10 [background-image:radial-gradient(currentColor_1px,transparent_1px)]"
        />
      </div>
    </footer>
  )
}

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-2">
      <p className="mb-2 text-sm font-semibold">{title}</p>
      {children}
    </div>
  )
}
