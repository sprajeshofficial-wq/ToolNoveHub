import type { Metadata } from "next";
import AgeCalculator from "./AgeCalculator";

const siteUrl = "https://toolnovehub.tools";
const pageUrl = `${siteUrl}/tools/age-calculator`;

export const metadata: Metadata = {
  title: "Age Calculator - Calculate Your Exact Age",
  description:
    "Calculate your exact age in years, months, and days, see total elapsed days, and find your next birthday with ToolNoveHub's free online age calculator.",
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
      "Calculate your age in years, months, and days, total elapsed days, and next birthday.",
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
    "Reject future dates",
    "Validate calendar dates",
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
          "Yes. The calculator validates calendar dates and handles leap years when calculating elapsed calendar days. February 29 birth dates are also supported.",
      },
    },
    {
      "@type": "Question",
      name: "What happens if I was born on February 29?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "A February 29 birth date is treated as February 28 for the birthday in a non-leap year so that the birthday remains a valid calendar date.",
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

        {/* Main content */}
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
          <AgeCalculator />

          {/* FAQ */}
          <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
            <h2 className="text-xl font-bold text-gray-900">
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
                answer="Yes. The calculator validates calendar dates and uses calendar-day calculations, including leap years. February 29 birth dates are supported."
              />

              <Faq
                question="What happens if I was born on February 29?"
                answer="February 29 is accepted as a valid date of birth. In a non-leap year, the next birthday is treated as February 28 so that the birthday remains a valid calendar date."
              />

              <Faq
                question="Does the calculator show my next birthday?"
                answer="Yes. The result includes the date of your next birthday and the number of calendar days remaining until it."
              />

              <Faq
                question="Why is total age in days different from dividing by 365?"
                answer="A calendar year can contain 365 or 366 days. The calculator therefore counts actual calendar-day differences rather than assuming every year contains exactly 365 days."
              />

              <Faq
                question="Can I use the calculator on a phone?"
                answer="Yes. The calculator is designed to work in modern desktop and mobile web browsers."
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
        </div>
      </main>
    </>
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