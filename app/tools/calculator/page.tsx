import type { Metadata } from "next";
import Calculator from "./Calculator";

const siteUrl = "https://toolnovehub.tools";

export const metadata: Metadata = {
  title: "Online Calculator - Free Basic Calculator",
  description:
    "Use ToolNoveHub's free online calculator for addition, subtraction, multiplication, division, decimals, and percentage calculations. Fast, simple, and browser-based.",
  keywords: [
    "online calculator",
    "free calculator",
    "basic calculator",
    "calculator online",
    "simple calculator",
    "math calculator",
    "percentage calculator",
    "decimal calculator",
  ],
  alternates: {
    canonical: `${siteUrl}/tools/calculator`,
  },
  openGraph: {
    title: "Online Calculator - Free Basic Calculator | ToolNoveHub",
    description:
      "A free online calculator for basic arithmetic, decimals, and percentage calculations.",
    url: `${siteUrl}/tools/calculator`,
    siteName: "ToolNoveHub",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Online Calculator - Free Basic Calculator | ToolNoveHub",
    description:
      "Free browser-based calculator for everyday arithmetic and percentage calculations.",
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

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "ToolNoveHub Online Calculator",
  url: `${siteUrl}/tools/calculator`,
  description:
    "A free online calculator for basic arithmetic, decimals, and percentage calculations.",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
  browserRequirements:
    "Requires a modern web browser with JavaScript enabled.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "Addition",
    "Subtraction",
    "Multiplication",
    "Division",
    "Decimal calculations",
    "Percentage calculations",
    "Keyboard support",
    "Browser-based calculations",
  ],
};

const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is this calculator free?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes. The ToolNoveHub online calculator is free to use in a modern web browser.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use the calculator on my phone?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes. The calculator is designed to work on desktop, tablet, and mobile screens.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use my keyboard?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes. Number keys, arithmetic operators, percentage, Enter, Backspace, and Escape are supported.",
      },
    },
    {
      "@type": "Question",
      name: "What happens if I divide by zero?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "The calculator displays an error rather than returning a valid numerical result.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need to install anything?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "No. Open the calculator in a modern web browser and start calculating.",
      },
    },
  ],
};

export default function CalculatorToolPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqStructuredData),
        }}
      />

      <main className="min-h-screen bg-gray-50">
        {/* Hero */}
        <section className="border-b border-gray-200 bg-white">
          <div className="mx-auto max-w-5xl px-4 py-12 text-center sm:px-6 lg:px-8 lg:py-16">
            <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
              Free Calculator
            </span>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Online Calculator
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
              A simple free online calculator for everyday arithmetic,
              percentages, decimals, and basic calculations.
            </p>
          </div>
        </section>

        {/* Calculator */}
        <Calculator />

        {/* Supporting content */}
        <section className="border-t border-gray-200 bg-white">
          <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
            <div className="prose prose-slate max-w-none">
              <h2 className="text-2xl font-bold text-gray-900">
                Free Online Calculator for Everyday Math
              </h2>

              <p className="mt-4 text-base leading-7 text-gray-600">
                The ToolNoveHub online calculator is designed for quick
                everyday calculations without requiring an app or desktop
                calculator. Use it for addition, subtraction, multiplication,
                division, decimals, and percentage calculations.
              </p>

              <p className="mt-4 text-base leading-7 text-gray-600">
                It is useful when you need to check a calculation while
                studying, working, shopping, planning a budget, comparing
                prices, or handling other everyday numerical tasks.
              </p>

              <h2 className="mt-10 text-2xl font-bold text-gray-900">
                What Can You Calculate?
              </h2>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                  <h3 className="font-semibold text-gray-900">
                    Basic Arithmetic
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    Perform addition, subtraction, multiplication, and
                    division for quick numerical calculations.
                  </p>
                </div>

                <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                  <h3 className="font-semibold text-gray-900">
                    Decimal Calculations
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    Work with decimal values when calculating prices,
                    measurements, averages, quantities, and other everyday
                    numbers.
                  </p>
                </div>

                <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                  <h3 className="font-semibold text-gray-900">
                    Percentage Calculations
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    Calculate percentages for discounts, increases, markups,
                    comparisons, and other common situations.
                  </p>
                </div>

                <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                  <h3 className="font-semibold text-gray-900">
                    Negative Numbers
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    Use positive and negative values for calculations
                    involving changes, balances, temperatures, and
                    differences.
                  </p>
                </div>
              </div>

              <h2 className="mt-10 text-2xl font-bold text-gray-900">
                Basic Calculator Examples
              </h2>

              <div className="mt-6 overflow-hidden rounded-xl border border-gray-200">
                <div className="grid grid-cols-2 border-b border-gray-200 bg-gray-50 px-5 py-3 text-sm font-semibold text-gray-900">
                  <span>Calculation</span>
                  <span>Result</span>
                </div>

                <div className="grid grid-cols-2 border-b border-gray-200 px-5 py-4 text-sm text-gray-600">
                  <span>25 + 17</span>
                  <span>42</span>
                </div>

                <div className="grid grid-cols-2 border-b border-gray-200 px-5 py-4 text-sm text-gray-600">
                  <span>100 - 35</span>
                  <span>65</span>
                </div>

                <div className="grid grid-cols-2 border-b border-gray-200 px-5 py-4 text-sm text-gray-600">
                  <span>12 × 8</span>
                  <span>96</span>
                </div>

                <div className="grid grid-cols-2 border-b border-gray-200 px-5 py-4 text-sm text-gray-600">
                  <span>144 ÷ 12</span>
                  <span>12</span>
                </div>

                <div className="grid grid-cols-2 px-5 py-4 text-sm text-gray-600">
                  <span>15% of 200</span>
                  <span>30</span>
                </div>
              </div>

              <h2 className="mt-10 text-2xl font-bold text-gray-900">
                Understanding Order of Operations
              </h2>

              <p className="mt-4 text-base leading-7 text-gray-600">
                When a calculation contains multiple mathematical operations,
                the order in which they are performed can affect the result.
                Multiplication and division are normally evaluated before
                addition and subtraction. Parentheses can be used when you
                want part of an expression to be calculated first.
              </p>

              <p className="mt-4 text-base leading-7 text-gray-600">
                For example, in <strong>10 + 5 × 2</strong>, multiplication is
                performed first, giving 10 + 10 = 20. If you want the
                addition to happen first, use parentheses:
                <strong> (10 + 5) × 2 = 30</strong>.
              </p>

              <h2 className="mt-10 text-2xl font-bold text-gray-900">
                Percentage Calculation Examples
              </h2>

              <p className="mt-4 text-base leading-7 text-gray-600">
                Percentages are useful for discounts, price changes, grades,
                business calculations, and everyday comparisons.
              </p>

              <ul className="mt-4 space-y-3 text-base leading-7 text-gray-600">
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

              <h2 className="mt-10 text-2xl font-bold text-gray-900">
                Common Calculator Mistakes
              </h2>

              <ul className="mt-4 space-y-3 text-base leading-7 text-gray-600">
                <li>
                  <strong>Ignoring operation order:</strong> Use parentheses
                  when you need a specific part of an expression calculated
                  first.
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
                  <strong>Confusing percentage change with a percentage of a
                  number:</strong> These are different calculations and should
                  be treated separately.
                </li>
              </ul>

              <h2 className="mt-10 text-2xl font-bold text-gray-900">
                Common Uses for an Online Calculator
              </h2>

              <p className="mt-4 text-base leading-7 text-gray-600">
                A basic calculator can be useful in many situations,
                including:
              </p>

              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                <li className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
                  Checking homework calculations
                </li>
                <li className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
                  Comparing product prices
                </li>
                <li className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
                  Calculating discounts
                </li>
                <li className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
                  Estimating quantities and costs
                </li>
                <li className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
                  Checking business figures
                </li>
                <li className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
                  Working with measurements
                </li>
              </ul>

              <h2 className="mt-10 text-2xl font-bold text-gray-900">
                How to Use the Calculator
              </h2>

              <ol className="mt-4 space-y-3 text-base leading-7 text-gray-600">
                <li>
                  <strong>1.</strong> Enter the first number using the
                  calculator buttons or your keyboard.
                </li>
                <li>
                  <strong>2.</strong> Select the mathematical operation you
                  want to perform.
                </li>
                <li>
                  <strong>3.</strong> Enter the next number or numbers needed
                  for the calculation.
                </li>
                <li>
                  <strong>4.</strong> Press the equals button or Enter to see
                  the result.
                </li>
                <li>
                  <strong>5.</strong> Use clear or delete controls when you
                  want to start another calculation.
                </li>
              </ol>

              <h2 className="mt-10 text-2xl font-bold text-gray-900">
                Browser-Based and Privacy-Friendly
              </h2>

              <p className="mt-4 text-base leading-7 text-gray-600">
                Calculations are performed in your web browser. The calculator
                does not require you to create an account or install software
                before using the basic calculator.
              </p>

              <p className="mt-4 text-base leading-7 text-gray-600">
                As with any online service, your browser and device may still
                handle normal technical information such as network requests
                and browser data. See our{" "}
                <a
                  href="/privacy"
                  className="font-medium text-blue-600 hover:text-blue-700"
                >
                  Privacy Policy
                </a>{" "}
                for information about how ToolNoveHub handles site data.
              </p>

              <h2 className="mt-10 text-2xl font-bold text-gray-900">
                Frequently Asked Questions
              </h2>

              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Is this calculator free?
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    Yes. The calculator is free to use in a modern web
                    browser.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">
                    Can I use it on my phone?
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    Yes. The calculator interface is designed to work on
                    desktop, tablet, and mobile screens.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">
                    Can I use my keyboard?
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    Yes. Number keys, arithmetic operators, percentage, Enter,
                    Backspace, and Escape are supported.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">
                    What happens if I divide by zero?
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    The calculator displays an error instead of returning a
                    valid numerical result.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">
                    Do I need to install anything?
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    No. Open the calculator in a modern browser and start
                    calculating.
                  </p>
                </div>
              </div>

              <div className="mt-12 rounded-xl border border-blue-100 bg-blue-50 p-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Explore More Free Tools
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Need a different type of calculation? Explore more
                  ToolNoveHub tools for percentages, ages, conversions, and
                  other everyday tasks.
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    href="/tools/percentage-calculator"
                    className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-blue-700 shadow-sm ring-1 ring-blue-100 transition hover:bg-blue-100"
                  >
                    Percentage Calculator
                  </a>

                  <a
                    href="/tools/age-calculator"
                    className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-blue-700 shadow-sm ring-1 ring-blue-100 transition hover:bg-blue-100"
                  >
                    Age Calculator
                  </a>

                  <a
                    href="/tools/calculators"
                    className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-blue-700 shadow-sm ring-1 ring-blue-100 transition hover:bg-blue-100"
                  >
                    All Calculator Tools
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
