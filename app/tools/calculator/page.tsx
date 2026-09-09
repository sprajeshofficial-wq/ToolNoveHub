import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Online Calculator - Free Basic Calculator for Everyday Math",
  description:
    "Use ToolNoveHub's free online calculator for basic arithmetic, decimals, percentages, negative numbers, and everyday calculations. Fast, simple, and browser-based.",
  keywords: [
    "online calculator",
    "free calculator",
    "basic calculator",
    "simple calculator",
    "percentage calculator",
    "everyday calculator",
    "math calculator",
  ],
  alternates: {
    canonical: "https://toolnovehub.tools/tools/calculator",
  },
  openGraph: {
    title: "Online Calculator - Free Basic Calculator | ToolNoveHub",
    description:
      "Free online calculator for everyday arithmetic, percentages, decimals, and basic calculations.",
    url: "https://toolnovehub.tools/tools/calculator",
    siteName: "ToolNoveHub",
    type: "website",
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

export default function CalculatorPage() {
  return (
    <main className="bg-white text-gray-900">
      <section className="border-b border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
          <nav
            aria-label="Breadcrumb"
            className="mb-6 text-sm text-gray-500"
          >
            <Link
              href="/"
              className="hover:text-gray-900"
            >
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link
              href="/tools"
              className="hover:text-gray-900"
            >
              Tools
            </Link>
            <span className="mx-2">/</span>
            <Link
              href="/tools/calculators"
              className="hover:text-gray-900"
            >
              Calculators
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-700">Calculator</span>
          </nav>

          <h1 className="text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
            Online Calculator
          </h1>

          <p className="mt-4 max-w-3xl text-lg leading-8 text-gray-600">
            A simple free online calculator for everyday arithmetic,
            percentages, decimals, negative numbers, and basic calculations.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="prose prose-gray max-w-none">
          <h2>Free Online Calculator for Everyday Math</h2>

          <p>
            ToolNoveHub&apos;s online calculator is designed for quick
            everyday arithmetic. Use it to add, subtract, multiply, and
            divide numbers, work with decimals, calculate percentages, and
            correct entries without starting over.
          </p>

          <p>
            The calculator runs directly in your web browser, so there is no
            need to install an application or create an account before using
            it.
          </p>

          <h2>What Can You Calculate?</h2>

          <h3>Basic Arithmetic</h3>

          <p>
            Perform addition, subtraction, multiplication, and division for
            quick numerical calculations.
          </p>

          <h3>Percentages</h3>

          <p>
            Calculate percentages for discounts, increases, markups,
            comparisons, and other common situations.
          </p>

          <h3>Decimal Calculations</h3>

          <p>
            Work with decimal values when calculating prices, measurements,
            averages, quantities, and other everyday numbers.
          </p>

          <h3>Negative Numbers</h3>

          <p>
            Use positive and negative values for calculations involving
            changes, balances, temperatures, and differences.
          </p>

          <h2>Basic Calculator Examples</h2>

          <div className="not-prose my-8 overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full min-w-[420px] text-left text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-5 py-3 font-semibold text-gray-900">
                    Calculation
                  </th>
                  <th className="px-5 py-3 font-semibold text-gray-900">
                    Result
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-5 py-3">25 + 17</td>
                  <td className="px-5 py-3">42</td>
                </tr>
                <tr>
                  <td className="px-5 py-3">100 - 35</td>
                  <td className="px-5 py-3">65</td>
                </tr>
                <tr>
                  <td className="px-5 py-3">12 × 8</td>
                  <td className="px-5 py-3">96</td>
                </tr>
                <tr>
                  <td className="px-5 py-3">144 ÷ 12</td>
                  <td className="px-5 py-3">12</td>
                </tr>
                <tr>
                  <td className="px-5 py-3">15% of 200</td>
                  <td className="px-5 py-3">30</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>How Percentage Calculations Work</h2>

          <p>
            A percentage represents a value out of 100. For example, 25%
            means 25 out of every 100, which is equivalent to 0.25 as a
            decimal.
          </p>

          <h3>Example: 20% of 150</h3>

          <p>
            To calculate 20% of 150, enter the calculation into the
            calculator:
          </p>

          <p>
            <strong>150 × 20%</strong>
          </p>

          <p>
            The result is <strong>30</strong>.
          </p>

          <h3>More Percentage Examples</h3>

          <ul>
            <li>
              <strong>Discount:</strong> 20% of $50 is $10, so a $50 item
              with a 20% discount costs $40 before any additional charges.
            </li>
            <li>
              <strong>Increase:</strong> A 10% increase on 200 adds 20,
              giving a new value of 220.
            </li>
            <li>
              <strong>Percentage of a number:</strong> 15% of 300 is 45.
            </li>
          </ul>

          <h2>Understanding Order of Operations</h2>

          <p>
            When a calculation contains multiple mathematical operations,
            the order in which they are performed can affect the result.
            Multiplication and division are normally evaluated before
            addition and subtraction.
          </p>

          <p>
            Parentheses can be used when you want part of an expression to
            be calculated first.
          </p>

          <p>
            For example, in <strong>10 + 5 × 2</strong>, multiplication is
            performed first, giving:
          </p>

          <p>
            <strong>10 + 10 = 20</strong>
          </p>

          <p>
            If you want the addition to happen first, use parentheses:
          </p>

          <p>
            <strong>(10 + 5) × 2 = 30</strong>
          </p>

          <h2>How to Use the Calculator</h2>

          <ol>
            <li>
              <strong>Enter the first number:</strong> Select the number
              buttons or use your keyboard.
            </li>
            <li>
              <strong>Select an operation:</strong> Choose addition,
              subtraction, multiplication, or division.
            </li>
            <li>
              <strong>Enter the next number:</strong> Enter the second value
              after selecting an operation.
            </li>
            <li>
              <strong>Press equals:</strong> Select the equals button or
              press Enter to calculate the result.
            </li>
            <li>
              <strong>Correct an entry:</strong> Use DEL or Backspace to
              remove the last digit.
            </li>
            <li>
              <strong>Start again:</strong> Select C or press Escape to
              clear the calculator.
            </li>
          </ol>

          <h2>Keyboard Shortcuts</h2>

          <div className="not-prose my-8 overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full min-w-[500px] text-left text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-5 py-3 font-semibold text-gray-900">
                    Key
                  </th>
                  <th className="px-5 py-3 font-semibold text-gray-900">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-5 py-3">0–9</td>
                  <td className="px-5 py-3">Enter numbers</td>
                </tr>
                <tr>
                  <td className="px-5 py-3">.</td>
                  <td className="px-5 py-3">Enter a decimal point</td>
                </tr>
                <tr>
                  <td className="px-5 py-3">+ − × ÷</td>
                  <td className="px-5 py-3">Select arithmetic operations</td>
                </tr>
                <tr>
                  <td className="px-5 py-3">%</td>
                  <td className="px-5 py-3">Calculate percentages</td>
                </tr>
                <tr>
                  <td className="px-5 py-3">Enter</td>
                  <td className="px-5 py-3">Calculate the result</td>
                </tr>
                <tr>
                  <td className="px-5 py-3">Backspace</td>
                  <td className="px-5 py-3">Delete the last digit</td>
                </tr>
                <tr>
                  <td className="px-5 py-3">Escape</td>
                  <td className="px-5 py-3">Clear the calculator</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>Common Calculator Mistakes</h2>

          <ul>
            <li>
              <strong>Ignoring operation order:</strong> Use parentheses when
              you need a specific part of an expression calculated first.
            </li>
            <li>
              <strong>Entering the wrong decimal:</strong> Check decimal
              placement before confirming the calculation.
            </li>
            <li>
              <strong>Forgetting negative signs:</strong> A negative value
              can change the result significantly.
            </li>
            <li>
              <strong>Confusing percentage calculations:</strong> A
              percentage of a number and percentage change are different
              calculations.
            </li>
          </ul>

          <h2>Common Uses for an Online Calculator</h2>

          <h3>Students</h3>

          <p>
            Quickly check arithmetic while working through homework,
            assignments, and study exercises.
          </p>

          <h3>Everyday Budgeting</h3>

          <p>
            Calculate totals, differences, discounts, and simple percentage
            values when planning everyday expenses.
          </p>

          <h3>Shopping</h3>

          <p>
            Work out prices, quantities, percentage discounts, and other
            quick calculations while comparing products.
          </p>

          <h3>Work and Business</h3>

          <p>
            Perform quick arithmetic when checking figures, quantities,
            prices, or simple business calculations.
          </p>

          <h2>Browser-Based and Privacy-Friendly</h2>

          <p>
            Calculator operations are performed directly in your web
            browser. The calculator does not require an account or software
            installation before you can use the basic calculation features.
          </p>

          <p>
            The numbers you enter do not need to be uploaded to a server for
            the calculator to perform basic calculations.
          </p>

          <p>
            As with any online service, your browser and device may still
            handle normal technical information such as network requests
            and browser data. See our{" "}
            <Link
              href="/privacy"
              className="font-medium text-blue-600 underline hover:text-blue-800"
            >
              Privacy Policy
            </Link>{" "}
            for information about how ToolNoveHub handles site data.
          </p>

          <h2>Frequently Asked Questions</h2>

          <h3>Is this calculator free?</h3>

          <p>
            Yes. The ToolNoveHub online calculator is free to use in a modern
            web browser.
          </p>

          <h3>Can I use the calculator on my phone?</h3>

          <p>
            Yes. The calculator interface is designed to work on desktop,
            tablet, and mobile screens.
          </p>

          <h3>Can I use my keyboard?</h3>

          <p>
            Yes. Number keys, arithmetic operators, percentage, Enter,
            Backspace, and Escape are supported.
          </p>

          <h3>What happens if I divide by zero?</h3>

          <p>
            The calculator displays an error instead of returning a valid
            numerical result.
          </p>

          <h3>Do I need to install anything?</h3>

          <p>
            No. Open the calculator in a modern browser and start
            calculating.
          </p>

          <h2>Explore More Calculator Tools</h2>

          <p>
            Need a different type of calculation? ToolNoveHub also provides
            dedicated tools for percentages and age calculations.
          </p>

          <div className="not-prose mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/tools/percentage-calculator"
              className="rounded-lg border border-gray-300 px-4 py-3 text-sm font-medium text-gray-900 transition hover:bg-gray-50"
            >
              Percentage Calculator
            </Link>

            <Link
              href="/tools/age-calculator"
              className="rounded-lg border border-gray-300 px-4 py-3 text-sm font-medium text-gray-900 transition hover:bg-gray-50"
            >
              Age Calculator
            </Link>

            <Link
              href="/tools/calculators"
              className="rounded-lg border border-gray-300 px-4 py-3 text-sm font-medium text-gray-900 transition hover:bg-gray-50"
            >
              All Calculator Tools
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}