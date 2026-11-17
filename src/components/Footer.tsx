export default function Footer() {
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

export function Kbd({ children }: { children: React.ReactNode }) {
  return <kbd className="rounded border border-line-strong bg-raised px-1.5 py-px font-mono text-[11px] text-muted">{children}</kbd>
}
