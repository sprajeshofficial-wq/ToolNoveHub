"use client";

import { useMemo, useState } from "react";

export default function TextRepeaterPage() {
  const [text, setText] = useState("");
  const [count, setCount] = useState(5);
  const [separator, setSeparator] = useState("newline");
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    const cleanText = text;

    if (!cleanText || count < 1) {
      return "";
    }

    const separators: Record<string, string> = {
      newline: "\n",
      space: " ",
      comma: ", ",
      none: "",
    };

    return Array.from({ length: count }, () => cleanText).join(
      separators[separator] ?? "\n"
    );
  }, [text, count, separator]);

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
    setCount(5);
    setSeparator("newline");
    setCopied(false);
  }

  function loadExample() {
    setText("Hello ToolNoveHub");
    setCount(5);
    setSeparator("newline");
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-12 text-center sm:px-6 lg:px-8 lg:py-16">
          <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
            Text Tool
          </span>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Text Repeater
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
            Repeat text multiple times instantly with your preferred
            separator. Free, simple, and easy to use.
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
                htmlFor="text-input"
                className="mb-2 block text-sm font-semibold text-gray-900"
              >
                Text to repeat
              </label>

              <textarea
                id="text-input"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter the text you want to repeat..."
                rows={5}
                className="w-full resize-y rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Options */}
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="repeat-count"
                  className="mb-2 block text-sm font-semibold text-gray-900"
                >
                  Number of repetitions
                </label>

                <input
                  id="repeat-count"
                  type="number"
                  min={1}
                  max={1000}
                  value={count}
                  onChange={(e) => {
                    const value = Number(e.target.value);

                    if (!Number.isFinite(value)) {
                      setCount(1);
                      return;
                    }

                    setCount(Math.min(1000, Math.max(1, value)));
                  }}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                <p className="mt-2 text-xs text-gray-500">
                  Maximum: 1,000 repetitions
                </p>
              </div>

              <div>
                <label
                  htmlFor="separator"
                  className="mb-2 block text-sm font-semibold text-gray-900"
                >
                  Separator
                </label>

                <select
                  id="separator"
                  value={separator}
                  onChange={(e) => setSeparator(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="newline">New line</option>
                  <option value="space">Space</option>
                  <option value="comma">Comma</option>
                  <option value="none">No separator</option>
                </select>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex flex-wrap gap-3">
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
                  htmlFor="text-result"
                  className="block text-sm font-semibold text-gray-900"
                >
                  Result
                </label>

                <span className="text-xs text-gray-500">
                  {result.length.toLocaleString()} characters
                </span>
              </div>

              <textarea
                id="text-result"
                value={result}
                readOnly
                placeholder="Your repeated text will appear here..."
                rows={10}
                className="w-full resize-y rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 outline-none"
                aria-label="Repeated text result"
              />

              <button
                type="button"
                onClick={copyResult}
                disabled={!result}
                className="mt-4 w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                {copied ? "Copied!" : "Copy Result"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How to use */}
      <section className="border-t border-gray-200 bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-900">
            How to use the Text Repeater
          </h2>

          <ol className="mt-6 space-y-4 text-gray-600">
            <li>
              <strong className="text-gray-900">1. Enter your text:</strong>{" "}
              Type or paste the text you want to repeat.
            </li>

            <li>
              <strong className="text-gray-900">
                2. Choose repetitions:
              </strong>{" "}
              Select how many times the text should be repeated.
            </li>

            <li>
              <strong className="text-gray-900">
                3. Select a separator:
              </strong>{" "}
              Choose a new line, space, comma, or no separator.
            </li>

            <li>
              <strong className="text-gray-900">4. Copy the result:</strong>{" "}
              Copy the generated text with one click.
            </li>
          </ol>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-900">
            Text Repeater features
          </h2>

          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <h3 className="font-semibold text-gray-900">
                Fast and simple
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Repeat text instantly without complicated settings.
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <h3 className="font-semibold text-gray-900">
                Flexible separators
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Use new lines, spaces, commas, or no separator.
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <h3 className="font-semibold text-gray-900">
                Browser-based
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Your text is processed directly in your browser.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy note */}
      <section className="bg-white px-4 pb-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-xl border border-blue-100 bg-blue-50 p-5">
          <h2 className="font-semibold text-blue-900">
            Privacy-focused tool
          </h2>

          <p className="mt-2 text-sm leading-6 text-blue-800">
            Text entered into this tool is processed in your browser. The
            tool does not require you to create an account or upload your text
            to a server.
          </p>
        </div>
      </section>
    </main>
  );
}