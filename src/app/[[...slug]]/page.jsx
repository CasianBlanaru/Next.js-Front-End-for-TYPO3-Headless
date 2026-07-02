import { cookies } from 'next/headers';
import { HeadlessDevTools } from '@pixelcoda/headless-nextjs';
import { fetchPageData, fetchInitialData, normalizePageData, normalizePath } from '../../lib/typo3';
import Renderer from '../../components/Renderer';
import DevTools from '../../components/DevTools';
import FrontendEditor from '../../components/FrontendEditor';

export async function generateMetadata({ params, searchParams }) {
  try {
    const resolved = await params;
    const resolvedSearchParams = await searchParams;
    const path = normalizePath(resolved?.slug);
    const cookieStore = await cookies();
    const page = normalizePageData(await fetchPageData(path, resolvedSearchParams, cookieStore.toString()));
    return {
      title: page?.seo?.title || page?.meta?.title || page?.title || 'TYPO3 Headless',
      description: page?.meta?.description || page?.meta?.abstract || '',
    };
  } catch {
    return { title: 'TYPO3 Headless', description: '' };
  }
}

export default async function Page({ params, searchParams }) {
  let page = null;
  let error = null;
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
              <p>{error.message}</p>
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
