"use client";

import { useState } from "react";

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

export default function TextToSlugPage() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const slug = createSlug(text);

  const handleCopy = async () => {
    if (!slug) return;

    try {
      await navigator.clipboard.writeText(slug);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleClear = () => {
    setText("");
    setCopied(false);
  };

  const loadExample = () => {
    setText(
      "10 Free Online Tools Every Small Business Owner Should Know"
    );
    setCopied(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Text to Slug Converter
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-gray-600">
            Convert titles and text into clean, SEO-friendly URL slugs
            instantly.
          </p>
        </div>

        {/* Main tool */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          {/* Input */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="slug-input"
                className="text-sm font-semibold text-gray-900"
              >
                Enter text
              </label>

              <span className="text-xs text-gray-500">
                {text.length} characters
              </span>
            </div>

            <textarea
              id="slug-input"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                setCopied(false);
              }}
              placeholder="Enter a title or text..."
              rows={5}
              className="w-full resize-y rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Output */}
          <div className="mt-6">
            <label
              htmlFor="slug-output"
              className="mb-2 block text-sm font-semibold text-gray-900"
            >
              Generated slug
            </label>

            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                id="slug-output"
                type="text"
                value={slug}
                readOnly
                placeholder="your-generated-slug"
                className="min-w-0 flex-1 rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 outline-none"
              />

              <button
                type="button"
                onClick={handleCopy}
                disabled={!slug}
                className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={loadExample}
              className="rounded-xl border border-gray-300 bg-white px-5 py-3 font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Load Example
            </button>

            <button
              type="button"
              onClick={handleClear}
              disabled={!text}
              className="rounded-xl border border-gray-300 bg-white px-5 py-3 font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Clear
            </button>
          </div>

          {/* Status */}
          {copied && (
            <div
              role="status"
              className="mt-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
            >
              Slug copied to your clipboard.
            </div>
          )}
        </section>

        {/* Example */}
        <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">
            Example
          </h2>

          <div className="mt-4 space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-700">
                Input
              </p>

              <div className="mt-2 rounded-lg bg-gray-50 p-4 text-sm text-gray-700">
                10 Free Online Tools Every Small Business Owner Should
                Know
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700">
                Output
              </p>

              <div className="mt-2 overflow-x-auto rounded-lg bg-gray-50 p-4 font-mono text-sm text-blue-700">
                10-free-online-tools-every-small-business-owner-should-know
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">
            How to use the Text to Slug Converter
          </h2>

          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-6 text-gray-600">
            <li>Enter your title or text in the input box.</li>
            <li>
              The converter automatically creates a clean URL slug.
            </li>
            <li>Review the generated slug.</li>
            <li>Click Copy to copy the slug to your clipboard.</li>
          </ol>
        </section>

        {/* Features */}
        <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">
            Why use a URL slug?
          </h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-gray-50 p-4">
              <h3 className="font-semibold text-gray-900">
                SEO friendly
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Clean and readable URLs are easier for users and
                search engines to understand.
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <h3 className="font-semibold text-gray-900">
                Easy to read
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Spaces and unnecessary characters are converted into
                simple hyphen-separated words.
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <h3 className="font-semibold text-gray-900">
                Fast conversion
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Your slug is generated instantly as you type.
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <h3 className="font-semibold text-gray-900">
                Browser based
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Text is processed directly in your browser without
                requiring a server upload.
              </p>
            </div>
          </div>
        </section>

        {/* Privacy note */}
        <div className="mt-8 rounded-xl border border-blue-100 bg-blue-50 px-5 py-4 text-center text-sm text-blue-800">
          Your text is processed locally in your browser and is not
          uploaded to our server.
        </div>
      </div>
    </div>
  );
}