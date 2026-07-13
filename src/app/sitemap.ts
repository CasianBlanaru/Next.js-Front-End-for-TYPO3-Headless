import { MetadataRoute } from 'next';
import { siteConfig } from '../lib/config';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.baseUrl.replace(/\/$/, '');

  // In a real scenario, you might want to fetch all page slugs from TYPO3
  // For now, we provide the homepage as a baseline.

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/suche`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];
}
