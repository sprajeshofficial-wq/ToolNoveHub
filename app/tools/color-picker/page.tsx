"use client";

import { useState } from "react";

type ColorValues = {
  hex: string;
  rgb: string;
  hsl: string;
};

const DEFAULT_COLOR = "#2563EB";

function hexToRgb(hex: string) {
  const clean = hex.replace("#", "");

  const bigint = parseInt(clean, 16);

  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
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
    const d = max - min;

    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      default:
        h = (r - g) / d + 4;
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

function getColorValues(hex: string): ColorValues {
  const { r, g, b } = hexToRgb(hex);
  const { h, s, l } = rgbToHsl(r, g, b);

  return {
    hex: hex.toUpperCase(),
    rgb: `rgb(${r}, ${g}, ${b})`,
    hsl: `hsl(${h}, ${s}%, ${l}%)`,
  };
}

function isValidHex(value: string) {
  return /^#[0-9A-Fa-f]{6}$/.test(value);
}

export default function ColorPickerPage() {
  const [color, setColor] = useState(DEFAULT_COLOR);
  const [copied, setCopied] = useState("");

  const values = getColorValues(
    isValidHex(color) ? color : DEFAULT_COLOR
  );

  async function copyValue(value: string, type: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(type);

      setTimeout(() => {
        setCopied("");
      }, 1500);
    } catch {
      setCopied("");
    }
  }

  function handleHexChange(value: string) {
    let formatted = value;

    if (!formatted.startsWith("#")) {
      formatted = `#${formatted}`;
    }

    setColor(formatted.slice(0, 7).toUpperCase());
  }

  function handleReset() {
    setColor(DEFAULT_COLOR);
    setCopied("");
  }

  function loadExample() {
    setColor("#7C3AED");
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
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Color Preview */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Choose a color
              </h2>

              <div
                className="mt-4 h-64 w-full rounded-2xl border border-gray-200 shadow-inner"
                style={{
                  backgroundColor: isValidHex(color)
                    ? color
                    : DEFAULT_COLOR,
                }}
                aria-label="Selected color preview"
              />

              <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end">
                <div className="flex-1">
                  <label
                    htmlFor="color"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Color
                  </label>

                  <input
                    id="color"
                    type="color"
                    value={isValidHex(color) ? color : DEFAULT_COLOR}
                    onChange={(event) => setColor(event.target.value.toUpperCase())}
                    className="h-12 w-full cursor-pointer rounded-lg border border-gray-300 bg-white p-1"
                    aria-label="Choose color"
                  />
                </div>

                <div className="flex-1">
                  <label
                    htmlFor="hex-input"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    HEX
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
                    className="h-12 w-full rounded-lg border border-gray-300 px-4 font-mono text-sm uppercase outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              {!isValidHex(color) && (
                <p
                  className="mt-2 text-sm text-red-600"
                  role="alert"
                >
                  Enter a valid 6-digit HEX color such as #2563EB.
                </p>
              )}
            </div>

            {/* Color Values */}
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
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                  Load Example
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="flex-1 rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Examples */}
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
              onClick={() => setColor("#2563EB")}
            />

            <ExampleColor
              name="Purple"
              color="#7C3AED"
              onClick={() => setColor("#7C3AED")}
            />

            <ExampleColor
              name="Green"
              color="#16A34A"
              onClick={() => setColor("#16A34A")}
            />

            <ExampleColor
              name="Orange"
              color="#EA580C"
              onClick={() => setColor("#EA580C")}
            />
          </div>
        </section>

        {/* How To Use */}
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
                Enter or edit the HEX value if you already know the color.
              </span>
            </li>

            <li className="flex gap-3">
              <span className="font-bold text-blue-600">3.</span>
              <span>
                View the corresponding HEX, RGB, and HSL values.
              </span>
            </li>

            <li className="flex gap-3">
              <span className="font-bold text-blue-600">4.</span>
              <span>
                Copy the color value you need for your project.
              </span>
            </li>
          </ol>
        </section>

        {/* Explanation */}
        <section className="mt-8 grid gap-6 md:grid-cols-3">
          <InfoCard
            title="HEX"
            text="HEX is a six-digit hexadecimal color format commonly used in HTML and CSS."
          />

          <InfoCard
            title="RGB"
            text="RGB represents a color using red, green, and blue values from 0 to 255."
          />

          <InfoCard
            title="HSL"
            text="HSL describes colors using hue, saturation, and lightness."
          />
        </section>

        {/* Features */}
        <section className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Why use our Color Picker?
          </h2>

          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <Feature
              title="Free"
              text="Use the tool without registration or payment."
            />

            <Feature
              title="Instant results"
              text="Color values update immediately as you choose a color."
            />

            <Feature
              title="Easy copying"
              text="Copy HEX, RGB, or HSL values with one click."
            />

            <Feature
              title="Browser-based"
              text="Your selected colors are processed directly in your browser."
            />
          </div>
        </section>

        {/* Privacy */}
        <section className="mt-8 pb-8 text-center">
          <h2 className="text-xl font-semibold text-gray-900">
            Privacy-focused
          </h2>

          <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-gray-600">
            This Color Picker works directly in your browser. No color data
            needs to be uploaded to a server.
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
          className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 transition hover:bg-gray-100"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      <p className="mt-3 break-all font-mono text-base text-gray-900">
        {value}
      </p>
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
      className="overflow-hidden rounded-xl border border-gray-200 bg-white text-left transition hover:-translate-y-0.5 hover:shadow-md"
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

      <p className="mt-3 text-sm leading-6 text-gray-600">{text}</p>
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

      <p className="mt-2 text-sm leading-6 text-gray-600">{text}</p>
    </div>
  );
}