import Link from "next/link";
import { Calculator, Percent, CalendarDays } from "lucide-react";

const calculators = [
  {
    name: "Calculator",
    description:
      "Perform everyday arithmetic calculations including addition, subtraction, multiplication, and division.",
    href: "/tools/calculator",
    icon: Calculator,
  },
  {
    name: "Percentage Calculator",
    description:
      "Calculate percentages, percentage increases, decreases, and common percentage problems quickly.",
    href: "/tools/percentage-calculator",
    icon: Percent,
  },
  {
    name: "Age Calculator",
    description:
      "Calculate your exact age from your date of birth in years, months, and days.",
    href: "/tools/age-calculator",
    icon: CalendarDays,
  },
];

export default function CalculatorsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
              Calculators
            </span>

            <h1 className="mt-5 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Free Online Calculators
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
              Simple, fast, and free calculators for everyday math, percentages,
              age calculations, and more.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Tools */}
      <section className="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {calculators.map((tool) => {
              const Icon = tool.icon;

              return (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-100">
                    <Icon size={24} strokeWidth={2} />
                  </div>

                  <h2 className="mt-5 text-xl font-bold text-gray-900 group-hover:text-blue-600">
                    {tool.name}
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    {tool.description}
                  </p>

                  <div className="mt-5 text-sm font-semibold !text-blue-600">
                    Use calculator →
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Calculators */}
      <section className="border-t border-gray-200 bg-white px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-900">
            Online calculators for everyday tasks
          </h2>

          <p className="mt-4 leading-7 text-gray-600">
            ToolNoveHub provides simple online calculators designed for quick
            everyday calculations. Whether you need basic arithmetic, percentage
            calculations, or an age calculation, these tools work directly in
            your browser without requiring an account.
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
              <h3 className="font-semibold text-gray-900">
                Easy to use
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Clean and simple interfaces make calculations quick and easy.
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
              <h3 className="font-semibold text-gray-900">
                Fast results
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Get calculation results instantly without unnecessary steps.
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
              <h3 className="font-semibold text-gray-900">
                Browser-based
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Calculations are performed directly in your browser.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How to use */}
      <section className="bg-gray-50 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-900">
            How to use ToolNoveHub calculators
          </h2>

          <ol className="mt-6 space-y-4 text-gray-600">
            <li>
              <strong className="text-gray-900">1. Choose a calculator:</strong>{" "}
              Select the calculator that matches your task.
            </li>

            <li>
              <strong className="text-gray-900">2. Enter your values:</strong>{" "}
              Enter the numbers or information required by the calculator.
            </li>

            <li>
              <strong className="text-gray-900">3. Calculate:</strong>{" "}
              Use the calculator controls to get your result.
            </li>

            <li>
              <strong className="text-gray-900">4. Start another calculation:</strong>{" "}
              Clear the values and continue whenever needed.
            </li>
          </ol>
        </div>
      </section>

      {/* Privacy */}
      <section className="bg-white px-4 pb-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-xl border border-blue-100 bg-blue-50 p-5">
          <h2 className="font-semibold text-blue-900">
            Privacy-focused calculators
          </h2>

          <p className="mt-2 text-sm leading-6 text-blue-800">
            Our calculators are designed to work directly in your browser.
            No account is required, and calculator inputs do not need to be
            uploaded to a server.
          </p>
        </div>
      </section>
    </main>
  );
}