import type { Metadata } from "next";
import ImageResizer from "./ImageResizer";

const pageUrl =
  "https://toolnovehub.tools/tools/image-resizer";

const ogImage =
  "https://toolnovehub.tools/og-image-resizer.jpg";

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
    canonical: pageUrl,
  },
  openGraph: {
    title: "Image Resizer - Resize Images Online",
    description:
      "Resize images online with custom dimensions and download the result directly from your browser.",
    url: pageUrl,
    siteName: "ToolNoveHub",
    type: "website",
    images: [
      {
        url: ogImage,
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
    images: [ogImage],
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
  url: pageUrl,
  description:
    "A free browser-based image resizer for changing image dimensions and exporting resized images as PNG, JPEG, or WebP.",
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Any",
  browserRequirements:
    "Requires a modern web browser with JavaScript and Canvas support.",
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
    "Resize images to custom dimensions",
    "Keep image aspect ratio",
    "Export PNG images",
    "Export JPEG images",
    "Export WebP images",
    "Adjust JPEG and WebP quality",
    "Download resized images",
    "Browser-based image processing",
  ],
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