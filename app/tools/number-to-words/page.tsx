import type { Metadata } from "next";
import NumberToWords from "./NumberToWords";

const pageUrl =
  "https://toolnovehub.tools/tools/number-to-words";

export const metadata: Metadata = {
  title:
    "Number to Words Converter - Convert Numbers to Words",
  description:
    "Convert numbers to English words online. Supports whole numbers, decimals, negative numbers, commas, and large values with a fast browser-based converter.",
  keywords: [
    "number to words converter",
    "number to word converter",
    "convert numbers to words",
    "numbers in words",
    "number names",
    "decimal to words",
    "negative number to words",
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title:
      "Number to Words Converter - ToolNoveHub",
    description:
      "Convert numbers into English words, including decimals, negative numbers, commas, and large values.",
    url: pageUrl,
    siteName: "ToolNoveHub",
    type: "website",
  },
  twitter: {
    card: "summary",
    title:
      "Number to Words Converter - ToolNoveHub",
    description:
      "Convert numbers into English words with a free online converter.",
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

export default function NumberToWordsPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Number to Words Converter",
    url: pageUrl,
    description:
      "A free online tool for converting numbers into English words, including decimals, negative numbers, comma-separated values, and large numbers.",
    applicationCategory: "UtilitiesApplication",
    applicationSubCategory: "Number Converter",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    isAccessibleForFree: true,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Convert whole numbers to English words",
      "Convert decimal numbers",
      "Convert negative numbers",
      "Support comma-separated numbers",
      "Support large numbers",
      "Copy converted text",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <NumberToWords />
    </>
  );
}