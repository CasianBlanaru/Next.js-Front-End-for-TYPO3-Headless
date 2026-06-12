import { getSiteUrl } from '@services/api';

export async function GET() {
  const siteUrl = getSiteUrl();
  const isProd = process.env.NODE_ENV === 'production' && !siteUrl.includes('.ddev.site');

  const robots = isProd
    ? `User-agent: *
Allow: /
Sitemap: ${new URL('/sitemap.xml', siteUrl).toString()}`
    : `User-agent: *
Disallow: /`;

  return new Response(robots, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
