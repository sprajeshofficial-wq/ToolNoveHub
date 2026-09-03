"use client";

import { useState } from "react";

function textToAscii(text: string): string {
  return Array.from(text)
    .map((character) => {
      const code = character.charCodeAt(0);

      if (code <= 127) {
        return code.toString();
      }

      return `[${code}]`;
    })
    .join(" ");
}

export default function TextToAsciiPage() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const result = textToAscii(text);

  async function copyResult() {
    if (!result) return;

    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      setCopied(false);
    }
  }

  function clearAll() {
    setText("");
    setCopied(false);
  }

  function loadExample() {
    setText("Hello World!");
    setCopied(false);
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-12 text-center sm:px-6 lg:px-8 lg:py-16">
          <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
            Developer Tool
          </span>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Text to ASCII Converter
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
            Convert text characters into their ASCII character codes quickly
            and easily.
          </p>
        </div>
      </section>

      {/* Tool */}
      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
            {/* Input */}
            <div>
              <label
                htmlFor="ascii-input"
                className="mb-2 block text-sm font-semibold text-gray-900"
              >
                Enter text
              </label>

              <textarea
                id="ascii-input"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text to convert..."
                rows={6}
                className="w-full resize-y rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Actions */}
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={loadExample}
                className="rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                Load Example
              </button>

              <button
                type="button"
                onClick={clearAll}
                className="rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                Clear
              </button>
            </div>

            {/* Result */}
            <div className="mt-8">
              <div className="mb-2 flex items-center justify-between gap-4">
                <label
                  htmlFor="ascii-result"
                  className="block text-sm font-semibold text-gray-900"
                >
                  ASCII result
                </label>

                <span className="text-xs text-gray-500">
                  {result ? result.split(" ").length : 0} codes
                </span>
              </div>

              <textarea
                id="ascii-result"
                value={result}
                readOnly
                placeholder="ASCII codes will appear here..."
                rows={8}
                className="w-full resize-y rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 font-mono text-sm text-gray-900 outline-none"
                aria-label="ASCII conversion result"
              />

              <button
                type="button"
                onClick={copyResult}
                disabled={!result}
                className="mt-4 w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                {copied ? "Copied!" : "Copy ASCII"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Explanation */}
      <section className="border-t border-gray-200 bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-900">
            What is ASCII?
          </h2>

          <p className="mt-4 leading-7 text-gray-600">
            ASCII stands for American Standard Code for Information
            Interchange. It assigns numeric codes to common characters such as
            letters, numbers, punctuation marks, and control characters.
          </p>

          <div className="mt-6 overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full min-w-[420px] text-left text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 font-semibold text-gray-900">
                    Character
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-900">
                    ASCII Code
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-gray-700">A</td>
                  <td className="px-4 py-3 font-mono text-gray-700">65</td>
                </tr>

                <tr>
                  <td className="px-4 py-3 text-gray-700">a</td>
                  <td className="px-4 py-3 font-mono text-gray-700">97</td>
                </tr>

                <tr>
                  <td className="px-4 py-3 text-gray-700">0</td>
                  <td className="px-4 py-3 font-mono text-gray-700">48</td>
                </tr>

                <tr>
                  <td className="px-4 py-3 text-gray-700">Space</td>
                  <td className="px-4 py-3 font-mono text-gray-700">32</td>
                </tr>

                <tr>
                  <td className="px-4 py-3 text-gray-700">!</td>
                  <td className="px-4 py-3 font-mono text-gray-700">33</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* How to use */}
      <section className="bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-900">
            How to use the Text to ASCII Converter
          </h2>

          <ol className="mt-6 space-y-4 text-gray-600">
            <li>
              <strong className="text-gray-900">1. Enter your text:</strong>{" "}
              Type or paste the text you want to convert.
            </li>

            <li>
              <strong className="text-gray-900">2. View the codes:</strong>{" "}
              ASCII values are generated automatically.
            </li>

            <li>
              <strong className="text-gray-900">3. Copy the result:</strong>{" "}
              Use the Copy ASCII button to copy the generated codes.
            </li>
          </ol>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-900">
            Converter features
          </h2>

          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <h3 className="font-semibold text-gray-900">
                Instant conversion
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                ASCII codes update automatically as you type.
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <h3 className="font-semibold text-gray-900">
                Easy copying
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Copy the complete ASCII output with one click.
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <h3 className="font-semibold text-gray-900">
                Browser-based
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Conversion happens directly in your browser.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy */}
      <section className="bg-gray-50 px-4 pb-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-xl border border-blue-100 bg-blue-50 p-5">
          <h2 className="font-semibold text-blue-900">
            Privacy-focused tool
          </h2>

          <p className="mt-2 text-sm leading-6 text-blue-800">
            Text entered into this converter is processed directly in your
            browser. No account is required and the tool does not need to
            upload your text to a server.
          </p>
        </div>
      </section>
    </main>
  );
}