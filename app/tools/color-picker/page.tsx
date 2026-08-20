import type { Metadata } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Dynamically import ColorPicker with SSR disabled to fix hydration errors
const ColorPicker = dynamic(
  () => import('./ColorPicker'),
  { ssr: false }
);

export const metadata: Metadata = {
  title: 'Free Color Picker - Pick Colors & Convert HEX to RGB | ToolNoveHub',
  description: 'Free online color picker. Pick colors visually, convert between HEX, RGB, and HSL. Generate random palettes and export colors. Perfect for designers and developers.',
  keywords: 'color picker, hex to rgb, color palette generator, color converter, design tool',
  alternates: {
    canonical: 'https://toolnovehub.tools/tools/color-picker',
  },
  openGraph: {
    title: 'Free Color Picker - Pick Colors & Convert HEX to RGB | ToolNoveHub',
    description: 'Free online color picker. Pick colors visually, convert between HEX, RGB, and HSL.',
    url: 'https://toolnovehub.tools/tools/color-picker',
    type: 'website',
    images: [
      {
        url: 'https://toolnovehub.tools/og-color-picker.jpg',
        width: 1200,
        height: 630,
        alt: 'Color Picker - Free Online Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Color Picker - Pick Colors & Convert HEX to RGB | ToolNoveHub',
    description: 'Free online color picker. Pick colors visually, convert between HEX, RGB, and HSL.',
    images: ['https://toolnovehub.tools/og-color-picker.jpg'],
  },
};

export default function ColorPickerPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Color Picker',
    description:
      'Pick colors visually, convert between HEX, RGB, and HSL. Generate random palettes and export colors.',
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
    <div className="min-h-screen py-20 px-4 bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-slate-900 text-center mb-4">
          Free Color Picker – Pick Colors &amp; Convert Formats
        </h1>
        <p className="text-center text-slate-600 max-w-2xl mx-auto mb-12">
          Free online color picker. Pick colors visually, convert between HEX, RGB, and HSL.
          Generate random palettes and export colors.
        </p>

        <div className="rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 p-6 shadow-xl">
          <ColorPicker />
        </div>

        <div className="mt-12 prose prose-slate max-w-none">
          <h2>How to Use the Color Picker</h2>
          <ol>
            <li>
              <strong>Pick a color:</strong> Use the color input or click preset colors
            </li>
            <li>
              <strong>View conversions:</strong> See HEX, RGB, and HSL values
            </li>
            <li>
              <strong>Generate palettes:</strong> Click &quot;Generate&quot; for random color palettes
            </li>
            <li>
              <strong>Export:</strong> Export colors as JSON for your project
            </li>
          </ol>
          <h2>Color Formats Explained</h2>
          <ul>
            <li>
              <strong>HEX:</strong> #FF5733 (used in web design and CSS)
            </li>
            <li>
              <strong>RGB:</strong> rgb(255, 87, 51) (used in digital design)
            </li>
            <li>
              <strong>HSL:</strong> hsl(10, 100%, 60%) (intuitive color model)
            </li>
          </ul>
        </div>

        <div className="mt-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 p-6 shadow-xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Frequently Asked Questions About Color Picker
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-slate-900">
                How do I pick a color?
              </h3>
              <p className="text-slate-600">
                Use the color input to pick any color visually, or click preset colors.
                You can also enter a HEX value directly.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">
                What is the difference between HEX and RGB?
              </h3>
              <p className="text-slate-600">
                HEX uses hexadecimal values (#FF5733). RGB uses decimal values (255, 87, 51).
                They represent the same colors in different formats.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Related Tools</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href="/tools/image-resizer"
              className="rounded-xl bg-white p-4 shadow-lg hover:shadow-xl transition-all border border-slate-200/50 text-center hover:border-indigo-200"
            >
              <span className="text-sm font-medium text-slate-900">Image Resizer</span>
            </Link>
            <Link
              href="/tools/image-cropper"
              className="rounded-xl bg-white p-4 shadow-lg hover:shadow-xl transition-all border border-slate-200/50 text-center hover:border-indigo-200"
            >
              <span className="text-sm font-medium text-slate-900">Image Cropper</span>
            </Link>
            <Link
              href="/tools/json-formatter"
              className="rounded-xl bg-white p-4 shadow-lg hover:shadow-xl transition-all border border-slate-200/50 text-center hover:border-indigo-200"
            >
              <span className="text-sm font-medium text-slate-900">JSON Formatter</span>
            </Link>
            <Link
              href="/tools/qr-code-generator"
              className="rounded-xl bg-white p-4 shadow-lg hover:shadow-xl transition-all border border-slate-200/50 text-center hover:border-indigo-200"
            >
              <span className="text-sm font-medium text-slate-900">QR Code Generator</span>
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