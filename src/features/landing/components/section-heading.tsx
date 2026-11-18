export function SectionHeading({ kicker, title, description }: { kicker: string; title: string; description?: string }) {
  return (
    <div className="text-center">
      <p className="text-[13px] font-medium text-brand">{kicker}</p>
      <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">{title}</h2>
      {description && <p className="mx-auto mt-3 max-w-lg text-[15px] leading-7 text-muted-foreground">{description}</p>}
    </div>
  )
}
