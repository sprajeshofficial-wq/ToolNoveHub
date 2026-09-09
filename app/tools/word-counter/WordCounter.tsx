"use client";

import { useMemo, useState } from "react";

type Stats = {
  words: number;
  characters: number;
  charactersNoSpaces: number;
  sentences: number;
  paragraphs: number;
  lines: number;
  readingTime: number;
};

function countWords(text: string): number {
  const trimmed = text.trim();

  if (!trimmed) {
    return 0;
  }

  return trimmed.split(/\s+/u).filter(Boolean).length;
}

function countSentences(text: string): number {
  const trimmed = text.trim();

  if (!trimmed) {
    return 0;
  }

  const matches = trimmed.match(
    /[^.!?]+(?:[.!?]+(?=\s|$)|$)/gu,
  );

  return matches
    ? matches.map((sentence) => sentence.trim()).filter(Boolean).length
    : 0;
}

function countParagraphs(text: string): number {
  const trimmed = text.trim();

  if (!trimmed) {
    return 0;
  }

  return trimmed
    .split(/\n\s*\n/u)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean).length;
}

function countLines(text: string): number {
  if (!text) {
    return 0;
  }

  return text.split(/\r?\n/u).length;
}

export default function WordCounter() {
  const [text, setText] = useState("");
  const [copyStatus, setCopyStatus] = useState("");

  const stats = useMemo<Stats>(() => {
    const words = countWords(text);

    return {
      words,
      characters: Array.from(text).length,
      charactersNoSpaces: Array.from(
        text.replace(/\s/gu, ""),
      ).length,
      sentences: countSentences(text),
      paragraphs: countParagraphs(text),
      lines: countLines(text),
      readingTime: words > 0 ? Math.ceil(words / 200) : 0,
    };
  }, [text]);

  const clearText = () => {
    setText("");
    setCopyStatus("");
  };

  const copyText = async () => {
    if (!text) {
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus("Text copied.");
    } catch {
      setCopyStatus(
        "Unable to copy automatically. Please select and copy the text manually.",
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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
              Count words, characters, sentences, paragraphs, and lines
              while estimating how long your text may take to read.
            </p>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Editor */}
        <section
          aria-labelledby="word-counter-editor"
          className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2
                id="word-counter-editor"
                className="text-lg font-semibold text-gray-900"
              >
                Enter your text
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Statistics update automatically as you type or paste text.
              </p>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={copyText}
                disabled={!text}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Copy
              </button>

              <button
                type="button"
                onClick={clearText}
                disabled={!text}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Clear
              </button>
            </div>
          </div>

          <label
            htmlFor="word-counter-text"
            className="sr-only"
          >
            Text to count
          </label>

          <textarea
            id="word-counter-text"
            value={text}
            onChange={(event) => {
              setText(event.target.value);
              setCopyStatus("");
            }}
            placeholder="Start typing or paste your text here..."
            spellCheck
            className="mt-6 min-h-[320px] w-full resize-y rounded-xl border border-gray-300 px-4 py-4 text-sm leading-7 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          <div
            className="mt-3 min-h-5 text-sm text-gray-500"
            aria-live="polite"
          >
            {copyStatus}
          </div>
        </section>

        {/* Statistics */}
        <section
          aria-labelledby="word-counter-statistics"
          className="mt-8"
        >
          <h2
            id="word-counter-statistics"
            className="sr-only"
          >
            Text statistics
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Words */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-gray-500">
                Words
              </p>

              <p className="mt-2 text-3xl font-bold text-gray-900">
                {stats.words.toLocaleString()}
              </p>
            </div>

            {/* Characters */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-gray-500">
                Characters
              </p>

              <p className="mt-2 text-3xl font-bold text-gray-900">
                {stats.characters.toLocaleString()}
              </p>
            </div>

            {/* Characters without spaces */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-gray-500">
                Characters without spaces
              </p>

              <p className="mt-2 text-3xl font-bold text-gray-900">
                {stats.charactersNoSpaces.toLocaleString()}
              </p>
            </div>

            {/* Sentences */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-gray-500">
                Sentences
              </p>

              <p className="mt-2 text-3xl font-bold text-gray-900">
                {stats.sentences.toLocaleString()}
              </p>
            </div>

            {/* Paragraphs */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-gray-500">
                Paragraphs
              </p>

              <p className="mt-2 text-3xl font-bold text-gray-900">
                {stats.paragraphs.toLocaleString()}
              </p>
            </div>

            {/* Lines */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-gray-500">
                Lines
              </p>

              <p className="mt-2 text-3xl font-bold text-gray-900">
                {stats.lines.toLocaleString()}
              </p>
            </div>

            {/* Reading time */}
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

            {/* Reading speed */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-gray-500">
                Reading speed
              </p>

              <p className="mt-2 text-3xl font-bold text-gray-900">
                200
              </p>

              <p className="mt-1 text-xs text-gray-500">
                words per minute
              </p>
            </div>
          </div>
        </section>

        {/* How to use */}
        <section className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900">
            How to use the Word Counter
          </h2>

          <ol className="mt-5 space-y-4 text-sm leading-6 text-gray-600">
            <li>
              <strong className="text-gray-900">
                1. Enter your text.
              </strong>{" "}
              Type directly into the editor or paste existing content.
            </li>

            <li>
              <strong className="text-gray-900">
                2. Review the statistics.
              </strong>{" "}
              The tool automatically calculates words, characters,
              sentences, paragraphs, and lines.
            </li>

            <li>
              <strong className="text-gray-900">
                3. Check reading time.
              </strong>{" "}
              The estimated reading time uses an approximate reading
              speed of 200 words per minute.
            </li>

            <li>
              <strong className="text-gray-900">
                4. Copy or clear the text.
              </strong>{" "}
              Use Copy to place the text on your clipboard or Clear to
              start again.
            </li>
          </ol>
        </section>

        {/* What it measures */}
        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900">
            What the Word Counter measures
          </h2>

          <div className="mt-5 grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="font-semibold text-gray-900">
                Word count
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Words are counted by separating non-empty groups of
                text around whitespace characters such as spaces, tabs,
                and line breaks.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                Character count
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                The character count includes letters, numbers,
                punctuation, spaces, and other characters in the text.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                Characters without spaces
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                This count removes whitespace characters before
                calculating the number of remaining characters.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                Sentences
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Sentence counting looks for common sentence-ending
                punctuation such as periods, question marks, and
                exclamation marks.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                Paragraphs
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Paragraphs are identified from blocks of text separated
                by blank lines.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                Lines
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Lines are counted according to the line breaks present
                in the text editor.
              </p>
            </div>
          </div>
        </section>

        {/* Use cases */}
        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900">
            Who can use a Word Counter?
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              Students can use a word counter to check essays,
              assignments, reports, and other written work against
              word-count requirements.
            </p>

            <p>
              Writers and bloggers can use it to estimate article
              length, monitor drafts, and check how much text they have
              written.
            </p>

            <p>
              Content creators and marketers can use word and character
              counts when preparing website copy, descriptions,
              newsletters, and other digital content.
            </p>

            <p>
              The tool can also be useful for anyone who wants a quick
              overview of the structure and length of a piece of text.
            </p>
          </div>
        </section>

        {/* Privacy */}
        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900">
            Privacy and browser-based processing
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              The Word Counter performs its calculations in your browser
              as you type or paste text into the tool.
            </p>

            <p>
              The tool does not require an account. For information
              about how ToolNoveHub handles data across the website,
              review the ToolNoveHub Privacy Policy.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900">
            Word Counter FAQ
          </h2>

          <div className="mt-5 space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900">
                Is the Word Counter free?
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Yes. You can use the ToolNoveHub Word Counter without
                creating an account.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                Does the Word Counter update automatically?
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Yes. The statistics are recalculated automatically
                whenever the text in the editor changes.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                How is reading time calculated?
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                The estimated reading time is based on approximately
                200 words per minute. Actual reading speed varies by
                person and by the complexity of the text.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                Can I count text in different languages?
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                The tool can process Unicode text, but word and
                sentence counting rules can vary between languages.
                The displayed counts are based on the browser-side
                counting rules used by this tool.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}