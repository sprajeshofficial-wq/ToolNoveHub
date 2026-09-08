import type { Metadata } from "next";
import PercentageCalculator from "./PercentageCalculator";

const siteUrl = "https://toolnovehub.tools";

export const metadata: Metadata = {
  title: "Percentage Calculator - Calculate Percentages Online",
  description:
    "Use this free percentage calculator to find a percentage of a number, calculate percentage increases and decreases, compare percentage changes, and find what percentage one value is of another.",
  keywords: [
    "percentage calculator",
    "percent calculator",
    "percentage calculator online",
    "calculate percentage",
    "percentage increase calculator",
    "percentage decrease calculator",
    "percentage change calculator",
    "what percentage calculator",
    "percent increase",
    "percent decrease",
  ],
  alternates: {
    canonical: `${siteUrl}/tools/percentage-calculator`,
  },
  openGraph: {
    title:
      "Percentage Calculator - Calculate Percentages Online | ToolNoveHub",
    description:
      "Calculate percentages, percentage increases, decreases, and percentage changes with this free online calculator.",
    url: `${siteUrl}/tools/percentage-calculator`,
    siteName: "ToolNoveHub",
    type: "website",
  },
  twitter: {
    card: "summary",
    title:
      "Percentage Calculator - Calculate Percentages Online | ToolNoveHub",
    description:
      "Free online percentage calculator for percentage-of-number, increase, decrease, and percentage-change calculations.",
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
  name: "ToolNoveHub Percentage Calculator",
  url: `${siteUrl}/tools/percentage-calculator`,
  description:
    "A free online percentage calculator for calculating percentages, percentage increases, decreases, percentage changes, and proportions.",
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
    "Calculate a percentage of a number",
    "Calculate percentage increases",
    "Calculate percentage decreases",
    "Calculate percentage change",
    "Find what percentage one value is of another",
    "Browser-based calculations",
    "No account required",
  ],
};

const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I calculate a percentage of a number?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Multiply the number by the percentage and divide by 100. For example, 25% of 200 is 50.",
      },
    },
    {
      "@type": "Question",
      name: "How do I calculate a percentage increase?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Multiply the original value by the percentage divided by 100, then add that amount to the original value. For example, increasing 200 by 10% gives 220.",
      },
    },
    {
      "@type": "Question",
      name: "How do I calculate a percentage decrease?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Multiply the original value by the percentage divided by 100, then subtract that amount from the original value. For example, decreasing 200 by 10% gives 180.",
      },
    },
    {
      "@type": "Question",
      name: "How do I calculate percentage change?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Subtract the original value from the new value, divide by the original value, and multiply by 100.",
      },
    },
    {
      "@type": "Question",
      name: "What percentage is one number of another?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Divide the value by the total and multiply by 100. For example, 25 is 12.5% of 200.",
      },
    },
    {
      "@type": "Question",
      name: "Is the percentage calculator free?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes. The ToolNoveHub percentage calculator is available for free in a web browser.",
      },
    },
  ],
};

export default function PercentageCalculatorPage() {
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
              Free Percentage Tool
            </span>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Percentage Calculator
            </h1>

            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-gray-600">
              Calculate percentages, percentage increases and decreases,
              percentage changes, and what percentage one number is of another.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
          <PercentageCalculator />

          {/* About */}
          <section className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900">
              What is a percentage?
            </h2>

            <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
              <p>
                A percentage expresses a number as a fraction of 100. The word
                percent means &quot;per hundred,&quot; so 25% means 25 parts out
                of 100.
              </p>

              <p>
                Percentages are used in many everyday situations, including
                shopping discounts, price changes, test scores, budgets,
                business reports, statistics, and financial calculations.
              </p>

              <p>
                This calculator provides several common percentage calculations
                so you can choose the method that matches the problem you are
                solving.
              </p>
            </div>
          </section>

          {/* Calculation types */}
          <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Types of percentage calculations
            </h2>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <article className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                <h3 className="font-semibold text-gray-900">
                  Percentage of a number
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Find a percentage of a given number.
                </p>

                <p className="mt-3 rounded-lg bg-white p-3 font-mono text-sm text-gray-800">
                  25% of 200 = 50
                </p>
              </article>

              <article className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                <h3 className="font-semibold text-gray-900">
                  Percentage increase
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Add a percentage to an original value.
                </p>

                <p className="mt-3 rounded-lg bg-white p-3 font-mono text-sm text-gray-800">
                  200 + 10% = 220
                </p>
              </article>

              <article className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                <h3 className="font-semibold text-gray-900">
                  Percentage decrease
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Subtract a percentage from an original value.
                </p>

                <p className="mt-3 rounded-lg bg-white p-3 font-mono text-sm text-gray-800">
                  200 − 10% = 180
                </p>
              </article>

              <article className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                <h3 className="font-semibold text-gray-900">
                  Percentage change
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Compare an original value with a new value.
                </p>

                <p className="mt-3 rounded-lg bg-white p-3 font-mono text-sm text-gray-800">
                  100 → 125 = 25% increase
                </p>
              </article>

              <article className="rounded-xl border border-gray-200 bg-gray-50 p-5 md:col-span-2">
                <h3 className="font-semibold text-gray-900">
                  What percentage?
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Find the percentage that one value represents of a total.
                </p>

                <p className="mt-3 rounded-lg bg-white p-3 font-mono text-sm text-gray-800">
                  25 ÷ 200 × 100 = 12.5%
                </p>
              </article>
            </div>
          </section>

          {/* Formulas */}
          <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Percentage formulas
            </h2>

            <div className="mt-6 space-y-5">
              <FormulaBlock
                title="Percentage of a number"
                formula="Percentage ÷ 100 × Number"
                example="25 ÷ 100 × 200 = 50"
              />

              <FormulaBlock
                title="Percentage increase"
                formula="Original + (Original × Percentage ÷ 100)"
                example="200 + (200 × 10 ÷ 100) = 220"
              />

              <FormulaBlock
                title="Percentage decrease"
                formula="Original − (Original × Percentage ÷ 100)"
                example="200 − (200 × 10 ÷ 100) = 180"
              />

              <FormulaBlock
                title="Percentage change"
                formula="(New − Original) ÷ Original × 100"
                example="(125 − 100) ÷ 100 × 100 = 25%"
              />

              <FormulaBlock
                title="What percentage?"
                formula="Value ÷ Total × 100"
                example="25 ÷ 200 × 100 = 12.5%"
              />
            </div>
          </section>

          {/* Real-world uses */}
          <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Common uses for percentage calculations
            </h2>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <UseCase
                title="Shopping discounts"
                text="Calculate how much a discount reduces the original price and estimate the final amount."
              />

              <UseCase
                title="Price increases"
                text="Calculate the new price after a percentage increase."
              />

              <UseCase
                title="Test scores"
                text="Convert marks into percentages to understand performance."
              />

              <UseCase
                title="Business calculations"
                text="Compare changes in sales, costs, revenue, quantities, or other business figures."
              />

              <UseCase
                title="Budgets"
                text="Calculate what portion of a budget is represented by a particular expense."
              />

              <UseCase
                title="Statistics"
                text="Express a value as a percentage of a total when analyzing groups or categories."
              />
            </div>
          </section>

          {/* How to use */}
          <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900">
              How to use this percentage calculator
            </h2>

            <ol className="mt-6 space-y-4 text-sm leading-7 text-gray-600">
              <li>
                <strong className="text-gray-900">1.</strong>{" "}
                Choose the type of percentage calculation you need.
              </li>

              <li>
                <strong className="text-gray-900">2.</strong>{" "}
                Enter the numbers requested by that calculation.
              </li>

              <li>
                <strong className="text-gray-900">3.</strong>{" "}
                Select <strong className="text-gray-900">Calculate</strong>.
              </li>

              <li>
                <strong className="text-gray-900">4.</strong>{" "}
                Review the result and the calculation explanation.
              </li>

              <li>
                <strong className="text-gray-900">5.</strong>{" "}
                Select <strong className="text-gray-900">Reset</strong> to
                start a new calculation.
              </li>
            </ol>
          </section>

          {/* Tips */}
          <section className="mt-6 rounded-2xl border border-gray-200 bg-gray-50 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Percentage calculation tips
            </h2>

            <ul className="mt-5 space-y-3 text-sm leading-7 text-gray-600">
              <li>
                • A percentage is always based on a reference or total value.
              </li>

              <li>
                • A percentage increase and percentage decrease are calculated
                relative to the original value.
              </li>

              <li>
                • Percentage change can be positive or negative depending on
                whether the value increased or decreased.
              </li>

              <li>
                • When finding what percentage one value represents of another,
                the total cannot be zero.
              </li>

              <li>
                • For financial or business decisions, verify important results
                against the underlying source data.
              </li>
            </ul>
          </section>

          {/* Privacy */}
          <section className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-blue-900">
              Browser-based percentage calculations
            </h2>

            <p className="mt-3 text-sm leading-7 text-blue-800">
              The calculations on this page are performed directly in your web
              browser. No account is required, and the numbers entered into the
              calculator do not need to be uploaded to a server for the
              calculation itself.
            </p>
          </section>

          {/* FAQ */}
          <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Frequently asked questions
            </h2>

            <div className="mt-6 space-y-4">
              <Faq
                question="How do I calculate a percentage of a number?"
                answer="Multiply the number by the percentage and divide by 100. For example, 25% of 200 is 50."
              />

              <Faq
                question="How do I calculate a percentage increase?"
                answer="Multiply the original value by the percentage divided by 100, then add the result to the original value. For example, increasing 200 by 10% gives 220."
              />

              <Faq
                question="How do I calculate a percentage decrease?"
                answer="Multiply the original value by the percentage divided by 100, then subtract the result from the original value. For example, decreasing 200 by 10% gives 180."
              />

              <Faq
                question="How do I calculate percentage change?"
                answer="Subtract the original value from the new value, divide by the original value, and multiply by 100."
              />

              <Faq
                question="What percentage is one number of another?"
                answer="Divide the value by the total and multiply by 100. For example, 25 is 12.5% of 200."
              />

              <Faq
                question="Is this percentage calculator free?"
                answer="Yes. The ToolNoveHub percentage calculator is available for free in a web browser."
              />

              <Faq
                question="Can I use this calculator on a phone?"
                answer="Yes. The calculator is designed to work across desktop, tablet, and mobile browsers."
              />
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

function FormulaBlock({
  title,
  formula,
  example,
}: {
  title: string;
  formula: string;
  example: string;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
      <h3 className="font-semibold text-gray-900">
        {title}
      </h3>

      <p className="mt-3 font-mono text-sm text-gray-800">
        {formula}
      </p>

      <p className="mt-2 text-sm leading-6 text-gray-600">
        Example: {example}
      </p>
    </div>
  );
}

function UseCase({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <article className="rounded-xl border border-gray-200 bg-gray-50 p-5">
      <h3 className="font-semibold text-gray-900">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-gray-600">
        {text}
      </p>
    </article>
  );
}

function Faq({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  return (
    <details className="rounded-xl border border-gray-200 bg-gray-50 p-5">
      <summary className="cursor-pointer font-semibold text-gray-900">
        {question}
      </summary>

      <p className="mt-3 text-sm leading-7 text-gray-600">
        {answer}
      </p>
    </details>
  );
}