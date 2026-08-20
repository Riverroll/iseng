import type { MetadataRoute } from 'next';

const siteUrl = 'https://uzl-portofolio.vercel.app';

// Bump this only when page content actually changes — don't wire it to
// build time, or the sitemap falsely claims "updated today" every deploy.
const lastContentUpdate = new Date('2026-08-20');

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: lastContentUpdate,
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
