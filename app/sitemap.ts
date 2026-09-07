import type { MetadataRoute } from "next";

const siteUrl = "https://toolnovehub.tools";

const toolSlugs = [
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
  "text-repeater",
  "text-to-ascii",
  "text-to-slug",
  "unit-converter",
  "word-counter",
];

const blogSlugs = [
  "age-calculator-ultimate-guide",
  "how-to-create-qr-code-for-wifi",
  "qr-code-generator-ultimate-guide",
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

const mainPages = [
  {
    path: "",
    changeFrequency: "weekly" as const,
    priority: 1,
  },
  {
    path: "/tools",
    changeFrequency: "weekly" as const,
    priority: 0.9,
  },
  {
    path: "/about",
    changeFrequency: "monthly" as const,
    priority: 0.6,
  },
  {
    path: "/blog",
    changeFrequency: "weekly" as const,
    priority: 0.7,
  },
  {
    path: "/docs",
    changeFrequency: "monthly" as const,
    priority: 0.6,
  },
  {
    path: "/contact",
    changeFrequency: "monthly" as const,
    priority: 0.5,
  },
  {
    path: "/privacy",
    changeFrequency: "yearly" as const,
    priority: 0.3,
  },
  {
    path: "/terms",
    changeFrequency: "yearly" as const,
    priority: 0.3,
  },
  {
    path: "/developer",
    changeFrequency: "monthly" as const,
    priority: 0.6,
  },
];

const categoryPages = [
  "/tools/calculators",
  "/tools/developer",
  "/tools/image",
  "/tools/text",
  "/tools/utility",
  "/tools/design",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    ...mainPages.map((page) => ({
      url: `${siteUrl}${page.path}`,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),

    ...categoryPages.map((path) => ({
      url: `${siteUrl}${path}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),

    ...toolSlugs.map((slug) => ({
      url: `${siteUrl}/tools/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),

    ...blogSlugs.map((slug) => ({
      url: `${siteUrl}/blog/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  return pages;
}
