import type { Metadata } from "next";
import TextToAscii from "./TextToAscii";

const siteUrl = "https://toolnovehub.tools";
const pageUrl = `${siteUrl}/tools/text-to-ascii`;

export const metadata: Metadata = {
  title: "Text to ASCII Converter - Convert Text to ASCII Codes",
  description:
    "Convert text into ASCII character codes online. See decimal ASCII values, handle Unicode characters clearly, and copy the result instantly.",
  keywords: [
    "text to ASCII",
    "ASCII converter",
    "ASCII code converter",
    "text ASCII converter",
    "ASCII character codes",
    "convert text to ASCII",
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Text to ASCII Converter - ToolNoveHub",
    description:
      "Convert text into ASCII character codes online with instant results and easy copying.",
    url: pageUrl,
    siteName: "ToolNoveHub",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Text to ASCII Converter - ToolNoveHub",
    description:
      "Convert text into ASCII character codes online.",
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

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Text to ASCII Converter",
  url: pageUrl,
  description:
    "Free online tool for converting text characters into ASCII decimal codes and displaying non-ASCII Unicode characters clearly.",
  applicationCategory: "DeveloperApplication",
  applicationSubCategory: "Text to ASCII Converter",
  operatingSystem: "Any",
  browserRequirements: "Requires JavaScript",
  isAccessibleForFree: true,
  featureList: [
    "Convert text characters to ASCII decimal codes",
    "Display character and code values",
    "Handle non-ASCII Unicode characters",
    "Copy converted results",
    "Clear input and output",
    "Browser-based text processing",
  ],
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function TextToAsciiPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <TextToAscii />
    </>
  );
}