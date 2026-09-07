import type { Metadata } from "next";
import FileSizeConverter from "./FileSizeConverter";

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
    canonical: "https://toolnovehub.tools/tools/file-size-converter",
  },
  openGraph: {
    title: "File Size Converter - ToolNoveHub",
    description:
      "Convert Bytes, KB, MB, GB, and TB quickly with a free browser-based file size converter.",
    url: "https://toolnovehub.tools/tools/file-size-converter",
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

export default function FileSizeConverterPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "File Size Converter",
    url: "https://toolnovehub.tools/tools/file-size-converter",
    description:
      "Convert file sizes between Bytes, KB, MB, GB, and TB using a browser-based file size converter.",
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

      <FileSizeConverter />
    </>
  );
}