import { t3SiteOptions } from '@pixelcoda/headless-nextjs';

const apiBase = (process.env.NEXT_PUBLIC_TYPO3_BASE_URL || 'https://web-production-581b4.up.railway.app').replace(/\/$/, '');

Object.assign(t3SiteOptions, {
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://nextjs-front-end-for-typo3-headless-production.up.railway.app',
  api: {
    baseUrl: apiBase,
    credentials: 'include',
    proxyReqHeaders: ['cookie'],
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
});
