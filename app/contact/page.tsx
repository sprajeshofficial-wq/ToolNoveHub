'use client';

import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Mail,
  Clock,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { useState } from 'react';

const metadata: Metadata = {
  title: 'Contact ToolNoveHub - Get in Touch',
  description:
    'Contact ToolNoveHub for questions, feedback, bug reports, tool suggestions, and other inquiries.',
};

type FormData = {
  name: string;
  email: string;
  message: string;
};

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setIsSubmitting(true);
    setStatus('idle');

    try {
      /*
       * NOTE:
       * This currently only validates the form on the client.
       * You will need /api/contact later to actually send emails.
       */
      await new Promise((resolve) => setTimeout(resolve, 800));

      setStatus('success');

      setFormData({
        name: '',
        email: '',
        message: '',
      });
    } catch {
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

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

          {/* Contact Form */}
          <div className="md:col-span-2">
            <div className="rounded-2xl border border-slate-200/50 bg-white/80 p-8 shadow-xl backdrop-blur-sm">

              <form
                onSubmit={handleSubmit}
                className="space-y-6"
              >

                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-slate-700"
                  >
                    Your Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    className="input-field mt-1"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        name: e.target.value,
                      })
                    }
                    autoComplete="name"
                    minLength={2}
                    maxLength={100}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-slate-700"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    className="input-field mt-1"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: e.target.value,
                      })
                    }
                    autoComplete="email"
                    maxLength={254}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="text-sm font-medium text-slate-700"
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    placeholder="Tell us what you think..."
                    className="textarea-field mt-1"
                    rows={6}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        message: e.target.value,
                      })
                    }
                    minLength={10}
                    maxLength={5000}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                {/* Success Message */}
                {status === 'success' && (
                  <div
                    role="status"
                    className="flex items-center gap-2 rounded-lg bg-emerald-50 p-4 text-sm text-emerald-700"
                  >
                    <CheckCircle
                      className="h-5 w-5"
                      aria-hidden="true"
                    />

                    <span>
                      Your message has been submitted successfully.
                    </span>
                  </div>
                )}

                {/* Error Message */}
                {status === 'error' && (
                  <div
                    role="alert"
                    className="flex items-center gap-2 rounded-lg bg-red-50 p-4 text-sm text-red-700"
                  >
                    <AlertCircle
                      className="h-5 w-5"
                      aria-hidden="true"
                    />

                    <span>
                      Something went wrong. Please try again or email us
                      directly.
                    </span>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary flex w-full items-center justify-center disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send
                        className="mr-2 h-4 w-4"
                        aria-hidden="true"
                      />
                      Send Message
                    </>
                  )}
                </button>

              </form>

              {/* Privacy Notice */}
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

        {/* Additional Links */}
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