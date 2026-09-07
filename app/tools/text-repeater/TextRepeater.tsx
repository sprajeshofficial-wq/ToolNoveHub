"use client";

import { useMemo, useState } from "react";

type SeparatorType = "newline" | "space" | "comma" | "none";

const DEFAULT_COUNT = 5;
const MAX_COUNT = 1000;
const MAX_OUTPUT_LENGTH = 500_000;

const SEPARATORS: Record<SeparatorType, string> = {
  newline: "\n",
  space: " ",
  comma: ", ",
  none: "",
};

const SEPARATOR_LABELS: Record<SeparatorType, string> = {
  newline: "New line",
  space: "Space",
  comma: "Comma",
  none: "No separator",
};

function createRepeatedText(
  text: string,
  count: number,
  separator: SeparatorType
) {
  if (!text || count < 1) {
    return "";
  }

  return Array.from({ length: count }, () => text).join(
    SEPARATORS[separator]
  );
}

export default function TextRepeater() {
  const [text, setText] = useState("");
  const [count, setCount] = useState(DEFAULT_COUNT);
  const [separator, setSeparator] =
    useState<SeparatorType>("newline");
  const [copied, setCopied] = useState(false);

  const outputTooLarge = useMemo(() => {
    if (!text || count < 1) {
      return false;
    }

    const separatorLength = SEPARATORS[separator].length;

    const estimatedLength =
      text.length * count +
      separatorLength * Math.max(0, count - 1);

    return estimatedLength > MAX_OUTPUT_LENGTH;
  }, [text, count, separator]);

  const result = useMemo(() => {
    if (outputTooLarge) {
      return "";
    }

    return createRepeatedText(text, count, separator);
  }, [text, count, separator, outputTooLarge]);

  function handleCountChange(value: string) {
    if (value === "") {
      setCount(1);
      setCopied(false);
      return;
    }

    const parsed = Number(value);

    if (!Number.isFinite(parsed)) {
      return;
    }

    const integer = Math.floor(parsed);

    setCount(
      Math.min(MAX_COUNT, Math.max(1, integer))
    );
    setCopied(false);
  }

  async function copyResult() {
    if (!result || outputTooLarge) {
      return;
    }

    try {
      await navigator.clipboard.writeText(result);

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      setCopied(false);
    }
  }

  function clearAll() {
    setText("");
    setCount(DEFAULT_COUNT);
    setSeparator("newline");
    setCopied(false);
  }

  function loadExample() {
    setText("Hello ToolNoveHub");
    setCount(5);
    setSeparator("newline");
    setCopied(false);
  }

  return (
    <main className="min-h-screen bg-gray-50">
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

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
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
                onChange={(event) => {
                  setText(event.target.value);
                  setCopied(false);
                }}
                placeholder="Enter the text you want to repeat..."
                rows={5}
                spellCheck={false}
                className="w-full resize-y rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                aria-describedby="text-help"
              />

              <p
                id="text-help"
                className="mt-2 text-xs text-gray-500"
              >
                You can enter a word, sentence, phrase, or multiple lines.
              </p>
            </div>

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
                  max={MAX_COUNT}
                  step={1}
                  value={count}
                  onChange={(event) =>
                    handleCountChange(event.target.value)
                  }
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  aria-describedby="count-help"
                />

                <p
                  id="count-help"
                  className="mt-2 text-xs text-gray-500"
                >
                  Choose between 1 and {MAX_COUNT.toLocaleString()} repetitions.
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
                  onChange={(event) => {
                    setSeparator(
                      event.target.value as SeparatorType
                    );
                    setCopied(false);
                  }}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="newline">New line</option>
                  <option value="space">Space</option>
                  <option value="comma">Comma</option>
                  <option value="none">No separator</option>
                </select>
              </div>
            </div>

            {outputTooLarge && (
              <div
                className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4"
                role="alert"
              >
                <p className="font-semibold text-amber-900">
                  Output is too large
                </p>

                <p className="mt-1 text-sm leading-6 text-amber-800">
                  Reduce the number of repetitions or shorten the text.
                  The maximum generated output is{" "}
                  {MAX_OUTPUT_LENGTH.toLocaleString()} characters.
                </p>
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={loadExample}
                className="rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Load Example
              </button>

              <button
                type="button"
                onClick={clearAll}
                className="rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Clear
              </button>
            </div>

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
                placeholder={
                  outputTooLarge
                    ? "Reduce the output size to generate the result..."
                    : "Your repeated text will appear here..."
                }
                rows={10}
                className="w-full resize-y rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 outline-none"
                aria-label="Repeated text result"
              />

              <button
                type="button"
                onClick={copyResult}
                disabled={!result || outputTooLarge}
                className="mt-4 w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                {copied ? "Copied!" : "Copy Result"}
              </button>

              <span
                className="sr-only"
                aria-live="polite"
              >
                {copied ? "Result copied to clipboard." : ""}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-gray-200 bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-900">
            How to use the Text Repeater
          </h2>

          <ol className="mt-6 space-y-4 text-gray-600">
            <li>
              <strong className="text-gray-900">
                1. Enter your text:
              </strong>{" "}
              Type or paste the word, phrase, sentence, or text you want
              to repeat.
            </li>

            <li>
              <strong className="text-gray-900">
                2. Choose repetitions:
              </strong>{" "}
              Enter the number of times you want the text repeated.
            </li>

            <li>
              <strong className="text-gray-900">
                3. Select a separator:
              </strong>{" "}
              Choose new lines, spaces, commas, or no separator.
            </li>

            <li>
              <strong className="text-gray-900">
                4. Copy the result:
              </strong>{" "}
              Copy the generated text with one click.
            </li>
          </ol>
        </div>
      </section>

      <section className="bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-900">
            Text Repeater features
          </h2>

          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <Feature
              title="Instant results"
              text="The repeated text updates automatically as you change the input or repetition count."
            />

            <Feature
              title="Flexible separators"
              text="Separate repeated text with new lines, spaces, commas, or no separator."
            />

            <Feature
              title="Large output support"
              text="Generate up to 500,000 characters while keeping output size controlled."
            />

            <Feature
              title="Easy copying"
              text="Copy the generated result directly to your clipboard."
            />
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-900">
            Common uses for a Text Repeater
          </h2>

          <p className="mt-4 leading-7 text-gray-600">
            A text repeater can be useful for testing text fields, creating
            repeated labels, preparing sample content, generating repeated
            lines for documents, testing character limits, and quickly
            duplicating short pieces of text.
          </p>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <InfoCard
              title="Testing"
              text="Create repeated sample text when testing forms, text areas, layouts, or character limits."
            />

            <InfoCard
              title="Documents"
              text="Generate repeated words, phrases, or lines when preparing simple document content."
            />

            <InfoCard
              title="Data preparation"
              text="Create repeated values with spaces, commas, or line breaks for simple data-entry tasks."
            />

            <InfoCard
              title="Development"
              text="Quickly generate repeated text when checking UI layouts or testing text-handling behavior."
            />
          </div>
        </div>
      </section>

      <section className="bg-white px-4 pb-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-xl border border-blue-100 bg-blue-50 p-5">
          <h2 className="font-semibold text-blue-900">
            Privacy-focused tool
          </h2>

          <p className="mt-2 text-sm leading-6 text-blue-800">
            Text repetition is performed directly in your browser. The tool
            does not require an account or uploading your text to a server
            for the repetition operation.
          </p>
        </div>
      </section>
    </main>
  );
}

function Feature({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <h3 className="font-semibold text-gray-900">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-gray-600">
        {text}
      </p>
    </div>
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
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <h3 className="font-semibold text-gray-900">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-gray-600">
        {text}
      </p>
    </div>
  );
}