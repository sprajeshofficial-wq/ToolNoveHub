"use client";

import { useMemo, useState } from "react";

function getCodePoints(text: string) {
  return Array.from(text).map((character) => {
    const codePoint = character.codePointAt(0) ?? 0;

    return {
      character,
      codePoint,
      isAscii: codePoint <= 127,
    };
  });
}

function textToAscii(text: string): string {
  return getCodePoints(text)
    .map(({ codePoint, isAscii }) =>
      isAscii ? codePoint.toString() : `[${codePoint}]`
    )
    .join(" ");
}

export default function TextToAscii() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const characters = useMemo(() => getCodePoints(text), [text]);

  const result = useMemo(() => textToAscii(text), [text]);

  const asciiCount = characters.filter(
    (item) => item.isAscii
  ).length;

  const unicodeCount = characters.filter(
    (item) => !item.isAscii
  ).length;

  async function copyResult() {
    if (!result) {
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
    setCopied(false);
  }

  function loadExample() {
    setText("Hello World!");
    setCopied(false);
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-12 text-center sm:px-6 lg:px-8 lg:py-16">
          <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
            Developer Tool
          </span>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Text to ASCII Converter
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
            Convert text characters into decimal ASCII codes instantly.
            ASCII characters are shown as standard codes, while Unicode
            characters are clearly identified.
          </p>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
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
                onChange={(event) => {
                  setText(event.target.value);
                  setCopied(false);
                }}
                placeholder="Enter text to convert..."
                rows={6}
                spellCheck={false}
                className="w-full resize-y rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                aria-describedby="ascii-input-help"
              />

              <p
                id="ascii-input-help"
                className="mt-2 text-xs text-gray-500"
              >
                Letters, numbers, punctuation, spaces, symbols, and Unicode
                characters are supported.
              </p>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
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

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <StatCard
                label="Characters"
                value={characters.length}
              />

              <StatCard
                label="ASCII characters"
                value={asciiCount}
              />

              <StatCard
                label="Unicode characters"
                value={unicodeCount}
              />
            </div>

            {unicodeCount > 0 && (
              <div
                className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4"
                role="status"
              >
                <p className="font-semibold text-amber-900">
                  Unicode characters detected
                </p>

                <p className="mt-1 text-sm leading-6 text-amber-800">
                  Standard ASCII uses codes from 0 to 127. Characters outside
                  that range are shown in square brackets using their Unicode
                  code point.
                </p>
              </div>
            )}

            <div className="mt-8">
              <div className="mb-2 flex items-center justify-between gap-4">
                <label
                  htmlFor="ascii-result"
                  className="block text-sm font-semibold text-gray-900"
                >
                  ASCII result
                </label>

                <span className="text-xs text-gray-500">
                  {characters.length.toLocaleString()} codes
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
                className="mt-4 w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                {copied ? "Copied!" : "Copy ASCII"}
              </button>

              <span
                className="sr-only"
                aria-live="polite"
              >
                {copied ? "ASCII result copied to clipboard." : ""}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-gray-200 bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-900">
            What is ASCII?
          </h2>

          <p className="mt-4 leading-7 text-gray-600">
            ASCII stands for American Standard Code for Information
            Interchange. Standard ASCII represents 128 character codes from
            0 through 127. These include English letters, numbers,
            punctuation, spaces, and control characters.
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

          <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-5">
            <h3 className="font-semibold text-gray-900">
              ASCII vs Unicode
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              ASCII is limited to codes 0 through 127. Unicode supports a
              much larger range of characters and is used for languages,
              symbols, and emoji that are not part of standard ASCII.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-900">
            How to use the Text to ASCII Converter
          </h2>

          <ol className="mt-6 space-y-4 text-gray-600">
            <li>
              <strong className="text-gray-900">
                1. Enter your text:
              </strong>{" "}
              Type or paste the text you want to convert.
            </li>

            <li>
              <strong className="text-gray-900">
                2. View the codes:
              </strong>{" "}
              The decimal character codes are generated automatically.
            </li>

            <li>
              <strong className="text-gray-900">
                3. Check Unicode characters:
              </strong>{" "}
              Characters outside standard ASCII are displayed in square
              brackets using their Unicode code point.
            </li>

            <li>
              <strong className="text-gray-900">
                4. Copy the result:
              </strong>{" "}
              Use the Copy ASCII button to copy all generated codes.
            </li>
          </ol>
        </div>
      </section>

      <section className="bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-900">
            Text to ASCII features
          </h2>

          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <Feature
              title="Instant conversion"
              text="ASCII codes update automatically as you type or paste text."
            />

            <Feature
              title="Unicode awareness"
              text="Characters outside standard ASCII are identified instead of being incorrectly labeled as ASCII."
            />

            <Feature
              title="Easy copying"
              text="Copy the complete numeric result with one click."
            />

            <Feature
              title="Browser-based"
              text="The conversion runs directly in your browser without requiring an account."
            />
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-900">
            Common uses
          </h2>

          <p className="mt-4 leading-7 text-gray-600">
            A text-to-ASCII converter can help developers, students, and
            learners inspect character codes, understand text encoding,
            troubleshoot simple character-related problems, and prepare
            numeric character values for programming exercises.
          </p>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <InfoCard
              title="Programming"
              text="Inspect character codes when working with strings and character-based programming exercises."
            />

            <InfoCard
              title="Learning"
              text="Explore how letters, numbers, spaces, and punctuation map to standard ASCII values."
            />

            <InfoCard
              title="Debugging"
              text="Check individual character values when investigating unexpected text or encoding behavior."
            />

            <InfoCard
              title="Data work"
              text="Quickly produce decimal character codes for simple text-processing tasks."
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
            Text conversion is performed directly in your browser. No account
            is required, and the conversion itself does not require uploading
            your text to a server.
          </p>
        </div>
      </section>
    </main>
  );
}

function StatCard({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-center">
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
        {label}
      </p>

      <p className="mt-1 text-2xl font-bold text-gray-900">
        {value.toLocaleString()}
      </p>
    </div>
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
      <h3 className="font-semibold text-gray-900">
        {title}
      </h3>

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
      <h3 className="font-semibold text-gray-900">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-gray-600">
        {text}
      </p>
    </div>
  );
}