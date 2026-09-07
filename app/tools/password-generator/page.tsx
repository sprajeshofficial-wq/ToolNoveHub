import type { Metadata } from "next";
import Link from "next/link";
import PasswordGenerator from "./PasswordGenerator";

export const metadata: Metadata = {
  title: "Password Generator - Create Strong, Secure Passwords",
  description:
    "Generate strong random passwords online with customizable length, uppercase letters, lowercase letters, numbers, and symbols. Browser-based and free to use.",
  keywords: [
    "password generator",
    "strong password generator",
    "random password generator",
    "secure password generator",
    "password creator",
    "online password generator",
    "password maker",
    "random password",
  ],
  alternates: {
    canonical:
      "https://toolnovehub.tools/tools/password-generator",
  },
  openGraph: {
    title: "Password Generator - Create Strong, Secure Passwords",
    description:
      "Generate strong random passwords with customizable length and character types.",
    url: "https://toolnovehub.tools/tools/password-generator",
    type: "website",
    images: [
      {
        url: "https://toolnovehub.tools/og-password-generator.jpg",
        width: 1200,
        height: 630,
        alt: "Password Generator - ToolNoveHub",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Password Generator - Create Strong, Secure Passwords",
    description:
      "Generate strong random passwords with customizable length and character types.",
    images: [
      "https://toolnovehub.tools/og-password-generator.jpg",
    ],
  },
};

const schemaData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Password Generator",
  description:
    "Generate strong random passwords with customizable length and character types.",
  applicationCategory: "SecurityApplication",
  operatingSystem: "All",
  browserRequirements: "Requires JavaScript",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function PasswordGeneratorPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 px-4 py-12 sm:py-16">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <header className="mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Password Generator – Create Strong, Secure Passwords
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Generate random passwords with a customizable length
            and character set. The password generation logic runs
            directly in your browser.
          </p>
        </header>

        {/* Generator */}
        <section
          aria-labelledby="password-generator-heading"
          className="rounded-2xl border border-slate-200/70 bg-white/90 p-6 shadow-xl backdrop-blur-sm sm:p-8"
        >
          <h2
            id="password-generator-heading"
            className="sr-only"
          >
            Password generator controls
          </h2>

          <PasswordGenerator />
        </section>

        {/* How to use */}
        <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-bold text-slate-900">
            How to use the Password Generator
          </h2>

          <ol className="mt-5 list-decimal space-y-3 pl-5 text-sm leading-7 text-slate-600">
            <li>
              <strong className="text-slate-900">
                Choose the character types
              </strong>{" "}
              you want to include, such as uppercase letters,
              lowercase letters, numbers, and symbols.
            </li>

            <li>
              <strong className="text-slate-900">
                Choose the password length
              </strong>{" "}
              using the length slider.
            </li>

            <li>
              <strong className="text-slate-900">
                Generate the password
              </strong>{" "}
              using the Generate Password button.
            </li>

            <li>
              <strong className="text-slate-900">
                Copy the result
              </strong>{" "}
              when you are ready to use or save it.
            </li>
          </ol>
        </section>

        {/* Why use one */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-bold text-slate-900">
            Why use a password generator?
          </h2>

          <p className="mt-4 text-sm leading-7 text-slate-600">
            Creating a different random password for every account
            can be difficult to do manually. A password generator
            can quickly create strings that are longer and less
            predictable than passwords based on common words,
            names, dates, or other personal information.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-slate-50 p-5">
              <h3 className="font-semibold text-slate-900">
                Longer passwords
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Increasing password length generally increases the
                number of possible combinations an attacker must
                consider.
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-5">
              <h3 className="font-semibold text-slate-900">
                Random characters
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Randomly selected characters avoid many predictable
                patterns found in manually created passwords.
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-5">
              <h3 className="font-semibold text-slate-900">
                Unique passwords
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Using separate passwords for different services
                helps limit the impact of a compromised account.
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-5">
              <h3 className="font-semibold text-slate-900">
                Easy to customize
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Some websites have character requirements, so
                customizable length and character types can be
                useful when creating a password.
              </p>
            </div>
          </div>
        </section>

        {/* Password strength */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-bold text-slate-900">
            Password strength tips
          </h2>

          <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-slate-600">
            <li>
              Prefer longer passwords, especially for important
              accounts.
            </li>

            <li>
              Avoid names, birthdays, addresses, dictionary words,
              and predictable patterns.
            </li>

            <li>
              Use a different password for every important account.
            </li>

            <li>
              Consider using a reputable password manager to store
              unique passwords.
            </li>

            <li>
              Enable multi-factor authentication when a service
              provides it.
            </li>
          </ul>

          <p className="mt-5 text-sm leading-7 text-slate-600">
            The strength indicator in this tool is an estimate based
            on password length and selected character categories.
            It should not be treated as a complete password-security
            audit.
          </p>
        </section>

        {/* Randomness */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-bold text-slate-900">
            How password generation works
          </h2>

          <p className="mt-4 text-sm leading-7 text-slate-600">
            This generator uses the browser&apos;s Web Crypto API
            to obtain random values and uses those values to select
            characters from the character sets you choose.
          </p>

          <p className="mt-4 text-sm leading-7 text-slate-600">
            The generator also makes sure that each selected
            character category contributes at least one character
            when the password length allows it. The resulting
            characters are then shuffled before the password is
            displayed.
          </p>

          <p className="mt-4 text-sm leading-7 text-slate-600">
            Randomness alone does not guarantee account security.
            The security of an account also depends on password
            length, uniqueness, storage practices, multi-factor
            authentication, and the security of the service where
            the password is used.
          </p>
        </section>

        {/* Browser processing */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-bold text-slate-900">
            Browser-based password generation
          </h2>

          <p className="mt-4 text-sm leading-7 text-slate-600">
            Password generation is performed directly in your
            browser. The generated password is not submitted to a
            password-generation API by this tool.
          </p>

          <p className="mt-4 text-sm leading-7 text-slate-600">
            As with other website features, site-wide services such
            as analytics may operate separately. Review the
            ToolNoveHub Privacy Policy for information about how
            website data is handled.
          </p>
        </section>

        {/* FAQ */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-bold text-slate-900">
            Password Generator FAQ
          </h2>

          <div className="mt-6 space-y-6">
            <div>
              <h3 className="font-semibold text-slate-900">
                Is the password generator secure?
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                The generator uses the browser&apos;s Web Crypto
                API for random-value generation rather than
                Math.random(). Security also depends on how the
                generated password is used and stored.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900">
                How long should a password be?
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Longer passwords generally provide a larger search
                space. For many personal accounts, choosing 16 or
                more characters is a practical starting point when
                the service permits it.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900">
                Does the generator store my password?
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                The password-generation function runs in your
                browser and does not send the generated password to
                a password-generation server.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900">
                Can I use the same generated password on multiple
                websites?
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                It is better to use a unique password for each
                important account. Reusing a password can increase
                the impact of a breach at another service.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900">
                Does the strength indicator guarantee security?
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                No. The indicator is only a simple estimate based on
                length and character choices. It does not analyze
                every property of a password or predict how a
                particular service handles authentication.
              </p>
            </div>
          </div>
        </section>

        {/* Related tools */}
        <section className="mt-8">
          <h2 className="mb-4 text-2xl font-bold text-slate-900">
            Related Tools
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            <Link
              href="/tools/qr-code-generator"
              className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm transition hover:border-indigo-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <span className="text-sm font-medium text-slate-900">
                QR Code Generator
              </span>
            </Link>

            <Link
              href="/tools/calculator"
              className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm transition hover:border-indigo-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <span className="text-sm font-medium text-slate-900">
                Calculator
              </span>
            </Link>

            <Link
              href="/tools/percentage-calculator"
              className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm transition hover:border-indigo-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <span className="text-sm font-medium text-slate-900">
                Percentage Calculator
              </span>
            </Link>

            <Link
              href="/tools/color-picker"
              className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm transition hover:border-indigo-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <span className="text-sm font-medium text-slate-900">
                Color Picker
              </span>
            </Link>
          </div>
        </section>

        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaData),
          }}
        />
      </div>
    </main>
  );
}