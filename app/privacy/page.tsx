import type { Metadata } from 'next';
import Link from 'next/link';

const lastUpdated = 'August 19, 2026';

export const metadata: Metadata = {
  title: 'Privacy Policy - ToolNoveHub',
  description:
    'Learn how ToolNoveHub handles information, browser-based tool processing, cookies, analytics, advertising, and your privacy.',
  alternates: {
    canonical: 'https://toolnovehub.tools/privacy',
  },
  openGraph: {
    title: 'Privacy Policy - ToolNoveHub',
    description:
      'Learn how ToolNoveHub handles information, browser-based tool processing, cookies, analytics, advertising, and your privacy.',
    url: 'https://toolnovehub.tools/privacy',
    type: 'website',
  },
};

export default function PrivacyPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Privacy Policy',
    description:
      'ToolNoveHub Privacy Policy explaining browser-based processing, cookies, analytics, advertising, and user privacy.',
    url: 'https://toolnovehub.tools/privacy',
    dateModified: '2026-08-19',
    isPartOf: {
      '@type': 'WebSite',
      name: 'ToolNoveHub',
      url: 'https://toolnovehub.tools/',
    },
  };

  return (
    <main className="min-h-screen py-20 px-4 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-slate-900">
            Privacy Policy
          </h1>

          <p className="mt-3 text-slate-600">
            Last updated: {lastUpdated}
          </p>
        </div>

        <article className="rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 p-8 shadow-xl space-y-8">
          <section>
            <h2 className="text-xl font-bold text-slate-900">
              1. Introduction
            </h2>

            <p className="mt-2 leading-7 text-slate-600">
              ToolNoveHub provides free online tools for tasks such as image
              processing, text analysis, calculations, file conversion, QR
              codes, and other digital activities. We value your privacy and
              aim to minimize the information required to use our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">
              2. Browser-Based Processing
            </h2>

            <p className="mt-2 leading-7 text-slate-600">
              Many ToolNoveHub tools are designed to process your files or
              information directly in your web browser. When a tool performs
              processing locally, the content you provide is processed on your
              device rather than uploaded to our server for processing.
            </p>

            <p className="mt-3 leading-7 text-slate-600">
              The exact behavior may vary between tools. Please review the
              information displayed on the relevant tool page before processing
              sensitive information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">
              3. Information We May Collect
            </h2>

            <p className="mt-2 leading-7 text-slate-600">
              Depending on how the website is configured and which services are
              enabled, ToolNoveHub or its service providers may receive limited
              technical information such as browser type, device information,
              approximate location, IP address, referring page, or basic
              website usage information.
            </p>

            <p className="mt-3 leading-7 text-slate-600">
              We do not intentionally collect the contents of files or text
              processed locally by our browser-based tools.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">
              4. Cookies and Similar Technologies
            </h2>

            <p className="mt-2 leading-7 text-slate-600">
              ToolNoveHub may use cookies or similar technologies where
              necessary for website functionality, security, analytics, or
              advertising.
            </p>

            <p className="mt-3 leading-7 text-slate-600">
              The types of cookies used may change as website features and
              third-party services are added or updated.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">
              5. Analytics
            </h2>

            <p className="mt-2 leading-7 text-slate-600">
              If analytics services are enabled, they may collect information
              about how visitors use ToolNoveHub, such as pages viewed,
              approximate location, device information, and interactions with
              the website.
            </p>

            <p className="mt-3 leading-7 text-slate-600">
              Analytics providers process information according to their own
              privacy policies and terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">
              6. Advertising
            </h2>

            <p className="mt-2 leading-7 text-slate-600">
              ToolNoveHub may display advertisements provided by third-party
              advertising networks. Advertising providers may use cookies or
              similar technologies to provide, measure, and personalize
              advertising, subject to their applicable policies and settings.
            </p>

            <p className="mt-3 leading-7 text-slate-600">
              If advertising is not currently enabled on ToolNoveHub, this
              section describes services that may be introduced in the future.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">
              7. Third-Party Services
            </h2>

            <p className="mt-2 leading-7 text-slate-600">
              ToolNoveHub may use third-party providers for services such as
              hosting, analytics, security, advertising, email, or other
              website functionality.
            </p>

            <p className="mt-3 leading-7 text-slate-600">
              These providers may process information according to their own
              privacy policies. We recommend reviewing the privacy policies of
              third-party services when applicable.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">
              8. Files and Personal Information
            </h2>

            <p className="mt-2 leading-7 text-slate-600">
              You should avoid entering or uploading highly sensitive personal
              information unless you understand how the specific ToolNoveHub
              tool processes that information.
            </p>

            <p className="mt-3 leading-7 text-slate-600">
              You are responsible for ensuring that you have the necessary
              rights and permissions to process any files or information using
              our tools.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">
              9. Contact Information
            </h2>

            <p className="mt-2 leading-7 text-slate-600">
              If you contact us, we may receive the information you voluntarily
              provide, such as your name, email address, and the contents of
              your message. We use this information to respond to your request
              and provide support.
            </p>

            <p className="mt-3 leading-7 text-slate-600">
              You can contact us through our{' '}
              <Link
                href="/contact"
                className="text-indigo-600 hover:underline"
              >
                Contact page
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">
              10. Data Security
            </h2>

            <p className="mt-2 leading-7 text-slate-600">
              We take reasonable measures to protect the website and
              information handled through our services. However, no website or
              internet transmission can be guaranteed to be completely secure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">
              11. Children&apos;s Privacy
            </h2>

            <p className="mt-2 leading-7 text-slate-600">
              ToolNoveHub is not intended to knowingly collect personal
              information from children. If you believe that a child has
              provided personal information to us, please contact us so that we
              can review the situation and take appropriate action.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">
              12. Changes to This Privacy Policy
            </h2>

            <p className="mt-2 leading-7 text-slate-600">
              We may update this Privacy Policy when our services, technologies,
              or legal requirements change. Any updates will be posted on this
              page together with a revised “Last updated” date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">
              13. Contact Us
            </h2>

            <p className="mt-2 leading-7 text-slate-600">
              If you have questions or concerns about this Privacy Policy,
              please visit our{' '}
              <Link
                href="/contact"
                className="text-indigo-600 hover:underline"
              >
                Contact page
              </Link>
              .
            </p>
          </section>
        </article>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaData),
          }}
        />
      </div>
    </main>
  );
}