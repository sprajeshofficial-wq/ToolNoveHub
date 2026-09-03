import Link from "next/link";
import {
  ArrowRight,
  FileText,
  Type,
  Repeat2,
  Link2,
} from "lucide-react";

const textTools = [
  {
    name: "Word Counter",
    slug: "word-counter",
    description:
      "Count words, characters, sentences, paragraphs, lines, and estimated reading time.",
    icon: FileText,
  },
  {
    name: "Text to Slug",
    slug: "text-to-slug",
    description:
      "Convert text into clean, SEO-friendly URL slugs for websites, blogs, and pages.",
    icon: Link2,
  },
  {
    name: "Text Repeater",
    slug: "text-repeater",
    description:
      "Repeat text multiple times quickly with a simple browser-based text tool.",
    icon: Repeat2,
  },
  {
    name: "Text to ASCII",
    slug: "text-to-ascii",
    description:
      "Convert text into ASCII character codes for programming, learning, and technical tasks.",
    icon: Type,
  },
];

export const metadata = {
  title: "Free Text Tools",
  description:
    "Free online text tools from ToolNoveHub for counting, converting, repeating, and working with text.",
  alternates: {
    canonical: "https://toolnovehub.tools/tools/text",
  },
};

export default function TextToolsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* HERO */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
              <Type size={32} strokeWidth={2} />
            </div>

            <p className="mt-6 text-sm font-bold uppercase tracking-wide text-blue-600">
              Tool Category
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Free Text Tools
            </h1>

            <p className="mt-5 text-lg leading-8 text-gray-600">
              Simple online tools for counting, converting,
              repeating, and working with text.
            </p>
          </div>
        </div>
      </section>

      {/* MAIN */}
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Text Tools
            </h2>

            <p className="mt-1 text-sm text-gray-600">
              Choose a text tool below.
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

        {/* TOOL CARDS */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {textTools.map((tool) => {
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

        {/* BENEFITS */}
        <section className="mt-12 rounded-2xl border border-blue-100 bg-blue-50 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Simple tools for everyday text tasks
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-600">
            ToolNoveHub makes common text tasks easier with
            fast, simple tools that work directly in your
            browser.
          </p>

          <div className="mt-7 grid gap-6 md:grid-cols-3">
            <div>
              <div className="text-2xl">📝</div>

              <h3 className="mt-3 font-bold text-gray-900">
                Write and edit
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Analyze and work with text quickly without
                installing additional software.
              </p>
            </div>

            <div>
              <div className="text-2xl">🔗</div>

              <h3 className="mt-3 font-bold text-gray-900">
                SEO-friendly text
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Create clean URL slugs for websites, articles,
                and online content.
              </p>
            </div>

            <div>
              <div className="text-2xl">🔒</div>

              <h3 className="mt-3 font-bold text-gray-900">
                Browser based
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Supported text processing happens directly in
                your browser.
              </p>
            </div>
          </div>
        </section>

        {/* COMMON TASKS */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900">
            Common text tasks
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <h3 className="font-bold text-gray-900">
                Count words and characters
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Check word and character counts for articles,
                assignments, posts, and documents.
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <h3 className="font-bold text-gray-900">
                Create URL slugs
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Turn titles and phrases into clean,
                readable URL-friendly slugs.
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <h3 className="font-bold text-gray-900">
                Convert text
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Convert text into useful formats for
                programming and technical work.
              </p>
            </div>
          </div>
        </section>

        {/* PRIVACY */}
        <section className="mt-12 rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-bold text-gray-900">
            Privacy-focused text tools
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-600">
            Supported text tools are designed to process your
            input locally in your browser. Avoid entering
            sensitive information into any online service
            unless you are comfortable doing so.
          </p>
        </section>

        {/* BREADCRUMB */}
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
            Text
          </span>
        </nav>
      </main>
    </div>
  );
}