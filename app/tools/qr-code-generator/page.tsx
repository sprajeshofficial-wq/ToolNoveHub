import type { Metadata } from "next";
import Link from "next/link";
import QRCodeGenerator from "./QRCodeGenerator";

const siteUrl = "https://toolnovehub.tools";
const pageUrl = `${siteUrl}/tools/qr-code-generator`;

export const metadata: Metadata = {
  title: "QR Code Generator – Create Free QR Codes Online",
  description:
    "Create free QR codes for URLs, text, and Wi-Fi networks. Generate and download QR codes instantly with no signup required.",
  keywords: [
    "QR code generator",
    "free QR code generator",
    "create QR code",
    "QR code maker",
    "QR code for Wi-Fi",
    "online QR code generator",
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "ToolNoveHub",
    url: pageUrl,
    title: "QR Code Generator – Create Free QR Codes Online",
    description:
      "Create free QR codes for URLs, text, and Wi-Fi networks. Generate and download QR codes instantly with no signup required.",
  },
  twitter: {
    card: "summary",
    title: "QR Code Generator – Create Free QR Codes Online",
    description:
      "Create free QR codes for URLs, text, and Wi-Fi networks. Generate and download QR codes instantly.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function QRCodeGeneratorPage() {
  const webApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": `${pageUrl}/#webapplication`,
    name: "QR Code Generator",
    url: pageUrl,
    description:
      "Create free QR codes for URLs, text, and Wi-Fi networks. Generate and download QR codes instantly with no signup required.",
    applicationCategory: "UtilityApplication",
    operatingSystem: "All",
    browserRequirements:
      "Requires a modern web browser with JavaScript enabled",
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    publisher: {
      "@type": "Organization",
      name: "ToolNoveHub",
      url: siteUrl,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}/#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "ToolNoveHub",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Free Online Tools",
        item: `${siteUrl}/tools`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "QR Code Generator",
        item: pageUrl,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${pageUrl}/#faq`,
    mainEntity: [
      {
        "@type": "Question",
        name: "Can I generate a QR code for Wi-Fi?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Use the Wi-Fi Network option in the QR code generator and enter the network information required by the tool.",
        },
      },
      {
        "@type": "Question",
        name: "Is the QR code generator free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. ToolNoveHub provides this QR code generator as a free online tool without requiring an account.",
        },
      },
      {
        "@type": "Question",
        name: "Can I download the generated QR code?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. The QR code generator allows you to download the generated QR code as a PNG image.",
        },
      },
      {
        "@type": "Question",
        name: "How do I scan a QR code?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "On many modern phones, you can open the camera and point it at a QR code. Follow the notification or link displayed by your device.",
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 px-4 py-12 sm:py-16">
      <div className="mx-auto max-w-5xl">
        {/* Breadcrumbs */}
        <nav
          aria-label="Breadcrumb"
          className="mb-8 text-sm text-slate-500"
        >
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link
                href="/"
                className="transition-colors hover:text-indigo-600"
              >
                Home
              </Link>
            </li>

            <li aria-hidden="true">/</li>

            <li>
              <Link
                href="/tools"
                className="transition-colors hover:text-indigo-600"
              >
                Free Online Tools
              </Link>
            </li>

            <li aria-hidden="true">/</li>

            <li
              className="font-medium text-slate-700"
              aria-current="page"
            >
              QR Code Generator
            </li>
          </ol>
        </nav>

        {/* Header */}
        <header className="text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-indigo-600">
            Free QR Code Tool
          </p>

          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Free QR Code Generator
          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            Create QR codes for URLs, text, and Wi-Fi networks instantly.
            No signup is required, and the generator works directly in
            your browser.
          </p>
        </header>

        {/* Tool */}
        <section
          aria-labelledby="qr-generator-heading"
          className="mt-10 rounded-2xl border border-slate-200/70 bg-white p-5 shadow-xl sm:p-8"
        >
          <h2 id="qr-generator-heading" className="sr-only">
            QR Code Generator Tool
          </h2>

          <QRCodeGenerator />
        </section>

        {/* How to Use */}
        <section aria-labelledby="how-to-use-heading" className="mt-12">
          <h2
            id="how-to-use-heading"
            className="text-2xl font-bold text-slate-900 sm:text-3xl"
          >
            How to Use the QR Code Generator
          </h2>

          <p className="mt-3 leading-7 text-slate-600">
            Creating a QR code with ToolNoveHub takes only a few simple
            steps.
          </p>

          <ol className="mt-6 space-y-4">
            {[
              [
                "Choose the QR code type",
                "Select Text / URL or Wi-Fi Network depending on the information you want to encode.",
              ],
              [
                "Enter your information",
                "Enter the URL, text, or Wi-Fi network details that should be stored in the QR code.",
              ],
              [
                "Generate your QR code",
                "Select the generate option to create your QR code instantly.",
              ],
              [
                "Download or share",
                "Download the generated QR code or copy it for use in your project, document, website, or printed material.",
              ],
            ].map(([title, description], index) => (
              <li key={title} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700">
                  {index + 1}
                </span>

                <div>
                  <h3 className="font-semibold text-slate-900">
                    {title}
                  </h3>

                  <p className="mt-1 text-slate-600">
                    {description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Uses */}
        <section aria-labelledby="uses-heading" className="mt-12">
          <h2
            id="uses-heading"
            className="text-2xl font-bold text-slate-900 sm:text-3xl"
          >
            What Can You Use a QR Code For?
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              [
                "Wi-Fi Networks",
                "Create a QR code that makes it easier for guests and customers to connect to a compatible Wi-Fi network.",
              ],
              [
                "Website URLs",
                "Turn a website address into a QR code that people can scan with a phone or other compatible device.",
              ],
              [
                "Text and Information",
                "Encode useful text and information into a QR code for sharing or printed materials.",
              ],
              [
                "Events and Marketing",
                "Use QR codes on posters, flyers, menus, signs, and other materials to provide quick access to online information.",
              ],
            ].map(([title, description]) => (
              <article
                key={title}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <h3 className="font-semibold text-slate-900">
                  {title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section aria-labelledby="benefits-heading" className="mt-12">
          <h2
            id="benefits-heading"
            className="text-2xl font-bold text-slate-900 sm:text-3xl"
          >
            Why Use ToolNoveHub&apos;s QR Code Generator?
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["🔒", "Browser-Based", "Generate QR codes directly in your browser without installing separate software."],
              ["⚡", "Fast", "Generate QR codes quickly without creating an account."],
              ["💰", "Free", "Use the QR code generator without a paid subscription or signup."],
              ["📱", "Mobile Friendly", "The page is designed to work across modern desktop and mobile browsers."],
            ].map(([icon, title, description]) => (
              <div
                key={title}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="text-2xl" aria-hidden="true">
                  {icon}
                </div>

                <h3 className="mt-3 font-semibold text-slate-900">
                  {title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section
          aria-labelledby="faq-heading"
          className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 shadow-lg sm:p-8"
        >
          <h2 id="faq-heading" className="text-2xl font-bold text-slate-900">
            Frequently Asked Questions
          </h2>

          <div className="mt-6 divide-y divide-slate-200">
            {[
              [
                "Can I generate a QR code for Wi-Fi?",
                "Yes. Use the Wi-Fi Network option in the QR code generator and enter the network information required by the tool.",
              ],
              [
                "Is the QR code generator free?",
                "Yes. ToolNoveHub provides this QR code generator as a free online tool without requiring an account.",
              ],
              [
                "Can I download the generated QR code?",
                "Yes. The QR code generator allows you to download the generated QR code as a PNG image.",
              ],
              [
                "How do I scan a QR code?",
                "On many modern phones, you can open the camera and point it at a QR code. Follow the notification or link displayed by your device.",
              ],
            ].map(([question, answer]) => (
              <details key={question} className="py-5">
                <summary className="cursor-pointer font-semibold text-slate-900">
                  {question}
                </summary>

                <p className="mt-3 leading-7 text-slate-600">
                  {answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* Related Tools */}
        <section
          aria-labelledby="related-tools-heading"
          className="mt-12"
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2
                id="related-tools-heading"
                className="text-2xl font-bold text-slate-900"
              >
                Related Free Tools
              </h2>

              <p className="mt-2 text-slate-600">
                Explore more useful online tools from ToolNoveHub.
              </p>
            </div>

            <Link
              href="/tools"
              className="font-semibold text-indigo-600 transition-colors hover:text-indigo-700"
            >
              View all tools →
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              ["/tools/qr-code-scanner", "QR Code Scanner"],
              ["/tools/text-to-slug", "Text to Slug"],
              ["/tools/image-resizer", "Image Resizer"],
              ["/tools/percentage-calculator", "Percentage Calculator"],
            ].map(([href, name]) => (
              <Link
                key={href}
                href={href}
                className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg"
              >
                <span className="text-sm font-semibold text-slate-900">
                  {name}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              webApplicationSchema,
              breadcrumbSchema,
              faqSchema,
            ]),
          }}
        />
      </div>
    </div>
  );
}