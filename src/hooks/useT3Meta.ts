import { useMemo } from 'react';
import { T3Page, T3Meta } from "@/types";
import { useT3Options } from './useT3Options';
import { useT3i18n } from './useT3i18n';

interface HeadData {
  title: string;
  meta: Array<{
    name?: string;
    property?: string;
    content: string;
  }>;
  link: Array<{
    rel: string;
    hreflang?: string;
    href: string;
  }>;
  htmlAttrs: {
    lang: string;
    dir: string;
  };
  bodyAttrs: {
    className: string;
  };
}

export const useT3Meta = (pageData: T3Page | null): { headData: HeadData } => {
  const { getCurrentLocaleData, currentLocale } = useT3i18n();
  const currentLocaleData = getCurrentLocaleData(currentLocale);
  const { currentSiteOptions } = useT3Options();

  // Verwende entweder eine Typumwandlung oder einen Standardwert
  const headData: HeadData = useMemo(() => {
    const metaData = (pageData?.meta || {}) as T3Meta;
    const meta = [];

    meta.push({ name: 'generator', content: 'TYPO3 CMS x T3Headless' });
    meta.push({ name: 'description', content: metaData.description || '' });
    meta.push({
      name: 'robots',
      content: metaData.robots
        ? `${metaData.robots.noIndex ? 'noindex' : ''} ${metaData.robots.noFollow ? 'nofollow' : ''}`
        : '',
    });

    // Open Graph Tags
    if (metaData.ogTitle) {
      meta.push({ property: 'og:title', content: metaData.ogTitle });
    }
    if (metaData.ogDescription) {
      meta.push({ property: 'og:description', content: metaData.ogDescription });
    }
    meta.push({ property: 'og:type', content: 'website' });
    if (metaData.ogImage?.publicUrl) {
      meta.push({ property: 'og:image', content: metaData.ogImage.publicUrl });
    }

    // Twitter Tags
    if (metaData.twitterTitle) {
      meta.push({ name: 'twitter:title', content: metaData.twitterTitle });
    }
    if (metaData.twitterDescription) {
      meta.push({ name: 'twitter:description', content: metaData.twitterDescription });
    }
    if (metaData.twitterImage?.publicUrl) {
      meta.push({ name: 'twitter:image', content: metaData.twitterImage.publicUrl });
    }
    meta.push({ name: 'twitter:card', content: metaData.twitterCard || 'summary' });

    const link = [];
    if (metaData.canonical?.href) {
      link.push({ rel: 'canonical', href: metaData.canonical.href });
    }

    const htmlAttrs = {
      lang: currentLocaleData?.twoLetterIsoCode || 'en',
      dir: currentLocaleData?.direction || 'ltr',
    };

    return {
      title: metaData.title || '',
      meta,
      link,
      htmlAttrs,
      bodyAttrs: {
        className: `layout-${pageData?.appearance?.layout || 'default'}`,
      },
    };
  }, [currentLocaleData, pageData]);

  return {
    headData,
  };
};
