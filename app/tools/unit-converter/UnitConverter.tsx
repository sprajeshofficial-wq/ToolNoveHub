"use client";

import { useMemo, useState } from "react";
import { ArrowRightLeft } from "lucide-react";

type Unit = {
  label: string;
  value: string;
  factor: number;
};

type Category = {
  name: string;
  units: Unit[];
};

const CATEGORIES: Record<string, Category> = {
  length: {
    name: "Length",
    units: [
      { label: "Meter", value: "meter", factor: 1 },
      { label: "Kilometer", value: "kilometer", factor: 1000 },
      { label: "Mile", value: "mile", factor: 1609.344 },
      { label: "Yard", value: "yard", factor: 0.9144 },
      { label: "Foot", value: "foot", factor: 0.3048 },
      { label: "Inch", value: "inch", factor: 0.0254 },
      { label: "Centimeter", value: "centimeter", factor: 0.01 },
      { label: "Millimeter", value: "millimeter", factor: 0.001 },
    ],
  },

  weight: {
    name: "Weight",
    units: [
      { label: "Kilogram", value: "kilogram", factor: 1 },
      { label: "Gram", value: "gram", factor: 0.001 },
      { label: "Milligram", value: "milligram", factor: 0.000001 },
      { label: "Pound", value: "pound", factor: 0.45359237 },
      { label: "Ounce", value: "ounce", factor: 0.028349523125 },
      { label: "Ton", value: "ton", factor: 907.18474 },
      { label: "Stone", value: "stone", factor: 6.35029318 },
    ],
  },

  temperature: {
    name: "Temperature",
    units: [
      { label: "Celsius", value: "celsius", factor: 0 },
      { label: "Fahrenheit", value: "fahrenheit", factor: 0 },
      { label: "Kelvin", value: "kelvin", factor: 0 },
    ],
  },

  area: {
    name: "Area",
    units: [
      { label: "Square Meter", value: "sq_meter", factor: 1 },
      {
        label: "Square Kilometer",
        value: "sq_kilometer",
        factor: 1_000_000,
      },
      {
        label: "Square Mile",
        value: "sq_mile",
        factor: 2_589_988.110336,
      },
      { label: "Acre", value: "acre", factor: 4046.8564224 },
      { label: "Hectare", value: "hectare", factor: 10_000 },
      { label: "Square Foot", value: "sq_foot", factor: 0.09290304 },
    ],
  },

  volume: {
    name: "Volume",
    units: [
      { label: "Liter", value: "liter", factor: 1 },
      { label: "Milliliter", value: "milliliter", factor: 0.001 },
      { label: "Gallon (US)", value: "gallon", factor: 3.785411784 },
      { label: "Quart (US)", value: "quart", factor: 0.946352946 },
      { label: "Pint (US)", value: "pint", factor: 0.473176473 },
      { label: "Cup (US)", value: "cup", factor: 0.2365882365 },
      {
        label: "Fluid Ounce (US)",
        value: "fl_oz",
        factor: 0.0295735295625,
      },
    ],
  },

  speed: {
    name: "Speed",
    units: [
      { label: "Kilometers per hour", value: "kmh", factor: 1 },
      { label: "Miles per hour", value: "mph", factor: 1.609344 },
      { label: "Meters per second", value: "ms", factor: 3.6 },
      { label: "Knots", value: "knots", factor: 1.852 },
      { label: "Feet per second", value: "fts", factor: 1.09728 },
    ],
  },
};

function convertTemperature(
  value: number,
  from: string,
  to: string
): number {
  let celsius: number;

  if (from === "celsius") {
    celsius = value;
  } else if (from === "fahrenheit") {
    celsius = ((value - 32) * 5) / 9;
  } else {
    celsius = value - 273.15;
  }

  if (to === "celsius") {
    return celsius;
  }

  if (to === "fahrenheit") {
    return (celsius * 9) / 5 + 32;
  }

  return celsius + 273.15;
}

function convertValue(
  value: number,
  category: string,
  from: string,
  to: string
): number {
  if (category === "temperature") {
    return convertTemperature(value, from, to);
  }

  const units = CATEGORIES[category]?.units;

  if (!units) {
    return NaN;
  }

  const fromUnit = units.find((unit) => unit.value === from);
  const toUnit = units.find((unit) => unit.value === to);

  if (!fromUnit || !toUnit) {
    return NaN;
  }

  return (value * fromUnit.factor) / toUnit.factor;
}

function formatNumber(value: number): string {
  if (!Number.isFinite(value)) {
    return "";
  }

  if (Object.is(value, -0)) {
    return "0";
  }

  const absolute = Math.abs(value);

  if (absolute !== 0 && (absolute < 0.000001 || absolute >= 1e12)) {
    return value.toExponential(8).replace(/\.?0+e/, "e");
  }

  return Number(value.toPrecision(12)).toLocaleString("en-US", {
    maximumFractionDigits: 10,
  });
}

export default function UnitConverter() {
  const [category, setCategory] = useState("length");
  const [fromUnit, setFromUnit] = useState("meter");
  const [toUnit, setToUnit] = useState("kilometer");
  const [value, setValue] = useState("1");

  const currentCategory = CATEGORIES[category];
  const currentUnits = currentCategory.units;

  const result = useMemo(() => {
    if (value.trim() === "") {
      return null;
    }

    const numericValue = Number(value);

    if (!Number.isFinite(numericValue)) {
      return null;
    }

    const converted = convertValue(
      numericValue,
      category,
      fromUnit,
      toUnit
    );

    return Number.isFinite(converted) ? converted : null;
  }, [value, category, fromUnit, toUnit]);

  const fromLabel =
    currentUnits.find((unit) => unit.value === fromUnit)?.label ??
    fromUnit;

  const toLabel =
    currentUnits.find((unit) => unit.value === toUnit)?.label ??
    toUnit;

  function changeCategory(nextCategory: string) {
    const units = CATEGORIES[nextCategory]?.units;

    if (!units) {
      return;
    }

    setCategory(nextCategory);
    setFromUnit(units[0].value);
    setToUnit(units[1]?.value ?? units[0].value);
  }

  function swapUnits() {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  }

  function clearAll() {
    setValue("");
  }

  return (
    <div className="space-y-6">
      <div>
        <label
          htmlFor="unit-category"
          className="mb-2 block text-sm font-semibold text-slate-700"
        >
          Unit category
        </label>

        <select
          id="unit-category"
          value={category}
          onChange={(event) => changeCategory(event.target.value)}
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        >
          {Object.entries(CATEGORIES).map(([key, item]) => (
            <option key={key} value={key}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="unit-value"
          className="mb-2 block text-sm font-semibold text-slate-700"
        >
          Value to convert
        </label>

        <input
          id="unit-value"
          type="number"
          inputMode="decimal"
          step="any"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Enter a value"
          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          aria-describedby="unit-value-help"
        />

        <p
          id="unit-value-help"
          className="mt-2 text-xs text-slate-500"
        >
          Enter positive or negative values where the selected unit supports
          them, such as negative temperatures.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-end">
        <div>
          <label
            htmlFor="from-unit"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            From
          </label>

          <select
            id="from-unit"
            value={fromUnit}
            onChange={(event) => setFromUnit(event.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          >
            {currentUnits.map((unit) => (
              <option key={unit.value} value={unit.value}>
                {unit.label}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={swapUnits}
          className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          aria-label={`Swap ${fromLabel} and ${toLabel}`}
          title="Swap units"
        >
          <ArrowRightLeft className="h-5 w-5" aria-hidden="true" />
        </button>

        <div>
          <label
            htmlFor="to-unit"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            To
          </label>

          <select
            id="to-unit"
            value={toUnit}
            onChange={(event) => setToUnit(event.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          >
            {currentUnits.map((unit) => (
              <option key={unit.value} value={unit.value}>
                {unit.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {result !== null ? (
        <div
          className="rounded-2xl border border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50 p-5"
          aria-live="polite"
        >
          <p className="text-sm text-slate-600">
            {formatNumber(Number(value))} {fromLabel}
          </p>

          <p className="mt-1 break-words text-2xl font-bold text-indigo-700">
            {formatNumber(result)} {toLabel}
          </p>
        </div>
      ) : (
        <div
          className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
          aria-live="polite"
        >
          <p className="text-sm text-slate-500">
            Enter a valid number to see the converted result.
          </p>
        </div>
      )}

      <button
        type="button"
        onClick={clearAll}
        disabled={value === ""}
        className="w-full rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
      >
        Clear
      </button>

      <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-4">
        <p className="text-sm leading-6 text-slate-600">
          <span className="font-semibold text-indigo-700">
            Conversion note:
          </span>{" "}
          Results are calculated locally in your browser using standard unit
          conversion factors and temperature formulas. Displayed values may
          be rounded for readability.
        </p>
      </div>
    </div>
  );
}