import { Link } from '@tanstack/react-router'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--header-bg)] px-4 backdrop-blur-lg">
      <nav className="page-wrap flex items-center gap-4 py-3">
        <Link to="/" className="flex items-center gap-2 font-semibold text-[var(--sea-ink)] no-underline">
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--lagoon)]" />
          hearloop
        </Link>
        <Link to="/" className="nav-link" activeProps={{ className: 'nav-link is-active' }} activeOptions={{ exact: true }}>
          Board
        </Link>
        <Link to="/changelog" className="nav-link" activeProps={{ className: 'nav-link is-active' }}>
          Changelog
        </Link>
      </nav>
    </header>
  )
}
