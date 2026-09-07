import type { Metadata } from "next";
import ImageCropper from "./ImageCropper";

export const metadata: Metadata = {
  title: "Image Cropper - Crop Images Online",
  description:
    "Crop images online with precise pixel controls, aspect ratios, rotation, adjustments, and PNG, JPEG, or WebP downloads.",
  keywords: [
    "image cropper",
    "crop image online",
    "photo cropper",
    "image cropping tool",
    "crop JPG",
    "crop PNG",
    "crop WebP",
  ],
  alternates: {
    canonical: "https://toolnovehub.tools/tools/image-cropper",
  },
  openGraph: {
    title: "Image Cropper - Crop Images Online",
    description:
      "Crop, resize, adjust, rotate, and download images directly in your browser.",
    url: "https://toolnovehub.tools/tools/image-cropper",
    siteName: "ToolNoveHub",
    type: "website",
    images: [
      {
        url: "https://toolnovehub.tools/og-image-cropper.jpg",
        width: 1200,
        height: 630,
        alt: "ToolNoveHub Image Cropper",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Image Cropper - Crop Images Online",
    description:
      "Crop and adjust images online with browser-based processing.",
    images: ["https://toolnovehub.tools/og-image-cropper.jpg"],
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
  name: "ToolNoveHub Image Cropper",
  url: "https://toolnovehub.tools/tools/image-cropper",
  description:
    "Browser-based image cropper for selecting, resizing, rotating, adjusting, and downloading images.",
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Any",
  browserRequirements: "Requires a modern web browser with JavaScript enabled.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function ImageCropperToolPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <ImageCropper />
    </>
  );
}