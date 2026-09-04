import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, BookOpen, Calendar, Clock } from "lucide-react";
import { blogPosts } from "../data/posts";

const siteUrl = "https://toolnovehub.tools";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(
  { params }: BlogPostPageProps
): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    return { title: "Article Not Found | ToolNoveHub" };
  }

  const canonical = `${siteUrl}/blog/${post.slug}`;

  return {
    title: `${post.title} | ToolNoveHub`,
    description: post.excerpt,
    alternates: { canonical },
    openGraph: {
      type: "article",
      url: canonical,
      title: post.title,
      description: post.excerpt,
      siteName: "ToolNoveHub",
      publishedTime: post.date,
      authors: [post.author],
      images: [{ url: `${siteUrl}/icon.png`, width: 512, height: 512, alt: "ToolNoveHub" }],
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
    <section className="mt-14 border-t border-slate-200 pt-10" aria-labelledby="related-heading">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-indigo-600">Keep reading</p>
          <h2 id="related-heading" className="mt-1 text-2xl font-bold text-slate-900">
            More ToolNoveHub Guides
          </h2>
        </div>
        <Link href="/blog" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">
          View all articles <ArrowRight className="ml-1 inline h-4 w-4" aria-hidden="true" />
        </Link>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {related.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg"
          >
            <span className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
              {post.category}
            </span>
            <h3 className="mt-2 font-bold leading-6 text-slate-900 group-hover:text-indigo-700">
              {post.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) notFound();

  const canonical = `${siteUrl}/blog/${post.slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: post.author },
    publisher: { "@type": "Organization", name: "ToolNoveHub", url: siteUrl },
    mainEntityOfPage: canonical,
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 px-4 py-14 sm:py-20">
      <article className="mx-auto max-w-4xl">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-slate-500">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href="/" className="hover:text-indigo-600">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/blog" className="hover:text-indigo-600">Blog</Link></li>
            <li aria-hidden="true">/</li>
            <li className="max-w-[18rem] truncate text-slate-700">{post.title}</li>
          </ol>
        </nav>

        <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to Blog
        </Link>

        <header className="mt-7 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500">
            <span className="inline-flex items-center gap-1.5 font-semibold text-indigo-600">
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              {post.category}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-4 w-4" aria-hidden="true" />
              {post.date}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" aria-hidden="true" />
              {post.readTime}
            </span>
          </div>

          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            {post.title}
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            {post.excerpt}
          </p>

          <div className="mt-6 text-sm text-slate-500">
            Written by <span className="font-semibold text-slate-700">{post.author}</span>
          </div>
        </header>

        <div
          className="prose prose-slate mt-8 max-w-none rounded-3xl border border-slate-200 bg-white p-7 shadow-sm prose-headings:text-slate-900 prose-a:font-semibold prose-a:text-indigo-600 hover:prose-a:text-indigo-700 sm:p-10"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="mt-8 rounded-2xl border border-indigo-100 bg-indigo-50 p-6">
          <h2 className="text-xl font-bold text-slate-900">Ready to try a tool?</h2>
          <p className="mt-2 leading-7 text-slate-600">
            Explore ToolNoveHub&apos;s free online tools and choose the one that fits your task.
          </p>
          <Link href="/tools" className="mt-4 inline-flex items-center rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700">
            Explore Free Tools
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <RelatedPosts currentSlug={post.slug} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      </article>
    </main>
  );
}
