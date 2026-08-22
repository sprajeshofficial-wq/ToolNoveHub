import type { Metadata } from 'next';
import Link from 'next/link';
import NumberToWords from './NumberToWords';

export const metadata: Metadata = {
  title: 'Free Number to Words Converter - Convert Numbers to Text | ToolNoveHub',
  description: 'Free online number to words converter. Convert any number to words instantly. Perfect for checks, invoices, and legal documents. No signup required.',
  keywords: 'number to words, convert number to text, number to word converter, number to english, number spelling, number to words online, convert number to words free',
  alternates: {
    canonical: 'https://toolnovehub.tools/tools/number-to-words',
  },
  openGraph: {
    title: 'Free Number to Words Converter - Convert Numbers to Text | ToolNoveHub',
    description: 'Free online number to words converter. Convert any number to words instantly.',
    url: 'https://toolnovehub.tools/tools/number-to-words',
    type: 'website',
    images: [{ url: 'https://toolnovehub.tools/og-number-to-words.jpg', width: 1200, height: 630, alt: 'Number to Words Converter - Free Online Tool' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Number to Words Converter - Convert Numbers to Text | ToolNoveHub',
    description: 'Free online number to words converter. Convert any number to words instantly.',
    images: ['https://toolnovehub.tools/og-number-to-words.jpg'],
  },
};

export default function NumberToWordsPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Number to Words Converter',
    description: 'Convert any number to words instantly. Perfect for checks, invoices, and legal documents.',
    applicationCategory: 'Utility',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <div className="min-h-screen py-20 px-4 bg-gradient-to-br from-slate-50 via-white to-amber-50/30">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-slate-900 text-center mb-4">Free Number to Words Converter – Convert Numbers Instantly</h1>
        <p className="text-center text-slate-600 max-w-2xl mx-auto mb-12">Free online number to words converter. Convert any number to words instantly. Perfect for checks, invoices, and legal documents.</p>

        <div className="rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 p-6 shadow-xl">
          <NumberToWords />
        </div>

        <div className="mt-12 prose prose-slate max-w-none">
          <h2>How to Use the Number to Words Converter</h2>
          <ol>
            <li><strong>Enter a number:</strong> Type any number between 0 and 999,999,999</li>
            <li><strong>Convert:</strong> Click &quot;Convert to Words&quot; or press Enter</li>
            <li><strong>Copy:</strong> Copy the result for use in documents</li>
          </ol>
          <h2>When to Convert Numbers to Words</h2>
          <ul>
            <li><strong>Writing checks:</strong> Prevent fraud with written amounts</li>
            <li><strong>Legal documents:</strong> Avoid ambiguity in contracts</li>
            <li><strong>Invoices:</strong> Professional presentation</li>
          </ul>
        </div>

        <div className="mt-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 p-6 shadow-xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">FAQ About Number to Words</h2>
          <div className="space-y-4">
            <div><h3 className="font-semibold text-slate-900">Why convert numbers to words?</h3><p className="text-slate-600">Converting numbers to words helps prevent fraud on checks, makes legal documents clearer, and improves readability in formal writing.</p></div>
            <div><h3 className="font-semibold text-slate-900">What numbers are supported?</h3><p className="text-slate-600">This tool supports numbers from 0 to 999,999,999.</p></div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Related Tools</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/tools/percentage-calculator" className="rounded-xl bg-white p-4 shadow-lg hover:shadow-xl transition-all border border-slate-200/50 text-center hover:border-indigo-200"><span className="text-sm font-medium text-slate-900">Percentage Calculator</span></Link>
            <Link href="/tools/calculator" className="rounded-xl bg-white p-4 shadow-lg hover:shadow-xl transition-all border border-slate-200/50 text-center hover:border-indigo-200"><span className="text-sm font-medium text-slate-900">Calculator</span></Link>
            <Link href="/tools/file-size-converter" className="rounded-xl bg-white p-4 shadow-lg hover:shadow-xl transition-all border border-slate-200/50 text-center hover:border-indigo-200"><span className="text-sm font-medium text-slate-900">File Size Converter</span></Link>
            <Link href="/tools/word-counter" className="rounded-xl bg-white p-4 shadow-lg hover:shadow-xl transition-all border border-slate-200/50 text-center hover:border-indigo-200"><span className="text-sm font-medium text-slate-900">Word Counter</span></Link>
          </div>
        </div>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      </div>
    </div>
  );
}