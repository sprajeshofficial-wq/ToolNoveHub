import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Users,
  Target,
  Shield,
  Zap,
  Award,
  Heart,
  ArrowRight,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About ToolNoveHub - Free Online Tools',
  description:
    'Learn about ToolNoveHub, a collection of simple, fast, and useful free online tools for students, developers, professionals, and everyday users.',
  alternates: {
    canonical: 'https://toolnovehub.tools/about',
  },
  openGraph: {
    title: 'About ToolNoveHub - Free Online Tools',
    description:
      'Learn about ToolNoveHub and our mission to provide simple, fast, and useful online tools for everyone.',
    url: 'https://toolnovehub.tools/about',
    type: 'website',
  },
};

const values = [
  {
    icon: Shield,
    title: 'Privacy First',
    description:
      'We design browser-based tools to process data locally whenever the specific tool supports local processing.',
    color: 'from-indigo-500 to-purple-500',
  },
  {
    icon: Zap,
    title: 'Fast & Lightweight',
    description:
      'Our tools are designed to be fast, simple, and easy to use without unnecessary complexity.',
    color: 'from-amber-500 to-orange-500',
  },
  {
    icon: Users,
    title: 'For Everyone',
    description:
      'Useful tools for students, developers, office workers, professionals, and everyday users.',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    icon: Award,
    title: 'Free to Use',
    description:
      'Our goal is to provide useful online tools that are accessible without unnecessary barriers.',
    color: 'from-rose-500 to-pink-500',
  },
  {
    icon: Target,
    title: 'Simple & Effective',
    description:
      'We focus on straightforward interfaces that help you complete tasks quickly.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Heart,
    title: 'Built with Care',
    description:
      'We continuously improve our tools based on usability, performance, and user feedback.',
    color: 'from-red-500 to-rose-500',
  },
];

export default function AboutPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About ToolNoveHub',
    description:
      'Learn about ToolNoveHub and its mission to provide simple, useful, and accessible online tools.',
    url: 'https://toolnovehub.tools/about',
    isPartOf: {
      '@type': 'WebSite',
      name: 'ToolNoveHub',
      url: 'https://toolnovehub.tools/',
    },
  };

  return (
    <main className="min-h-screen py-20 px-4 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <div className="mx-auto max-w-4xl">
        {/* Hero */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900">
            About ToolNoveHub
          </h1>

          <p className="mt-4 text-lg text-slate-600">
            Free online tools designed to make everyday digital tasks
            simpler, faster, and easier.
          </p>
        </header>

        <div className="rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 p-8 shadow-xl space-y-10">
          {/* Mission */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900">
              Our Mission
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              ToolNoveHub aims to provide practical online tools that make
              everyday digital tasks easier. Our tools are built for students,
              developers, professionals, office workers, and anyone who needs
              a quick solution to a common task.
            </p>

            <p className="mt-3 leading-7 text-slate-600">
              Where technically possible, we design tools to process
              information directly in your browser. The exact processing
              method can vary between tools, so users should check the
              individual tool before submitting sensitive information.
            </p>
          </section>

          {/* What We Stand For */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-5">
              What We Stand For
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {values.map((value) => {
                const Icon = value.icon;

                return (
                  <div
                    key={value.title}
                    className="rounded-xl bg-slate-50/80 p-5 border border-slate-200/50"
                  >
                    <div
                      className={`inline-flex rounded-lg bg-gradient-to-r ${value.color} p-2`}
                    >
                      <Icon
                        className="h-5 w-5 text-white"
                        aria-hidden="true"
                      />
                    </div>

                    <h3 className="mt-3 font-semibold text-slate-900">
                      {value.title}
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      {value.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Tools */}
          <section className="border-t border-slate-200/50 pt-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Explore Our Tools
                </h2>

                <p className="mt-2 text-slate-600">
                  Explore our growing collection of free online utilities.
                </p>
              </div>

              <Link
                href="/tools"
                className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                Browse Tools
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </section>

          {/* Privacy */}
          <section className="border-t border-slate-200/50 pt-8">
            <h2 className="text-2xl font-bold text-slate-900">
              Privacy Matters
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              We believe online tools should be straightforward about how
              information is handled. For more information about data
              processing, cookies, third-party services, and privacy,
              please read our{' '}
              <Link
                href="/privacy"
                className="text-indigo-600 hover:underline"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </section>

          {/* Contact */}
          <section className="border-t border-slate-200/50 pt-8">
            <h2 className="text-2xl font-bold text-slate-900">
              Have Feedback?
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              Have an idea for a new tool or found something that needs
              improvement? We would love to hear from you.
            </p>

            <Link
              href="/contact"
              className="mt-4 inline-flex items-center text-indigo-600 font-semibold hover:underline"
            >
              Contact ToolNoveHub
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </section>

          {/* Legal */}
          <div className="border-t border-slate-200/50 pt-6 text-sm text-slate-500">
            <p>
              Please also review our{' '}
              <Link
                href="/terms"
                className="text-indigo-600 hover:underline"
              >
                Terms of Service
              </Link>{' '}
              before using ToolNoveHub.
            </p>
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaData),
        }}
      />
    </main>
  );
}