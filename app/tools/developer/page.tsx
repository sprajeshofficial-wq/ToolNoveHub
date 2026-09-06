import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Braces,
  Binary,
  Code2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Free Developer Tools",
  description:
    "Free online developer tools from ToolNoveHub for JSON formatting, binary conversion, and everyday coding tasks.",
  alternates: {
    canonical: "https://toolnovehub.tools/tools/developer",
  },
  openGraph: {
    type: "website",
    url: "https://toolnovehub.tools/tools/developer",
    title: "Free Developer Tools | ToolNoveHub",
    description:
      "Free online developer tools for JSON formatting, binary conversion, and everyday coding tasks.",
    siteName: "ToolNoveHub",
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

const developerTools = [
  {
    name: "JSON Formatter",
    slug: "json-formatter",
    description:
      "Format, beautify, minify, validate, and copy JSON data with a simple online tool.",
    icon: Braces,
  },
  {
    name: "Binary Converter",
    slug: "binary-converter",
    description:
      "Convert binary numbers to decimal and decimal numbers to binary quickly and accurately.",
    icon: Binary,
  },
];

export default function DeveloperToolsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
              <Code2 size={32} strokeWidth={2} />
            </div>

            <p className="mt-6 text-sm font-bold uppercase tracking-wide text-blue-600">
              Tool Category
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Free Developer Tools
            </h1>

            <p className="mt-5 text-lg leading-8 text-gray-600">
              Useful browser-based tools for developers, programmers,
              students, and technical users.
            </p>
          </div>
        </div>
      </section>

      {/* Main */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Developer Tools
            </h2>

            <p className="mt-1 text-sm text-gray-600">
              Choose a developer tool below.
            </p>
          </div>

          <Link
            href="/tools"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
          >
            View all tools
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Tool Cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {developerTools.map((tool) => {
            const Icon = tool.icon;

            return (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                    <Icon size={24} />
                  </div>

                  <ArrowRight
                    size={20}
                    className="text-gray-300 transition group-hover:translate-x-1 group-hover:text-blue-600"
                  />
                </div>

                <h3 className="mt-5 text-lg font-bold text-gray-900">
                  {tool.name}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {tool.description}
                </p>

                <div className="mt-5 text-sm font-semibold text-blue-600">
                  Open tool →
                </div>
              </Link>
            );
          })}
        </div>

        {/* Benefits */}
        <section className="mt-12 rounded-2xl border border-blue-100 bg-blue-50 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Developer tools made simple
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-600">
            ToolNoveHub provides simple online utilities that help developers
            work with common data formats and everyday technical tasks without
            installing additional software.
          </p>

          <div className="mt-7 grid gap-6 md:grid-cols-3">
            <div>
              <div className="text-2xl" aria-hidden="true">
                ⚡
              </div>

              <h3 className="mt-3 font-bold text-gray-900">
                Fast
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Quickly format or convert data directly in your browser.
              </p>
            </div>

            <div>
              <div className="text-2xl" aria-hidden="true">
                🧑‍💻
              </div>

              <h3 className="mt-3 font-bold text-gray-900">
                Developer friendly
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Designed for developers, programmers, students, and technical
                users.
              </p>
            </div>

            <div>
              <div className="text-2xl" aria-hidden="true">
                🔒
              </div>

              <h3 className="mt-3 font-bold text-gray-900">
                Browser based
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Supported tools process your data directly in your browser.
              </p>
            </div>
          </div>
        </section>

        {/* Popular Developer Tasks */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900">
            Popular developer tasks
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <h3 className="font-bold text-gray-900">
                Format JSON
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Make compressed or difficult-to-read JSON easier to understand
                and inspect.
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <h3 className="font-bold text-gray-900">
                Validate JSON
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Quickly check JSON syntax and identify invalid data.
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <h3 className="font-bold text-gray-900">
                Convert Binary
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Convert binary and decimal values for programming and learning.
              </p>
            </div>
          </div>
        </section>

        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mt-10 text-sm text-gray-500"
        >
          <Link
            href="/"
            className="transition hover:text-blue-600"
          >
            Home
          </Link>

          <span className="mx-2">/</span>

          <Link
            href="/tools"
            className="transition hover:text-blue-600"
          >
            Tools
          </Link>

          <span className="mx-2">/</span>

          <span className="text-gray-700">
            Developer
          </span>
        </nav>
      </section>
    </main>
  );
}