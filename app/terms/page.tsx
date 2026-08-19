import type { Metadata } from 'next';
import Link from 'next/link';

const lastUpdated = 'August 19, 2026';

export const metadata: Metadata = {
  title: 'Terms of Service - ToolNoveHub',
  description:
    'Read the ToolNoveHub Terms of Service, including acceptable use, limitations, privacy, intellectual property, and service availability.',
  alternates: {
    canonical: 'https://toolnovehub.tools/terms',
  },
  openGraph: {
    title: 'Terms of Service - ToolNoveHub',
    description:
      'Read the ToolNoveHub Terms of Service, including acceptable use, limitations, privacy, and service availability.',
    url: 'https://toolnovehub.tools/terms',
    type: 'website',
  },
};

export default function TermsPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Terms of Service',
    description:
      'ToolNoveHub Terms of Service covering acceptable use, privacy, intellectual property, service availability, and limitations.',
    url: 'https://toolnovehub.tools/terms',
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
            Terms of Service
          </h1>

          <p className="mt-3 text-slate-600">
            Last updated: {lastUpdated}
          </p>
        </div>

        <article className="rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 p-8 shadow-xl space-y-8">
          <section>
            <h2 className="text-xl font-bold text-slate-900">
              1. Acceptance of Terms
            </h2>
            <p className="mt-2 leading-7 text-slate-600">
              By accessing or using ToolNoveHub, you agree to these Terms of
              Service. If you do not agree with these terms, please do not use
              the website or its tools.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">
              2. Description of Our Services
            </h2>
            <p className="mt-2 leading-7 text-slate-600">
              ToolNoveHub provides free online utilities designed to help with
              everyday tasks such as image processing, text analysis,
              calculations, file conversion, QR codes, and other digital
              activities.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">
              3. Free Use
            </h2>
            <p className="mt-2 leading-7 text-slate-600">
              Our core tools are currently available free of charge. We may
              introduce new features, services, or optional paid functionality
              in the future.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">
              4. Privacy and Data Processing
            </h2>
            <p className="mt-2 leading-7 text-slate-600">
              Many ToolNoveHub tools are designed to process data directly in
              your browser. Where a tool processes information locally, the
              files or data you provide are not uploaded to our servers for
              processing.
            </p>

            <p className="mt-3 leading-7 text-slate-600">
              However, website-level services such as analytics, advertising,
              cookies, or other third-party technologies may collect limited
              information as described in our{' '}
              <Link
                href="/privacy"
                className="text-indigo-600 hover:underline"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">
              5. Acceptable Use
            </h2>
            <p className="mt-2 leading-7 text-slate-600">
              You may use ToolNoveHub for personal, educational, professional,
              or commercial purposes, provided that your use complies with
              applicable laws and these Terms.
            </p>

            <p className="mt-3 leading-7 text-slate-600">
              You must not use the website to engage in illegal activities,
              distribute malicious content, interfere with the operation of the
              website, attempt to gain unauthorized access, or abuse the
              service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">
              6. User Content and Files
            </h2>
            <p className="mt-2 leading-7 text-slate-600">
              You are responsible for any text, files, images, or other content
              that you process using our tools. You must have the necessary
              rights and permissions to use any content you submit to a tool.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">
              7. Accuracy of Tools
            </h2>
            <p className="mt-2 leading-7 text-slate-600">
              ToolNoveHub provides tools for convenience and general
              informational purposes. Results may contain errors or
              inaccuracies. You should independently verify important results
              before relying on them for financial, legal, medical, business,
              or other critical decisions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">
              8. Intellectual Property
            </h2>
            <p className="mt-2 leading-7 text-slate-600">
              The ToolNoveHub website, branding, design, original content, and
              software are protected by applicable intellectual property laws.
              You may not copy, reproduce, modify, or redistribute our website
              or proprietary content without permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">
              9. Third-Party Services and Links
            </h2>
            <p className="mt-2 leading-7 text-slate-600">
              ToolNoveHub may use third-party services for functions such as
              analytics, advertising, hosting, or other website features.
              Third-party services are subject to their own terms and privacy
              policies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">
              10. Service Availability
            </h2>
            <p className="mt-2 leading-7 text-slate-600">
              We aim to keep ToolNoveHub available and reliable, but we do not
              guarantee that the website or any individual tool will always be
              available, uninterrupted, or error-free.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">
              11. Disclaimer
            </h2>
            <p className="mt-2 leading-7 text-slate-600">
              ToolNoveHub is provided on an “as is” and “as available” basis.
              To the extent permitted by applicable law, we make no warranties
              regarding the accuracy, reliability, availability, or suitability
              of the website or its tools for a particular purpose.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">
              12. Limitation of Liability
            </h2>
            <p className="mt-2 leading-7 text-slate-600">
              To the extent permitted by applicable law, ToolNoveHub and its
              operators will not be responsible for losses or damages arising
              from your use of, or inability to use, the website or its tools.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">
              13. Changes to These Terms
            </h2>
            <p className="mt-2 leading-7 text-slate-600">
              We may update these Terms of Service from time to time. Changes
              will be posted on this page along with an updated revision date.
              Your continued use of ToolNoveHub after changes are published
              constitutes acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">
              14. Contact Us
            </h2>
            <p className="mt-2 leading-7 text-slate-600">
              If you have questions about these Terms of Service, please visit
              our{' '}
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