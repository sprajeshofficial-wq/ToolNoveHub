"use client";

import { useState } from "react";

type StatusMessage = {
  type: "success" | "error";
  message: string;
} | null;

export default function JSONFormatterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState<StatusMessage>(null);
  const [copyStatus, setCopyStatus] = useState("");

  const formatJSON = () => {
    setStatus(null);
    setOutput("");
    setCopyStatus("");

    if (!input.trim()) {
      setStatus({
        type: "error",
        message: "Please enter JSON to format.",
      });
      return;
    }

    try {
      const parsed: unknown = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);

      setOutput(formatted);
      setStatus({
        type: "success",
        message: "JSON formatted successfully.",
      });
    } catch {
      setStatus({
        type: "error",
        message:
          "Invalid JSON. Check your brackets, quotes, commas, and values, then try again.",
      });
    }
  };

  const minifyJSON = () => {
    setStatus(null);
    setOutput("");
    setCopyStatus("");

    if (!input.trim()) {
      setStatus({
        type: "error",
        message: "Please enter JSON to minify.",
      });
      return;
    }

    try {
      const parsed: unknown = JSON.parse(input);
      const minified = JSON.stringify(parsed);

      setOutput(minified);
      setStatus({
        type: "success",
        message: "JSON minified successfully.",
      });
    } catch {
      setStatus({
        type: "error",
        message:
          "Invalid JSON. Check your brackets, quotes, commas, and values, then try again.",
      });
    }
  };

  const copyOutput = async () => {
    if (!output) {
      return;
    }

    try {
      await navigator.clipboard.writeText(output);
      setCopyStatus("Copied!");
    } catch {
      setCopyStatus(
        "Copy is unavailable in this browser. Select the output and copy it manually."
      );
    }
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
    setStatus(null);
    setCopyStatus("");
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
    setStatus({
      type: "success",
      message: "Example JSON loaded.",
    });
    setCopyStatus("");
  };

  const handleInputChange = (value: string) => {
    setInput(value);
    setStatus(null);
    setOutput("");
    setCopyStatus("");
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
              Format, beautify, validate, and minify JSON online with a fast
              browser-based JSON formatter.
            </p>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <section
          aria-labelledby="json-input-heading"
          className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2
                id="json-input-heading"
                className="text-lg font-semibold text-gray-900"
              >
                JSON Input
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Paste or type valid JSON below.
              </p>
            </div>

            <button
              type="button"
              onClick={loadExample}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
            onChange={(event) => handleInputChange(event.target.value)}
            placeholder='{"name":"ToolNoveHub","free":true}'
            spellCheck={false}
            autoCapitalize="off"
            autoCorrect="off"
            className="mt-6 min-h-[320px] w-full resize-y rounded-xl border border-gray-300 bg-gray-950 px-4 py-4 font-mono text-sm leading-6 text-gray-100 outline-none transition placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          {status && (
            <div
              className={`mt-4 rounded-xl border px-4 py-3 text-sm ${
                status.type === "error"
                  ? "border-red-200 bg-red-50 text-red-700"
                  : "border-green-200 bg-green-50 text-green-700"
              }`}
              role={status.type === "error" ? "alert" : "status"}
              aria-live="polite"
            >
              {status.message}
            </div>
          )}

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={formatJSON}
              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Format JSON
            </button>

            <button
              type="button"
              onClick={minifyJSON}
              className="rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-800 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Minify JSON
            </button>

            <button
              type="button"
              onClick={clearAll}
              disabled={!input && !output}
              className="rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-800 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Clear
            </button>
          </div>
        </section>

        <section
          aria-labelledby="json-output-heading"
          className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2
                id="json-output-heading"
                className="text-lg font-semibold text-gray-900"
              >
                Formatted Output
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Your formatted or minified JSON appears here.
              </p>
            </div>

            <div className="flex flex-col items-start gap-2 sm:items-end">
              <button
                type="button"
                onClick={copyOutput}
                disabled={!output}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Copy Output
              </button>

              {copyStatus && (
                <span
                  className="text-xs text-gray-500"
                  role="status"
                  aria-live="polite"
                >
                  {copyStatus}
                </span>
              )}
            </div>
          </div>

          <label htmlFor="json-output" className="sr-only">
            JSON output
          </label>

          <textarea
            id="json-output"
            value={output}
            readOnly
            spellCheck={false}
            className="mt-6 min-h-[320px] w-full resize-y rounded-xl border border-gray-300 bg-gray-950 px-4 py-4 font-mono text-sm leading-6 text-green-300 outline-none placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            placeholder="Formatted JSON will appear here..."
            aria-label="JSON output"
          />
        </section>

        <section
          aria-labelledby="how-to-use-heading"
          className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8"
        >
          <h2
            id="how-to-use-heading"
            className="text-xl font-bold text-gray-900"
          >
            How to use the JSON Formatter
          </h2>

          <ol className="mt-5 space-y-3 text-sm leading-7 text-gray-600">
            <li>
              <strong className="text-gray-900">1.</strong> Paste or type your
              JSON into the input box.
            </li>

            <li>
              <strong className="text-gray-900">2.</strong> Click{" "}
              <strong className="text-gray-900">Format JSON</strong> to
              validate and organize the JSON with readable indentation.
            </li>

            <li>
              <strong className="text-gray-900">3.</strong> Click{" "}
              <strong className="text-gray-900">Minify JSON</strong> to remove
              unnecessary whitespace and produce a compact JSON string.
            </li>

            <li>
              <strong className="text-gray-900">4.</strong> Use{" "}
              <strong className="text-gray-900">Copy Output</strong> to copy
              the result to your clipboard.
            </li>
          </ol>
        </section>

        <section
          aria-labelledby="what-is-json-heading"
          className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8"
        >
          <h2
            id="what-is-json-heading"
            className="text-xl font-bold text-gray-900"
          >
            What is JSON?
          </h2>

          <p className="mt-4 text-sm leading-7 text-gray-600">
            JSON, or JavaScript Object Notation, is a lightweight text format
            used to represent structured data. JSON is commonly used for APIs,
            web applications, configuration files, data exchange, and software
            development.
          </p>

          <p className="mt-4 text-sm leading-7 text-gray-600">
            JSON uses objects, arrays, strings, numbers, booleans, and null
            values. Because the syntax is structured and strict, a missing
            comma, quotation mark, bracket, or other character can make a JSON
            document invalid.
          </p>
        </section>

        <section
          aria-labelledby="format-vs-minify-heading"
          className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8"
        >
          <h2
            id="format-vs-minify-heading"
            className="text-xl font-bold text-gray-900"
          >
            Format JSON vs. Minify JSON
          </h2>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
              <h3 className="font-semibold text-gray-900">Format JSON</h3>

              <p className="mt-2 text-sm leading-7 text-gray-600">
                Formatting adds indentation and line breaks so nested objects
                and arrays are easier to read, inspect, and troubleshoot.
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
              <h3 className="font-semibold text-gray-900">Minify JSON</h3>

              <p className="mt-2 text-sm leading-7 text-gray-600">
                Minification removes unnecessary whitespace while preserving
                the same JSON data structure. This can make JSON more compact
                for transmission or storage.
              </p>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="common-uses-heading"
          className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8"
        >
          <h2
            id="common-uses-heading"
            className="text-xl font-bold text-gray-900"
          >
            Common uses
          </h2>

          <ul className="mt-5 grid gap-3 text-sm leading-7 text-gray-600 sm:grid-cols-2">
            <li className="rounded-lg bg-gray-50 px-4 py-3">
              Debugging API responses
            </li>

            <li className="rounded-lg bg-gray-50 px-4 py-3">
              Checking JSON syntax
            </li>

            <li className="rounded-lg bg-gray-50 px-4 py-3">
              Reading configuration data
            </li>

            <li className="rounded-lg bg-gray-50 px-4 py-3">
              Preparing compact JSON for applications
            </li>

            <li className="rounded-lg bg-gray-50 px-4 py-3">
              Inspecting nested objects and arrays
            </li>

            <li className="rounded-lg bg-gray-50 px-4 py-3">
              Learning and practicing JSON syntax
            </li>
          </ul>
        </section>

        <section
          aria-labelledby="privacy-heading"
          className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8"
        >
          <h2
            id="privacy-heading"
            className="text-xl font-bold text-gray-900"
          >
            Browser-based processing
          </h2>

          <p className="mt-4 text-sm leading-7 text-gray-600">
            JSON parsing, formatting, and minification are performed directly
            in your browser using built-in JavaScript functionality. The tool
            does not require an account or a server-side JSON processing
            service.
          </p>

          <p className="mt-4 text-sm leading-7 text-gray-600">
            Because processing happens in the browser, the JSON you enter does
            not need to be uploaded to a remote JSON formatting service to
            perform these operations.
          </p>
        </section>

        <section
          aria-labelledby="faq-heading"
          className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8"
        >
          <h2
            id="faq-heading"
            className="text-xl font-bold text-gray-900"
          >
            JSON Formatter FAQ
          </h2>

          <div className="mt-5 space-y-5 text-sm leading-7 text-gray-600">
            <div>
              <h3 className="font-semibold text-gray-900">
                Does the formatter validate JSON?
              </h3>

              <p className="mt-1">
                Yes. The formatter parses the JSON before producing formatted
                or minified output. Invalid JSON produces an error message
                instead of formatted output.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                What is the difference between formatting and minifying?
              </h3>

              <p className="mt-1">
                Formatting makes JSON easier for people to read by adding
                indentation and line breaks. Minifying removes unnecessary
                whitespace to make the JSON more compact.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                Can I use this tool for API responses?
              </h3>

              <p className="mt-1">
                Yes. You can paste a JSON API response into the input area to
                validate its syntax and make nested data easier to inspect.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                Do I need to install software?
              </h3>

              <p className="mt-1">
                No. The JSON Formatter runs in a modern web browser and does
                not require additional software or an account.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}