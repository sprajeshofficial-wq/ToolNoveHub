import type { MetadataRoute } from "next";

const siteUrl = "https://toolnovehub.tools";

const tools = [
  "age-calculator",
  "binary-converter",
  "calculator",
  "color-picker",
  "file-size-converter",
  "image-cropper",
  "image-resizer",
  "json-formatter",
  "json-validator",
  "number-to-words",
  "password-generator",
  "percentage-calculator",
  "qr-code-generator",
  "qr-code-scanner",
  "text-repeater",
  "text-to-ascii",
  "text-to-slug",
  "unit-converter",
  "word-counter",
];

const categories = [
  "calculators",
  "developer",
  "image",
  "text",
  "design",
  "utility",
];

const blogPosts = [
  "age-calculator-ultimate-guide",
  "how-to-create-qr-code-for-wifi",
  "qr-code-generator-ultimate-guide",
  "qr-code-scanner-how-to-scan",
  "best-image-resizer-tools-social-media",
  "resize-images-free-without-losing-quality",
  "image-cropper-how-to-crop",
  "word-counter-content-writing",
  "text-to-slug-converter-seo-friendly-urls",
  "text-to-ascii-create-stunning-art",
  "percentage-calculator-daily-life",
  "number-to-words-converter",
  "file-size-converter-understand-storage",
  "json-formatter-why-developers-need",
  "json-validator-common-mistakes",
  "binary-converter-understand-computer-language",
  "privacy-first-browser-tools",
  "10-free-online-tools-every-developer-needs",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const mainPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/tools`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/docs`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteUrl}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/developer`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${siteUrl}/tools/${category}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const toolPages: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: `${siteUrl}/tools/${tool}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((slug) => ({
    url: `${siteUrl}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    ...mainPages,
    ...categoryPages,
    ...toolPages,
    ...blogPages,
  ];
}