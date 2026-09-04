import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Calendar,
  Clock,
  ExternalLink,
} from "lucide-react";
import { blogPosts } from "../data/posts";

const siteUrl = "https://toolnovehub.tools";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    return {
      title: "Article Not Found | ToolNoveHub",
    };
  }

  const canonical = `${siteUrl}/blog/${post.slug}`;

  return {
    title: `${post.title} | ToolNoveHub`,
    description: post.excerpt,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "article",
      url: canonical,
      title: post.title,
      description: post.excerpt,
      siteName: "ToolNoveHub",
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: `${siteUrl}/icon.png`,
          width: 512,
          height: 512,
          alt: "ToolNoveHub",
        },
      ],
    },
    twitter: {
      card: "summary",
      title: post.title,
      description: post.excerpt,
    },
  };
}

function RelatedPosts({ currentSlug }: { currentSlug: string }) {
  const related = blogPosts
    .filter((post) => post.slug !== currentSlug)
    .slice(0, 3);

  return (
    <section
      className="mt-14 border-t border-slate-200 pt-10"
      aria-labelledby="related-heading"
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-indigo-600">
            Keep reading
          </p>

          <h2
            id="related-heading"
            className="mt-1 text-2xl font-bold text-slate-900"
          >
            More ToolNoveHub Guides
          </h2>
        </div>

        <Link
          href="/blog"
          className="inline-flex items-center text-sm font-semibold text-indigo-600 transition hover:text-indigo-800"
        >
          View all articles
          <ArrowRight
            className="ml-1 h-4 w-4"
            aria-hidden="true"
          />
        </Link>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {related.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg"
          >
            <span className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
              {post.category}
            </span>

            <h3 className="mt-2 font-bold leading-6 text-slate-900 transition group-hover:text-indigo-700">
              {post.title}
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              {post.excerpt}
            </p>

            <span className="mt-4 inline-flex items-center text-sm font-semibold text-indigo-600">
              Read guide
              <ArrowRight
                className="ml-1 h-4 w-4"
                aria-hidden="true"
              />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default async function BlogPostPage({
  params,
}: BlogPostPageProps) {
  const { slug } = await params;

  const post = blogPosts.find(
    (item) => item.slug === slug
  );

  if (!post) {
    notFound();
  }

  const canonical = `${siteUrl}/blog/${post.slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "ToolNoveHub",
      url: siteUrl,
    },
    mainEntityOfPage: canonical,
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 px-4 py-12 sm:py-16">
      <article className="mx-auto max-w-4xl">

        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-7 text-sm text-slate-500"
        >
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link
                href="/"
                className="font-medium transition hover:text-indigo-600"
              >
                Home
              </Link>
            </li>

            <li aria-hidden="true">/</li>

            <li>
              <Link
                href="/blog"
                className="font-medium transition hover:text-indigo-600"
              >
                Blog
              </Link>
            </li>

            <li aria-hidden="true">/</li>

            <li className="max-w-[18rem] truncate text-slate-700">
              {post.title}
            </li>
          </ol>
        </nav>

        {/* Back to blog */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 transition hover:text-indigo-800"
        >
          <ArrowLeft
            className="h-4 w-4"
            aria-hidden="true"
          />
          Back to Blog
        </Link>

        {/* Article header */}
        <header className="mt-7 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-slate-500">
            <span className="inline-flex items-center gap-1.5 font-semibold text-indigo-600">
              <BookOpen
                className="h-4 w-4"
                aria-hidden="true"
              />
              {post.category}
            </span>

            <span className="inline-flex items-center gap-1.5">
              <Calendar
                className="h-4 w-4"
                aria-hidden="true"
              />
              {post.date}
            </span>

            <span className="inline-flex items-center gap-1.5">
              <Clock
                className="h-4 w-4"
                aria-hidden="true"
              />
              {post.readTime}
            </span>
          </div>

          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl sm:leading-tight">
            {post.title}
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            {post.excerpt}
          </p>

          <div className="mt-6 border-t border-slate-100 pt-5 text-sm text-slate-500">
            Written by{" "}
            <span className="font-semibold text-slate-700">
              {post.author}
            </span>
          </div>
        </header>

        {/* Article content */}
        <div
          className="
            mt-8 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10

            text-[16px] leading-8 text-slate-700

            [&_h2]:mb-4
            [&_h2]:mt-10
            [&_h2]:text-2xl
            [&_h2]:font-bold
            [&_h2]:leading-tight
            [&_h2]:text-slate-900

            [&_h3]:mb-3
            [&_h3]:mt-8
            [&_h3]:text-xl
            [&_h3]:font-bold
            [&_h3]:text-slate-900

            [&_p]:mb-5
            [&_p]:leading-8

            [&_strong]:font-bold
            [&_strong]:text-slate-900

            [&_ul]:mb-6
            [&_ul]:ml-6
            [&_ul]:list-disc
            [&_ul]:space-y-2

            [&_ol]:mb-6
            [&_ol]:ml-6
            [&_ol]:list-decimal
            [&_ol]:space-y-2

            [&_li]:pl-1

            [&_a]:font-bold
            [&_a]:text-indigo-600
            [&_a]:underline
            [&_a]:decoration-indigo-300
            [&_a]:underline-offset-4
            [&_a]:transition-colors
            [&_a:hover]:text-indigo-800
            [&_a:hover]:decoration-indigo-600

            [&_blockquote]:my-7
            [&_blockquote]:border-l-4
            [&_blockquote]:border-indigo-400
            [&_blockquote]:bg-indigo-50
            [&_blockquote]:px-5
            [&_blockquote]:py-4
            [&_blockquote]:rounded-r-xl

            [&_code]:rounded
            [&_code]:bg-slate-100
            [&_code]:px-1.5
            [&_code]:py-0.5
            [&_code]:text-sm
            [&_code]:text-indigo-700
          "
          dangerouslySetInnerHTML={{
            __html: post.content,
          }}
        />

        {/* Tool CTA */}
        <section
          className="mt-8 overflow-hidden rounded-3xl border border-indigo-200 bg-gradient-to-br from-indigo-50 to-white p-7 shadow-sm sm:p-8"
          aria-labelledby="tool-cta-heading"
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-2 inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-indigo-700">
                ToolNoveHub Tools
              </div>

              <h2
                id="tool-cta-heading"
                className="text-xl font-bold text-slate-900 sm:text-2xl"
              >
                Ready to put this guide into practice?
              </h2>

              <p className="mt-2 max-w-2xl leading-7 text-slate-600">
                Use ToolNoveHub&apos;s free online tools to complete
                everyday tasks quickly and easily.
              </p>
            </div>

            <Link
              href="/tools"
              className="inline-flex shrink-0 items-center justify-center rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-indigo-700 hover:shadow-md"
            >
              Explore Free Tools
              <ArrowRight
                className="ml-2 h-4 w-4"
                aria-hidden="true"
              />
            </Link>
          </div>
        </section>

        {/* Article navigation */}
        <div className="mt-8 flex flex-col gap-3 border-t border-slate-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-semibold text-indigo-600 transition hover:text-indigo-800"
          >
            <ArrowLeft
              className="h-4 w-4"
              aria-hidden="true"
            />
            Browse all guides
          </Link>

          <Link
            href="/tools"
            className="inline-flex items-center gap-2 font-semibold text-indigo-600 transition hover:text-indigo-800"
          >
            Explore tools
            <ExternalLink
              className="h-4 w-4"
              aria-hidden="true"
            />
          </Link>
        </div>

        {/* Related posts */}
        <RelatedPosts currentSlug={post.slug} />

        {/* Article structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleSchema),
          }}
        />
      </article>
    </main>
  );
}