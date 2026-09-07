"use client";

import { useState } from "react";

type ColorValues = {
  hex: string;
  rgb: string;
  hsl: string;
};

const DEFAULT_COLOR = "#2563EB";
const EXAMPLE_COLOR = "#7C3AED";

function hexToRgb(hex: string) {
  const clean = hex.replace("#", "");

  const value = parseInt(clean, 16);

  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  let h = 0;
  let s = 0;

  const l = (max + min) / 2;

  if (max !== min) {
    const difference = max - min;

    s =
      l > 0.5
        ? difference / (2 - max - min)
        : difference / (max + min);

    switch (max) {
      case r:
        h = (g - b) / difference + (g < b ? 6 : 0);
        break;

      case g:
        h = (b - r) / difference + 2;
        break;

      default:
        h = (r - g) / difference + 4;
        break;
    }

    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function isValidHex(value: string) {
  return /^#[0-9A-Fa-f]{6}$/.test(value);
}

function getColorValues(hex: string): ColorValues {
  const normalized = hex.toUpperCase();
  const { r, g, b } = hexToRgb(normalized);
  const { h, s, l } = rgbToHsl(r, g, b);

  return {
    hex: normalized,
    rgb: `rgb(${r}, ${g}, ${b})`,
    hsl: `hsl(${h}, ${s}%, ${l}%)`,
  };
}

export default function ColorPicker() {
  const [color, setColor] = useState(DEFAULT_COLOR);
  const [copied, setCopied] = useState("");

  const validColor = isValidHex(color)
    ? color
    : DEFAULT_COLOR;

  const values = getColorValues(validColor);

  async function copyValue(value: string, type: string) {
    try {
      await navigator.clipboard.writeText(value);

      setCopied(type);

      window.setTimeout(() => {
        setCopied("");
      }, 1500);
    } catch {
      setCopied("");
    }
  }

  function handleHexChange(value: string) {
    let formatted = value.trim().toUpperCase();

    if (formatted && !formatted.startsWith("#")) {
      formatted = `#${formatted}`;
    }

    setColor(formatted.slice(0, 7));
    setCopied("");
  }

  function handleColorChange(value: string) {
    setColor(value.toUpperCase());
    setCopied("");
  }

  function handleReset() {
    setColor(DEFAULT_COLOR);
    setCopied("");
  }

  function loadExample() {
    setColor(EXAMPLE_COLOR);
    setCopied("");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-600">
              Design Tool
            </p>

            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Color Picker
            </h1>

            <p className="mt-5 text-lg leading-8 text-gray-600">
              Pick a color and instantly get its HEX, RGB, and HSL values.
              Free, simple, and easy to use.
            </p>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <section
          className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
          aria-labelledby="picker-heading"
        >
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h2
                id="picker-heading"
                className="text-lg font-semibold text-gray-900"
              >
                Choose a color
              </h2>

              <div
                className="mt-4 h-64 w-full rounded-2xl border border-gray-200 shadow-inner"
                style={{ backgroundColor: validColor }}
                role="img"
                aria-label={`Color preview for ${validColor}`}
              />

              <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end">
                <div className="flex-1">
                  <label
                    htmlFor="color-picker"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Color selector
                  </label>

                  <input
                    id="color-picker"
                    type="color"
                    value={validColor}
                    onChange={(event) =>
                      handleColorChange(event.target.value)
                    }
                    className="h-12 w-full cursor-pointer rounded-lg border border-gray-300 bg-white p-1"
                    aria-label="Select a color"
                  />
                </div>

                <div className="flex-1">
                  <label
                    htmlFor="hex-input"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    HEX value
                  </label>

                  <input
                    id="hex-input"
                    type="text"
                    value={color}
                    onChange={(event) =>
                      handleHexChange(event.target.value)
                    }
                    placeholder="#2563EB"
                    maxLength={7}
                    spellCheck={false}
                    autoComplete="off"
                    className="h-12 w-full rounded-lg border border-gray-300 px-4 font-mono text-sm uppercase outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    aria-describedby="hex-help"
                  />
                </div>
              </div>

              <p
                id="hex-help"
                className="mt-2 text-xs text-gray-500"
              >
                Enter a six-digit HEX value, for example #2563EB.
              </p>

              {!isValidHex(color) && (
                <p
                  className="mt-2 text-sm text-red-600"
                  role="alert"
                >
                  Please enter a valid 6-digit HEX color.
                </p>
              )}
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Color values
              </h2>

              <div className="mt-4 space-y-4">
                <ColorValue
                  label="HEX"
                  value={values.hex}
                  copied={copied === "HEX"}
                  onCopy={() => copyValue(values.hex, "HEX")}
                />

                <ColorValue
                  label="RGB"
                  value={values.rgb}
                  copied={copied === "RGB"}
                  onCopy={() => copyValue(values.rgb, "RGB")}
                />

                <ColorValue
                  label="HSL"
                  value={values.hsl}
                  copied={copied === "HSL"}
                  onCopy={() => copyValue(values.hsl, "HSL")}
                />
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={loadExample}
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Load Example
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="flex-1 rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Popular colors
          </h2>

          <p className="mt-2 text-gray-600">
            Click a color to load it into the picker.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <ExampleColor
              name="Blue"
              color="#2563EB"
              onClick={() => handleColorChange("#2563EB")}
            />

            <ExampleColor
              name="Purple"
              color="#7C3AED"
              onClick={() => handleColorChange("#7C3AED")}
            />

            <ExampleColor
              name="Green"
              color="#16A34A"
              onClick={() => handleColorChange("#16A34A")}
            />

            <ExampleColor
              name="Orange"
              color="#EA580C"
              onClick={() => handleColorChange("#EA580C")}
            />
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900">
            How to use the Color Picker
          </h2>

          <ol className="mt-5 space-y-4 text-gray-600">
            <li className="flex gap-3">
              <span className="font-bold text-blue-600">1.</span>
              <span>Choose a color using the color selector.</span>
            </li>

            <li className="flex gap-3">
              <span className="font-bold text-blue-600">2.</span>
              <span>
                Enter a six-digit HEX value if you already know the color.
              </span>
            </li>

            <li className="flex gap-3">
              <span className="font-bold text-blue-600">3.</span>
              <span>
                View the matching HEX, RGB, and HSL values.
              </span>
            </li>

            <li className="flex gap-3">
              <span className="font-bold text-blue-600">4.</span>
              <span>
                Copy the format you need for your website, design, or code.
              </span>
            </li>
          </ol>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900">
            HEX, RGB, and HSL explained
          </h2>

          <div className="mt-5 grid gap-6 md:grid-cols-3">
            <InfoCard
              title="HEX"
              text="HEX uses six hexadecimal characters to represent red, green, and blue color channels. It is commonly used in HTML and CSS."
            />

            <InfoCard
              title="RGB"
              text="RGB represents a color with red, green, and blue channel values. Each channel normally ranges from 0 to 255."
            />

            <InfoCard
              title="HSL"
              text="HSL represents color using hue, saturation, and lightness, which can make color relationships easier to understand."
            />
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Why use this Color Picker?
          </h2>

          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <Feature
              title="Free"
              text="Use the color picker without registration or payment."
            />

            <Feature
              title="Instant conversion"
              text="HEX, RGB, and HSL values update as soon as you choose a color."
            />

            <Feature
              title="Easy copying"
              text="Copy individual color values with one click."
            />

            <Feature
              title="Browser-based"
              text="Color selection and conversion happen directly in your browser."
            />
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Common uses
          </h2>

          <p className="mt-3 leading-7 text-gray-600">
            A color picker can be useful when building websites, designing
            graphics, choosing brand colors, creating UI components, editing
            CSS, or matching colors between design and development tools.
          </p>
        </section>

        <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Frequently asked questions
          </h2>

          <div className="mt-6 space-y-6">
            <Faq
              question="What is a HEX color?"
              answer="A HEX color is a hexadecimal representation of red, green, and blue color channels. A six-digit HEX value such as #2563EB contains three pairs of hexadecimal values."
            />

            <Faq
              question="What is the difference between RGB and HSL?"
              answer="RGB describes a color through red, green, and blue channel values. HSL describes color through hue, saturation, and lightness."
            />

            <Faq
              question="Can I enter a HEX value manually?"
              answer="Yes. Enter a six-digit HEX value such as #2563EB in the HEX field and the corresponding RGB and HSL values will be displayed."
            />

            <Faq
              question="Does the Color Picker upload my color?"
              answer="The color selection and conversions performed by this tool happen directly in your browser. No color data needs to be uploaded to a server for these conversions."
            />
          </div>
        </section>

        <section className="mt-8 pb-8 text-center">
          <h2 className="text-xl font-semibold text-gray-900">
            Privacy-focused
          </h2>

          <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-gray-600">
            This Color Picker performs color selection and conversion directly
            in your browser. No color data needs to be uploaded to a server.
          </p>
        </section>
      </main>
    </div>
  );
}

function ColorValue({
  label,
  value,
  copied,
  onCopy,
}: {
  label: string;
  value: string;
  copied: boolean;
  onCopy: () => void;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-semibold text-gray-700">
          {label}
        </span>

        <button
          type="button"
          onClick={onCopy}
          className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label={`Copy ${label} value`}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      <p className="mt-3 break-all font-mono text-base text-gray-900">
        {value}
      </p>

      <span className="sr-only" aria-live="polite">
        {copied ? `${label} value copied` : ""}
      </span>
    </div>
  );
}

function ExampleColor({
  name,
  color,
  onClick,
}: {
  name: string;
  color: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="overflow-hidden rounded-xl border border-gray-200 bg-white text-left transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      aria-label={`Select ${name}, ${color}`}
    >
      <span
        className="block h-20 w-full"
        style={{ backgroundColor: color }}
        aria-hidden="true"
      />

      <span className="block p-3">
        <span className="block text-sm font-semibold text-gray-900">
          {name}
        </span>

        <span className="mt-1 block font-mono text-xs text-gray-500">
          {color}
        </span>
      </span>
    </button>
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

      <p className="mt-3 text-sm leading-6 text-gray-600">
        {text}
      </p>
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

      <p className="mt-2 text-sm leading-6 text-gray-600">
        {text}
      </p>
    </div>
  );
}

function Faq({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  return (
    <div>
      <h3 className="font-semibold text-gray-900">{question}</h3>

      <p className="mt-2 leading-7 text-gray-600">{answer}</p>
    </div>
  );
}