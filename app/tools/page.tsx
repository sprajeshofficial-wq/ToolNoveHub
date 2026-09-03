import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  Code2,
  FileText,
  Image as ImageIcon,
  QrCode,
  Search,
  Sparkles,
} from "lucide-react";

const tools = [
  {
    name: "QR Code Generator",
    description:
      "Create QR codes for websites, text, Wi-Fi networks, and other useful information.",
    href: "/tools/qr-code-generator",
    category: "Popular",
    icon: QrCode,
  },
  {
    name: "Word Counter",
    description:
      "Count words, characters, sentences, paragraphs, and reading time.",
    href: "/tools/word-counter",
    category: "Text",
    icon: FileText,
  },
  {
    name: "Percentage Calculator",
    description:
      "Calculate percentages, percentage changes, increases, decreases, and more.",
    href: "/tools/percentage-calculator",
    category: "Calculator",
    icon: Calculator,
  },
  {
    name: "Age Calculator",
    description:
      "Calculate your exact age from your date of birth.",
    href: "/tools/age-calculator",
    category: "Calculator",
    icon: Calculator,
  },
  {
    name: "JSON Formatter",
    description:
      "Format and organize JSON data so it is easier to read and understand.",
    href: "/tools/json-formatter",
    category: "Developer",
    icon: Code2,
  },
  {
    name: "Image Resizer",
    description:
      "Resize images to custom dimensions while keeping them easy to use online.",
    href: "/tools/image-resizer",
    category: "Image",
    icon: ImageIcon,
  },
  {
    name: "Image Cropper",
    description:
      "Crop images to the exact area and dimensions you need.",
    href: "/tools/image-cropper",
    category: "Image",
    icon: ImageIcon,
  },
  {
    name: "Text to Slug",
    description:
      "Convert titles and text into clean, SEO-friendly URL slugs.",
    href: "/tools/text-to-slug",
    category: "Text",
    icon: Search,
  },
  {
    name: "Number to Words",
    description:
      "Convert numbers into words for documents, invoices, and everyday use.",
    href: "/tools/number-to-words",
    category: "Text",
    icon: FileText,
  },
  {
    name: "Binary Converter",
    description:
      "Convert numbers between binary and decimal formats.",
    href: "/tools/binary-converter",
    category: "Developer",
    icon: Code2,
  },
  {
    name: "Color Picker",
    description:
      "Pick colors and get useful color values for design and development.",
    href: "/tools/color-picker",
    category: "Design",
    icon: Sparkles,
  },
  {
    name: "File Size Converter",
    description:
      "Convert file sizes between bytes, KB, MB, GB, and other units.",
    href: "/tools/file-size-converter",
    category: "Utility",
    icon: Calculator,
  },
];

const categories = [
  "All",
  "Calculator",
  "Developer",
  "Image",
  "Text",
  "Design",
  "Utility",
];

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page header */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
              ToolNoveHub tools
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl">
              Free online tools for everyday tasks
            </h1>

            <p className="mt-5 text-lg leading-8 text-gray-600">
              Browse our collection of practical tools for calculations,
              text, images, development, design, and more.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl overflow-x-auto px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex min-w-max justify-center gap-2">
            {categories.map((category, index) => (
              <span
                key={category}
                className={`rounded-full px-4 py-2 text-sm font-medium ${
                  index === 0
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="py-14 sm:py-18">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                All tools
              </h2>

              <p className="mt-1 text-sm text-gray-600">
                {tools.length} useful tools available
              </p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => {
              const Icon = tool.icon;

              return (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <Icon size={22} />
                    </div>

                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                      {tool.category}
                    </span>
                  </div>

                  <h3 className="mt-5 text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                    {tool.name}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    {tool.description}
                  </p>

                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-blue-600">
                    Open tool
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

      {/* Bottom information */}
      <section className="border-t border-gray-200 bg-white py-14">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-2xl font-bold text-gray-900">
            More useful tools are coming
          </h2>

          <p className="mt-3 leading-7 text-gray-600">
            ToolNoveHub is being built as a practical collection of simple
            online utilities. We will continue adding tools based on useful
            everyday tasks and real user needs.
          </p>

          <Link
            href="/about"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            Learn more about ToolNoveHub
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}