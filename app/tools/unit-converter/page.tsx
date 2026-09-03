import type { Metadata } from "next";
import Link from "next/link";
import UnitConverter from "./UnitConverter";

export const metadata: Metadata = {
  title:
    "Unit Converter - Convert Length, Weight, Temperature & More | ToolNoveHub",
  description:
    "Free online unit converter. Convert length, weight, temperature, area, volume, and speed instantly. Free browser-based converter.",
  keywords:
    "unit converter, length converter, weight converter, temperature converter, metric converter, imperial converter, online unit converter, convert units, conversion tool",
  alternates: {
    canonical: "https://toolnovehub.tools/tools/unit-converter",
  },
  openGraph: {
    title:
      "Unit Converter - Convert Length, Weight, Temperature & More | ToolNoveHub",
    description:
      "Free online unit converter. Convert length, weight, temperature, area, volume, and speed.",
    url: "https://toolnovehub.tools/tools/unit-converter",
    type: "website",
    images: [
      {
        url: "https://toolnovehub.tools/og-unit-converter.jpg",
        width: 1200,
        height: 630,
        alt: "Unit Converter - Free Online Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Unit Converter - Convert Length, Weight, Temperature & More | ToolNoveHub",
    description:
      "Free online unit converter. Convert length, weight, temperature, area, volume, and speed.",
    images: ["https://toolnovehub.tools/og-unit-converter.jpg"],
  },
};

export default function UnitConverterPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Unit Converter",
    description:
      "Convert length, weight, temperature, area, volume, speed, and more.",
    applicationCategory: "Utility",
    operatingSystem: "All",
    browserRequirements: "Requires JavaScript",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 px-4 py-20">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-4 text-center text-4xl font-bold text-slate-900">
          Unit Converter – Convert Anything Instantly
        </h1>

        <p className="mx-auto mb-12 max-w-2xl text-center text-slate-600">
          Free online unit converter. Convert length, weight, temperature,
          area, volume, and speed. Free, browser-based.
        </p>

        <div className="rounded-2xl border border-slate-200/50 bg-white/80 p-6 shadow-xl backdrop-blur-sm">
          <UnitConverter />
        </div>

        <div className="prose prose-slate mt-12 max-w-none">
          <h2>How to Use the Unit Converter</h2>

          <ol>
            <li>
              <strong>Select a category:</strong> Length, Weight,
              Temperature, Area, Volume, or Speed
            </li>
            <li>
              <strong>Choose units:</strong> Select the unit you want to
              convert from and to
            </li>
            <li>
              <strong>Enter a value:</strong> Type the number you want to
              convert
            </li>
            <li>
              <strong>Get instant results:</strong> See the converted value
              immediately
            </li>
          </ol>

          <h2>Supported Unit Categories</h2>

          <ul>
            <li>
              <strong>Length:</strong> Meter, Kilometer, Mile, Yard, Foot,
              Inch, Centimeter, Millimeter
            </li>
            <li>
              <strong>Weight:</strong> Kilogram, Gram, Milligram, Pound,
              Ounce, Ton, Stone
            </li>
            <li>
              <strong>Temperature:</strong> Celsius, Fahrenheit, Kelvin
            </li>
            <li>
              <strong>Area:</strong> Square Meter, Square Kilometer, Square
              Mile, Acre, Hectare
            </li>
            <li>
              <strong>Volume:</strong> Liter, Milliliter, Gallon, Quart, Pint,
              Cup, Fluid Ounce
            </li>
            <li>
              <strong>Speed:</strong> km/h, mph, m/s, knots, ft/s
            </li>
          </ul>

          <h2>Why Use Our Unit Converter?</h2>

          <ul>
            <li>
              🔒 <strong>Private:</strong> Conversion calculations happen in
              your browser
            </li>
            <li>
              ⚡ <strong>Fast:</strong> Instant results with no waiting
            </li>
            <li>
              💰 <strong>Free:</strong> No signup or payment required
            </li>
            <li>
              📱 <strong>Mobile Friendly:</strong> Works on all devices
            </li>
            <li>
              🌐 <strong>Comprehensive:</strong> Multiple categories and
              commonly used units
            </li>
          </ul>
        </div>

        <div className="mt-8 rounded-2xl border border-slate-200/50 bg-white/80 p-6 shadow-xl backdrop-blur-sm">
          <h2 className="mb-4 text-2xl font-bold text-slate-900">
            Frequently Asked Questions About Unit Converters
          </h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-slate-900">
                What units can I convert?
              </h3>
              <p className="text-slate-600">
                You can convert length, weight, temperature, area, volume,
                and speed with multiple commonly used units.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900">
                Is this unit converter free?
              </h3>
              <p className="text-slate-600">
                Yes, completely free. No signup or payment is required.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900">
                How accurate is the conversion?
              </h3>
              <p className="text-slate-600">
                Conversions use standard mathematical conversion formulas and
                are calculated directly in your browser.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="mb-4 text-2xl font-bold text-slate-900">
            Related Tools
          </h2>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <Link
              href="/tools/percentage-calculator"
              className="rounded-xl border border-slate-200/50 bg-white p-4 text-center shadow-lg transition-all hover:border-indigo-200 hover:shadow-xl"
            >
              <span className="text-sm font-medium text-slate-900">
                Percentage Calculator
              </span>
            </Link>

            <Link
              href="/tools/calculator"
              className="rounded-xl border border-slate-200/50 bg-white p-4 text-center shadow-lg transition-all hover:border-indigo-200 hover:shadow-xl"
            >
              <span className="text-sm font-medium text-slate-900">
                Calculator
              </span>
            </Link>

            <Link
              href="/tools/file-size-converter"
              className="rounded-xl border border-slate-200/50 bg-white p-4 text-center shadow-lg transition-all hover:border-indigo-200 hover:shadow-xl"
            >
              <span className="text-sm font-medium text-slate-900">
                File Size Converter
              </span>
            </Link>

            <Link
              href="/tools/number-to-words"
              className="rounded-xl border border-slate-200/50 bg-white p-4 text-center shadow-lg transition-all hover:border-indigo-200 hover:shadow-xl"
            >
              <span className="text-sm font-medium text-slate-900">
                Number to Words
              </span>
            </Link>
          </div>
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaData),
          }}
        />
      </div>
    </div>
  );
}