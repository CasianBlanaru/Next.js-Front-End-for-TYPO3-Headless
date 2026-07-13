import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { buildCacheTags } from '../../../lib/cache';
import { revalidateTypo3Path } from '../../../lib/cache.server';

type RevalidatePayload = {
  path?: string;
  paths?: string[];
  tag?: string;
  tags?: string[];
};

function getSecret(request: NextRequest): string | null {
  const authHeader = request.headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.slice('Bearer '.length).trim();
  }

  return request.nextUrl.searchParams.get('secret');
}

function isAuthorized(request: NextRequest): boolean {
  const configuredSecret = process.env.REVALIDATE_SECRET;

  if (!configuredSecret) {
    return false;
  }

  return getSecret(request) === configuredSecret;
}

function normalizePath(path: string): string {
  if (!path || path === '/') {
    return '/';
  }

  return `/${path}`.replace(/\/+/g, '/').replace(/\/$/, '');
}

async function readPayload(request: NextRequest): Promise<RevalidatePayload> {
  if (request.method === 'GET') {
    const path = request.nextUrl.searchParams.get('path') || undefined;
    const tag = request.nextUrl.searchParams.get('tag') || undefined;
    return { path, tag };
  }

  try {
    return (await request.json()) as RevalidatePayload;
  } catch {
    return {};
  }
}

async function handleRevalidate(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ ok: false, message: 'Unauthorized' }, { status: 401 });
  }

  const payload = await readPayload(request);
  const paths = [payload.path, ...(payload.paths || [])].filter((path): path is string => typeof path === 'string' && path.length > 0);
  const tags = [payload.tag, ...(payload.tags || [])].filter((tag): tag is string => typeof tag === 'string' && tag.length > 0);
  const revalidatedPaths = paths.map(normalizePath);
  const revalidatedTags = new Set<string>(tags);

  for (const path of revalidatedPaths) {
    revalidateTypo3Path(path);
    buildCacheTags(path).forEach((tag) => revalidatedTags.add(tag));
  }

  for (const tag of revalidatedTags) {
    revalidateTag(tag);
  }

  if (revalidatedPaths.length === 0 && revalidatedTags.size === 0) {
    revalidateTag('typo3');
    revalidatedTags.add('typo3');
  }

  return NextResponse.json({
    ok: true,
    revalidated: {
      paths: revalidatedPaths,
      tags: Array.from(revalidatedTags),
    },
  });
}

export async function GET(request: NextRequest) {
  return handleRevalidate(request);
}

export async function POST(request: NextRequest) {
  return handleRevalidate(request);
}
