import type { MetadataRoute } from "next";

const siteUrl = "https://toolnovehub.tools";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    // Main pages
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

    // Tool categories
    {
      url: `${siteUrl}/tools/calculators`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/tools/developer`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/tools/image`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/tools/text`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/tools/design`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/tools/utility`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },

    // Calculator tools
    {
      url: `${siteUrl}/tools/calculator`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/tools/percentage-calculator`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/tools/age-calculator`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },

    // Developer tools
    {
      url: `${siteUrl}/tools/json-formatter`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/tools/binary-converter`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },

    // Image tools
    {
      url: `${siteUrl}/tools/image-resizer`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/tools/image-cropper`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },

    // Text tools
    {
      url: `${siteUrl}/tools/word-counter`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/tools/text-to-slug`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/tools/text-repeater`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/tools/text-to-ascii`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },

    // Design tools
    {
      url: `${siteUrl}/tools/color-picker`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },

    // Utility tools
    {
      url: `${siteUrl}/tools/qr-code-generator`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/tools/file-size-converter`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },

    // Other tools
    {
      url: `${siteUrl}/tools/number-to-words`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}