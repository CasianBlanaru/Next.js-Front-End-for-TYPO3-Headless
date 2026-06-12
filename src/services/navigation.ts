import { t3Fetch } from './api';

export interface SitemapRoute {
  path: string;
  lastmod?: string;
  priority?: number;
}

interface SitemapPayload {
  pages?: SitemapRoute[];
}

function normalizeSitemapPayload(payload: unknown): SitemapRoute[] {
  if (Array.isArray(payload)) {
    return payload.filter((route): route is SitemapRoute => {
      return typeof route === 'object' && route !== null && typeof (route as SitemapRoute).path === 'string';
    });
  }

  if (
    typeof payload === 'object' &&
    payload !== null &&
    Array.isArray((payload as SitemapPayload).pages)
  ) {
    return (payload as SitemapPayload).pages!.filter((route): route is SitemapRoute => {
      return typeof route === 'object' && route !== null && typeof route.path === 'string';
    });
  }

  return [{ path: '/' }];
}

export async function getSitemapRoutes(): Promise<SitemapRoute[]> {
  const sitemapEndpoint = process.env.NEXT_PUBLIC_API_SITEMAP_ENDPOINT || '/sitemap';

  try {
    const payload = await t3Fetch<unknown>(sitemapEndpoint, { cache: 'no-store' });
    const routes = normalizeSitemapPayload(payload);

    return routes.length > 0 ? routes : [{ path: '/' }];
  } catch (error) {
    console.warn('Sitemap failed:', error);
    return [{ path: '/' }];
  }
}

export async function getNavigation(path: string = '/navigation') {
  return t3Fetch(path);
}
