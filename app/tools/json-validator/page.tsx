import type { Metadata } from 'next';
import Link from 'next/link';
import JSONValidator from './JSONValidator';

export const metadata: Metadata = {
  title: 'Free JSON Validator - Validate JSON Online | ToolNoveHub',
  description: 'Free online JSON validator. Validate JSON data and find syntax errors instantly. Perfect for API development and debugging. No signup, 100% private.',
  keywords: 'json validator, validate json, json checker, json syntax validator, json verifier, validate json online, json parser, json error checker',
  alternates: {
    canonical: 'https://toolnovehub.tools/tools/json-validator',
  },
  openGraph: {
    title: 'Free JSON Validator - Validate JSON Online | ToolNoveHub',
    description: 'Free online JSON validator. Validate JSON data and find syntax errors instantly.',
    url: 'https://toolnovehub.tools/tools/json-validator',
    type: 'website',
    images: [{ url: 'https://toolnovehub.tools/og-json-validator.jpg', width: 1200, height: 630, alt: 'JSON Validator - Free Online Tool' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free JSON Validator - Validate JSON Online | ToolNoveHub',
    description: 'Free online JSON validator. Validate JSON data and find syntax errors instantly.',
    images: ['https://toolnovehub.tools/og-json-validator.jpg'],
  },
};

export default function JSONValidatorPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'JSON Validator',
    description: 'Validate JSON data and find syntax errors instantly. Perfect for API development and debugging.',
    applicationCategory: 'Utility',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <div className="min-h-screen py-20 px-4 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-slate-900 text-center mb-4">Free JSON Validator – Validate JSON Data Instantly</h1>
        <p className="text-center text-slate-600 max-w-2xl mx-auto mb-12">Free online JSON validator. Validate JSON data and find syntax errors instantly. Perfect for API development and debugging.</p>

        <div className="rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 p-6 shadow-xl">
          <JSONValidator />
        </div>

        <div className="mt-12 prose prose-slate max-w-none">
          <h2>How to Use the JSON Validator</h2>
          <ol>
            <li><strong>Paste your JSON:</strong> Enter JSON data in the text area</li>
            <li><strong>Validate:</strong> Click the &quot;Validate&quot; button</li>
            <li><strong>View results:</strong> See if your JSON is valid or find error details</li>
            <li><strong>Format:</strong> Click &quot;Format&quot; to beautify valid JSON</li>
          </ol>
          <h2>Common JSON Syntax Errors</h2>
          <ul>
            <li>Trailing commas after last item</li>
            <li>Missing quotes around keys</li>
            <li>Single quotes instead of double quotes</li>
            <li>Comma placement errors</li>
          </ul>
        </div>

        <div className="mt-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 p-6 shadow-xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">FAQ About JSON Validator</h2>
          <div className="space-y-4">
            <div><h3 className="font-semibold text-slate-900">What does a JSON validator do?</h3><p className="text-slate-600">A JSON validator checks if your JSON data is properly formatted and follows JSON syntax rules. It tells you if there are errors and where they are.</p></div>
            <div><h3 className="font-semibold text-slate-900">Why is valid JSON important?</h3><p className="text-slate-600">Invalid JSON can break APIs, cause data processing errors, and lead to application failures. Validating JSON helps catch these issues early.</p></div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Related Tools</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/tools/json-formatter" className="rounded-xl bg-white p-4 shadow-lg hover:shadow-xl transition-all border border-slate-200/50 text-center hover:border-indigo-200"><span className="text-sm font-medium text-slate-900">JSON Formatter</span></Link>
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