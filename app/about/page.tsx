import type { Metadata } from "next";
import Link from "next/link";
import {
  CheckCircle2,
  ShieldCheck,
  Zap,
  Wrench,
  Target,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About ToolNoveHub",
  description:
    "Learn about ToolNoveHub, a collection of free, simple, fast, and privacy-focused online tools for everyday tasks.",
  alternates: {
    canonical: "https://toolnovehub.tools/about",
  },
  openGraph: {
    title: "About ToolNoveHub",
    description:
      "Learn about ToolNoveHub and our mission to provide useful, simple, and accessible online tools.",
    url: "https://toolnovehub.tools/about",
    siteName: "ToolNoveHub",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const features = [
  {
    icon: Wrench,
    title: "Useful tools",
    description:
      "We build practical online tools that help with everyday tasks, work, study, development, and digital projects.",
  },
  {
    icon: Zap,
    title: "Simple and fast",
    description:
      "Our tools are designed with straightforward interfaces so you can get the result you need without unnecessary steps.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy focused",
    description:
      "Where possible, tools process information directly in your browser instead of requiring unnecessary uploads to a server.",
  },
  {
    icon: CheckCircle2,
    title: "Free to use",
    description:
      "ToolNoveHub is built around providing useful online tools that are accessible without complicated subscriptions.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
            <Wrench size={32} />
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            About ToolNoveHub
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            ToolNoveHub provides simple, useful, and free online tools that
            help people complete everyday digital tasks quickly.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-blue-600">
                <Target size={18} />
                Our mission
              </div>

              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                Making useful tools easier to access
              </h2>

              <p className="mt-5 leading-7 text-gray-600">
                Many simple digital tasks should not require complicated
                software or expensive subscriptions. ToolNoveHub aims to make
                those tasks easier by bringing practical tools together in one
                easy-to-use website.
              </p>

              <p className="mt-4 leading-7 text-gray-600">
                From calculators and developer utilities to image and text
                tools, our goal is to provide focused tools that are easy to
                understand and quick to use.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-7">
              <h3 className="text-xl font-semibold text-gray-900">
                What we focus on
              </h3>

              <ul className="mt-5 space-y-4">
                <li className="flex gap-3">
                  <CheckCircle2
                    className="mt-0.5 shrink-0 text-green-600"
                    size={20}
                  />
                  <span className="text-gray-600">
                    Clear and easy-to-use interfaces
                  </span>
                </li>

                <li className="flex gap-3">
                  <CheckCircle2
                    className="mt-0.5 shrink-0 text-green-600"
                    size={20}
                  />
                  <span className="text-gray-600">
                    Fast tools for common tasks
                  </span>
                </li>

                <li className="flex gap-3">
                  <CheckCircle2
                    className="mt-0.5 shrink-0 text-green-600"
                    size={20}
                  />
                  <span className="text-gray-600">
                    Browser-based processing where practical
                  </span>
                </li>

                <li className="flex gap-3">
                  <CheckCircle2
                    className="mt-0.5 shrink-0 text-green-600"
                    size={20}
                  />
                  <span className="text-gray-600">
                    Helpful tools for work, study, and personal projects
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-y border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Why ToolNoveHub?
            </h2>

            <p className="mt-4 text-gray-600">
              We keep our tools focused on usefulness, simplicity, and a
              straightforward user experience.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-gray-200 bg-white p-6"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                    <Icon size={22} />
                  </div>

                  <h3 className="mt-5 text-lg font-semibold text-gray-900">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tools CTA */}
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Explore our tools
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Browse the growing collection of free online tools available on
            ToolNoveHub.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/tools"
              className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Explore Tools
            </Link>

            <Link
              href="/contact"
              className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}