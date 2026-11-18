import { Link, useLocation } from '@tanstack/react-router'

const links = [
  { to: '/board', label: 'Board' },
  { to: '/changelog', label: 'Changelog' },
] as const

export default function Header() {
  const { pathname } = useLocation()
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[1072px] items-center gap-4 px-4 md:px-8">
        <Link to="/" className="flex items-center gap-2.5 text-[14px] font-semibold tracking-[-0.01em]">
          <Mark />
          hearloop
        </Link>
        <span className="h-4 w-px bg-line-strong" aria-hidden />
        <nav className="flex items-center gap-0.5">
          {pathname === '/' && <a href="#how" className="hidden h-8 items-center rounded-md px-2.5 text-[13px] font-medium text-faint hover:bg-hover/60 hover:text-muted sm:inline-flex">How it works</a>}
          {links.map(({ to, label }) => {
            const active = pathname.startsWith(to) || (to === '/board' && pathname.startsWith('/posts'))
            return (
              <Link
                key={to}
                to={to}
                aria-current={active ? 'page' : undefined}
                className={`group inline-flex h-8 items-center gap-[7px] rounded-md px-2.5 text-[13px] font-medium transition-colors duration-150 hover:bg-hover/60 ${active ? 'text-fg' : 'text-faint hover:text-muted'}`}
              >
                <span className={`size-[5px] rounded-full ${active ? 'bg-link' : 'bg-transparent group-hover:bg-line-strong'}`} />
                {label}
              </Link>
            )
          })}
        </nav>
        <Link to="/board" className="ml-auto inline-flex h-8 items-center rounded-md bg-fg px-3 text-[13px] font-semibold text-bg transition-colors hover:bg-white">
          Post a request
        </Link>
      </div>
    </header>
  )
}

export function Mark({ className = 'size-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <rect width="24" height="24" rx="6" fill="#ededf0" />
      <path d="M8 12a4 4 0 1 1 4 4" stroke="#0d0d0f" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <circle cx="9.5" cy="16" r="1.4" fill="#6e8bff" />
    </svg>
  )
}
