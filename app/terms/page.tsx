import type { Metadata } from "next";
import Link from "next/link";
import { FileText, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Read the Terms and Conditions for using ToolNoveHub and its free online tools.",
  alternates: {
    canonical: "https://toolnovehub.tools/terms",
  },
  openGraph: {
    title: "Terms & Conditions | ToolNoveHub",
    description:
      "Terms and conditions governing the use of ToolNoveHub and its online tools.",
    url: "https://toolnovehub.tools/terms",
    siteName: "ToolNoveHub",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
            <FileText size={32} />
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Terms & Conditions
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            These Terms & Conditions explain the rules for using ToolNoveHub
            and our online tools.
          </p>

          <p className="mt-4 text-sm text-gray-500">
            Last updated: September 3, 2026
          </p>
        </div>
      </section>

      {/* Terms Content */}
      <main className="bg-white">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {/* 1 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">
                1. Acceptance of These Terms
              </h2>

              <p className="mt-4 leading-7 text-gray-600">
                Welcome to ToolNoveHub. By accessing or using
                https://toolnovehub.tools and its online tools, you agree to
                these Terms & Conditions.
              </p>

              <p className="mt-4 leading-7 text-gray-600">
                If you do not agree with these Terms, please do not use the
                website or its services.
              </p>
            </section>

            {/* 2 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">
                2. Use of ToolNoveHub
              </h2>

              <p className="mt-4 leading-7 text-gray-600">
                ToolNoveHub provides free online tools for general personal,
                educational, professional, and informational use.
              </p>

              <p className="mt-4 leading-7 text-gray-600">
                You agree to use the website only for lawful purposes and in a
                way that does not interfere with the operation, security, or
                availability of the website.
              </p>
            </section>

            {/* 3 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">
                3. Prohibited Use
              </h2>

              <p className="mt-4 leading-7 text-gray-600">
                You must not use ToolNoveHub to:
              </p>

              <ul className="mt-4 list-disc space-y-2 pl-6 text-gray-600">
                <li>Break or violate applicable laws or regulations.</li>
                <li>
                  Attempt to gain unauthorized access to the website or its
                  systems.
                </li>
                <li>
                  Interfere with website availability, security, or normal
                  operation.
                </li>
                <li>
                  Introduce malicious software, harmful code, or other
                  destructive material.
                </li>
                <li>
                  Abuse automated requests or systems in a way that places
                  unreasonable load on the website.
                </li>
                <li>
                  Use the website for fraudulent, deceptive, or harmful
                  activities.
                </li>
              </ul>
            </section>

            {/* 4 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">
                4. Online Tools and Results
              </h2>

              <p className="mt-4 leading-7 text-gray-600">
                ToolNoveHub provides tools intended to perform common
                calculations, conversions, formatting, image processing, text
                processing, and other general tasks.
              </p>

              <p className="mt-4 leading-7 text-gray-600">
                Results produced by our tools should be treated as general
                informational results. You are responsible for checking
                important results before relying on them.
              </p>

              <p className="mt-4 leading-7 text-gray-600">
                ToolNoveHub does not guarantee that every calculation,
                conversion, transformation, or generated result will always be
                completely accurate or suitable for your particular purpose.
              </p>
            </section>

            {/* 5 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">
                5. No Professional Advice
              </h2>

              <p className="mt-4 leading-7 text-gray-600">
                Information and results provided through ToolNoveHub are not
                intended to replace professional advice.
              </p>

              <p className="mt-4 leading-7 text-gray-600">
                You should obtain appropriate professional advice when making
                legal, financial, medical, tax, business, engineering, or
                other decisions that require qualified expertise.
              </p>
            </section>

            {/* 6 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">
                6. Availability of the Website
              </h2>

              <p className="mt-4 leading-7 text-gray-600">
                We aim to keep ToolNoveHub available and functioning properly,
                but we do not guarantee that the website or any particular
                tool will always be available, uninterrupted, secure, or
                error-free.
              </p>

              <p className="mt-4 leading-7 text-gray-600">
                We may modify, suspend, restrict, or discontinue any part of
                the website or its tools at any time.
              </p>
            </section>

            {/* 7 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">
                7. Intellectual Property
              </h2>

              <p className="mt-4 leading-7 text-gray-600">
                Unless otherwise stated, the ToolNoveHub website, branding,
                logos, design elements, original text, graphics, software, and
                other website content are owned by or licensed to ToolNoveHub.
              </p>

              <p className="mt-4 leading-7 text-gray-600">
                You may use the website for its intended purpose, but you may
                not copy, reproduce, modify, distribute, sell, or exploit
                protected ToolNoveHub content without appropriate permission.
              </p>
            </section>

            {/* 8 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">
                8. User Content
              </h2>

              <p className="mt-4 leading-7 text-gray-600">
                If you voluntarily send information to ToolNoveHub through our
                contact or support channels, you are responsible for ensuring
                that you have the right to provide that information.
              </p>

              <p className="mt-4 leading-7 text-gray-600">
                Please do not submit passwords, payment card details,
                government identification numbers, or other highly sensitive
                information through our contact forms or support email.
              </p>
            </section>

            {/* 9 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">
                9. Third-Party Services and Links
              </h2>

              <p className="mt-4 leading-7 text-gray-600">
                ToolNoveHub may use or link to third-party services, websites,
                analytics providers, advertising services, hosting providers,
                or other external services.
              </p>

              <p className="mt-4 leading-7 text-gray-600">
                Third-party services operate under their own terms and
                policies. ToolNoveHub is not responsible for the availability,
                content, security, privacy practices, or policies of external
                websites and services.
              </p>
            </section>

            {/* 10 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">
                10. Advertising
              </h2>

              <p className="mt-4 leading-7 text-gray-600">
                ToolNoveHub may display advertisements provided by third-party
                advertising services, including Google AdSense.
              </p>

              <p className="mt-4 leading-7 text-gray-600">
                Advertisements may be selected, delivered, measured, or
                personalized by third-party providers according to their own
                policies and applicable user settings.
              </p>
            </section>

            {/* 11 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">
                11. Disclaimer of Warranties
              </h2>

              <p className="mt-4 leading-7 text-gray-600">
                ToolNoveHub is provided on an “as available” and “as is” basis
                to the extent permitted by applicable law.
              </p>

              <p className="mt-4 leading-7 text-gray-600">
                We do not guarantee that the website or its tools will be
                uninterrupted, error-free, completely secure, or suitable for
                every particular purpose.
              </p>
            </section>

            {/* 12 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">
                12. Limitation of Liability
              </h2>

              <p className="mt-4 leading-7 text-gray-600">
                To the maximum extent permitted by applicable law, ToolNoveHub
                and its operators will not be responsible for losses or damages
                arising from your use of, or inability to use, the website or
                its tools.
              </p>

              <p className="mt-4 leading-7 text-gray-600">
                This includes, where permitted by law, indirect, incidental,
                consequential, or other losses resulting from reliance on
                information or results provided by the website.
              </p>
            </section>

            {/* 13 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">
                13. Privacy
              </h2>

              <p className="mt-4 leading-7 text-gray-600">
                Your use of ToolNoveHub is also subject to our Privacy Policy,
                which explains how information may be handled through the
                website.
              </p>

              <Link
                href="/privacy"
                className="mt-5 inline-flex font-semibold text-blue-600 hover:text-blue-700"
              >
                Read our Privacy Policy →
              </Link>
            </section>

            {/* 14 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">
                14. Changes to ToolNoveHub
              </h2>

              <p className="mt-4 leading-7 text-gray-600">
                We may add, remove, modify, or update tools, features,
                information, website sections, or other parts of ToolNoveHub
                without prior notice.
              </p>
            </section>

            {/* 15 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">
                15. Changes to These Terms
              </h2>

              <p className="mt-4 leading-7 text-gray-600">
                We may update these Terms & Conditions from time to time.
                Changes will be published on this page with an updated “Last
                updated” date.
              </p>

              <p className="mt-4 leading-7 text-gray-600">
                Your continued use of ToolNoveHub after changes are published
                means that you accept the updated Terms, subject to applicable
                law.
              </p>
            </section>

            {/* 16 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">
                16. Governing Law
              </h2>

              <p className="mt-4 leading-7 text-gray-600">
                These Terms are intended to be interpreted in accordance with
                applicable laws and regulations. Any applicable legal rights and
                obligations will be determined according to the laws that
                apply to the relevant parties and circumstances.
              </p>
            </section>

            {/* 17 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">
                17. Contact Us
              </h2>

              <p className="mt-4 leading-7 text-gray-600">
                If you have questions about these Terms & Conditions, please
                contact ToolNoveHub.
              </p>

              <div className="mt-5 rounded-xl border border-gray-200 bg-gray-50 p-5">
                <p className="text-sm text-gray-600">Support email</p>

                <a
                  href="mailto:support@toolnovehub.tools"
                  className="mt-1 inline-block font-semibold text-blue-600 hover:text-blue-700"
                >
                  support@toolnovehub.tools
                </a>
              </div>

              <Link
                href="/contact"
                className="mt-6 inline-flex font-semibold text-blue-600 hover:text-blue-700"
              >
                Go to Contact Page →
              </Link>
            </section>

            {/* Final Notice */}
            <section className="rounded-2xl border border-blue-100 bg-blue-50 p-6">
              <div className="flex gap-4">
                <ShieldCheck
                  className="mt-0.5 shrink-0 text-blue-600"
                  size={24}
                />

                <div>
                  <h2 className="font-semibold text-blue-900">
                    Important Notice
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-blue-800">
                    These Terms & Conditions are provided as a general website
                    terms framework and should be reviewed by an appropriately
                    qualified legal professional for your specific business,
                    jurisdiction, and services before relying on them as a
                    formal legal agreement.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}