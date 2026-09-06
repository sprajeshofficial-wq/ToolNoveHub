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
        setError("Please enter valid numbers in both fields.");
        return;
      }

      const calculatedResult = (percent / 100) * amount;

      if (!Number.isFinite(calculatedResult)) {
        setError("The calculation result is too large to display.");
        return;
      }

      setResult(calculatedResult);
      return;
    }

    if (type === "change") {
      const original = Number(oldValue);
      const current = Number(newValue);

      if (
        oldValue.trim() === "" ||
        newValue.trim() === "" ||
        !Number.isFinite(original) ||
        !Number.isFinite(current)
      ) {
        setError("Please enter valid numbers in both fields.");
        return;
      }

      if (original === 0) {
        setError("The original value cannot be zero.");
        return;
      }

      const calculatedResult = ((current - original) / original) * 100;

      if (!Number.isFinite(calculatedResult)) {
        setError("The calculation result is too large to display.");
        return;
      }

      setResult(calculatedResult);
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
      setError("Please enter valid numbers in both fields.");
      return;
    }

    if (whole === 0) {
      setError("The total value cannot be zero.");
      return;
    }

    const calculatedResult = (part / whole) * 100;

    if (!Number.isFinite(calculatedResult)) {
      setError("The calculation result is too large to display.");
      return;
    }

    setResult(calculatedResult);
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

  const changeType = (newType: CalculationType) => {
    setType(newType);
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
      {/* Header */}
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
              one number is of another with this free online calculator.
            </p>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Calculator */}
        <section
          className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8"
          aria-labelledby="calculator-heading"
        >
          <h2 id="calculator-heading" className="sr-only">
            Percentage calculator
          </h2>

          {/* Calculation type */}
          <div
            className="grid gap-2 rounded-xl bg-gray-100 p-1 sm:grid-cols-3"
            role="tablist"
            aria-label="Percentage calculation type"
          >
            <button
              type="button"
              role="tab"
              aria-selected={type === "percentage"}
              onClick={() => changeType("percentage")}
              className={`rounded-lg px-3 py-3 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
                type === "percentage"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:bg-white/70 hover:text-gray-900"
              }`}
            >
              Percentage of a Number
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={type === "change"}
              onClick={() => changeType("change")}
              className={`rounded-lg px-3 py-3 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
                type === "change"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:bg-white/70 hover:text-gray-900"
              }`}
            >
              Percentage Change
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={type === "value"}
              onClick={() => changeType("value")}
              className={`rounded-lg px-3 py-3 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
                type === "value"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:bg-white/70 hover:text-gray-900"
              }`}
            >
              What Percentage?
            </button>
          </div>

          <div className="mx-auto mt-8 max-w-xl">
            {/* Percentage of a number */}
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
                      step="any"
                      value={percentage}
                      onChange={(event) =>
                        setPercentage(event.target.value)
                      }
                      placeholder="25"
                      aria-describedby="percentage-example"
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-12 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                    <span
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500"
                      aria-hidden="true"
                    >
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
                    step="any"
                    value={number}
                    onChange={(event) => setNumber(event.target.value)}
                    placeholder="200"
                    aria-describedby="percentage-example"
                    className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <p
                  id="percentage-example"
                  className="text-sm text-gray-500"
                >
                  Example: What is 25% of 200? The answer is 50.
                </p>
              </div>
            )}

            {/* Percentage change */}
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
                    step="any"
                    value={oldValue}
                    onChange={(event) => setOldValue(event.target.value)}
                    placeholder="100"
                    aria-describedby="change-example"
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
                    step="any"
                    value={newValue}
                    onChange={(event) => setNewValue(event.target.value)}
                    placeholder="125"
                    aria-describedby="change-example"
                    className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <p id="change-example" className="text-sm text-gray-500">
                  Example: A change from 100 to 125 is a 25% increase.
                </p>
              </div>
            )}

            {/* What percentage */}
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
                    step="any"
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                    placeholder="25"
                    aria-describedby="value-example"
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
                    step="any"
                    value={total}
                    onChange={(event) => setTotal(event.target.value)}
                    placeholder="200"
                    aria-describedby="value-example"
                    className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <p id="value-example" className="text-sm text-gray-500">
                  Example: 25 is 12.5% of 200.
                </p>
              </div>
            )}

            {/* Error */}
            {error && (
              <div
                className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                role="alert"
                aria-live="polite"
              >
                {error}
              </div>
            )}

            {/* Buttons */}
            <div className="mt-7 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={calculate}
                className="rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                Calculate
              </button>

              <button
                type="button"
                onClick={reset}
                className="rounded-xl border border-gray-300 bg-white px-5 py-3.5 text-sm font-semibold text-gray-800 transition hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                Reset
              </button>
            </div>
          </div>
        </section>

        {/* Result */}
        {result !== null && (
          <section
            className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-6 sm:p-8"
            aria-live="polite"
            aria-labelledby="result-heading"
          >
            <div className="text-center">
              <p
                id="result-heading"
                className="text-sm font-semibold text-blue-700"
              >
                Result
              </p>

              <div className="mt-3 break-words text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                {formatNumber(result)}
                {type !== "percentage" && "%"}
              </div>

              <p className="mt-4 text-sm leading-6 text-gray-600">
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

        {/* About */}
        <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900">
            About the Percentage Calculator
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              This free percentage calculator helps you solve common percentage
              problems quickly. You can calculate a percentage of a number,
              find the percentage change between two values, or determine what
              percentage one value represents of a total.
            </p>

            <p>
              It can be useful for everyday calculations such as discounts,
              price changes, increases and decreases, test scores, business
              figures, budgets, and other situations where percentages are
              needed.
            </p>
          </div>
        </section>

        {/* How to use */}
        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900">
            How to use the Percentage Calculator
          </h2>

          <ol className="mt-5 space-y-4 text-sm leading-6 text-gray-600">
            <li>
              <strong className="text-gray-900">1.</strong>{" "}
              Choose the type of percentage calculation you need.
            </li>

            <li>
              <strong className="text-gray-900">2.</strong>{" "}
              Enter the required values into the calculator fields.
            </li>

            <li>
              <strong className="text-gray-900">3.</strong>{" "}
              Select <strong className="text-gray-900">Calculate</strong> to
              process the numbers.
            </li>

            <li>
              <strong className="text-gray-900">4.</strong>{" "}
              Review the calculated result and explanation.
            </li>

            <li>
              <strong className="text-gray-900">5.</strong>{" "}
              Select <strong className="text-gray-900">Reset</strong> when you
              want to start another calculation.
            </li>
          </ol>
        </section>

        {/* Calculation types */}
        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900">
            Percentage calculations
          </h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <article className="rounded-xl border border-gray-200 bg-gray-50 p-5">
              <h3 className="font-semibold text-gray-900">
                Percentage of a number
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Find a specific percentage of a number.
              </p>

              <p className="mt-3 text-sm font-medium text-gray-900">
                Example: 25% of 200 = 50
              </p>
            </article>

            <article className="rounded-xl border border-gray-200 bg-gray-50 p-5">
              <h3 className="font-semibold text-gray-900">
                Percentage change
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Calculate the percentage increase or decrease between two
                values.
              </p>

              <p className="mt-3 text-sm font-medium text-gray-900">
                Example: 100 → 125 = 25% increase
              </p>
            </article>

            <article className="rounded-xl border border-gray-200 bg-gray-50 p-5">
              <h3 className="font-semibold text-gray-900">
                What percentage?
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Find what percentage one value represents of another value.
              </p>

              <p className="mt-3 text-sm font-medium text-gray-900">
                Example: 25 of 200 = 12.5%
              </p>
            </article>
          </div>
        </section>

        {/* Formulas */}
        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900">
            Percentage formulas
          </h2>

          <div className="mt-5 space-y-5 text-sm leading-7 text-gray-600">
            <div>
              <h3 className="font-semibold text-gray-900">
                Percentage of a number
              </h3>

              <p className="mt-1">
                Percentage ÷ 100 × Number
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                Percentage change
              </h3>

              <p className="mt-1">
                (New Value − Original Value) ÷ Original Value × 100
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                What percentage
              </h3>

              <p className="mt-1">
                Value ÷ Total × 100
              </p>
            </div>
          </div>
        </section>

        {/* Privacy */}
        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900">
            Privacy and browser-based calculations
          </h2>

          <p className="mt-4 text-sm leading-7 text-gray-600">
            Percentage calculations are performed directly in your browser.
            No account is required, and the values entered into this calculator
            do not need to be uploaded to a server for the calculation.
          </p>
        </section>
      </main>
    </div>
  );
}