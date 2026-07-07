import { siteConfig } from './config';

const memCache = new Map();
const MEM_TTL = 30_000;

async function cachedFetch(url, options) {
  const now = Date.now();
  const hit = memCache.get(url);
  if (hit && now - hit.ts < MEM_TTL) return hit.data;

  for (let attempt = 0; attempt < 3; attempt++) {
    if (attempt > 0) await new Promise((r) => setTimeout(r, attempt * 3000));

    const response = await fetch(url, options);

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

function joinUrl(base, path = '/') {
  const cleanBase = String(base || '').replace(/\/$/, '');
  const cleanPath = path === '/' ? '/' : `/${String(path).replace(/^\/+/, '')}`;
  return `${cleanBase}${cleanPath}`;
}

function toQueryString(searchParams) {
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

export function normalizePath(slug) {
  if (!slug || slug.length === 0) return '/';
  if (Array.isArray(slug)) return `/${slug.join('/')}`;
  return String(slug).startsWith('/') ? String(slug) : `/${slug}`;
}

export function normalizeMediaUrl(value) {
  if (!value) return '';
  if (value.startsWith('data:') || value.startsWith('blob:')) return value;

  // If it's already an absolute URL, return as-is
  try {
    const url = new URL(value);
    return value;
  } catch {
    // Relative path - prepend TYPO3 base URL
    const typo3Origin = siteConfig.typo3BaseUrl.replace(/\/$/, '');
    const path = value.startsWith('/') ? value : `/${value}`;
    return `${typo3Origin}${path}`;
  }
}

export function getBestImageUrl(file) {
  return (
    file?.cropVariants?.default?.publicUrl ||
    file?.publicUrl ||
    file?.properties?.originalUrl ||
    file?.properties?.publicUrl ||
    ''
  );
}

export async function fetchPageData(path = '/', searchParams = null, cookie = null) {
  const apiBase = siteConfig.typo3BaseUrl.replace(/\/$/, '');

  // Strip search params that trigger cHash validation in TYPO3
  const cleanSearchParams = { ...searchParams };
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
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    try {
      const response = await fetch(url, {
        headers: { Accept: 'application/json', Cookie: cookie },
        cache: 'no-store',
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      if (!response.ok) {
        const text = await response.text().catch(() => '');
        throw new Error(`TYPO3 API ${response.status} for ${url}${text ? `: ${text.slice(0, 200)}` : ''}`);
      }
      return response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') throw new Error(`TYPO3 API timeout after 10s for ${url}`);
      throw error;
    }
  }

  return cachedFetch(url, {
    headers: { Accept: 'application/json' },
    next: { revalidate: 60 },
  });
}

export async function fetchInitialData(cookie = null) {
  const apiBase = siteConfig.typo3BaseUrl.replace(/\/$/, '');
  const url = `${apiBase}/?type=834`;
  const hasCookie = cookie && cookie.length > 0;
  try {
    return await cachedFetch(url, {
      headers: { Accept: 'application/json', ...(hasCookie ? { Cookie: cookie } : {}) },
      ...(hasCookie ? { cache: 'no-store' } : { next: { revalidate: 60 } }),
    });
  } catch (error) {
    console.error('fetchInitialData error:', error.message);
    return null;
  }
}

export function normalizeContentColumns(content) {
  if (typeof content === 'string') {
    const html = content.trim();
    return html
      ? {
          html: [
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
    return { '0': content };
  }

  if (!content || typeof content !== 'object') return {};

  return Object.entries(content).reduce((columns, [colPos, value]) => {
    const normalizedColPos = String(colPos).replace(/^colPos/i, '') || '0';

    if (Array.isArray(value)) {
      columns[normalizedColPos] = value;
      return columns;
    }

    if (Array.isArray(value?.elements)) {
      columns[normalizedColPos] = value.elements;
      return columns;
    }

    if (Array.isArray(value?.content)) {
      columns[normalizedColPos] = value.content;
      return columns;
    }

    if (value && typeof value === 'object' && (value.type || value.CType || value.id || value.uid)) {
      columns[normalizedColPos] = [value];
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

export function normalizePageData(page) {
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

export function flattenContent(content) {
  return Object.entries(normalizeContentColumns(content))
    .sort(([a], [b]) => a.localeCompare(b))
    .flatMap(([colPos, elements]) =>
      elements.map((element, index) => ({ ...element, __colPos: colPos, __index: index }))
    );
}
