import { NextRequest, NextResponse } from 'next/server';
import { siteConfig } from '../../../lib/config';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q') || '';

  if (!q || q.length < 2) {
    return NextResponse.json([]);
  }

  const typo3Origin = siteConfig.typo3BaseUrl.replace(/\/$/, '');
  const url = `${typo3Origin}/index.php?eID=search_suggest&q=${encodeURIComponent(q)}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`TYPO3 Suggest API returned status ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Next.js Suggest API error:', error);
    return NextResponse.json([]);
  }
}
