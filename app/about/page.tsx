import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  CheckCircle2,
  Code2,
  FileText,
  Image as ImageIcon,
  Lock,
  Palette,
  Sparkles,
  Wrench,
} from "lucide-react";

const toolCategories = [
  {
    name: "Calculators",
    description:
      "Practical calculators for percentages, ages, everyday math, and other common calculations.",
    href: "/tools/calculators",
    icon: Calculator,
  },
  {
    name: "Developer Tools",
    description:
      "Browser-based utilities for working with JSON, binary values, and other common development tasks.",
    href: "/tools/developer",
    icon: Code2,
  },
  {
    name: "Image Tools",
    description:
      "Simple tools for resizing and cropping images for websites, documents, social media, and digital projects.",
    href: "/tools/image",
    icon: ImageIcon,
  },
  {
    name: "Text Tools",
    description:
      "Tools for counting, repeating, converting, and transforming text for writing and digital content.",
    href: "/tools/text",
    icon: FileText,
  },
  {
    name: "Design Tools",
    description:
      "Useful browser-based tools for colors and other creative tasks.",
    href: "/tools/design",
    icon: Palette,
  },
  {
    name: "Utility Tools",
    description:
      "Everyday utilities for QR codes, file sizes, numbers, passwords, and unit conversions.",
    href: "/tools/utility",
    icon: Wrench,
  },
];

const principles = [
  {
    title: "Useful by design",
    description:
      "Each tool is built around a specific task so visitors can find what they need without unnecessary complexity.",
    icon: Sparkles,
  },
  {
    title: "Simple to use",
    description:
      "We aim for clear interfaces, understandable instructions, and straightforward results.",
    icon: CheckCircle2,
  },
  {
    title: "Privacy focused",
    description:
      "Where practical, our tools process information directly in the browser so users can complete tasks without unnecessary uploads.",
    icon: Lock,
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <section className="border-b border-gray-200 bg-gradient-to-b from-blue-50 via-white to-white">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center">
            <Image
              src="/logo.png"
              alt="ToolNoveHub logo"
              width={64}
              height={64}
              className="h-16 w-16 object-contain"
            />
          </div>

          <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-blue-600">
            About ToolNoveHub
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl">
            Practical online tools for everyday digital tasks
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
            ToolNoveHub is a collection of free online tools designed to help
            people complete common digital tasks quickly and easily. Our tools
            cover calculations, development, images, text, design, and
            everyday utilities.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
              Our mission
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Making useful tools easier to access
            </h2>

            <div className="mt-6 space-y-5 text-base leading-7 text-gray-600">
              <p>
                Many everyday digital tasks do not require complicated
                software. A person may only need to calculate a percentage,
                resize an image, format JSON, convert a number to words, or
                create a QR code.
              </p>

              <p>
                ToolNoveHub brings these focused tasks together in one place.
                Instead of requiring visitors to install separate applications
                or search for a different website for every small task, our
                goal is to provide practical tools with simple interfaces and
                clear instructions.
              </p>

              <p>
                We continue to expand the collection based on useful,
                repeatable tasks that can be handled effectively through a web
                browser.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What you can find */}
      <section className="border-y border-gray-200 bg-gray-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
              What you can find
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Tools organized around real tasks
            </h2>

            <p className="mt-4 text-base leading-7 text-gray-600">
              ToolNoveHub currently organizes its tools into six main
              categories, making it easier to find the right tool for work,
              study, development, content creation, and personal projects.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {toolCategories.map((category) => {
              const Icon = category.icon;

              return (
                <Link
                  key={category.name}
                  href={category.href}
                  className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Icon size={21} />
                  </div>

                  <h3 className="mt-5 text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                    {category.name}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    {category.description}
                  </p>

                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-blue-600">
                    Explore category
                    <ArrowRight
                      size={15}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* How we build */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
              What matters to us
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Built around usefulness
            </h2>

            <p className="mt-4 text-base leading-7 text-gray-600">
              We focus on making each tool understandable and useful rather
              than adding unnecessary features.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {principles.map((principle) => {
              const Icon = principle.icon;

              return (
                <div
                  key={principle.title}
                  className="rounded-2xl border border-gray-200 bg-gray-50 p-7"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                    <Icon size={21} />
                  </div>

                  <h3 className="mt-5 text-lg font-semibold text-gray-900">
                    {principle.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    {principle.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Who the tools are for */}
      <section className="border-y border-gray-200 bg-gray-50 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Who can use ToolNoveHub?
          </h2>

          <div className="mt-6 space-y-5 text-base leading-7 text-gray-600">
            <p>
              ToolNoveHub is designed for students, developers, creators,
              office workers, small businesses, and anyone who needs a quick
              online solution to a common digital task.
            </p>

            <p>
              Students can use calculators, text utilities, and number
              conversion tools. Developers can work with JSON and binary data.
              Creators can resize or crop images and work with text. Businesses
              and everyday users can use calculators, QR code tools, file
              utilities, and other practical resources.
            </p>

            <p>
              The goal is simple: provide useful tools that solve specific
              problems without making the process harder than it needs to be.
            </p>
          </div>
        </div>
      </section>

      {/* Privacy */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-blue-100 bg-blue-50 p-7 sm:p-9">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
              <Lock size={21} />
            </div>

            <h2 className="mt-5 text-2xl font-bold tracking-tight text-gray-900">
              Browser-based and privacy focused
            </h2>

            <p className="mt-4 text-base leading-7 text-gray-600">
              Where practical, ToolNoveHub is designed so that processing can
              happen directly in your browser. This can reduce the need to
              send information to a server for simple tasks. The exact
              processing method depends on the individual tool, so users
              should review the relevant tool information and our{" "}
              <Link
                href="/privacy"
                className="font-semibold text-blue-600 hover:text-blue-700"
              >
                Privacy Policy
              </Link>{" "}
              for more details.
            </p>
          </div>
        </div>
      </section>

      {/* Explore */}
      <section className="bg-gray-950 py-16 text-white sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight !text-white sm:text-4xl">
            Explore ToolNoveHub
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 !text-gray-300">
            Browse the complete collection of free online tools or learn more
            about how ToolNoveHub works.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold !text-gray-900 shadow-sm transition hover:bg-gray-100"
            >
              Explore all tools
              <ArrowRight size={17} />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-700 px-6 py-3.5 text-sm font-semibold !text-white transition hover:bg-gray-900"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}