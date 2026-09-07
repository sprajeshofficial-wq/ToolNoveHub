import type { Metadata } from "next";
import Link from "next/link";
import JSONValidator from "./JSONValidator";

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
    canonical: "https://toolnovehub.tools/tools/json-validator",
  },
  openGraph: {
    title: "JSON Validator - Validate JSON Online",
    description:
      "Validate JSON syntax and format valid JSON directly in your browser.",
    url: "https://toolnovehub.tools/tools/json-validator",
    type: "website",
    images: [
      {
        url: "https://toolnovehub.tools/og-json-validator.jpg",
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
    images: ["https://toolnovehub.tools/og-json-validator.jpg"],
  },
};

export default function JSONValidatorPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "JSON Validator",
    description:
      "Validate JSON syntax and format valid JSON directly in your browser.",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "All",
    browserRequirements: "Requires JavaScript",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
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
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <JSONValidator />
        </section>

        <section
          aria-labelledby="how-to-use"
          className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8"
        >
          <h2
            id="how-to-use"
            className="text-xl font-bold text-gray-900"
          >
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
          <h2
            id="common-errors"
            className="text-xl font-bold text-gray-900"
          >
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
          <h2
            id="what-is-json"
            className="text-xl font-bold text-gray-900"
          >
            What is JSON?
          </h2>

          <p className="mt-4 text-sm leading-7 text-gray-600">
            JSON stands for JavaScript Object Notation. It is a lightweight
            text format used to represent structured data and is commonly used
            by web applications, APIs, configuration files, and software
            systems.
          </p>

          <p className="mt-4 text-sm leading-7 text-gray-600">
            JSON supports objects, arrays, strings, numbers, booleans, and
            null values. Because JSON follows strict syntax rules, even a small
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
            browser using JavaScript. The tool does not require an account or a
            separate server-side JSON processing service.
          </p>

          <p className="mt-4 text-sm leading-7 text-gray-600">
            Your JSON does not need to be uploaded to a remote JSON validation
            service for these operations. As with any website, review the
            ToolNoveHub Privacy Policy for information about site-level
            analytics and other services.
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
            <div>
              <h3 className="font-semibold text-gray-900">
                What does a JSON validator check?
              </h3>

              <p className="mt-1">
                It parses the JSON and checks whether the document follows
                valid JSON syntax.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                Can the validator find every programming error?
              </h3>

              <p className="mt-1">
                No. It checks JSON syntax and parsing validity. It does not
                determine whether the data is logically correct for your
                application or API.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                Can I format valid JSON?
              </h3>

              <p className="mt-1">
                Yes. After parsing valid JSON, the Format JSON button adds
                indentation and line breaks to make the structure easier to
                read.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                Do I need to install anything?
              </h3>

              <p className="mt-1">
                No. The tool works in a modern web browser with JavaScript
                enabled.
              </p>
            </div>
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
    </div>
  );
}