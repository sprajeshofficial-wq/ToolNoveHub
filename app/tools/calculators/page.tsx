import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  CalendarDays,
  Percent,
  Hash,
} from "lucide-react";

const calculatorTools = [
  {
    name: "Percentage Calculator",
    slug: "percentage-calculator",
    description:
      "Calculate percentages, percentage changes, and what percentage one number is of another.",
    icon: Percent,
  },
  {
    name: "Age Calculator",
    slug: "age-calculator",
    description:
      "Calculate your exact age in years, months, and days from your date of birth.",
    icon: CalendarDays,
  },
  {
    name: "Number to Words",
    slug: "number-to-words",
    description:
      "Convert numbers into clear English words for documents, invoices, and everyday use.",
    icon: Hash,
  },
  {
    name: "Calculator",
    slug: "calculator",
    description:
      "Perform everyday arithmetic calculations quickly with a simple online calculator.",
    icon: Calculator,
  },
];

export const metadata = {
  title: "Free Online Calculators",
  description:
    "Use free online calculators from ToolNoveHub for percentages, age, numbers, and everyday calculations.",
  alternates: {
    canonical:
      "https://toolnovehub.tools/tools/calculators",
  },
};

export default function CalculatorsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* HERO */}

      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
              <Calculator size={32} strokeWidth={2} />
            </div>

            <p className="mt-6 text-sm font-bold uppercase tracking-wide text-blue-600">
              Tool Category
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Free Online Calculators
            </h1>

            <p className="mt-5 text-lg leading-8 text-gray-600">
              Simple and useful calculators for percentages,
              age, numbers, and everyday calculations.
            </p>
          </div>
        </div>
      </section>

      {/* TOOLS */}

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Calculators
            </h2>

            <p className="mt-1 text-sm text-gray-600">
              Choose a calculator below.
            </p>
          </div>

          <Link
            href="/tools"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            View all tools
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {calculatorTools.map((tool) => {
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
                  Open calculator →
                </div>
              </Link>
            );
          })}
        </div>

        {/* INFORMATION */}

        <section className="mt-12 rounded-2xl border border-blue-100 bg-blue-50 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Why use ToolNoveHub calculators?
          </h2>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <div>
              <div className="text-2xl">⚡</div>

              <h3 className="mt-3 font-bold text-gray-900">
                Fast
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Get calculations instantly without installing
                software.
              </p>
            </div>

            <div>
              <div className="text-2xl">🆓</div>

              <h3 className="mt-3 font-bold text-gray-900">
                Free to use
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Our online calculators are designed to be
                simple and free to use.
              </p>
            </div>

            <div>
              <div className="text-2xl">🔒</div>

              <h3 className="mt-3 font-bold text-gray-900">
                Privacy focused
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Calculations happen directly in your browser
                for supported tools.
              </p>
            </div>
          </div>
        </section>

        {/* BREADCRUMB */}

        <nav
          aria-label="Breadcrumb"
          className="mt-10 text-sm text-gray-500"
        >
          <Link
            href="/"
            className="hover:text-blue-600"
          >
            Home
          </Link>

          <span className="mx-2">/</span>

          <Link
            href="/tools"
            className="hover:text-blue-600"
          >
            Tools
          </Link>

          <span className="mx-2">/</span>

          <span className="text-gray-700">
            Calculators
          </span>
        </nav>
      </main>
    </div>
  );
}