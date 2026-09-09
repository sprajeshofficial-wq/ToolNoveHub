import type { Metadata } from "next";
import Link from "next/link";
import JSONValidator from "./JSONValidator";

const siteUrl = "https://toolnovehub.tools";
const pageUrl = `${siteUrl}/tools/json-validator`;

export const metadata: Metadata = {
  title: "JSON Validator - Validate JSON Online",
  description:
    "Validate JSON online, check syntax errors, and format valid JSON with a fast browser-based JSON validator.",
  keywords: [
    "json validator",
    "validate json",
    "json checker",
    "json syntax validator",
    "json verifier",
    "validate json online",
    "json parser",
    "json error checker",
  ],
  alternates: {
    canonical: pageUrl,
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
  openGraph: {
    title: "JSON Validator - Validate JSON Online",
    description:
      "Validate JSON syntax and format valid JSON directly in your browser.",
    url: pageUrl,
    type: "website",
    images: [
      {
        url: `${siteUrl}/og-json-validator.jpg`,
        width: 1200,
        height: 630,
        alt: "JSON Validator - ToolNoveHub",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JSON Validator - Validate JSON Online",
    description:
      "Validate JSON syntax and format valid JSON directly in your browser.",
    images: [`${siteUrl}/og-json-validator.jpg`],
  },
};

const faqItems = [
  {
    question: "What does a JSON validator check?",
    answer:
      "It parses the JSON and checks whether the document follows valid JSON syntax.",
  },
  {
    question: "Can the validator find every programming error?",
    answer:
      "No. It checks JSON syntax and parsing validity. It does not determine whether the data is logically correct for your application or API.",
  },
  {
    question: "Can I format valid JSON?",
    answer:
      "Yes. After parsing valid JSON, the Format JSON button adds indentation and line breaks to make the structure easier to read.",
  },
  {
    question: "Do I need to install anything?",
    answer:
      "No. The tool works in a modern web browser with JavaScript enabled.",
  },
];

export default function JSONValidatorPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "JSON Validator",
    url: pageUrl,
    description:
      "Validate JSON syntax and format valid JSON directly in your browser.",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "All",
    browserRequirements: "Requires JavaScript",
    featureList: [
      "Validate JSON syntax",
      "Identify JSON parsing errors",
      "Format valid JSON",
      "Copy JSON output",
      "Browser-based JSON processing",
    ],
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  const faqSchemaData = {
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

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
              Developer Tool
            </p>

            <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              JSON Validator
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-600">
              Validate JSON syntax, identify parsing errors, and format valid
              JSON directly in your browser.
            </p>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <section
          aria-labelledby="validator-tool-heading"
          className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <h2 id="validator-tool-heading" className="sr-only">
            JSON Validator Tool
          </h2>

          <JSONValidator />
        </section>

        <section
          aria-labelledby="how-to-use"
          className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8"
        >
          <h2 id="how-to-use" className="text-xl font-bold text-gray-900">
            How to use the JSON Validator
          </h2>

          <ol className="mt-5 space-y-3 text-sm leading-7 text-gray-600">
            <li>
              <strong className="text-gray-900">1.</strong> Paste or type your
              JSON into the input area.
            </li>

            <li>
              <strong className="text-gray-900">2.</strong> Select{" "}
              <strong className="text-gray-900">Validate JSON</strong> to check
              the syntax.
            </li>

            <li>
              <strong className="text-gray-900">3.</strong> If the JSON is
              invalid, review the parser error and check your syntax.
            </li>

            <li>
              <strong className="text-gray-900">4.</strong> Use{" "}
              <strong className="text-gray-900">Format JSON</strong> to make
              valid JSON easier to read.
            </li>

            <li>
              <strong className="text-gray-900">5.</strong> Use{" "}
              <strong className="text-gray-900">Copy</strong> to copy the JSON
              when needed.
            </li>
          </ol>
        </section>

        <section
          aria-labelledby="common-errors"
          className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8"
        >
          <h2 id="common-errors" className="text-xl font-bold text-gray-900">
            Common JSON syntax errors
          </h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-gray-50 p-4">
              <h3 className="font-semibold text-gray-900">
                Trailing commas
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                JSON does not allow an extra comma after the final property in
                an object or the final item in an array.
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <h3 className="font-semibold text-gray-900">
                Incorrect quotation marks
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                JSON strings and property names use double quotation marks,
                rather than single quotation marks.
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <h3 className="font-semibold text-gray-900">
                Missing commas
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Properties and array items generally need commas between them.
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <h3 className="font-semibold text-gray-900">
                Unclosed brackets
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Every JSON object and array needs its corresponding closing
                bracket or brace.
              </p>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="what-is-json"
          className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8"
        >
          <h2 id="what-is-json" className="text-xl font-bold text-gray-900">
            What is JSON?
          </h2>

          <p className="mt-4 text-sm leading-7 text-gray-600">
            JSON stands for JavaScript Object Notation. It is a lightweight
            text format used to represent structured data and is commonly used
            by web applications, APIs, configuration files, and software
            systems.
          </p>

          <p className="mt-4 text-sm leading-7 text-gray-600">
            JSON supports objects, arrays, strings, numbers, booleans, and null
            values. Because JSON follows strict syntax rules, even a small
            punctuation or quotation error can make a document invalid.
          </p>
        </section>

        <section
          aria-labelledby="browser-processing"
          className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8"
        >
          <h2
            id="browser-processing"
            className="text-xl font-bold text-gray-900"
          >
            Browser-based JSON validation
          </h2>

          <p className="mt-4 text-sm leading-7 text-gray-600">
            JSON validation and formatting are performed directly in your
            browser using JavaScript. The tool does not require an account or
            a separate server-side JSON processing service.
          </p>

          <p className="mt-4 text-sm leading-7 text-gray-600">
            Your JSON does not need to be uploaded to a remote JSON validation
            service for these operations. As with any website, review the
            ToolNoveHub Privacy Policy for information about site-level
            analytics and other services.
          </p>

          <p className="mt-4 text-sm leading-7 text-gray-600">
            For sensitive information, avoid entering confidential credentials,
            private keys, passwords, or other data that you would not normally
            place into a public website.
          </p>
        </section>

        <section
          aria-labelledby="faq"
          className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8"
        >
          <h2 id="faq" className="text-xl font-bold text-gray-900">
            JSON Validator FAQ
          </h2>

          <div className="mt-5 space-y-5 text-sm leading-7 text-gray-600">
            {faqItems.map((item) => (
              <div key={item.question}>
                <h3 className="font-semibold text-gray-900">
                  {item.question}
                </h3>

                <p className="mt-1">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section
          aria-labelledby="related-tools"
          className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8"
        >
          <h2
            id="related-tools"
            className="text-xl font-bold text-gray-900"
          >
            Related Developer Tools
          </h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            <Link
              href="/tools/json-formatter"
              className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-center text-sm font-semibold text-gray-900 transition hover:border-blue-300 hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              JSON Formatter
            </Link>

            <Link
              href="/tools/text-to-slug"
              className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-center text-sm font-semibold text-gray-900 transition hover:border-blue-300 hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Text to Slug
            </Link>

            <Link
              href="/tools/binary-converter"
              className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-center text-sm font-semibold text-gray-900 transition hover:border-blue-300 hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Binary Converter
            </Link>

            <Link
              href="/tools/color-picker"
              className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-center text-sm font-semibold text-gray-900 transition hover:border-blue-300 hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Color Picker
            </Link>
          </div>
        </section>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaData),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchemaData),
        }}
      />
    </div>
  );
}