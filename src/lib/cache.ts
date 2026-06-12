import { unstable_cache, revalidatePath, revalidateTag } from 'next/cache';

const DEFAULT_REVALIDATE_SECONDS = Number(process.env.NEXT_PUBLIC_REVALIDATE_SECONDS || 60);

export function getRevalidateSeconds(value = DEFAULT_REVALIDATE_SECONDS): number {
  if (!Number.isFinite(value) || value < 0) {
    return DEFAULT_REVALIDATE_SECONDS;
  }

  return value;
}

export function buildCacheTags(path: string): string[] {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const safePath = normalizedPath === '/' ? 'home' : normalizedPath.replace(/^\/+|\/+$/g, '').replace(/[^a-zA-Z0-9_-]+/g, '-');

  return ['typo3', `typo3:path:${safePath}`];
}

export function cacheTypo3Fetch<T>(keyParts: string[], fetcher: () => Promise<T>, tags: string[], revalidate = DEFAULT_REVALIDATE_SECONDS): Promise<T> {
  return unstable_cache(fetcher, ['typo3-headless', ...keyParts], {
    tags,
    revalidate: getRevalidateSeconds(revalidate),
  })();
}

export function revalidateTypo3Path(path: string): void {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  revalidatePath(normalizedPath === '//' ? '/' : normalizedPath);

  for (const tag of buildCacheTags(normalizedPath)) {
    revalidateTag(tag, {});
  }
}

export function getPublicCacheControl(revalidate = DEFAULT_REVALIDATE_SECONDS): string {
  const seconds = getRevalidateSeconds(revalidate);
  return `public, s-maxage=${seconds}, stale-while-revalidate=${seconds * 4}`;
}

export const NO_STORE_CACHE_CONTROL = 'no-store, no-cache, must-revalidate, proxy-revalidate';
