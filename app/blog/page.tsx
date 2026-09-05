import Link from "next/link";
import { blogPosts } from "./data/posts";

export const metadata = {
  title: "Blog - ToolNoveHub",
  description:
    "Helpful guides, tutorials, and practical tips for using online tools and improving everyday digital workflows.",
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="border-b bg-gradient-to-b from-indigo-50 to-white">
        <div className="mx-auto max-w-6xl px-6 py-16 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-indigo-600">
            ToolNoveHub Blog
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Helpful Guides &amp; Tutorials
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
            Practical guides, tutorials, and useful tips to help you get more
            done with simple online tools.
          </p>

          <p className="mt-4 text-sm text-gray-500">
            {blogPosts.length} articles
          </p>
        </div>
      </section>

      {/* Blog Articles */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex flex-1 flex-col p-6">
                {/* Category */}
                <div className="mb-4">
                  <span className="inline-flex rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                    {post.category}
                  </span>
                </div>

                {/* Article Title */}
                <h2 className="text-xl font-bold leading-7 text-gray-900 transition-colors group-hover:text-indigo-600">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>

                {/* Article Excerpt */}
                <p className="mt-3 flex-1 text-sm leading-6 text-gray-600">
                  {post.excerpt}
                </p>

                {/* Article Meta */}
                <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-gray-100 pt-4 text-sm text-gray-500">
                  <span>{post.date}</span>

                  <span aria-hidden="true">•</span>

                  <span>{post.readTime}</span>
                </div>

                {/* Read Article Link */}
                <div className="mt-5">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center font-semibold text-indigo-600 transition-colors hover:text-indigo-800"
                  >
                    Read article
                    <span
                      aria-hidden="true"
                      className="ml-2 transition-transform duration-200 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Tools CTA */}
      <section className="border-t bg-gray-50">
        <div className="mx-auto max-w-4xl px-6 py-14 text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Ready to try the tools?
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-gray-600">
            Explore our collection of free online tools for calculations,
            images, text, development, and everyday tasks.
          </p>

          <div className="mt-6">
            <Link
              href="/tools"
              className="inline-flex items-center rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-indigo-700"
            >
              Explore all tools

              <span aria-hidden="true" className="ml-2">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}