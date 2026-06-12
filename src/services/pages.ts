import type { FetchOptions } from 'ofetch';
import { t3Fetch } from './api';
import type { T3Page } from "@/types";
import { buildPreviewQuery, type PreviewContext } from '@lib/preview';
import { cacheTypo3Fetch, buildCacheTags } from '../lib/cache';

const REVALIDATE_SECONDS = Number(process.env.NEXT_PUBLIC_REVALIDATE_SECONDS || 60);

function normalizePath(path: string): string {
  const normalized = `/${path || ''}`.replace(/\/+/g, '/');
  return normalized.length > 1 ? normalized.replace(/\/$/g, '') : '/';
}

function getFetchOptions(preview?: PreviewContext): FetchOptions<'json'> {
  if (preview?.enabled) {
    return {
      cache: 'no-store',
      query: buildPreviewQuery(preview),
    } as FetchOptions<'json'>;
  }

  return {
    next: { revalidate: REVALIDATE_SECONDS },
  } as FetchOptions<'json'>;
}

export async function getPageData(path = '/', preview?: PreviewContext): Promise<T3Page | null> {
  const normalizedPath = normalizePath(path);

  try {
    const fetchPage = () => t3Fetch<T3Page>(normalizedPath, getFetchOptions(preview));

    if (preview?.enabled) {
      return await fetchPage();
    }

    return await cacheTypo3Fetch(
      ['page', normalizedPath],
      fetchPage,
      buildCacheTags(normalizedPath),
      REVALIDATE_SECONDS
    );
  } catch (error: any) {
    if (error.statusCode === 404) {
      return null;
    }
    console.warn(`Failed to fetch page data for ${normalizedPath}:`, error);
    return null;
  }
}

export async function getPageBySlug(slug?: string[], preview?: PreviewContext): Promise<T3Page | null> {
  const path = !slug || slug.length === 0 ? '/' : `/${slug.join('/')}`;
  return getPageData(path, preview);
}

export async function getHomepageData(preview?: PreviewContext): Promise<T3Page | null> {
  return getPageData('/', preview);
}
