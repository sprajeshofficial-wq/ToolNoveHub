"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, Copy, RotateCcw } from "lucide-react";

function createSlug(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

const EXAMPLE_TEXT =
  "10 Free Online Tools Every Small Business Owner Should Know";

const EXAMPLE_SLUG =
  "10-free-online-tools-every-small-business-owner-should-know";

const EXAMPLES = [
  {
    input: "How to Start a Small Business in 2026",
    output: "how-to-start-a-small-business-in-2026",
  },
  {
    input: "Best Productivity Tools for Remote Teams",
    output: "best-productivity-tools-for-remote-teams",
  },
  {
    input: "Café Menu & Pricing Guide",
    output: "cafe-menu-pricing-guide",
  },
  {
    input: "10 Free Online Tools Every Small Business Owner Should Know",
    output: EXAMPLE_SLUG,
  },
];

export default function TextToSlug() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const slug = useMemo(() => createSlug(text), [text]);

  const unsupportedCharacterCount = useMemo(() => {
    if (!text.trim()) {
      return 0;
    }

    const normalized = text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    return Array.from(normalized).filter(
      (character) =>
        !/[a-zA-Z0-9\s'’]/.test(character) &&
        !/[a-zA-Z0-9]/.test(character),
    ).length;
  }, [text]);

  useEffect(() => {
    setCopied(false);
  }, [text]);

  async function handleCopy() {
    if (!slug) {
      return;
    }

    try {
      await navigator.clipboard.writeText(slug);
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      setCopied(false);
    }
  }

  function handleClear() {
    setText("");
    setCopied(false);
  }

  function loadExample() {
    setText(EXAMPLE_TEXT);
    setCopied(false);
  }

  function loadExampleValue(input: string) {
    setText(input);
    setCopied(false);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Text to Slug Converter
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-gray-600">
            Convert titles and text into clean, readable URL slugs instantly.
          </p>
        </header>

        <section
          aria-labelledby="slug-tool-heading"
          className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <h2 id="slug-tool-heading" className="sr-only">
            Text to Slug Converter
          </h2>

          <div>
            <div className="mb-2 flex items-center justify-between gap-4">
              <label
                htmlFor="slug-input"
                className="text-sm font-semibold text-gray-900"
              >
                Enter text
              </label>

              <span
                className="text-xs text-gray-500"
                aria-label={`${text.length} characters`}
              >
                {text.length} characters
              </span>
            </div>

            <textarea
              id="slug-input"
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder="Enter a page title, article title, or other text..."
              rows={5}
              spellCheck={false}
              autoCapitalize="sentences"
              aria-describedby="slug-input-help"
              className="w-full resize-y rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <p
              id="slug-input-help"
              className="mt-2 text-xs leading-5 text-gray-500"
            >
              The slug updates automatically as you type. Accented Latin
              characters are simplified, while spaces and punctuation become
              hyphens.
            </p>
          </div>

          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between gap-4">
              <label
                htmlFor="slug-output"
                className="text-sm font-semibold text-gray-900"
              >
                Generated slug
              </label>

              <span
                className="text-xs text-gray-500"
                aria-label={`${slug.length} characters`}
              >
                {slug.length} characters
              </span>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                id="slug-output"
                type="text"
                value={slug}
                readOnly
                placeholder="your-generated-slug"
                aria-live="polite"
                aria-label="Generated URL slug"
                className="min-w-0 flex-1 rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 font-mono text-sm text-gray-900 outline-none"
              />

              <button
                type="button"
                onClick={handleCopy}
                disabled={!slug}
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                {copied ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy
                  </>
                )}
              </button>
            </div>
          </div>

          {unsupportedCharacterCount > 0 && (
            <div
              role="status"
              className="mt-5 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-800"
            >
              Some characters are not represented in the generated ASCII slug
              and may be removed or converted into separators.
            </div>
          )}

          {copied && (
            <div
              role="status"
              aria-live="polite"
              className="mt-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
            >
              Slug copied to your clipboard.
            </div>
          )}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={loadExample}
              className="inline-flex flex-1 items-center justify-center rounded-xl border border-gray-300 bg-white px-5 py-3 font-medium text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Load Example
            </button>

            <button
              type="button"
              onClick={handleClear}
              disabled={!text}
              className="inline-flex flex-1 items-center justify-center rounded-xl border border-gray-300 bg-white px-5 py-3 font-medium text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Clear
            </button>
          </div>
        </section>

        <section
          aria-labelledby="slug-example-heading"
          className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <h2
            id="slug-example-heading"
            className="text-2xl font-bold text-gray-900"
          >
            Example
          </h2>

          <div className="mt-5 space-y-5">
            <div>
              <p className="text-sm font-semibold text-gray-700">Input</p>

              <div className="mt-2 rounded-lg bg-gray-50 p-4 text-sm leading-6 text-gray-700">
                {EXAMPLE_TEXT}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-700">Output</p>

              <div className="mt-2 overflow-x-auto rounded-lg bg-gray-50 p-4 font-mono text-sm text-blue-700">
                {EXAMPLE_SLUG}
              </div>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="how-to-use-heading"
          className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <h2
            id="how-to-use-heading"
            className="text-2xl font-bold text-gray-900"
          >
            How to use the Text to Slug Converter
          </h2>

          <ol className="mt-6 space-y-4">
            <Step
              number="1"
              title="Enter your text"
              text="Type a page title, blog post title, product name, or other text into the input box."
            />
            <Step
              number="2"
              title="Review the generated slug"
              text="The converter automatically changes the text into lowercase words separated by hyphens."
            />
            <Step
              number="3"
              title="Check the URL-friendly result"
              text="Letters, numbers, spaces, and punctuation are processed to create a simple ASCII-style slug."
            />
            <Step
              number="4"
              title="Copy the slug"
              text="Click Copy to place the generated slug on your clipboard."
            />
          </ol>
        </section>

        <section
          aria-labelledby="what-is-slug-heading"
          className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <h2
            id="what-is-slug-heading"
            className="text-2xl font-bold text-gray-900"
          >
            What is a URL slug?
          </h2>

          <p className="mt-4 leading-7 text-gray-600">
            A URL slug is the readable part of a web address that identifies a
            specific page. For example, in a URL such as
            <span className="mx-1 font-mono text-sm text-gray-900">
              example.com/blog/small-business-tips
            </span>
            , the phrase
            <span className="mx-1 font-mono text-sm text-blue-700">
              small-business-tips
            </span>
            is the slug.
          </p>

          <p className="mt-4 leading-7 text-gray-600">
            Good slugs are usually short, descriptive, easy to read, and
            closely related to the page topic. They can make URLs easier for
            people to understand and share.
          </p>
        </section>

        <section
          aria-labelledby="slug-rules-heading"
          className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <h2
            id="slug-rules-heading"
            className="text-2xl font-bold text-gray-900"
          >
            How this slug converter works
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <RuleCard
              title="Lowercase text"
              text="Uppercase letters are converted to lowercase for a consistent URL format."
            />

            <RuleCard
              title="Remove accents"
              text="Common accented Latin characters are normalized. For example, Café becomes cafe."
            />

            <RuleCard
              title="Replace separators"
              text="Spaces and unsupported punctuation are converted into hyphens."
            />

            <RuleCard
              title="Remove extra hyphens"
              text="Leading, trailing, and repeated hyphens are removed to keep the slug clean."
            />
          </div>
        </section>

        <section
          aria-labelledby="slug-examples-heading"
          className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <h2
            id="slug-examples-heading"
            className="text-2xl font-bold text-gray-900"
          >
            Slug examples
          </h2>

          <div className="mt-6 space-y-3">
            {EXAMPLES.map((example) => (
              <button
                key={example.input}
                type="button"
                onClick={() => loadExampleValue(example.input)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 p-4 text-left transition hover:border-blue-200 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <span className="block text-sm font-medium text-gray-900">
                  {example.input}
                </span>

                <span className="mt-2 block break-all font-mono text-sm text-blue-700">
                  {example.output}
                </span>
              </button>
            ))}
          </div>
        </section>

        <section
          aria-labelledby="seo-heading"
          className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-6 sm:p-8"
        >
          <h2
            id="seo-heading"
            className="text-2xl font-bold text-gray-900"
          >
            Tips for creating useful URL slugs
          </h2>

          <ul className="mt-5 list-disc space-y-3 pl-5 leading-7 text-gray-700">
            <li>Keep the slug descriptive and related to the page topic.</li>
            <li>
              Use words that help visitors understand what the page is about.
            </li>
            <li>Avoid unnecessary punctuation and repeated words.</li>
            <li>
              Keep URLs reasonably concise rather than copying an entire page
              title into the slug.
            </li>
            <li>
              If you change an existing published URL, consider an appropriate
              redirect so old links continue to work.
            </li>
          </ul>
        </section>

        <section
          aria-labelledby="browser-processing-heading"
          className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <h2
            id="browser-processing-heading"
            className="text-2xl font-bold text-gray-900"
          >
            Browser-based processing
          </h2>

          <p className="mt-4 leading-7 text-gray-600">
            The slug is generated directly in your browser from the text you
            enter. No file upload or server-side conversion is required for
            this tool.
          </p>

          <p className="mt-4 leading-7 text-gray-600">
            Site-wide services such as analytics may operate separately
            according to the{" "}
            <a
              href="/privacy"
              className="font-medium text-blue-600 underline underline-offset-2 hover:text-blue-700"
            >
              Privacy Policy
            </a>
            .
          </p>
        </section>

        <section
          aria-labelledby="faq-heading"
          className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <h2 id="faq-heading" className="text-2xl font-bold text-gray-900">
            Text to Slug Converter FAQ
          </h2>

          <div className="mt-6 divide-y divide-gray-200">
            <Faq
              question="What is a slug used for?"
              answer="A slug identifies a page in a URL. It is commonly based on the page topic or title and is designed to be readable."
            />

            <Faq
              question="Does the converter automatically use lowercase?"
              answer="Yes. Uppercase letters are converted to lowercase."
            />

            <Faq
              question="Are spaces allowed in a URL slug?"
              answer="This converter replaces spaces with hyphens so the generated slug is easier to use in a URL."
            />

            <Faq
              question="What happens to accented characters?"
              answer="Common accented Latin characters are normalized. For example, Café becomes cafe."
            />

            <Faq
              question="What happens to punctuation?"
              answer="Unsupported punctuation and other non-ASCII characters are converted into separators or removed as part of the slug-cleaning process."
            />

            <Faq
              question="Can I use the generated slug for a blog post?"
              answer="Yes. You can use the result as a starting point for a blog post, article, product, category, or other web page URL."
            />

            <Faq
              question="Does the tool upload my text?"
              answer="The conversion itself happens directly in your browser and does not require a server upload."
            />
          </div>
        </section>
      </div>
    </div>
  );
}

function Step({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <li className="flex gap-4">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
        {number}
      </span>

      <div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="mt-1 leading-6 text-gray-600">{text}</p>
      </div>
    </li>
  );
}

function RuleCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <article className="rounded-xl bg-gray-50 p-5">
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
    <div className="py-5 first:pt-0 last:pb-0">
      <h3 className="font-semibold text-gray-900">{question}</h3>
      <p className="mt-2 leading-6 text-gray-600">{answer}</p>
    </div>
  );
}