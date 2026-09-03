import type { Metadata } from "next";
import QRCodeGenerator from "./QRCodeGenerator";

export const metadata: Metadata = {
  title: "QR Code Generator - Create Free QR Codes Online",

  description:
    "Create free QR codes for text, websites, and Wi-Fi networks with ToolNoveHub. Generate and download QR codes directly in your browser.",

  keywords: [
    "QR code generator",
    "free QR code generator",
    "create QR code",
    "QR code maker",
    "Wi-Fi QR code generator",
    "URL QR code",
    "text QR code",
  ],

  alternates: {
    canonical: "https://toolnovehub.tools/tools/qr-code-generator",
  },

  openGraph: {
    type: "website",
    url: "https://toolnovehub.tools/tools/qr-code-generator",
    title: "QR Code Generator - Create Free QR Codes Online",
    description:
      "Create free QR codes for text, websites, and Wi-Fi networks directly in your browser.",
    siteName: "ToolNoveHub",
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

export default function QRCodeGeneratorPage() {
  return <QRCodeGenerator />;
}