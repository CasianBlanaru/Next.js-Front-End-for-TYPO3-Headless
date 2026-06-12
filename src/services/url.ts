import { withoutLeadingSlash, withQuery } from 'ufo';
import { NextRequest } from 'next/server';

export const getInitialDataPath = (req: NextRequest, endpoint: string): string => {
  if (endpoint.startsWith('?')) {
    return withoutLeadingSlash(req.nextUrl.pathname);
  }
  if (!Object.keys(req.nextUrl.searchParams).length) {
    return withoutLeadingSlash(req.nextUrl.pathname);
  }

  const params = Object.fromEntries(req.nextUrl.searchParams);
  return withQuery(req.nextUrl.pathname, params);
};
