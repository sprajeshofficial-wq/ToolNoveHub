import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Lightbulb, Wrench } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Read helpful guides, tips, tutorials, and articles about online tools, productivity, development, and everyday digital tasks.",
  alternates: {
    canonical: "https://toolnovehub.tools/blog",
  },
  openGraph: {
    title: "ToolNoveHub Blog",
    description:
      "Helpful guides, tutorials, tips, and practical information from ToolNoveHub.",
    url: "https://toolnovehub.tools/blog",
    siteName: "ToolNoveHub",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const articles = [
  {
    title: "10 Free Online Tools That Can Make Everyday Tasks Easier",
    description:
      "Discover practical online tools for calculations, text, images, development, and other common digital tasks.",
    category: "Tools",
    date: "September 3, 2026",
    href: "#",
    icon: Wrench,
  },
  {
    title: "How to Choose the Right Online Tool for a Task",
    description:
      "A simple guide to choosing online tools based on speed, ease of use, privacy, and the type of task you need to complete.",
    category: "Guides",
    date: "September 3, 2026",
    href: "#",
    icon: Lightbulb,
  },
  {
    title: "Useful Online Tools for Students and Professionals",
    description:
      "Explore practical tools that can help with studying, writing, calculations, file preparation, and everyday productivity.",
    category: "Productivity",
    date: "September 3, 2026",
    href: "#",
    icon: BookOpen,
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
            <BookOpen size={32} />
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            ToolNoveHub Blog
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            Helpful guides, practical tips, tutorials, and ideas to help you
            get more done with simple online tools.
          </p>
        </div>
      </section>

      {/* Articles */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Latest Articles
            </h2>

            <p className="mt-4 text-gray-600">
              Explore useful information about online tools and everyday
              digital tasks.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => {
              const Icon = article.icon;

              return (
                <article
                  key={article.title}
                  className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                      <Icon size={22} />
                    </div>

                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                      {article.category}
                    </span>
                  </div>

                  <h3 className="mt-6 text-xl font-semibold leading-7 text-gray-900">
                    {article.title}
                  </h3>

                  <p className="mt-3 flex-1 text-sm leading-6 text-gray-600">
                    {article.description}
                  </p>

                  <div className="mt-6 border-t border-gray-100 pt-5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {article.date}
                      </span>

                      {article.href === "#" ? (
                        <span className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600">
                          Coming soon
                        </span>
                      ) : (
                        <Link
                          href={article.href}
                          className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
                        >
                          Read article
                          <ArrowRight size={16} />
                        </Link>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tools CTA */}
      <section className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Looking for a useful tool?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Explore the ToolNoveHub collection of free online tools for
            calculations, images, text, development, and more.
          </p>

          <div className="mt-8">
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Explore All Tools
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}