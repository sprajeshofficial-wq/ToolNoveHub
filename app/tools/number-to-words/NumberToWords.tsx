"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, Copy, RotateCcw } from "lucide-react";

const ONES = [
  "",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
  "Eleven",
  "Twelve",
  "Thirteen",
  "Fourteen",
  "Fifteen",
  "Sixteen",
  "Seventeen",
  "Eighteen",
  "Nineteen",
];

const TENS = [
  "",
  "",
  "Twenty",
  "Thirty",
  "Forty",
  "Fifty",
  "Sixty",
  "Seventy",
  "Eighty",
  "Ninety",
];

const SCALES = [
  "",
  "Thousand",
  "Million",
  "Billion",
  "Trillion",
  "Quadrillion",
];

const MAX_INTEGER = 999999999999999;

const EXAMPLES = [
  {
    number: "0",
    words: "Zero",
  },
  {
    number: "125",
    words: "One Hundred Twenty Five",
  },
  {
    number: "1,500",
    words: "One Thousand Five Hundred",
  },
  {
    number: "1,234,567",
    words:
      "One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven",
  },
  {
    number: "-250",
    words: "Negative Two Hundred Fifty",
  },
  {
    number: "123.45",
    words: "One Hundred Twenty Three Point Four Five",
  },
];

function convertHundreds(value: number): string {
  const words: string[] = [];
  let number = value;

  if (number >= 100) {
    words.push(ONES[Math.floor(number / 100)], "Hundred");
    number %= 100;
  }

  if (number >= 20) {
    words.push(TENS[Math.floor(number / 10)]);
    number %= 10;
  }

  if (number > 0) {
    words.push(ONES[number]);
  }

  return words.join(" ");
}

function integerToWords(value: number): string {
  if (!Number.isSafeInteger(value)) {
    return "Number is too large.";
  }

  if (value === 0) {
    return "Zero";
  }

  if (value < 0) {
    return `Negative ${integerToWords(Math.abs(value))}`;
  }

  if (value > MAX_INTEGER) {
    return "Number is too large.";
  }

  let remaining = value;
  let scaleIndex = 0;
  const groups: string[] = [];

  while (remaining > 0) {
    const group = remaining % 1000;

    if (group !== 0) {
      const groupWords = convertHundreds(group);

      if (scaleIndex > 0) {
        groups.unshift(`${groupWords} ${SCALES[scaleIndex]}`);
      } else {
        groups.unshift(groupWords);
      }
    }

    remaining = Math.floor(remaining / 1000);
    scaleIndex += 1;
  }

  return groups.join(" ");
}

function decimalToWords(decimalPart: string): string {
  return decimalPart
    .split("")
    .map((digit) => ONES[Number(digit)])
    .join(" ");
}

function convertNumber(input: string): {
  result: string;
  error: string;
} {
  const cleaned = input.replace(/,/g, "").trim();

  if (!cleaned) {
    return {
      result: "",
      error: "",
    };
  }

  if (!/^-?(?:\d+\.?\d*|\.\d+)$/.test(cleaned)) {
    return {
      result: "",
      error: "Enter a valid number, such as 125, -250, or 123.45.",
    };
  }

  const negative = cleaned.startsWith("-");
  const unsigned = negative ? cleaned.slice(1) : cleaned;

  const [integerPart = "0", decimalPart] = unsigned.split(".");

  const integerNumber = Number(integerPart || "0");

  if (
    !Number.isSafeInteger(integerNumber) ||
    integerNumber > MAX_INTEGER
  ) {
    return {
      result: "",
      error:
        "Number is too large. Please enter an integer up to 999,999,999,999,999.",
    };
  }

  let result = integerToWords(integerNumber);

  if (negative && integerNumber !== 0) {
    result = `Negative ${result}`;
  }

  if (decimalPart !== undefined && decimalPart.length > 0) {
    result += ` Point ${decimalToWords(decimalPart)}`;
  }

  return {
    result,
    error: "",
  };
}

export default function NumberToWords() {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);

  const conversion = useMemo(() => convertNumber(input), [input]);

  useEffect(() => {
    setCopied(false);
  }, [input]);

  async function handleCopy() {
    if (!conversion.result || conversion.error) {
      return;
    }

    try {
      await navigator.clipboard.writeText(conversion.result);
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      setCopied(false);
    }
  }

  function handleClear() {
    setInput("");
    setCopied(false);
  }

  function loadExample() {
    setInput("1234567.89");
    setCopied(false);
  }

  function loadExampleValue(value: string) {
    setInput(value);
    setCopied(false);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Number to Words Converter
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-gray-600">
            Convert numbers into English words with support for decimals,
            negative numbers, commas, and large values.
          </p>
        </header>

        <section
          aria-labelledby="converter-heading"
          className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <h2 id="converter-heading" className="sr-only">
            Number to Words Converter
          </h2>

          <div>
            <label
              htmlFor="number-input"
              className="mb-2 block text-sm font-semibold text-gray-900"
            >
              Enter a number
            </label>

            <input
              id="number-input"
              type="text"
              inputMode="decimal"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Example: 1234567.89"
              aria-describedby="number-help number-error"
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-lg text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <p id="number-help" className="mt-2 text-xs leading-5 text-gray-500">
              Examples: 1000, 1,234,567, -250, 123.45, or .75.
            </p>
          </div>

          {conversion.error && (
            <div
              id="number-error"
              role="alert"
              className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700"
            >
              {conversion.error}
            </div>
          )}

          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between gap-4">
              <label
                htmlFor="words-output"
                className="text-sm font-semibold text-gray-900"
              >
                Number in words
              </label>

              {conversion.result && (
                <span className="text-xs text-gray-500">
                  {conversion.result.length} characters
                </span>
              )}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <textarea
                id="words-output"
                value={conversion.result}
                readOnly
                rows={5}
                placeholder="Your number in words will appear here..."
                aria-live="polite"
                className="min-w-0 flex-1 resize-none rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 outline-none"
              />

              <button
                type="button"
                onClick={handleCopy}
                disabled={!conversion.result || Boolean(conversion.error)}
                className="inline-flex h-fit items-center justify-center rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                {copied ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy
                  </>
                )}
              </button>
            </div>
          </div>

          {copied && (
            <div
              role="status"
              aria-live="polite"
              className="mt-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
            >
              Result copied to your clipboard.
            </div>
          )}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={loadExample}
              className="inline-flex flex-1 items-center justify-center rounded-xl border border-gray-300 bg-white px-5 py-3 font-medium text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Load Example
            </button>

            <button
              type="button"
              onClick={handleClear}
              disabled={!input}
              className="inline-flex flex-1 items-center justify-center rounded-xl border border-gray-300 bg-white px-5 py-3 font-medium text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Clear
            </button>
          </div>
        </section>

        <section
          aria-labelledby="examples-heading"
          className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <h2
            id="examples-heading"
            className="text-2xl font-bold text-gray-900"
          >
            Number to words examples
          </h2>

          <p className="mt-2 text-gray-600">
            Select an example to load it into the converter.
          </p>

          <div className="mt-6 overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full min-w-[600px] border-collapse text-left text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th
                    scope="col"
                    className="px-4 py-3 font-semibold text-gray-900"
                  >
                    Number
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 font-semibold text-gray-900"
                  >
                    Words
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {EXAMPLES.map((example) => (
                  <tr key={example.number}>
                    <td className="px-4 py-4 align-top">
                      <button
                        type="button"
                        onClick={() => loadExampleValue(example.number)}
                        className="font-mono text-blue-700 underline underline-offset-2 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        {example.number}
                      </button>
                    </td>

                    <td className="px-4 py-4 text-gray-700">
                      {example.words}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section
          aria-labelledby="how-to-use-heading"
          className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <h2
            id="how-to-use-heading"
            className="text-2xl font-bold text-gray-900"
          >
            How to use the Number to Words Converter
          </h2>

          <ol className="mt-6 space-y-4">
            <Step
              number="1"
              title="Enter a number"
              text="Type a whole number, decimal, negative number, or comma-separated value into the input field."
            />

            <Step
              number="2"
              title="Review the result"
              text="The converter automatically changes the numerical value into English words."
            />

            <Step
              number="3"
              title="Check decimals if included"
              text="Digits after a decimal point are read individually after the word Point."
            />

            <Step
              number="4"
              title="Copy the result"
              text="Click Copy to place the generated words on your clipboard."
            />
          </ol>
        </section>

        <section
          aria-labelledby="how-it-works-heading"
          className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <h2
            id="how-it-works-heading"
            className="text-2xl font-bold text-gray-900"
          >
            How number-to-words conversion works
          </h2>

          <p className="mt-4 leading-7 text-gray-600">
            Large numbers are separated into groups of three digits. Each group
            is converted into words and assigned a scale such as Thousand,
            Million, Billion, Trillion, or Quadrillion.
          </p>

          <p className="mt-4 leading-7 text-gray-600">
            For example, 1,234,567 is divided into the groups 1, 234, and 567.
            These groups become One Million, Two Hundred Thirty Four Thousand,
            and Five Hundred Sixty Seven.
          </p>

          <p className="mt-4 leading-7 text-gray-600">
            Decimal digits are handled separately. For example, 12.34 becomes
            Twelve Point Three Four.
          </p>
        </section>

        <section
          aria-labelledby="features-heading"
          className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <h2
            id="features-heading"
            className="text-2xl font-bold text-gray-900"
          >
            Number to Words Converter features
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <FeatureCard
              title="Large number support"
              text="Convert values using standard English scale names up to the supported Quadrillion range."
            />

            <FeatureCard
              title="Decimal support"
              text="Convert digits after the decimal point individually using the word Point."
            />

            <FeatureCard
              title="Negative numbers"
              text="Negative values are represented by adding Negative before the number in words."
            />

            <FeatureCard
              title="Comma support"
              text="Values such as 1,234,567 can be entered with comma separators."
            />
          </div>
        </section>

        <section
          aria-labelledby="uses-heading"
          className="mt-8 grid gap-6 md:grid-cols-2"
        >
          <FeatureCard
            title="Documents and forms"
            text="Convert numerical amounts into words when preparing documents, forms, or written records."
          />

          <FeatureCard
            title="Education"
            text="Use the converter to check how numbers are written in English words."
          />

          <FeatureCard
            title="Business work"
            text="Convert figures into written form when drafting reports, notes, or other business documents."
          />

          <FeatureCard
            title="Quick checks"
            text="Instantly verify the written form of a number without performing the conversion manually."
          />
        </section>

        <section
          aria-labelledby="browser-processing-heading"
          className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <h2
            id="browser-processing-heading"
            className="text-2xl font-bold text-gray-900"
          >
            Browser-based processing
          </h2>

          <p className="mt-4 leading-7 text-gray-600">
            The conversion is performed directly in your browser using the
            number you enter. No file upload is required for this tool.
          </p>

          <p className="mt-4 leading-7 text-gray-600">
            Site-wide services such as analytics may operate separately
            according to the{" "}
            <a
              href="/privacy"
              className="font-medium text-blue-600 underline underline-offset-2 hover:text-blue-700"
            >
              Privacy Policy
            </a>
            .
          </p>
        </section>

        <section
          aria-labelledby="faq-heading"
          className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <h2 id="faq-heading" className="text-2xl font-bold text-gray-900">
            Number to Words Converter FAQ
          </h2>

          <div className="mt-6 divide-y divide-gray-200">
            <Faq
              question="Can I convert a negative number?"
              answer="Yes. Negative numbers are converted by placing Negative before the corresponding number in words."
            />

            <Faq
              question="Can I convert decimal numbers?"
              answer="Yes. Digits after the decimal point are read individually after the word Point."
            />

            <Faq
              question="Can I enter commas?"
              answer="Yes. Commas are ignored during conversion, so values such as 1,234,567 are supported."
            />

            <Faq
              question="What is the largest number supported?"
              answer="The converter supports whole-number values up to 999,999,999,999,999."
            />

            <Faq
              question="How is 0 converted?"
              answer="The number 0 is converted to Zero."
            />

            <Faq
              question="Does the tool upload my number?"
              answer="The conversion itself happens directly in your browser and does not require a server upload."
            />
          </div>
        </section>
      </div>
    </div>
  );
}

function Step({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <li className="flex gap-4">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
        {number}
      </span>

      <div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="mt-1 leading-6 text-gray-600">{text}</p>
      </div>
    </li>
  );
}

function FeatureCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-bold text-gray-900">{title}</h3>

      <p className="mt-3 text-sm leading-6 text-gray-600">{text}</p>
    </article>
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
    <div className="py-5 first:pt-0 last:pb-0">
      <h3 className="font-semibold text-gray-900">{question}</h3>

      <p className="mt-2 leading-6 text-gray-600">{answer}</p>
    </div>
  );
}