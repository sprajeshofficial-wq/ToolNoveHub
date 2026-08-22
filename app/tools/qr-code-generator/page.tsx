import type { Metadata } from 'next';
import Link from 'next/link';
import QRCodeGenerator from './QRCodeGenerator';

export const metadata: Metadata = {
  title: 'QR Code Generator - Create Free QR Codes Online | ToolNoveHub',
  description: 'Generate free QR codes for URLs, text, and Wi-Fi networks instantly. No signup required. 100% private, browser-based QR code generator with download options.',
  keywords: 'qr code generator, free qr code, generate qr code, qr code for wifi, qr code maker, online qr code generator, create qr code, qr code creator',
  alternates: {
    canonical: 'https://toolnovehub.tools/tools/qr-code-generator',
  },
  openGraph: {
    title: 'QR Code Generator - Create Free QR Codes Online | ToolNoveHub',
    description: 'Generate free QR codes for URLs, text, and Wi-Fi networks instantly. 100% private, browser-based.',
    url: 'https://toolnovehub.tools/tools/qr-code-generator',
    type: 'website',
    images: [
      {
        url: 'https://toolnovehub.tools/og-qr-code.jpg',
        width: 1200,
        height: 630,
        alt: 'QR Code Generator - Free Online Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QR Code Generator - Create Free QR Codes Online | ToolNoveHub',
    description: 'Generate free QR codes for URLs, text, and Wi-Fi networks instantly.',
    images: ['https://toolnovehub.tools/og-qr-code.jpg'],
  },
};

export default function QRCodeGeneratorPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'QR Code Generator',
    description:
      'Generate free QR codes for URLs, text, and Wi-Fi networks instantly. 100% private, browser-based.',
    applicationCategory: 'Utility',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  return (
    <div className="min-h-screen py-20 px-4 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-slate-900 text-center mb-4">
          Free QR Code Generator – Create QR Codes Instantly
        </h1>
        <p className="text-center text-slate-600 max-w-2xl mx-auto mb-12">
          Generate free QR codes for URLs, text, and Wi-Fi networks instantly.
          No signup required. Works entirely in your browser — 100% private.
        </p>

        <div className="rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 p-6 shadow-xl">
          <QRCodeGenerator />
        </div>

        <div className="mt-12 prose prose-slate max-w-none">
          <h2>How to Use the QR Code Generator</h2>
          <p>Creating QR codes with ToolNoveHub is simple and fast:</p>
          <ol>
            <li>
              <strong>Choose your input type:</strong> Select &quot;Text / URL&quot; or &quot;Wi-Fi Network&quot; tab
            </li>
            <li>
              <strong>Enter your data:</strong> For URLs, paste the link. For Wi-Fi, enter network details
            </li>
            <li>
              <strong>Generate:</strong> Click the &quot;Generate QR Code&quot; button
            </li>
            <li>
              <strong>Download or copy:</strong> Download the QR code as PNG or copy it to your clipboard
            </li>
          </ol>

          <h2>What Can You Use QR Codes For?</h2>
          <ul>
            <li>
              <strong>Wi-Fi networks:</strong> Share your Wi-Fi password without typing
            </li>
            <li>
              <strong>URLs:</strong> Direct users to your website or landing page
            </li>
            <li>
              <strong>Contact information:</strong> Share vCard or business details
            </li>
            <li>
              <strong>Event links:</strong> RSVP or event registration pages
            </li>
          </ul>

          <h2>Why Use This QR Code Generator?</h2>
          <ul>
            <li>🔒 <strong>100% Private:</strong> All processing happens in your browser</li>
            <li>📱 <strong>Wi-Fi Support:</strong> Generate QR codes for Wi-Fi networks</li>
            <li>💰 <strong>Free:</strong> No signup, no hidden charges</li>
            <li>📥 <strong>Download:</strong> Save as PNG for printing or sharing</li>
          </ul>
        </div>

        <div className="mt-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 p-6 shadow-xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Frequently Asked Questions About QR Code Generators
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-slate-900">
                Can I generate QR codes for Wi-Fi?
              </h3>
              <p className="text-slate-600">
                Yes! Just switch to the &quot;Wi-Fi Network&quot; tab, enter your network name
                and password, and generate. Works with WPA2, WPA3, WEP, and open networks.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">
                Is this QR code generator free?
              </h3>
              <p className="text-slate-600">
                Yes, completely free. No signup or payment required.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">
                How do I scan a QR code?
              </h3>
              <p className="text-slate-600">
                Open your phone&apos;s camera app, point it at the QR code, and tap the
                notification that appears. iPhone and Android both support this natively.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Related Tools</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href="/tools/qr-code-scanner"
              className="rounded-xl bg-white p-4 shadow-lg hover:shadow-xl transition-all border border-slate-200/50 text-center hover:border-indigo-200"
            >
              <span className="text-sm font-medium text-slate-900">QR Code Scanner</span>
            </Link>
            <Link
              href="/tools/text-to-slug"
              className="rounded-xl bg-white p-4 shadow-lg hover:shadow-xl transition-all border border-slate-200/50 text-center hover:border-indigo-200"
            >
              <span className="text-sm font-medium text-slate-900">Text to Slug</span>
            </Link>
            <Link
              href="/tools/image-resizer"
              className="rounded-xl bg-white p-4 shadow-lg hover:shadow-xl transition-all border border-slate-200/50 text-center hover:border-indigo-200"
            >
              <span className="text-sm font-medium text-slate-900">Image Resizer</span>
            </Link>
            <Link
              href="/tools/percentage-calculator"
              className="rounded-xl bg-white p-4 shadow-lg hover:shadow-xl transition-all border border-slate-200/50 text-center hover:border-indigo-200"
            >
              <span className="text-sm font-medium text-slate-900">Percentage Calculator</span>
            </Link>
          </div>
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </div>
    </div>
  );
}