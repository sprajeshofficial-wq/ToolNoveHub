import type { Metadata } from 'next';
import Link from 'next/link';
import Calculator from './Calculator';

export const metadata: Metadata = {
  title: 'Free Online Calculator - Simple & Fast | ToolNoveHub',
  description: 'Free online calculator for basic arithmetic. Add, subtract, multiply, and divide instantly. No signup, 100% private, browser-based.',
  keywords: 'calculator, online calculator, simple calculator, arithmetic calculator, free calculator',
  alternates: { canonical: 'https://toolnovehub.tools/tools/calculator' },
  openGraph: {
    title: 'Free Online Calculator - Simple & Fast | ToolNoveHub',
    description: 'Free online calculator for basic arithmetic. Add, subtract, multiply, and divide instantly.',
    url: 'https://toolnovehub.tools/tools/calculator',
    type: 'website',
    images: [{ url: 'https://toolnovehub.tools/og-calculator.jpg', width: 1200, height: 630, alt: 'Calculator - Free Online Tool' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Online Calculator - Simple & Fast | ToolNoveHub',
    description: 'Free online calculator for basic arithmetic. Add, subtract, multiply, and divide instantly.',
    images: ['https://toolnovehub.tools/og-calculator.jpg'],
  },
};

export default function CalculatorPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Online Calculator',
    description: 'Free online calculator for basic arithmetic. Add, subtract, multiply, and divide instantly.',
    applicationCategory: 'Utility',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <div className="min-h-screen py-20 px-4 bg-gradient-to-br from-slate-50 via-white to-green-50/30">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-slate-900 text-center mb-4">Free Online Calculator – Simple &amp; Fast Arithmetic</h1>
        <p className="text-center text-slate-600 max-w-2xl mx-auto mb-12">Free online calculator for basic arithmetic. Add, subtract, multiply, and divide instantly. No signup required.</p>

        <div className="rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 p-6 shadow-xl">
          <Calculator />
        </div>

        <div className="mt-12 prose prose-slate max-w-none">
          <h2>How to Use the Calculator</h2>
          <ol>
            <li><strong>Enter numbers:</strong> Click number buttons or use your keyboard</li>
            <li><strong>Select operation:</strong> Choose add, subtract, multiply, or divide</li>
            <li><strong>Calculate:</strong> Press the equals button to see the result</li>
          </ol>
          <h2>Common Calculations</h2>
          <ul>
            <li><strong>Addition:</strong> 150 + 50 = 200</li>
            <li><strong>Subtraction:</strong> 100 - 30 = 70</li>
            <li><strong>Multiplication:</strong> 12 × 8 = 96</li>
            <li><strong>Division:</strong> 100 ÷ 4 = 25</li>
          </ul>
        </div>

        <div className="mt-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 p-6 shadow-xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">FAQ About Online Calculators</h2>
          <div className="space-y-4">
            <div><h3 className="font-semibold text-slate-900">Is this calculator free?</h3><p className="text-slate-600">Yes, completely free. No signup or payment required.</p></div>
            <div><h3 className="font-semibold text-slate-900">Can I use it on my phone?</h3><p className="text-slate-600">Yes, it works on all devices including smartphones and tablets.</p></div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Related Tools</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/tools/percentage-calculator" className="rounded-xl bg-white p-4 shadow-lg hover:shadow-xl transition-all border border-slate-200/50 text-center hover:border-indigo-200"><span className="text-sm font-medium text-slate-900">Percentage Calculator</span></Link>
            <Link href="/tools/number-to-words" className="rounded-xl bg-white p-4 shadow-lg hover:shadow-xl transition-all border border-slate-200/50 text-center hover:border-indigo-200"><span className="text-sm font-medium text-slate-900">Number to Words</span></Link>
            <Link href="/tools/file-size-converter" className="rounded-xl bg-white p-4 shadow-lg hover:shadow-xl transition-all border border-slate-200/50 text-center hover:border-indigo-200"><span className="text-sm font-medium text-slate-900">File Size Converter</span></Link>
            <Link href="/tools/qr-code-generator" className="rounded-xl bg-white p-4 shadow-lg hover:shadow-xl transition-all border border-slate-200/50 text-center hover:border-indigo-200"><span className="text-sm font-medium text-slate-900">QR Code Generator</span></Link>
          </div>
        </div>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      </div>
    </div>
  );
}