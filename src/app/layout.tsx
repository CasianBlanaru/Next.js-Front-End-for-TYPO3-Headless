import type { ReactNode } from 'react';
import '@styles/globals.css';
import ServiceWorkerRegistration from '@components/layout/ServiceWorkerRegistration';
import SkipToContent from '@components/layout/SkipToContent';
import { getSiteUrl } from '@services/api';

export const metadata = {
  title: 'TYPO3 Headless Next.js Frontend',
  description: 'Standalone headless frontend for TYPO3 using Next.js App Router.',
  metadataBase: getSiteUrl() ? new URL(getSiteUrl()) : undefined,
  icons: {
    icon: '/icons/icon.svg',
    apple: '/icons/icon.svg',
  },
  manifest: '/manifest.webmanifest',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        <SkipToContent />
        {children}
        <ServiceWorkerRegistration />
      </body>
    </html>
  );
}
