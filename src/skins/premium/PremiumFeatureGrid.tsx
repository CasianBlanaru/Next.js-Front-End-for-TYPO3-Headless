import type { ReactNode } from 'react';

interface PremiumFeatureGridProps {
  children?: ReactNode;
  header?: string;
}

export default function PremiumFeatureGrid({ children, header }: PremiumFeatureGridProps) {
  return (
    <section className="premium-feature-grid space-y-8">
      {header ? <h2 className="text-2xl font-bold text-slate-900">{header}</h2> : null}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{children}</div>
    </section>
  );
}
