import { createFetch, type FetchOptions, type FetchContext, type FetchResponse } from 'ofetch';
import { joinURL, cleanDoubleSlashes } from 'ufo';
import { defu } from 'defu';
import type { T3Site } from "@types";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL || '';
const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_SITE_URL || '';
const defaultLocale = process.env.DEFAULT_LOCALE || 'en';
const locales = (process.env.LOCALES || defaultLocale)
  .split(',')
  .map((locale) => locale.trim())
  .filter(Boolean);

export const t3SiteOptions: T3Site = {
  baseUrl: siteUrl,
  locale: defaultLocale,
  api: {
    baseUrl: apiBaseUrl,
    headers: {
      Accept: 'application/json',
    },
    credentials: 'same-origin',
    proxyHeaders: false,
    allowQuery: true,
    endpoints: {
      initialData: process.env.NEXT_PUBLIC_INITIAL_DATA_ENDPOINT || '/?type=834',
    },
  },
  i18n: {
    default: defaultLocale,
    locales,
  },
};

const _$fetch = createFetch({
  defaults: {
    headers: t3SiteOptions.api.headers as any,
    credentials: t3SiteOptions.api.credentials,
    retry: false,
  },
});

export function filterQuery(path: string): string {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }
  const normalizedPath = path === '/' ? '' : path.replace(/^\/+/, '');
  return joinURL(t3SiteOptions.api.baseUrl, normalizedPath);
}

export async function t3Fetch<T>(path: string, options?: FetchOptions<'json'>): Promise<T> {
  const url = filterQuery(path);
  
  const mergedOptions = defu(
    options,
    {
      onResponse: (context: FetchContext & { response: FetchResponse<'json'> }) => {
        // Handle headers proxying if needed
      },
    },
    {
      headers: t3SiteOptions.api.headers as any,
      credentials: t3SiteOptions.api.credentials,
    }
  ) as FetchOptions<'json'>;

  try {
    return await _$fetch<T>(url, mergedOptions);
  } catch (error: any) {
    console.error(`[T3 API Error] ${url}:`, error.message);
    throw error;
  }
}

export function getT3ApiBaseUrl(): string {
  return apiBaseUrl;
}

export function getSiteUrl(): string {
  return siteUrl;
}
