"use client";

import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";

type QRType = "text" | "url" | "wifi";
type WiFiSecurity = "WPA" | "WEP" | "nopass";

const QR_SIZE = 320;
const MAX_TEXT_LENGTH = 2000;
const MAX_WIFI_FIELD_LENGTH = 255;

function escapeWifiValue(value: string): string {
  return value.replace(/([\\;,":])/g, "\\$1");
}

function buildWifiPayload(
  ssid: string,
  password: string,
  security: WiFiSecurity,
  hidden: boolean,
): string {
  const escapedSsid = escapeWifiValue(ssid);
  const escapedPassword = escapeWifiValue(password);

  if (security === "nopass") {
    return `WIFI:T:nopass;S:${escapedSsid};H:${
      hidden ? "true" : "false"
    };;`;
  }

  return `WIFI:T:${security};S:${escapedSsid};P:${escapedPassword};H:${
    hidden ? "true" : "false"
  };;`;
}

function clearCanvas(canvas: HTMLCanvasElement | null) {
  if (!canvas) return;

  const context = canvas.getContext("2d");
  if (!context) return;

  context.clearRect(0, 0, canvas.width, canvas.height);
}

export default function QRCodeGenerator() {
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
      const ssid = wifiSsid;

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
      if (!wifiSsid) {
        setError("Please enter the Wi-Fi network name.");
        return false;
      }

      if (wifiSsid.length > MAX_WIFI_FIELD_LENGTH) {
        setError(
          "The Wi-Fi network name is too long. Please use a shorter network name.",
        );
        return false;
      }

      if (
        wifiSecurity !== "nopass" &&
        !wifiPassword
      ) {
        setError("Please enter the Wi-Fi password.");
        return false;
      }

      if (wifiPassword.length > MAX_WIFI_FIELD_LENGTH) {
        setError(
          "The Wi-Fi password is too long. Please use a shorter password.",
        );
        return false;
      }

      return true;
    }

    const value = text.trim();

    if (!value) {
      setError(
        type === "url"
          ? "Please enter a website URL."
          : "Please enter some text.",
      );
      return false;
    }

    if (value.length > MAX_TEXT_LENGTH) {
      setError(
        `Please use ${MAX_TEXT_LENGTH.toLocaleString(
          "en-US",
        )} characters or fewer for reliable QR generation and scanning.`,
      );
      return false;
    }

    if (type === "url") {
      try {
        const url = new URL(value);

        if (
          url.protocol !== "http:" &&
          url.protocol !== "https:"
        ) {
          setError(
            "Please enter a valid HTTP or HTTPS URL.",
          );
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
      clearCanvas(canvasRef.current);
      return;
    }

    const value = getQRValue();

    if (!value || !canvasRef.current) {
      setGenerated(false);
      setError(
        "Unable to generate the QR code. Please try again.",
      );
      return;
    }

    try {
      await QRCode.toCanvas(
        canvasRef.current,
        value,
        {
          width: QR_SIZE,
          margin: 3,
          errorCorrectionLevel: "M",
          color: {
            dark: "#111827",
            light: "#ffffff",
          },
        },
      );

      setGenerated(true);
      setError("");
    } catch {
      setGenerated(false);
      clearCanvas(canvasRef.current);
      setError(
        "Unable to generate the QR code. Please try shorter or simpler content.",
      );
    }
  };

  const downloadQR = () => {
    if (!canvasRef.current || !generated) {
      return;
    }

    try {
      const link = document.createElement("a");

      link.download = "toolnovehub-qr-code.png";
      link.href = canvasRef.current.toDataURL("image/png");

      document.body.appendChild(link);
      link.click();
      link.remove();

      setError("");
    } catch {
      setError(
        "Unable to download the QR code. Please try again.",
      );
    }
  };

  const copyQR = async () => {
    if (!canvasRef.current || !generated) {
      return;
    }

    if (
      !navigator.clipboard?.write ||
      typeof ClipboardItem === "undefined"
    ) {
      setError(
        "Image copying is not supported by this browser. Please download the PNG instead.",
      );
      return;
    }

    try {
      const blob = await new Promise<Blob | null>(
        (resolve) => {
          canvasRef.current?.toBlob(
            resolve,
            "image/png",
          );
        },
      );

      if (!blob) {
        setError(
          "Unable to prepare the QR code for copying.",
        );
        return;
      }

      const item = new ClipboardItem({
        "image/png": blob,
      });

      await navigator.clipboard.write([item]);

      setCopied(true);
      setError("");
    } catch {
      setCopied(false);
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

    clearCanvas(canvasRef.current);
  };

  const changeType = (newType: QRType) => {
    setType(newType);
    setError("");
    setGenerated(false);
    setCopied(false);

    clearCanvas(canvasRef.current);
  };

  useEffect(() => {
    setError("");
    setGenerated(false);
    setCopied(false);

    clearCanvas(canvasRef.current);
  }, [type]);

  return (
    <div className="space-y-10">
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

        {/* Type tabs */}
        <div
          className="grid grid-cols-3 rounded-xl bg-gray-100 p-1"
          role="tablist"
          aria-label="QR code type"
        >
          {[
            {
              value: "text" as QRType,
              label: "Text",
            },
            {
              value: "url" as QRType,
              label: "URL",
            },
            {
              value: "wifi" as QRType,
              label: "Wi-Fi",
            },
          ].map((item) => {
            const selected = type === item.value;
            const tabId = `qr-tab-${item.value}`;
            const panelId = `qr-panel-${item.value}`;

            return (
              <button
                key={item.value}
                id={tabId}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={panelId}
                tabIndex={selected ? 0 : -1}
                onClick={() => changeType(item.value)}
                className={`rounded-lg px-3 py-2.5 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
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

        {/* Inputs */}
        <div className="mt-7">
          {/* Text */}
          {type === "text" && (
            <div
              id="qr-panel-text"
              role="tabpanel"
              aria-labelledby="qr-tab-text"
            >
              <label
                htmlFor="qr-text"
                className="block text-sm font-semibold text-gray-900"
              >
                Text
              </label>

              <textarea
                id="qr-text"
                value={text}
                maxLength={MAX_TEXT_LENGTH}
                onChange={(event) => {
                  setText(event.target.value);
                  setGenerated(false);
                  setCopied(false);
                  setError("");
                }}
                placeholder="Enter the text you want to encode..."
                rows={6}
                aria-describedby="qr-text-help"
                className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              <div className="mt-2 flex items-center justify-between gap-4">
                <p
                  id="qr-text-help"
                  className="text-xs leading-5 text-gray-500"
                >
                  Encode a short message, instructions,
                  contact information, or other text.
                </p>

                <span className="shrink-0 text-xs text-gray-400">
                  {text.length.toLocaleString("en-US")} /{" "}
                  {MAX_TEXT_LENGTH.toLocaleString("en-US")}
                </span>
              </div>
            </div>
          )}

          {/* URL */}
          {type === "url" && (
            <div
              id="qr-panel-url"
              role="tabpanel"
              aria-labelledby="qr-tab-url"
            >
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
                maxLength={MAX_TEXT_LENGTH}
                onChange={(event) => {
                  setText(event.target.value);
                  setGenerated(false);
                  setCopied(false);
                  setError("");
                }}
                placeholder="https://example.com"
                aria-describedby="qr-url-help"
                className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              <p
                id="qr-url-help"
                className="mt-2 text-xs leading-5 text-gray-500"
              >
                Include the complete website address,
                such as https://example.com.
              </p>
            </div>
          )}

          {/* Wi-Fi */}
          {type === "wifi" && (
            <div
              id="qr-panel-wifi"
              role="tabpanel"
              aria-labelledby="qr-tab-wifi"
              className="space-y-5"
            >
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
                  maxLength={MAX_WIFI_FIELD_LENGTH}
                  value={wifiSsid}
                  onChange={(event) => {
                    setWifiSsid(event.target.value);
                    setGenerated(false);
                    setCopied(false);
                    setError("");
                  }}
                  placeholder="My Wi-Fi"
                  aria-describedby="wifi-ssid-help"
                  className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                <p
                  id="wifi-ssid-help"
                  className="mt-2 text-xs leading-5 text-gray-500"
                >
                  Enter the Wi-Fi network name exactly as it
                  appears on your device.
                </p>
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
                  onChange={(event) => {
                    setWifiSecurity(
                      event.target.value as WiFiSecurity,
                    );
                    setGenerated(false);
                    setCopied(false);
                    setError("");
                  }}
                  className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="WPA">
                    WPA / WPA2 / WPA3
                  </option>
                  <option value="WEP">
                    WEP
                  </option>
                  <option value="nopass">
                    No password
                  </option>
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
                    maxLength={MAX_WIFI_FIELD_LENGTH}
                    value={wifiPassword}
                    onChange={(event) => {
                      setWifiPassword(
                        event.target.value,
                      );
                      setGenerated(false);
                      setCopied(false);
                      setError("");
                    }}
                    placeholder="Enter Wi-Fi password"
                    className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              )}

              <label className="flex cursor-pointer items-center gap-3 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={wifiHidden}
                  onChange={(event) => {
                    setWifiHidden(event.target.checked);
                    setGenerated(false);
                    setCopied(false);
                    setError("");
                  }}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />

                <span>
                  Hidden Wi-Fi network
                </span>
              </label>

              <p className="text-xs leading-5 text-gray-500">
                The Wi-Fi network information is encoded into
                the QR code. Compatible devices may use the code
                to connect to the network.
              </p>
            </div>
          )}
        </div>

        {/* Error */}
        {error && (
          <div
            className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700"
            role="alert"
            aria-live="polite"
          >
            {error}
          </div>
        )}

        {/* Actions */}
        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={generateQR}
            className="rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            Generate QR Code
          </button>

          <button
            type="button"
            onClick={clearGenerator}
            className="rounded-xl border border-gray-300 bg-white px-5 py-3.5 text-sm font-semibold text-gray-800 transition hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            Clear
          </button>
        </div>

        <p className="mt-4 text-center text-xs leading-5 text-gray-500">
          QR code generation is performed in your browser
          using the information you enter.
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
              width={QR_SIZE}
              height={QR_SIZE}
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
                  Enter your information and select Generate
                  QR Code.
                </p>
              </div>
            )}
          </div>
        </div>

        {generated && (
          <>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={downloadQR}
                className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-800 transition hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                Download PNG
              </button>

              <button
                type="button"
                onClick={copyQR}
                className="rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                {copied ? "Copied!" : "Copy QR"}
              </button>
            </div>

            <p
              className="mt-3 text-center text-xs leading-5 text-gray-500"
              aria-live="polite"
            >
              {copied
                ? "QR code copied to your clipboard."
                : "Your QR code is ready to download or copy."}
            </p>
          </>
        )}
      </section>

      {/* How to use */}
      <section className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
        <h2 className="text-xl font-bold text-gray-900">
          How to use the QR Code Generator
        </h2>

        <ol className="mt-5 space-y-4 text-sm leading-7 text-gray-600">
          <li>
            <strong className="text-gray-900">
              1. Choose a type.
            </strong>{" "}
            Select Text, URL, or Wi-Fi depending on the
            information you want to encode.
          </li>

          <li>
            <strong className="text-gray-900">
              2. Enter your information.
            </strong>{" "}
            Type your message, website address, or Wi-Fi
            details.
          </li>

          <li>
            <strong className="text-gray-900">
              3. Generate the code.
            </strong>{" "}
            Select Generate QR Code to create the QR image.
          </li>

          <li>
            <strong className="text-gray-900">
              4. Check the result.
            </strong>{" "}
            Scan the generated QR code with a compatible device
            before distributing it.
          </li>

          <li>
            <strong className="text-gray-900">
              5. Save or copy it.
            </strong>{" "}
            Download the QR code as a PNG image or copy the
            image when supported by your browser.
          </li>
        </ol>
      </section>

      {/* About */}
      <section className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
        <h2 className="text-xl font-bold text-gray-900">
          About QR codes
        </h2>

        <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
          <p>
            A QR code is a two-dimensional barcode that can
            store information such as text, website addresses,
            and network connection details. A compatible phone
            or other device can scan the pattern and interpret
            the encoded information.
          </p>

          <p>
            QR codes are commonly used for websites, menus,
            event information, contact details, product
            information, printed materials, and Wi-Fi access.
          </p>

          <p>
            The information stored in the QR code depends on
            what you enter into the generator. A QR code
            containing a website address does not automatically
            guarantee that the website will remain available.
          </p>

          <p>
            This generator creates a static QR code containing
            the information you provide. It does not create a
            separate redirect service or automatically track
            scans.
          </p>
        </div>
      </section>

      {/* Use cases */}
      <section className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
        <h2 className="text-xl font-bold text-gray-900">
          Common QR code uses
        </h2>

        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <UseCase
            title="Websites"
            text="Share a website or landing page without requiring users to type the address manually."
          />

          <UseCase
            title="Wi-Fi access"
            text="Create a Wi-Fi QR code containing network connection information for compatible devices."
          />

          <UseCase
            title="Text and messages"
            text="Encode short messages, instructions, contact details, or other supported text."
          />

          <UseCase
            title="Business materials"
            text="Add QR codes to signs, printed materials, packaging, menus, and promotional resources."
          />
        </div>
      </section>

      {/* Privacy */}
      <section className="rounded-2xl border border-blue-100 bg-blue-50 p-6 sm:p-8">
        <h2 className="text-xl font-bold text-blue-900">
          Privacy and browser-based processing
        </h2>

        <div className="mt-4 space-y-4 text-sm leading-7 text-blue-800">
          <p>
            QR code generation is performed in your browser
            using the information you enter into the tool.
            No account is required to generate a QR code.
          </p>

          <p>
            The browser creates the QR image locally for the
            generation process. As with any website, review
            the ToolNoveHub Privacy Policy and your browser
            settings before entering sensitive information.
          </p>

          <p>
            Be careful when sharing QR codes containing
            private information such as Wi-Fi passwords or
            personal contact details.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
        <h2 className="text-xl font-bold text-gray-900">
          QR Code Generator FAQ
        </h2>

        <div className="mt-5 space-y-4">
          <Faq
            question="Is the QR Code Generator free?"
            answer="Yes. You can create QR codes with the ToolNoveHub generator without creating an account."
          />

          <Faq
            question="What types of QR codes can I create?"
            answer="The generator supports QR codes for text, website URLs, and Wi-Fi network information."
          />

          <Faq
            question="Can I create a QR code for a website?"
            answer="Yes. Select URL, enter a complete HTTP or HTTPS website address, and generate the QR code."
          />

          <Faq
            question="Can I create a Wi-Fi QR code?"
            answer="Yes. Select Wi-Fi and enter the network name, security type, and password when required."
          />

          <Faq
            question="Can I download my QR code?"
            answer="Yes. After generating a QR code, use Download PNG to save the image to your device."
          />

          <Faq
            question="Can I copy the QR code?"
            answer="The Copy QR button uses the browser clipboard when image copying is supported. If your browser does not support image clipboard operations, download the PNG instead."
          />

          <Faq
            question="Does a QR code expire?"
            answer="A QR code does not automatically expire. However, information inside it can become outdated. For example, a QR code containing a website address will only work as expected while the destination remains available."
          />

          <Faq
            question="Does the generator create dynamic QR codes?"
            answer="No. This tool creates static QR codes containing the information you provide. It does not provide a separate redirect or scan-tracking service."
          />

          <Faq
            question="How much text can I put into a QR code?"
            answer={`The generator accepts up to ${MAX_TEXT_LENGTH.toLocaleString(
              "en-US",
            )} characters for text and URLs. Shorter content generally produces simpler QR codes that are easier for phones and cameras to scan.`}
          />

          <Faq
            question="Can I use a QR code for Wi-Fi?"
            answer="Yes. Wi-Fi QR codes can contain a network name, security type, password when required, and hidden-network information."
          />
        </div>
      </section>
    </div>
  );
}

function UseCase({
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

function Faq({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  return (
    <details className="rounded-xl border border-gray-200 bg-gray-50 p-5">
      <summary className="cursor-pointer font-semibold text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
        {question}
      </summary>

      <p className="mt-3 text-sm leading-7 text-gray-600">
        {answer}
      </p>
    </details>
  );
}