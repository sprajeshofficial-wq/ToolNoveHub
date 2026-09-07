import type { Metadata } from "next";
import NumberToWords from "./NumberToWords";

export const metadata: Metadata = {
  title: "Number to Words Converter - Convert Numbers to Words",
  description:
    "Convert numbers into English words with support for decimals, negative numbers, commas, and large values using a fast browser-based converter.",
  keywords: [
    "number to words converter",
    "number to word converter",
    "convert numbers to words",
    "number names",
    "numbers in words",
    "decimal to words",
    "negative number to words",
  ],
  alternates: {
    canonical: "https://toolnovehub.tools/tools/number-to-words",
  },
  openGraph: {
    title: "Number to Words Converter - ToolNoveHub",
    description:
      "Convert numbers into English words, including decimals and negative numbers, with a free browser-based converter.",
    url: "https://toolnovehub.tools/tools/number-to-words",
    siteName: "ToolNoveHub",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Number to Words Converter - ToolNoveHub",
    description:
      "Convert numbers into English words with a free online number-to-words converter.",
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
    url: "https://toolnovehub.tools/tools/number-to-words",
    description:
      "Convert numbers into English words with support for decimals, negative numbers, commas, and large values.",
    applicationCategory: "UtilitiesApplication",
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

      <NumberToWords />
    </>
  );
}