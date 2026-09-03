"use client";

import { useState } from "react";

type Unit = "Bytes" | "KB" | "MB" | "GB" | "TB";

const UNITS: Unit[] = ["Bytes", "KB", "MB", "GB", "TB"];

const MULTIPLIERS: Record<Unit, number> = {
  Bytes: 1,
  KB: 1024,
  MB: 1024 ** 2,
  GB: 1024 ** 3,
  TB: 1024 ** 4,
};

function convertSize(value: number, from: Unit, to: Unit) {
  const bytes = value * MULTIPLIERS[from];
  return bytes / MULTIPLIERS[to];
}

function formatNumber(value: number) {
  if (!Number.isFinite(value)) return "";

  if (value === 0) return "0";

  return Number(value.toPrecision(12)).toString();
}

export default function FileSizeConverterPage() {
  const [value, setValue] = useState("1024");
  const [fromUnit, setFromUnit] = useState<Unit>("KB");
  const [toUnit, setToUnit] = useState<Unit>("MB");
  const [copied, setCopied] = useState(false);

  const numericValue = Number(value);

  const result =
    value.trim() !== "" &&
    Number.isFinite(numericValue) &&
    numericValue >= 0
      ? formatNumber(convertSize(numericValue, fromUnit, toUnit))
      : "";

  const resultText =
    result !== "" ? `${result} ${toUnit}` : "Enter a valid value";

  async function copyResult() {
    if (!result) return;

    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch {
      setCopied(false);
    }
  }

  function swapUnits() {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  }

  function reset() {
    setValue("1024");
    setFromUnit("KB");
    setToUnit("MB");
    setCopied(false);
  }

  function loadExample(exampleValue: string, from: Unit, to: Unit) {
    setValue(exampleValue);
    setFromUnit(from);
    setToUnit(to);
    setCopied(false);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-600">
              Utility Tool
            </p>

            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              File Size Converter
            </h1>

            <p className="mt-5 text-lg leading-8 text-gray-600">
              Convert file sizes between Bytes, KB, MB, GB, and TB quickly and
              easily.
            </p>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Converter */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto_1fr] lg:items-end">
            {/* From */}
            <div>
              <label
                htmlFor="file-size-value"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Value
              </label>

              <input
                id="file-size-value"
                type="number"
                min="0"
                step="any"
                value={value}
                onChange={(event) => {
                  setValue(event.target.value);
                  setCopied(false);
                }}
                placeholder="Enter file size"
                className="h-12 w-full rounded-lg border border-gray-300 px-4 text-base outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              <label
                htmlFor="from-unit"
                className="mb-2 mt-5 block text-sm font-semibold text-gray-700"
              >
                From
              </label>

              <select
                id="from-unit"
                value={fromUnit}
                onChange={(event) => {
                  setFromUnit(event.target.value as Unit);
                  setCopied(false);
                }}
                className="h-12 w-full rounded-lg border border-gray-300 bg-white px-4 text-base outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                {UNITS.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>

            {/* Swap */}
            <div className="flex justify-center lg:pb-0">
              <button
                type="button"
                onClick={swapUnits}
                className="flex h-12 items-center justify-center rounded-lg border border-gray-300 bg-white px-5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                aria-label="Swap conversion units"
                title="Swap units"
              >
                ⇄
                <span className="ml-2">Swap</span>
              </button>
            </div>

            {/* To */}
            <div>
              <label
                htmlFor="to-unit"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                To
              </label>

              <select
                id="to-unit"
                value={toUnit}
                onChange={(event) => {
                  setToUnit(event.target.value as Unit);
                  setCopied(false);
                }}
                className="h-12 w-full rounded-lg border border-gray-300 bg-white px-4 text-base outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                {UNITS.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>

              <div className="mt-5 rounded-lg border border-blue-100 bg-blue-50 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                  Result
                </p>

                <p
                  className={`mt-1 break-all font-mono text-xl font-bold ${
                    result ? "text-gray-900" : "text-gray-400"
                  }`}
                >
                  {resultText}
                </p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={copyResult}
              disabled={!result}
              className="flex-1 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              {copied ? "Copied!" : "Copy Result"}
            </button>

            <button
              type="button"
              onClick={reset}
              className="flex-1 rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Reset
            </button>
          </div>
        </section>

        {/* Common conversions */}
        <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Common file size conversions
          </h2>

          <p className="mt-2 text-gray-600">
            Select an example to load it into the converter.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Example
              title="1024 KB → MB"
              description="1 MB"
              onClick={() => loadExample("1024", "KB", "MB")}
            />

            <Example
              title="1024 MB → GB"
              description="1 GB"
              onClick={() => loadExample("1024", "MB", "GB")}
            />

            <Example
              title="1024 GB → TB"
              description="1 TB"
              onClick={() => loadExample("1024", "GB", "TB")}
            />

            <Example
              title="2048 KB → MB"
              description="2 MB"
              onClick={() => loadExample("2048", "KB", "MB")}
            />

            <Example
              title="5120 MB → GB"
              description="5 GB"
              onClick={() => loadExample("5120", "MB", "GB")}
            />

            <Example
              title="4096 Bytes → KB"
              description="4 KB"
              onClick={() => loadExample("4096", "Bytes", "KB")}
            />
          </div>
        </section>

        {/* Units */}
        <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900">
            File size units
          </h2>

          <div className="mt-6 overflow-hidden rounded-xl border border-gray-200">
            <div className="grid grid-cols-2 bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-700">
              <span>Unit</span>
              <span>Equivalent</span>
            </div>

            <div className="divide-y divide-gray-200">
              <UnitRow unit="1 Byte" equivalent="1 Byte" />
              <UnitRow unit="1 KB" equivalent="1,024 Bytes" />
              <UnitRow unit="1 MB" equivalent="1,024 KB" />
              <UnitRow unit="1 GB" equivalent="1,024 MB" />
              <UnitRow unit="1 TB" equivalent="1,024 GB" />
            </div>
          </div>
        </section>

        {/* How to use */}
        <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900">
            How to use the File Size Converter
          </h2>

          <ol className="mt-5 space-y-4 text-gray-600">
            <li className="flex gap-3">
              <span className="font-bold text-blue-600">1.</span>
              <span>Enter the file size you want to convert.</span>
            </li>

            <li className="flex gap-3">
              <span className="font-bold text-blue-600">2.</span>
              <span>Select the original unit.</span>
            </li>

            <li className="flex gap-3">
              <span className="font-bold text-blue-600">3.</span>
              <span>Select the unit you want to convert to.</span>
            </li>

            <li className="flex gap-3">
              <span className="font-bold text-blue-600">4.</span>
              <span>View and copy the converted result.</span>
            </li>
          </ol>
        </section>

        {/* Formula */}
        <section className="mt-8 grid gap-6 md:grid-cols-2">
          <InfoCard
            title="Binary conversion"
            text="This converter uses the binary convention where 1 KB equals 1,024 Bytes, 1 MB equals 1,024 KB, and so on."
          />

          <InfoCard
            title="Useful for everyday tasks"
            text="Convert file sizes when checking storage capacity, download sizes, upload limits, backups, and disk space."
          />
        </section>

        {/* Features */}
        <section className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Why use our File Size Converter?
          </h2>

          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <Feature
              title="Free"
              text="Use the converter without registration or payment."
            />

            <Feature
              title="Accurate"
              text="Conversions use consistent binary file-size units."
            />

            <Feature
              title="Fast"
              text="Results are calculated instantly in your browser."
            />

            <Feature
              title="Private"
              text="No files need to be uploaded to use this converter."
            />
          </div>
        </section>

        {/* Privacy */}
        <section className="pb-8 pt-8 text-center">
          <h2 className="text-xl font-semibold text-gray-900">
            Privacy-focused
          </h2>

          <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-gray-600">
            This tool only performs calculations in your browser. You do not
            need to upload any files or personal information.
          </p>
        </section>
      </main>
    </div>
  );
}

function Example({
  title,
  description,
  onClick,
}: {
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-xl border border-gray-200 bg-gray-50 p-5 text-left transition hover:border-blue-200 hover:bg-blue-50 hover:shadow-sm"
    >
      <span className="block text-sm font-semibold text-gray-900">
        {title}
      </span>

      <span className="mt-2 block text-sm text-gray-600">
        {description}
      </span>
    </button>
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
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-bold text-gray-900">{title}</h3>

      <p className="mt-3 text-sm leading-6 text-gray-600">{text}</p>
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
    <div className="rounded-xl bg-white p-5">
      <h3 className="font-semibold text-gray-900">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-gray-600">{text}</p>
    </div>
  );
}