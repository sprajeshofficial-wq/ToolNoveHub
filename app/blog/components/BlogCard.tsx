import Link from 'next/link';
import { Calendar, Clock } from 'lucide-react';
import { BlogPost } from '../data/posts';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block"
      aria-label={`Read ${post.title}`}
    >
      <article className="rounded-2xl border border-slate-200/50 bg-white/80 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl">
        {/* Category and Metadata */}
        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
          <span className="rounded-full bg-indigo-50 px-3 py-0.5 text-xs font-medium text-indigo-600">
            {post.category}
          </span>

          <time
            dateTime={post.date}
            className="flex items-center gap-1"
          >
            <Calendar
              className="h-3 w-3"
              aria-hidden="true"
            />
            {new Date(post.date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </time>

          <span className="flex items-center gap-1">
            <Clock
              className="h-3 w-3"
              aria-hidden="true"
            />
            {post.readTime}
          </span>
        </div>

        {/* Title */}
        <h2 className="mt-3 text-xl font-bold text-slate-900 transition-colors group-hover:text-indigo-600">
          {post.title}
        </h2>

        {/* Excerpt */}
        <p className="mt-2 line-clamp-2 text-slate-600">
          {post.excerpt}
        </p>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div
            className="mt-3 flex flex-wrap gap-1.5"
            aria-label="Article tags"
          >
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-slate-50 px-2 py-0.5 text-xs text-slate-400"
              >
                #{tag}
              </span>
            ))}

            {post.tags.length > 3 && (
              <span className="text-xs text-slate-400">
                +{post.tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Read More */}
        <div className="mt-4 flex items-center gap-1 text-sm font-medium text-indigo-600 transition-all group-hover:gap-2">
          <span>Read More</span>
          <span
            className="inline-block transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          >
            →
          </span>
        </div>
      </article>
    </Link>
  );
}