import type { Metadata } from "next";
import FileSizeConverter from "./FileSizeConverter";

const siteUrl = "https://toolnovehub.tools";
const pageUrl = `${siteUrl}/tools/file-size-converter`;

export const metadata: Metadata = {
  title: "File Size Converter - Convert Bytes, KB, MB, GB & TB",
  description:
    "Convert file sizes between Bytes, KB, MB, GB, and TB with a fast browser-based file size converter.",
  keywords: [
    "file size converter",
    "bytes to kb",
    "kb to mb",
    "mb to gb",
    "gb to tb",
    "file size calculator",
    "storage converter",
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "File Size Converter - ToolNoveHub",
    description:
      "Convert Bytes, KB, MB, GB, and TB quickly with a free browser-based file size converter.",
    url: pageUrl,
    siteName: "ToolNoveHub",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "File Size Converter - ToolNoveHub",
    description:
      "Convert file sizes between Bytes, KB, MB, GB, and TB with a free online converter.",
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
  name: "File Size Converter",
  url: pageUrl,
  description:
    "Free online file size converter for converting Bytes, KB, MB, GB, and TB.",
  applicationCategory: "UtilitiesApplication",
  applicationSubCategory: "File Size Conversion",
  operatingSystem: "Any",
  browserRequirements: "Requires JavaScript",
  isAccessibleForFree: true,
  featureList: [
    "Bytes conversion",
    "Kilobytes conversion",
    "Megabytes conversion",
    "Gigabytes conversion",
    "Terabytes conversion",
    "File size conversion",
    "Storage unit conversion",
    "Browser-based calculations",
  ],
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function FileSizeConverterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <FileSizeConverter />
    </>
  );
}