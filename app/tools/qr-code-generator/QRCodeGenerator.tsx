"use client";

import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";

type QRType = "text" | "url" | "wifi";
type WiFiSecurity = "WPA" | "WEP" | "nopass";

function escapeWifiValue(value: string): string {
  return value.replace(/([\\;,":])/g, "\\$1");
}

function buildWifiPayload(
  ssid: string,
  password: string,
  security: WiFiSecurity,
  hidden: boolean,
): string {
  return `WIFI:T:${security};S:${escapeWifiValue(ssid)};P:${escapeWifiValue(
    password,
  )};H:${hidden ? "true" : "false"};;`;
}

export default function QRCodeGeneratorPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [type, setType] = useState<QRType>("text");

  const [text, setText] = useState("");

  const [wifiSsid, setWifiSsid] = useState("");
  const [wifiPassword, setWifiPassword] = useState("");
  const [wifiSecurity, setWifiSecurity] =
    useState<WiFiSecurity>("WPA");
  const [wifiHidden, setWifiHidden] = useState(false);

  const [error, setError] = useState("");
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState(false);

  const getQRValue = (): string => {
    if (type === "wifi") {
      const ssid = wifiSsid.trim();

      if (!ssid) {
        return "";
      }

      if (wifiSecurity !== "nopass" && !wifiPassword) {
        return "";
      }

      return buildWifiPayload(
        ssid,
        wifiPassword,
        wifiSecurity,
        wifiHidden,
      );
    }

    return text.trim();
  };

  const validateInput = (): boolean => {
    if (type === "wifi") {
      if (!wifiSsid.trim()) {
        setError("Please enter the Wi-Fi network name.");
        return false;
      }

      if (wifiSecurity !== "nopass" && !wifiPassword) {
        setError("Please enter the Wi-Fi password.");
        return false;
      }

      return true;
    }

    if (!text.trim()) {
      setError(
        type === "url"
          ? "Please enter a website URL."
          : "Please enter some text.",
      );
      return false;
    }

    if (type === "url") {
      try {
        const url = new URL(text.trim());

        if (!["http:", "https:"].includes(url.protocol)) {
          setError("Please enter a valid HTTP or HTTPS URL.");
          return false;
        }
      } catch {
        setError(
          "Please enter a valid website URL, such as https://example.com.",
        );
        return false;
      }
    }

    return true;
  };

  const generateQR = async () => {
    setError("");
    setCopied(false);

    if (!validateInput()) {
      setGenerated(false);
      return;
    }

    const value = getQRValue();

    if (!value || !canvasRef.current) {
      setGenerated(false);
      setError("Unable to generate the QR code. Please try again.");
      return;
    }

    try {
      await QRCode.toCanvas(canvasRef.current, value, {
        width: 320,
        margin: 3,
        errorCorrectionLevel: "M",
        color: {
          dark: "#111827",
          light: "#ffffff",
        },
      });

      setGenerated(true);
    } catch {
      setGenerated(false);
      setError("Unable to generate the QR code. Please try again.");
    }
  };

  const downloadQR = () => {
    if (!canvasRef.current || !generated) {
      return;
    }

    const link = document.createElement("a");

    link.download = "toolnovehub-qr-code.png";
    link.href = canvasRef.current.toDataURL("image/png");

    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const copyQR = async () => {
    if (!canvasRef.current || !generated) {
      return;
    }

    if (!navigator.clipboard?.write || !("ClipboardItem" in window)) {
      setError(
        "Image copying is not supported by this browser. Please download the QR code instead.",
      );
      return;
    }

    try {
      const blob = await new Promise<Blob | null>((resolve) => {
        canvasRef.current?.toBlob(resolve, "image/png");
      });

      if (!blob) {
        setError("Unable to prepare the QR code for copying.");
        return;
      }

      const item = new ClipboardItem({
        "image/png": blob,
      });

      await navigator.clipboard.write([item]);

      setError("");
      setCopied(true);
    } catch {
      setError(
        "Unable to copy the QR code. Please use the download button instead.",
      );
    }
  };

  const clearGenerator = () => {
    setText("");
    setWifiSsid("");
    setWifiPassword("");
    setWifiSecurity("WPA");
    setWifiHidden(false);

    setError("");
    setGenerated(false);
    setCopied(false);

    if (canvasRef.current) {
      const context = canvasRef.current.getContext("2d");

      if (context) {
        context.clearRect(
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height,
        );
      }
    }
  };

  useEffect(() => {
    setError("");
    setGenerated(false);
    setCopied(false);

    if (canvasRef.current) {
      const context = canvasRef.current.getContext("2d");

      if (context) {
        context.clearRect(
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height,
        );
      }
    }
  }, [type]);

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
              ToolNoveHub Tool
            </p>

            <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              QR Code Generator
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-600">
              Create free QR codes for text, websites, and Wi-Fi
              networks. Generate your QR code directly in your browser,
              then download it as a PNG image.
            </p>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* Generator */}
          <section
            aria-labelledby="qr-generator-heading"
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
          >
            <h2
              id="qr-generator-heading"
              className="sr-only"
            >
              QR code generator controls
            </h2>

            <div
              className="grid grid-cols-3 rounded-xl bg-gray-100 p-1"
              role="tablist"
              aria-label="QR code type"
            >
              {[
                { value: "text" as QRType, label: "Text" },
                { value: "url" as QRType, label: "URL" },
                { value: "wifi" as QRType, label: "Wi-Fi" },
              ].map((item) => {
                const selected = type === item.value;

                return (
                  <button
                    key={item.value}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setType(item.value)}
                    className={`rounded-lg px-3 py-2.5 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      selected
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            <div className="mt-7">
              {type === "text" && (
                <div>
                  <label
                    htmlFor="qr-text"
                    className="block text-sm font-semibold text-gray-900"
                  >
                    Text
                  </label>

                  <textarea
                    id="qr-text"
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                    placeholder="Enter the text you want to encode..."
                    rows={6}
                    className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />

                  <p className="mt-2 text-xs leading-5 text-gray-500">
                    You can encode a short message, contact information,
                    instructions, or other text.
                  </p>
                </div>
              )}

              {type === "url" && (
                <div>
                  <label
                    htmlFor="qr-url"
                    className="block text-sm font-semibold text-gray-900"
                  >
                    Website URL
                  </label>

                  <input
                    id="qr-url"
                    type="url"
                    inputMode="url"
                    autoComplete="url"
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                    placeholder="https://example.com"
                    className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />

                  <p className="mt-2 text-xs leading-5 text-gray-500">
                    Include the full URL, such as https://example.com.
                  </p>
                </div>
              )}

              {type === "wifi" && (
                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor="wifi-ssid"
                      className="block text-sm font-semibold text-gray-900"
                    >
                      Wi-Fi network name
                    </label>

                    <input
                      id="wifi-ssid"
                      type="text"
                      autoComplete="off"
                      value={wifiSsid}
                      onChange={(event) =>
                        setWifiSsid(event.target.value)
                      }
                      placeholder="My Wi-Fi"
                      className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="wifi-security"
                      className="block text-sm font-semibold text-gray-900"
                    >
                      Security
                    </label>

                    <select
                      id="wifi-security"
                      value={wifiSecurity}
                      onChange={(event) =>
                        setWifiSecurity(
                          event.target.value as WiFiSecurity,
                        )
                      }
                      className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    >
                      <option value="WPA">
                        WPA / WPA2 / WPA3
                      </option>
                      <option value="WEP">WEP</option>
                      <option value="nopass">No password</option>
                    </select>
                  </div>

                  {wifiSecurity !== "nopass" && (
                    <div>
                      <label
                        htmlFor="wifi-password"
                        className="block text-sm font-semibold text-gray-900"
                      >
                        Wi-Fi password
                      </label>

                      <input
                        id="wifi-password"
                        type="password"
                        autoComplete="off"
                        value={wifiPassword}
                        onChange={(event) =>
                          setWifiPassword(event.target.value)
                        }
                        placeholder="Enter Wi-Fi password"
                        className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>
                  )}

                  <label className="flex cursor-pointer items-center gap-3 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      checked={wifiHidden}
                      onChange={(event) =>
                        setWifiHidden(event.target.checked)
                      }
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />

                    <span>Hidden Wi-Fi network</span>
                  </label>

                  <p className="text-xs leading-5 text-gray-500">
                    The Wi-Fi details are encoded into the QR image so
                    compatible devices can use the code to connect.
                  </p>
                </div>
              )}
            </div>

            {error && (
              <div
                className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                role="alert"
                aria-live="polite"
              >
                {error}
              </div>
            )}

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={generateQR}
                className="rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Generate QR Code
              </button>

              <button
                type="button"
                onClick={clearGenerator}
                className="rounded-xl border border-gray-300 bg-white px-5 py-3.5 text-sm font-semibold text-gray-800 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Clear
              </button>
            </div>

            <p className="mt-4 text-center text-xs leading-5 text-gray-500">
              QR code generation is performed in your browser using
              the information you enter.
            </p>
          </section>

          {/* Preview */}
          <section
            aria-labelledby="qr-preview-heading"
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
          >
            <div className="text-center">
              <h2
                id="qr-preview-heading"
                className="text-lg font-semibold text-gray-900"
              >
                QR Code Preview
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Your generated QR code will appear here.
              </p>
            </div>

            <div className="mt-6 flex min-h-[340px] items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-4">
              <div className="text-center">
                <canvas
                  ref={canvasRef}
                  width={320}
                  height={320}
                  className={`mx-auto max-w-full rounded-lg bg-white ${
                    generated ? "block" : "hidden"
                  }`}
                  aria-label="Generated QR code"
                />

                {!generated && (
                  <div className="px-6">
                    <div
                      aria-hidden="true"
                      className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-100 text-3xl font-bold text-gray-500"
                    >
                      QR
                    </div>

                    <p className="mt-4 text-sm font-medium text-gray-700">
                      No QR code yet
                    </p>

                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      Enter your information and click Generate QR
                      Code.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {generated && (
              <div className="mt-5 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={downloadQR}
                  className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-800 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Download PNG
                </button>

                <button
                  type="button"
                  onClick={copyQR}
                  className="rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  {copied ? "Copied!" : "Copy QR"}
                </button>
              </div>
            )}

            {generated && (
              <p
                className="mt-3 text-center text-xs text-gray-500"
                aria-live="polite"
              >
                {copied
                  ? "QR code copied to your clipboard."
                  : "Your QR code is ready to download or copy."}
              </p>
            )}
          </section>
        </div>

        {/* How to use */}
        <section className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900">
            How to use the QR Code Generator
          </h2>

          <ol className="mt-5 space-y-4 text-sm leading-6 text-gray-600">
            <li>
              <strong className="text-gray-900">1. Choose a type.</strong>{" "}
              Select Text, URL, or Wi-Fi depending on the information
              you want to encode.
            </li>

            <li>
              <strong className="text-gray-900">2. Enter your information.</strong>{" "}
              Type your message, website address, or Wi-Fi details.
            </li>

            <li>
              <strong className="text-gray-900">3. Generate the code.</strong>{" "}
              Click Generate QR Code to create the QR image.
            </li>

            <li>
              <strong className="text-gray-900">4. Save or copy it.</strong>{" "}
              Download the QR code as a PNG image or copy the image when
              your browser supports clipboard image copying.
            </li>
          </ol>
        </section>

        {/* About */}
        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900">
            About QR codes
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              A QR code is a two-dimensional barcode that can store
              information such as text, website addresses, and network
              connection details. A phone or other compatible device can
              scan the pattern and interpret the encoded information.
            </p>

            <p>
              QR codes are commonly used for websites, menus, event
              information, contact details, product information, and
              Wi-Fi access. The information stored in the QR code
              depends on what you enter into the generator.
            </p>

            <p>
              ToolNoveHub creates the QR image directly in your browser.
              The generator does not require an account, and the QR
              content is used by the browser to create the image.
            </p>
          </div>
        </section>

        {/* Use cases */}
        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900">
            Common QR code uses
          </h2>

          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="font-semibold text-gray-900">
                Websites
              </h3>

              <p className="mt-1 text-sm leading-6 text-gray-600">
                Share a website or landing page without requiring users
                to type the address manually.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                Wi-Fi access
              </h3>

              <p className="mt-1 text-sm leading-6 text-gray-600">
                Create a Wi-Fi QR code that compatible devices can use
                to connect to a network.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                Text and messages
              </h3>

              <p className="mt-1 text-sm leading-6 text-gray-600">
                Encode short messages, instructions, contact details, or
                other useful text.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                Business materials
              </h3>

              <p className="mt-1 text-sm leading-6 text-gray-600">
                Add QR codes to signs, printed materials, packaging,
                menus, and promotional resources.
              </p>
            </div>
          </div>
        </section>

        {/* Privacy */}
        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900">
            Privacy and browser-based processing
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              This QR generator creates the QR image in your browser
              using the information you enter into the tool. No account
              is required to generate a QR code.
            </p>

            <p>
              For important or sensitive information, review the
              ToolNoveHub Privacy Policy and the behavior of your
              browser before using any online tool.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900">
            QR Code Generator FAQ
          </h2>

          <div className="mt-5 space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900">
                Is the QR Code Generator free?
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Yes. You can create QR codes with the ToolNoveHub
                generator without creating an account.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                Can I create a QR code for a website?
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Yes. Select URL, enter a complete HTTP or HTTPS website
                address, and generate the QR code.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                Can I create a Wi-Fi QR code?
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Yes. Select Wi-Fi and enter the network name, security
                type, and password when required.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                Can I download my QR code?
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Yes. After generating a QR code, use Download PNG to
                save the image to your device.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                Can I copy the QR code?
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                The Copy QR button uses the browser clipboard when
                image copying is supported. If it is not supported,
                download the PNG instead.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}