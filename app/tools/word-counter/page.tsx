"use client";

import { useMemo, useState } from "react";

export default function WordCounterPage() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const trimmed = text.trim();

    const words = trimmed
      ? trimmed.split(/\s+/).filter(Boolean).length
      : 0;

    const characters = text.length;

    const charactersNoSpaces = text.replace(/\s/g, "").length;

    const lines = text ? text.split(/\r?\n/).length : 0;

    const sentences = trimmed
      ? trimmed.split(/[.!?]+/).filter((sentence) => sentence.trim()).length
      : 0;

    const paragraphs = trimmed
      ? trimmed.split(/\n\s*\n/).filter((paragraph) => paragraph.trim()).length
      : 0;

    const readingTime = words > 0 ? Math.ceil(words / 200) : 0;

    return {
      words,
      characters,
      charactersNoSpaces,
      lines,
      sentences,
      paragraphs,
      readingTime,
    };
  }, [text]);

  const clearText = () => {
    setText("");
  };

  const copyText = async () => {
    if (!text) {
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Clipboard access may be unavailable in some browsers.
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
              ToolNoveHub Tool
            </p>

            <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Word Counter
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-600">
              Count words, characters, sentences, paragraphs, and estimate
              reading time instantly.
            </p>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Enter your text
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Statistics update automatically as you type.
              </p>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={copyText}
                disabled={!text}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Copy
              </button>

              <button
                type="button"
                onClick={clearText}
                disabled={!text}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Clear
              </button>
            </div>
          </div>

          <label htmlFor="word-counter-text" className="sr-only">
            Text to count
          </label>

          <textarea
            id="word-counter-text"
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Start typing or paste your text here..."
            className="mt-6 min-h-[320px] w-full resize-y rounded-xl border border-gray-300 px-4 py-4 text-sm leading-7 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </section>

        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-500">Words</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              {stats.words.toLocaleString()}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-500">Characters</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              {stats.characters.toLocaleString()}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              Characters without spaces
            </p>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              {stats.charactersNoSpaces.toLocaleString()}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-500">Sentences</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              {stats.sentences.toLocaleString()}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-500">Paragraphs</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              {stats.paragraphs.toLocaleString()}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-500">Lines</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              {stats.lines.toLocaleString()}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              Reading time
            </p>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              {stats.readingTime}
              <span className="ml-1 text-base font-medium text-gray-500">
                min
              </span>
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              Average words/min
            </p>
            <p className="mt-2 text-3xl font-bold text-gray-900">200</p>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900">
            How to use the Word Counter
          </h2>

          <ol className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            <li>
              <strong className="text-gray-900">1.</strong> Type or paste your
              text into the text box.
            </li>

            <li>
              <strong className="text-gray-900">2.</strong> View the word and
              character counts automatically.
            </li>

            <li>
              <strong className="text-gray-900">3.</strong> Check sentences,
              paragraphs, lines, and estimated reading time.
            </li>

            <li>
              <strong className="text-gray-900">4.</strong> Use Copy or Clear
              when needed.
            </li>
          </ol>
        </section>

        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900">
            Who can use this tool?
          </h2>

          <p className="mt-4 text-sm leading-7 text-gray-600">
            The Word Counter is useful for students, writers, bloggers,
            content creators, marketers, developers, and anyone who needs to
            check the length of written content.
          </p>
        </section>
      </main>
    </div>
  );
}