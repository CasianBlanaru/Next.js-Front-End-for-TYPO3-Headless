import { siteConfig } from './config';
import { Typo3Page, Typo3ContentElement, Typo3File } from '../types/typo3';

const memCache = new Map<string, { ts: number; data: any }>();
const MEM_TTL = 30_000;

async function cachedFetch<T = any>(url: string, options?: RequestInit): Promise<T> {
  const now = Date.now();
  const hit = memCache.get(url);
  if (hit && now - hit.ts < MEM_TTL) return hit.data;

  const publicHost = process.env.NEXT_PUBLIC_TYPO3_BASE_URL
    ? new URL(process.env.NEXT_PUBLIC_TYPO3_BASE_URL).host
    : null;

  const extraHeaders: Record<string, string> = publicHost
    ? { Host: publicHost, 'X-Forwarded-Proto': 'https', 'X-Forwarded-Host': publicHost }
    : {};

  const headers = { ...options?.headers, ...extraHeaders };

  for (let attempt = 0; attempt < 3; attempt++) {
    if (attempt > 0) await new Promise((r) => setTimeout(r, attempt * 3000));

    const response = await fetch(url, { ...options, headers });

    if (response.status === 429) continue;

    if (!response.ok) {
      const text = await response.text().catch(() => '');
      throw new Error(`TYPO3 API ${response.status} for ${url}${text ? `: ${text.slice(0, 200)}` : ''}`);
    }

    const data = await response.json();
    memCache.set(url, { ts: Date.now(), data });
    return data;
  }

  throw new Error(`TYPO3 API 429 for ${url}: rate limited`);
}

function joinUrl(base: string, path: string = '/') {
  const cleanBase = String(base || '').replace(/\/$/, '');
  const cleanPath = path === '/' ? '/' : `/${String(path).replace(/^\/+/, '')}`;
  return `${cleanBase}${cleanPath}`;
}

function toQueryString(searchParams: Record<string, any> | null) {
  if (!searchParams) return '';

  const params = new URLSearchParams();
  Object.entries(searchParams).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (item !== undefined && item !== null) params.append(key, item);
      });
      return;
    }

    if (value !== undefined && value !== null) params.set(key, value);
  });

  const query = params.toString();
  return query ? `?${query}` : '';
}

export function normalizePath(slug: string | string[] | undefined): string {
  if (!slug || slug.length === 0) return '/';
  if (Array.isArray(slug)) return `/${slug.join('/')}`;
  return String(slug).startsWith('/') ? String(slug) : `/${slug}`;
}

export function normalizeMediaUrl(value: string | undefined): string {
  if (!value) return '';
  if (value.startsWith('data:') || value.startsWith('blob:')) return value;

  // If it's already an absolute URL, return as-is
  try {
    new URL(value);
    return value;
  } catch {
    // Relative path - prepend TYPO3 base URL
    const typo3Origin = siteConfig.typo3BaseUrl.replace(/\/$/, '');
    const path = value.startsWith('/') ? value : `/${value}`;
    return `${typo3Origin}${path}`;
  }
}

export function getBestImageUrl(file: Typo3File | undefined): string {
  return (
    file?.cropVariants?.default?.publicUrl ||
    file?.publicUrl ||
    file?.properties?.originalUrl ||
    file?.properties?.publicUrl ||
    ''
  );
}

export async function fetchPageData<T = any>(path: string = '/', searchParams: Record<string, any> | null = null, cookie: string | null = null): Promise<T> {
  const apiBase = siteConfig.typo3BaseUrl.replace(/\/$/, '');

  // Strip search params that trigger cHash validation in TYPO3
  const cleanSearchParams = searchParams ? { ...searchParams } : {};
  if (cleanSearchParams) {
    delete cleanSearchParams.q;
    delete cleanSearchParams.collections;
    delete cleanSearchParams.page;
    delete cleanSearchParams.per_page;
    // Remove type if set externally — typeNum 0 is the headless page content endpoint
    delete cleanSearchParams.type;
  }

  const query = toQueryString(cleanSearchParams);
  const url = `${joinUrl(apiBase, path)}${query}`;
  
  const hasCookie = cookie && cookie.length > 0;

  if (hasCookie) {
    const publicHost = process.env.NEXT_PUBLIC_TYPO3_BASE_URL
      ? new URL(process.env.NEXT_PUBLIC_TYPO3_BASE_URL).host
      : null;
    const extraHeaders: Record<string, string> = publicHost
      ? { Host: publicHost, 'X-Forwarded-Proto': 'https', 'X-Forwarded-Host': publicHost }
      : {};
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    try {
      const response = await fetch(url, {
        headers: { Accept: 'application/json', Cookie: cookie as string, ...extraHeaders },
        cache: 'no-store',
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      if (!response.ok) {
        const text = await response.text().catch(() => '');
        throw new Error(`TYPO3 API ${response.status} for ${url}${text ? `: ${text.slice(0, 200)}` : ''}`);
      }
      return response.json();
    } catch (error: any) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') throw new Error(`TYPO3 API timeout after 10s for ${url}`);
      throw error;
    }
  }

  return cachedFetch<T>(url, {
    headers: { Accept: 'application/json' },
    next: { revalidate: 60 },
  });
}

export async function fetchInitialData<T = any>(cookie: string | null = null): Promise<T | null> {
  const apiBase = siteConfig.typo3BaseUrl.replace(/\/$/, '');
  const url = `${apiBase}/?type=834`;
  const hasCookie = cookie && cookie.length > 0;
  try {
    return await cachedFetch<T>(url, {
      headers: { Accept: 'application/json', ...(hasCookie ? { Cookie: cookie as string } : {}) },
      ...(hasCookie ? { cache: 'no-store' } : { next: { revalidate: 60 } }),
    });
  } catch (error: any) {
    console.error('fetchInitialData error:', error.message);
    return null;
  }
}

export function normalizeContentColumns(content: any): Record<string, Typo3ContentElement[]> {
  if (typeof content === 'string') {
    const html = content.trim();
    return html
      ? {
          '0': [
            {
              id: 'html-content',
              type: 'html',
              content: { bodytext: html, html },
            },
          ],
        }
      : {};
  }

  if (Array.isArray(content)) {
    return { '0': content as Typo3ContentElement[] };
  }

  if (!content || typeof content !== 'object') return {};

  return Object.entries(content).reduce((columns: Record<string, Typo3ContentElement[]>, [colPos, value]: [string, any]) => {
    const normalizedColPos = String(colPos).replace(/^colPos/i, '') || '0';

    if (Array.isArray(value)) {
      columns[normalizedColPos] = value as Typo3ContentElement[];
      return columns;
    }

    if (Array.isArray(value?.elements)) {
      columns[normalizedColPos] = value.elements as Typo3ContentElement[];
      return columns;
    }

    if (Array.isArray(value?.content)) {
      columns[normalizedColPos] = value.content as Typo3ContentElement[];
      return columns;
    }

    if (value && typeof value === 'object' && (value.type || value.CType || value.id || value.uid)) {
      columns[normalizedColPos] = [value as Typo3ContentElement];
      return columns;
    }

    if (typeof value === 'string' && value.trim()) {
      columns[normalizedColPos] = [
        {
          id: `html-content-${normalizedColPos}`,
          type: 'html',
          content: { bodytext: value, html: value },
        },
      ];
      return columns;
    }

    columns[normalizedColPos] = [];
    return columns;
  }, {});
}

export function normalizePageData(page: any): Typo3Page {
  if (!page || typeof page !== 'object') return page;
  const content =
    page.content ??
    page.contents ??
    page.data?.content ??
    page.page?.content ??
    page.initialData?.content ??
    page.props?.page?.content ??
    {};

  return {
    ...page,
    content: normalizeContentColumns(content),
  };
}

export function flattenContent(content: any): Typo3ContentElement[] {
  return Object.entries(normalizeContentColumns(content))
    .sort(([a], [b]) => a.localeCompare(b))
    .flatMap(([colPos, elements]) =>
      elements.map((element, index) => ({ ...element, __colPos: colPos, __index: index }))
    );
}
