import { Link, createFileRoute, useRouteContext } from '@tanstack/react-router'
import StatusPill from '#/components/StatusPill'
import { landing } from '#/lib/fns'

export const Route = createFileRoute('/')({
  loader: () => landing({ data: 'demo' }),
  component: Landing,
})

const Check = ({ ok = true }: { ok?: boolean }) => (
  <svg viewBox="0 0 16 16" className={`mt-0.5 size-4 shrink-0 ${ok ? 'text-shipped' : 'text-planned'}`} aria-hidden>
    <circle cx="8" cy="8" r="7" fill="currentColor" opacity=".15" />
    <path d={ok ? 'M5 8.2 7 10l4-4.2' : 'M5.5 5.5l5 5m0-5-5 5'} stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

function Landing() {
  const { stats, top, run, shipped } = Route.useLoaderData()
  const { me } = useRouteContext({ from: '__root__' })
  const home = me?.orgs[0]?.slug
  const primary = home ? { to: `/${home}`, label: 'Go to your board' } : me ? { to: '/new', label: 'Create your board' } : { to: '/login?mode=signup', label: 'Create your board' }
  // Kane's own words from the latest passing run; the summary is "Objective…\nKane: passed…\nstep\nstep…"
  const kaneSteps = run ? run.summary.split('\n').slice(2).filter(Boolean).slice(0, 4) : []

  return (
    <main className="overflow-x-clip">
      {/* hero */}
      <section className="relative">
        <div className="dot-grid pointer-events-none absolute inset-0" aria-hidden />
        <div className="hero-glow pointer-events-none absolute inset-x-0 top-0 h-[480px]" aria-hidden />
        <div className="relative mx-auto max-w-[1072px] px-4 pt-20 text-center md:px-8 md:pt-28">
          <Link to="/$org/changelog" params={{ org: 'demo' }} className="type-in inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface/80 py-1 pr-3 pl-1.5 text-[12px] text-muted hover:text-fg">
            <span className="rounded-full bg-link/15 px-2 py-0.5 font-medium text-link">New</span>
            Every shipped item is verified with Kane CLI
            <span aria-hidden>→</span>
          </Link>
          <h1 className="type-in mx-auto mt-6 max-w-3xl text-[44px] leading-[1.05] font-semibold sm:text-[64px]" style={{ animationDelay: '80ms' }}>
            Feedback that ships itself.
            <span className="block text-muted">Proven before it's announced.</span>
          </h1>
          <p className="type-in mx-auto mt-6 max-w-xl text-[16px] leading-7 text-muted" style={{ animationDelay: '160ms' }}>
            Users post and vote. A coding agent builds the top request. Kane CLI tests it in a real browser.
            Only a passing run reaches the changelog.
          </p>
          <div className="type-in mt-8 flex flex-wrap justify-center gap-3" style={{ animationDelay: '240ms' }}>
            <a href={primary.to} className="inline-flex h-11 items-center gap-2 rounded-lg bg-fg px-5 text-[14px] font-semibold text-bg transition-colors hover:bg-white active:translate-y-px">
              {primary.label} <span aria-hidden>→</span>
            </a>
            <Link to="/$org" params={{ org: 'demo' }} className="inline-flex h-11 items-center rounded-lg border border-line-strong bg-raised px-5 text-[14px] font-semibold shadow-[inset_0_1px_0_rgb(255_255_255/0.06)] transition-colors hover:bg-hover active:translate-y-px">
              Try the live demo
            </Link>
          </div>

          <LoopTerminal run={run} />
        </div>
      </section>

      {/* stats */}
      <section className="mx-auto mt-20 max-w-[1072px] px-4 md:px-8">
        <dl className="grid grid-cols-2 divide-line border-y border-line md:grid-cols-4 md:divide-x">
          {[
            ['Requests', stats.posts],
            ['Votes', stats.votes],
            ['Kane runs', stats.runs],
            ['Shipped', stats.shipped],
          ].map(([label, n]) => (
            <div key={label} className="px-6 py-8 text-center">
              <dd className="m-0 text-[36px] font-semibold tracking-[-0.02em] tabular-nums">{n}</dd>
              <dt className="mt-1 text-[13px] text-muted">{label}</dt>
            </div>
          ))}
        </dl>
      </section>

      {/* bento */}
      <section id="how" className="mx-auto max-w-[1072px] scroll-mt-20 px-4 pt-28 md:px-8">
        <SectionHead kicker="How it works" title="One loop, no hand-offs." sub="From a vote to a verified release without anyone copying a ticket into a sprint." />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          <Tile className="md:col-span-2" n="01" title="Users ask" text="A public board with votes. The most wanted request rises to the top on its own.">
            <ol className="m-0 grid list-none gap-2 p-0">
              {(top.length ? top : [{ id: 0, title: 'Your first request goes here', votes: 0, status: 'open' as const }]).map((p, i) => (
                <li key={p.id} className="flex items-center gap-3 rounded-lg border border-line bg-bg/60 px-3 py-2.5 text-[13px]">
                  <span className="text-[11px] text-faint tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                  <span className="min-w-0 flex-1 truncate font-medium">{p.title}</span>
                  {p.status !== 'open' && <StatusPill status={p.status} />}
                  <span className="flex h-8 w-9 flex-col items-center justify-center rounded-md border border-line bg-surface text-[11px] font-semibold tabular-nums">▲<span className="-mt-0.5">{p.votes}</span></span>
                </li>
              ))}
            </ol>
          </Tile>
          <Tile n="02" title="An agent builds it" text="Claude Code picks up the top request, implements it and writes the browser test that should prove it.">
            <pre className="m-0 overflow-hidden rounded-lg border border-line bg-bg/60 p-3 font-mono text-[11px] leading-5 text-muted">
              <span className="text-faint">$ bun run loop</span>{'\n'}
              <span className="text-shipped">+</span> {'<input type="search"'}{'\n'}
              <span className="text-shipped">+</span> {'  aria-label="Search requests"'}{'\n'}
              <span className="text-shipped">+</span> {'  onChange={…} />'}{'\n'}
              <span className="text-faint">wrote .hearloop/kane-objective.txt</span>
            </pre>
          </Tile>
          <Tile n="03" title="Kane proves it" text="Kane CLI drives a real browser through the test. A failure goes straight back to the agent.">
            <ul className="m-0 grid list-none gap-2 p-0 text-[12px] leading-5 text-muted">
              {(kaneSteps.length ? kaneSteps : ['Opened the board', 'Typed in the search box', 'Checked only matching requests stay', 'Cleared the box, all requests came back']).map((s) => (
                <li key={s} className="flex gap-2"><Check /><span className="line-clamp-2">{s}</span></li>
              ))}
            </ul>
          </Tile>
          <Tile className="md:col-span-2" n="04" title="Everyone hears" text="The post moves to shipped and a changelog entry, written by the agent, goes live. Voters see their idea land.">
            {shipped[0] ? (
              <div className="rounded-lg border border-line bg-bg/60 p-4">
                <p className="m-0 text-[11px] text-faint">Changelog · {new Date(shipped[0].created_at * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                <p className="mt-1 mb-0 text-[14px] font-semibold">{shipped[0].title}</p>
                <p className="mt-1 mb-0 line-clamp-2 text-[13px] leading-5 text-muted">{shipped[0].body}</p>
                <span className="mt-3 inline-flex items-center gap-1.5 rounded-md bg-shipped/10 px-2 py-0.5 text-[11px] font-medium"><span className="size-1.5 rounded-full bg-shipped" />Verified with Kane CLI</span>
              </div>
            ) : (
              <p className="m-0 rounded-lg border border-line bg-bg/60 p-4 text-[13px] text-muted">The first passing run lands here.</p>
            )}
          </Tile>
        </div>
      </section>

      {/* steps */}
      <section className="mx-auto max-w-[1072px] px-4 pt-28 md:px-8">
        <SectionHead kicker="The rule" title="Nothing ships unverified." sub="Kane's verdict is the only thing that can move a post to shipped." />
        <ol className="mt-12 grid list-none gap-px overflow-hidden rounded-2xl border border-line bg-line p-0 md:grid-cols-4">
          {[
            ['Post', 'Someone asks for a change and others vote it up.'],
            ['Build', 'The loop hands the top request to the coding agent.'],
            ['Prove', 'Kane CLI runs the agent’s test in a real browser.'],
            ['Ship', 'Pass: shipped and announced. Fail: back to the agent with Kane’s report.'],
          ].map(([t, d], i) => (
            <li key={t} className="bg-bg p-6">
              <span className="text-[12px] text-faint tabular-nums">{String(i + 1).padStart(2, '0')}</span>
              <p className="mt-6 mb-0 text-[16px] font-semibold">{t}</p>
              <p className="mt-2 mb-0 text-[13px] leading-6 text-muted">{d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* shipped marquee */}
      {shipped.length > 0 && (
        <section className="pt-24" aria-label="Recently shipped">
          <p className="mb-5 text-center text-[12px] text-faint">Recently shipped, each one verified with Kane CLI</p>
          <div className="marquee overflow-hidden">
            <div className="flex w-max gap-3">
              {Array.from({ length: Math.max(2, Math.ceil(8 / shipped.length)) * 2 }, () => shipped).flat().map((e, i) => (
                <Link key={i} to="/$org/posts/$id" params={{ org: 'demo', id: String(e.post_id) }} aria-hidden={i >= shipped.length || undefined} tabIndex={i >= shipped.length ? -1 : undefined}
                  className="flex shrink-0 items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-[13px] text-muted hover:text-fg">
                  <span className="size-1.5 rounded-full bg-shipped" />{e.title}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* faq */}
      <section className="mx-auto max-w-[720px] px-4 pt-28">
        <SectionHead kicker="FAQ" title="Plainly answered." />
        <div className="mt-10 border-t border-line">
          {[
            ['What is hearloop?', 'A feedback board: users post requests and vote. The difference is what happens next. The top request is built by a coding agent and tested by Kane CLI before it is marked shipped.'],
            ['What does Kane CLI do here?', 'Kane is the gate. It runs a plain-English test in a real browser against the live app and returns pass or fail with a step-by-step report. That report is attached to the post, so anyone can read how a feature was proven.'],
            ['What happens when Kane fails?', 'The post goes back to planned and Kane’s report is handed to the agent as the reason. The agent fixes the problem and Kane runs again, up to three attempts.'],
            ['Which agent builds the features?', 'Claude Code, run headless by the loop script. The loop only needs a CLI agent that can edit files, so another agent can take its place.'],
            ['Can a person still review the work?', 'Yes. Every shipped change is a normal git commit, and every Kane run is listed on its post with the full report.'],
          ].map(([q, a]) => (
            <details key={q} className="group border-b border-line">
              <summary className="flex cursor-pointer list-none items-center justify-between py-5 text-[15px] font-medium">
                {q}
                <span className="faq-plus text-[18px] text-faint transition-transform duration-200" aria-hidden>+</span>
              </summary>
              <p className="mt-0 mb-5 text-[14px] leading-7 text-muted">{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* cta */}
      <section className="mx-auto max-w-[1072px] px-4 pt-28 pb-24 md:px-8">
        <div className="border-beam relative overflow-hidden rounded-3xl border border-line bg-surface px-6 py-16 text-center">
          <div className="dot-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden />
          <div className="hero-glow pointer-events-none absolute inset-0" aria-hidden />
          <h2 className="relative m-0 text-[32px] font-semibold sm:text-[40px]">Your users have opinions.</h2>
          <p className="relative mt-3 text-[15px] text-muted">Give them a board. Watch their requests get built and proven.</p>
          <a href={primary.to} className="relative mt-8 inline-flex h-11 items-center gap-2 rounded-lg bg-fg px-5 text-[14px] font-semibold text-bg hover:bg-white">
            {primary.label} <span aria-hidden>→</span>
          </a>
        </div>
      </section>
    </main>
  )
}

function SectionHead({ kicker, title, sub }: { kicker: string; title: string; sub?: string }) {
  return (
    <div className="text-center">
      <p className="m-0 text-[13px] font-medium text-link">{kicker}</p>
      <h2 className="mt-3 mb-0 text-[32px] font-semibold sm:text-[40px]">{title}</h2>
      {sub && <p className="mx-auto mt-3 mb-0 max-w-lg text-[15px] leading-7 text-muted">{sub}</p>}
    </div>
  )
}

function Tile({ n, title, text, children, className = '' }: { n: string; title: string; text: string; children: React.ReactNode; className?: string }) {
  return (
    <article className={`flex flex-col gap-5 rounded-2xl border border-line bg-surface p-6 transition-colors duration-200 hover:border-line-strong ${className}`}>
      <div>
        <p className="m-0 text-[12px] text-faint tabular-nums">{n}</p>
        <h3 className="mt-2 mb-0 text-[17px] font-semibold">{title}</h3>
        <p className="mt-1.5 mb-0 text-[13px] leading-6 text-muted">{text}</p>
      </div>
      <div className="mt-auto">{children}</div>
    </article>
  )
}

// The real loop, replayed: the latest passing Kane run, or the shape of one.
function LoopTerminal({ run }: { run: { title: string; summary: string } | null }) {
  const steps = run ? run.summary.split('\n').slice(2).filter(Boolean).slice(0, 3) : ['Opened the board and found the new control', 'Exercised it the way the request described', 'Checked the result on the page']
  const lines: [string, string][] = [
    ['text-faint', '$ bun run loop'],
    ['text-fg', `▶ ${run?.title ?? 'Top request'}`],
    ['text-muted', '  agent building… done, build passed'],
    ['text-muted', '  Kane verifying in a real browser'],
    ...steps.map((s): [string, string] => ['text-muted', `    · ${s}`]),
    ['text-shipped', '  ✓ passed. Shipped and announced.'],
  ]
  return (
    <div className="border-beam mx-auto mt-16 max-w-3xl rounded-2xl border border-line bg-surface/90 text-left shadow-[0_30px_80px_-20px_rgb(0_0_0/0.6)]">
      <div className="flex items-center gap-1.5 border-b border-line px-4 py-3">
        <span className="size-2.5 rounded-full bg-line-strong" /><span className="size-2.5 rounded-full bg-line-strong" /><span className="size-2.5 rounded-full bg-line-strong" />
        <span className="ml-3 font-mono text-[11px] text-faint">hearloop-v2 — loop</span>
      </div>
      <pre className="m-0 overflow-x-auto p-5 font-mono text-[12px] leading-6 whitespace-pre-wrap">
        {lines.map(([cls, t], i) => (
          <span key={i} className={`type-in block ${cls}`} style={{ animationDelay: `${400 + i * 350}ms` }}>{t}</span>
        ))}
      </pre>
    </div>
  )
}
