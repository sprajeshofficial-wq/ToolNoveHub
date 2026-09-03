"use client";

import { useState } from "react";

type Operator = "+" | "-" | "×" | "÷";

export default function CalculatorPage() {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<Operator | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  function inputDigit(digit: string) {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
      return;
    }

    setDisplay((current) =>
      current === "0" ? digit : current + digit
    );
  }

  function inputDecimal() {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
      return;
    }

    if (!display.includes(".")) {
      setDisplay((current) => current + ".");
    }
  }

  function clearCalculator() {
    setDisplay("0");
    setPreviousValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  }

  function deleteLast() {
    if (waitingForOperand) return;

    setDisplay((current) => {
      if (current.length <= 1) return "0";

      const next = current.slice(0, -1);

      if (next === "-" || next === "") {
        return "0";
      }

      return next;
    });
  }

  function calculate(
    first: number,
    second: number,
    selectedOperator: Operator
  ) {
    switch (selectedOperator) {
      case "+":
        return first + second;

      case "-":
        return first - second;

      case "×":
        return first * second;

      case "÷":
        return second === 0 ? null : first / second;

      default:
        return second;
    }
  }

  function formatResult(value: number) {
    if (!Number.isFinite(value)) {
      return "Error";
    }

    return Number.parseFloat(value.toPrecision(12)).toString();
  }

  function chooseOperator(nextOperator: Operator) {
    const inputValue = Number(display);

    if (operator && previousValue !== null && !waitingForOperand) {
      const result = calculate(
        previousValue,
        inputValue,
        operator
      );

      if (result === null) {
        setDisplay("Error");
        setPreviousValue(null);
        setOperator(null);
        setWaitingForOperand(true);
        return;
      }

      setDisplay(formatResult(result));
      setPreviousValue(result);
    } else {
      setPreviousValue(inputValue);
    }

    setOperator(nextOperator);
    setWaitingForOperand(true);
  }

  function performCalculation() {
    if (operator === null || previousValue === null) {
      return;
    }

    const inputValue = Number(display);

    const result = calculate(
      previousValue,
      inputValue,
      operator
    );

    if (result === null) {
      setDisplay("Error");
      setPreviousValue(null);
      setOperator(null);
      setWaitingForOperand(true);
      return;
    }

    setDisplay(formatResult(result));
    setPreviousValue(null);
    setOperator(null);
    setWaitingForOperand(true);
  }

  function toggleSign() {
    if (display === "0" || display === "Error") {
      return;
    }

    setDisplay((current) =>
      current.startsWith("-")
        ? current.slice(1)
        : `-${current}`
    );
  }

  function calculatePercent() {
    const value = Number(display);

    if (!Number.isFinite(value)) {
      return;
    }

    setDisplay(formatResult(value / 100));
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
      clearCalculator();
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

  const buttons = [
    ["C", "DEL", "%", "÷"],
    ["7", "8", "9", "×"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["±", "0", ".", "="],
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-12 text-center sm:px-6 lg:px-8 lg:py-16">
          <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
            Calculator
          </span>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Online Calculator
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
            A simple free online calculator for everyday arithmetic,
            percentages, and basic calculations.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md">
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            {/* Display */}
            <div className="bg-gray-950 p-5">
              <div
                className="min-h-[88px] overflow-x-auto text-right text-4xl font-semibold tracking-tight !text-white"
                aria-live="polite"
                aria-label={`Calculator display: ${display}`}
              >
                {display}
              </div>
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-4 gap-3 p-4">
              {buttons.flat().map((button) => {
                const isOperator =
                  ["+", "-", "×", "÷", "="].includes(button);

                const isAction =
                  ["C", "DEL", "%", "±"].includes(button);

                const isEquals = button === "=";

                return (
                  <button
                    key={button}
                    type="button"
                    onClick={() => handleButton(button)}
                    className={[
                      "flex h-14 items-center justify-center rounded-xl text-lg font-semibold transition active:scale-[0.98]",
                      isEquals
                        ? "bg-blue-600 !text-white hover:bg-blue-700"
                        : isOperator
                          ? "bg-blue-50 !text-blue-700 hover:bg-blue-100"
                          : isAction
                            ? "bg-gray-100 !text-gray-800 hover:bg-gray-200"
                            : "border border-gray-200 bg-white !text-gray-900 hover:bg-gray-50",
                    ].join(" ")}
                    aria-label={
                      button === "DEL"
                        ? "Delete last digit"
                        : button === "±"
                          ? "Toggle positive or negative"
                          : button
                    }
                  >
                    {button}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Information */}
      <section className="border-t border-gray-200 bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-900">
            Free online calculator
          </h2>

          <p className="mt-4 leading-7 text-gray-600">
            Use this calculator for common arithmetic operations including
            addition, subtraction, multiplication, and division. You can also
            calculate percentages and work with decimal numbers.
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
              <h3 className="font-semibold text-gray-900">
                Basic arithmetic
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Perform addition, subtraction, multiplication, and division.
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
              <h3 className="font-semibold text-gray-900">
                Percentage
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Quickly convert a number into its percentage value.
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
              <h3 className="font-semibold text-gray-900">
                Browser-based
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Calculations are performed directly in your browser.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How to use */}
      <section className="bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-900">
            How to use the calculator
          </h2>

          <ol className="mt-6 space-y-4 text-gray-600">
            <li>
              <strong className="text-gray-900">1. Enter a number:</strong>{" "}
              Select the number buttons you need.
            </li>

            <li>
              <strong className="text-gray-900">2. Choose an operation:</strong>{" "}
              Select addition, subtraction, multiplication, or division.
            </li>

            <li>
              <strong className="text-gray-900">3. Complete the calculation:</strong>{" "}
              Enter the second number and press the equals button.
            </li>

            <li>
              <strong className="text-gray-900">4. Start again:</strong>{" "}
              Press the C button to clear the calculator.
            </li>
          </ol>
        </div>
      </section>

      {/* Privacy */}
      <section className="bg-white px-4 pb-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-xl border border-blue-100 bg-blue-50 p-5">
          <h2 className="font-semibold text-blue-900">
            Privacy-focused calculator
          </h2>

          <p className="mt-2 text-sm leading-6 text-blue-800">
            Calculations are performed directly in your browser. No account is
            required and calculator inputs do not need to be uploaded to a
            server.
          </p>
        </div>
      </section>
    </main>
  );
}