import type { Metadata } from "next";
import TextToSlug from "./TextToSlug";

const siteUrl = "https://toolnovehub.tools";
const pageUrl = `${siteUrl}/tools/text-to-slug`;

export const metadata: Metadata = {
  title: "Text to Slug Converter - Create Clean URL Slugs",
  description:
    "Convert titles and text into clean, readable URL slugs with a fast browser-based Text to Slug Converter.",
  keywords: [
    "text to slug converter",
    "slug generator",
    "URL slug generator",
    "SEO slug generator",
    "URL slug converter",
    "create URL slug",
    "text to URL",
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Text to Slug Converter - ToolNoveHub",
    description:
      "Create clean, readable URL slugs from titles and text with a free browser-based converter.",
    url: pageUrl,
    siteName: "ToolNoveHub",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Text to Slug Converter - ToolNoveHub",
    description:
      "Convert titles and text into clean URL slugs with a free online slug converter.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function TextToSlugPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Text to Slug Converter",
    url: pageUrl,
    description:
      "Free online tool for converting titles and text into clean, readable URL slugs.",
    applicationCategory: "DeveloperApplication",
    applicationSubCategory: "URL Slug Generator",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    isAccessibleForFree: true,
    featureList: [
      "Convert text into URL slugs",
      "Create clean readable URLs",
      "Generate SEO-friendly slugs",
      "Browser-based text processing",
      "Instant slug generation",
      "Copy generated slug",
    ],
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <TextToSlug />
    </>
  );
}