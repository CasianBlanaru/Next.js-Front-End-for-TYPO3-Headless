import Link from 'next/link';
import type { T3CeNewsProps, T3NewsItem, T3NewsListResponse } from '@/types';
import { normalizeFileUrl } from '@services/media';

function toItems(news?: T3CeNewsProps['news'], items?: T3NewsItem[], list?: T3NewsItem[]): T3NewsItem[] {
  if (Array.isArray(items)) return items;
  if (Array.isArray(list)) return list;
  if (Array.isArray(news)) return news;

  const payload = news as T3NewsListResponse | undefined;
  return payload?.items || payload?.news || payload?.data || [];
}

function getDate(item: T3NewsItem): string | null {
  if (!item.datetime) return null;
  const date = typeof item.datetime === 'number' ? new Date(item.datetime * 1000) : new Date(item.datetime);
  return Number.isNaN(date.getTime()) ? null : date.toLocaleDateString();
}

function getHref(item: T3NewsItem): string {
  return item.detailUrl || item.link || item.url || (item.slug ? `/news/${item.slug}` : '#');
}

export default function T3CeNewsList(props: T3CeNewsProps) {
  const items = toItems(props.news, props.items, props.list);

  if (!items.length) {
    return null;
  }

  return (
    <section className="t3-ce-news-list space-y-6" aria-label={props.header || 'News'}>
      {props.header ? <h2 className="text-2xl font-semibold text-slate-900">{props.header}</h2> : null}
      <div className="grid gap-6 md:grid-cols-2">
        {items.map((item) => {
          const image = item.media?.[0] || item.falMedia?.[0] || item.images?.[0];
          const date = getDate(item);

          return (
            <article key={item.uid || item.id || item.slug || item.title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              {image?.publicUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={normalizeFileUrl(image.publicUrl)} alt={image.properties?.alternative || image.title || ''} className="mb-4 aspect-video w-full rounded object-cover" />
              ) : null}
              {date ? <time className="text-sm text-slate-500">{date}</time> : null}
              <h3 className="mt-2 text-xl font-semibold text-slate-900">
                <Link href={getHref(item)} className="hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {item.title}
                </Link>
              </h3>
              {item.teaser ? <p className="mt-3 text-slate-700">{item.teaser}</p> : null}
            </article>
          );
        })}
      </div>
    </section>
  );
}
