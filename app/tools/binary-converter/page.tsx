"use client";

import { useState } from "react";

type ConversionMode = "binary-to-decimal" | "decimal-to-binary";

function binaryToDecimal(value: string): string {
  const cleaned = value.replace(/\s+/g, "").trim();

  if (!cleaned || !/^[01]+$/.test(cleaned)) {
    return "";
  }

  try {
    return BigInt(`0b${cleaned}`).toString(10);
  } catch {
    return "";
  }
}

function decimalToBinary(value: string): string {
  const cleaned = value.replace(/,/g, "").trim();

  if (!cleaned || !/^\d+$/.test(cleaned)) {
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

  const hasInput = input.trim().length > 0;
  const isInvalid = hasInput && result === "";

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
    if (!result) {
      return;
    }

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

      window.setTimeout(() => {
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
    setInput(
      mode === "binary-to-decimal"
        ? "110101"
        : "53"
    );

    setCopied(false);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">

        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Binary Converter
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-gray-600">
            Convert binary numbers to decimal or decimal numbers
            to binary instantly with this free online converter.
          </p>
        </header>

        {/* Converter */}
        <section
          aria-labelledby="converter-heading"
          className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <h2 id="converter-heading" className="sr-only">
            Binary and decimal converter
          </h2>

          {/* Conversion mode */}
          <div>
            <p className="mb-3 text-sm font-semibold text-gray-900">
              Conversion type
            </p>

            <div
              className="grid gap-3 sm:grid-cols-2"
              role="group"
              aria-label="Conversion type"
            >
              <button
                type="button"
                onClick={() =>
                  handleModeChange("binary-to-decimal")
                }
                aria-pressed={mode === "binary-to-decimal"}
                className={`rounded-xl border px-4 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
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
                aria-pressed={mode === "decimal-to-binary"}
                className={`rounded-xl border px-4 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
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
              inputMode={
                mode === "binary-to-decimal"
                  ? "text"
                  : "numeric"
              }
              value={input}
              onChange={(event) =>
                handleInputChange(event.target.value)
              }
              placeholder={
                mode === "binary-to-decimal"
                  ? "Example: 110101"
                  : "Example: 53"
              }
              autoComplete="off"
              spellCheck={false}
              aria-invalid={isInvalid}
              aria-describedby="binary-input-help binary-input-error"
              className={`w-full rounded-xl border px-4 py-3 text-lg text-gray-900 outline-none transition placeholder:text-gray-400 focus:ring-2 ${
                isInvalid
                  ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"
              }`}
            />

            <p
              id="binary-input-help"
              className="mt-2 text-xs leading-5 text-gray-500"
            >
              {mode === "binary-to-decimal"
                ? "Enter only 0 and 1. Spaces between binary digits are accepted."
                : "Enter a non-negative whole number. Commas are accepted."}
            </p>

            {isInvalid && (
              <p
                id="binary-input-error"
                role="alert"
                className="mt-2 text-sm font-medium text-red-600"
              >
                {mode === "binary-to-decimal"
                  ? "Enter a valid binary number using only 0 and 1."
                  : "Enter a valid non-negative whole decimal number."}
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
                aria-live="polite"
                aria-label={resultLabel}
                className="min-w-0 flex-1 rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-lg text-gray-900 outline-none"
              />

              <button
                type="button"
                onClick={handleCopy}
                disabled={!result}
                aria-label={
                  copied
                    ? "Result copied"
                    : "Copy result"
                }
                className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <button
              type="button"
              onClick={loadExample}
              className="rounded-xl border border-gray-300 bg-white px-5 py-3 font-medium text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Load Example
            </button>

            <button
              type="button"
              onClick={handleSwap}
              disabled={!result}
              className="rounded-xl border border-gray-300 bg-white px-5 py-3 font-medium text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Swap Conversion
            </button>

            <button
              type="button"
              onClick={handleClear}
              disabled={!input}
              className="rounded-xl border border-gray-300 bg-white px-5 py-3 font-medium text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Clear
            </button>
          </div>

          {/* Copy status */}
          <div
            role="status"
            aria-live="polite"
            className="mt-5 min-h-6 text-center text-sm text-green-700"
          >
            {copied ? "Result copied to your clipboard." : ""}
          </div>
        </section>

        {/* Examples */}
        <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">
            Binary conversion examples
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            These examples show how common binary values correspond
            to decimal numbers.
          </p>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[420px] border-collapse text-left text-sm">
              <caption className="sr-only">
                Binary to decimal conversion examples
              </caption>

              <thead>
                <tr className="border-b border-gray-200">
                  <th
                    scope="col"
                    className="px-4 py-3 font-semibold text-gray-900"
                  >
                    Binary
                  </th>

                  <th
                    scope="col"
                    className="px-4 py-3 font-semibold text-gray-900"
                  >
                    Decimal
                  </th>
                </tr>
              </thead>

              <tbody>
                {[
                  ["0", "0"],
                  ["1", "1"],
                  ["1010", "10"],
                  ["110101", "53"],
                  ["11111111", "255"],
                ].map(([binary, decimal]) => (
                  <tr
                    key={binary}
                    className="border-b border-gray-100 last:border-0"
                  >
                    <td className="px-4 py-3 font-mono text-gray-700">
                      {binary}
                    </td>

                    <td className="px-4 py-3 text-gray-700">
                      {decimal}
                    </td>
                  </tr>
                ))}
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

            <li>
              Enter your number in the input field.
            </li>

            <li>
              Review the converted result, which updates as you
              type.
            </li>

            <li>
              Use Copy to copy the result to your clipboard.
            </li>

            <li>
              Use Swap Conversion to reverse the conversion using
              the current result.
            </li>
          </ol>
        </section>

        {/* What is binary */}
        <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">
            What is binary?
          </h2>

          <p className="mt-4 text-sm leading-7 text-gray-600">
            Binary is a base-2 number system that uses only two
            digits: 0 and 1. Digital computers use binary because
            electronic systems can represent information using
            two distinct states.
          </p>

          <p className="mt-4 text-sm leading-7 text-gray-600">
            Each position in a binary number represents a power of
            two. For example, 110101 can be expanded as 32 + 16 +
            4 + 1, which equals decimal 53.
          </p>

          <p className="mt-4 text-sm leading-7 text-gray-600">
            Binary conversion is commonly used when learning
            computer science, working with digital systems, reading
            low-level data, or understanding how numbers are
            represented inside computers.
          </p>
        </section>

        {/* Conversion method */}
        <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">
            How binary conversion works
          </h2>

          <h3 className="mt-5 font-semibold text-gray-900">
            Binary to decimal
          </h3>

          <p className="mt-2 text-sm leading-7 text-gray-600">
            Starting from the right, each binary digit represents a
            power of two. Multiply each digit by its corresponding
            power of two and add the values together.
          </p>

          <div className="mt-4 rounded-xl bg-gray-50 p-4 font-mono text-sm text-gray-700">
            110101 = 32 + 16 + 4 + 1 = 53
          </div>

          <h3 className="mt-6 font-semibold text-gray-900">
            Decimal to binary
          </h3>

          <p className="mt-2 text-sm leading-7 text-gray-600">
            A decimal whole number can be converted to binary by
            repeatedly dividing it by two and recording the
            remainders. Reading the remainders from bottom to top
            produces the binary representation.
          </p>
        </section>

        {/* Features */}
        <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">
            Binary Converter features
          </h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-gray-50 p-4">
              <h3 className="font-semibold text-gray-900">
                Two-way conversion
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Convert between binary and decimal numbers in either
                direction.
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <h3 className="font-semibold text-gray-900">
                Large whole numbers
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Uses JavaScript BigInt so large whole-number values
                can be converted without relying on floating-point
                arithmetic.
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <h3 className="font-semibold text-gray-900">
                Instant conversion
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                The result updates automatically while you enter a
                valid number.
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <h3 className="font-semibold text-gray-900">
                Copy and swap
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Copy the result or swap the conversion direction to
                continue working with the converted value.
              </p>
            </div>
          </div>
        </section>

        {/* Common uses */}
        <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">
            Common uses for binary conversion
          </h2>

          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-gray-600">
            <li>
              Computer science and programming exercises
            </li>

            <li>
              Learning number systems and place values
            </li>

            <li>
              Digital electronics and computer engineering
            </li>

            <li>
              Understanding binary data representation
            </li>

            <li>
              Checking binary and decimal values during development
            </li>
          </ul>
        </section>

        {/* Browser processing */}
        <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">
            Browser-based conversion
          </h2>

          <p className="mt-4 text-sm leading-7 text-gray-600">
            The conversion calculations are performed in your web
            browser. The tool does not need to send the number to a
            conversion service to calculate the result.
          </p>

          <p className="mt-4 text-sm leading-7 text-gray-600">
            As with any online service, other website features such
            as analytics or standard browser behavior may operate
            separately from the calculator itself. See the
            ToolNoveHub Privacy Policy for more information about
            site-wide data handling.
          </p>
        </section>

        {/* FAQ */}
        <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">
            Binary Converter FAQ
          </h2>

          <div className="mt-5 space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900">
                What is 110101 in decimal?
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Binary 110101 is decimal 53.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                Can I convert large numbers?
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Yes. The converter uses JavaScript BigInt for
                whole-number conversion, allowing it to handle
                values beyond the normal JavaScript Number safe
                integer range.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                Can I enter spaces in a binary number?
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Yes. Spaces are removed before a binary value is
                validated, so values such as 110 101 can be
                converted.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                Does this converter support negative numbers?
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                No. This tool is designed for non-negative whole
                numbers and unsigned binary values.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                Is the conversion performed in the browser?
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Yes. The conversion logic runs in the browser,
                without requiring the number to be submitted to a
                separate conversion API.
              </p>
            </div>
          </div>
        </section>

        {/* Privacy notice */}
        <div className="mt-8 rounded-xl border border-blue-100 bg-blue-50 px-5 py-4 text-center text-sm leading-6 text-blue-800">
          Binary and decimal conversion is calculated directly in
          your browser. No conversion request needs to be sent to a
          server.
        </div>
      </div>
    </main>
  );
}