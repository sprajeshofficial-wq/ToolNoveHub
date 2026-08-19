import Link from 'next/link';
import { BookOpen, FileText, HelpCircle, UserCheck } from 'lucide-react';

export default function DocsPage() {
  const docs = [
    {
      title: 'Getting Started',
      description: 'Learn how to use ToolNoveHub tools effectively.',
      icon: BookOpen,
      href: '/docs/getting-started',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Tool Guides',
      description: 'Detailed guides for each tool.',
      icon: FileText,
      href: '/docs/tool-guides',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      title: 'FAQ',
      description: 'Frequently asked questions about our tools.',
      icon: HelpCircle,
      href: '/docs/faq',
      color: 'from-amber-500 to-orange-500',
    },
    {
      title: 'Privacy & Security',
      description: 'How we protect your privacy and data.',
      icon: UserCheck,
      href: '/docs/privacy-security',
      color: 'from-rose-500 to-pink-500',
    },
  ];

  return (
    <div className="min-h-screen py-20 px-4 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 p-3 shadow-lg shadow-indigo-500/25">
            <BookOpen className="h-8 w-8 text-white" />
          </div>
          <h1 className="mt-4 text-4xl font-bold text-slate-900">Documentation</h1>
          <p className="mt-4 text-lg text-slate-600">
            Everything you need to know about ToolNoveHub.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {docs.map((doc) => {
            const Icon = doc.icon;
            return (
              <Link
                key={doc.title}
                href={doc.href}
                className="rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-indigo-200"
              >
                <div className={`inline-flex rounded-xl bg-gradient-to-r ${doc.color} p-3 shadow-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mt-3 text-lg font-semibold text-slate-900">{doc.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{doc.description}</p>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 rounded-2xl bg-indigo-50/50 p-6 border border-indigo-200/50 text-center">
          <p className="text-sm text-slate-600">
            <span className="font-semibold text-indigo-600">📚 Coming Soon:</span> Comprehensive guides for all tools.
          </p>
        </div>
      </div>
    </div>
  );
}