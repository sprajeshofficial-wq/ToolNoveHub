"use client";

import { useState } from "react";

const ones = [
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

const tens = [
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

const scales = [
  "",
  "Thousand",
  "Million",
  "Billion",
  "Trillion",
  "Quadrillion",
];

function convertHundreds(num: number): string {
  const words: string[] = [];

  if (num >= 100) {
    words.push(ones[Math.floor(num / 100)], "Hundred");
    num %= 100;
  }

  if (num >= 20) {
    words.push(tens[Math.floor(num / 10)]);
    num %= 10;
  }

  if (num > 0) {
    words.push(ones[num]);
  }

  return words.join(" ");
}

function numberToWords(num: number): string {
  if (!Number.isFinite(num)) {
    return "";
  }

  if (num === 0) {
    return "Zero";
  }

  if (num < 0) {
    return `Negative ${numberToWords(Math.abs(num))}`;
  }

  const integerPart = Math.floor(num);

  if (integerPart > 999999999999999) {
    return "Number is too large.";
  }

  let remaining = integerPart;
  let scaleIndex = 0;
  const groups: string[] = [];

  while (remaining > 0) {
    const group = remaining % 1000;

    if (group !== 0) {
      const groupWords = convertHundreds(group);

      if (scaleIndex > 0) {
        groups.unshift(`${groupWords} ${scales[scaleIndex]}`);
      } else {
        groups.unshift(groupWords);
      }
    }

    remaining = Math.floor(remaining / 1000);
    scaleIndex++;
  }

  return groups.join(" ");
}

function decimalToWords(decimalPart: string): string {
  const digits = decimalPart.replace(/\D/g, "");

  if (!digits) {
    return "";
  }

  const digitWords = digits
    .split("")
    .map((digit) => ones[Number(digit)])
    .join(" ");

  return digitWords;
}

function convertNumber(input: string): string {
  const cleaned = input.replace(/,/g, "").trim();

  if (!cleaned) {
    return "";
  }

  if (!/^-?\d*\.?\d+$/.test(cleaned)) {
    return "";
  }

  const [integerPart, decimalPart] = cleaned.split(".");

  const integerNumber = Number(integerPart || "0");

  if (!Number.isSafeInteger(integerNumber)) {
    return "Number is too large.";
  }

  let result = numberToWords(integerNumber);

  if (decimalPart !== undefined && decimalPart.length > 0) {
    const decimalWords = decimalToWords(decimalPart);

    if (decimalWords) {
      result += ` Point ${decimalWords}`;
    }
  }

  return result;
}

export default function NumberToWordsPage() {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);

  const result = convertNumber(input);

  const handleInputChange = (value: string) => {
    setInput(value);
    setCopied(false);
  };

  const handleCopy = async () => {
    if (!result || result === "Number is too large.") {
      return;
    }

    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleClear = () => {
    setInput("");
    setCopied(false);
  };

  const loadExample = () => {
    setInput("1234567.89");
    setCopied(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Number to Words Converter
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-gray-600">
            Convert numbers into words instantly. Supports large
            numbers, decimals, negative numbers, and comma-separated
            values.
          </p>
        </div>

        {/* Tool */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          {/* Input */}
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
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="Example: 1234567.89"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-lg text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              aria-describedby="number-help"
            />

            <p
              id="number-help"
              className="mt-2 text-xs text-gray-500"
            >
              You can enter values such as 1000, 1,234,567, -250,
              or 123.45.
            </p>
          </div>

          {/* Result */}
          <div className="mt-6">
            <label
              htmlFor="words-output"
              className="mb-2 block text-sm font-semibold text-gray-900"
            >
              Result
            </label>

            <div className="flex flex-col gap-3 sm:flex-row">
              <textarea
                id="words-output"
                value={result}
                readOnly
                rows={4}
                placeholder="Your number in words will appear here..."
                className="min-w-0 flex-1 resize-none rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 outline-none"
                aria-live="polite"
              />

              <button
                type="button"
                onClick={handleCopy}
                disabled={
                  !result || result === "Number is too large."
                }
                className="h-fit rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={loadExample}
              className="rounded-xl border border-gray-300 bg-white px-5 py-3 font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Load Example
            </button>

            <button
              type="button"
              onClick={handleClear}
              disabled={!input}
              className="rounded-xl border border-gray-300 bg-white px-5 py-3 font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Clear
            </button>
          </div>

          {/* Copy Status */}
          {copied && (
            <div
              role="status"
              className="mt-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
            >
              Result copied to your clipboard.
            </div>
          )}
        </section>

        {/* Examples */}
        <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">
            Examples
          </h2>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[500px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-3 font-semibold text-gray-900">
                    Number
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-900">
                    Words
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="px-4 py-3 text-gray-700">0</td>
                  <td className="px-4 py-3 text-gray-700">Zero</td>
                </tr>

                <tr className="border-b border-gray-100">
                  <td className="px-4 py-3 text-gray-700">125</td>
                  <td className="px-4 py-3 text-gray-700">
                    One Hundred Twenty Five
                  </td>
                </tr>

                <tr className="border-b border-gray-100">
                  <td className="px-4 py-3 text-gray-700">1,500</td>
                  <td className="px-4 py-3 text-gray-700">
                    One Thousand Five Hundred
                  </td>
                </tr>

                <tr className="border-b border-gray-100">
                  <td className="px-4 py-3 text-gray-700">
                    1,234,567
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    One Million Two Hundred Thirty Four Thousand Five
                    Hundred Sixty Seven
                  </td>
                </tr>

                <tr>
                  <td className="px-4 py-3 text-gray-700">
                    -250
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    Negative Two Hundred Fifty
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* How to Use */}
        <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">
            How to use the Number to Words Converter
          </h2>

          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-6 text-gray-600">
            <li>Enter a number in the input box.</li>
            <li>
              The converter automatically changes the number into
              words.
            </li>
            <li>Review the generated result.</li>
            <li>Click Copy to copy the result.</li>
          </ol>
        </section>

        {/* Features */}
        <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">
            Features
          </h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-gray-50 p-4">
              <h3 className="font-semibold text-gray-900">
                Large numbers
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Convert numbers from small values to very large
                values using standard English number names.
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <h3 className="font-semibold text-gray-900">
                Decimal support
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Decimal values are converted using individual digits
                after the decimal point.
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <h3 className="font-semibold text-gray-900">
                Negative numbers
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Negative values are automatically converted using
                the word “Negative.”
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <h3 className="font-semibold text-gray-900">
                Browser based
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Your number is processed directly in your browser.
              </p>
            </div>
          </div>
        </section>

        {/* Privacy */}
        <div className="mt-8 rounded-xl border border-blue-100 bg-blue-50 px-5 py-4 text-center text-sm text-blue-800">
          Your input is processed locally in your browser and is not
          uploaded to our server.
        </div>
      </div>
    </div>
  );
}