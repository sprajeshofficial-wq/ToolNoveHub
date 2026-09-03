import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const GA_MEASUREMENT_ID = "G-F3HNEJW9QE";

export const metadata: Metadata = {
  metadataBase: new URL("https://toolnovehub.tools"),

  title: {
    default: "ToolNoveHub – Free Online Tools",
    template: "%s | ToolNoveHub",
  },

  description:
    "ToolNoveHub provides free, fast, and easy-to-use online tools for everyday tasks, students, developers, creators, and businesses.",

  keywords: [
    "free online tools",
    "online tools",
    "free tools",
    "ToolNoveHub",
  ],

  applicationName: "ToolNoveHub",

  authors: [
    {
      name: "ToolNoveHub",
      url: "https://toolnovehub.tools",
    },
  ],

  creator: "ToolNoveHub",
  publisher: "ToolNoveHub",

  alternates: {
    canonical: "https://toolnovehub.tools",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://toolnovehub.tools",
    siteName: "ToolNoveHub",
    title: "ToolNoveHub – Free Online Tools",
    description:
      "Free, fast, and easy-to-use online tools for everyday tasks, students, developers, creators, and businesses.",
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

  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        <Header />

        <main className="flex-1">
          {children}
        </main>

        <Footer />

        {/* Google Analytics */}
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
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}