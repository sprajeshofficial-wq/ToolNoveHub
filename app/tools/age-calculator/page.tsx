import type { Metadata } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const AgeCalculator = dynamic(
  () => import('./AgeCalculator'),
  { ssr: false }
);

export const metadata: Metadata = {
  title: 'Age Calculator - Calculate Your Age Instantly | ToolNoveHub',
  description: 'Free online age calculator. Calculate your exact age in years, months, days, hours, minutes, and seconds. No signup, 100% private, browser-based.',
  keywords: 'age calculator, calculate age, age in years, date of birth calculator, how old am i, age calculator online, birth date calculator, age finder, age counter',
  alternates: {
    canonical: 'https://toolnovehub.tools/tools/age-calculator',
  },
  openGraph: {
    title: 'Age Calculator - Calculate Your Age Instantly | ToolNoveHub',
    description: 'Free online age calculator. Calculate your exact age in years, months, days, hours, minutes, and seconds.',
    url: 'https://toolnovehub.tools/tools/age-calculator',
    type: 'website',
    images: [
      {
        url: 'https://toolnovehub.tools/og-age-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Age Calculator - Free Online Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Age Calculator - Calculate Your Age Instantly | ToolNoveHub',
    description: 'Free online age calculator. Calculate your exact age in years, months, days, hours, minutes, and seconds.',
    images: ['https://toolnovehub.tools/og-age-calculator.jpg'],
  },
};

export default function AgeCalculatorPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Age Calculator',
    description: 'Calculate your exact age in years, months, days, hours, minutes, and seconds.',
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
          Age Calculator – Calculate Your Exact Age
        </h1>
        <p className="text-center text-slate-600 max-w-2xl mx-auto mb-12">
          Free online age calculator. Calculate your exact age in years, months, days, hours, minutes, and seconds.
          No signup, 100% private, browser-based.
        </p>

        <div className="rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 p-6 shadow-xl">
          <AgeCalculator />
        </div>

        <div className="mt-12 prose prose-slate max-w-none">
          <h2>How to Use the Age Calculator</h2>
          <ol>
            <li>
              <strong>Enter your date of birth:</strong> Use the date picker to select your birth date
            </li>
            <li>
              <strong>Calculate:</strong> Click the &quot;Calculate Age&quot; button
            </li>
            <li>
              <strong>View results:</strong> See your exact age in years, months, days, hours, minutes, and seconds
            </li>
          </ol>

          <h2>Why Use an Age Calculator?</h2>
          <ul>
            <li>
              <strong>Quick and accurate:</strong> Get your exact age instantly
            </li>
            <li>
              <strong>Multiple formats:</strong> See age in years, months, days, and more
            </li>
            <li>
              <strong>100% private:</strong> All processing happens in your browser
            </li>
            <li>
              <strong>Free:</strong> No signup, no hidden charges
            </li>
          </ul>

          <h2>Common Uses for Age Calculator</h2>
          <ul>
            <li>
              <strong>Birthdays:</strong> Calculate how old you are today
            </li>
            <li>
              <strong>Applications:</strong> Age verification for forms
            </li>
            <li>
              <strong>Fun:</strong> See your age in hours and minutes
            </li>
            <li>
              <strong>Gifts:</strong> Plan age-specific gifts
            </li>
          </ul>
        </div>

        <div className="mt-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 p-6 shadow-xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Frequently Asked Questions About Age Calculators
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-slate-900">
                How accurate is the age calculator?
              </h3>
              <p className="text-slate-600">
                The age calculator is 100% accurate. It uses your date of birth and the current date to calculate your exact age down to the second.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">
                Can I calculate age for any date?
              </h3>
              <p className="text-slate-600">
                Yes! You can enter any date of birth and the tool will calculate the age from that date to today.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">
                Is this age calculator free?
              </h3>
              <p className="text-slate-600">
                Yes, completely free. No signup or payment required.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Related Tools</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href="/tools/percentage-calculator"
              className="rounded-xl bg-white p-4 shadow-lg hover:shadow-xl transition-all border border-slate-200/50 text-center hover:border-indigo-200"
            >
              <span className="text-sm font-medium text-slate-900">Percentage Calculator</span>
            </Link>
            <Link
              href="/tools/calculator"
              className="rounded-xl bg-white p-4 shadow-lg hover:shadow-xl transition-all border border-slate-200/50 text-center hover:border-indigo-200"
            >
              <span className="text-sm font-medium text-slate-900">Calculator</span>
            </Link>
            <Link
              href="/tools/unit-converter"
              className="rounded-xl bg-white p-4 shadow-lg hover:shadow-xl transition-all border border-slate-200/50 text-center hover:border-indigo-200"
            >
              <span className="text-sm font-medium text-slate-900">Unit Converter</span>
            </Link>
            <Link
              href="/tools/number-to-words"
              className="rounded-xl bg-white p-4 shadow-lg hover:shadow-xl transition-all border border-slate-200/50 text-center hover:border-indigo-200"
            >
              <span className="text-sm font-medium text-slate-900">Number to Words</span>
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