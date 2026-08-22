import type { Metadata } from 'next';
import Link from 'next/link';
import BinaryConverter from './BinaryConverter';

export const metadata: Metadata = {
  title: 'Free Binary Converter - Text to Binary & Binary to Text | ToolNoveHub',
  description: 'Free online binary converter. Convert text to binary and binary to text instantly. Perfect for developers, students, and computer science enthusiasts.',
  keywords: 'binary converter, text to binary, binary to text, binary translator, binary to ascii, convert binary, binary code converter, text to binary online',
  alternates: {
    canonical: 'https://toolnovehub.tools/tools/binary-converter',
  },
  openGraph: {
    title: 'Free Binary Converter - Text to Binary & Binary to Text | ToolNoveHub',
    description: 'Free online binary converter. Convert text to binary and binary to text instantly.',
    url: 'https://toolnovehub.tools/tools/binary-converter',
    type: 'website',
    images: [{ url: 'https://toolnovehub.tools/og-binary-converter.jpg', width: 1200, height: 630, alt: 'Binary Converter - Free Online Tool' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Binary Converter - Text to Binary & Binary to Text | ToolNoveHub',
    description: 'Free online binary converter. Convert text to binary and binary to text instantly.',
    images: ['https://toolnovehub.tools/og-binary-converter.jpg'],
  },
};

export default function BinaryConverterPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Binary Converter',
    description: 'Convert text to binary and binary to text instantly. Perfect for developers, students, and computer science enthusiasts.',
    applicationCategory: 'Utility',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <div className="min-h-screen py-20 px-4 bg-gradient-to-br from-slate-50 via-white to-rose-50/30">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-slate-900 text-center mb-4">Free Binary Converter – Text to Binary &amp; Binary to Text</h1>
        <p className="text-center text-slate-600 max-w-2xl mx-auto mb-12">Free online binary converter. Convert text to binary and binary to text instantly. Perfect for developers, students, and computer science enthusiasts.</p>

        <div className="rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 p-6 shadow-xl">
          <BinaryConverter />
        </div>

        <div className="mt-12 prose prose-slate max-w-none">
          <h2>How to Use the Binary Converter</h2>
          <ol>
            <li><strong>Choose mode:</strong> Select &quot;Text → Binary&quot; or &quot;Binary → Text&quot;</li>
            <li><strong>Enter your data:</strong> Type text or binary (space-separated)</li>
            <li><strong>Convert:</strong> Click &quot;Convert&quot; to see the result</li>
            <li><strong>Copy:</strong> Copy the converted result</li>
          </ol>
          <h2>Understanding Binary</h2>
          <p>Binary is a base-2 number system using only 0s and 1s. Computers use binary to represent all data.</p>
        </div>

        <div className="mt-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 p-6 shadow-xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">FAQ About Binary Converter</h2>
          <div className="space-y-4">
            <div><h3 className="font-semibold text-slate-900">Why convert text to binary?</h3><p className="text-slate-600">Binary conversion helps understand how computers store and process data. It's also useful for educational purposes and low-level programming.</p></div>
            <div><h3 className="font-semibold text-slate-900">What is ASCII?</h3><p className="text-slate-600">ASCII is a character encoding standard that assigns numbers to characters. This tool uses ASCII values to convert between text and binary.</p></div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Related Tools</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/tools/json-formatter" className="rounded-xl bg-white p-4 shadow-lg hover:shadow-xl transition-all border border-slate-200/50 text-center hover:border-indigo-200"><span className="text-sm font-medium text-slate-900">JSON Formatter</span></Link>
            <Link href="/tools/calculator" className="rounded-xl bg-white p-4 shadow-lg hover:shadow-xl transition-all border border-slate-200/50 text-center hover:border-indigo-200"><span className="text-sm font-medium text-slate-900">Calculator</span></Link>
            <Link href="/tools/word-counter" className="rounded-xl bg-white p-4 shadow-lg hover:shadow-xl transition-all border border-slate-200/50 text-center hover:border-indigo-200"><span className="text-sm font-medium text-slate-900">Word Counter</span></Link>
            <Link href="/tools/qr-code-generator" className="rounded-xl bg-white p-4 shadow-lg hover:shadow-xl transition-all border border-slate-200/50 text-center hover:border-indigo-200"><span className="text-sm font-medium text-slate-900">QR Code Generator</span></Link>
          </div>
        </div>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      </div>
    </div>
  );
}