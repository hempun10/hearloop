// white on black with the inset arrow square
export default function PrimaryButton({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`relative flex h-10 w-full items-center justify-center rounded-lg bg-fg text-[14px] font-semibold text-bg transition-colors duration-150 hover:bg-white active:translate-y-px active:bg-[#d4d4d8] disabled:opacity-50 ${props.className ?? ''}`}
    >
      {children}
      <span className="absolute right-1.5 flex size-7 items-center justify-center rounded-md bg-[#e4e4e7]" aria-hidden>
        <svg viewBox="0 0 12 12" className="size-3"><path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </span>
    </button>
  )
}
