import { NextResponse } from 'next/server';

const TYPO3_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function GET() {
  try {
    const res = await fetch(`${TYPO3_URL}/healthz.php`, {
      cache: 'no-store',
      signal: AbortSignal.timeout(5000),
    });
    return NextResponse.json({ typo3: res.status, ok: res.ok });
  } catch {
    return NextResponse.json({ typo3: 'unreachable' }, { status: 503 });
  }
}
