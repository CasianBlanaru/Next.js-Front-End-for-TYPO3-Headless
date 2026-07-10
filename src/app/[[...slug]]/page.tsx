import React from 'react';
import { cookies } from 'next/headers';
import { fetchPageData, normalizePageData, normalizePath } from '../../lib/typo3';
import Renderer from '../../components/Renderer';
import DevTools from '../../components/DevTools';
import FrontendEditor from '../../components/FrontendEditor';
import { Metadata, ResolvingMetadata } from 'next';
import { siteConfig } from '../../lib/config';

type Props = {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const resolved = await params;
    const resolvedSearchParams = await searchParams;
    const path = normalizePath(resolved?.slug);
    const cookieStore = await cookies();
    const page = normalizePageData(await fetchPageData(path, resolvedSearchParams, cookieStore.toString()));

    const title = page?.seo?.title || page?.meta?.title || page?.title || 'TYPO3 Headless';
    const description = page?.meta?.description || page?.meta?.abstract || '';
    const baseUrl = siteConfig.baseUrl.replace(/\/$/, '');
    const canonical = `${baseUrl}${path === '/' ? '' : path}`;

    return {
      title,
      description,
      alternates: {
        canonical,
      },
      openGraph: {
        title,
        description,
        url: canonical,
        siteName: 'PixelCoda TYPO3 Headless',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
      },
    };
  } catch {
    return { title: 'TYPO3 Headless', description: '' };
  }
}

export default async function Page({ params, searchParams }: Props) {
  let page: any = null;
  let error: any = null;
  const resolved = await params;
  const resolvedSearchParams = await searchParams;
  const path = normalizePath(resolved?.slug);

  try {
    const cookieStore = await cookies();
    page = normalizePageData(await fetchPageData(path, resolvedSearchParams, cookieStore.toString()));
  } catch (e) {
    error = e;
    console.error('TYPO3 API Error:', e);
  }

  const pageTitle = page?.seo?.title || page?.meta?.title || page?.title || 'TYPO3 Headless';

  return (
    <>
      <main>
        <section className="hero">
          <div>
            <p className="eyebrow">PixelCoda Headless</p>
            <h1>{pageTitle}</h1>
          </div>
        </section>
        <section className="content-shell">
          {error ? (
            <div className="error-box">
              <h2>TYPO3 API Error</h2>
              <p>{error instanceof Error ? error.message : String(error)}</p>
            </div>
          ) : (
            <Renderer page={page} />
          )}
        </section>
      </main>
      <DevTools page={page || { error: error?.message, path }} />
      <FrontendEditor />
    </>
  );
}
