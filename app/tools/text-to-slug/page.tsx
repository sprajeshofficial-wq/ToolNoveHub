import type { Metadata } from "next";
import TextToSlug from "./TextToSlug";

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
    canonical: "https://toolnovehub.tools/tools/text-to-slug",
  },
  openGraph: {
    title: "Text to Slug Converter - ToolNoveHub",
    description:
      "Create clean, readable URL slugs from titles and text with a free browser-based converter.",
    url: "https://toolnovehub.tools/tools/text-to-slug",
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
    url: "https://toolnovehub.tools/tools/text-to-slug",
    description:
      "Convert titles and text into clean, readable URL slugs using a browser-based text to slug converter.",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
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