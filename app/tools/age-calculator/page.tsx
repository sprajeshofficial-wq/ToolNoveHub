"use client";

import { useState } from "react";

function calculateAge(dateOfBirth: string) {
  const birthDate = new Date(`${dateOfBirth}T00:00:00`);
  const today = new Date();

  if (Number.isNaN(birthDate.getTime()) || birthDate > today) {
    return null;
  }

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;

    const previousMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      0,
    );

    days += previousMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  const totalMilliseconds = today.getTime() - birthDate.getTime();
  const totalDays = Math.floor(
    totalMilliseconds / (1000 * 60 * 60 * 24),
  );

  return {
    years,
    months,
    days,
    totalDays,
  };
}

export default function AgeCalculatorPage() {
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [result, setResult] = useState<ReturnType<typeof calculateAge>>(null);
  const [error, setError] = useState("");

  const calculate = () => {
    setError("");

    if (!dateOfBirth) {
      setResult(null);
      setError("Please select your date of birth.");
      return;
    }

    const calculatedAge = calculateAge(dateOfBirth);

    if (!calculatedAge) {
      setResult(null);
      setError("Please enter a valid date of birth.");
      return;
    }

    setResult(calculatedAge);
  };

  const reset = () => {
    setDateOfBirth("");
    setResult(null);
    setError("");
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
              Age Calculator
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-600">
              Calculate your exact age in years, months, and days using your
              date of birth.
            </p>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mx-auto max-w-xl">
            <label
              htmlFor="date-of-birth"
              className="block text-sm font-semibold text-gray-900"
            >
              Date of birth
            </label>

            <input
              id="date-of-birth"
              type="date"
              value={dateOfBirth}
              max={new Date().toISOString().split("T")[0]}
              onChange={(event) => setDateOfBirth(event.target.value)}
              className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            {error && (
              <div
                className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                role="alert"
                aria-live="polite"
              >
                {error}
              </div>
            )}

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={calculate}
                className="rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Calculate Age
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

        {result && (
          <section className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-6 sm:p-8">
            <div className="text-center">
              <p className="text-sm font-medium text-blue-700">
                Your current age
              </p>

              <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
                <div className="rounded-xl bg-white px-5 py-4 shadow-sm">
                  <div className="text-3xl font-bold text-gray-900">
                    {result.years}
                  </div>
                  <div className="mt-1 text-xs font-medium text-gray-500">
                    Years
                  </div>
                </div>

                <div className="rounded-xl bg-white px-5 py-4 shadow-sm">
                  <div className="text-3xl font-bold text-gray-900">
                    {result.months}
                  </div>
                  <div className="mt-1 text-xs font-medium text-gray-500">
                    Months
                  </div>
                </div>

                <div className="rounded-xl bg-white px-5 py-4 shadow-sm">
                  <div className="text-3xl font-bold text-gray-900">
                    {result.days}
                  </div>
                  <div className="mt-1 text-xs font-medium text-gray-500">
                    Days
                  </div>
                </div>
              </div>

              <p className="mt-6 text-sm text-gray-600">
                Approximately{" "}
                <strong className="text-gray-900">
                  {result.totalDays.toLocaleString()}
                </strong>{" "}
                days old.
              </p>
            </div>
          </section>
        )}

        <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900">
            How to use the Age Calculator
          </h2>

          <ol className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            <li>
              <strong className="text-gray-900">1.</strong> Select your date of
              birth.
            </li>
            <li>
              <strong className="text-gray-900">2.</strong> Click
              <strong className="text-gray-900"> Calculate Age</strong>.
            </li>
            <li>
              <strong className="text-gray-900">3.</strong> Your age will be
              displayed in years, months, and days.
            </li>
          </ol>
        </section>

        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900">
            About this calculator
          </h2>

          <p className="mt-4 text-sm leading-7 text-gray-600">
            The ToolNoveHub Age Calculator calculates your age based on your
            date of birth and today&apos;s date. It provides the result in
            years, months, and days and also shows the approximate total number
            of days.
          </p>
        </section>
      </main>
    </div>
  );
}