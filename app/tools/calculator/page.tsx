import type { Metadata } from "next";
import Calculator from "./Calculator";

const siteUrl = "https://toolnovehub.tools";

export const metadata: Metadata = {
  title: "Online Calculator - Free Basic Calculator",
  description:
    "Use ToolNoveHub's free online calculator for addition, subtraction, multiplication, division, decimals, and percentage calculations. Fast, simple, and browser-based.",
  keywords: [
    "online calculator",
    "free calculator",
    "basic calculator",
    "calculator online",
    "simple calculator",
    "math calculator",
    "percentage calculator",
    "decimal calculator",
  ],
  alternates: {
    canonical: `${siteUrl}/tools/calculator`,
  },
  openGraph: {
    title: "Online Calculator - Free Basic Calculator | ToolNoveHub",
    description:
      "A free online calculator for basic arithmetic, decimals, and percentage calculations.",
    url: `${siteUrl}/tools/calculator`,
    siteName: "ToolNoveHub",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Online Calculator - Free Basic Calculator | ToolNoveHub",
    description:
      "Free browser-based calculator for everyday arithmetic and percentage calculations.",
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
  name: "ToolNoveHub Online Calculator",
  url: `${siteUrl}/tools/calculator`,
  description:
    "A free online calculator for basic arithmetic, decimals, and percentage calculations.",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
  browserRequirements:
    "Requires a modern web browser with JavaScript enabled.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "Addition",
    "Subtraction",
    "Multiplication",
    "Division",
    "Decimal calculations",
    "Percentage calculations",
    "Keyboard support",
    "Browser-based calculations",
  ],
};

const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is this calculator free?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes. The ToolNoveHub online calculator is available for free use in your browser.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use the calculator on my phone?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes. The calculator interface is designed to work on desktop, tablet, and mobile screens.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use my keyboard?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes. Number keys, arithmetic operators, percentage, Enter, Backspace, and Escape are supported.",
      },
    },
    {
      "@type": "Question",
      name: "What happens if I divide by zero?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "The calculator displays an error instead of returning an invalid numerical result.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need to install anything?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "No. Open the calculator in a modern web browser and start calculating.",
      },
    },
  ],
};

export default function CalculatorToolPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqStructuredData),
        }}
      />

      <main className="min-h-screen bg-gray-50">
        {/* Hero */}
        <section className="border-b border-gray-200 bg-white">
          <div className="mx-auto max-w-5xl px-4 py-12 text-center sm:px-6 lg:px-8 lg:py-16">
            <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
              Free Calculator
            </span>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Online Calculator
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
              A simple free online calculator for everyday arithmetic,
              percentages, decimals, and basic calculations.
            </p>
          </div>
        </section>

        <Calculator />
      </main>
    </>
  );
}