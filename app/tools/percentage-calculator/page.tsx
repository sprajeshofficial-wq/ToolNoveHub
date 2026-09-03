"use client";

import { useState } from "react";

type CalculationType = "percentage" | "change" | "value";

export default function PercentageCalculatorPage() {
  const [type, setType] = useState<CalculationType>("percentage");

  const [percentage, setPercentage] = useState("");
  const [number, setNumber] = useState("");

  const [oldValue, setOldValue] = useState("");
  const [newValue, setNewValue] = useState("");

  const [value, setValue] = useState("");
  const [total, setTotal] = useState("");

  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState("");

  const calculate = () => {
    setError("");
    setResult(null);

    if (type === "percentage") {
      const percent = Number(percentage);
      const amount = Number(number);

      if (
        percentage.trim() === "" ||
        number.trim() === "" ||
        !Number.isFinite(percent) ||
        !Number.isFinite(amount)
      ) {
        setError("Please enter valid numbers.");
        return;
      }

      setResult((percent / 100) * amount);
      return;
    }

    if (type === "change") {
      const oldNumber = Number(oldValue);
      const newNumber = Number(newValue);

      if (
        oldValue.trim() === "" ||
        newValue.trim() === "" ||
        !Number.isFinite(oldNumber) ||
        !Number.isFinite(newNumber)
      ) {
        setError("Please enter valid numbers.");
        return;
      }

      if (oldNumber === 0) {
        setError("The original value cannot be zero.");
        return;
      }

      setResult(((newNumber - oldNumber) / oldNumber) * 100);
      return;
    }

    const part = Number(value);
    const whole = Number(total);

    if (
      value.trim() === "" ||
      total.trim() === "" ||
      !Number.isFinite(part) ||
      !Number.isFinite(whole)
    ) {
      setError("Please enter valid numbers.");
      return;
    }

    if (whole === 0) {
      setError("The total value cannot be zero.");
      return;
    }

    setResult((part / whole) * 100);
  };

  const reset = () => {
    setPercentage("");
    setNumber("");
    setOldValue("");
    setNewValue("");
    setValue("");
    setTotal("");
    setResult(null);
    setError("");
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 10,
    }).format(num);
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
              Percentage Calculator
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-600">
              Calculate percentages, percentage changes, and what percentage
              one number is of another.
            </p>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <div
            className="grid gap-2 rounded-xl bg-gray-100 p-1 sm:grid-cols-3"
            role="tablist"
            aria-label="Percentage calculation type"
          >
            <button
              type="button"
              role="tab"
              aria-selected={type === "percentage"}
              onClick={() => {
                setType("percentage");
                setResult(null);
                setError("");
              }}
              className={`rounded-lg px-4 py-3 text-sm font-semibold transition ${
                type === "percentage"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Percentage of a Number
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={type === "change"}
              onClick={() => {
                setType("change");
                setResult(null);
                setError("");
              }}
              className={`rounded-lg px-4 py-3 text-sm font-semibold transition ${
                type === "change"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Percentage Change
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={type === "value"}
              onClick={() => {
                setType("value");
                setResult(null);
                setError("");
              }}
              className={`rounded-lg px-4 py-3 text-sm font-semibold transition ${
                type === "value"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              What Percentage?
            </button>
          </div>

          <div className="mx-auto mt-8 max-w-xl">
            {type === "percentage" && (
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="percentage"
                    className="block text-sm font-semibold text-gray-900"
                  >
                    Percentage
                  </label>

                  <div className="relative mt-2">
                    <input
                      id="percentage"
                      type="number"
                      inputMode="decimal"
                      value={percentage}
                      onChange={(event) => setPercentage(event.target.value)}
                      placeholder="25"
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-12 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                      %
                    </span>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="number"
                    className="block text-sm font-semibold text-gray-900"
                  >
                    Number
                  </label>

                  <input
                    id="number"
                    type="number"
                    inputMode="decimal"
                    value={number}
                    onChange={(event) => setNumber(event.target.value)}
                    placeholder="200"
                    className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <p className="text-sm text-gray-500">
                  Example: What is 25% of 200?
                </p>
              </div>
            )}

            {type === "change" && (
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="old-value"
                    className="block text-sm font-semibold text-gray-900"
                  >
                    Original value
                  </label>

                  <input
                    id="old-value"
                    type="number"
                    inputMode="decimal"
                    value={oldValue}
                    onChange={(event) => setOldValue(event.target.value)}
                    placeholder="100"
                    className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="new-value"
                    className="block text-sm font-semibold text-gray-900"
                  >
                    New value
                  </label>

                  <input
                    id="new-value"
                    type="number"
                    inputMode="decimal"
                    value={newValue}
                    onChange={(event) => setNewValue(event.target.value)}
                    placeholder="125"
                    className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <p className="text-sm text-gray-500">
                  Example: From 100 to 125 is a 25% increase.
                </p>
              </div>
            )}

            {type === "value" && (
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="part-value"
                    className="block text-sm font-semibold text-gray-900"
                  >
                    Value
                  </label>

                  <input
                    id="part-value"
                    type="number"
                    inputMode="decimal"
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                    placeholder="25"
                    className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="total-value"
                    className="block text-sm font-semibold text-gray-900"
                  >
                    Total
                  </label>

                  <input
                    id="total-value"
                    type="number"
                    inputMode="decimal"
                    value={total}
                    onChange={(event) => setTotal(event.target.value)}
                    placeholder="200"
                    className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <p className="text-sm text-gray-500">
                  Example: 25 is 12.5% of 200.
                </p>
              </div>
            )}

            {error && (
              <div
                className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                role="alert"
                aria-live="polite"
              >
                {error}
              </div>
            )}

            <div className="mt-7 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={calculate}
                className="rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Calculate
              </button>

              <button
                type="button"
                onClick={reset}
                className="rounded-xl border border-gray-300 bg-white px-5 py-3.5 text-sm font-semibold text-gray-800 transition hover:bg-gray-50"
              >
                Reset
              </button>
            </div>
          </div>
        </section>

        {result !== null && (
          <section className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-6 sm:p-8">
            <div className="text-center">
              <p className="text-sm font-medium text-blue-700">Result</p>

              <div className="mt-3 text-4xl font-bold tracking-tight text-gray-900">
                {formatNumber(result)}
                {type !== "percentage" && "%"}
              </div>

              <p className="mt-3 text-sm text-gray-600">
                {type === "percentage" &&
                  `${formatNumber(Number(percentage))}% of ${formatNumber(
                    Number(number),
                  )} is ${formatNumber(result)}.`}

                {type === "change" &&
                  `The percentage change from ${formatNumber(
                    Number(oldValue),
                  )} to ${formatNumber(Number(newValue))} is ${formatNumber(
                    result,
                  )}%.`}

                {type === "value" &&
                  `${formatNumber(Number(value))} is ${formatNumber(
                    result,
                  )}% of ${formatNumber(Number(total))}.`}
              </p>
            </div>
          </section>
        )}

        <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900">
            How to use the Percentage Calculator
          </h2>

          <ol className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            <li>
              <strong className="text-gray-900">1.</strong> Choose the type of
              percentage calculation.
            </li>

            <li>
              <strong className="text-gray-900">2.</strong> Enter the required
              numbers.
            </li>

            <li>
              <strong className="text-gray-900">3.</strong> Click
              <strong className="text-gray-900"> Calculate</strong>.
            </li>

            <li>
              <strong className="text-gray-900">4.</strong> View the result
              instantly.
            </li>
          </ol>
        </section>

        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900">
            Percentage formulas
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              <strong className="text-gray-900">
                Percentage of a number:
              </strong>{" "}
              Percentage ÷ 100 × Number
            </p>

            <p>
              <strong className="text-gray-900">
                Percentage change:
              </strong>{" "}
              (New Value − Original Value) ÷ Original Value × 100
            </p>

            <p>
              <strong className="text-gray-900">
                What percentage:
              </strong>{" "}
              Value ÷ Total × 100
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}