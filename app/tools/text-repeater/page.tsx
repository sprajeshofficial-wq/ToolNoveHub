import type { Metadata } from "next";
import TextRepeater from "./TextRepeater";

const siteUrl = "https://toolnovehub.tools";
const pageUrl = `${siteUrl}/tools/text-repeater`;

export const metadata: Metadata = {
  title: "Text Repeater - Repeat Text Online",
  description:
    "Repeat text multiple times online with custom separators including new lines, spaces, commas, or no separator. Free browser-based text repeater.",
  keywords: [
    "text repeater",
    "repeat text",
    "text repeat generator",
    "repeat text online",
    "duplicate text",
    "text generator",
    "repeat words",
    "repeat sentence",
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Text Repeater - Repeat Text Online | ToolNoveHub",
    description:
      "Repeat text instantly with custom separators using a free browser-based text repeater.",
    url: pageUrl,
    siteName: "ToolNoveHub",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Text Repeater - Repeat Text Online | ToolNoveHub",
    description:
      "Repeat text multiple times with new lines, spaces, commas, or no separator.",
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

export default function TextRepeaterPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Text Repeater",
    url: pageUrl,
    description:
      "Free online text repeater for repeating text multiple times with customizable separators.",
    applicationCategory: "UtilitiesApplication",
    applicationSubCategory: "Text Repeater",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    isAccessibleForFree: true,
    featureList: [
      "Repeat text multiple times",
      "Custom text repetition count",
      "New line separator",
      "Space separator",
      "Comma separator",
      "No separator",
      "Copy generated text",
      "Clear generated text",
      "Browser-based text processing",
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

      <TextRepeater />
    </>
  );
}