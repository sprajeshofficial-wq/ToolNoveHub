import type { Metadata } from "next";
import ImageResizer from "./ImageResizer";

export const metadata: Metadata = {
  title: "Image Resizer - Resize Images Online",
  description:
    "Resize images online by changing width and height, keep the aspect ratio, and download PNG, JPEG, or WebP images directly from your browser.",
  keywords: [
    "image resizer",
    "resize image",
    "resize images online",
    "image size changer",
    "photo resizer",
    "resize JPG",
    "resize PNG",
    "resize WebP",
  ],
  alternates: {
    canonical: "https://toolnovehub.tools/tools/image-resizer",
  },
  openGraph: {
    title: "Image Resizer - Resize Images Online",
    description:
      "Resize images online with custom dimensions and download the result directly from your browser.",
    url: "https://toolnovehub.tools/tools/image-resizer",
    siteName: "ToolNoveHub",
    type: "website",
    images: [
      {
        url: "https://toolnovehub.tools/og-image-resizer.jpg",
        width: 1200,
        height: 630,
        alt: "ToolNoveHub Image Resizer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Image Resizer - Resize Images Online",
    description:
      "Resize images online with custom dimensions and download the result directly from your browser.",
    images: ["https://toolnovehub.tools/og-image-resizer.jpg"],
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
  name: "Image Resizer",
  url: "https://toolnovehub.tools/tools/image-resizer",
  description:
    "A browser-based image resizer for changing image dimensions and exporting resized images.",
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Any",
  browserRequirements: "Requires a modern web browser with Canvas support.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function ImageResizerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <ImageResizer />
    </>
  );
}