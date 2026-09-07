"use client";

import { useEffect, useState } from "react";
import { Check, Copy, RefreshCw, ArrowLeftRight } from "lucide-react";

type Unit = "B" | "KB" | "MB" | "GB" | "TB";

const UNITS: Unit[] = ["B", "KB", "MB", "GB", "TB"];

const MULTIPLIERS: Record<Unit, number> = {
  B: 1,
  KB: 1024,
  MB: 1024 ** 2,
  GB: 1024 ** 3,
  TB: 1024 ** 4,
};

const EXAMPLES: {
  value: string;
  from: Unit;
  to: Unit;
  label: string;
  description: string;
}[] = [
  {
    value: "1024",
    from: "B",
    to: "KB",
    label: "1,024 Bytes → 1 KB",
    description: "A basic Bytes to Kilobytes conversion.",
  },
  {
    value: "1024",
    from: "KB",
    to: "MB",
    label: "1,024 KB → 1 MB",
    description: "Convert Kilobytes to Megabytes.",
  },
  {
    value: "1024",
    from: "MB",
    to: "GB",
    label: "1,024 MB → 1 GB",
    description: "Convert Megabytes to Gigabytes.",
  },
  {
    value: "1024",
    from: "GB",
    to: "TB",
    label: "1,024 GB → 1 TB",
    description: "Convert Gigabytes to Terabytes.",
  },
  {
    value: "5120",
    from: "MB",
    to: "GB",
    label: "5,120 MB → 5 GB",
    description: "A common storage-size conversion.",
  },
  {
    value: "4096",
    from: "B",
    to: "KB",
    label: "4,096 Bytes → 4 KB",
    description: "Convert a small file size into Kilobytes.",
  },
];

function parseValue(value: string): number | null {
  const trimmed = value.trim();

  if (!trimmed) {
    return null;
  }

  // Accept normal decimal notation but reject partial or malformed input.
  if (!/^(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?$/i.test(trimmed)) {
    return null;
  }

  const number = Number(trimmed);

  if (!Number.isFinite(number) || number < 0) {
    return null;
  }

  return number;
}

function convertSize(value: number, from: Unit, to: Unit): number {
  const bytes = value * MULTIPLIERS[from];
  return bytes / MULTIPLIERS[to];
}

function formatNumber(value: number): string {
  if (!Number.isFinite(value)) {
    return "";
  }

  if (Object.is(value, -0) || value === 0) {
    return "0";
  }

  // Keep the result readable while preserving useful precision.
  return Number(value.toPrecision(12)).toString();
}

export default function FileSizeConverter() {
  const [value, setValue] = useState("1024");
  const [fromUnit, setFromUnit] = useState<Unit>("KB");
  const [toUnit, setToUnit] = useState<Unit>("MB");
  const [result, setResult] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  function performConversion() {
    const numericValue = parseValue(value);

    if (numericValue === null) {
      setResult("");
      setError(
        value.trim()
          ? "Enter a valid file size using a non-negative number."
          : "Enter a file size to convert.",
      );
      return;
    }

    const converted = convertSize(numericValue, fromUnit, toUnit);

    if (!Number.isFinite(converted)) {
      setResult("");
      setError(
        "The value is too large for this converter. Try a smaller number.",
      );
      return;
    }

    setResult(formatNumber(converted));
    setError("");
    setCopied(false);
  }

  function handleValueChange(nextValue: string) {
    setValue(nextValue);
    setCopied(false);

    if (nextValue.trim() === "") {
      setResult("");
      setError("");
      return;
    }

    const numericValue = parseValue(nextValue);

    if (numericValue === null) {
      setResult("");
      setError("Enter a valid non-negative number.");
      return;
    }

    const converted = convertSize(numericValue, fromUnit, toUnit);

    if (!Number.isFinite(converted)) {
      setResult("");
      setError(
        "The value is too large for this converter. Try a smaller number.",
      );
      return;
    }

    setResult(formatNumber(converted));
    setError("");
  }

  function handleFromUnitChange(nextUnit: Unit) {
    setFromUnit(nextUnit);
    setCopied(false);

    const numericValue = parseValue(value);

    if (numericValue === null) {
      setResult("");
      return;
    }

    const converted = convertSize(numericValue, nextUnit, toUnit);

    if (Number.isFinite(converted)) {
      setResult(formatNumber(converted));
      setError("");
    }
  }

  function handleToUnitChange(nextUnit: Unit) {
    setToUnit(nextUnit);
    setCopied(false);

    const numericValue = parseValue(value);

    if (numericValue === null) {
      setResult("");
      return;
    }

    const converted = convertSize(numericValue, fromUnit, nextUnit);

    if (Number.isFinite(converted)) {
      setResult(formatNumber(converted));
      setError("");
    }
  }

  async function copyToClipboard() {
    if (!result) {
      return;
    }

    try {
      await navigator.clipboard.writeText(`${result} ${toUnit}`);
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      setCopied(false);
      setError("The result could not be copied. Please copy it manually.");
    }
  }

  function swapUnits() {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setCopied(false);

    const numericValue = parseValue(value);

    if (numericValue === null) {
      setResult("");
      return;
    }

    const converted = convertSize(numericValue, toUnit, fromUnit);

    if (Number.isFinite(converted)) {
      setResult(formatNumber(converted));
      setError("");
    }
  }

  function clearAll() {
    setValue("");
    setResult("");
    setError("");
    setCopied(false);
  }

  function loadExample(exampleValue: string, from: Unit, to: Unit) {
    setValue(exampleValue);
    setFromUnit(from);
    setToUnit(to);
    setCopied(false);

    const numericValue = parseValue(exampleValue);

    if (numericValue === null) {
      setResult("");
      setError("The example value is invalid.");
      return;
    }

    const converted = convertSize(numericValue, from, to);

    if (!Number.isFinite(converted)) {
      setResult("");
      setError("The example value is too large.");
      return;
    }

    setResult(formatNumber(converted));
    setError("");
  }

  useEffect(() => {
    const numericValue = parseValue(value);

    if (numericValue === null) {
      return;
    }

    const converted = convertSize(numericValue, fromUnit, toUnit);

    if (Number.isFinite(converted)) {
      setResult(formatNumber(converted));
    }
  }, [fromUnit, toUnit]);

  return (
    <div className="space-y-8">
      {/* Converter */}
      <section
        aria-labelledby="file-size-converter-heading"
        className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
      >
        <div className="grid gap-6 lg:grid-cols-[1fr_auto_1fr] lg:items-end">
          {/* From */}
          <div>
            <label
              htmlFor="file-size-value"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              File size
            </label>

            <div className="flex gap-2">
              <input
                id="file-size-value"
                type="number"
                min="0"
                step="any"
                inputMode="decimal"
                value={value}
                onChange={(event) => handleValueChange(event.target.value)}
                placeholder="Enter a value"
                aria-describedby="file-size-help file-size-error"
                className="h-12 min-w-0 flex-1 rounded-lg border border-gray-300 bg-white px-4 text-base text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              <select
                aria-label="Original file size unit"
                value={fromUnit}
                onChange={(event) =>
                  handleFromUnitChange(event.target.value as Unit)
                }
                className="h-12 w-24 rounded-lg border border-gray-300 bg-white px-3 text-base text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                {UNITS.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>

            <p
              id="file-size-help"
              className="mt-2 text-xs text-gray-500"
            >
              Enter zero or a positive number.
            </p>
          </div>

          {/* Swap */}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={swapUnits}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Swap the source and target units"
              title="Swap units"
            >
              <ArrowLeftRight className="h-4 w-4" />
              Swap
            </button>
          </div>

          {/* To */}
          <div>
            <label
              htmlFor="file-size-result"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Converted size
            </label>

            <div className="flex gap-2">
              <input
                id="file-size-result"
                type="text"
                value={result}
                readOnly
                placeholder="Result"
                aria-live="polite"
                aria-label={`Converted result in ${toUnit}`}
                className="h-12 min-w-0 flex-1 rounded-lg border border-gray-300 bg-gray-50 px-4 font-mono text-base text-gray-900 outline-none"
              />

              <select
                aria-label="Target file size unit"
                value={toUnit}
                onChange={(event) =>
                  handleToUnitChange(event.target.value as Unit)
                }
                className="h-12 w-24 rounded-lg border border-gray-300 bg-white px-3 text-base text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                {UNITS.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div
            id="file-size-error"
            role="alert"
            className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        {/* Result summary */}
        {result && !error && (
          <div
            className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-5"
            aria-live="polite"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
              Result
            </p>

            <p className="mt-1 break-all font-mono text-2xl font-bold text-gray-900">
              {result} {toUnit}
            </p>

            <p className="mt-2 break-all text-sm text-gray-600">
              {value} {fromUnit} = {result} {toUnit}
            </p>
          </div>
        )}

        {/* Buttons */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={performConversion}
            className="inline-flex flex-1 items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Convert
          </button>

          <button
            type="button"
            onClick={copyToClipboard}
            disabled={!result}
            className="inline-flex flex-1 items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {copied ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="mr-2 h-4 w-4" />
                Copy Result
              </>
            )}
          </button>

          <button
            type="button"
            onClick={clearAll}
            className="inline-flex flex-1 items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Clear
          </button>
        </div>
      </section>

      {/* Common examples */}
      <section
        aria-labelledby="common-conversions-heading"
        className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
      >
        <h2
          id="common-conversions-heading"
          className="text-2xl font-bold text-gray-900"
        >
          Common file size conversions
        </h2>

        <p className="mt-2 text-gray-600">
          Select an example to load the values into the converter.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {EXAMPLES.map((example) => (
            <button
              key={`${example.value}-${example.from}-${example.to}`}
              type="button"
              onClick={() =>
                loadExample(example.value, example.from, example.to)
              }
              className="rounded-xl border border-gray-200 bg-gray-50 p-5 text-left transition hover:border-blue-200 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <span className="block text-sm font-semibold text-gray-900">
                {example.label}
              </span>

              <span className="mt-2 block text-sm leading-6 text-gray-600">
                {example.description}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Units */}
      <section
        aria-labelledby="file-size-units-heading"
        className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
      >
        <h2
          id="file-size-units-heading"
          className="text-2xl font-bold text-gray-900"
        >
          File size units
        </h2>

        <p className="mt-2 leading-7 text-gray-600">
          This converter uses binary multiples, where each larger unit is
          1,024 times the previous unit.
        </p>

        <div className="mt-6 overflow-hidden rounded-xl border border-gray-200">
          <div className="grid grid-cols-2 bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-700">
            <span>Unit</span>
            <span>Equivalent</span>
          </div>

          <div className="divide-y divide-gray-200">
            <UnitRow unit="1 B" equivalent="1 Byte" />
            <UnitRow unit="1 KB" equivalent="1,024 Bytes" />
            <UnitRow unit="1 MB" equivalent="1,024 KB" />
            <UnitRow unit="1 GB" equivalent="1,024 MB" />
            <UnitRow unit="1 TB" equivalent="1,024 GB" />
          </div>
        </div>
      </section>

      {/* How to use */}
      <section
        aria-labelledby="how-to-use-heading"
        className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
      >
        <h2
          id="how-to-use-heading"
          className="text-2xl font-bold text-gray-900"
        >
          How to use the File Size Converter
        </h2>

        <ol className="mt-6 space-y-5">
          <Step
            number="1"
            title="Enter a file size"
            text="Type the numerical file size you want to convert."
          />

          <Step
            number="2"
            title="Choose the original unit"
            text="Select Bytes, KB, MB, GB, or TB for the value you entered."
          />

          <Step
            number="3"
            title="Choose the target unit"
            text="Select the unit you want to convert the value into."
          />

          <Step
            number="4"
            title="Review the result"
            text="The converted value updates in the result field. You can also copy the result."
          />
        </ol>
      </section>

      {/* Binary vs decimal */}
      <section
        aria-labelledby="binary-decimal-heading"
        className="rounded-2xl border border-blue-100 bg-blue-50 p-6 sm:p-8"
      >
        <h2
          id="binary-decimal-heading"
          className="text-2xl font-bold text-gray-900"
        >
          Binary and decimal file sizes
        </h2>

        <p className="mt-4 leading-7 text-gray-700">
          File-size terminology can use different conventions. This converter
          uses the binary convention commonly used in computing calculations:
          1 KB equals 1,024 bytes, 1 MB equals 1,024 KB, and each larger unit
          follows the same 1,024-based relationship.
        </p>

        <p className="mt-4 leading-7 text-gray-700">
          Some storage manufacturers and operating systems use decimal units,
          where 1 KB is 1,000 bytes. If you are comparing a storage-device
          specification with a computer display, check which convention is
          being used.
        </p>
      </section>

      {/* Everyday uses */}
      <section
        aria-labelledby="uses-heading"
        className="grid gap-6 md:grid-cols-2"
      >
        <InfoCard
          title="Storage calculations"
          text="Convert storage values when comparing hard drives, SSDs, memory cards, cloud storage, or other capacity limits."
        />

        <InfoCard
          title="Upload and download limits"
          text="Convert file sizes when checking whether documents, images, videos, or archives fit within an upload or download limit."
        />

        <InfoCard
          title="Backup planning"
          text="Use consistent file-size units when estimating the space needed for backups and collections of digital files."
        />

        <InfoCard
          title="Quick technical checks"
          text="Convert between common units when reading software documentation, server limits, hosting specifications, or technical information."
        />
      </section>

      {/* Browser processing */}
      <section
        aria-labelledby="browser-processing-heading"
        className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
      >
        <h2
          id="browser-processing-heading"
          className="text-2xl font-bold text-gray-900"
        >
          Browser-based processing
        </h2>

        <p className="mt-4 leading-7 text-gray-600">
          The File Size Converter performs its calculations directly in your
          browser. It does not require you to upload a file because the tool
          works with the numerical file-size value you enter.
        </p>

        <p className="mt-4 leading-7 text-gray-600">
          As with other ToolNoveHub pages, site-wide services such as analytics
          may operate separately according to the{" "}
          <a
            href="/privacy"
            className="font-medium text-blue-600 underline underline-offset-2 hover:text-blue-700"
          >
            Privacy Policy
          </a>
          .
        </p>
      </section>

      {/* FAQ */}
      <section
        aria-labelledby="faq-heading"
        className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
      >
        <h2
          id="faq-heading"
          className="text-2xl font-bold text-gray-900"
        >
          File Size Converter FAQ
        </h2>

        <div className="mt-6 divide-y divide-gray-200">
          <Faq
            question="How many bytes are in 1 KB?"
            answer="This converter uses the binary convention, so 1 KB equals 1,024 bytes."
          />

          <Faq
            question="How many KB are in 1 MB?"
            answer="Using the binary convention, 1 MB equals 1,024 KB."
          />

          <Faq
            question="Can I convert GB to MB?"
            answer="Yes. Select GB as the original unit and MB as the target unit, then enter the value you want to convert."
          />

          <Faq
            question="Does this converter upload my files?"
            answer="No file upload is required. The tool converts the numerical value you enter directly in your browser."
          />

          <Faq
            question="Why can storage sizes look different on different devices?"
            answer="Different systems and manufacturers may use binary or decimal units. This converter uses binary multiples of 1,024."
          />
        </div>
      </section>
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

function UnitRow({
  unit,
  equivalent,
}: {
  unit: string;
  equivalent: string;
}) {
  return (
    <div className="grid grid-cols-2 px-4 py-3 text-sm">
      <span className="font-medium text-gray-900">{unit}</span>
      <span className="text-gray-600">{equivalent}</span>
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