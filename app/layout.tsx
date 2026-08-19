import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "ToolNoveHub - Free Online Tools for Everyone",
  description: "Free online tools for students, developers, office workers, and everyday tasks. QR Codes, Image Resizer, Percentage Calculator, and more.",
  keywords: "online tools, free tools, QR code generator, image resizer, percentage calculator, word counter, JSON formatter",
  authors: [{ name: "ToolNoveHub" }],
  openGraph: {
    title: "ToolNoveHub - Free Online Tools",
    description: "Powerful, simple online tools for everyday tasks.",
    url: "https://toolnovehub.tools",
    siteName: "ToolNoveHub",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Header />
        <main className="pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}