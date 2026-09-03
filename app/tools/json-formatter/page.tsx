"use client";

import { useState } from "react";

export default function JSONFormatterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const formatJSON = () => {
    setError("");
    setOutput("");

    if (!input.trim()) {
      setError("Please enter JSON to format.");
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);

      setOutput(formatted);
    } catch {
      setError("Invalid JSON. Please check your JSON syntax and try again.");
    }
  };

  const minifyJSON = () => {
    setError("");
    setOutput("");

    if (!input.trim()) {
      setError("Please enter JSON to minify.");
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);

      setOutput(minified);
    } catch {
      setError("Invalid JSON. Please check your JSON syntax and try again.");
    }
  };

  const copyOutput = async () => {
    if (!output) {
      return;
    }

    try {
      await navigator.clipboard.writeText(output);
    } catch {
      // Clipboard access may be unavailable.
    }
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  const loadExample = () => {
    const example = `{
  "name": "ToolNoveHub",
  "type": "Online Tools",
  "free": true,
  "tools": [
    "QR Code Generator",
    "Word Counter",
    "Age Calculator"
  ]
}`;

    setInput(example);
    setOutput("");
    setError("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
              Developer Tool
            </p>

            <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              JSON Formatter
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-600">
              Format, beautify, and minify JSON online. Validate your JSON
              syntax instantly in your browser.
            </p>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                JSON Input
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Paste or type your JSON below.
              </p>
            </div>

            <button
              type="button"
              onClick={loadExample}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Load Example
            </button>
          </div>

          <label htmlFor="json-input" className="sr-only">
            JSON input
          </label>

          <textarea
            id="json-input"
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
              setError("");
            }}
            placeholder='{"name":"ToolNoveHub","free":true}'
            spellCheck={false}
            className="mt-6 min-h-[320px] w-full resize-y rounded-xl border border-gray-300 bg-gray-950 px-4 py-4 font-mono text-sm leading-6 text-gray-100 outline-none transition placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          {error && (
            <div
              className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              role="alert"
              aria-live="polite"
            >
              {error}
            </div>
          )}

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={formatJSON}
              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Format JSON
            </button>

            <button
              type="button"
              onClick={minifyJSON}
              className="rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-800 transition hover:bg-gray-50"
            >
              Minify JSON
            </button>

            <button
              type="button"
              onClick={clearAll}
              className="rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-800 transition hover:bg-gray-50"
            >
              Clear
            </button>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Formatted Output
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Your formatted or minified JSON appears here.
              </p>
            </div>

            <button
              type="button"
              onClick={copyOutput}
              disabled={!output}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Copy Output
            </button>
          </div>

          <label htmlFor="json-output" className="sr-only">
            JSON output
          </label>

          <textarea
            id="json-output"
            value={output}
            readOnly
            spellCheck={false}
            placeholder="Formatted JSON will appear here..."
            className="mt-6 min-h-[320px] w-full resize-y rounded-xl border border-gray-300 bg-gray-950 px-4 py-4 font-mono text-sm leading-6 text-green-300 outline-none placeholder:text-gray-500"
          />
        </section>

        <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900">
            How to use the JSON Formatter
          </h2>

          <ol className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            <li>
              <strong className="text-gray-900">1.</strong> Paste your JSON
              into the input box.
            </li>

            <li>
              <strong className="text-gray-900">2.</strong> Click
              <strong className="text-gray-900"> Format JSON</strong> to
              beautify it.
            </li>

            <li>
              <strong className="text-gray-900">3.</strong> Use
              <strong className="text-gray-900"> Minify JSON</strong> to
              remove unnecessary whitespace.
            </li>

            <li>
              <strong className="text-gray-900">4.</strong> Copy the resulting
              JSON using the Copy Output button.
            </li>
          </ol>
        </section>

        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900">
            What is JSON?
          </h2>

          <p className="mt-4 text-sm leading-7 text-gray-600">
            JSON, or JavaScript Object Notation, is a lightweight text format
            commonly used for storing and exchanging structured data. It is
            widely used in APIs, web applications, configuration files, and
            software development.
          </p>
        </section>

        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900">
            Browser-based processing
          </h2>

          <p className="mt-4 text-sm leading-7 text-gray-600">
            JSON formatting and minification are performed directly in your
            browser. The tool does not require an account or a server-side
            JSON processing service.
          </p>
        </section>
      </main>
    </div>
  );
}