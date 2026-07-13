import type { T3File } from '../T3File';
import type { T3CeBaseProps } from './T3CeBase';

export interface T3NewsCategory {
  id?: number;
  uid?: number;
  title: string;
  slug?: string;
}

export interface T3NewsItem {
  id?: number;
  uid?: number;
  pid?: number;
  title: string;
  slug?: string;
  pathSegment?: string;
  teaser?: string;
  bodytext?: string;
  datetime?: string | number;
  archive?: string | number;
  author?: string;
  authorEmail?: string;
  categories?: T3NewsCategory[];
  media?: T3File[];
  falMedia?: T3File[];
  images?: T3File[];
  url?: string;
  link?: string;
  detailUrl?: string;
}

export interface T3NewsPagination {
  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
  itemsPerPage?: number;
  nextPage?: string | null;
  previousPage?: string | null;
}

export interface T3NewsListResponse {
  items?: T3NewsItem[];
  news?: T3NewsItem[];
  data?: T3NewsItem[];
  pagination?: T3NewsPagination;
}

export interface T3NewsDetailResponse {
  item?: T3NewsItem;
  news?: T3NewsItem;
  data?: T3NewsItem;
}

export interface T3CeNewsProps extends T3CeBaseProps {
  news?: T3NewsItem[] | T3NewsListResponse | T3NewsDetailResponse;
  items?: T3NewsItem[];
  list?: T3NewsItem[];
  detail?: T3NewsItem;
  pagination?: T3NewsPagination;
  settings?: Record<string, unknown>;
}
