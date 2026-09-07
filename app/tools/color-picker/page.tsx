import type { Metadata } from "next";
import ColorPicker from "./ColorPicker";

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
    canonical: "https://toolnovehub.tools/tools/color-picker",
  },
  openGraph: {
    title: "Color Picker - HEX, RGB & HSL | ToolNoveHub",
    description:
      "Pick colors and instantly get HEX, RGB, and HSL values with a free browser-based color picker.",
    url: "https://toolnovehub.tools/tools/color-picker",
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
    url: "https://toolnovehub.tools/tools/color-picker",
    description:
      "Pick a color and convert it to HEX, RGB, and HSL color values.",
    applicationCategory: "DesignApplication",
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

      <ColorPicker />
    </>
  );
}