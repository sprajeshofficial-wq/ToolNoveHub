'use client';

import { useMemo, useState } from 'react';

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

  return trimmed
    .split(/[.!?]+(?:\s|$)/u)
    .map((sentence) => sentence.trim())
    .filter(Boolean).length;
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
  const [text, setText] = useState('');
  const [copyStatus, setCopyStatus] = useState('');

  const stats = useMemo<Stats>(() => {
    const words = countWords(text);

    return {
      words,
      characters: Array.from(text).length,
      charactersNoSpaces: Array.from(text.replace(/\s/gu, '')).length,
      sentences: countSentences(text),
      paragraphs: countParagraphs(text),
      lines: countLines(text),
      readingTime: words > 0 ? Math.ceil(words / 200) : 0,
    };
  }, [text]);

  const clearText = () => {
    setText('');
    setCopyStatus('');
  };

  const copyText = async () => {
    if (!text) {
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus('Text copied to your clipboard.');
    } catch {
      setCopyStatus(
        'Automatic copying was unavailable. Please select and copy the text manually.',
      );
    }
  };

  const updateText = (value: string) => {
    setText(value);
    setCopyStatus('');
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
              Count words, characters, sentences, paragraphs, and lines in
              your text. Get a simple reading-time estimate while you write,
              edit, or review content.
            </p>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Tool */}
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
                Type or paste text below. The statistics update automatically.
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
            onChange={(event) => updateText(event.target.value)}
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
            <StatCard
              label="Words"
              value={stats.words}
              description="Words detected"
            />

            <StatCard
              label="Characters"
              value={stats.characters}
              description="Including spaces"
            />

            <StatCard
              label="Characters without spaces"
              value={stats.charactersNoSpaces}
              description="Whitespace excluded"
            />

            <StatCard
              label="Sentences"
              value={stats.sentences}
              description="Based on sentence punctuation"
            />

            <StatCard
              label="Paragraphs"
              value={stats.paragraphs}
              description="Separated by blank lines"
            />

            <StatCard
              label="Lines"
              value={stats.lines}
              description="Based on line breaks"
            />

            <StatCard
              label="Reading time"
              value={stats.readingTime}
              suffix="min"
              description="Estimated at 200 words/min"
            />

            <StatCard
              label="Reading speed"
              value={200}
              suffix="WPM"
              description="Used for the estimate"
            />
          </div>
        </section>

        {/* How to use */}
        <section className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900">
            How to use the Word Counter
          </h2>

          <ol className="mt-5 space-y-4 text-sm leading-7 text-gray-600">
            <li>
              <strong className="text-gray-900">
                1. Enter your text.
              </strong>{' '}
              Type directly into the editor or paste an existing article,
              essay, report, caption, or other text.
            </li>

            <li>
              <strong className="text-gray-900">
                2. Review the statistics.
              </strong>{' '}
              Word count, character count, sentence count, paragraph count,
              and line count are updated as you edit the text.
            </li>

            <li>
              <strong className="text-gray-900">
                3. Check the reading time.
              </strong>{' '}
              The tool estimates reading time using approximately 200 words
              per minute. Actual reading speed varies from person to person.
            </li>

            <li>
              <strong className="text-gray-900">
                4. Copy or clear the text.
              </strong>{' '}
              Use Copy when you want the text on your clipboard, or Clear to
              start a new document.
            </li>
          </ol>
        </section>

        {/* What is a word counter */}
        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900">
            What is a Word Counter?
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              A word counter is a writing utility that measures the amount of
              text in a document or text field. The most common measurement is
              the number of words, but useful word counters can also report
              characters, sentences, paragraphs, and other basic statistics.
            </p>

            <p>
              Word counts are useful when a document has a length requirement
              or when you want to understand the size of a draft. Students,
              writers, editors, marketers, developers, and business users can
              all use word statistics for different types of written content.
            </p>

            <p>
              ToolNoveHub calculates the displayed statistics as you type or
              paste content into the editor, so you can monitor the length of
              your text without manually counting it.
            </p>
          </div>
        </section>

        {/* What each count means */}
        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900">
            What each Word Counter statistic means
          </h2>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <InfoCard
              title="Word count"
              text="Words are counted by separating non-empty groups of text around whitespace characters such as spaces, tabs, and line breaks."
            />

            <InfoCard
              title="Character count"
              text="The character count includes letters, numbers, punctuation, spaces, and other characters contained in the text."
            />

            <InfoCard
              title="Characters without spaces"
              text="This measurement removes whitespace characters before counting the remaining characters."
            />

            <InfoCard
              title="Sentence count"
              text="The sentence counter looks for common sentence-ending punctuation such as periods, question marks, and exclamation marks."
            />

            <InfoCard
              title="Paragraph count"
              text="Paragraphs are identified as blocks of text separated by blank lines."
            />

            <InfoCard
              title="Line count"
              text="Lines are counted according to the line breaks present in the text editor."
            />
          </div>
        </section>

        {/* Word count vs character count */}
        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900">
            Word count vs. character count
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              Word count and character count measure different aspects of
              writing. Word count tells you roughly how many separate words
              appear in the text, while character count measures the individual
              characters, including punctuation and spaces.
            </p>

            <p>
              A word-count requirement is common for essays, reports, articles,
              and other long-form writing. Character limits are more common for
              short-form content such as titles, descriptions, messages, and
              fields with strict length limits.
            </p>

            <p>
              When a platform gives you a specific limit, always check whether
              it refers to words or characters. The two measurements are not
              interchangeable.
            </p>
          </div>
        </section>

        {/* Reading time */}
        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900">
            How reading time is estimated
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              ToolNoveHub uses an approximate reading speed of 200 words per
              minute to estimate how long the text may take to read.
            </p>

            <p>
              For example, a 400-word article produces an estimated reading
              time of about 2 minutes. A 1,000-word article produces an
              estimate of about 5 minutes.
            </p>

            <p>
              Reading speed varies depending on the reader, language,
              vocabulary, formatting, and complexity of the material. The
              displayed value should therefore be treated as an estimate rather
              than an exact reading time.
            </p>
          </div>
        </section>

        {/* Use cases */}
        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900">
            Who can use a Word Counter?
          </h2>

          <div className="mt-5 space-y-5 text-sm leading-7 text-gray-600">
            <div>
              <h3 className="font-semibold text-gray-900">
                Students
              </h3>
              <p className="mt-1">
                Check essays, assignments, reports, applications, and other
                academic writing against a required word count.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                Writers and bloggers
              </h3>
              <p className="mt-1">
                Monitor article length, compare draft sizes, and estimate
                reading time while developing longer pieces of content.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                Content creators
              </h3>
              <p className="mt-1">
                Check the length of website copy, descriptions, newsletters,
                captions, and other digital content.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                Business users
              </h3>
              <p className="mt-1">
                Review the length of proposals, emails, reports, summaries, and
                other business documents.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                Editors
              </h3>
              <p className="mt-1">
                Quickly review the structure and length of a draft before
                making detailed editorial changes.
              </p>
            </div>
          </div>
        </section>

        {/* Practical tips */}
        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900">
            Tips for meeting a word-count requirement
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-7 text-gray-600">
            <li>
              • Check the assignment or platform requirements before writing.
            </li>

            <li>
              • Use the word count regularly instead of waiting until the end.
            </li>

            <li>
              • Focus on useful information rather than adding unnecessary
              words just to reach a target.
            </li>

            <li>
              • Review headings, paragraphs, and sentences for clarity after
              reaching the required length.
            </li>

            <li>
              • If a platform specifies a character limit, use the character
              count instead of the word count.
            </li>
          </ul>
        </section>

        {/* Privacy */}
        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900">
            Privacy and browser-based processing
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              The Word Counter performs its calculations in your browser as
              you type or paste text into the tool.
            </p>

            <p>
              The tool does not require an account to count text. Your text is
              used by the page to calculate the displayed statistics.
            </p>

            <p>
              For information about data handling across the wider ToolNoveHub
              website, please review the{' '}
              <a
                href="/privacy"
                className="font-semibold text-blue-600 underline underline-offset-2 hover:text-blue-700"
              >
                ToolNoveHub Privacy Policy
              </a>
              .
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900">
            Word Counter FAQ
          </h2>

          <div className="mt-6 space-y-7">
            <Faq
              question="Is the Word Counter free?"
              answer="Yes. You can use the ToolNoveHub Word Counter without creating an account."
            />

            <Faq
              question="Does the Word Counter update automatically?"
              answer="Yes. The statistics are recalculated whenever the text in the editor changes."
            />

            <Faq
              question="How is reading time calculated?"
              answer="The estimate uses approximately 200 words per minute. Actual reading speed varies depending on the reader and the complexity of the text."
            />

            <Faq
              question="What does the character count include?"
              answer="The character count includes letters, numbers, punctuation, spaces, and other characters contained in the text."
            />

            <Faq
              question="What is the difference between characters and characters without spaces?"
              answer="The normal character count includes whitespace, while the characters-without-spaces count removes whitespace before calculating the total."
            />

            <Faq
              question="Can I count text in different languages?"
              answer="The tool can process Unicode text, but word and sentence-counting rules can vary between languages. The displayed results follow the browser-side counting rules used by this tool."
            />

            <Faq
              question="Does the Word Counter save my text?"
              answer="The counter itself performs its calculations in the browser. For broader information about ToolNoveHub data handling, review the site's Privacy Policy."
            />
          </div>
        </section>
      </main>
    </div>
  );
}

function StatCard({
  label,
  value,
  suffix,
  description,
}: {
  label: string;
  value: number;
  suffix?: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-gray-500">
        {label}
      </p>

      <p
        className="mt-2 text-3xl font-bold text-gray-900"
        aria-label={`${value.toLocaleString()} ${label.toLowerCase()}`}
      >
        {value.toLocaleString()}

        {suffix ? (
          <span className="ml-1 text-base font-medium text-gray-500">
            {suffix}
          </span>
        ) : null}
      </p>

      <p className="mt-1 text-xs leading-5 text-gray-500">
        {description}
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
    <div>
      <h3 className="font-semibold text-gray-900">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-gray-600">
        {text}
      </p>
    </div>
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
    <div>
      <h3 className="font-semibold text-gray-900">
        {question}
      </h3>

      <p className="mt-2 text-sm leading-6 text-gray-600">
        {answer}
      </p>
    </div>
  );
}