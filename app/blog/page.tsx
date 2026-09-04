import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { blogPosts } from "./data/posts";

export const metadata = {
  title: "ToolNoveHub Blog – Guides, Tips & Tutorials",
  description:
    "Helpful guides, tutorials, tips, and practical information about online tools, productivity, privacy, development, and everyday tasks.",
  alternates: {
    canonical: "https://toolnovehub.tools/blog",
  },
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-indigo-600">
            ToolNoveHub Blog
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Guides, Tips & Tutorials
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
            Practical guides and helpful tips for using online tools,
            improving productivity, working with data, and getting everyday
            tasks done more efficiently.
          </p>
        </div>
      </section>

      {/* Articles */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Latest Articles
            </h2>

            <p className="mt-2 text-gray-600">
              Explore our guides and tutorials.
            </p>
          </div>

          <span className="hidden rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700 sm:inline-block">
            {blogPosts.length} articles
          </span>
        </div>

        {blogPosts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-full flex-col p-6">
                  {/* Category */}
                  <div className="mb-4">
                    <span className="inline-flex rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                      {post.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold leading-snug text-gray-900 transition-colors group-hover:text-indigo-600">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      {post.title}
                    </Link>
                  </h3>

                  {/* Excerpt */}
                  <p className="mt-3 flex-1 text-sm leading-6 text-gray-600">
                    {post.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-gray-100 pt-4 text-xs text-gray-500">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-4 w-4" aria-hidden="true" />
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </time>
                    </span>

                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-4 w-4" aria-hidden="true" />
                      {post.readTime}
                    </span>
                  </div>

                  {/* Read link */}
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-semibold text-indigo-600 transition-colors hover:text-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Read article
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center">
            <h2 className="text-xl font-semibold text-gray-900">
              No articles available
            </h2>

            <p className="mt-2 text-gray-600">
              Please check back soon for new articles.
            </p>
          </div>
        )}
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Ready to try a free online tool?
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-gray-600">
            Explore ToolNoveHub&apos;s collection of free browser-based tools
            for productivity, development, images, text, calculations, and
            everyday tasks.
          </p>

          <Link
            href="/tools"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Explore All Tools
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}