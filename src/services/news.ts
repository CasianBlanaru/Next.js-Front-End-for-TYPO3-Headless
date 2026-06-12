import { t3Fetch } from './api';
import type { T3NewsListResponse, T3NewsDetailResponse } from "@/types";

export async function getNewsList(path = '/news', options?: any): Promise<T3NewsListResponse> {
  return t3Fetch<T3NewsListResponse>(path, options);
}

export async function getNewsDetail(path: string, options?: any): Promise<T3NewsDetailResponse> {
  return t3Fetch<T3NewsDetailResponse>(path, options);
}
