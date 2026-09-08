"use client";

import { useState } from "react";
import { Calendar, Calculator, RotateCcw } from "lucide-react";

type AgeResult = {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  nextBirthday: Date;
  daysUntilBirthday: number;
};

function getTodayDate(): Date {
  const today = new Date();

  return new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );
}

function getDateString(date: Date): string {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
}

function isLeapYear(year: number): boolean {
  return (
    year % 4 === 0 &&
    (year % 100 !== 0 || year % 400 === 0)
  );
}

/**
 * Returns the birthday date for a specific year.
 *
 * February 29 birthdays use February 28 during non-leap years
 * so that the birthday is always represented by a valid date.
 */
function getBirthdayDate(
  year: number,
  birthMonth: number,
  birthDay: number,
): Date {
  if (
    birthMonth === 1 &&
    birthDay === 29 &&
    !isLeapYear(year)
  ) {
    return new Date(year, 1, 28);
  }

  return new Date(year, birthMonth, birthDay);
}

/**
 * Calculates the number of calendar days between two dates.
 *
 * UTC is used here to avoid daylight-saving-time differences
 * affecting the calendar-day calculation.
 */
function getCalendarDayDifference(
  earlierDate: Date,
  laterDate: Date,
): number {
  const earlierUTC = Date.UTC(
    earlierDate.getFullYear(),
    earlierDate.getMonth(),
    earlierDate.getDate(),
  );

  const laterUTC = Date.UTC(
    laterDate.getFullYear(),
    laterDate.getMonth(),
    laterDate.getDate(),
  );

  return Math.round(
    (laterUTC - earlierUTC) /
      (1000 * 60 * 60 * 24),
  );
}

function calculateAge(
  dateOfBirth: string,
): AgeResult | null {
  if (!dateOfBirth) {
    return null;
  }

  const parts = dateOfBirth.split("-");

  if (parts.length !== 3) {
    return null;
  }

  const year = Number(parts[0]);
  const month = Number(parts[1]);
  const day = Number(parts[2]);

  if (
    !Number.isInteger(year) ||
    !Number.isInteger(month) ||
    !Number.isInteger(day)
  ) {
    return null;
  }

  if (
    year < 1 ||
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > 31
  ) {
    return null;
  }

  const birthDate = new Date(
    year,
    month - 1,
    day,
  );

  const today = getTodayDate();

  /*
   * JavaScript normalizes invalid dates such as
   * February 31 into another month. Compare the
   * resulting date components to reject such input.
   */
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

  /*
   * Calculate complete calendar years, months and days.
   */
  let years =
    today.getFullYear() -
    birthDate.getFullYear();

  let months =
    today.getMonth() -
    birthDate.getMonth();

  let days =
    today.getDate() -
    birthDate.getDate();

  /*
   * If the current day is before the birth day,
   * borrow days from the previous calendar month.
   */
  if (days < 0) {
    months--;

    const daysInPreviousMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      0,
    ).getDate();

    days += daysInPreviousMonth;
  }

  /*
   * If the current month is before the birth month,
   * borrow one year.
   */
  if (months < 0) {
    years--;
    months += 12;
  }

  const totalDays = getCalendarDayDifference(
    birthDate,
    today,
  );

  const birthMonth = birthDate.getMonth();
  const birthDay = birthDate.getDate();

  /*
   * Determine the next birthday.
   */
  let nextBirthdayYear =
    today.getFullYear();

  let nextBirthday = getBirthdayDate(
    nextBirthdayYear,
    birthMonth,
    birthDay,
  );

  /*
   * If today's date is after this year's birthday,
   * use next year.
   */
  if (nextBirthday < today) {
    nextBirthdayYear++;

    nextBirthday = getBirthdayDate(
      nextBirthdayYear,
      birthMonth,
      birthDay,
    );
  }

  const daysUntilBirthday =
    getCalendarDayDifference(
      today,
      nextBirthday,
    );

  return {
    years,
    months,
    days,
    totalDays,
    nextBirthday,
    daysUntilBirthday,
  };
}

export default function AgeCalculator() {
  const [dateOfBirth, setDateOfBirth] =
    useState("");

  const [result, setResult] =
    useState<AgeResult | null>(null);

  const [error, setError] =
    useState("");

  const today = getTodayDate();

  const maxDate = getDateString(today);

  function calculate() {
    setError("");
    setResult(null);

    if (!dateOfBirth) {
      setError(
        "Please select your date of birth.",
      );
      return;
    }

    const calculatedAge =
      calculateAge(dateOfBirth);

    if (!calculatedAge) {
      setError(
        "Please enter a valid date of birth that is not in the future.",
      );
      return;
    }

    setResult(calculatedAge);
  }

  function reset() {
    setDateOfBirth("");
    setResult(null);
    setError("");
  }

  function handleDateChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    setDateOfBirth(event.target.value);
    setResult(null);
    setError("");
  }

  function handleKeyDown(
    event: React.KeyboardEvent<HTMLInputElement>,
  ) {
    if (event.key === "Enter") {
      calculate();
    }
  }

  const formattedBirthday = result
    ? result.nextBirthday.toLocaleDateString(
        "en-US",
        {
          month: "long",
          day: "numeric",
          year: "numeric",
        },
      )
    : "";

  return (
    <div className="space-y-8">
      {/* Calculator */}
      <section
        className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
        aria-labelledby="age-calculator-heading"
      >
        <h2
          id="age-calculator-heading"
          className="sr-only"
        >
          Age calculator
        </h2>

        <div className="mx-auto max-w-xl">
          <label
            htmlFor="date-of-birth"
            className="block text-sm font-semibold text-gray-900"
          >
            Date of birth
          </label>

          <div className="relative mt-2">
            <Calendar
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
              aria-hidden="true"
            />

            <input
              id="date-of-birth"
              type="date"
              value={dateOfBirth}
              max={maxDate}
              onChange={handleDateChange}
              onKeyDown={handleKeyDown}
              aria-describedby="date-of-birth-help"
              className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-11 pr-4 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <p
            id="date-of-birth-help"
            className="mt-2 text-sm leading-6 text-gray-500"
          >
            Select your birth date. Future dates
            cannot be used.
          </p>

          {error && (
            <div
              className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700"
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
              className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              <Calculator
                className="mr-2 h-4 w-4"
                aria-hidden="true"
              />
              Calculate Age
            </button>

            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-5 py-3.5 text-sm font-semibold text-gray-800 transition hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              <RotateCcw
                className="mr-2 h-4 w-4"
                aria-hidden="true"
              />
              Reset
            </button>
          </div>
        </div>
      </section>

      {/* Result */}
      {result && (
        <section
          className="rounded-2xl border border-blue-100 bg-blue-50 p-6 sm:p-8"
          aria-labelledby="age-result-heading"
          aria-live="polite"
        >
          <div className="text-center">
            <p
              id="age-result-heading"
              className="text-sm font-semibold text-blue-700"
            >
              Your current age
            </p>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <ResultCard
                value={result.years.toLocaleString(
                  "en-US",
                )}
                label="Years"
              />

              <ResultCard
                value={result.months.toLocaleString(
                  "en-US",
                )}
                label="Months"
              />

              <ResultCard
                value={result.days.toLocaleString(
                  "en-US",
                )}
                label="Days"
              />
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <InfoResultCard
                value={result.totalDays.toLocaleString(
                  "en-US",
                )}
                label="Total elapsed days"
              />

              <InfoResultCard
                value={
                  result.daysUntilBirthday === 0
                    ? "Today"
                    : `${result.daysUntilBirthday.toLocaleString(
                        "en-US",
                      )} days`
                }
                label={
                  result.daysUntilBirthday === 0
                    ? "Next birthday"
                    : "Until next birthday"
                }
              />
            </div>

            <div className="mt-4 rounded-xl bg-white px-5 py-4 shadow-sm">
              <p className="text-sm leading-6 text-gray-600">
                Your next birthday is{" "}
                <strong className="font-semibold text-gray-900">
                  {formattedBirthday}
                </strong>
                .
              </p>
            </div>
          </div>
        </section>
      )}

      {/* About */}
      <section className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
        <h2 className="text-xl font-bold text-gray-900">
          About the Age Calculator
        </h2>

        <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
          <p>
            The ToolNoveHub Age Calculator calculates
            your calendar age from a date of birth to
            today&apos;s date. It displays the result as
            complete years, remaining months, and
            remaining days.
          </p>

          <p>
            Instead of simply dividing the number of
            elapsed days by 365, the calculator works
            with calendar years, months, and days. This
            makes the result easier to understand for
            birthdays and everyday age calculations.
          </p>

          <p>
            The calculator also shows the total number
            of elapsed calendar days and the date of
            your next birthday.
          </p>
        </div>
      </section>

      {/* How to use */}
      <section className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
        <h2 className="text-xl font-bold text-gray-900">
          How to use the Age Calculator
        </h2>

        <ol className="mt-5 space-y-4 text-sm leading-7 text-gray-600">
          <li>
            <strong className="text-gray-900">
              1.
            </strong>{" "}
            Select your date of birth using the date
            picker.
          </li>

          <li>
            <strong className="text-gray-900">
              2.
            </strong>{" "}
            Select{" "}
            <strong className="text-gray-900">
              Calculate Age
            </strong>
            .
          </li>

          <li>
            <strong className="text-gray-900">
              3.
            </strong>{" "}
            Review your age in years, months, and
            days.
          </li>

          <li>
            <strong className="text-gray-900">
              4.
            </strong>{" "}
            Review the total elapsed days and next
            birthday information.
          </li>

          <li>
            <strong className="text-gray-900">
              5.
            </strong>{" "}
            Select{" "}
            <strong className="text-gray-900">
              Reset
            </strong>{" "}
            to perform another calculation.
          </li>
        </ol>
      </section>

      {/* How it works */}
      <section className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
        <h2 className="text-xl font-bold text-gray-900">
          How is age calculated?
        </h2>

        <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
          <p>
            The calculator compares the selected date
            of birth with today&apos;s local calendar
            date. It determines the difference in
            complete years, months, and days.
          </p>

          <p>
            If the current day is earlier than the birth
            day, the calculation borrows days from the
            previous calendar month. If the current
            month is earlier than the birth month, one
            year is borrowed and the month difference is
            adjusted.
          </p>

          <p>
            This produces a calendar-based result such
            as{" "}
            <strong className="text-gray-900">
              25 years, 4 months, and 12 days
            </strong>{" "}
            rather than treating every year as exactly
            365 days.
          </p>
        </div>
      </section>

      {/* Birthday notes */}
      <section className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
        <h2 className="text-xl font-bold text-gray-900">
          Birthdays and leap years
        </h2>

        <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
          <p>
            Leap years contain February 29, while
            ordinary years do not. The calculator
            validates the original date of birth and
            uses calendar-day calculations for elapsed
            days.
          </p>

          <p>
            If the date of birth is February 29, the
            calculator uses February 28 as the birthday
            date in a non-leap year so that the next
            birthday remains a valid calendar date.
          </p>

          <p>
            Different jurisdictions may use different
            rules for specific legal or administrative
            purposes involving February 29 birthdays.
          </p>

          <p>
            For official age, eligibility, legal, or
            administrative decisions, always follow the
            rules and documentation of the relevant
            authority.
          </p>
        </div>
      </section>

      {/* Examples */}
      <section className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
        <h2 className="text-xl font-bold text-gray-900">
          Age calculation examples
        </h2>

        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <InfoCard
            title="Birthday has passed"
            text="When your birthday has already occurred this year, the calculator counts the completed year and the remaining months and days."
          />

          <InfoCard
            title="Birthday is coming"
            text="When your birthday has not occurred yet this year, the completed-year count is adjusted before the remaining months and days are calculated."
          />

          <InfoCard
            title="Leap-day birthday"
            text="A February 29 birth date is validated as a real calendar date, with February 28 used for the birthday in non-leap years."
          />
        </div>
      </section>

      {/* Important notes */}
      <section className="rounded-2xl border border-gray-200 bg-gray-50 p-6 sm:p-8">
        <h2 className="text-xl font-bold text-gray-900">
          Important notes
        </h2>

        <ul className="mt-5 space-y-3 text-sm leading-7 text-gray-600">
          <li>
            • The calculator uses your local calendar
            date when determining today&apos;s date.
          </li>

          <li>
            • Future dates are not accepted as dates of
            birth.
          </li>

          <li>
            • Invalid calendar dates are rejected.
          </li>

          <li>
            • Total days use calendar-day differences
            rather than assuming every day has exactly
            the same elapsed duration.
          </li>

          <li>
            • Leap-day birthdays are handled using a
            documented February 28 rule in non-leap
            years.
          </li>

          <li>
            • For official eligibility or legal
            requirements, use the relevant official
            documentation or authority.
          </li>
        </ul>
      </section>

      {/* Privacy */}
      <section className="rounded-2xl border border-blue-100 bg-blue-50 p-6 sm:p-8">
        <h2 className="text-xl font-bold text-blue-900">
          Browser-based calculation
        </h2>

        <p className="mt-4 text-sm leading-7 text-blue-800">
          The age calculation is performed directly in
          your web browser. No account is required, and
          the date entered into this calculator does not
          need to be uploaded to a server for the
          calculation itself.
        </p>
      </section>
    </div>
  );
}

function ResultCard({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-xl bg-white px-5 py-5 shadow-sm">
      <div className="text-3xl font-bold text-gray-900">
        {value}
      </div>

      <div className="mt-1 text-xs font-medium uppercase tracking-wide text-gray-500">
        {label}
      </div>
    </div>
  );
}

function InfoResultCard({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-xl bg-white px-5 py-4 shadow-sm">
      <div className="text-xl font-bold text-gray-900">
        {value}
      </div>

      <div className="mt-1 text-xs font-medium uppercase tracking-wide text-gray-500">
        {label}
      </div>
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
    <article className="rounded-xl border border-gray-200 bg-gray-50 p-5">
      <h3 className="font-semibold text-gray-900">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-gray-600">
        {text}
      </p>
    </article>
  );
}