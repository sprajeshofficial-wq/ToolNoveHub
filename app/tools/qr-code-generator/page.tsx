import type { Metadata } from "next";
import QRCodeGenerator from "./QRCodeGenerator";

const siteUrl = "https://toolnovehub.tools";
const pageUrl = `${siteUrl}/tools/qr-code-generator`;

export const metadata: Metadata = {
  title: "QR Code Generator - Create Free QR Codes Online",
  description:
    "Create free QR codes for text, websites, and Wi-Fi networks with ToolNoveHub. Generate and download a PNG QR code directly in your browser.",
  keywords: [
    "QR code generator",
    "free QR code generator",
    "create QR code",
    "QR code maker",
    "Wi-Fi QR code generator",
    "URL QR code",
    "text QR code",
    "QR code generator online",
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    type: "website",
    url: pageUrl,
    title: "QR Code Generator - Create Free QR Codes Online | ToolNoveHub",
    description:
      "Create free QR codes for text, websites, and Wi-Fi networks directly in your browser.",
    siteName: "ToolNoveHub",
  },
  twitter: {
    card: "summary",
    title: "QR Code Generator - Create Free QR Codes Online | ToolNoveHub",
    description:
      "Create and download free QR codes for text, websites, and Wi-Fi networks directly in your browser.",
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
  name: "ToolNoveHub QR Code Generator",
  url: pageUrl,
  description:
    "A free browser-based QR code generator for creating QR codes for text, websites, and Wi-Fi networks.",
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
    "Generate QR codes for text",
    "Generate QR codes for websites",
    "Generate QR codes for Wi-Fi networks",
    "Download QR codes as PNG images",
    "Copy QR code images when browser support is available",
    "Browser-based QR code generation",
    "Static QR codes",
    "No account required",
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is the QR Code Generator free?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes. You can create QR codes with the ToolNoveHub generator without creating an account.",
      },
    },
    {
      "@type": "Question",
      name: "What types of QR codes can I create?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "The generator supports QR codes for text, website URLs, and Wi-Fi network information.",
      },
    },
    {
      "@type": "Question",
      name: "Can I create a QR code for a website?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes. Select URL, enter a complete HTTP or HTTPS website address, and generate the QR code.",
      },
    },
    {
      "@type": "Question",
      name: "Can I create a Wi-Fi QR code?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes. Select Wi-Fi and enter the network name, security type, and password when required.",
      },
    },
    {
      "@type": "Question",
      name: "Can I download my QR code?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes. After generating a QR code, you can download it as a PNG image.",
      },
    },
    {
      "@type": "Question",
      name: "Can I copy the QR code?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "The Copy QR button uses the browser clipboard when image copying is supported. If the browser does not support image clipboard operations, the QR code can be downloaded as a PNG instead.",
      },
    },
    {
      "@type": "Question",
      name: "Does a QR code expire?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "A QR code does not automatically expire. However, information inside it can become outdated. For example, a QR code containing a website address will only work as expected while the destination remains available.",
      },
    },
    {
      "@type": "Question",
      name: "Does the generator create dynamic QR codes?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "No. The ToolNoveHub QR Code Generator creates static QR codes containing the information provided by the user. It does not provide a separate redirect or scan-tracking service.",
      },
    },
    {
      "@type": "Question",
      name: "How much text can I put into a QR code?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "The generator accepts up to 2,000 characters for text and URLs. Shorter content generally produces simpler QR codes that are easier for phones and cameras to scan.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use a QR code for Wi-Fi?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes. Wi-Fi QR codes can contain a network name, security type, password when required, and hidden-network information.",
      },
    },
  ],
};

export default function QRCodeGeneratorPage() {
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
                Free online tool
              </p>

              <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                QR Code Generator
              </h1>

              <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-gray-600">
                Create free QR codes for text, websites, and Wi-Fi
                networks. Generate and download your QR code directly
                from your browser.
              </p>
            </div>
          </div>
        </section>

        {/* Main content */}
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
          <QRCodeGenerator />

          {/* About */}
          <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
            <h2 className="text-xl font-bold text-gray-900">
              About the QR Code Generator
            </h2>

            <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
              <p>
                A QR code is a two-dimensional barcode that can store
                information such as website addresses, text, and Wi-Fi
                connection details. A compatible phone or camera app can
                scan the code and read the stored information.
              </p>

              <p>
                ToolNoveHub&apos;s QR Code Generator provides a simple
                way to create static QR codes without installing
                additional software. Enter your information, generate
                the code, and download the result.
              </p>

              <p>
                For website QR codes, the code stores the URL you enter.
                The QR code itself does not guarantee that the website
                will remain available in the future.
              </p>
            </div>
          </section>

          {/* How to use */}
          <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
            <h2 className="text-xl font-bold text-gray-900">
              How to use the QR Code Generator
            </h2>

            <ol className="mt-5 space-y-4 text-sm leading-7 text-gray-600">
              <li>
                <strong className="text-gray-900">1.</strong>{" "}
                Choose the type of QR code you want to create.
              </li>

              <li>
                <strong className="text-gray-900">2.</strong>{" "}
                Enter the required information, such as a website address,
                text, or Wi-Fi details.
              </li>

              <li>
                <strong className="text-gray-900">3.</strong>{" "}
                Select <strong className="text-gray-900">Generate QR Code</strong>.
              </li>

              <li>
                <strong className="text-gray-900">4.</strong>{" "}
                Check the generated code and scan it with a compatible
                device before sharing or printing it.
              </li>

              <li>
                <strong className="text-gray-900">5.</strong>{" "}
                Download the QR code as a PNG image or copy it when
                supported by your browser.
              </li>
            </ol>
          </section>

          {/* Use cases */}
          <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
            <h2 className="text-xl font-bold text-gray-900">
              Common QR code uses
            </h2>

            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              <InfoCard
                title="Websites"
                text="Create QR codes that make it easy for people to open a website or landing page."
              />

              <InfoCard
                title="Wi-Fi access"
                text="Create a QR code containing Wi-Fi network information so compatible devices can use it to connect."
              />

              <InfoCard
                title="Text"
                text="Convert short pieces of text, instructions, or supported information into a scannable QR code."
              />
            </div>
          </section>

          {/* Static QR explanation */}
          <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
            <h2 className="text-xl font-bold text-gray-900">
              Static QR codes explained
            </h2>

            <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
              <p>
                A static QR code stores the information directly inside
                the QR pattern. If you create a QR code containing a
                website address, that address is encoded into the code.
              </p>

              <p>
                This means there is no ToolNoveHub redirect page required
                when the QR code is scanned. The result depends on the
                information stored in the code and whether that
                information is still valid.
              </p>

              <p>
                Before printing or distributing a QR code, scan it with
                a compatible device to confirm that it works as expected.
              </p>
            </div>
          </section>

          {/* Privacy */}
          <section className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-blue-900">
              Privacy and browser-based processing
            </h2>

            <div className="mt-4 space-y-4 text-sm leading-7 text-blue-800">
              <p>
                QR code generation is designed to run directly in your
                web browser using the information you enter into the
                tool. No account is required.
              </p>

              <p>
                The browser creates the QR image locally for the
                generation process. As with any website, review the
                ToolNoveHub Privacy Policy and your browser settings
                before entering sensitive information.
              </p>

              <p>
                Be especially careful when sharing QR codes containing
                private information such as Wi-Fi passwords or personal
                contact details.
              </p>
            </div>
          </section>

          {/* FAQ */}
          <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
            <h2 className="text-xl font-bold text-gray-900">
              Frequently asked questions
            </h2>

            <div className="mt-6 space-y-4">
              <Faq
                question="What is a QR code generator?"
                answer="A QR code generator converts information such as text, website addresses, or Wi-Fi details into a scannable QR code."
              />

              <Faq
                question="What types of QR codes can I create?"
                answer="The ToolNoveHub generator supports text, website URLs, and Wi-Fi network information."
              />

              <Faq
                question="Can I create a QR code for a website?"
                answer="Yes. Select URL, enter a complete HTTP or HTTPS website address, and generate the QR code."
              />

              <Faq
                question="Can I create a Wi-Fi QR code?"
                answer="Yes. Select Wi-Fi and enter the network name, security type, and password when required."
              />

              <Faq
                question="Can I download the QR code?"
                answer="Yes. After generating a QR code, use Download PNG to save the image to your device."
              />

              <Faq
                question="Can I copy the QR code?"
                answer="The Copy QR button uses the browser clipboard when image copying is supported. If your browser does not support image clipboard operations, download the PNG instead."
              />

              <Faq
                question="Does a QR code expire?"
                answer="A QR code does not automatically expire. However, information inside it can become outdated. For example, a QR code containing a website address will only work as expected while the destination remains available."
              />

              <Faq
                question="Does this generator create dynamic QR codes?"
                answer="No. ToolNoveHub creates static QR codes containing the information you provide. It does not provide a separate redirect or scan-tracking service."
              />

              <Faq
                question="How much text can I put into a QR code?"
                answer="The generator accepts up to 2,000 characters for text and URLs. Shorter content generally produces simpler QR codes that are easier for phones and cameras to scan."
              />

              <Faq
                question="Is the QR Code Generator free?"
                answer="Yes. The ToolNoveHub QR Code Generator is free to use online and does not require an account."
              />
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
      <summary className="cursor-pointer font-semibold text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
        {question}
      </summary>

      <p className="mt-3 text-sm leading-7 text-gray-600">
        {answer}
      </p>
    </details>
  );
}