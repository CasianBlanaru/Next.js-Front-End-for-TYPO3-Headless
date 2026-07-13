import { usePathname } from 'next/navigation';
import { T3I18N } from "@/types";
import { useT3Options } from './useT3Options';

export const useT3i18n = () => {
  const pathname = usePathname() || '/';
  const { currentSiteOptions } = useT3Options();

  const getLocale = (path: string): string => {
    const segments = path.split('/');
    const localeFromPath = segments[1];
    if (currentSiteOptions.i18n.locales.includes(localeFromPath)) {
      return localeFromPath;
    }
    return currentSiteOptions.i18n.default;
  };

  const getCurrentLocaleData = (localeCode: string): T3I18N | null => {
    const mockLocaleData: T3I18N[] = [
      {
        languageId: 1,
        locale: 'de-DE',
        title: 'Deutsch',
        navigationTitle: 'Deutsch',
        twoLetterIsoCode: 'de',
        hreflang: 'de-DE',
        direction: 'ltr',
        flag: '🇩🇪',
        link: '/de',
        active: 1,
        current: 1,
        available: 1,
      },
      {
        languageId: 2,
        locale: 'en-US',
        title: 'English',
        navigationTitle: 'English',
        twoLetterIsoCode: 'en',
        hreflang: 'en-US',
        direction: 'ltr',
        flag: '🇺🇸',
        link: '/en',
        active: 1,
        current: 1,
        available: 1,
      },
      {
        languageId: 3,
        locale: 'pl-PL',
        title: 'Polski',
        navigationTitle: 'Polski',
        twoLetterIsoCode: 'pl',
        hreflang: 'pl-PL',
        direction: 'ltr',
        flag: '🇵🇱',
        link: '/pl',
        active: 1,
        current: 1,
        available: 1,
      },
    ];

    const locale = mockLocaleData.find((loc) => loc.twoLetterIsoCode === localeCode);
    return locale || null;
  };

  const currentLocale = getLocale(pathname);
  const currentLocaleData = getCurrentLocaleData(currentLocale);
  const locales = currentSiteOptions.i18n.locales;

  const getPathWithLocale = (path: string = ''): string => {
    if (currentLocale === currentSiteOptions.i18n.default) {
      return path;
    }
    return `/${currentLocale}${path}`;
  };

  return {
    currentLocale,
    getLocale,
    getCurrentLocaleData,
    getPathWithLocale,
    currentLocaleData,
    locales,
  };
};

