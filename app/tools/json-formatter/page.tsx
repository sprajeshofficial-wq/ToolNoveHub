import type { Metadata } from 'next';
import Link from 'next/link';
import JSONFormatter from './JSONFormatter';

export const metadata: Metadata = {
  title: 'Free JSON Formatter - Format & Validate JSON Online | ToolNoveHub',
  description: 'Free online JSON formatter and validator. Format, beautify, and validate JSON data. Perfect for API development and debugging. No signup, 100% private.',
  keywords: 'json formatter, json validator, format json, beautify json, json pretty print',
  alternates: { canonical: 'https://toolnovehub.tools/tools/json-formatter' },
  openGraph: {
    title: 'Free JSON Formatter - Format & Validate JSON Online | ToolNoveHub',
    description: 'Free online JSON formatter and validator. Format, beautify, and validate JSON data.',
    url: 'https://toolnovehub.tools/tools/json-formatter',
    type: 'website',
    images: [{ url: 'https://toolnovehub.tools/og-json-formatter.jpg', width: 1200, height: 630, alt: 'JSON Formatter - Free Online Tool' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free JSON Formatter - Format & Validate JSON Online | ToolNoveHub',
    description: 'Free online JSON formatter and validator. Format, beautify, and validate JSON data.',
    images: ['https://toolnovehub.tools/og-json-formatter.jpg'],
  },
};

export default function JSONFormatterPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'JSON Formatter',
    description: 'Format, beautify, and validate JSON data. Perfect for API development and debugging.',
    applicationCategory: 'Utility',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <div className="min-h-screen py-20 px-4 bg-gradient-to-br from-slate-50 via-white to-violet-50/30">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-slate-900 text-center mb-4">Free JSON Formatter – Format &amp; Validate JSON Data</h1>
        <p className="text-center text-slate-600 max-w-2xl mx-auto mb-12">Free online JSON formatter and validator. Format, beautify, and validate JSON data. Perfect for API development and debugging.</p>

        <div className="rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 p-6 shadow-xl">
          <JSONFormatter />
        </div>

        <div className="mt-12 prose prose-slate max-w-none">
          <h2>How to Use the JSON Formatter</h2>
          <ol>
            <li><strong>Paste your JSON:</strong> Enter JSON data in the input area</li>
            <li><strong>Format or validate:</strong> Click &quot;Format &amp; Validate&quot; or &quot;Minify&quot;</li>
            <li><strong>Copy results:</strong> Use the formatted JSON in your project</li>
          </ol>
          <h2>Why Use a JSON Formatter?</h2>
          <ul>
            <li><strong>Debugging:</strong> Readable JSON makes errors easier to spot</li>
            <li><strong>API development:</strong> Format API responses for analysis</li>
            <li><strong>Configuration:</strong> Format JSON config files for readability</li>
          </ul>
        </div>

        <div className="mt-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 p-6 shadow-xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">FAQ About JSON Formatters</h2>
          <div className="space-y-4">
            <div><h3 className="font-semibold text-slate-900">What does JSON formatter do?</h3><p className="text-slate-600">It formats JSON data with proper indentation, making it readable and easier to understand. It also validates JSON syntax.</p></div>
            <div><h3 className="font-semibold text-slate-900">Is my JSON data safe?</h3><p className="text-slate-600">Yes! All processing happens in your browser. Your JSON data is never uploaded to any server.</p></div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Related Tools</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/tools/json-validator" className="rounded-xl bg-white p-4 shadow-lg hover:shadow-xl transition-all border border-slate-200/50 text-center hover:border-indigo-200"><span className="text-sm font-medium text-slate-900">JSON Validator</span></Link>
            <Link href="/tools/text-to-slug" className="rounded-xl bg-white p-4 shadow-lg hover:shadow-xl transition-all border border-slate-200/50 text-center hover:border-indigo-200"><span className="text-sm font-medium text-slate-900">Text to Slug</span></Link>
            <Link href="/tools/binary-converter" className="rounded-xl bg-white p-4 shadow-lg hover:shadow-xl transition-all border border-slate-200/50 text-center hover:border-indigo-200"><span className="text-sm font-medium text-slate-900">Binary Converter</span></Link>
            <Link href="/tools/color-picker" className="rounded-xl bg-white p-4 shadow-lg hover:shadow-xl transition-all border border-slate-200/50 text-center hover:border-indigo-200"><span className="text-sm font-medium text-slate-900">Color Picker</span></Link>
          </div>
        </div>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      </div>
    </div>
  );
}