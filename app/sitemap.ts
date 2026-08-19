import type { MetadataRoute } from 'next';

const baseUrl = 'https://toolnovehub.tools';

// All 16 tools
const tools = [
  'qr-code-generator',
  'qr-code-scanner',
  'image-resizer',
  'image-cropper',
  'percentage-calculator',
  'calculator',
  'word-counter',
  'text-to-slug',
  'text-repeater',
  'text-to-ascii',
  'json-formatter',
  'json-validator',
  'binary-converter',
  'number-to-words',
  'file-size-converter',
  'color-picker',
];

// All 18 blog posts
const blogPosts = [
  'how-to-create-qr-code-for-wifi',
  'qr-code-generator-ultimate-guide',
  'qr-code-scanner-how-to-scan',
  'best-image-resizer-tools-social-media',
  'resize-images-free-without-losing-quality',
  'image-cropper-how-to-crop',
  'word-counter-content-writing',
  'text-to-slug-converter-seo-friendly-urls',
  'text-to-ascii-create-stunning-art',
  'percentage-calculator-daily-life',
  'number-to-words-converter',
  'file-size-converter-understand-storage',
  'json-formatter-why-developers-need',
  'json-validator-common-mistakes',
  'color-picker-designers-best-friend',
  'binary-converter-understand-computer-language',
  'privacy-first-browser-tools',
  '10-free-online-tools-every-developer-needs',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Static pages
  const staticPages = [
    {
      url: '',
      priority: 1.0,
      changefreq: 'weekly' as const,
    },
    {
      url: '/tools',
      priority: 0.9,
      changefreq: 'weekly' as const,
    },
    {
      url: '/about',
      priority: 0.8,
      changefreq: 'monthly' as const,
    },
    {
      url: '/contact',
      priority: 0.8,
      changefreq: 'monthly' as const,
    },
    {
      url: '/privacy',
      priority: 0.7,
      changefreq: 'monthly' as const,
    },
    {
      url: '/terms',
      priority: 0.7,
      changefreq: 'monthly' as const,
    },
    {
      url: '/blog',
      priority: 0.8,
      changefreq: 'weekly' as const,
    },
    {
      url: '/docs',
      priority: 0.7,
      changefreq: 'monthly' as const,
    },
  ];

  // All sitemap entries
  const sitemapEntries = [
    // Static pages
    ...staticPages.map((page) => ({
      url: `${baseUrl}${page.url}`,
      lastModified: now,
      changeFrequency: page.changefreq,
      priority: page.priority,
    })),
    
    // Tool pages
    ...tools.map((tool) => ({
      url: `${baseUrl}/tools/${tool}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    
    // Blog posts
    ...blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];

  return sitemapEntries;
}