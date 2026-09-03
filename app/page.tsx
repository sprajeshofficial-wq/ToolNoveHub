import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  Code2,
  FileText,
  Image as ImageIcon,
  QrCode,
  Search,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";

const popularTools = [
  {
    name: "QR Code Generator",
    description: "Create QR codes quickly for links, text, and Wi-Fi.",
    href: "/tools/qr-code-generator",
    icon: QrCode,
  },
  {
    name: "Word Counter",
    description: "Count words, characters, sentences, and paragraphs.",
    href: "/tools/word-counter",
    icon: FileText,
  },
  {
    name: "Percentage Calculator",
    description: "Calculate percentages, increases, decreases, and more.",
    href: "/tools/percentage-calculator",
    icon: Calculator,
  },
  {
    name: "Image Resizer",
    description: "Resize images to the dimensions you need.",
    href: "/tools/image-resizer",
    icon: ImageIcon,
  },
  {
    name: "JSON Formatter",
    description: "Format and organize JSON data for easier reading.",
    href: "/tools/json-formatter",
    icon: Code2,
  },
  {
    name: "Text to Slug",
    description: "Create clean, SEO-friendly URL slugs from text.",
    href: "/tools/text-to-slug",
    icon: Search,
  },
];

const categories = [
  {
    name: "Calculators",
    description: "Simple calculators for everyday tasks.",
    href: "/tools/calculators",
    icon: Calculator,
  },
  {
    name: "Developer Tools",
    description: "Useful tools for developers and technical work.",
    href: "/tools/developer",
    icon: Code2,
  },
  {
    name: "Image Tools",
    description: "Resize, crop, convert, and work with images.",
    href: "/tools/image",
    icon: ImageIcon,
  },
  {
    name: "Text Tools",
    description: "Count, convert, format, and transform text.",
    href: "/tools/text",
    icon: FileText,
  },
];

const benefits = [
  {
    title: "Free to use",
    description:
      "Use our online tools without complicated registration or unnecessary steps.",
    icon: Sparkles,
  },
  {
    title: "Simple and fast",
    description:
      "Focused interfaces help you complete common tasks quickly.",
    icon: Wrench,
  },
  {
    title: "Privacy focused",
    description:
      "Many tools are designed to process information directly in your browser.",
    icon: ShieldCheck,
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="border-b border-gray-200 bg-gradient-to-b from-blue-50 via-white to-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-medium text-blue-700 shadow-sm">
              <Sparkles size={16} />
              Free online tools for everyday tasks
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
              Simple tools that help you
              <span className="block text-blue-600">
                get things done
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              ToolNoveHub brings together useful online tools for students,
              developers, creators, office work, and everyday tasks.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              {/* Primary Button */}
              <Link
                href="/tools"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold !text-white shadow-sm transition hover:bg-blue-700 sm:w-auto"
              >
                Explore all tools
                <ArrowRight size={18} />
              </Link>

              {/* Secondary Button */}
              <Link
                href="/about"
                className="inline-flex w-full items-center justify-center rounded-xl border border-gray-300 bg-white px-6 py-3.5 text-sm font-semibold !text-gray-900 transition hover:bg-gray-50 sm:w-auto"
              >
                Learn about ToolNoveHub
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Popular tools */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                Popular tools
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
                Useful tools, ready when you need them
              </h2>

              <p className="mt-3 max-w-2xl text-gray-600">
                Choose a tool below and complete your task directly in your
                browser.
              </p>
            </div>

            <Link
              href="/tools"
              className="inline-flex items-center gap-1 text-sm font-semibold !text-blue-600 hover:!text-blue-700"
            >
              View all tools
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {popularTools.map((tool) => {
              const Icon = tool.icon;

              return (
                <Link
                  key={tool.name}
                  href={tool.href}
                  className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 !text-blue-600">
                    <Icon size={22} />
                  </div>

                  <h3 className="mt-5 text-lg font-semibold !text-gray-900 group-hover:!text-blue-600">
                    {tool.name}
                  </h3>

                  <p className="mt-2 text-sm leading-6 !text-gray-600">
                    {tool.description}
                  </p>

                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold !text-blue-600">
                    Use tool
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

      {/* Categories */}
      <section className="border-y border-gray-200 bg-gray-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
              Tool categories
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
              Find the right tool for your task
            </h2>

            <p className="mt-3 text-gray-600">
              Browse tools by category to quickly find what you need.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => {
              const Icon = category.icon;

              return (
                <Link
                  key={category.name}
                  href={category.href}
                  className="group rounded-2xl border border-gray-200 bg-white p-6 transition hover:border-blue-200 hover:shadow-sm"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 !text-gray-700 transition group-hover:bg-blue-50 group-hover:!text-blue-600">
                    <Icon size={21} />
                  </div>

                  <h3 className="mt-5 font-semibold !text-gray-900">
                    {category.name}
                  </h3>

                  <p className="mt-2 text-sm leading-6 !text-gray-600">
                    {category.description}
                  </p>

                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold !text-blue-600">
                    Browse
                    <ArrowRight size={15} />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why ToolNoveHub */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
              Why ToolNoveHub
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
              Built to be useful
            </h2>

            <p className="mt-3 text-gray-600">
              We focus on practical tools with clear interfaces and useful
              information.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <div
                  key={benefit.title}
                  className="rounded-2xl border border-gray-200 bg-gray-50 p-7"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white !text-blue-600 shadow-sm">
                    <Icon size={21} />
                  </div>

                  <h3 className="mt-5 text-lg font-semibold !text-gray-900">
                    {benefit.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 !text-gray-600">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Information section */}
      <section className="bg-gray-950 py-16 text-white sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 !text-white">
            <Wrench size={23} />
          </div>

          <h2 className="mt-6 text-3xl font-bold tracking-tight !text-white">
            Tools made for real-world tasks
          </h2>

          <p className="mt-4 text-base leading-7 !text-gray-300">
            Whether you are checking a calculation, preparing content,
            working with images, formatting data, or solving a developer
            problem, ToolNoveHub is designed to make common tasks easier.
          </p>

          <div className="mt-8">
            {/* Dark Section Button */}
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold !text-gray-900 shadow-sm transition hover:bg-gray-100"
            >
              Explore ToolNoveHub
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}