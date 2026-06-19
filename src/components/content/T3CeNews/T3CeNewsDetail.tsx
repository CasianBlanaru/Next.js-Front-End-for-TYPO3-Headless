import type { T3CeNewsProps, T3NewsDetailResponse, T3NewsItem } from '@/types';
import { normalizeFileUrl } from '@services/media';

function toDetail(props: T3CeNewsProps): T3NewsItem | null {
  if (props.detail) return props.detail;

  const payload = props.news as T3NewsDetailResponse | T3NewsItem | undefined;
  if (!payload) return null;

  if ('title' in payload) return payload;
  return payload.item || payload.news || payload.data || null;
}

function getDate(item: T3NewsItem): string | null {
  if (!item.datetime) return null;
  const date = typeof item.datetime === 'number' ? new Date(item.datetime * 1000) : new Date(item.datetime);
  return Number.isNaN(date.getTime()) ? null : date.toLocaleDateString();
}

export default function T3CeNewsDetail(props: T3CeNewsProps) {
  const item = toDetail(props);

  if (!item) {
    return null;
  }

  const image = item.media?.[0] || item.falMedia?.[0] || item.images?.[0];
  const date = getDate(item);

  return (
    <article className="t3-ce-news-detail mx-auto max-w-3xl space-y-6">
      <header className="space-y-3">
        {date ? <time className="text-sm text-slate-500">{date}</time> : null}
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">{item.title}</h1>
        {item.teaser ? <p className="text-lg leading-8 text-slate-700">{item.teaser}</p> : null}
      </header>
      {image?.publicUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={normalizeFileUrl(image.publicUrl)} alt={image.properties?.alternative || image.title || ''} className="w-full rounded-lg object-cover" />
      ) : null}
      {item.bodytext ? <div className="prose prose-slate max-w-none" dangerouslySetInnerHTML={{ __html: item.bodytext }} /> : null}
    </article>
  );
}
