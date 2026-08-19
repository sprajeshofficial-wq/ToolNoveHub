import type { Metadata } from "next";
import { Inter } from "next/font/google";

// Import CSS
import "./globals.css";

// Import components
import Header from "./components/Header";
import Footer from "./components/Footer";
import { generateStructuredData } from "./utils/seo";
import { Suspense } from "react";

// Optimize font loading
const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: "ToolNoveHub - Free Online Tools",
  description: "Free online tools for students, developers, and office work.",
  metadataBase: new URL("https://toolnovehub.tools"),
  alternates: {
    canonical: "https://toolnovehub.tools",
  },
  openGraph: {
    title: "ToolNoveHub - Free Online Tools",
    description: "Free online tools for everyday use.",
    url: "https://toolnovehub.tools",
    siteName: "ToolNoveHub",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen antialiased bg-gray-50`}>
        <Header />
        <main className="flex-grow">
          <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
            {children}
          </Suspense>
        </main>
        <Footer />
      </body>
    </html>
  );
}