import type { Metadata } from 'next';
import Link from 'next/link';
import PercentageCalculator from './PercentageCalculator';

export const metadata: Metadata = {
  title: 'Free Percentage Calculator - Calculate Percentages Online | ToolNoveHub',
  description: 'Free online percentage calculator. Calculate percentages, percentage increase/decrease, and more. No signup, 100% private, browser-based.',
  keywords: 'percentage calculator, calculate percentage, percent calculator, percentage increase, percentage decrease, online percentage calculator, percent calculator free, percentage of number',
  alternates: {
    canonical: 'https://toolnovehub.tools/tools/percentage-calculator',
  },
  openGraph: {
    title: 'Free Percentage Calculator - Calculate Percentages Online | ToolNoveHub',
    description: 'Free online percentage calculator. Calculate percentages, percentage increase/decrease, and more.',
    url: 'https://toolnovehub.tools/tools/percentage-calculator',
    type: 'website',
    images: [
      {
        url: 'https://toolnovehub.tools/og-percentage-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Percentage Calculator - Free Online Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Percentage Calculator - Calculate Percentages Online | ToolNoveHub',
    description: 'Free online percentage calculator. Calculate percentages, percentage increase/decrease, and more.',
    images: ['https://toolnovehub.tools/og-percentage-calculator.jpg'],
  },
};

export default function PercentageCalculatorPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Percentage Calculator',
    description: 'Calculate percentages, percentage increase/decrease, and more. 100% private, browser-based.',
    applicationCategory: 'Utility',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <div className="min-h-screen py-20 px-4 bg-gradient-to-br from-slate-50 via-white to-amber-50/30">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-slate-900 text-center mb-4">Free Percentage Calculator – Calculate Percentages Instantly</h1>
        <p className="text-center text-slate-600 max-w-2xl mx-auto mb-12">Free online percentage calculator. Calculate percentages, percentage increase/decrease, and more. Perfect for tips, discounts, taxes, and grades.</p>

        <div className="rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 p-6 shadow-xl">
          <PercentageCalculator />
        </div>

        <div className="mt-12 prose prose-slate max-w-none">
          <h2>How to Use the Percentage Calculator</h2>
          <ol>
            <li><strong>Choose calculation type:</strong> Select &quot;% of a number&quot;, &quot;% increase&quot;, or &quot;% decrease&quot;</li>
            <li><strong>Enter your numbers:</strong> Input the number and percentage</li>
            <li><strong>Calculate:</strong> Click the &quot;Calculate&quot; button</li>
            <li><strong>Get results:</strong> View the result instantly</li>
          </ol>
          <h2>Common Percentage Calculations</h2>
          <ul>
            <li><strong>Tips:</strong> 20% of $50 = $10 (total $60)</li>
            <li><strong>Discounts:</strong> 25% off $100 = $25 off (total $75)</li>
            <li><strong>Tax:</strong> 8% tax on $100 = $8 (total $108)</li>
            <li><strong>Grade:</strong> 85 out of 100 = 85%</li>
          </ul>
        </div>

        <div className="mt-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 p-6 shadow-xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">FAQ About Percentage Calculators</h2>
          <div className="space-y-4">
            <div><h3 className="font-semibold text-slate-900">How do I calculate a percentage of a number?</h3><p className="text-slate-600">Use the &quot;% of a number&quot; mode. Enter the number and percentage, and the tool will calculate the result.</p></div>
            <div><h3 className="font-semibold text-slate-900">What is percentage increase?</h3><p className="text-slate-600">Percentage increase shows how much a value has grown relative to the original. For example, 100 increased by 20% = 120.</p></div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Related Tools</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/tools/calculator" className="rounded-xl bg-white p-4 shadow-lg hover:shadow-xl transition-all border border-slate-200/50 text-center hover:border-indigo-200"><span className="text-sm font-medium text-slate-900">Calculator</span></Link>
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