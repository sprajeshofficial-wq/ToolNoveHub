import type { Metadata } from "next";
import TextToAscii from "./TextToAscii";

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
    canonical: "https://toolnovehub.tools/tools/text-to-ascii",
  },
  openGraph: {
    title: "Text to ASCII Converter - ToolNoveHub",
    description:
      "Convert text into ASCII character codes online with instant results and easy copying.",
    url: "https://toolnovehub.tools/tools/text-to-ascii",
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
  url: "https://toolnovehub.tools/tools/text-to-ascii",
  description:
    "Convert text characters into ASCII decimal codes online.",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
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