import { getSitemapRoutes } from '@services/navigation';
import { getSiteUrl } from '@services/api';

export async function GET() {
  const siteUrl = getSiteUrl();
  const routes = await getSitemapRoutes();

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${routes
    .map(
      (route) => `
  <url>
    <loc>${siteUrl ? new URL(route.path, siteUrl).toString() : route.path}</loc>
    ${route.lastmod ? `<lastmod>${route.lastmod}</lastmod>` : ''}
    <priority>${route.priority || 0.5}</priority>
  </url>`
    )
    .join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
