import { cookies } from 'next/headers';
import { siteConfig } from '../../../lib/config';

export async function GET() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  const hasBeUserCookie = cookieHeader.includes('be_typo_user');

  if (!hasBeUserCookie) {
    return Response.json({ hasSession: false });
  }

  const typo3Base = siteConfig.typo3BaseUrl.replace(/\/$/, '');

  try {
    const res = await fetch(`${typo3Base}/typo3/ajax/fe-editor/session`, {
      headers: { Cookie: cookieHeader, Accept: 'application/json' },
      cache: 'no-store',
    });

    if (res.ok) {
      const data = await res.json();
      return Response.json({
        hasSession: true,
        assetHash: data.assetHash || null,
        feEditorToken: data.feEditorToken || null,
        // Point ajaxUrls to local Next.js proxy routes to avoid cross-origin cookie issues
        ajaxUrls: {
          fe_editor_save: '/api/fe-editor/save',
          fe_editor_ai: '/api/fe-editor/ai',
        },
      });
    }

    return Response.json({ hasSession: true, assetHash: null });
  } catch {
    return Response.json({ hasSession: hasBeUserCookie, assetHash: null });
  }
}
