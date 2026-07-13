import { notFound } from 'next/navigation';
import PageContent from '@components/layout/PageContent';
import PreviewBanner from '@components/layout/PreviewBanner';
import { getHomepageData } from '@services/pages';
import { getPageMetadata } from '@services/metadata';
import { createPreviewContext } from '@lib/preview';

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export const revalidate = 60;

export async function generateMetadata({ searchParams }: PageProps) {
  const preview = createPreviewContext(await searchParams);
  const pageData = await getHomepageData(preview);
  return getPageMetadata(pageData, '/');
}

export default async function HomePage({ searchParams }: PageProps) {
  const preview = createPreviewContext(await searchParams);
  const pageData = await getHomepageData(preview);

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
