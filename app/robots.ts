import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/_next/',
        '/_next/static/',
        '/_next/data/',
        '/api/',
        '/static/',
        '/admin/',
        '/private/',
      ],
    },
    sitemap: 'https://toolnovehub.tools/sitemap.xml',
  };
}