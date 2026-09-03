import Link from "next/link";
import {
  ArrowRight,
  QrCode,
  HardDrive,
} from "lucide-react";

const utilityTools = [
  {
    name: "QR Code Generator",
    slug: "qr-code-generator",
    description:
      "Create QR codes for text, websites, and Wi-Fi information directly in your browser.",
    icon: QrCode,
  },
  {
    name: "File Size Converter",
    slug: "file-size-converter",
    description:
      "Convert file sizes between bytes, KB, MB, GB, TB, and other common units.",
    icon: HardDrive,
  },
];

export const metadata = {
  title: "Free Utility Tools",
  description:
    "Free online utility tools from ToolNoveHub for QR codes, file sizes, and everyday digital tasks.",
  alternates: {
    canonical: "https://toolnovehub.tools/tools/utility",
  },
};

export default function UtilityToolsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* HERO */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
              <QrCode size={32} strokeWidth={2} />
            </div>

            <p className="mt-6 text-sm font-bold uppercase tracking-wide text-blue-600">
              Tool Category
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Free Utility Tools
            </h1>

            <p className="mt-5 text-lg leading-8 text-gray-600">
              Useful online utilities for QR codes, file
              sizes, and everyday digital tasks.
            </p>
          </div>
        </div>
      </section>

      {/* MAIN */}
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Utility Tools
            </h2>

            <p className="mt-1 text-sm text-gray-600">
              Choose a utility tool below.
            </p>
          </div>

          <Link
            href="/tools"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
          >
            View all tools
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* TOOL CARDS */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {utilityTools.map((tool) => {
            const Icon = tool.icon;

            return (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                    <Icon size={24} />
                  </div>

                  <ArrowRight
                    size={20}
                    className="text-gray-300 transition group-hover:translate-x-1 group-hover:text-blue-600"
                  />
                </div>

                <h3 className="mt-5 text-lg font-bold text-gray-900">
                  {tool.name}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {tool.description}
                </p>

                <div className="mt-5 text-sm font-semibold text-blue-600">
                  Open tool →
                </div>
              </Link>
            );
          })}
        </div>

        {/* BENEFITS */}
        <section className="mt-12 rounded-2xl border border-blue-100 bg-blue-50 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Useful tools for everyday tasks
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-600">
            ToolNoveHub provides lightweight online utilities
            designed to make common digital tasks faster and
            easier.
          </p>

          <div className="mt-7 grid gap-6 md:grid-cols-3">
            <div>
              <div className="text-2xl">⚡</div>

              <h3 className="mt-3 font-bold text-gray-900">
                Quick
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Complete common tasks quickly without
                installing additional software.
              </p>
            </div>

            <div>
              <div className="text-2xl">🆓</div>

              <h3 className="mt-3 font-bold text-gray-900">
                Free
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Use our online utility tools without creating
                an account.
              </p>
            </div>

            <div>
              <div className="text-2xl">🔒</div>

              <h3 className="mt-3 font-bold text-gray-900">
                Privacy focused
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Supported tools are designed to process data
                locally in your browser.
              </p>
            </div>
          </div>
        </section>

        {/* COMMON TASKS */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900">
            Common utility tasks
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <h3 className="font-bold text-gray-900">
                Create QR codes
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Generate QR codes for websites, text, and
                Wi-Fi information.
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <h3 className="font-bold text-gray-900">
                Convert file sizes
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Convert between common digital storage units
                such as KB, MB, GB, and TB.
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <h3 className="font-bold text-gray-900">
                Everyday digital tasks
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Use simple browser-based utilities whenever
                you need a quick answer or conversion.
              </p>
            </div>
          </div>
        </section>

        {/* PRIVACY */}
        <section className="mt-12 rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-bold text-gray-900">
            Browser-based utilities
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-600">
            Supported utility tools process information
            directly in your browser. No account is required
            for normal use.
          </p>
        </section>

        {/* BREADCRUMB */}
        <nav
          aria-label="Breadcrumb"
          className="mt-10 text-sm text-gray-500"
        >
          <Link
            href="/"
            className="transition hover:text-blue-600"
          >
            Home
          </Link>

          <span className="mx-2">/</span>

          <Link
            href="/tools"
            className="transition hover:text-blue-600"
          >
            Tools
          </Link>

          <span className="mx-2">/</span>

          <span className="text-gray-700">
            Utility
          </span>
        </nav>
      </main>
    </div>
  );
}