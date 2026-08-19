import type { Metadata } from 'next';
import Link from 'next/link';
import QRCodeScanner from './QRCodeScanner';

export const metadata: Metadata = {
  title: 'Free QR Code Scanner - Scan QR Codes Online | ToolNoveHub',
  description: 'Free online QR code scanner. Scan QR codes using your camera or upload an image. No signup, 100% private, browser-based.',
  keywords: 'qr code scanner, scan qr code, qr code reader, qr code decoder, online qr scanner',
  alternates: { canonical: 'https://toolnovehub.tools/tools/qr-code-scanner' },
  openGraph: {
    title: 'Free QR Code Scanner - Scan QR Codes Online | ToolNoveHub',
    description: 'Free online QR code scanner. Scan QR codes using your camera or upload an image.',
    url: 'https://toolnovehub.tools/tools/qr-code-scanner',
    type: 'website',
    images: [{ url: 'https://toolnovehub.tools/og-qr-code-scanner.jpg', width: 1200, height: 630, alt: 'QR Code Scanner - Free Online Tool' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free QR Code Scanner - Scan QR Codes Online | ToolNoveHub',
    description: 'Free online QR code scanner. Scan QR codes using your camera or upload an image.',
    images: ['https://toolnovehub.tools/og-qr-code-scanner.jpg'],
  },
};

export default function QRCodeScannerPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'QR Code Scanner',
    description: 'Free online QR code scanner. Scan QR codes using your camera or upload an image.',
    applicationCategory: 'Utility',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <div className="min-h-screen py-20 px-4 bg-gradient-to-br from-slate-50 via-white to-teal-50/30">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-slate-900 text-center mb-4">Free QR Code Scanner – Scan QR Codes Instantly</h1>
        <p className="text-center text-slate-600 max-w-2xl mx-auto mb-12">Free online QR code scanner. Scan QR codes using your camera or upload an image. No signup required.</p>

        <div className="rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 p-6 shadow-xl">
          <QRCodeScanner />
        </div>

        <div className="mt-12 prose prose-slate max-w-none">
          <h2>How to Use the QR Code Scanner</h2>
          <ol>
            <li><strong>Upload or scan:</strong> Upload an image with a QR code or use your camera</li>
            <li><strong>Process:</strong> The tool reads the QR code data</li>
            <li><strong>Copy:</strong> Copy the decoded information</li>
          </ol>
          <h2>Why Use a QR Code Scanner?</h2>
          <ul>
            <li><strong>Quick access:</strong> Instantly access URLs and information from QR codes</li>
            <li><strong>Security:</strong> Preview QR code content before visiting</li>
            <li><strong>Convenience:</strong> No app needed on your phone</li>
          </ul>
        </div>

        <div className="mt-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 p-6 shadow-xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">FAQ About QR Code Scanners</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-slate-900">How do QR code scanners work?</h3>
              <p className="text-slate-600">QR code scanners read the pattern of black and white squares, which encodes data such as URLs, text, or Wi-Fi credentials.</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Can I scan QR codes with my phone?</h3>
              <p className="text-slate-600">Yes, most modern phones have built-in QR code scanning in the camera app.</p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Related Tools</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/tools/qr-code-generator" className="rounded-xl bg-white p-4 shadow-lg hover:shadow-xl transition-all border border-slate-200/50 text-center hover:border-indigo-200"><span className="text-sm font-medium text-slate-900">QR Code Generator</span></Link>
            <Link href="/tools/image-resizer" className="rounded-xl bg-white p-4 shadow-lg hover:shadow-xl transition-all border border-slate-200/50 text-center hover:border-indigo-200"><span className="text-sm font-medium text-slate-900">Image Resizer</span></Link>
            <Link href="/tools/percentage-calculator" className="rounded-xl bg-white p-4 shadow-lg hover:shadow-xl transition-all border border-slate-200/50 text-center hover:border-indigo-200"><span className="text-sm font-medium text-slate-900">Percentage Calculator</span></Link>
            <Link href="/tools/word-counter" className="rounded-xl bg-white p-4 shadow-lg hover:shadow-xl transition-all border border-slate-200/50 text-center hover:border-indigo-200"><span className="text-sm font-medium text-slate-900">Word Counter</span></Link>
          </div>
        </div>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      </div>
    </div>
  );
}