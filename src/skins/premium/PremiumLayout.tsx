import type { ReactNode } from 'react';

interface PremiumLayoutProps {
  children?: ReactNode;
  title?: string;
}

export default function PremiumLayout({ children, title }: PremiumLayoutProps) {
  return (
    <div className="premium-layout min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {title ? (
        <header className="border-b border-slate-200/80 bg-white/80 backdrop-blur">
          <div className="mx-auto max-w-6xl px-6 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-500">Premium</p>
            <h1 className="text-lg font-semibold text-slate-900">{title}</h1>
          </div>
        </header>
      ) : null}
      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
    </div>
  );
}
