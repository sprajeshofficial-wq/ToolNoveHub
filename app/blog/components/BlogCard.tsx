'use client';

import Link from 'next/link';
import { Calendar, Clock, Tag } from 'lucide-react';
import { BlogPost } from '../data/posts';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-indigo-200">
        {/* Category Badge */}
        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
          <span className="rounded-full bg-indigo-50 px-3 py-0.5 text-xs font-medium text-indigo-600">
            {post.category}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {new Date(post.date).toLocaleDateString('en-US', {
              month: 'short',
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
        <h2 className="mt-3 text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
          {post.title}
        </h2>

        {/* Excerpt */}
        <p className="mt-2 text-slate-600 line-clamp-2">{post.excerpt}</p>

        {/* Tags */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {post.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-xs text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full">
              #{tag}
            </span>
          ))}
          {post.tags.length > 3 && (
            <span className="text-xs text-slate-400">+{post.tags.length - 3} more</span>
          )}
        </div>

        {/* Read More */}
        <div className="mt-4 flex items-center gap-1 text-sm font-medium text-indigo-600 group-hover:gap-2 transition-all">
          <span>Read More</span>
          <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
        </div>
      </article>
    </Link>
  );
}