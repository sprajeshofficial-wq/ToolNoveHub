"use client";

import { useState } from "react";

type AgeResult = {
  years: number;
  months: number;
  days: number;
  totalDays: number;
};

function getTodayDate() {
  const today = new Date();

  return new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );
}

function calculateAge(dateOfBirth: string): AgeResult | null {
  if (!dateOfBirth) {
    return null;
  }

  const [year, month, day] = dateOfBirth.split("-").map(Number);

  if (
    !Number.isInteger(year) ||
    !Number.isInteger(month) ||
    !Number.isInteger(day)
  ) {
    return null;
  }

  const birthDate = new Date(year, month - 1, day);
  const today = getTodayDate();

  // Prevent invalid dates such as 2026-02-31.
  if (
    birthDate.getFullYear() !== year ||
    birthDate.getMonth() !== month - 1 ||
    birthDate.getDate() !== day
  ) {
    return null;
  }

  if (birthDate > today) {
    return null;
  }

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;

    const daysInPreviousMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      0,
    ).getDate();

    days += daysInPreviousMonth;
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
  const [result, setResult] = useState<AgeResult | null>(null);
  const [error, setError] = useState("");

  const today = getTodayDate();
  const maxDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  const calculate = () => {
    setError("");
    setResult(null);

    if (!dateOfBirth) {
      setError("Please select your date of birth.");
      return;
    }

    const calculatedAge = calculateAge(dateOfBirth);

    if (!calculatedAge) {
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
      {/* Header */}
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
              Calculate your age in years, months, and days using your date of
              birth and today&apos;s date.
            </p>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Calculator */}
        <section
          className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
          aria-labelledby="calculator-heading"
        >
          <h2 id="calculator-heading" className="sr-only">
            Age calculator
          </h2>

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
              max={maxDate}
              onChange={(event) => {
                setDateOfBirth(event.target.value);
                setResult(null);
                setError("");
              }}
              aria-describedby="date-help"
              className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <p
              id="date-help"
              className="mt-2 text-sm leading-6 text-gray-500"
            >
              Select your birth date. Future dates cannot be used.
            </p>

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
                className="rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                Calculate Age
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
        {result && (
          <section
            className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-6 sm:p-8"
            aria-labelledby="result-heading"
            aria-live="polite"
          >
            <div className="text-center">
              <p
                id="result-heading"
                className="text-sm font-semibold text-blue-700"
              >
                Your current age
              </p>

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-xl bg-white px-5 py-5 shadow-sm">
                  <div className="text-3xl font-bold text-gray-900">
                    {result.years}
                  </div>

                  <div className="mt-1 text-xs font-medium uppercase tracking-wide text-gray-500">
                    Years
                  </div>
                </div>

                <div className="rounded-xl bg-white px-5 py-5 shadow-sm">
                  <div className="text-3xl font-bold text-gray-900">
                    {result.months}
                  </div>

                  <div className="mt-1 text-xs font-medium uppercase tracking-wide text-gray-500">
                    Months
                  </div>
                </div>

                <div className="rounded-xl bg-white px-5 py-5 shadow-sm">
                  <div className="text-3xl font-bold text-gray-900">
                    {result.days}
                  </div>

                  <div className="mt-1 text-xs font-medium uppercase tracking-wide text-gray-500">
                    Days
                  </div>
                </div>
              </div>

              <p className="mt-6 text-sm leading-6 text-gray-600">
                That is approximately{" "}
                <strong className="text-gray-900">
                  {result.totalDays.toLocaleString("en-US")}
                </strong>{" "}
                days old.
              </p>
            </div>
          </section>
        )}

        {/* About */}
        <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900">
            About the Age Calculator
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              The ToolNoveHub Age Calculator calculates the elapsed age from
              your date of birth to today. It displays the result as a
              combination of complete years, months, and days.
            </p>

            <p>
              The calculator can be useful when you need to quickly determine
              someone&apos;s age for everyday planning, forms, school
              activities, birthdays, eligibility checks, or general
              date-related calculations.
            </p>
          </div>
        </section>

        {/* How to use */}
        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900">
            How to use the Age Calculator
          </h2>

          <ol className="mt-5 space-y-4 text-sm leading-6 text-gray-600">
            <li>
              <strong className="text-gray-900">1.</strong>{" "}
              Select your date of birth from the date field.
            </li>

            <li>
              <strong className="text-gray-900">2.</strong>{" "}
              Select <strong className="text-gray-900">Calculate Age</strong>.
            </li>

            <li>
              <strong className="text-gray-900">3.</strong>{" "}
              Review your age in years, months, and days.
            </li>

            <li>
              <strong className="text-gray-900">4.</strong>{" "}
              The calculator also displays the approximate total number of
              elapsed days.
            </li>

            <li>
              <strong className="text-gray-900">5.</strong>{" "}
              Select <strong className="text-gray-900">Reset</strong> to start
              another calculation.
            </li>
          </ol>
        </section>

        {/* How the calculation works */}
        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900">
            How age is calculated
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              Age is calculated by comparing the selected date of birth with
              today&apos;s calendar date. The calculator first determines the
              difference in years, then adjusts the month and day values when
              the current date occurs before the corresponding birthday
              components.
            </p>

            <p>
              The result is presented as complete years, remaining months, and
              remaining days. A separate total-days figure gives an approximate
              count of the elapsed calendar days between the two dates.
            </p>
          </div>
        </section>

        {/* Examples */}
        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900">
            Age calculation examples
          </h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <article className="rounded-xl border border-gray-200 bg-gray-50 p-5">
              <h3 className="font-semibold text-gray-900">
                Birthday already passed
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                If your birthday has already occurred this year, the calculator
                counts the completed years and the remaining months and days.
              </p>
            </article>

            <article className="rounded-xl border border-gray-200 bg-gray-50 p-5">
              <h3 className="font-semibold text-gray-900">
                Birthday coming later
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                If your birthday has not yet occurred this year, the completed
                year count is adjusted accordingly.
              </p>
            </article>

            <article className="rounded-xl border border-gray-200 bg-gray-50 p-5">
              <h3 className="font-semibold text-gray-900">
                Total days
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                The result also includes the approximate total number of days
                elapsed since the selected birth date.
              </p>
            </article>
          </div>
        </section>

        {/* Privacy */}
        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900">
            Privacy and browser-based calculation
          </h2>

          <p className="mt-4 text-sm leading-7 text-gray-600">
            The age calculation is performed directly in your browser. No
            account is required, and the date entered into this calculator does
            not need to be uploaded to a server to calculate the result.
          </p>
        </section>
      </main>
    </div>
  );
}