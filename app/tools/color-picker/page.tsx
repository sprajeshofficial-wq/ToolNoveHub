import type { Metadata } from "next";
import ColorPicker from "./ColorPicker";

const siteUrl = "https://toolnovehub.tools";
const pageUrl = `${siteUrl}/tools/color-picker`;

export const metadata: Metadata = {
  title: "Color Picker - HEX, RGB & HSL Color Converter",
  description:
    "Pick a color online and instantly convert it to HEX, RGB, and HSL values. Free browser-based color picker for designers, developers, and creators.",
  keywords: [
    "color picker",
    "color picker online",
    "hex color picker",
    "hex to rgb",
    "hex to hsl",
    "rgb color picker",
    "hsl color picker",
    "color converter",
    "hex color converter",
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Color Picker - HEX, RGB & HSL | ToolNoveHub",
    description:
      "Pick colors and instantly get HEX, RGB, and HSL values with a free browser-based color picker.",
    url: pageUrl,
    siteName: "ToolNoveHub",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Color Picker - HEX, RGB & HSL | ToolNoveHub",
    description:
      "Pick a color and convert it to HEX, RGB, and HSL values instantly.",
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

export default function ColorPickerPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Color Picker",
    url: pageUrl,
    description:
      "Free online color picker for selecting colors and converting them between HEX, RGB, and HSL values.",
    applicationCategory: "DesignApplication",
    applicationSubCategory: "Color Picker",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    isAccessibleForFree: true,
    featureList: [
      "Pick colors online",
      "HEX color values",
      "RGB color values",
      "HSL color values",
      "Color format conversion",
      "Browser-based color processing",
      "Copy color values",
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

      <ColorPicker />
    </>
  );
}