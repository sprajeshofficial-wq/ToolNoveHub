import type { MetadataRoute } from "next";

const siteUrl = "https://toolnovehub.tools";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

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

  const toolPages: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: `${siteUrl}/tools/${tool}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    // Homepage
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },

    // Main tools page
    {
      url: `${siteUrl}/tools`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },

    // All individual tools
    ...toolPages,

    // Main information / trust pages
    {
      url: `${siteUrl}/about`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.5,
    },

    {
      url: `${siteUrl}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4,
    },

    {
      url: `${siteUrl}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4,
    },

    {
      url: `${siteUrl}/contact`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];
}