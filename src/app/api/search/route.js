import { siteConfig } from '../../../lib/config';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q') || '';
  const collections = searchParams.get('collections') || '';
  const page = searchParams.get('page') || '1';
  const perPage = searchParams.get('per_page') || '10';

  if (!q || q.length < 3) {
    return Response.json({
      data: [],
      meta: {
        total: 0,
        page: parseInt(page, 10),
        per_page: parseInt(perPage, 10),
        total_pages: 0,
        note: "Query too short. Minimum 3 characters required."
      }
    });
  }

  const typo3Origin = siteConfig.typo3BaseUrl.replace(/\/$/, '');
  const typo3SearchUrl = `${typo3Origin}/?type=1701&q=${encodeURIComponent(q)}&collections=${encodeURIComponent(collections)}&page=${page}&per_page=${perPage}`;

  try {
    const res = await fetch(typo3SearchUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      },
      cache: 'no-store'
    });

    if (!res.ok) {
      throw new Error(`TYPO3 Search API returned status ${res.status}`);
    }

    const data = await res.json();
    return Response.json(data);
  } catch (error) {
    console.error("Next.js Search API error:", error);

    // Fallback response with a clear message as requested by the user
    return Response.json({
      data: [],
      meta: {
        total: 0,
        page: parseInt(page, 10),
        per_page: parseInt(perPage, 10),
        total_pages: 0,
        status: "fallback",
        error: error.message,
        info: "TYPO3 Search API endpoint fehlt noch"
      }
    });
  }
}
