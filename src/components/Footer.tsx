import { Link, useLocation } from '@tanstack/react-router'
import { Mark } from './Header'

export default function Footer() {
  const { pathname } = useLocation()
  if (pathname === '/') return <SiteFooter />
  return (
    <footer className="mx-auto mt-24 flex max-w-[1008px] flex-wrap items-center justify-center gap-x-5 gap-y-2 px-4 pb-12 text-[12px] text-faint">
      <span><Kbd>j</Kbd> <Kbd>k</Kbd> move</span>
      <span><Kbd>v</Kbd> vote</span>
      <span><Kbd>enter</Kbd> open</span>
      <span><Kbd>c</Kbd> new post</span>
      <span className="text-muted">Every shipped item passed Kane CLI</span>
    </footer>
  )
}

function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[1072px] flex-col gap-10 px-4 py-14 md:flex-row md:px-8">
        <div className="max-w-xs">
          <div className="flex items-center gap-2.5 text-[14px] font-semibold"><Mark />hearloop</div>
          <p className="mt-3 text-[13px] leading-6 text-muted">The feedback board where requests get built by an agent and proven by Kane CLI before they ship.</p>
        </div>
        <nav className="flex gap-16 text-[13px] md:ml-auto">
          <div className="grid content-start gap-2.5">
            <p className="m-0 text-[12px] font-medium text-faint">Product</p>
            <Link to="/board" className="text-muted hover:text-fg">Board</Link>
            <Link to="/changelog" className="text-muted hover:text-fg">Changelog</Link>
            <a href="#how" className="text-muted hover:text-fg">How it works</a>
          </div>
          <div className="grid content-start gap-2.5">
            <p className="m-0 text-[12px] font-medium text-faint">Built with</p>
            <span className="text-muted">Claude Code</span>
            <span className="text-muted">Kane CLI</span>
            <span className="text-muted">Cloudflare Workers</span>
          </div>
        </nav>
      </div>
      <p className="mx-auto max-w-[1072px] px-4 pb-10 text-[12px] text-faint md:px-8">Built for the KaneCLI Online Hackathon, November 2026.</p>
    </footer>
  )
}

export function Kbd({ children }: { children: React.ReactNode }) {
  return <kbd className="rounded border border-line-strong bg-raised px-1.5 py-px font-mono text-[11px] text-muted">{children}</kbd>
}
