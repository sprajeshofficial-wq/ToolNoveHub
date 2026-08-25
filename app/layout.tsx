import type { Metadata, Viewport } from "next";
import Script from "next/script";

import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const GA_MEASUREMENT_ID = "G-F3HNEJW9QE";

export const metadata: Metadata = {
  metadataBase: new URL("https://toolnovehub.tools"),

  title: {
    default: "ToolNoveHub — Free Online Tools",
    template: "%s | ToolNoveHub",
  },

  description:
    "ToolNoveHub provides free online tools for developers, students, office workers, and everyday tasks.",

  applicationName: "ToolNoveHub",

  keywords: [
    "free online tools",
    "online tools",
    "developer tools",
    "student tools",
    "office tools",
    "calculators",
    "QR code generator",
    "JSON formatter",
    "image tools",
    "text tools",
  ],

  authors: [
    {
      name: "ToolNoveHub Team",
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
    },
  },

  alternates: {
    canonical: "https://toolnovehub.tools",
  },

  openGraph: {
    type: "website",
    url: "https://toolnovehub.tools",
    siteName: "ToolNoveHub",
    title: "ToolNoveHub — Free Online Tools",
    description:
      "Free online tools for developers, students, office workers, and everyday tasks.",
  },

  twitter: {
    card: "summary_large_image",
    title: "ToolNoveHub — Free Online Tools",
    description:
      "Free online tools for developers, students, office workers, and everyday tasks.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 font-sans antialiased">
        {/* Google Analytics 4 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />

        <Script
          id="google-analytics"
          strategy="afterInteractive"
        >
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>

        {/* Website structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "ToolNoveHub",
              url: "https://toolnovehub.tools",
              description:
                "Free online tools for developers, students, office workers, and everyday tasks.",
            }),
          }}
        />

        {/* Organization structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "ToolNoveHub",
              url: "https://toolnovehub.tools",
            }),
          }}
        />

        <div className="flex min-h-screen flex-col">
          <Header />

          <main className="flex-1">
            {children}
          </main>

          <Footer />
        </div>
      </body>
    </html>
  );
}