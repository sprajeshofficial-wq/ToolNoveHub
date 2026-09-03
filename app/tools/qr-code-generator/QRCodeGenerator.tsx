"use client";

import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";

type QRType = "text" | "url" | "wifi";

function escapeWifiValue(value: string) {
  return value.replace(/([\\;,":])/g, "\\$1");
}

export default function QRCodeGeneratorPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [type, setType] = useState<QRType>("text");
  const [text, setText] = useState("");
  const [wifiSsid, setWifiSsid] = useState("");
  const [wifiPassword, setWifiPassword] = useState("");
  const [wifiSecurity, setWifiSecurity] = useState<"WPA" | "WEP" | "nopass">(
    "WPA",
  );
  const [wifiHidden, setWifiHidden] = useState(false);

  const [error, setError] = useState("");
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState(false);

  const getQRValue = () => {
    if (type === "wifi") {
      if (!wifiSsid.trim()) {
        return "";
      }

      if (wifiSecurity !== "nopass" && !wifiPassword) {
        return "";
      }

      return `WIFI:T:${wifiSecurity};S:${escapeWifiValue(
        wifiSsid,
      )};P:${escapeWifiValue(wifiPassword)};H:${wifiHidden ? "true" : "false"};;`;
    }

    return text.trim();
  };

  const generateQR = async () => {
    setError("");
    setCopied(false);

    const value = getQRValue();

    if (!value) {
      setGenerated(false);

      if (type === "wifi") {
        setError(
          wifiSsid.trim()
            ? "Please enter the Wi-Fi password."
            : "Please enter the Wi-Fi network name.",
        );
      } else {
        setError("Please enter some text or a URL.");
      }

      return;
    }

    try {
      if (!canvasRef.current) {
        return;
      }

      await QRCode.toCanvas(canvasRef.current, value, {
        width: 320,
        margin: 3,
        errorCorrectionLevel: "M",
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
    link.click();
  };

  const copyQR = async () => {
    if (!canvasRef.current || !generated) {
      return;
    }

    try {
      const blob = await new Promise<Blob | null>((resolve) => {
        canvasRef.current?.toBlob(resolve, "image/png");
      });

      if (!blob) {
        setError("Unable to copy the QR code.");
        return;
      }

      if ("ClipboardItem" in window && navigator.clipboard?.write) {
        const item = new ClipboardItem({
          "image/png": blob,
        });

        await navigator.clipboard.write([item]);
        setCopied(true);
        return;
      }

      setError(
        "Image copying is not supported by this browser. Please download the QR code instead.",
      );
    } catch {
      setError(
        "Unable to copy the QR code. Please use the download button instead.",
      );
    }
  };

  useEffect(() => {
    setGenerated(false);
    setError("");
    setCopied(false);
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
              Create a free QR code for text, websites, or Wi-Fi networks.
              Generate it directly in your browser and download it as a PNG
              image.
            </p>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* Generator */}
          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <div
              className="grid grid-cols-3 rounded-xl bg-gray-100 p-1"
              role="tablist"
              aria-label="QR code type"
            >
              {[
                { value: "text", label: "Text" },
                { value: "url", label: "URL" },
                { value: "wifi", label: "Wi-Fi" },
              ].map((item) => {
                const selected = type === item.value;

                return (
                  <button
                    key={item.value}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setType(item.value as QRType)}
                    className={`rounded-lg px-3 py-2.5 text-sm font-semibold transition ${
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
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                    placeholder="https://example.com"
                    className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />

                  <p className="mt-2 text-xs text-gray-500">
                    Include the full URL, such as https://example.com
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
                      value={wifiSsid}
                      onChange={(event) => setWifiSsid(event.target.value)}
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
                          event.target.value as "WPA" | "WEP" | "nopass",
                        )
                      }
                      className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    >
                      <option value="WPA">WPA / WPA2 / WPA3</option>
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
                        value={wifiPassword}
                        onChange={(event) =>
                          setWifiPassword(event.target.value)
                        }
                        placeholder="Enter Wi-Fi password"
                        className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>
                  )}

                  <label className="flex items-center gap-3 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      checked={wifiHidden}
                      onChange={(event) => setWifiHidden(event.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    Hidden Wi-Fi network
                  </label>
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

            <button
              type="button"
              onClick={generateQR}
              className="mt-7 w-full rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Generate QR Code
            </button>

            <p className="mt-4 text-center text-xs text-gray-500">
              Your QR content is processed in your browser.
            </p>
          </section>

          {/* Preview */}
          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="text-center">
              <h2 className="text-lg font-semibold text-gray-900">
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
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-100 text-3xl">
                      QR
                    </div>

                    <p className="mt-4 text-sm font-medium text-gray-700">
                      No QR code yet
                    </p>

                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      Enter your content and click Generate QR Code.
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
                  className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-800 transition hover:bg-gray-50"
                >
                  Download PNG
                </button>

                <button
                  type="button"
                  onClick={copyQR}
                  className="rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
                >
                  {copied ? "Copied!" : "Copy QR"}
                </button>
              </div>
            )}
          </section>
        </div>

        {/* Information */}
        <section className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900">
            How to use the QR Code Generator
          </h2>

          <ol className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            <li>
              <strong className="text-gray-900">1.</strong> Choose Text, URL,
              or Wi-Fi.
            </li>
            <li>
              <strong className="text-gray-900">2.</strong> Enter the
              information you want to encode.
            </li>
            <li>
              <strong className="text-gray-900">3.</strong> Click Generate QR
              Code.
            </li>
            <li>
              <strong className="text-gray-900">4.</strong> Download the QR
              code as a PNG image or copy it when supported by your browser.
            </li>
          </ol>
        </section>

        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900">
            Why use ToolNoveHub?
          </h2>

          <div className="mt-5 grid gap-5 sm:grid-cols-3">
            <div>
              <h3 className="font-semibold text-gray-900">Free</h3>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Create QR codes without needing an account.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">Easy to use</h3>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Simple controls make QR generation quick and straightforward.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">Browser-based</h3>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                QR code generation happens directly in your browser.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}