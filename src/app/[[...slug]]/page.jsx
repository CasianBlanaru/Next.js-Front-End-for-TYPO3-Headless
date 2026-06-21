import { cookies } from 'next/headers';
import Renderer, { rendererComponents } from '../../components/Renderer';
import { fetchPageData, normalizePageData, normalizePath } from '../../lib/typo3';
import DevTools from '../../components/DevTools';

export async function generateMetadata({ params, searchParams }) {
  try {
    const resolved = await params;
    const resolvedSearchParams = await searchParams;
    const path = normalizePath(resolved?.slug);
    
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();
    
    const page = normalizePageData(await fetchPageData(path, resolvedSearchParams, cookieHeader));
    return {
      title: page?.meta?.title || page?.title || 'TYPO3 Headless',
      description: page?.meta?.description || page?.meta?.abstract || '',
    };
  } catch {
    return {
      title: 'TYPO3 Headless',
      description: 'Next.js frontend for TYPO3 Headless',
    };
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
    const cookieHeader = cookieStore.toString();
    page = normalizePageData(await fetchPageData(path, resolvedSearchParams, cookieHeader));
  } catch (exception) {
    error = exception;
  }

  return (
    <main>
      <section className="hero">
        <div>
          <p className="eyebrow">PixelCoda Headless Next.js</p>
          <h1>{page?.meta?.title || page?.title || 'TYPO3 Headless Frontend'}</h1>
          <p>{page?.meta?.subtitle || page?.meta?.abstract || 'Premium Next.js frontend for TYPO3 Headless.'}</p>
        </div>
      </section>

      <section className="content-shell">
        {error ? (
          <div className="error-box">
            <h2>TYPO3 API konnte nicht geladen werden</h2>
            <p>{error.message}</p>
            <p>Prüfe NEXT_PUBLIC_API_BASE_URL in .env.local und ob TYPO3 Headless JSON liefert.</p>
          </div>
        ) : (
          <Renderer page={page} />
        )}
      </section>

      <DevTools page={page || { error: error?.message, path }} />
    </main>
  );
}
