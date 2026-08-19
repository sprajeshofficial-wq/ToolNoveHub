import Link from 'next/link';
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';

// Blog posts data
const blogPosts = [
  {
    id: 1,
    title: '10 Free Online Tools Every Developer Needs in 2025',
    excerpt: 'From QR code generators to JSON formatters, these tools will save you hours of work.',
    category: 'Developer',
    date: 'August 18, 2026',
    readTime: '5 min read',
    slug: '10-free-online-tools-every-developer-needs',
  },
  {
    id: 2,
    title: 'How to Create a QR Code for Wi-Fi in 30 Seconds',
    excerpt: 'Share your Wi-Fi network instantly with a QR code. No more typing long passwords.',
    category: 'Tutorial',
    date: 'August 15, 2026',
    readTime: '3 min read',
    slug: 'how-to-create-qr-code-for-wifi',
  },
  {
    id: 3,
    title: 'The Best Image Resizer Tools for Social Media in 2025',
    excerpt: 'Get the perfect dimensions for Instagram, Twitter, LinkedIn, and Facebook.',
    category: 'Design',
    date: 'August 12, 2026',
    readTime: '4 min read',
    slug: 'best-image-resizer-tools-for-social-media',
  },
  {
    id: 4,
    title: 'Percentage Calculator: 5 Ways to Use It in Daily Life',
    excerpt: 'From calculating tips to understanding discounts, here\'s how to use percentage calculators.',
    category: 'Life Hacks',
    date: 'August 10, 2026',
    readTime: '4 min read',
    slug: 'percentage-calculator-daily-life',
  },
  {
    id: 5,
    title: 'JSON Formatter: Why Every Developer Needs One',
    excerpt: 'Learn why formatting JSON properly can save you hours of debugging time.',
    category: 'Developer',
    date: 'August 8, 2026',
    readTime: '4 min read',
    slug: 'json-formatter-why-developers-need',
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen py-20 px-4 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 p-3 shadow-lg shadow-indigo-500/25">
            <BookOpen className="h-8 w-8 text-white" />
          </div>
          <h1 className="mt-4 text-4xl font-bold text-slate-900">ToolNoveHub Blog</h1>
          <p className="mt-4 text-lg text-slate-600">
            Tips, tutorials, and updates from the ToolNoveHub team.
          </p>
        </div>

        <div className="space-y-6">
          {blogPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="block rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-indigo-200"
            >
              <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
                <span className="rounded-full bg-indigo-50 px-3 py-0.5 text-xs font-medium text-indigo-600">
                  {post.category}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {post.readTime}
                </span>
              </div>
              <h2 className="mt-2 text-xl font-bold text-slate-900 hover:text-indigo-600 transition-colors">
                {post.title}
              </h2>
              <p className="mt-2 text-slate-600">{post.excerpt}</p>
              <div className="mt-3 flex items-center gap-1 text-sm font-medium text-indigo-600">
                <span>Read More</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}