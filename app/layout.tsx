import type { Metadata, Viewport } from "next";
import "./globals.css";

import Header from "./components/Header";
import Footer from "./components/Footer";

const siteUrl = "https://toolnovehub.tools";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "ToolNoveHub – Free Online Tools",
    template: "%s | ToolNoveHub",
  },

  description:
    "Free online tools for QR codes, images, calculations, text, JSON, and everyday tasks. Fast, simple, and privacy-focused.",

  applicationName: "ToolNoveHub",

  authors: [
    {
      name: "ToolNoveHub",
      url: siteUrl,
    },
  ],

  creator: "ToolNoveHub",
  publisher: "ToolNoveHub",

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

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "ToolNoveHub",
    title: "ToolNoveHub – Free Online Tools",
    description:
      "Free online tools for QR codes, images, calculations, text, JSON, and everyday tasks.",
    url: siteUrl,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ToolNoveHub – Free Online Tools",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "ToolNoveHub – Free Online Tools",
    description:
      "Free online tools for QR codes, images, calculations, text, JSON, and more.",
    images: ["/og-image.png"],
  },

  category: "technology",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "ToolNoveHub",
      description:
        "Free online tools for everyday tasks, developers, students, and professionals.",
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
      inLanguage: "en",
    },
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "ToolNoveHub",
      url: siteUrl,
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-gray-50 antialiased font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />

        <Header />

        <main className="flex-1">{children}</main>

        <Footer />
      </body>
    </html>
  );
}