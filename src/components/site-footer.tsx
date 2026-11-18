import { Link } from '@tanstack/react-router'
import { BrandMark } from './brand-mark'

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-14 md:flex-row md:px-8">
        <div className="max-w-xs">
          <div className="flex items-center gap-2.5 text-sm font-semibold">
            <BrandMark />
            hearloop
          </div>
          <p className="mt-3 text-[13px] leading-6 text-muted-foreground">
            The feedback board where requests get built by an agent and proven by Kane CLI before they ship.
          </p>
        </div>
        <nav className="flex gap-16 text-[13px] md:ml-auto">
          <FooterColumn title="Product">
            <Link to="/$org" params={{ org: 'demo' }} className="text-muted-foreground hover:text-foreground">Live demo</Link>
            <Link to="/login" search={{ mode: 'signup' }} className="text-muted-foreground hover:text-foreground">Create your board</Link>
            <a href="/#how" className="text-muted-foreground hover:text-foreground">How it works</a>
          </FooterColumn>
          <FooterColumn title="Built with">
            {['Claude Code', 'Kane CLI', 'Cloudflare Workers'].map((t) => (
              <span key={t} className="text-muted-foreground">{t}</span>
            ))}
          </FooterColumn>
        </nav>
      </div>
      <p className="mx-auto max-w-6xl px-4 pb-10 text-xs text-faint md:px-8">Built for the KaneCLI Online Hackathon, November 2026.</p>
    </footer>
  )
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="grid content-start gap-2.5">
      <p className="text-xs font-medium text-faint">{title}</p>
      {children}
    </div>
  )
}
