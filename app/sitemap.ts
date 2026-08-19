import type { MetadataRoute } from 'next';

const baseUrl = 'https://toolnovehub.tools';

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
  return [
    // Homepage
    {
      url: baseUrl,
      changeFrequency: 'weekly',
      priority: 1.0,
    },

    // Main pages
    {
      url: `${baseUrl}/tools`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/blog`,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/docs`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },

    // Tool pages
    ...tools.map((tool) => ({
      url: `${baseUrl}/tools/${tool}`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),

    // Blog posts
    ...blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post}`,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}