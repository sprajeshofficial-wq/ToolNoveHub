import Link from "next/link";
import {
  Calculator,
  QrCode,
  ScanLine,
  FileText,
  Percent,
  CalendarDays,
  Braces,
  Binary,
  ImageIcon,
  Crop,
  Link2,
  Hash,
  Palette,
  HardDrive,
  Repeat2,
  CaseSensitive,
  LockKeyhole,
  Ruler,
} from "lucide-react";

const categories = [
  {
    name: "Calculators",
    description: "Useful calculators for everyday numbers and calculations.",
    href: "/tools/calculators",
  },
  {
    name: "Developer Tools",
    description: "Simple tools for developers, data, and coding tasks.",
    href: "/tools/developer",
  },
  {
    name: "Image Tools",
    description: "Resize and crop images quickly in your browser.",
    href: "/tools/image",
  },
  {
    name: "Text Tools",
    description: "Count, transform, repeat, and format text with ease.",
    href: "/tools/text",
  },
  {
    name: "Design Tools",
    description: "Helpful tools for colors and everyday design work.",
    href: "/tools/design",
  },
  {
    name: "Utility Tools",
    description: "Practical tools for common file and everyday tasks.",
    href: "/tools/utility",
  },
];

const tools = [
  {
    name: "Calculator",
    description:
      "Perform basic arithmetic calculations quickly and easily.",
    href: "/tools/calculator",
    category: "Calculators",
    icon: Calculator,
  },
  {
    name: "Percentage Calculator",
    description:
      "Calculate percentages, increases, decreases, and common percentage problems.",
    href: "/tools/percentage-calculator",
    category: "Calculators",
    icon: Percent,
  },
  {
    name: "Age Calculator",
    description:
      "Calculate your exact age from your date of birth.",
    href: "/tools/age-calculator",
    category: "Calculators",
    icon: CalendarDays,
  },
  {
    name: "QR Code Generator",
    description:
      "Create QR codes for text, URLs, Wi-Fi, and other information.",
    href: "/tools/qr-code-generator",
    category: "Utility",
    icon: QrCode,
  },
  {
    name: "QR Code Scanner",
    description:
      "Scan QR codes directly from your device and quickly read their content.",
    href: "/tools/qr-code-scanner",
    category: "Utility",
    icon: ScanLine,
  },
  {
    name: "Word Counter",
    description:
      "Count words, characters, sentences, and paragraphs in your text.",
    href: "/tools/word-counter",
    category: "Text",
    icon: FileText,
  },
  {
    name: "JSON Formatter",
    description:
      "Format and beautify JSON data for easier reading and debugging.",
    href: "/tools/json-formatter",
    category: "Developer",
    icon: Braces,
  },
  {
    name: "JSON Validator",
    description:
      "Check JSON data for syntax errors and validate its structure.",
    href: "/tools/json-validator",
    category: "Developer",
    icon: Braces,
  },
  {
    name: "Binary Converter",
    description:
      "Convert binary numbers to decimal and decimal numbers to binary.",
    href: "/tools/binary-converter",
    category: "Developer",
    icon: Binary,
  },
  {
    name: "Password Generator",
    description:
      "Generate strong random passwords with customizable options.",
    href: "/tools/password-generator",
    category: "Utility",
    icon: LockKeyhole,
  },
  {
    name: "Image Resizer",
    description:
      "Resize images to custom dimensions directly in your browser.",
    href: "/tools/image-resizer",
    category: "Image",
    icon: ImageIcon,
  },
  {
    name: "Image Cropper",
    description:
      "Crop images to the area you need with simple controls.",
    href: "/tools/image-cropper",
    category: "Image",
    icon: Crop,
  },
  {
    name: "Text to Slug",
    description:
      "Convert text into clean, URL-friendly slugs.",
    href: "/tools/text-to-slug",
    category: "Text",
    icon: Link2,
  },
  {
    name: "Number to Words",
    description:
      "Convert numbers into written English words.",
    href: "/tools/number-to-words",
    category: "Utility",
    icon: Hash,
  },
  {
    name: "Color Picker",
    description:
      "Pick colors and view their HEX, RGB, and other color values.",
    href: "/tools/color-picker",
    category: "Design",
    icon: Palette,
  },
  {
    name: "File Size Converter",
    description:
      "Convert file sizes between bytes, KB, MB, GB, and other units.",
    href: "/tools/file-size-converter",
    category: "Utility",
    icon: HardDrive,
  },
  {
    name: "Text Repeater",
    description:
      "Repeat text multiple times with a customizable separator.",
    href: "/tools/text-repeater",
    category: "Text",
    icon: Repeat2,
  },
  {
    name: "Text to ASCII",
    description:
      "Convert text characters into ASCII character codes.",
    href: "/tools/text-to-ascii",
    category: "Text",
    icon: CaseSensitive,
  },
  {
    name: "Unit Converter",
    description:
      "Convert common measurements such as length, weight, temperature, and more.",
    href: "/tools/unit-converter",
    category: "Utility",
    icon: Ruler,
  },
];

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
              ToolNoveHub Tools
            </span>

            <h1 className="mt-5 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Free Online Tools
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
              Simple, fast, and useful online tools for everyday tasks,
              students, developers, creators, and businesses.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Browse by category
              </h2>

              <p className="mt-2 text-gray-600">
                Find the right tool for your task.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.href}
                href={category.href}
                className="group rounded-2xl border border-gray-200 bg-gray-50 p-6 transition hover:-translate-y-1 hover:border-blue-200 hover:bg-white hover:shadow-md"
              >
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600">
                  {category.name}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {category.description}
                </p>

                <div className="mt-4 text-sm font-semibold !text-blue-600">
                  Explore category →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All Tools */}
      <section className="border-t border-gray-200 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                All tools
              </h2>

              <p className="mt-2 text-gray-600">
                Explore all {tools.length} available ToolNoveHub tools.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => {
              const Icon = tool.icon;

              return (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-100">
                      <Icon size={24} strokeWidth={2} />
                    </div>

                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                      {tool.category}
                    </span>
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-gray-900 group-hover:text-blue-600">
                    {tool.name}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    {tool.description}
                  </p>

                  <div className="mt-5 text-sm font-semibold !text-blue-600">
                    Open tool →
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why ToolNoveHub */}
      <section className="border-t border-gray-200 bg-white px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Why use ToolNoveHub?
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              ToolNoveHub is built to make common online tasks faster and
              simpler without unnecessary complexity.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
              <h3 className="text-lg font-bold text-gray-900">
                Free to use
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                Access useful online tools without requiring a paid
                subscription.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
              <h3 className="text-lg font-bold text-gray-900">
                Simple and fast
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                Clean interfaces help you complete everyday tasks quickly.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
              <h3 className="text-lg font-bold text-gray-900">
                Browser-based
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                Many tools process your information directly in your browser.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-950 px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight !text-white sm:text-4xl">
            Find the right tool for your task
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 !text-gray-300">
            Explore our collection of free online tools and get things done
            faster.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="rounded-lg bg-white px-6 py-3 text-sm font-semibold !text-gray-900 transition hover:bg-gray-100"
            >
              Back to Home
            </Link>

            <Link
              href="/contact"
              className="rounded-lg border border-gray-700 px-6 py-3 text-sm font-semibold !text-white transition hover:bg-gray-800"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}