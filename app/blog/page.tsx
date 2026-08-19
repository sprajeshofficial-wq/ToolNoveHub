import Link from 'next/link';
import { Calendar, Clock, ArrowRight, BookOpen, Users, Code, Zap } from 'lucide-react';

// Sample blog posts (you can add more)
const blogPosts = [
  {
    id: 1,
    title: '10 Free Online Tools Every Developer Needs in 2025',
    excerpt: 'From QR code generators to JSON formatters, these tools will save you hours of work.',
    category: 'Developer',
    date: 'August 18, 2026',
    readTime: '5 min read',
    slug: '10-free-online-tools-every-developer-needs',
    icon: Code,
  },
  {
    id: 2,
    title: 'How to Create a QR Code for Wi-Fi in 30 Seconds',
    excerpt: 'Share your Wi-Fi network instantly with a QR code. No more typing long passwords.',
    category: 'Tutorial',
    date: 'August 15, 2026',
    readTime: '3 min read',
    slug: 'how-to-create-qr-code-for-wifi',
    icon: Zap,
  },
  {
    id: 3,
    title: 'The Best Image Resizer Tools for Social Media in 2025',
    excerpt: 'Get the perfect dimensions for Instagram, Twitter, LinkedIn, and Facebook.',
    category: 'Design',
    date: 'August 12, 2026',
    readTime: '4 min read',
    slug: 'best-image-resizer-tools-for-social-media',
    icon: Users,
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
          {blogPosts.map((post) => {
            const Icon = post.icon;
            return (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="block rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-indigo-200"
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 p-3">
                    <Icon className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div className="flex-1">
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
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 rounded-2xl bg-indigo-50/50 p-6 border border-indigo-200/50 text-center">
          <p className="text-sm text-slate-600">
            <span className="font-semibold text-indigo-600">📝 Coming Soon:</span> More blog posts, tutorials, 
            and tool tips. Subscribe to stay updated!
          </p>
        </div>
      </div>
    </div>
  );
}