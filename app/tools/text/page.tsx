import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Free Text Tools",
  description:
    "Use free online text tools including Word Counter, Text to Slug, Text Repeater, and Text to ASCII Converter.",
  alternates: {
    canonical: "https://toolnovehub.tools/tools/text",
  },
};

const tools = [
  {
    name: "Word Counter",
    description:
      "Count words, characters, sentences, paragraphs, lines, and reading time.",
    href: "/tools/word-counter",
  },
  {
    name: "Text to Slug",
    description:
      "Convert text into clean, URL-friendly slugs for websites and applications.",
    href: "/tools/text-to-slug",
  },
  {
    name: "Text Repeater",
    description:
      "Repeat text multiple times quickly and copy the generated result.",
    href: "/tools/text-repeater",
  },
  {
    name: "Text to ASCII",
    description:
      "Convert text characters into their ASCII character codes instantly.",
    href: "/tools/text-to-ascii",
  },
];

export default function TextToolsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-12 text-center sm:px-6 lg:px-8 lg:py-16">
          <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
            Text Tools
          </span>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Free Text Tools
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
            Simple and useful online text tools for writing, formatting,
            converting, and everyday productivity.
          </p>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 sm:grid-cols-2">
            {tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
              >
                <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600">
                  {tool.name}
                </h2>

                <p className="mt-3 leading-7 text-gray-600">
                  {tool.description}
                </p>

                <span className="mt-5 inline-block text-sm font-semibold text-blue-600">
                  Use Tool →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-gray-200 bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-900">
            Text tools for everyday tasks
          </h2>

          <p className="mt-4 leading-7 text-gray-600">
            ToolNoveHub provides browser-based text utilities designed to make
            common writing and text-processing tasks faster and easier. No
            account is required to use these tools.
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
              <h3 className="font-semibold text-gray-900">
                Writing and counting
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Analyze text with the Word Counter and quickly understand word
                and character counts.
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
              <h3 className="font-semibold text-gray-900">
                Text conversion
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Convert text into URL slugs, ASCII codes, or repeated text
                output with simple browser-based tools.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-4 pb-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Explore more free tools
          </h2>

          <p className="mt-3 text-gray-600">
            Browse all ToolNoveHub tools for calculators, developer tasks,
            images, design, and more.
          </p>

          <Link
            href="/tools"
            className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            View All Tools
          </Link>
        </div>
      </section>
    </main>
  );
}