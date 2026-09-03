import type { Metadata } from "next";
import Link from "next/link";
import PasswordGenerator from "./PasswordGenerator";

export const metadata: Metadata = {
  title: "Password Generator - Create Strong, Secure Passwords | ToolNoveHub",
  description:
    "Generate strong, secure passwords instantly. Customize length, include uppercase, lowercase, numbers, and symbols. Free browser-based password generator.",
  keywords: [
    "password generator",
    "strong password",
    "random password",
    "secure password",
    "password creator",
    "online password generator",
    "password maker",
    "random password generator",
  ],
  alternates: {
    canonical: "https://toolnovehub.tools/tools/password-generator",
  },
  openGraph: {
    title: "Password Generator - Create Strong, Secure Passwords | ToolNoveHub",
    description:
      "Generate strong, secure passwords instantly. Customize length and character types.",
    url: "https://toolnovehub.tools/tools/password-generator",
    type: "website",
    images: [
      {
        url: "https://toolnovehub.tools/og-password-generator.jpg",
        width: 1200,
        height: 630,
        alt: "Password Generator - Free Online Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Password Generator - Create Strong, Secure Passwords | ToolNoveHub",
    description: "Generate strong, secure passwords instantly.",
    images: ["https://toolnovehub.tools/og-password-generator.jpg"],
  },
};

export default function PasswordGeneratorPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Password Generator",
    description:
      "Generate strong, secure passwords instantly. Customize length and character types.",
    applicationCategory: "Utility",
    operatingSystem: "All",
    browserRequirements: "Requires JavaScript",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 px-4 py-20">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-4 text-center text-4xl font-bold text-slate-900">
          Password Generator – Create Strong, Secure Passwords
        </h1>

        <p className="mx-auto mb-12 max-w-2xl text-center text-slate-600">
          Generate strong passwords instantly. Customize length and character
          types. No signup, browser-based.
        </p>

        <div className="rounded-2xl border border-slate-200/50 bg-white/80 p-6 shadow-xl backdrop-blur-sm">
          <PasswordGenerator />
        </div>

        <div className="prose prose-slate mt-12 max-w-none">
          <h2>How to Use the Password Generator</h2>

          <ol>
            <li>
              <strong>Choose your options:</strong> Select the character types
              you want to include.
            </li>
            <li>
              <strong>Set password length:</strong> Use the slider to choose
              between 4 and 64 characters.
            </li>
            <li>
              <strong>Generate:</strong> Click the &quot;Generate
              Password&quot; button.
            </li>
            <li>
              <strong>Copy:</strong> Click the copy button to use your new
              password.
            </li>
          </ol>

          <h2>Why Use a Password Generator?</h2>

          <ul>
            <li>
              <strong>Strong passwords:</strong> Random passwords are harder to
              guess or crack.
            </li>
            <li>
              <strong>Unique passwords:</strong> Use different passwords for
              different accounts.
            </li>
            <li>
              <strong>Save time:</strong> No more thinking of passwords.
            </li>
            <li>
              <strong>Privacy first:</strong> Password generation happens in
              your browser.
            </li>
          </ul>

          <h2>Password Strength Tips</h2>

          <ul>
            <li>Use at least 12 characters.</li>
            <li>
              Include uppercase, lowercase, numbers, and symbols.
            </li>
            <li>
              Don&apos;t use personal information such as your name or
              birthday.
            </li>
            <li>Use different passwords for each account.</li>
            <li>Consider using a password manager.</li>
          </ul>
        </div>

        <div className="mt-8 rounded-2xl border border-slate-200/50 bg-white/80 p-6 shadow-xl backdrop-blur-sm">
          <h2 className="mb-4 text-2xl font-bold text-slate-900">
            Frequently Asked Questions About Password Generators
          </h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-slate-900">
                How secure is the generated password?
              </h3>
              <p className="text-slate-600">
                Our password generator uses a cryptographically secure random
                number generator. The strength depends on your settings.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900">
                Is my password stored or shared?
              </h3>
              <p className="text-slate-600">
                The password generation happens in your browser and the
                generated password is not sent to our server by this tool.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="mb-4 text-2xl font-bold text-slate-900">
            Related Tools
          </h2>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <Link
              href="/tools/qr-code-generator"
              className="rounded-xl border border-slate-200/50 bg-white p-4 text-center shadow-lg transition-all hover:border-indigo-200 hover:shadow-xl"
            >
              <span className="text-sm font-medium text-slate-900">
                QR Code Generator
              </span>
            </Link>

            <Link
              href="/tools/calculator"
              className="rounded-xl border border-slate-200/50 bg-white p-4 text-center shadow-lg transition-all hover:border-indigo-200 hover:shadow-xl"
            >
              <span className="text-sm font-medium text-slate-900">
                Calculator
              </span>
            </Link>

            <Link
              href="/tools/percentage-calculator"
              className="rounded-xl border border-slate-200/50 bg-white p-4 text-center shadow-lg transition-all hover:border-indigo-200 hover:shadow-xl"
            >
              <span className="text-sm font-medium text-slate-900">
                Percentage Calculator
              </span>
            </Link>

            <Link
              href="/tools/color-picker"
              className="rounded-xl border border-slate-200/50 bg-white p-4 text-center shadow-lg transition-all hover:border-indigo-200 hover:shadow-xl"
            >
              <span className="text-sm font-medium text-slate-900">
                Color Picker
              </span>
            </Link>
          </div>
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaData),
          }}
        />
      </div>
    </div>
  );
}