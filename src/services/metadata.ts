import type { Metadata } from 'next';
import { getSiteUrl } from './api';
import { normalizeFileUrl } from './media';
import type { T3Page } from '@/types';

function getCanonicalHref(pageData: T3Page | null, pathname: string): string {
  const SITE_URL = getSiteUrl();
  const canonical = pageData?.meta?.canonical;

  if (canonical && typeof canonical === 'object') {
    const href = 'href' in canonical ? canonical.href : undefined;
    const link = 'link' in canonical ? canonical.link : undefined;
    if (typeof href === 'string') return new URL(href, SITE_URL).toString();
    if (typeof link === 'string') return new URL(link, SITE_URL).toString();
  }

  return new URL(pathname, SITE_URL).toString();
}

export function getPageMetadata(pageData: T3Page | null, pathname: string): Metadata {
  const SITE_URL = getSiteUrl();
  const title = pageData?.meta?.title || pageData?.title || 'TYPO3 Headless Next.js';
  const description = pageData?.meta?.description || pageData?.meta?.subtitle || 'Standalone headless frontend for TYPO3.';
  const canonical = getCanonicalHref(pageData, pathname);
  const ogImage = normalizeFileUrl(pageData?.meta?.ogImage?.publicUrl);
  const twitterImage = normalizeFileUrl(pageData?.meta?.twitterImage?.publicUrl || pageData?.meta?.ogImage?.publicUrl);

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical,
    },
    robots: {
      index: !(pageData?.meta?.robots?.noIndex ?? false),
      follow: !(pageData?.meta?.robots?.noFollow ?? false),
    },
    openGraph: {
      title: pageData?.meta?.ogTitle || title,
      description: pageData?.meta?.ogDescription || description,
      url: canonical,
      siteName: 'TYPO3 Headless Next.js',
      type: 'website',
      images: ogImage
        ? [
            {
              url: ogImage,
              alt: pageData?.meta?.ogTitle || title,
            },
          ]
        : undefined,
    },
    twitter: {
      card:
        (pageData?.meta?.twitterCard as
          | 'summary'
          | 'summary_large_image'
          | 'player'
          | 'app') ?? 'summary_large_image',
      title: pageData?.meta?.twitterTitle || title,
      description: pageData?.meta?.twitterDescription || description,
      images: twitterImage ? [twitterImage] : undefined,
    },
  };
}
