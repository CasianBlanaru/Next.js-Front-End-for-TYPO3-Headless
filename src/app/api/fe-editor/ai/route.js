import { cookies } from 'next/headers';
import { siteConfig } from '../../../../lib/config';

const typo3Base = siteConfig.typo3BaseUrl.replace(/\/$/, '');

export async function POST(request) {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  const body = await request.text();

  const res = await fetch(`${typo3Base}/typo3/ajax/fe-editor/ai`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Requested-With': 'XMLHttpRequest',
      Cookie: cookieHeader,
    },
    body,
    cache: 'no-store',
  });

  const data = await res.json().catch(() => ({ ok: false, error: 'invalid_response' }));
  return Response.json(data, { status: res.status });
}
