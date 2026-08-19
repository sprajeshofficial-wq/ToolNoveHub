import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, Clock, ArrowLeft, BookOpen, Tag, User } from 'lucide-react';
import { blogPosts } from '../data/posts';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const post = blogPosts.find(p => p.slug === params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | ToolNoveHub Blog`,
    description: post.excerpt,
    keywords: post.tags.join(', '),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
    },
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find(p => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  // Get related posts (same category, excluding current)
  const relatedPosts = blogPosts
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  // Get all tags
  const allTags = post.tags;

  return (
    <div className="min-h-screen py-20 px-4 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <div className="mx-auto max-w-4xl">
        {/* Back Button */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-indigo-600 transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>

        {/* Post Card */}
        <article className="rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 p-8 shadow-xl">
          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
            <span className="rounded-full bg-indigo-50 px-3 py-0.5 text-xs font-medium text-indigo-600">
              {post.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {new Date(post.date).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {post.readTime}
            </span>
          </div>

          {/* Title */}
          <h1 className="mt-4 text-3xl font-bold text-slate-900">{post.title}</h1>

          {/* Author */}
          <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
            <User className="h-4 w-4" />
            <span>{post.author}</span>
          </div>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {allTags.map((tag) => (
              <span key={tag} className="text-xs text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full">
                #{tag}
              </span>
            ))}
          </div>

          {/* Content */}
          <div className="mt-6 prose prose-slate max-w-none">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>

          {/* Share */}
          <div className="mt-8 pt-6 border-t border-slate-200/50">
            <p className="text-sm font-medium text-slate-700">Share this post:</p>
            <div className="mt-2 flex gap-2">
              <button className="rounded-lg bg-slate-100 px-4 py-2 text-sm text-slate-600 hover:bg-slate-200 transition-colors">
                📋 Copy Link
              </button>
              <button className="rounded-lg bg-slate-100 px-4 py-2 text-sm text-slate-600 hover:bg-slate-200 transition-colors">
                🐦 Twitter
              </button>
              <button className="rounded-lg bg-slate-100 px-4 py-2 text-sm text-slate-600 hover:bg-slate-200 transition-colors">
                💼 LinkedIn
              </button>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Related Posts</h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {relatedPosts.map((related) => (
                <Link
                  key={related.id}
                  href={`/blog/${related.slug}`}
                  className="group block rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 p-5 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
                >
                  <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-600">
                    {related.category}
                  </span>
                  <h4 className="mt-2 font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {related.title}
                  </h4>
                  <p className="mt-1 text-sm text-slate-500 line-clamp-2">{related.excerpt}</p>
                  <span className="mt-3 inline-block text-sm font-medium text-indigo-600 group-hover:gap-2 transition-all">
                    Read More →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Back to Top */}
        <div className="mt-8 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-indigo-600 transition-colors"
          >
            <BookOpen className="h-4 w-4" />
            View All Blog Posts
          </Link>
        </div>
      </div>
    </div>
  );
}