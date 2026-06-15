interface PremiumHeroProps {
  header?: string;
  subheader?: string;
  bodytext?: string;
}

export default function PremiumHero({ header, subheader, bodytext }: PremiumHeroProps) {
  return (
    <section className="premium-hero relative overflow-hidden rounded-3xl bg-slate-950 px-8 py-16 text-white shadow-2xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,146,60,0.35),transparent_55%)]" />
      <div className="relative max-w-3xl space-y-4">
        {subheader ? (
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-300">{subheader}</p>
        ) : null}
        {header ? <h2 className="text-4xl font-bold tracking-tight md:text-5xl">{header}</h2> : null}
        {bodytext ? (
          <p className="text-lg leading-relaxed text-slate-300" dangerouslySetInnerHTML={{ __html: bodytext }} />
        ) : null}
      </div>
    </section>
  );
}
