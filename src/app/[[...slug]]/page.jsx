import '../../lib/t3config';
import { cookies } from 'next/headers';
import { getPageBySlug, T3Renderer, HeadlessDevTools, PageContent } from '@pixelcoda/headless-nextjs';
import FrontendEditor from '../../components/FrontendEditor';

export async function generateMetadata({ params }) {
  try {
    const { slug } = await params;
    const page = await getPageBySlug(slug);
    return {
      title: page?.seo?.title || page?.meta?.title || page?.title || 'TYPO3 Headless',
      description: page?.meta?.description || page?.meta?.abstract || '',
    };
  } catch {
    return { title: 'TYPO3 Headless', description: '' };
  }
}

export default async function Page({ params }) {
  const { slug } = await params;
  let page = null;
  let error = null;

  try {
    page = await getPageBySlug(slug);
  } catch (e) {
    error = e;
    console.error('TYPO3 API Error:', e);
  }

  if (error || !page) {
    return (
      <main style={{ padding: '2rem' }}>
        <div className="error-box">
          <h2>TYPO3 API Connection Error</h2>
          <p>{error?.message || 'No page data returned'}</p>
          <p><strong>API:</strong> {process.env.NEXT_PUBLIC_TYPO3_BASE_URL}</p>
        </div>
      </main>
    );
  }

  return (
    <>
      <PageContent pageData={page} />
      <HeadlessDevTools page={page} enabled={process.env.NEXT_PUBLIC_HEADLESS_DEVTOOLS === 'true'} />
      <FrontendEditor />
    </>
  );
}
