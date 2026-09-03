import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MessageSquare, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact ToolNoveHub for questions, feedback, suggestions, or problems with our online tools.",
  alternates: {
    canonical: "https://toolnovehub.tools/contact",
  },
  openGraph: {
    title: "Contact ToolNoveHub",
    description:
      "Get in touch with ToolNoveHub for questions, feedback, suggestions, or tool-related issues.",
    url: "https://toolnovehub.tools/contact",
    siteName: "ToolNoveHub",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
            <Mail size={32} />
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Contact Us
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            Have a question, suggestion, or found a problem? We would be happy
            to hear from you.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-gray-50">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_1.4fr] lg:px-8">
          {/* Contact Information */}
          <div>
            <div className="rounded-2xl border border-gray-200 bg-white p-7">
              <h2 className="text-2xl font-bold text-gray-900">
                Get in touch
              </h2>

              <p className="mt-4 leading-7 text-gray-600">
                Use the contact form to send us your message. We welcome
                feedback about our tools, suggestions for new tools, and
                reports about problems you encounter.
              </p>

              <div className="mt-8 space-y-6">
                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                    <MessageSquare size={21} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Questions & Feedback
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Tell us what you think or let us know how we can improve
                      ToolNoveHub.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-600">
                    <HelpCircle size={21} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Tool Problems
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      If a tool is not working as expected, include details
                      about what happened in your message.
                    </p>
                  </div>
                </div>
              </div>

              {/* Support Email */}
              <div className="mt-8 rounded-xl border border-blue-100 bg-blue-50 p-5">
                <p className="text-sm font-medium text-gray-700">
                  Support email
                </p>

                <a
                  href="mailto:support@toolnovehub.tools"
                  className="mt-1 inline-block font-semibold text-blue-600 hover:text-blue-700"
                >
                  support@toolnovehub.tools
                </a>
              </div>
            </div>

            {/* Documentation */}
            <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-7">
              <h2 className="text-xl font-bold text-gray-900">
                Before contacting us
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                You may find the answer you need in our documentation and help
                section.
              </p>

              <Link
                href="/docs"
                className="mt-5 inline-flex font-semibold text-blue-600 hover:text-blue-700"
              >
                Visit Docs & Help →
              </Link>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Send us a message
            </h2>

            <p className="mt-2 text-sm text-gray-600">
              Fields marked with <span className="text-red-600">*</span> are
              required.
            </p>

            <form
              action="mailto:support@toolnovehub.tools"
              method="post"
              encType="text/plain"
              className="mt-8 space-y-6"
            >
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-gray-900"
                >
                  Name <span className="text-red-600">*</span>
                </label>

                <input
                  id="name"
                  name="Name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Your name"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-gray-900"
                >
                  Email <span className="text-red-600">*</span>
                </label>

                <input
                  id="email"
                  name="Email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-semibold text-gray-900"
                >
                  Subject <span className="text-red-600">*</span>
                </label>

                <input
                  id="subject"
                  name="Subject"
                  type="text"
                  required
                  placeholder="How can we help?"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-semibold text-gray-900"
                >
                  Message <span className="text-red-600">*</span>
                </label>

                <textarea
                  id="message"
                  name="Message"
                  required
                  rows={7}
                  placeholder="Write your message here..."
                  className="w-full resize-y rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Send Message
              </button>

              <p className="text-center text-xs leading-5 text-gray-500">
                Submitting this form will open your default email application
                and address the message to support@toolnovehub.tools.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Looking for a tool?
          </h2>

          <p className="mt-3 text-gray-600">
            Browse our collection of free online tools.
          </p>

          <Link
            href="/tools"
            className="mt-6 inline-flex rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Explore All Tools
          </Link>
        </div>
      </section>
    </div>
  );
}