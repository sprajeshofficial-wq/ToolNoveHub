import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  Home,
  Shield,
  Smartphone,
  Zap,
} from "lucide-react";

const siteUrl = "https://toolnovehub.tools";

interface ToolInfo {
  name: string;
  shortName: string;
  description: string;
  category: string;
  categoryUrl: string;
  keywords: string[];
  howToUse: string[];
  examples: string[];
  benefits: string[];
}

const tools: Record<string, ToolInfo> = {
  "age-calculator": {
    name: "Age Calculator",
    shortName: "Age Calculator",
    description:
      "Calculate your exact age in years, months, days, and more with this free online age calculator.",
    category: "Calculator Tools",
    categoryUrl: "/tools",
    keywords: ["age calculator", "calculate age", "date of birth calculator"],
    howToUse: [
      "Enter your date of birth.",
      "Select the date you want to calculate your age on.",
      "View your exact age instantly.",
    ],
    examples: [
      "Calculate your current age from your date of birth.",
      "Find your age on a specific future or past date.",
      "Calculate the difference between two dates.",
    ],
    benefits: [
      "Fast calculations directly in your browser.",
      "No signup or account required.",
      "Works on desktop, tablet, and mobile devices.",
    ],
  },

  "binary-converter": {
    name: "Binary Converter",
    shortName: "Binary Converter",
    description:
      "Convert binary numbers to decimal and decimal numbers to binary with this free online converter.",
    category: "Developer Tools",
    categoryUrl: "/tools",
    keywords: ["binary converter", "binary to decimal", "decimal to binary"],
    howToUse: [
      "Enter a binary or decimal number.",
      "Choose the conversion direction.",
      "Get the converted value instantly.",
    ],
    examples: [
      "Convert binary numbers to decimal.",
      "Convert decimal numbers to binary.",
      "Check binary values while learning programming.",
    ],
    benefits: [
      "Instant browser-based conversions.",
      "Useful for students and developers.",
      "No registration required.",
    ],
  },

  calculator: {
    name: "Calculator",
    shortName: "Calculator",
    description:
      "Use this free online calculator for everyday mathematical calculations quickly and easily.",
    category: "Calculator Tools",
    categoryUrl: "/tools",
    keywords: ["online calculator", "free calculator", "math calculator"],
    howToUse: [
      "Enter a mathematical expression or use the calculator buttons.",
      "Check the displayed calculation.",
      "Use the result for your next calculation.",
    ],
    examples: [
      "Perform basic arithmetic.",
      "Calculate totals and differences.",
      "Perform everyday mathematical calculations.",
    ],
    benefits: [
      "Simple and fast interface.",
      "Works directly in your browser.",
      "Free to use without signup.",
    ],
  },

  "color-picker": {
    name: "Color Picker",
    shortName: "Color Picker",
    description:
      "Pick colors and get useful color values with this free online color picker.",
    category: "Design Tools",
    categoryUrl: "/tools",
    keywords: ["color picker", "color selector", "hex color picker"],
    howToUse: [
      "Choose a color using the color picker.",
      "Adjust the color as needed.",
      "Copy the resulting color value.",
    ],
    examples: [
      "Pick a color for a website.",
      "Find a HEX color value.",
      "Choose colors for graphic and UI design.",
    ],
    benefits: [
      "Quick color selection.",
      "Useful for designers and developers.",
      "No software installation required.",
    ],
  },

  "file-size-converter": {
    name: "File Size Converter",
    shortName: "File Size Converter",
    description:
      "Convert file sizes between bytes, kilobytes, megabytes, gigabytes, and other common units.",
    category: "Converter Tools",
    categoryUrl: "/tools",
    keywords: ["file size converter", "bytes converter", "MB to GB"],
    howToUse: [
      "Enter the file size.",
      "Choose the source unit.",
      "Select the target unit and view the result.",
    ],
    examples: [
      "Convert MB to GB.",
      "Convert KB to MB.",
      "Convert bytes to larger file-size units.",
    ],
    benefits: [
      "Instant unit conversions.",
      "Simple browser-based tool.",
      "Free with no signup.",
    ],
  },

  "image-cropper": {
    name: "Image Cropper",
    shortName: "Image Cropper",
    description:
      "Crop images to the size and shape you need with this free online image cropper.",
    category: "Image Tools",
    categoryUrl: "/tools",
    keywords: ["image cropper", "crop image online", "free image cropper"],
    howToUse: [
      "Upload an image.",
      "Select the area you want to keep.",
      "Crop and download your image.",
    ],
    examples: [
      "Crop an image for social media.",
      "Remove unwanted areas around a photo.",
      "Prepare an image for a specific layout.",
    ],
    benefits: [
      "Easy browser-based image cropping.",
      "No signup required.",
      "Works across modern devices.",
    ],
  },

  "image-resizer": {
    name: "Image Resizer",
    shortName: "Image Resizer",
    description:
      "Resize images to custom dimensions online with this free browser-based image resizer.",
    category: "Image Tools",
    categoryUrl: "/tools",
    keywords: ["image resizer", "resize image online", "free image resize"],
    howToUse: [
      "Upload your image.",
      "Enter the desired width and height.",
      "Resize and download the resulting image.",
    ],
    examples: [
      "Resize an image for a website.",
      "Prepare photos for social media.",
      "Reduce image dimensions before sharing.",
    ],
    benefits: [
      "Simple image resizing.",
      "Browser-based workflow.",
      "No account required.",
    ],
  },

  "json-formatter": {
    name: "JSON Formatter",
    shortName: "JSON Formatter",
    description:
      "Format and beautify JSON data online with this free JSON formatter for developers and students.",
    category: "Developer Tools",
    categoryUrl: "/tools",
    keywords: ["JSON formatter", "format JSON", "JSON beautifier"],
    howToUse: [
      "Paste or enter your JSON data.",
      "Format the JSON.",
      "Review the formatted result and copy it when needed.",
    ],
    examples: [
      "Format API responses.",
      "Make minified JSON easier to read.",
      "Inspect structured JSON data while developing.",
    ],
    benefits: [
      "Fast JSON formatting.",
      "Useful for developers and students.",
      "No signup required.",
    ],
  },

  "json-validator": {
    name: "JSON Validator",
    shortName: "JSON Validator",
    description:
      "Validate JSON data online and quickly check whether your JSON is correctly structured.",
    category: "Developer Tools",
    categoryUrl: "/tools",
    keywords: ["JSON validator", "validate JSON", "JSON checker"],
    howToUse: [
      "Paste your JSON data into the validator.",
      "Run the validation.",
      "Review the validation result.",
    ],
    examples: [
      "Check API response JSON.",
      "Find invalid JSON before using it in an application.",
      "Validate JSON configuration data.",
    ],
    benefits: [
      "Quick browser-based validation.",
      "Useful during development.",
      "Free and easy to use.",
    ],
  },

  "number-to-words": {
    name: "Number to Words Converter",
    shortName: "Number to Words",
    description:
      "Convert numbers into words online with this free number-to-words converter.",
    category: "Text Tools",
    categoryUrl: "/tools",
    keywords: ["number to words", "number converter", "numbers in words"],
    howToUse: [
      "Enter a number.",
      "Run the conversion.",
      "Copy the number written in words.",
    ],
    examples: [
      "Convert numbers for documents.",
      "Write amounts in words.",
      "Convert large numbers into readable text.",
    ],
    benefits: [
      "Fast number conversion.",
      "Useful for documents and education.",
      "No signup required.",
    ],
  },

  "password-generator": {
    name: "Password Generator",
    shortName: "Password Generator",
    description:
      "Generate strong random passwords online with this free password generator.",
    category: "Security Tools",
    categoryUrl: "/tools",
    keywords: ["password generator", "strong password generator", "random password"],
    howToUse: [
      "Choose your preferred password options.",
      "Generate a password.",
      "Copy the generated password for use.",
    ],
    examples: [
      "Create a strong password for an online account.",
      "Generate a random password with custom length.",
      "Create passwords using different character types.",
    ],
    benefits: [
      "Fast password generation.",
      "Customizable password options.",
      "No signup required.",
    ],
  },

  "percentage-calculator": {
    name: "Percentage Calculator",
    shortName: "Percentage Calculator",
    description:
      "Calculate percentages, percentage increases, decreases, discounts, and other common percentage problems online.",
    category: "Calculator Tools",
    categoryUrl: "/tools",
    keywords: [
      "percentage calculator",
      "percent calculator",
      "percentage increase",
      "percentage decrease",
    ],
    howToUse: [
      "Enter the values required for your calculation.",
      "Choose the percentage calculation you need.",
      "View the result instantly.",
    ],
    examples: [
      "Calculate a percentage of a number.",
      "Calculate discounts and price reductions.",
      "Calculate percentage increases and decreases.",
    ],
    benefits: [
      "Instant percentage calculations.",
      "Useful for students and everyday tasks.",
      "Free with no signup.",
    ],
  },

  "qr-code-generator": {
    name: "QR Code Generator",
    shortName: "QR Code Generator",
    description:
      "Generate QR codes online for URLs, text, and other information with this free QR code generator.",
    category: "QR Code Tools",
    categoryUrl: "/tools",
    keywords: ["QR code generator", "generate QR code", "free QR code"],
    howToUse: [
      "Enter the URL or text you want to encode.",
      "Generate your QR code.",
      "Save or use the generated QR code.",
    ],
    examples: [
      "Create a QR code for a website URL.",
      "Share text through a QR code.",
      "Create a QR code for printed materials.",
    ],
    benefits: [
      "Fast QR code generation.",
      "No signup required.",
      "Works across desktop and mobile devices.",
    ],
  },

  "qr-code-scanner": {
    name: "QR Code Scanner",
    shortName: "QR Code Scanner",
    description:
      "Scan and read QR codes online using a compatible device with this free QR code scanner.",
    category: "QR Code Tools",
    categoryUrl: "/tools",
    keywords: ["QR code scanner", "scan QR code", "QR reader"],
    howToUse: [
      "Open the QR code scanner.",
      "Allow camera access if required.",
      "Point your camera at the QR code and read the result.",
    ],
    examples: [
      "Scan a website QR code.",
      "Read information stored in a QR code.",
      "Open a QR code link using your device.",
    ],
    benefits: [
      "Convenient browser-based scanning.",
      "No separate app required on compatible devices.",
      "Simple interface.",
    ],
  },

  "text-repeater": {
    name: "Text Repeater",
    shortName: "Text Repeater",
    description:
      "Repeat text multiple times online with this free text repeater tool.",
    category: "Text Tools",
    categoryUrl: "/tools",
    keywords: ["text repeater", "repeat text", "text generator"],
    howToUse: [
      "Enter the text you want to repeat.",
      "Choose how many times it should repeat.",
      "Generate and copy the repeated text.",
    ],
    examples: [
      "Repeat a word or phrase.",
      "Create repeated test content.",
      "Generate repeated text for testing.",
    ],
    benefits: [
      "Fast text generation.",
      "Simple interface.",
      "No signup required.",
    ],
  },

  "text-to-ascii": {
    name: "Text to ASCII Converter",
    shortName: "Text to ASCII",
    description:
      "Convert text to ASCII representations online with this free text conversion tool.",
    category: "Developer Tools",
    categoryUrl: "/tools",
    keywords: ["text to ASCII", "ASCII converter", "ASCII text converter"],
    howToUse: [
      "Enter your text.",
      "Run the conversion.",
      "Copy the generated ASCII values.",
    ],
    examples: [
      "Inspect ASCII values for characters.",
      "Learn character encoding.",
      "Use ASCII values during programming tasks.",
    ],
    benefits: [
      "Quick character conversion.",
      "Useful for developers and students.",
      "Free browser-based tool.",
    ],
  },

  "text-to-slug": {
    name: "Text to Slug Converter",
    shortName: "Text to Slug",
    description:
      "Convert titles and text into clean URL-friendly slugs with this free online slug generator.",
    category: "Text Tools",
    categoryUrl: "/tools",
    keywords: ["text to slug", "slug generator", "URL slug generator"],
    howToUse: [
      "Enter your title or text.",
      "Convert the text into a slug.",
      "Copy the URL-friendly result.",
    ],
    examples: [
      "Create a slug from a blog title.",
      "Generate URL-friendly product names.",
      "Convert headings into clean URL paths.",
    ],
    benefits: [
      "Fast slug generation.",
      "Useful for websites and SEO workflows.",
      "No signup required.",
    ],
  },

  "unit-converter": {
    name: "Unit Converter",
    shortName: "Unit Converter",
    description:
      "Convert common units online including length, weight, temperature, and other measurements.",
    category: "Converter Tools",
    categoryUrl: "/tools",
    keywords: ["unit converter", "measurement converter", "online unit converter"],
    howToUse: [
      "Choose the measurement category.",
      "Enter the value and source unit.",
      "Select the target unit and view the result.",
    ],
    examples: [
      "Convert kilometers to miles.",
      "Convert kilograms to pounds.",
      "Convert temperatures between common units.",
    ],
    benefits: [
      "Fast measurement conversions.",
      "Useful for everyday calculations.",
      "Free to use.",
    ],
  },

  "word-counter": {
    name: "Word Counter",
    shortName: "Word Counter",
    description:
      "Count words, characters, sentences, and other text statistics with this free online word counter.",
    category: "Text Tools",
    categoryUrl: "/tools",
    keywords: ["word counter", "character counter", "online word counter"],
    howToUse: [
      "Paste or type your text.",
      "Review the automatically calculated statistics.",
      "Use the word and character counts for your task.",
    ],
    examples: [
      "Check the word count of an essay.",
      "Count characters for social media posts.",
      "Check text length before submitting an assignment.",
    ],
    benefits: [
      "Instant text statistics.",
      "Useful for students, writers, and professionals.",
      "No signup required.",
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(tools).map((tool) => ({
    tool,
  }));
}

interface ToolPageProps {
  params: {
    tool: string;
  };
}

export async function generateMetadata({
  params,
}: ToolPageProps): Promise<Metadata> {
  const tool = tools[params.tool];

  if (!tool) {
    return {
      title: "Tool Not Found",
      description: "The requested ToolNoveHub tool could not be found.",
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  const canonicalUrl = `${siteUrl}/tools/${params.tool}`;

  return {
    title: `${tool.name} – Free Online Tool`,
    description: tool.description,

    alternates: {
      canonical: canonicalUrl,
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

    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: "ToolNoveHub",
      url: canonicalUrl,
      title: `${tool.name} – Free Online Tool`,
      description: tool.description,
    },

    twitter: {
      card: "summary",
      title: `${tool.name} – Free Online Tool`,
      description: tool.description,
    },
  };
}

export default function ToolPage({ params }: ToolPageProps) {
  const tool = tools[params.tool];

  if (!tool) {
    notFound();
  }

  const canonicalUrl = `${siteUrl}/tools/${params.tool}`;

  const relatedTools = Object.entries(tools)
    .filter(([slug]) => slug !== params.tool)
    .filter(([, item]) => item.category === tool.category)
    .slice(0, 4);

  const webApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": `${canonicalUrl}/#webapp`,
    name: tool.name,
    url: canonicalUrl,
    description: tool.description,
    applicationCategory: "UtilityApplication",
    operatingSystem: "All",
    browserRequirements: "Requires a modern web browser",
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    publisher: {
      "@type": "Organization",
      name: "ToolNoveHub",
      url: siteUrl,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "ToolNoveHub",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Free Tools",
        item: `${siteUrl}/tools`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: tool.name,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 px-4 py-20">
      <div className="mx-auto max-w-5xl">
        {/* Breadcrumbs */}
        <nav
          aria-label="Breadcrumb"
          className="mb-8 text-sm text-slate-500"
        >
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link
                href="/"
                className="inline-flex items-center gap-1 hover:text-indigo-600"
              >
                <Home
                  className="h-4 w-4"
                  aria-hidden="true"
                />
                Home
              </Link>
            </li>

            <li aria-hidden="true">/</li>

            <li>
              <Link
                href="/tools"
                className="hover:text-indigo-600"
              >
                Free Tools
              </Link>
            </li>

            <li aria-hidden="true">/</li>

            <li
              className="font-medium text-slate-700"
              aria-current="page"
            >
              {tool.name}
            </li>
          </ol>
        </nav>

        {/* Header */}
        <header className="text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-indigo-600">
            {tool.category}
          </p>

          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            {tool.name}
          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            {tool.description}
          </p>
        </header>

        {/* Tool Area */}
        <section
          aria-labelledby="tool-area-heading"
          className="mt-10 rounded-2xl border border-slate-200/70 bg-white p-6 shadow-xl sm:p-8"
        >
          <h2
            id="tool-area-heading"
            className="sr-only"
          >
            {tool.name} tool
          </h2>

          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
            <p className="text-slate-600">
              The interactive {tool.shortName.toLowerCase()} is
              available on this page.
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Use the tool interface above or continue browsing
              ToolNoveHub&apos;s free online tools.
            </p>

            <Link
              href="/tools"
              className="mt-5 inline-flex items-center rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700"
            >
              Browse All Tools
              <ArrowRight
                className="ml-2 h-4 w-4"
                aria-hidden="true"
              />
            </Link>
          </div>
        </section>

        {/* How to Use */}
        <section
          aria-labelledby="how-to-use-heading"
          className="mt-10 rounded-2xl border border-slate-200/70 bg-white p-6 shadow-lg sm:p-8"
        >
          <h2
            id="how-to-use-heading"
            className="text-2xl font-bold text-slate-900"
          >
            How to Use {tool.name}
          </h2>

          <ol className="mt-5 space-y-4">
            {tool.howToUse.map((step, index) => (
              <li
                key={step}
                className="flex gap-4"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700">
                  {index + 1}
                </span>

                <p className="pt-1 text-slate-600">
                  {step}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* Examples */}
        <section
          aria-labelledby="examples-heading"
          className="mt-8 rounded-2xl border border-slate-200/70 bg-white p-6 shadow-lg sm:p-8"
        >
          <h2
            id="examples-heading"
            className="text-2xl font-bold text-slate-900"
          >
            Examples of {tool.name}
          </h2>

          <ul className="mt-5 space-y-3">
            {tool.examples.map((example) => (
              <li
                key={example}
                className="flex gap-3 text-slate-600"
              >
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 shrink-0 text-indigo-600"
                  aria-hidden="true"
                />
                <span>{example}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Benefits */}
        <section
          aria-labelledby="benefits-heading"
          className="mt-8"
        >
          <h2
            id="benefits-heading"
            className="text-2xl font-bold text-slate-900"
          >
            Why Use ToolNoveHub&apos;s {tool.name}?
          </h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {tool.benefits.map((benefit, index) => {
              const icons = [Shield, Zap, Smartphone];
              const Icon = icons[index % icons.length];

              return (
                <div
                  key={benefit}
                  className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <Icon
                    className="h-6 w-6 text-indigo-600"
                    aria-hidden="true"
                  />

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {benefit}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* FAQ */}
        <section
          aria-labelledby="faq-heading"
          className="mt-10 rounded-2xl border border-slate-200/70 bg-white p-6 shadow-lg sm:p-8"
        >
          <h2
            id="faq-heading"
            className="text-2xl font-bold text-slate-900"
          >
            Frequently Asked Questions About {tool.name}
          </h2>

          <div className="mt-6 divide-y divide-slate-200">
            <details className="py-4">
              <summary className="cursor-pointer font-semibold text-slate-900">
                Is {tool.name} free to use?
              </summary>

              <p className="mt-3 leading-7 text-slate-600">
                Yes. ToolNoveHub provides this tool free to use
                online without requiring a paid subscription.
              </p>
            </details>

            <details className="py-4">
              <summary className="cursor-pointer font-semibold text-slate-900">
                Do I need to create an account?
              </summary>

              <p className="mt-3 leading-7 text-slate-600">
                No signup is required to use ToolNoveHub&apos;s
                free online tools.
              </p>
            </details>

            <details className="py-4">
              <summary className="cursor-pointer font-semibold text-slate-900">
                Can I use this tool on a phone?
              </summary>

              <p className="mt-3 leading-7 text-slate-600">
                Yes. The ToolNoveHub website is designed to work
                on modern desktop, tablet, and mobile browsers.
              </p>
            </details>
          </div>
        </section>

        {/* Related Tools */}
        {relatedTools.length > 0 && (
          <section
            aria-labelledby="related-tools-heading"
            className="mt-10"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2
                  id="related-tools-heading"
                  className="text-2xl font-bold text-slate-900"
                >
                  Related Tools
                </h2>

                <p className="mt-1 text-sm text-slate-600">
                  Explore more free tools from ToolNoveHub.
                </p>
              </div>

              <Link
                href="/tools"
                className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
              >
                View all tools →
              </Link>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4">
              {relatedTools.map(([slug, relatedTool]) => (
                <Link
                  key={slug}
                  href={`/tools/${slug}`}
                  className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg"
                >
                  <span className="text-sm font-semibold text-slate-900">
                    {relatedTool.name}
                  </span>

                  <span className="mt-2 block text-xs text-indigo-600">
                    Open tool →
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              webApplicationSchema,
              breadcrumbSchema,
            ]),
          }}
        />
      </div>
    </div>
  );
}