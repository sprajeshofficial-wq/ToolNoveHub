import type { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen,
  Calculator,
  Code2,
  Image as ImageIcon,
  Lock,
  Search,
  Text,
  Wrench,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Docs & Help",
  description:
    "Learn how to use ToolNoveHub online tools, understand browser-based processing, and find helpful information about our tools.",
  alternates: {
    canonical: "https://toolnovehub.tools/docs",
  },
  openGraph: {
    title: "ToolNoveHub Docs & Help",
    description:
      "Learn how to use ToolNoveHub tools and find helpful information about our online utilities.",
    url: "https://toolnovehub.tools/docs",
    siteName: "ToolNoveHub",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const categories = [
  {
    icon: Calculator,
    title: "Calculators",
    description:
      "Perform common calculations quickly using simple browser-based calculators.",
    href: "/tools/calculators",
  },
  {
    icon: Code2,
    title: "Developer Tools",
    description:
      "Useful utilities for working with JSON, binary values, and other development tasks.",
    href: "/tools/developer",
  },
  {
    icon: ImageIcon,
    title: "Image Tools",
    description:
      "Resize and crop images directly in your browser.",
    href: "/tools/image",
  },
  {
    icon: Text,
    title: "Text Tools",
    description:
      "Count words, create URL-friendly slugs, and perform other text-related tasks.",
    href: "/tools/text",
  },
  {
    icon: Wrench,
    title: "Utility Tools",
    description:
      "Practical utilities such as QR code generation and file size conversion.",
    href: "/tools/utility",
  },
];

const steps = [
  {
    number: "1",
    title: "Choose a tool",
    description:
      "Open the Tools page and select the tool that matches the task you want to complete.",
  },
  {
    number: "2",
    title: "Enter your information",
    description:
      "Enter text, numbers, upload an image, or provide the information required by the selected tool.",
  },
  {
    number: "3",
    title: "Get your result",
    description:
      "The tool processes your input and displays the result directly on the page.",
  },
  {
    number: "4",
    title: "Copy or download",
    description:
      "Where supported, you can copy the result or download the generated file.",
  },
];

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
            <BookOpen size={32} />
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Docs & Help
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            Learn how to use ToolNoveHub tools and find answers to common
            questions about our online utilities.
          </p>
        </div>
      </section>

      {/* Getting Started */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Getting Started
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              ToolNoveHub is designed to keep common digital tasks simple.
              Most tools require only a few steps to produce a result.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <div
                key={step.number}
                className="rounded-2xl border border-gray-200 bg-gray-50 p-6"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                  {step.number}
                </div>

                <h3 className="mt-5 text-lg font-semibold text-gray-900">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tool Categories */}
      <section className="border-y border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Tool Categories
            </h2>

            <p className="mt-4 text-gray-600">
              Browse tools by category to find the right utility for your
              task.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => {
              const Icon = category.icon;

              return (
                <Link
                  key={category.title}
                  href={category.href}
                  className="group rounded-2xl border border-gray-200 bg-white p-6 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                    <Icon size={22} />
                  </div>

                  <h3 className="mt-5 text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                    {category.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    {category.description}
                  </p>

                  <span className="mt-5 inline-block text-sm font-semibold text-blue-600">
                    Browse category →
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Privacy */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-[auto_1fr] md:items-start">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-600">
              <Lock size={27} />
            </div>

            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                Privacy-focused tools
              </h2>

              <p className="mt-4 leading-7 text-gray-600">
                Many ToolNoveHub tools are designed to process information
                directly in your browser. When a tool works this way, your
                input can be processed locally without being uploaded to our
                server.
              </p>

              <p className="mt-4 leading-7 text-gray-600">
                The exact behavior can vary between tools, so always check the
                individual tool page and our Privacy Policy for more
                information.
              </p>

              <Link
                href="/privacy"
                className="mt-6 inline-flex font-semibold text-blue-600 hover:text-blue-700"
              >
                Read our Privacy Policy →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-y border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Search className="text-blue-600" size={25} />

            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="mt-8 space-y-4">
            <details className="rounded-xl border border-gray-200 bg-white p-5">
              <summary className="cursor-pointer font-semibold text-gray-900">
                Are ToolNoveHub tools free?
              </summary>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                Yes. ToolNoveHub is designed to provide useful online tools
                that can be used without a paid subscription.
              </p>
            </details>

            <details className="rounded-xl border border-gray-200 bg-white p-5">
              <summary className="cursor-pointer font-semibold text-gray-900">
                Do I need to install software?
              </summary>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                No. ToolNoveHub tools are available through your web browser,
                so there is generally no software installation required.
              </p>
            </details>

            <details className="rounded-xl border border-gray-200 bg-white p-5">
              <summary className="cursor-pointer font-semibold text-gray-900">
                Can I use ToolNoveHub on a phone?
              </summary>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                Yes. The website is designed to work across desktop, tablet,
                and mobile screen sizes.
              </p>
            </details>

            <details className="rounded-xl border border-gray-200 bg-white p-5">
              <summary className="cursor-pointer font-semibold text-gray-900">
                Where can I report a problem?
              </summary>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                If you find a problem with a tool or have a question, you can
                contact the ToolNoveHub team through the Contact page.
              </p>

              <Link
                href="/contact"
                className="mt-4 inline-block text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                Contact Us →
              </Link>
            </details>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Ready to use a tool?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Browse the complete collection of ToolNoveHub online tools.
          </p>

          <div className="mt-8">
            <Link
              href="/tools"
              className="inline-flex rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Explore All Tools
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}