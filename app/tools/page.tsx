"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  QrCode,
  Image as ImageIcon,
  Percent,
  AlignLeft,
  Braces,
  Wrench,
  Search,
  Type,
  Hash,
  Calculator as CalculatorIcon,
  Palette,
  FileJson,
  Scan,
  Crop,
  TextQuote,
  Binary,
  FileText,
  X,
  Sparkles,
  RefreshCw,
  Key,
  Layers,
  Calendar,
  Eraser,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type ToolCategory =
  | "Developer Tools"
  | "Text Tools"
  | "Calculator Tools"
  | "Design Tools"
  | "Security Tools";

type Tool = {
  name: string;
  description: string;
  icon: LucideIcon;
  href: string;
  category: ToolCategory;
  color: string;
};

const ALL_TOOLS: Tool[] = [
  // Developer Tools
  {
    name: "QR Code Generator",
    description: "Generate QR codes instantly for any URL or text.",
    icon: QrCode,
    href: "/tools/qr-code-generator",
    category: "Developer Tools",
    color: "from-emerald-500 to-teal-500",
  },
  {
    name: "QR Code Scanner",
    description: "Scan QR codes using your camera.",
    icon: Scan,
    href: "/tools/qr-code-scanner",
    category: "Developer Tools",
    color: "from-teal-500 to-cyan-500",
  },
  {
    name: "JSON Formatter",
    description: "Format, validate, and beautify JSON data.",
    icon: Braces,
    href: "/tools/json-formatter",
    category: "Developer Tools",
    color: "from-violet-500 to-purple-500",
  },
  {
    name: "JSON Validator",
    description: "Validate JSON data and find syntax errors instantly.",
    icon: FileJson,
    href: "/tools/json-validator",
    category: "Developer Tools",
    color: "from-indigo-500 to-purple-500",
  },
  {
    name: "Binary Converter",
    description: "Convert text to binary and binary to text.",
    icon: Binary,
    href: "/tools/binary-converter",
    category: "Developer Tools",
    color: "from-rose-500 to-red-500",
  },
  {
    name: "Text to Slug Converter",
    description: "Convert any text to a clean URL-friendly slug.",
    icon: Type,
    href: "/tools/text-to-slug",
    category: "Developer Tools",
    color: "from-indigo-500 to-blue-500",
  },

  // Text Tools
  {
    name: "Word Counter",
    description: "Count words, characters, and sentences in any text.",
    icon: AlignLeft,
    href: "/tools/word-counter",
    category: "Text Tools",
    color: "from-rose-500 to-pink-500",
  },
  {
    name: "Text to ASCII",
    description: "Convert text to ASCII art.",
    icon: TextQuote,
    href: "/tools/text-to-ascii",
    category: "Text Tools",
    color: "from-gray-500 to-slate-500",
  },
  {
    name: "Text Repeater",
    description: "Repeat text multiple times with custom separators.",
    icon: RefreshCw,
    href: "/tools/text-repeater",
    category: "Text Tools",
    color: "from-green-500 to-emerald-500",
  },

  // Calculator Tools
  {
    name: "Percentage Calculator",
    description: "Calculate percentages quickly and easily.",
    icon: Percent,
    href: "/tools/percentage-calculator",
    category: "Calculator Tools",
    color: "from-amber-500 to-orange-500",
  },
  {
    name: "Calculator",
    description: "Basic calculator for quick arithmetic.",
    icon: CalculatorIcon,
    href: "/tools/calculator",
    category: "Calculator Tools",
    color: "from-green-500 to-emerald-500",
  },
  {
    name: "File Size Converter",
    description: "Convert between bytes, KB, MB, GB, and TB.",
    icon: FileText,
    href: "/tools/file-size-converter",
    category: "Calculator Tools",
    color: "from-blue-500 to-indigo-500",
  },
  {
    name: "Number to Words",
    description:
      "Convert numbers to words (123 → one hundred twenty-three).",
    icon: Hash,
    href: "/tools/number-to-words",
    category: "Calculator Tools",
    color: "from-amber-500 to-yellow-500",
  },
  {
    name: "Unit Converter",
    description:
      "Convert length, weight, temperature, area, volume, and speed instantly.",
    icon: Layers,
    href: "/tools/unit-converter",
    category: "Calculator Tools",
    color: "from-cyan-500 to-blue-500",
  },
  {
    name: "Age Calculator",
    description:
      "Calculate your exact age in years, months, days, hours, minutes, and seconds.",
    icon: Calendar,
    href: "/tools/age-calculator",
    category: "Calculator Tools",
    color: "from-pink-500 to-rose-500",
  },

  // Design Tools
  {
    name: "Image Resizer",
    description: "Resize images in bulk with custom dimensions.",
    icon: ImageIcon,
    href: "/tools/image-resizer",
    category: "Design Tools",
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "Image Cropper",
    description: "Crop images to any aspect ratio.",
    icon: Crop,
    href: "/tools/image-cropper",
    category: "Design Tools",
    color: "from-sky-500 to-blue-500",
  },
  {
    name: "Color Picker",
    description: "Pick and convert colors between HEX, RGB, and HSL.",
    icon: Palette,
    href: "/tools/color-picker",
    category: "Design Tools",
    color: "from-purple-500 to-pink-500",
  },
  {
    name: "Background Remover",
    description: "Remove image backgrounds quickly and easily.",
    icon: Eraser,
    href: "/tools/background-remover",
    category: "Design Tools",
    color: "from-fuchsia-500 to-purple-500",
  },

  // Security Tools
  {
    name: "Password Generator",
    description:
      "Generate strong, secure passwords instantly. Customize length and character types.",
    icon: Key,
    href: "/tools/password-generator",
    category: "Security Tools",
    color: "from-amber-500 to-orange-500",
  },
];

const POPULAR_TOOLS = ALL_TOOLS.slice(0, 6);

export default function AllTools() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTools = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return ALL_TOOLS;
    }

    return ALL_TOOLS.filter(
      (tool) =>
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.category.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const groupedTools = useMemo(() => {
    return filteredTools.reduce<Record<string, Tool[]>>((groups, tool) => {
      if (!groups[tool.category]) {
        groups[tool.category] = [];
      }

      groups[tool.category].push(tool);

      return groups;
    }, {});
  }, [filteredTools]);

  const categories = Object.keys(groupedTools);
  const hasResults = filteredTools.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 px-4 py-20">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <header className="mb-12 text-center">
          <div className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 p-3 shadow-lg shadow-indigo-500/25">
            <Wrench className="h-8 w-8 text-white" aria-hidden="true" />
          </div>

          <h1 className="mt-4 text-4xl font-bold text-slate-900">
            All Tools
          </h1>

          <p className="mt-2 text-slate-600">
            {ALL_TOOLS.length} free online tools available. Find what you need.
          </p>

          <Link
            href="/"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 transition-colors hover:bg-indigo-100"
          >
            ← Back to Home
          </Link>
        </header>

        {/* Search */}
        <div className="mx-auto mb-8 max-w-2xl">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <Search
                className="h-5 w-5 text-slate-400"
                aria-hidden="true"
              />
            </div>

            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder={`Search ${ALL_TOOLS.length} tools by name, description, or category...`}
              aria-label="Search tools"
              className="w-full rounded-2xl border-2 border-slate-200 bg-white py-4 pl-12 pr-12 text-lg text-slate-900 shadow-lg transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/20"
            />

            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 transition-colors hover:text-slate-600"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            )}
          </div>

          {searchQuery && (
            <p className="mt-3 text-center text-sm text-slate-500">
              Found {filteredTools.length} tool
              {filteredTools.length !== 1 ? "s" : ""} matching &quot;
              {searchQuery}
              &quot;
            </p>
          )}
        </div>

        {/* Popular Tools */}
        {!searchQuery && (
          <section aria-labelledby="popular-tools-heading" className="mb-12">
            <div className="mb-6 flex items-center gap-2">
              <Sparkles
                className="h-5 w-5 text-amber-500"
                aria-hidden="true"
              />

              <h2
                id="popular-tools-heading"
                className="text-2xl font-bold text-slate-900"
              >
                Popular Tools
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              {POPULAR_TOOLS.map((tool) => (
                <ToolCard key={tool.name} tool={tool} />
              ))}
            </div>
          </section>
        )}

        {/* All Tools */}
        {hasResults ? (
          <div className="space-y-12">
            {categories.map((category) => (
              <section key={category} aria-labelledby={`${category}-heading`}>
                <h2
                  id={`${category}-heading`}
                  className="mb-6 text-2xl font-bold text-slate-900"
                >
                  {category}
                  <span className="ml-2 text-sm font-normal text-slate-400">
                    ({groupedTools[category]?.length ?? 0})
                  </span>
                </h2>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {groupedTools[category]?.map((tool) => (
                    <ToolCard key={tool.name} tool={tool} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <div className="mb-4 inline-flex items-center justify-center rounded-2xl bg-slate-100 p-4">
              <Search
                className="h-12 w-12 text-slate-400"
                aria-hidden="true"
              />
            </div>

            <h2 className="text-xl font-semibold text-slate-900">
              No tools found
            </h2>

            <p className="mt-2 text-slate-600">
              Try adjusting your search terms or browse all tools.
            </p>

            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="mt-4 font-medium text-indigo-600 hover:underline"
            >
              Clear search
            </button>
          </div>
        )}

        {/* Coming Soon */}
        <section className="mt-16 rounded-2xl border border-indigo-200/50 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 p-8 text-center">
          <h2 className="text-xl font-bold text-slate-900">
            🔜 More Tools Coming Soon
          </h2>

          <p className="mt-2 text-slate-600">
            We&apos;re constantly adding new tools. Have a suggestion?{" "}
            <Link
              href="/contact"
              className="font-medium text-indigo-600 hover:underline"
            >
              Let us know
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}

type ToolCardProps = {
  tool: Tool;
};

function ToolCard({ tool }: ToolCardProps) {
  const Icon = tool.icon;

  return (
    <Link href={tool.href} className="group block">
      <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/50 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/10">
        <div
          className={`mb-4 inline-flex w-fit rounded-xl bg-gradient-to-r ${tool.color} p-3 shadow-lg`}
        >
          <Icon className="h-6 w-6 text-white" aria-hidden="true" />
        </div>

        <h3 className="text-lg font-semibold text-slate-900 transition-colors group-hover:text-indigo-600">
          {tool.name}
        </h3>

        <p className="mt-2 line-clamp-2 flex-1 text-sm text-slate-600">
          {tool.description}
        </p>

        <div className="mt-4 flex items-center gap-1 text-sm font-medium text-indigo-600 transition-all group-hover:gap-2">
          <span>Try Tool</span>
          <span
            className="inline-block transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          >
            →
          </span>
        </div>
      </article>
    </Link>
  );
}