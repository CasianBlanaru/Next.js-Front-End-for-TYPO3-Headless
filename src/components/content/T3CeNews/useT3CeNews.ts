import type { T3NewsDetailResponse, T3NewsListResponse } from '@/types';
import { getNewsList, getNewsDetail } from '@services/news';

export async function fetchT3NewsList(path = '/news'): Promise<T3NewsListResponse> {
  return getNewsList(path, { next: { revalidate: 60 } as any });
}

export async function fetchT3NewsDetail(path: string): Promise<T3NewsDetailResponse> {
  return getNewsDetail(path, { next: { revalidate: 60 } as any });
}
