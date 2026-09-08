"use client";

import { useCallback, useEffect, useState } from "react";

type Operator = "+" | "-" | "×" | "÷";

const MAX_DISPLAY_LENGTH = 16;

function formatResult(value: number): string {
  if (!Number.isFinite(value)) {
    return "Error";
  }

  if (Object.is(value, -0)) {
    return "0";
  }

  // Avoid displaying JavaScript floating-point artifacts.
  const rounded = Number.parseFloat(value.toPrecision(12));

  if (!Number.isFinite(rounded)) {
    return "Error";
  }

  const result = rounded.toString();

  if (result.length <= MAX_DISPLAY_LENGTH) {
    return result;
  }

  return rounded.toExponential(8).replace(/\.?0+e/, "e");
}

function performOperation(
  first: number,
  second: number,
  operator: Operator
): number | null {
  switch (operator) {
    case "+":
      return first + second;

    case "-":
      return first - second;

    case "×":
      return first * second;

    case "÷":
      return second === 0 ? null : first / second;

    default:
      return null;
  }
}

export default function Calculator() {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<Operator | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const [lastOperator, setLastOperator] = useState<Operator | null>(null);
  const [lastOperand, setLastOperand] = useState<number | null>(null);

  const [error, setError] = useState(false);

  const resetCalculator = useCallback(() => {
    setDisplay("0");
    setPreviousValue(null);
    setOperator(null);
    setWaitingForOperand(false);
    setLastOperator(null);
    setLastOperand(null);
    setError(false);
  }, []);

  function showError() {
    setDisplay("Error");
    setPreviousValue(null);
    setOperator(null);
    setWaitingForOperand(true);
    setLastOperator(null);
    setLastOperand(null);
    setError(true);
  }

  function inputDigit(digit: string) {
    if (error) {
      setDisplay(digit);
      setError(false);
      setWaitingForOperand(false);
      return;
    }

    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
      return;
    }

    setDisplay((current) => {
      if (current === "0") {
        return digit;
      }

      if (current.length >= MAX_DISPLAY_LENGTH) {
        return current;
      }

      return current + digit;
    });
  }

  function inputDecimal() {
    if (error) {
      setDisplay("0.");
      setError(false);
      setWaitingForOperand(false);
      return;
    }

    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
      return;
    }

    if (!display.includes(".")) {
      setDisplay((current) => {
        if (current.length >= MAX_DISPLAY_LENGTH) {
          return current;
        }

        return `${current}.`;
      });
    }
  }

  function deleteLast() {
    if (error || waitingForOperand) {
      return;
    }

    setDisplay((current) => {
      if (current.length <= 1) {
        return "0";
      }

      const next = current.slice(0, -1);

      if (next === "-" || next === "") {
        return "0";
      }

      return next;
    });
  }

  function toggleSign() {
    if (error || display === "0") {
      return;
    }

    setDisplay((current) =>
      current.startsWith("-") ? current.slice(1) : `-${current}`
    );
  }

  function calculatePercent() {
    if (error) {
      return;
    }

    const value = Number(display);

    if (!Number.isFinite(value)) {
      showError();
      return;
    }

    /*
     * When an operator is active, percentage is calculated from
     * the current value as a percentage of the previous value.
     *
     * Example:
     * 200 + 10% = 220
     */
    if (previousValue !== null && operator && !waitingForOperand) {
      const percentage = (previousValue * value) / 100;
      setDisplay(formatResult(percentage));
      return;
    }

    setDisplay(formatResult(value / 100));
  }

  function chooseOperator(nextOperator: Operator) {
    if (error) {
      return;
    }

    const inputValue = Number(display);

    if (!Number.isFinite(inputValue)) {
      showError();
      return;
    }

    setLastOperator(null);
    setLastOperand(null);

    if (operator && previousValue !== null) {
      if (waitingForOperand) {
        // Allow changing the selected operator without performing
        // a calculation.
        setOperator(nextOperator);
        return;
      }

      const result = performOperation(
        previousValue,
        inputValue,
        operator
      );

      if (result === null) {
        showError();
        return;
      }

      const formatted = formatResult(result);

      setDisplay(formatted);
      setPreviousValue(result);
      setOperator(nextOperator);
      setWaitingForOperand(true);
      return;
    }

    setPreviousValue(inputValue);
    setOperator(nextOperator);
    setWaitingForOperand(true);
  }

  function performCalculation() {
    if (error) {
      return;
    }

    /*
     * Repeated equals:
     * 5 + 2 = 7 = 9 = 11
     */
    if (
      operator === null &&
      lastOperator !== null &&
      lastOperand !== null
    ) {
      const currentValue = Number(display);

      if (!Number.isFinite(currentValue)) {
        showError();
        return;
      }

      const result = performOperation(
        currentValue,
        lastOperand,
        lastOperator
      );

      if (result === null) {
        showError();
        return;
      }

      setDisplay(formatResult(result));
      setWaitingForOperand(true);
      return;
    }

    if (operator === null || previousValue === null) {
      return;
    }

    const inputValue = Number(display);

    if (!Number.isFinite(inputValue)) {
      showError();
      return;
    }

    const result = performOperation(
      previousValue,
      inputValue,
      operator
    );

    if (result === null) {
      showError();
      return;
    }

    setDisplay(formatResult(result));

    setLastOperator(operator);
    setLastOperand(inputValue);

    setPreviousValue(null);
    setOperator(null);
    setWaitingForOperand(true);
  }

  function handleButton(value: string) {
    if (/^\d$/.test(value)) {
      inputDigit(value);
      return;
    }

    if (value === ".") {
      inputDecimal();
      return;
    }

    if (value === "C") {
      resetCalculator();
      return;
    }

    if (value === "DEL") {
      deleteLast();
      return;
    }

    if (value === "±") {
      toggleSign();
      return;
    }

    if (value === "%") {
      calculatePercent();
      return;
    }

    if (
      value === "+" ||
      value === "-" ||
      value === "×" ||
      value === "÷"
    ) {
      chooseOperator(value);
      return;
    }

    if (value === "=") {
      performCalculation();
    }
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const { key } = event;

      if (/^\d$/.test(key)) {
        event.preventDefault();
        inputDigit(key);
        return;
      }

      if (key === ".") {
        event.preventDefault();
        inputDecimal();
        return;
      }

      if (key === "+") {
        event.preventDefault();
        chooseOperator("+");
        return;
      }

      if (key === "-") {
        event.preventDefault();
        chooseOperator("-");
        return;
      }

      if (key === "*" || key.toLowerCase() === "x") {
        event.preventDefault();
        chooseOperator("×");
        return;
      }

      if (key === "/") {
        event.preventDefault();
        chooseOperator("÷");
        return;
      }

      if (key === "%") {
        event.preventDefault();
        calculatePercent();
        return;
      }

      if (key === "Enter" || key === "=") {
        event.preventDefault();
        performCalculation();
        return;
      }

      if (key === "Backspace") {
        event.preventDefault();
        deleteLast();
        return;
      }

      if (key === "Escape" || key.toLowerCase() === "c") {
        event.preventDefault();
        resetCalculator();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  const buttons = [
    ["C", "DEL", "%", "÷"],
    ["7", "8", "9", "×"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["±", "0", ".", "="],
  ];

  const buttonLabel: Record<string, string> = {
    C: "Clear calculator",
    DEL: "Delete last digit",
    "%": "Percentage",
    "÷": "Divide",
    "×": "Multiply",
    "-": "Subtract",
    "+": "Add",
    "±": "Toggle positive or negative",
    ".": "Decimal point",
    "=": "Calculate result",
  };

  return (
    <div>
      {/* Calculator */}
      <section
        className="px-4 py-10 sm:px-6 lg:px-8"
        aria-label="Online calculator"
      >
        <div className="mx-auto max-w-md">
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            {/* Display */}
            <div className="bg-gray-950 p-5">
              <div
                className="min-h-[88px] overflow-x-auto whitespace-nowrap text-right text-4xl font-semibold tracking-tight text-white"
                aria-live="polite"
                aria-atomic="true"
                aria-label={`Calculator display: ${display}`}
              >
                {display}
              </div>
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-4 gap-3 p-4">
              {buttons.flat().map((button) => {
                const isOperator = [
                  "+",
                  "-",
                  "×",
                  "÷",
                  "=",
                ].includes(button);

                const isAction = [
                  "C",
                  "DEL",
                  "%",
                  "±",
                ].includes(button);

                const isEquals = button === "=";

                return (
                  <button
                    key={button}
                    type="button"
                    onClick={() => handleButton(button)}
                    aria-label={buttonLabel[button] ?? button}
                    className={[
                      "flex h-14 items-center justify-center rounded-xl text-lg font-semibold transition",
                      "active:scale-[0.98]",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
                      isEquals
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : isOperator
                          ? "bg-blue-50 text-blue-700 hover:bg-blue-100"
                          : isAction
                            ? "bg-gray-100 text-gray-800 hover:bg-gray-200"
                            : "border border-gray-200 bg-white text-gray-900 hover:bg-gray-50",
                    ].join(" ")}
                  >
                    {button}
                  </button>
                );
              })}
            </div>
          </div>

          <p className="mt-4 text-center text-sm text-gray-500">
            Keyboard supported: numbers, +, −, ×, ÷, %, Enter,
            Backspace, and Escape.
          </p>
        </div>
      </section>

      {/* About */}
      <section className="border-t border-gray-200 bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-900">
            Free online calculator
          </h2>

          <p className="mt-4 leading-7 text-gray-600">
            ToolNoveHub&apos;s online calculator is designed for
            quick everyday arithmetic. Use it to add, subtract,
            multiply, and divide numbers, work with decimals,
            calculate percentages, and correct entries without
            starting over.
          </p>

          <p className="mt-4 leading-7 text-gray-600">
            The calculator runs directly in your web browser, so
            there is no need to install an application or create an
            account before using it.
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
              <h3 className="font-semibold text-gray-900">
                Basic arithmetic
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Add, subtract, multiply, and divide numbers for
                everyday calculations.
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
              <h3 className="font-semibold text-gray-900">
                Percentages
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Convert values into percentages and use percentage
                calculations during common arithmetic tasks.
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
              <h3 className="font-semibold text-gray-900">
                Decimal support
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Enter decimal numbers when working with prices,
                measurements, averages, or other fractional values.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Percentage explanation */}
      <section className="bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-900">
            How percentage calculations work
          </h2>

          <p className="mt-4 leading-7 text-gray-600">
            A percentage represents a value out of 100. For example,
            25% means 25 out of every 100, which is equivalent to
            0.25 as a decimal.
          </p>

          <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6">
            <p className="font-semibold text-gray-900">
              Example
            </p>

            <p className="mt-3 text-gray-600">
              To calculate 20% of 150, enter:
            </p>

            <p className="mt-3 rounded-lg bg-gray-50 p-4 font-mono text-sm text-gray-900">
              150 × 20%
            </p>

            <p className="mt-3 text-gray-600">
              The result is 30.
            </p>
          </div>
        </div>
      </section>

      {/* How to use */}
      <section className="bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-900">
            How to use the calculator
          </h2>

          <ol className="mt-6 space-y-5 text-gray-600">
            <li>
              <strong className="text-gray-900">
                1. Enter the first number:
              </strong>{" "}
              Select the number buttons or use your keyboard.
            </li>

            <li>
              <strong className="text-gray-900">
                2. Select an operation:
              </strong>{" "}
              Choose addition, subtraction, multiplication, or
              division.
            </li>

            <li>
              <strong className="text-gray-900">
                3. Enter the second number:
              </strong>{" "}
              Enter the next value after selecting an operation.
            </li>

            <li>
              <strong className="text-gray-900">
                4. Press equals:
              </strong>{" "}
              Select = or press Enter to calculate the result.
            </li>

            <li>
              <strong className="text-gray-900">
                5. Correct an entry:
              </strong>{" "}
              Use DEL or Backspace to remove the last digit.
            </li>

            <li>
              <strong className="text-gray-900">
                6. Start again:
              </strong>{" "}
              Select C or press Escape to clear the calculator.
            </li>
          </ol>
        </div>
      </section>

      {/* Practical uses */}
      <section className="bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-900">
            Common uses
          </h2>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <h3 className="font-semibold text-gray-900">
                Students
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Quickly check arithmetic while working through
                homework, assignments, and study exercises.
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <h3 className="font-semibold text-gray-900">
                Everyday budgeting
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Calculate totals, differences, discounts, and
                simple percentage values.
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <h3 className="font-semibold text-gray-900">
                Shopping
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Work out prices, quantities, percentage discounts,
                and other quick calculations.
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <h3 className="font-semibold text-gray-900">
                Work and business
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Perform quick arithmetic without opening a desktop
                calculator or separate application.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Keyboard shortcuts */}
      <section className="bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-900">
            Keyboard shortcuts
          </h2>

          <div className="mt-6 overflow-hidden rounded-xl border border-gray-200">
            <div className="grid grid-cols-2 border-b border-gray-200 bg-gray-50 px-5 py-3 text-sm font-semibold text-gray-900">
              <span>Key</span>
              <span>Action</span>
            </div>

            {[
              ["0–9", "Enter numbers"],
              [".", "Enter a decimal point"],
              ["+", "-", "Add or subtract"],
              ["*", "/", "Multiply or divide"],
              ["%", "Calculate percentage"],
              ["Enter", "Calculate result"],
              ["Backspace", "Delete last digit"],
              ["Escape", "Clear calculator"],
            ].map((item, index) => (
              <div
                key={`${item[0]}-${index}`}
                className="grid grid-cols-2 border-b border-gray-100 px-5 py-3 text-sm last:border-b-0"
              >
                <span className="font-mono text-gray-900">
                  {item[0]}
                </span>

                <span className="text-gray-600">
                  {item[1] ?? item[0]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy */}
      <section className="bg-white px-4 pb-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-xl border border-blue-100 bg-blue-50 p-6">
          <h2 className="font-semibold text-blue-900">
            Browser-based calculations
          </h2>

          <p className="mt-2 text-sm leading-6 text-blue-800">
            Calculator operations are performed directly in your
            browser. No account is required, and the calculator does
            not need to upload the numbers you enter to a server in
            order to perform its calculations.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-gray-200 bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-900">
            Frequently asked questions
          </h2>

          <div className="mt-6 space-y-5">
            <details className="rounded-xl border border-gray-200 bg-white p-5">
              <summary className="cursor-pointer font-semibold text-gray-900">
                Is this calculator free?
              </summary>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                Yes. The ToolNoveHub online calculator is available
                for free use in your browser.
              </p>
            </details>

            <details className="rounded-xl border border-gray-200 bg-white p-5">
              <summary className="cursor-pointer font-semibold text-gray-900">
                Can I use the calculator on my phone?
              </summary>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                Yes. The calculator interface is designed to work
                on desktop, tablet, and mobile screens.
              </p>
            </details>

            <details className="rounded-xl border border-gray-200 bg-white p-5">
              <summary className="cursor-pointer font-semibold text-gray-900">
                Can I use my keyboard?
              </summary>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                Yes. Number keys, arithmetic operators, percentage,
                Enter, Backspace, and Escape are supported.
              </p>
            </details>

            <details className="rounded-xl border border-gray-200 bg-white p-5">
              <summary className="cursor-pointer font-semibold text-gray-900">
                What happens if I divide by zero?
              </summary>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                The calculator displays an error instead of
                returning an invalid numerical result.
              </p>
            </details>

            <details className="rounded-xl border border-gray-200 bg-white p-5">
              <summary className="cursor-pointer font-semibold text-gray-900">
                Do I need to install anything?
              </summary>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                No. Open the calculator in a modern web browser and
                start calculating.
              </p>
            </details>
          </div>
        </div>
      </section>
    </div>
  );
}