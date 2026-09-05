import type { Metadata } from "next";
import Link from "next/link";
import QRCodeScanner from "./QRCodeScanner";

export const metadata: Metadata = {
  title: "Free QR Code Scanner - Scan QR Codes Online | ToolNoveHub",

  description:
    "Free online QR code scanner. Scan QR codes using your camera or upload an image. No signup required. QR scanning is performed in your browser.",

  keywords: [
    "qr code scanner",
    "scan qr code",
    "qr code reader",
    "qr code decoder",
    "online qr scanner",
    "scan qr code online",
    "qr scanner free",
  ],

  alternates: {
    canonical: "https://toolnovehub.tools/tools/qr-code-scanner",
  },

  openGraph: {
    title: "Free QR Code Scanner - Scan QR Codes Online | ToolNoveHub",
    description:
      "Free online QR code scanner. Scan QR codes using your camera or upload an image.",
    url: "https://toolnovehub.tools/tools/qr-code-scanner",
    type: "website",
    siteName: "ToolNoveHub",
    images: [
      {
        url: "https://toolnovehub.tools/og-qr-code-scanner.jpg",
        width: 1200,
        height: 630,
        alt: "QR Code Scanner - Free Online Tool",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Free QR Code Scanner - Scan QR Codes Online | ToolNoveHub",
    description:
      "Free online QR code scanner. Scan QR codes using your camera or upload an image.",
    images: ["https://toolnovehub.tools/og-qr-code-scanner.jpg"],
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

export default function QRCodeScannerPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "QR Code Scanner",
    description:
      "Free online QR code scanner. Scan QR codes using your camera or upload an image.",
    applicationCategory: "Utility",
    operatingSystem: "All",
    browserRequirements: "Requires JavaScript",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/30 px-4 py-20">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <header className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            ToolNoveHub Tool
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Free QR Code Scanner
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Scan QR codes using your camera or upload an image. Decode QR code
            content directly in your browser with no signup required.
          </p>
        </header>

        {/* Scanner */}
        <section
          aria-label="QR Code Scanner"
          className="mt-12 rounded-2xl border border-slate-200/50 bg-white/80 p-6 shadow-xl backdrop-blur-sm sm:p-8"
        >
          <QRCodeScanner />
        </section>

        {/* How to use */}
        <section className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-bold text-slate-900">
            How to Use the QR Code Scanner
          </h2>

          <ol className="mt-5 space-y-4 text-sm leading-7 text-slate-600">
            <li>
              <strong className="text-slate-900">1. Upload or scan:</strong>{" "}
              Upload an image containing a QR code or use your device camera.
            </li>

            <li>
              <strong className="text-slate-900">2. Process:</strong> The
              scanner reads the QR code and decodes its information.
            </li>

            <li>
              <strong className="text-slate-900">3. Review:</strong> Check the
              decoded content before opening any links.
            </li>

            <li>
              <strong className="text-slate-900">4. Copy:</strong> Copy the
              decoded information when needed.
            </li>
          </ol>
        </section>

        {/* Why use */}
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-bold text-slate-900">
            Why Use a QR Code Scanner?
          </h2>

          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            <div>
              <h3 className="font-semibold text-slate-900">
                Quick access
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Quickly decode URLs, text, contact information, and other QR
                code data.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900">Review content</h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                See the decoded QR content before deciding whether to open a
                link.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900">
                Browser-based
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Use the scanner from a supported modern browser without
                installing a separate application.
              </p>
            </div>
          </div>
        </section>

        {/* Privacy */}
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-bold text-slate-900">
            Privacy and QR Code Scanning
          </h2>

          <p className="mt-4 text-sm leading-7 text-slate-600">
            QR scanning is designed to run in your browser. Your camera or
            uploaded image is used by the scanner to read the QR code. Avoid
            scanning sensitive information when using any online service unless
            you understand how that service processes your data.
          </p>
        </section>

        {/* FAQ */}
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-bold text-slate-900">
            FAQ About QR Code Scanners
          </h2>

          <div className="mt-6 space-y-6">
            <div>
              <h3 className="font-semibold text-slate-900">
                How do QR code scanners work?
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                QR code scanners analyze the pattern of squares in a QR code
                and decode the information stored inside it, such as a URL,
                text, or other supported data.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900">
                Can I scan a QR code with my phone?
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Yes. Most modern smartphones can scan QR codes using their
                built-in camera features. You can also use this browser-based
                scanner when you need to scan an uploaded image or use a
                supported browser camera.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900">
                Can I scan a QR code from an image?
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Yes, if the scanner supports image uploads. Select an image
                containing a readable QR code and the scanner will attempt to
                decode it.
              </p>
            </div>
          </div>
        </section>

        {/* Related tools */}
        <section className="mt-8">
          <h2 className="mb-5 text-2xl font-bold text-slate-900">
            Related Tools
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            <Link
              href="/tools/qr-code-generator"
              className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm transition hover:border-indigo-200 hover:shadow-lg"
            >
              <span className="text-sm font-medium text-slate-900">
                QR Code Generator
              </span>
            </Link>

            <Link
              href="/tools/image-resizer"
              className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm transition hover:border-indigo-200 hover:shadow-lg"
            >
              <span className="text-sm font-medium text-slate-900">
                Image Resizer
              </span>
            </Link>

            <Link
              href="/tools/percentage-calculator"
              className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm transition hover:border-indigo-200 hover:shadow-lg"
            >
              <span className="text-sm font-medium text-slate-900">
                Percentage Calculator
              </span>
            </Link>

            <Link
              href="/tools/word-counter"
              className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm transition hover:border-indigo-200 hover:shadow-lg"
            >
              <span className="text-sm font-medium text-slate-900">
                Word Counter
              </span>
            </Link>
          </div>
        </section>

        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaData),
          }}
        />
      </div>
    </main>
  );
}