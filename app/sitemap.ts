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
  const staticPages = [
    {
      url: baseUrl,
      priority: 1.0,
      changeFrequency: 'weekly' as const,
    },
    {
      url: `${baseUrl}/tools`,
      priority: 0.9,
      changeFrequency: 'weekly' as const,
    },
    {
      url: `${baseUrl}/about`,
      priority: 0.8,
      changeFrequency: 'monthly' as const,
    },
    {
      url: `${baseUrl}/contact`,
      priority: 0.8,
      changeFrequency: 'monthly' as const,
    },
    {
      url: `${baseUrl}/privacy`,
      priority: 0.7,
      changeFrequency: 'monthly' as const,
    },
    {
      url: `${baseUrl}/terms`,
      priority: 0.7,
      changeFrequency: 'monthly' as const,
    },
    {
      url: `${baseUrl}/blog`,
      priority: 0.8,
      changeFrequency: 'weekly' as const,
    },
    {
      url: `${baseUrl}/docs`,
      priority: 0.7,
      changeFrequency: 'monthly' as const,
    },
  ];

  const toolPages = tools.map((tool) => ({
    url: `${baseUrl}/tools/${tool}`,
    priority: 0.8,
    changeFrequency: 'monthly' as const,
  }));

  const blogPages = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post}`,
    priority: 0.7,
    changeFrequency: 'monthly' as const,
  }));

  return [
    ...staticPages,
    ...toolPages,
    ...blogPages,
  ];
}