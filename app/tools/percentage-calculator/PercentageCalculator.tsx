"use client";

import { useState } from "react";
import { Calculator, RotateCcw } from "lucide-react";

type CalculationType =
  | "percentage"
  | "increase"
  | "decrease"
  | "change"
  | "whatPercentage";

const MAX_DECIMAL_PLACES = 10;

function formatNumber(value: number): string {
  if (!Number.isFinite(value)) {
    return "Error";
  }

  if (Object.is(value, -0)) {
    return "0";
  }

  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: MAX_DECIMAL_PLACES,
  }).format(value);
}

function formatCompactNumber(value: number): string {
  if (!Number.isFinite(value)) {
    return "Error";
  }

  const rounded = Number.parseFloat(value.toPrecision(12));

  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: MAX_DECIMAL_PLACES,
  }).format(rounded);
}

export default function PercentageCalculator() {
  const [calculationType, setCalculationType] =
    useState<CalculationType>("percentage");

  const [number, setNumber] = useState("");
  const [percentage, setPercentage] = useState("");

  const [originalValue, setOriginalValue] = useState("");
  const [newValue, setNewValue] = useState("");

  const [partValue, setPartValue] = useState("");
  const [totalValue, setTotalValue] = useState("");

  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState("");

  function clearResult() {
    setResult(null);
    setError("");
  }

  function calculate() {
    setError("");
    setResult(null);

    if (calculationType === "percentage") {
      const base = Number(number);
      const percent = Number(percentage);

      if (
        number.trim() === "" ||
        percentage.trim() === "" ||
        !Number.isFinite(base) ||
        !Number.isFinite(percent)
      ) {
        setError("Please enter a valid number and percentage.");
        return;
      }

      const calculated = (base * percent) / 100;

      if (!Number.isFinite(calculated)) {
        setError("The calculation result is too large to display.");
        return;
      }

      setResult(calculated);
      return;
    }

    if (calculationType === "increase") {
      const base = Number(number);
      const percent = Number(percentage);

      if (
        number.trim() === "" ||
        percentage.trim() === "" ||
        !Number.isFinite(base) ||
        !Number.isFinite(percent)
      ) {
        setError("Please enter a valid number and percentage.");
        return;
      }

      const calculated = base + (base * percent) / 100;

      if (!Number.isFinite(calculated)) {
        setError("The calculation result is too large to display.");
        return;
      }

      setResult(calculated);
      return;
    }

    if (calculationType === "decrease") {
      const base = Number(number);
      const percent = Number(percentage);

      if (
        number.trim() === "" ||
        percentage.trim() === "" ||
        !Number.isFinite(base) ||
        !Number.isFinite(percent)
      ) {
        setError("Please enter a valid number and percentage.");
        return;
      }

      const calculated = base - (base * percent) / 100;

      if (!Number.isFinite(calculated)) {
        setError("The calculation result is too large to display.");
        return;
      }

      setResult(calculated);
      return;
    }

    if (calculationType === "change") {
      const original = Number(originalValue);
      const current = Number(newValue);

      if (
        originalValue.trim() === "" ||
        newValue.trim() === "" ||
        !Number.isFinite(original) ||
        !Number.isFinite(current)
      ) {
        setError("Please enter both the original and new values.");
        return;
      }

      if (original === 0) {
        setError("The original value cannot be zero.");
        return;
      }

      const calculated = ((current - original) / original) * 100;

      if (!Number.isFinite(calculated)) {
        setError("The calculation result is too large to display.");
        return;
      }

      setResult(calculated);
      return;
    }

    const part = Number(partValue);
    const total = Number(totalValue);

    if (
      partValue.trim() === "" ||
      totalValue.trim() === "" ||
      !Number.isFinite(part) ||
      !Number.isFinite(total)
    ) {
      setError("Please enter both the value and total.");
      return;
    }

    if (total === 0) {
      setError("The total value cannot be zero.");
      return;
    }

    const calculated = (part / total) * 100;

    if (!Number.isFinite(calculated)) {
      setError("The calculation result is too large to display.");
      return;
    }

    setResult(calculated);
  }

  function resetCalculator() {
    setNumber("");
    setPercentage("");
    setOriginalValue("");
    setNewValue("");
    setPartValue("");
    setTotalValue("");
    setResult(null);
    setError("");
  }

  function changeType(type: CalculationType) {
    setCalculationType(type);
    clearResult();
  }

  function loadExample(
    type: CalculationType
  ) {
    resetCalculator();
    setCalculationType(type);

    if (type === "percentage") {
      setNumber("200");
      setPercentage("25");
    }

    if (type === "increase") {
      setNumber("200");
      setPercentage("10");
    }

    if (type === "decrease") {
      setNumber("200");
      setPercentage("10");
    }

    if (type === "change") {
      setOriginalValue("100");
      setNewValue("125");
    }

    if (type === "whatPercentage") {
      setPartValue("25");
      setTotalValue("200");
    }
  }

  const calculationTypes: {
    value: CalculationType;
    label: string;
    shortLabel: string;
  }[] = [
    {
      value: "percentage",
      label: "Percentage of a number",
      shortLabel: "% of a number",
    },
    {
      value: "increase",
      label: "Percentage increase",
      shortLabel: "% increase",
    },
    {
      value: "decrease",
      label: "Percentage decrease",
      shortLabel: "% decrease",
    },
    {
      value: "change",
      label: "Percentage change",
      shortLabel: "% change",
    },
    {
      value: "whatPercentage",
      label: "What percentage?",
      shortLabel: "What percentage?",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Calculator */}
      <section
        className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8"
        aria-labelledby="percentage-calculator-heading"
      >
        <h2
          id="percentage-calculator-heading"
          className="sr-only"
        >
          Percentage calculator
        </h2>

        {/* Type selector */}
        <div
          className="grid gap-2 rounded-xl bg-gray-100 p-1 sm:grid-cols-2 lg:grid-cols-5"
          role="tablist"
          aria-label="Percentage calculation type"
        >
          {calculationTypes.map((item) => (
            <button
              key={item.value}
              type="button"
              role="tab"
              aria-selected={
                calculationType === item.value
              }
              onClick={() => changeType(item.value)}
              className={[
                "rounded-lg px-3 py-3 text-sm font-semibold transition",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
                calculationType === item.value
                  ? "bg-white text-blue-700 shadow-sm"
                  : "text-gray-600 hover:bg-white/70 hover:text-gray-900",
              ].join(" ")}
            >
              <span className="hidden lg:inline">
                {item.label}
              </span>

              <span className="lg:hidden">
                {item.shortLabel}
              </span>
            </button>
          ))}
        </div>

        <div className="mx-auto mt-8 max-w-xl">
          {/* Percentage of number */}
          {calculationType === "percentage" && (
            <div className="space-y-5">
              <InputField
                id="percentage-number"
                label="Number"
                value={number}
                onChange={setNumber}
                placeholder="200"
              />

              <InputField
                id="percentage-value"
                label="Percentage"
                value={percentage}
                onChange={setPercentage}
                placeholder="25"
                suffix="%"
              />

              <ExampleText>
                Example: What is 25% of 200? The answer is 50.
              </ExampleText>
            </div>
          )}

          {/* Percentage increase */}
          {calculationType === "increase" && (
            <div className="space-y-5">
              <InputField
                id="increase-number"
                label="Original number"
                value={number}
                onChange={setNumber}
                placeholder="200"
              />

              <InputField
                id="increase-percentage"
                label="Percentage increase"
                value={percentage}
                onChange={setPercentage}
                placeholder="10"
                suffix="%"
              />

              <ExampleText>
                Example: Increasing 200 by 10% gives 220.
              </ExampleText>
            </div>
          )}

          {/* Percentage decrease */}
          {calculationType === "decrease" && (
            <div className="space-y-5">
              <InputField
                id="decrease-number"
                label="Original number"
                value={number}
                onChange={setNumber}
                placeholder="200"
              />

              <InputField
                id="decrease-percentage"
                label="Percentage decrease"
                value={percentage}
                onChange={setPercentage}
                placeholder="10"
                suffix="%"
              />

              <ExampleText>
                Example: Decreasing 200 by 10% gives 180.
              </ExampleText>
            </div>
          )}

          {/* Percentage change */}
          {calculationType === "change" && (
            <div className="space-y-5">
              <InputField
                id="original-value"
                label="Original value"
                value={originalValue}
                onChange={setOriginalValue}
                placeholder="100"
              />

              <InputField
                id="new-value"
                label="New value"
                value={newValue}
                onChange={setNewValue}
                placeholder="125"
              />

              <ExampleText>
                Example: A change from 100 to 125 is a 25% increase.
              </ExampleText>
            </div>
          )}

          {/* What percentage */}
          {calculationType === "whatPercentage" && (
            <div className="space-y-5">
              <InputField
                id="part-value"
                label="Value"
                value={partValue}
                onChange={setPartValue}
                placeholder="25"
              />

              <InputField
                id="total-value"
                label="Total"
                value={totalValue}
                onChange={setTotalValue}
                placeholder="200"
              />

              <ExampleText>
                Example: 25 is 12.5% of 200.
              </ExampleText>
            </div>
          )}

          {/* Error */}
          {error && (
            <div
              className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700"
              role="alert"
            >
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="mt-7 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={calculate}
              className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              <Calculator className="mr-2 h-4 w-4" aria-hidden="true" />
              Calculate
            </button>

            <button
              type="button"
              onClick={resetCalculator}
              className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-5 py-3.5 text-sm font-semibold text-gray-800 transition hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              <RotateCcw className="mr-2 h-4 w-4" aria-hidden="true" />
              Reset
            </button>
          </div>
        </div>
      </section>

      {/* Result */}
      {result !== null && (
        <section
          className="rounded-2xl border border-blue-100 bg-blue-50 p-6 sm:p-8"
          aria-labelledby="percentage-result-heading"
          aria-live="polite"
        >
          <div className="text-center">
            <p
              id="percentage-result-heading"
              className="text-sm font-semibold text-blue-700"
            >
              Result
            </p>

            <p className="mt-3 break-words text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              {formatCompactNumber(result)}
              {calculationType === "percentage" &&
                !Number.isNaN(result) &&
                ""}
              {(calculationType === "change" ||
                calculationType === "whatPercentage") && "%"}
            </p>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-gray-600">
              {calculationType === "percentage" &&
                `${formatNumber(Number(percentage))}% of ${formatNumber(
                  Number(number)
                )} is ${formatNumber(result)}.`}

              {calculationType === "increase" &&
                `${formatNumber(Number(number))} increased by ${formatNumber(
                  Number(percentage)
                )}% is ${formatNumber(result)}.`}

              {calculationType === "decrease" &&
                `${formatNumber(Number(number))} decreased by ${formatNumber(
                  Number(percentage)
                )}% is ${formatNumber(result)}.`}

              {calculationType === "change" &&
                `The percentage change from ${formatNumber(
                  Number(originalValue)
                )} to ${formatNumber(Number(newValue))} is ${formatNumber(
                  result
                )}%.`}

              {calculationType === "whatPercentage" &&
                `${formatNumber(Number(partValue))} is ${formatNumber(
                  result
                )}% of ${formatNumber(Number(totalValue))}.`}
            </p>
          </div>
        </section>
      )}

      {/* Quick examples */}
      <section className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
        <h2 className="text-xl font-bold text-gray-900">
          Quick percentage examples
        </h2>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <ExampleCard
            title="25% of 200"
            calculation="200 × 25%"
            result="50"
            onClick={() => loadExample("percentage")}
          />

          <ExampleCard
            title="10% increase"
            calculation="200 + 10%"
            result="220"
            onClick={() => loadExample("increase")}
          />

          <ExampleCard
            title="10% decrease"
            calculation="200 − 10%"
            result="180"
            onClick={() => loadExample("decrease")}
          />

          <ExampleCard
            title="Percentage change"
            calculation="100 → 125"
            result="25% increase"
            onClick={() => loadExample("change")}
          />

          <ExampleCard
            title="What percentage?"
            calculation="25 ÷ 200 × 100"
            result="12.5%"
            onClick={() => loadExample("whatPercentage")}
          />
        </div>
      </section>
    </div>
  );
}

function InputField({
  id,
  label,
  value,
  onChange,
  placeholder,
  suffix,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  suffix?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-semibold text-gray-900"
      >
        {label}
      </label>

      <div className="relative mt-2">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          step="any"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className={[
            "w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition",
            suffix ? "pr-12" : "",
            "placeholder:text-gray-400",
            "focus:border-blue-500 focus:ring-2 focus:ring-blue-100",
          ].join(" ")}
          aria-label={label}
        />

        {suffix && (
          <span
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-500"
            aria-hidden="true"
          >
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

function ExampleText({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <p className="rounded-xl bg-gray-50 px-4 py-3 text-sm leading-6 text-gray-600">
      {children}
    </p>
  );
}

function ExampleCard({
  title,
  calculation,
  result,
  onClick,
}: {
  title: string;
  calculation: string;
  result: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-xl border border-gray-200 bg-gray-50 p-5 text-left transition hover:border-blue-200 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
    >
      <h3 className="font-semibold text-gray-900">
        {title}
      </h3>

      <p className="mt-2 font-mono text-sm text-gray-600">
        {calculation}
      </p>

      <p className="mt-3 text-sm font-semibold text-blue-700">
        = {result}
      </p>

      <p className="mt-3 text-xs text-gray-500">
        Click to load example
      </p>
    </button>
  );
}