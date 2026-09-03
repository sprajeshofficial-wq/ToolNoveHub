"use client";

import { useState } from "react";

type ConversionMode = "binary-to-decimal" | "decimal-to-binary";

function binaryToDecimal(value: string): string {
  const cleaned = value.replace(/\s+/g, "").trim();

  if (!cleaned) {
    return "";
  }

  if (!/^[01]+$/.test(cleaned)) {
    return "";
  }

  try {
    const result = BigInt(`0b${cleaned}`);
    return result.toString(10);
  } catch {
    return "";
  }
}

function decimalToBinary(value: string): string {
  const cleaned = value.replace(/,/g, "").trim();

  if (!cleaned) {
    return "";
  }

  if (!/^\d+$/.test(cleaned)) {
    return "";
  }

  try {
    return BigInt(cleaned).toString(2);
  } catch {
    return "";
  }
}

export default function BinaryConverterPage() {
  const [mode, setMode] =
    useState<ConversionMode>("binary-to-decimal");

  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);

  const result =
    mode === "binary-to-decimal"
      ? binaryToDecimal(input)
      : decimalToBinary(input);

  const inputLabel =
    mode === "binary-to-decimal"
      ? "Binary number"
      : "Decimal number";

  const resultLabel =
    mode === "binary-to-decimal"
      ? "Decimal result"
      : "Binary result";

  const handleInputChange = (value: string) => {
    setInput(value);
    setCopied(false);
  };

  const handleModeChange = (newMode: ConversionMode) => {
    setMode(newMode);
    setInput("");
    setCopied(false);
  };

  const handleSwap = () => {
    const newMode =
      mode === "binary-to-decimal"
        ? "decimal-to-binary"
        : "binary-to-decimal";

    setMode(newMode);
    setInput(result);
    setCopied(false);
  };

  const handleCopy = async () => {
    if (!result) {
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
    if (mode === "binary-to-decimal") {
      setInput("110101");
    } else {
      setInput("53");
    }

    setCopied(false);
  };

  const isInvalid =
    input.length > 0 && result.length === 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Binary Converter
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-gray-600">
            Convert binary numbers to decimal and decimal numbers
            to binary instantly.
          </p>
        </div>

        {/* Converter */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          {/* Conversion mode */}
          <div>
            <p className="mb-3 text-sm font-semibold text-gray-900">
              Conversion
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() =>
                  handleModeChange("binary-to-decimal")
                }
                className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                  mode === "binary-to-decimal"
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                Binary → Decimal
              </button>

              <button
                type="button"
                onClick={() =>
                  handleModeChange("decimal-to-binary")
                }
                className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                  mode === "decimal-to-binary"
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                Decimal → Binary
              </button>
            </div>
          </div>

          {/* Input */}
          <div className="mt-6">
            <label
              htmlFor="binary-input"
              className="mb-2 block text-sm font-semibold text-gray-900"
            >
              {inputLabel}
            </label>

            <input
              id="binary-input"
              type="text"
              inputMode="numeric"
              value={input}
              onChange={(e) =>
                handleInputChange(e.target.value)
              }
              placeholder={
                mode === "binary-to-decimal"
                  ? "Example: 110101"
                  : "Example: 53"
              }
              className={`w-full rounded-xl border px-4 py-3 text-lg text-gray-900 outline-none transition placeholder:text-gray-400 focus:ring-2 ${
                isInvalid
                  ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"
              }`}
            />

            {mode === "binary-to-decimal" ? (
              <p className="mt-2 text-xs text-gray-500">
                Enter only 0 and 1. Spaces between binary digits are
                also accepted.
              </p>
            ) : (
              <p className="mt-2 text-xs text-gray-500">
                Enter a non-negative whole number. Commas are
                accepted.
              </p>
            )}

            {isInvalid && (
              <p
                role="alert"
                className="mt-2 text-sm text-red-600"
              >
                Please enter a valid{" "}
                {mode === "binary-to-decimal"
                  ? "binary number using only 0 and 1."
                  : "non-negative decimal number."}
              </p>
            )}
          </div>

          {/* Result */}
          <div className="mt-6">
            <label
              htmlFor="binary-result"
              className="mb-2 block text-sm font-semibold text-gray-900"
            >
              {resultLabel}
            </label>

            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                id="binary-result"
                type="text"
                value={result}
                readOnly
                placeholder="Result will appear here..."
                className="min-w-0 flex-1 rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-lg text-gray-900 outline-none"
                aria-live="polite"
              />

              <button
                type="button"
                onClick={handleCopy}
                disabled={!result}
                className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <button
              type="button"
              onClick={loadExample}
              className="rounded-xl border border-gray-300 bg-white px-5 py-3 font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Load Example
            </button>

            <button
              type="button"
              onClick={handleSwap}
              disabled={!result}
              className="rounded-xl border border-gray-300 bg-white px-5 py-3 font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Swap Conversion
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
            Binary conversion examples
          </h2>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[420px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-3 font-semibold text-gray-900">
                    Binary
                  </th>

                  <th className="px-4 py-3 font-semibold text-gray-900">
                    Decimal
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="px-4 py-3 font-mono text-gray-700">
                    0
                  </td>

                  <td className="px-4 py-3 text-gray-700">
                    0
                  </td>
                </tr>

                <tr className="border-b border-gray-100">
                  <td className="px-4 py-3 font-mono text-gray-700">
                    1
                  </td>

                  <td className="px-4 py-3 text-gray-700">
                    1
                  </td>
                </tr>

                <tr className="border-b border-gray-100">
                  <td className="px-4 py-3 font-mono text-gray-700">
                    1010
                  </td>

                  <td className="px-4 py-3 text-gray-700">
                    10
                  </td>
                </tr>

                <tr className="border-b border-gray-100">
                  <td className="px-4 py-3 font-mono text-gray-700">
                    110101
                  </td>

                  <td className="px-4 py-3 text-gray-700">
                    53
                  </td>
                </tr>

                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">
                    11111111
                  </td>

                  <td className="px-4 py-3 text-gray-700">
                    255
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* How to use */}
        <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">
            How to use the Binary Converter
          </h2>

          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-6 text-gray-600">
            <li>
              Choose Binary to Decimal or Decimal to Binary.
            </li>

            <li>Enter your number in the input box.</li>

            <li>
              The converted value appears automatically.
            </li>

            <li>
              Click Copy to copy the result to your clipboard.
            </li>
          </ol>
        </section>

        {/* About binary */}
        <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">
            What is binary?
          </h2>

          <p className="mt-4 text-sm leading-7 text-gray-600">
            Binary is a number system that uses only two digits:
            0 and 1. Computers use binary to represent and process
            digital information.
          </p>

          <p className="mt-4 text-sm leading-7 text-gray-600">
            Each position in a binary number represents a power of
            two. For example, binary 110101 represents decimal 53.
          </p>
        </section>

        {/* Features */}
        <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">
            Features
          </h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-gray-50 p-4">
              <h3 className="font-semibold text-gray-900">
                Two-way conversion
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Convert binary to decimal or decimal to binary with
                one click.
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <h3 className="font-semibold text-gray-900">
                Large numbers
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Uses BigInt for accurate conversion of large whole
                numbers.
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <h3 className="font-semibold text-gray-900">
                Instant results
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Results are calculated immediately as you type.
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <h3 className="font-semibold text-gray-900">
                Browser based
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Your numbers are processed locally in your browser.
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