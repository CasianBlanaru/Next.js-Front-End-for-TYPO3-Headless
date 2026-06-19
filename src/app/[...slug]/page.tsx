import { notFound } from 'next/navigation';
import PageContent from '@components/layout/PageContent';
import PreviewBanner from '@components/layout/PreviewBanner';
import { getPageBySlug } from '@services/pages';
import { getPageMetadata } from '@services/metadata';
import { createPreviewContext } from '@lib/preview';

type PageProps = {
  params: Promise<{ slug?: string[] }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export const revalidate = 60;

export async function generateMetadata({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  const preview = createPreviewContext(await searchParams);
  const pageData = await getPageBySlug(resolvedParams.slug, preview);
  return getPageMetadata(pageData, `/${resolvedParams.slug?.join('/') ?? ''}`);
}

export default async function DynamicPage({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  const preview = createPreviewContext(await searchParams);
  const pageData = await getPageBySlug(resolvedParams.slug, preview);

  if (!pageData) {
    notFound();
  }

  return (
    <>
      <PageContent pageData={pageData} />
      {preview.enabled ? <PreviewBanner /> : null}
    </>
  );
}
