import type { ReactNode } from 'react';

interface PremiumNewsListProps {
  children?: ReactNode;
  header?: string;
}

export default function PremiumNewsList({ children, header }: PremiumNewsListProps) {
  return (
    <section className="premium-news-list space-y-6">
      {header ? <h2 className="text-2xl font-bold text-slate-900">{header}</h2> : null}
      <div className="grid gap-5 md:grid-cols-2">{children}</div>
    </section>
  );
}
