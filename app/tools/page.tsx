import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  QrCode,
  FileText,
  Percent,
  CalendarDays,
  Braces,
  Binary,
  Image as ImageIcon,
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

export const metadata: Metadata = {
  title: "Free Online Tools | ToolNoveHub",
  description:
    "Explore 18 free online tools for calculations, images, text, developer tasks, QR codes, and everyday productivity.",
  alternates: {
    canonical: "https://toolnovehub.tools/tools",
  },
  openGraph: {
    type: "website",
    url: "https://toolnovehub.tools/tools",
    title: "Free Online Tools | ToolNoveHub",
    description:
      "Explore 18 free online tools for calculations, images, text, developer tasks, QR codes, and everyday productivity.",
    siteName: "ToolNoveHub",
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

const tools = [
  {
    name: "Calculator",
    slug: "calculator",
    description: "Fast everyday mathematical calculations.",
    icon: Calculator,
  },
  {
    name: "Percentage Calculator",
    slug: "percentage-calculator",
    description:
      "Calculate percentages, increases, decreases, and more.",
    icon: Percent,
  },
  {
    name: "Age Calculator",
    slug: "age-calculator",
    description: "Calculate exact age between dates.",
    icon: CalendarDays,
  },
  {
    name: "QR Code Generator",
    slug: "qr-code-generator",
    description:
      "Create QR codes for URLs and supported text.",
    icon: QrCode,
  },
  {
    name: "Word Counter",
    slug: "word-counter",
    description:
      "Count words, characters, sentences, and more.",
    icon: FileText,
  },
  {
    name: "JSON Formatter",
    slug: "json-formatter",
    description:
      "Format JSON into clean, readable data.",
    icon: Braces,
  },
  {
    name: "JSON Validator",
    slug: "json-validator",
    description:
      "Check JSON syntax and find common errors.",
    icon: Braces,
  },
  {
    name: "Binary Converter",
    slug: "binary-converter",
    description:
      "Convert supported binary and decimal values.",
    icon: Binary,
  },
  {
    name: "Password Generator",
    slug: "password-generator",
    description:
      "Generate strong random passwords.",
    icon: LockKeyhole,
  },
  {
    name: "Image Resizer",
    slug: "image-resizer",
    description:
      "Resize images to the dimensions you need.",
    icon: ImageIcon,
  },
  {
    name: "Image Cropper",
    slug: "image-cropper",
    description:
      "Crop images for better framing and layouts.",
    icon: Crop,
  },
  {
    name: "Text to Slug",
    slug: "text-to-slug",
    description:
      "Create clean URL-friendly slugs.",
    icon: Link2,
  },
  {
    name: "Number to Words",
    slug: "number-to-words",
    description:
      "Convert numbers into written words.",
    icon: Hash,
  },
  {
    name: "Color Picker",
    slug: "color-picker",
    description:
      "Pick a color and view useful color values.",
    icon: Palette,
  },
  {
    name: "File Size Converter",
    slug: "file-size-converter",
    description:
      "Convert common digital storage units.",
    icon: HardDrive,
  },
  {
    name: "Text Repeater",
    slug: "text-repeater",
    description:
      "Repeat text quickly with custom counts.",
    icon: Repeat2,
  },
  {
    name: "Text to ASCII",
    slug: "text-to-ascii",
    description:
      "Create decorative ASCII-style text.",
    icon: CaseSensitive,
  },
  {
    name: "Unit Converter",
    slug: "unit-converter",
    description:
      "Convert common measurement units.",
    icon: Ruler,
  },
];

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 px-4 py-14 sm:py-20">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">
            ToolNoveHub
          </p>

          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Free Online Tools
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            18 simple tools for calculations, QR codes, images, writing,
            developer tasks, and everyday work.
          </p>
        </header>

        {/* Tool List */}
        <section
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          aria-label="Tool list"
        >
          {tools.map((tool) => {
            const Icon = tool.icon;

            return (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <Icon
                    className="h-6 w-6"
                    aria-hidden="true"
                  />
                </div>

                <h2 className="mt-5 text-lg font-bold text-slate-900 group-hover:text-indigo-700">
                  {tool.name}
                </h2>

                <p className="mt-2 min-h-12 text-sm leading-6 text-slate-600">
                  {tool.description}
                </p>

                <span className="mt-5 inline-flex items-center text-sm font-semibold text-indigo-600">
                  Open tool
                  <ArrowRight
                    className="ml-2 h-4 w-4 transition group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            );
          })}
        </section>

        {/* Blog CTA */}
        <section className="mt-14 rounded-3xl bg-slate-900 px-7 py-10 text-center text-white sm:px-10">
          <h2 className="text-2xl font-bold">
            Need help choosing a tool?
          </h2>

          <p className="mx-auto mt-3 max-w-2xl leading-7 text-slate-300">
            Read the ToolNoveHub guides for practical examples, tips,
            and explanations.
          </p>

          <Link
            href="/blog"
            className="mt-6 inline-flex items-center rounded-xl bg-white px-5 py-3 font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            Read the Blog
            <ArrowRight
              className="ml-2 h-4 w-4"
              aria-hidden="true"
            />
          </Link>
        </section>
      </div>
    </main>
  );
}