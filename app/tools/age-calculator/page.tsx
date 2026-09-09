import type { Metadata } from "next";
import Link from "next/link";
import AgeCalculator from "./AgeCalculator";

const siteUrl = "https://toolnovehub.tools";
const pageUrl = `${siteUrl}/tools/age-calculator`;

export const metadata: Metadata = {
  title: "Age Calculator - Calculate Your Exact Age",
  description:
    "Calculate your exact age in years, months, and days, total elapsed days, and your next birthday with ToolNoveHub's free online age calculator.",
  keywords: [
    "age calculator",
    "calculate age",
    "exact age calculator",
    "age calculator online",
    "birthday calculator",
    "date of birth calculator",
    "how old am I",
    "age in years months days",
    "age in days",
    "next birthday calculator",
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Age Calculator - Calculate Your Exact Age | ToolNoveHub",
    description:
      "Calculate your exact age in years, months, and days, total elapsed days, and next birthday.",
    url: pageUrl,
    siteName: "ToolNoveHub",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Age Calculator - Calculate Your Exact Age | ToolNoveHub",
    description:
      "Free online age calculator for calculating age in years, months, days, total elapsed days, and next birthday.",
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

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "ToolNoveHub Age Calculator",
  url: pageUrl,
  description:
    "A free online age calculator that calculates age in years, months, days, total elapsed days, and next birthday information.",
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
    "Calculate age in years",
    "Calculate age in months",
    "Calculate age in days",
    "Calculate total elapsed calendar days",
    "Calculate next birthday",
    "Handle leap-year dates",
    "Validate calendar dates",
    "Reject future dates",
    "Browser-based calculation",
    "No account required",
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How does the age calculator work?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "The calculator compares your date of birth with today's local calendar date and calculates the difference in complete years, months, and days.",
      },
    },
    {
      "@type": "Question",
      name: "Can I calculate my exact age in years, months, and days?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes. Enter your date of birth and the calculator displays your age as complete years, remaining months, and remaining days.",
      },
    },
    {
      "@type": "Question",
      name: "Does the calculator handle leap years?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes. The calculator validates calendar dates and accounts for leap years when calculating elapsed calendar days.",
      },
    },
    {
      "@type": "Question",
      name: "What happens if I was born on February 29?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "February 29 is accepted as a valid date of birth. Birthday handling in a non-leap year follows the calculator's calendar-date rules.",
      },
    },
    {
      "@type": "Question",
      name: "Can I enter a future date?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "No. Future dates are rejected because a future date cannot be used as a completed date of birth for the age calculation.",
      },
    },
    {
      "@type": "Question",
      name: "Does the calculator show total days?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes. The calculator shows the total number of elapsed calendar days between the date of birth and today's date.",
      },
    },
    {
      "@type": "Question",
      name: "Can I see my next birthday?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes. The calculator shows the date of the next birthday and the number of calendar days remaining until it.",
      },
    },
    {
      "@type": "Question",
      name: "Is the age calculator free?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes. The ToolNoveHub Age Calculator is free to use in a modern web browser and does not require an account.",
      },
    },
    {
      "@type": "Question",
      name: "Is my date of birth uploaded to a server?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "The age calculation itself is performed directly in the browser. The entered date does not need to be uploaded to a server for the calculation.",
      },
    },
  ],
};

export default function AgeCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webApplicationSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <main className="min-h-screen bg-gray-50">
        {/* Hero */}
        <section className="border-b border-gray-200 bg-white">
          <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <nav
              aria-label="Breadcrumb"
              className="mb-8 text-sm text-gray-500"
            >
              <Link href="/" className="hover:text-gray-900">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link href="/tools" className="hover:text-gray-900">
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
              <span className="text-gray-700">Age Calculator</span>
            </nav>

            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                Free online calculator
              </p>

              <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Age Calculator
              </h1>

              <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-gray-600">
                Calculate your exact age in years, months, and days from
                your date of birth, with total elapsed days and your next
                birthday.
              </p>
            </div>
          </div>
        </section>

        {/* Calculator */}
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
          <AgeCalculator />

          {/* About */}
          <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900">
              What does an age calculator do?
            </h2>

            <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
              <p>
                An age calculator determines how much time has passed between
                a date of birth and a selected current date. Instead of simply
                dividing the number of days by 365, it uses calendar dates to
                calculate complete years, months, and remaining days.
              </p>

              <p>
                ToolNoveHub&apos;s Age Calculator can also show the total
                elapsed calendar days and the date of the next birthday. This
                makes it useful when you need more detail than a simple
                &quot;how old am I?&quot; result.
              </p>
            </div>
          </section>

          {/* Results */}
          <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900">
              What the age calculator shows
            </h2>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <InfoCard
                title="Age in years"
                text="Shows the number of complete years that have passed since the date of birth."
              />

              <InfoCard
                title="Remaining months and days"
                text="Shows the additional complete months and days after the complete years are counted."
              />

              <InfoCard
                title="Total elapsed days"
                text="Shows the actual number of calendar days between the birth date and today's date."
              />

              <InfoCard
                title="Next birthday"
                text="Shows the upcoming birthday date and the number of calendar days remaining."
              />
            </div>
          </section>

          {/* Example */}
          <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Age calculation example
            </h2>

            <p className="mt-4 text-sm leading-7 text-gray-600">
              Suppose someone was born on January 15, 2000. The calculator
              compares that date with the current calendar date and determines
              how many complete years have passed, followed by the remaining
              months and days.
            </p>

            <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-5">
              <p className="text-sm font-semibold text-blue-900">
                Example result
              </p>

              <p className="mt-2 text-sm leading-7 text-blue-800">
                If the current date were January 15, 2025, the result would be
                exactly 25 years.
              </p>

              <p className="mt-2 text-sm leading-7 text-blue-800">
                If the current date were May 27, 2025, the result would include
                25 complete years followed by the additional months and days.
              </p>
            </div>
          </section>

          {/* Leap years */}
          <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Leap years and February 29
            </h2>

            <p className="mt-4 text-sm leading-7 text-gray-600">
              Calendar calculations need to account for leap years because a
              leap year contains 366 days instead of 365. This difference
              affects the total number of elapsed calendar days between two
              dates.
            </p>

            <p className="mt-4 text-sm leading-7 text-gray-600">
              February 29 is a valid calendar date in a leap year. The
              calculator accepts February 29 as a date of birth and applies
              its calendar rules when determining birthdays and elapsed time
              in later years.
            </p>
          </section>

          {/* Why not divide by 365 */}
          <section className="mt-6 rounded-2xl border border-gray-200 bg-gray-50 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Why age is not simply total days divided by 365
            </h2>

            <p className="mt-4 text-sm leading-7 text-gray-600">
              Dividing total elapsed days by 365 can provide a rough estimate,
              but it does not account for leap years or the different lengths
              of calendar months.
            </p>

            <p className="mt-4 text-sm leading-7 text-gray-600">
              For example, a period that crosses February in a leap year
              contains a different number of days than the same period in a
              non-leap year. Calendar-based calculations are therefore more
              appropriate when the result needs to be expressed in years,
              months, and days.
            </p>
          </section>

          {/* How to use */}
          <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900">
              How to use the age calculator
            </h2>

            <ol className="mt-6 space-y-4 text-sm leading-7 text-gray-600">
              <li>
                <strong className="text-gray-900">1.</strong>{" "}
                Enter or select your date of birth.
              </li>

              <li>
                <strong className="text-gray-900">2.</strong>{" "}
                Make sure the selected date is a valid calendar date.
              </li>

              <li>
                <strong className="text-gray-900">3.</strong>{" "}
                Select <strong className="text-gray-900">Calculate Age</strong>.
              </li>

              <li>
                <strong className="text-gray-900">4.</strong>{" "}
                Review your age in years, months, and days.
              </li>

              <li>
                <strong className="text-gray-900">5.</strong>{" "}
                Review the total elapsed days and next birthday information.
              </li>
            </ol>
          </section>

          {/* Common uses */}
          <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Common uses for an age calculator
            </h2>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <InfoCard
                title="Birthday planning"
                text="Find the exact age someone will reach on a birthday or another calendar date."
              />

              <InfoCard
                title="Personal records"
                text="Check an exact age in years, months, and days for personal reference."
              />

              <InfoCard
                title="School and study"
                text="Use calendar-based age calculations when working with dates in educational exercises."
              />

              <InfoCard
                title="Event planning"
                text="Calculate how many days remain until a birthday or another age-related milestone."
              />

              <InfoCard
                title="Family records"
                text="Compare dates of birth and calculate elapsed calendar time between important dates."
              />

              <InfoCard
                title="Everyday date calculations"
                text="Use the calculator when a precise calendar-based age is more useful than a rough estimate."
              />
            </div>
          </section>

          {/* Accuracy */}
          <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Important date-calculation details
            </h2>

            <ul className="mt-5 space-y-3 text-sm leading-7 text-gray-600">
              <li>
                • Future dates are rejected because they cannot represent a
                completed date of birth.
              </li>

              <li>
                • Calendar calculations account for different month lengths.
              </li>

              <li>
                • Leap years affect total elapsed calendar days.
              </li>

              <li>
                • A valid calendar date is required before the calculation can
                be performed.
              </li>

              <li>
                • Results should be checked carefully when they are being used
                for official eligibility, legal, medical, or financial
                decisions.
              </li>
            </ul>
          </section>

          {/* Privacy */}
          <section className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-blue-900">
              Browser-based and privacy-friendly
            </h2>

            <p className="mt-3 text-sm leading-7 text-blue-800">
              The age calculation itself is performed directly in your web
              browser. No account is required, and the entered date of birth
              does not need to be uploaded to a server for the calculation.
            </p>

            <p className="mt-3 text-sm leading-7 text-blue-800">
              As with any online service, your browser and device may still
              handle normal technical information such as network requests
              and browser data. See our{" "}
              <Link
                href="/privacy"
                className="font-medium text-blue-900 underline hover:text-blue-950"
              >
                Privacy Policy
              </Link>{" "}
              for more information.
            </p>
          </section>

          {/* FAQ */}
          <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Frequently asked questions
            </h2>

            <div className="mt-6 space-y-4">
              <Faq
                question="How do I calculate my age?"
                answer="Select your date of birth and choose Calculate Age. The calculator compares your birth date with today's local calendar date and displays your age in years, months, and days."
              />

              <Faq
                question="What does the age result mean?"
                answer="The result shows complete years followed by the remaining months and days. For example, 25 years, 4 months, and 12 days means 25 complete years have passed, followed by another 4 months and 12 days."
              />

              <Faq
                question="Does the calculator account for leap years?"
                answer="Yes. The calculator validates calendar dates and accounts for leap years when calculating elapsed calendar days."
              />

              <Faq
                question="What happens if I was born on February 29?"
                answer="February 29 is accepted as a valid date of birth. Birthday handling in a non-leap year follows the calculator's calendar-date rules."
              />

              <Faq
                question="Can I enter a future date?"
                answer="No. Future dates are rejected because a future date cannot be used as a completed date of birth for the age calculation."
              />

              <Faq
                question="Does the calculator show total days?"
                answer="Yes. The result includes the total number of elapsed calendar days between the date of birth and today's date."
              />

              <Faq
                question="Does the calculator show my next birthday?"
                answer="Yes. The result includes the date of the next birthday and the number of calendar days remaining until it."
              />

              <Faq
                question="Why is total age in days different from dividing by 365?"
                answer="A calendar year can contain 365 or 366 days, and calendar months have different lengths. The calculator therefore uses actual calendar dates rather than assuming every year contains exactly 365 days."
              />

              <Faq
                question="Can I use the calculator on a phone?"
                answer="Yes. The calculator is designed to work in modern desktop, tablet, and mobile web browsers."
              />

              <Faq
                question="Is this age calculator free?"
                answer="Yes. The ToolNoveHub Age Calculator is free to use and does not require an account."
              />

              <Faq
                question="Is my date of birth uploaded to a server?"
                answer="The age calculation itself is performed directly in your browser. The entered date does not need to be uploaded to a server for the calculation."
              />
            </div>
          </section>

          {/* Related tools */}
          <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Explore more calculator tools
            </h2>

            <p className="mt-4 text-sm leading-7 text-gray-600">
              ToolNoveHub provides additional free calculators for everyday
              numerical tasks.
            </p>

            <div className="not-prose mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/tools/calculator"
                className="rounded-lg border border-gray-300 px-4 py-3 text-sm font-medium text-gray-900 transition hover:bg-gray-50"
              >
                Online Calculator
              </Link>

              <Link
                href="/tools/percentage-calculator"
                className="rounded-lg border border-gray-300 px-4 py-3 text-sm font-medium text-gray-900 transition hover:bg-gray-50"
              >
                Percentage Calculator
              </Link>

              <Link
                href="/tools/calculators"
                className="rounded-lg border border-gray-300 px-4 py-3 text-sm font-medium text-gray-900 transition hover:bg-gray-50"
              >
                All Calculator Tools
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

function InfoCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <article className="rounded-xl border border-gray-200 bg-gray-50 p-5">
      <h3 className="font-semibold text-gray-900">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-gray-600">{text}</p>
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

      <p className="mt-3 text-sm leading-7 text-gray-600">{answer}</p>
    </details>
  );
}