import type { Metadata } from "next";
import Link from "next/link";
import UnitConverter from "./UnitConverter";

const siteUrl = "https://toolnovehub.tools";
const pageUrl = `${siteUrl}/tools/unit-converter`;

export const metadata: Metadata = {
  title: "Unit Converter - Length, Weight, Temperature & More",
  description:
    "Convert length, weight, temperature, area, volume, and speed online with a free browser-based unit converter.",
  keywords: [
    "unit converter",
    "length converter",
    "weight converter",
    "temperature converter",
    "area converter",
    "volume converter",
    "speed converter",
    "metric converter",
    "imperial converter",
    "online unit converter",
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Unit Converter - ToolNoveHub",
    description:
      "Convert length, weight, temperature, area, volume, and speed with a free online unit converter.",
    url: pageUrl,
    siteName: "ToolNoveHub",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Unit Converter - ToolNoveHub",
    description:
      "Convert length, weight, temperature, area, volume, and speed online.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const faqItems = [
  {
    question: "What units can I convert?",
    answer:
      "You can convert common length, weight, temperature, area, volume, and speed units.",
  },
  {
    question: "Is the Unit Converter free?",
    answer:
      "Yes. ToolNoveHub provides this converter free to use without requiring an account.",
  },
  {
    question: "How are temperature conversions calculated?",
    answer:
      "Celsius, Fahrenheit, and Kelvin require different formulas because their scales have different zero points and intervals.",
  },
  {
    question: "Are the conversion results rounded?",
    answer:
      "The underlying calculation uses JavaScript number arithmetic. Results are formatted to a practical number of decimal places for display, so the displayed value may be rounded.",
  },
  {
    question: "Does the converter upload my value?",
    answer:
      "The conversion calculation itself runs in your browser. No account is required for the basic conversion operation.",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Unit Converter",
  url: pageUrl,
  description:
    "Free online unit converter for length, weight, temperature, area, volume, and speed.",
  applicationCategory: "UtilitiesApplication",
  applicationSubCategory: "Unit Conversion",
  operatingSystem: "Any",
  browserRequirements: "Requires JavaScript",
  isAccessibleForFree: true,
  featureList: [
    "Length conversion",
    "Weight conversion",
    "Temperature conversion",
    "Area conversion",
    "Volume conversion",
    "Speed conversion",
    "Metric unit conversion",
    "Imperial unit conversion",
    "Unit swapping",
    "Browser-based calculations",
  ],
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function UnitConverterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <main className="min-h-screen bg-gray-50">
        <section className="border-b border-gray-200 bg-white">
          <div className="mx-auto max-w-5xl px-4 py-12 text-center sm:px-6 lg:px-8 lg:py-16">
            <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
              Utility Tool
            </span>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Unit Converter
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
              Convert length, weight, temperature, area, volume, and speed
              instantly with a simple browser-based unit converter.
            </p>
          </div>
        </section>

        <section className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
              <UnitConverter />
            </div>
          </div>
        </section>

        <section className="border-t border-gray-200 bg-white px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold text-gray-900">
              How to use the Unit Converter
            </h2>

            <ol className="mt-6 space-y-4 text-gray-600">
              <li>
                <strong className="text-gray-900">
                  1. Choose a category:
                </strong>{" "}
                Select length, weight, temperature, area, volume, or speed.
              </li>

              <li>
                <strong className="text-gray-900">
                  2. Enter a value:
                </strong>{" "}
                Type the number you want to convert.
              </li>

              <li>
                <strong className="text-gray-900">
                  3. Select the units:
                </strong>{" "}
                Choose the starting unit and the unit you want to convert to.
              </li>

              <li>
                <strong className="text-gray-900">
                  4. Read the result:
                </strong>{" "}
                The converted value updates automatically.
              </li>

              <li>
                <strong className="text-gray-900">
                  5. Swap when needed:
                </strong>{" "}
                Use the swap button to reverse the source and destination
                units.
              </li>
            </ol>
          </div>
        </section>

        <section className="bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold text-gray-900">
              Supported unit categories
            </h2>

            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <CategoryCard
                title="Length"
                text="Meters, kilometers, miles, yards, feet, inches, centimeters, and millimeters."
              />

              <CategoryCard
                title="Weight"
                text="Kilograms, grams, milligrams, pounds, ounces, tons, and stones."
              />

              <CategoryCard
                title="Temperature"
                text="Celsius, Fahrenheit, and Kelvin."
              />

              <CategoryCard
                title="Area"
                text="Square meters, square kilometers, square miles, acres, hectares, and square feet."
              />

              <CategoryCard
                title="Volume"
                text="Liters, milliliters, US gallons, quarts, pints, cups, and fluid ounces."
              />

              <CategoryCard
                title="Speed"
                text="Kilometers per hour, miles per hour, meters per second, knots, and feet per second."
              />
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold text-gray-900">
              Why use this Unit Converter?
            </h2>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <InfoCard
                title="Instant calculations"
                text="Results update automatically whenever you change the value or selected units."
              />

              <InfoCard
                title="Common everyday units"
                text="The converter includes widely used metric and imperial units for practical calculations."
              />

              <InfoCard
                title="Temperature formulas"
                text="Celsius, Fahrenheit, and Kelvin conversions use their corresponding mathematical relationships rather than simple scaling factors."
              />

              <InfoCard
                title="Browser-based processing"
                text="The conversion calculations run directly in your browser, so the basic conversion operation does not require sending your value to a server."
              />
            </div>
          </div>
        </section>

        <section className="bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold text-gray-900">
              Understanding unit conversion
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              Unit conversion changes a measurement from one unit into
              another equivalent unit. For many categories, the converter
              uses a common base unit and applies the appropriate conversion
              factor. Temperature is different because Celsius, Fahrenheit,
              and Kelvin use different zero points, so temperature conversion
              requires both scaling and an offset.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              Results are formatted for readability. Very large or very small
              values may be displayed using scientific notation, while
              ordinary values are shown with a practical number of decimal
              places.
            </p>
          </div>
        </section>

        <section className="bg-white px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold text-gray-900">
              Frequently asked questions
            </h2>

            <div className="mt-6 space-y-6">
              {faqItems.map((item) => (
                <Faq
                  key={item.question}
                  question={item.question}
                  answer={item.answer}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gray-50 px-4 pb-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold text-gray-900">
              Related tools
            </h2>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <RelatedTool href="/tools/calculator" title="Calculator" />

              <RelatedTool
                href="/tools/percentage-calculator"
                title="Percentage Calculator"
              />

              <RelatedTool
                href="/tools/file-size-converter"
                title="File Size Converter"
              />

              <RelatedTool
                href="/tools/number-to-words"
                title="Number to Words"
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

function CategoryCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <h3 className="font-semibold text-gray-900">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-gray-600">{text}</p>
    </div>
  );
}

function InfoCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <h3 className="font-semibold text-gray-900">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-gray-600">{text}</p>
    </div>
  );
}

function Faq({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  return (
    <div>
      <h3 className="font-semibold text-gray-900">{question}</h3>

      <p className="mt-2 leading-7 text-gray-600">{answer}</p>
    </div>
  );
}

function RelatedTool({
  href,
  title,
}: {
  href: string;
  title: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-xl border border-gray-200 bg-white p-4 text-center text-sm font-semibold text-gray-900 transition hover:border-blue-300 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      {title}
    </Link>
  );
}