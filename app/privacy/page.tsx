import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read the ToolNoveHub Privacy Policy to learn how information, cookies, analytics, advertising, and browser-based tools are handled.",
  alternates: {
    canonical: "https://toolnovehub.tools/privacy",
  },
  openGraph: {
    title: "Privacy Policy | ToolNoveHub",
    description:
      "Learn how ToolNoveHub handles information, cookies, analytics, advertising, and browser-based tools.",
    url: "https://toolnovehub.tools/privacy",
    siteName: "ToolNoveHub",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-green-600">
            <ShieldCheck size={32} />
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Privacy Policy
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            This Privacy Policy explains how ToolNoveHub handles information
            when you use our website and online tools.
          </p>

          <p className="mt-4 text-sm text-gray-500">
            Last updated: September 3, 2026
          </p>
        </div>
      </section>

      {/* Policy Content */}
      <main className="bg-white">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">
                1. Introduction
              </h2>

              <p className="mt-4 leading-7 text-gray-600">
                Welcome to ToolNoveHub. We provide free online tools designed
                to help with calculations, text processing, image tasks,
                development utilities, and other everyday digital activities.
              </p>

              <p className="mt-4 leading-7 text-gray-600">
                By using ToolNoveHub, you acknowledge that you have read and
                understood this Privacy Policy.
              </p>
            </section>

            {/* Information */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">
                2. Information We Collect
              </h2>

              <p className="mt-4 leading-7 text-gray-600">
                The information collected depends on how you use the website.
                We aim to collect only information that is reasonably
                necessary for operating, improving, and securing the website.
              </p>

              <h3 className="mt-6 text-lg font-semibold text-gray-900">
                Information you provide
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                If you contact us, you may provide information such as your
                name, email address, subject, and message. We use this
                information to respond to your request.
              </p>

              <h3 className="mt-6 text-lg font-semibold text-gray-900">
                Information collected automatically
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                Like many websites, ToolNoveHub may receive technical and usage
                information such as browser type, device information,
                approximate location, pages viewed, referring pages, and
                interactions with the website. Some of this information may be
                collected through analytics, advertising, or security services.
              </p>
            </section>

            {/* Browser Tools */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">
                3. Browser-Based Tools
              </h2>

              <p className="mt-4 leading-7 text-gray-600">
                Some ToolNoveHub tools are designed to process your input
                directly in your web browser. When a tool performs processing
                locally, the information you enter may remain on your device
                and may not be uploaded to our servers.
              </p>

              <p className="mt-4 leading-7 text-gray-600">
                However, not every website feature necessarily operates in the
                same way. You should review the information displayed on an
                individual tool page before using it with sensitive or
                confidential information.
              </p>

              <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-5">
                <p className="text-sm leading-6 text-blue-900">
                  <strong>Important:</strong> ToolNoveHub does not guarantee
                  that every tool or website feature is completely private or
                  that information can never be transmitted by your browser,
                  third-party services, or network providers.
                </p>
              </div>
            </section>

            {/* How Information Is Used */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">
                4. How We Use Information
              </h2>

              <p className="mt-4 leading-7 text-gray-600">
                Information may be used for purposes including:
              </p>

              <ul className="mt-4 list-disc space-y-2 pl-6 text-gray-600">
                <li>Providing and maintaining the website.</li>
                <li>Operating and improving our online tools.</li>
                <li>Responding to support requests and messages.</li>
                <li>Understanding website usage and performance.</li>
                <li>Detecting and preventing abuse, fraud, or security issues.</li>
                <li>Displaying and measuring advertising where applicable.</li>
                <li>Improving the user experience.</li>
              </ul>
            </section>

            {/* Cookies */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">
                5. Cookies and Similar Technologies
              </h2>

              <p className="mt-4 leading-7 text-gray-600">
                ToolNoveHub and third-party services may use cookies, local
                storage, pixels, or similar technologies to provide website
                functionality, understand usage, maintain security, and
                support advertising.
              </p>

              <p className="mt-4 leading-7 text-gray-600">
                Your browser may allow you to control or block cookies.
                Disabling certain cookies may affect some website features.
              </p>
            </section>

            {/* Google Analytics */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">
                6. Google Analytics
              </h2>

              <p className="mt-4 leading-7 text-gray-600">
                ToolNoveHub may use Google Analytics to understand how visitors
                use the website, measure website performance, and improve our
                services.
              </p>

              <p className="mt-4 leading-7 text-gray-600">
                Google Analytics may collect information such as pages visited,
                approximate geographic information, device information,
                browser information, and interactions with the website.
              </p>

              <p className="mt-4 leading-7 text-gray-600">
                Analytics information is processed according to Google's
                applicable policies and terms.
              </p>
            </section>

            {/* Advertising */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">
                7. Advertising
              </h2>

              <p className="mt-4 leading-7 text-gray-600">
                ToolNoveHub may display advertisements provided by third-party
                advertising services, including Google AdSense.
              </p>

              <p className="mt-4 leading-7 text-gray-600">
                Advertising providers may use cookies or similar technologies
                to provide, personalize, measure, and limit advertising, where
                permitted by applicable law and user settings.
              </p>

              <p className="mt-4 leading-7 text-gray-600">
                Third-party advertising providers may collect information about
                visits to this and other websites in accordance with their own
                privacy policies.
              </p>
            </section>

            {/* Third Parties */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">
                8. Third-Party Services
              </h2>

              <p className="mt-4 leading-7 text-gray-600">
                ToolNoveHub may use third-party services to operate, analyze,
                secure, advertise, or improve the website.
              </p>

              <p className="mt-4 leading-7 text-gray-600">
                These services may process certain information according to
                their own terms and privacy policies. Examples may include
                analytics providers, advertising providers, hosting services,
                security services, and other infrastructure providers.
              </p>
            </section>

            {/* Email */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">
                9. Contact and Email Communications
              </h2>

              <p className="mt-4 leading-7 text-gray-600">
                If you contact ToolNoveHub by email, we may retain the
                information contained in your message so that we can respond,
                provide support, investigate problems, and maintain appropriate
                records.
              </p>

              <p className="mt-4 leading-7 text-gray-600">
                Please avoid sending passwords, payment card information,
                government identification numbers, or other highly sensitive
                information through our contact form or support email.
              </p>
            </section>

            {/* Security */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">
                10. Data Security
              </h2>

              <p className="mt-4 leading-7 text-gray-600">
                We take reasonable measures to protect information associated
                with the operation of ToolNoveHub. However, no website,
                internet connection, or electronic storage system can be
                guaranteed to be completely secure.
              </p>
            </section>

            {/* Children */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">
                11. Children's Privacy
              </h2>

              <p className="mt-4 leading-7 text-gray-600">
                ToolNoveHub is not specifically directed toward children under
                the age required by applicable law to provide consent for
                online services.
              </p>

              <p className="mt-4 leading-7 text-gray-600">
                If you believe that a child has provided personal information
                to us inappropriately, please contact us so that we can review
                the situation.
              </p>
            </section>

            {/* External Links */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">
                12. External Links
              </h2>

              <p className="mt-4 leading-7 text-gray-600">
                ToolNoveHub may contain links to external websites. We are not
                responsible for the privacy practices, content, or security of
                websites operated by third parties.
              </p>

              <p className="mt-4 leading-7 text-gray-600">
                We recommend reviewing the privacy policy of any external
                website you visit.
              </p>
            </section>

            {/* Data Retention */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">
                13. Data Retention
              </h2>

              <p className="mt-4 leading-7 text-gray-600">
                Information may be retained for as long as reasonably necessary
                for the purposes described in this Privacy Policy, including
                responding to requests, maintaining business records,
                resolving disputes, enforcing agreements, and meeting legal
                obligations.
              </p>
            </section>

            {/* Your Choices */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">
                14. Your Choices
              </h2>

              <p className="mt-4 leading-7 text-gray-600">
                Depending on your location and applicable law, you may have
                rights relating to your personal information, including rights
                to access, correct, delete, restrict, or object to certain
                processing.
              </p>

              <p className="mt-4 leading-7 text-gray-600">
                You can also control certain browser settings, including
                cookies and permissions, through your browser or device
                settings.
              </p>
            </section>

            {/* Policy Changes */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">
                15. Changes to This Privacy Policy
              </h2>

              <p className="mt-4 leading-7 text-gray-600">
                We may update this Privacy Policy from time to time to reflect
                changes to our website, services, technology, legal
                requirements, or business practices.
              </p>

              <p className="mt-4 leading-7 text-gray-600">
                When changes are made, the updated policy will be published on
                this page with a revised “Last updated” date.
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">
                16. Contact Us
              </h2>

              <p className="mt-4 leading-7 text-gray-600">
                If you have questions about this Privacy Policy or how
                ToolNoveHub handles information, please contact us.
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
          </div>
        </div>
      </main>

      {/* Footer Note */}
      <section className="border-t border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-4xl px-4 py-10 text-center sm:px-6 lg:px-8">
          <p className="text-sm leading-6 text-gray-500">
            This Privacy Policy is provided for general informational purposes
            and should be reviewed and updated as ToolNoveHub's services,
            technology, and legal requirements change.
          </p>
        </div>
      </section>
    </div>
  );
}