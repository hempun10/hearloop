import { Link, useLocation } from '@tanstack/react-router'

const links = [
  { to: '/', label: 'Board' },
  { to: '/changelog', label: 'Changelog' },
] as const

export default function Header() {
  const { pathname } = useLocation()
  const current = pathname.startsWith('/changelog') ? '/changelog' : '/'
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-bg/90 backdrop-blur-[2px]">
      <div className="mx-auto flex h-14 max-w-[1072px] items-center gap-4 px-4 md:px-8">
        <Link to="/" className="flex items-center gap-2.5 text-[14px] font-semibold tracking-[-0.01em]">
          <Mark />
          hearloop
        </Link>
        <span className="h-4 w-px bg-line-strong" aria-hidden />
        <nav className="flex items-center gap-0.5">
          {links.map(({ to, label }) => {
            const active = current === to
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
      </div>
    </header>
  )
}

function Mark() {
  // a loop: feedback in, shipped out
  return (
    <svg viewBox="0 0 24 24" className="size-6" aria-hidden>
      <rect width="24" height="24" rx="6" fill="#ededf0" />
      <path d="M8 12a4 4 0 1 1 4 4" stroke="#0d0d0f" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <circle cx="9.5" cy="16" r="1.4" fill="#6e8bff" />
    </svg>
  )
}
