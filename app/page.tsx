import type { Metadata } from 'next';
import Link from 'next/link';
import { Mail, Clock, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact ToolNoveHub - Get in Touch',
  description:
    'Contact ToolNoveHub for questions, feedback, bug reports, tool suggestions, and other inquiries.',
  alternates: {
    canonical: 'https://toolnovehub.tools/contact',
  },
  openGraph: {
    title: 'Contact ToolNoveHub - Get in Touch',
    description:
      'Contact ToolNoveHub for questions, feedback, bug reports, tool suggestions, and other inquiries.',
    url: 'https://toolnovehub.tools/contact',
    type: 'website',
  },
};

export default function ContactPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact ToolNoveHub',
    description:
      'Contact ToolNoveHub for questions, feedback, bug reports, and suggestions.',
    url: 'https://toolnovehub.tools/contact',
    isPartOf: {
      '@type': 'WebSite',
      name: 'ToolNoveHub',
      url: 'https://toolnovehub.tools/',
    },
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 px-4 py-20">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-slate-900">
            Contact Us
          </h1>

          <p className="mt-4 text-lg text-slate-600">
            Have a question, feedback, bug report, or tool suggestion?
            We&apos;d love to hear from you.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

          {/* Contact Information */}
          <div className="space-y-4 md:col-span-1">

            {/* Email */}
            <div className="rounded-2xl border border-slate-200/50 bg-white/80 p-6 shadow-xl backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-indigo-600 p-2">
                  <Mail
                    className="h-5 w-5 text-white"
                    aria-hidden="true"
                  />
                </div>

                <div>
                  <p className="text-sm font-medium text-slate-900">
                    Email
                  </p>

                  <a
                    href="mailto:support@toolnovehub.tools"
                    className="text-sm text-indigo-600 hover:underline"
                  >
                    support@toolnovehub.tools
                  </a>
                </div>
              </div>
            </div>

            {/* Response Time */}
            <div className="rounded-2xl border border-slate-200/50 bg-white/80 p-6 shadow-xl backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-emerald-600 p-2">
                  <Clock
                    className="h-5 w-5 text-white"
                    aria-hidden="true"
                  />
                </div>

                <div>
                  <p className="text-sm font-medium text-slate-900">
                    Response Time
                  </p>

                  <p className="text-sm text-slate-600">
                    Usually within 24 hours
                  </p>
                </div>
              </div>
            </div>

            {/* Availability */}
            <div className="rounded-2xl border border-slate-200/50 bg-white/80 p-6 shadow-xl backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-purple-600 p-2">
                  <MapPin
                    className="h-5 w-5 text-white"
                    aria-hidden="true"
                  />
                </div>

                <div>
                  <p className="text-sm font-medium text-slate-900">
                    Availability
                  </p>

                  <p className="text-sm text-slate-600">
                    Serving users worldwide
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Form */}
          <div className="md:col-span-2">
            <div className="rounded-2xl border border-slate-200/50 bg-white/80 p-8 shadow-xl backdrop-blur-sm">
              <ContactForm />

              <p className="mt-6 text-xs leading-5 text-slate-500">
                By submitting this form, you agree that we may use the
                information you provide to respond to your inquiry. See our{' '}
                <Link
                  href="/privacy"
                  className="text-indigo-600 hover:underline"
                >
                  Privacy Policy
                </Link>{' '}
                for more information.
              </p>
            </div>
          </div>

        </div>

        {/* Footer Links */}
        <div className="mt-8 text-center text-sm text-slate-500">
          <Link
            href="/"
            className="text-indigo-600 hover:underline"
          >
            Home
          </Link>

          <span className="mx-2">•</span>

          <Link
            href="/tools"
            className="text-indigo-600 hover:underline"
          >
            All Tools
          </Link>

          <span className="mx-2">•</span>

          <Link
            href="/privacy"
            className="text-indigo-600 hover:underline"
          >
            Privacy Policy
          </Link>

          <span className="mx-2">•</span>

          <Link
            href="/terms"
            className="text-indigo-600 hover:underline"
          >
            Terms of Service
          </Link>
        </div>
      </div>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaData),
        }}
      />
    </main>
  );
}