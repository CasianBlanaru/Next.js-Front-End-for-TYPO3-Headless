interface PremiumCTAProps {
  header?: string;
  bodytext?: string;
  link?: string;
  linkText?: string;
}

export default function PremiumCTA({ header, bodytext, link, linkText }: PremiumCTAProps) {
  return (
    <section className="premium-cta rounded-2xl border border-orange-200 bg-orange-50 px-8 py-10 text-center">
      {header ? <h2 className="text-2xl font-bold text-slate-900">{header}</h2> : null}
      {bodytext ? <p className="mt-3 text-slate-600">{bodytext}</p> : null}
      {link ? (
        <a
          href={link}
          className="mt-6 inline-flex rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          {linkText ?? 'Learn more'}
        </a>
      ) : null}
    </section>
  );
}
