"use client";

import { useId, useState } from "react";
import QRCode from "qrcode";
import {
  Download,
  Copy,
  RefreshCw,
  QrCode as QrCodeIcon,
  Wifi,
  Link2,
  Check,
  Eye,
  EyeOff,
} from "lucide-react";

type ActiveTab = "text" | "wifi";
type WifiSecurity = "WPA" | "WEP" | "nopass";

function escapeWifiValue(value: string): string {
  return value.replace(/([\\;,":])/g, "\\$1");
}

function sanitizeFilename(value: string): string {
  return value
    .trim()
    .replace(/[^a-zA-Z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

function dataUrlToBlob(dataUrl: string): Blob {
  const [header, base64] = dataUrl.split(",");

  if (!header || !base64) {
    throw new Error("Invalid image data.");
  }

  const mimeMatch = header.match(/data:(.*?);base64/);
  const mimeType = mimeMatch?.[1] || "image/png";

  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }

  return new Blob([bytes], { type: mimeType });
}

export default function QRCodeGenerator() {
  const generatedId = useId();

  const textInputId = `${generatedId}-text`;
  const ssidInputId = `${generatedId}-ssid`;
  const securityInputId = `${generatedId}-security`;
  const passwordInputId = `${generatedId}-password`;
  const hiddenInputId = `${generatedId}-hidden`;
  const errorId = `${generatedId}-error`;

  const [activeTab, setActiveTab] = useState<ActiveTab>("text");
  const [text, setText] = useState("");
  const [wifiSsid, setWifiSsid] = useState("");
  const [wifiPassword, setWifiPassword] = useState("");
  const [wifiSecurity, setWifiSecurity] =
    useState<WifiSecurity>("WPA");
  const [wifiHidden, setWifiHidden] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const generateQR = async () => {
    setLoading(true);
    setError("");
    setCopied(false);

    try {
      let qrData = "";

      if (activeTab === "wifi") {
        const ssid = wifiSsid.trim();

        if (!ssid) {
          setError("Please enter a Wi-Fi network name (SSID).");
          return;
        }

        const escapedSsid = escapeWifiValue(ssid);

        qrData = `WIFI:T:${wifiSecurity};S:${escapedSsid};`;

        if (wifiSecurity !== "nopass") {
          if (!wifiPassword) {
            setError("Please enter the Wi-Fi password.");
            return;
          }

          qrData += `P:${escapeWifiValue(wifiPassword)};`;
        }

        if (wifiHidden) {
          qrData += "H:true;";
        }
      } else {
        const value = text.trim();

        if (!value) {
          setError("Please enter text or a URL.");
          return;
        }

        qrData = value;
      }

      const generatedQr = await QRCode.toDataURL(qrData, {
        width: 300,
        margin: 2,
        errorCorrectionLevel: "M",
        color: {
          dark: "#1e293b",
          light: "#ffffff",
        },
      });

      setQrCodeUrl(generatedQr);
    } catch {
      setError(
        "Unable to generate the QR code. Please check your information and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const downloadQR = () => {
    if (!qrCodeUrl) return;

    const link = document.createElement("a");

    const safeSsid = sanitizeFilename(wifiSsid);

    const filename =
      activeTab === "wifi"
        ? `wifi-${safeSsid || "network"}.png`
        : "qrcode.png";

    link.download = filename;
    link.href = qrCodeUrl;

    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const copyToClipboard = async () => {
    if (!qrCodeUrl) return;

    setError("");

    try {
      if (
        typeof navigator === "undefined" ||
        !navigator.clipboard ||
        typeof ClipboardItem === "undefined"
      ) {
        throw new Error("Image clipboard is not supported.");
      }

      const blob = dataUrlToBlob(qrCodeUrl);

      await navigator.clipboard.write([
        new ClipboardItem({
          "image/png": blob,
        }),
      ]);

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      setError(
        "Copying the image is not supported by this browser. Please use Download PNG instead."
      );
    }
  };

  const fillWifiSample = () => {
    setWifiSsid("MyHomeWiFi");
    setWifiPassword("SecurePassword123");
    setWifiSecurity("WPA");
    setWifiHidden(false);
    setError("");
    setQrCodeUrl("");
  };

  const clearAll = () => {
    setText("");
    setWifiSsid("");
    setWifiPassword("");
    setWifiSecurity("WPA");
    setWifiHidden(false);
    setShowPassword(false);
    setQrCodeUrl("");
    setError("");
    setCopied(false);
  };

  const switchTab = (tab: ActiveTab) => {
    setActiveTab(tab);
    setQrCodeUrl("");
    setError("");
    setCopied(false);
  };

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div
        role="tablist"
        aria-label="QR code type"
        className="flex flex-wrap gap-2 border-b border-slate-200/50 pb-4"
      >
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "text"}
          aria-controls={`${generatedId}-text-panel`}
          onClick={() => switchTab("text")}
          className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${
            activeTab === "text"
              ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/25"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          <Link2 className="h-4 w-4" aria-hidden="true" />
          Text / URL
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "wifi"}
          aria-controls={`${generatedId}-wifi-panel`}
          onClick={() => switchTab("wifi")}
          className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${
            activeTab === "wifi"
              ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/25"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          <Wifi className="h-4 w-4" aria-hidden="true" />
          Wi-Fi Network
        </button>
      </div>

      {/* Input Section */}
      <div className="space-y-4">
        {activeTab === "text" && (
          <div
            id={`${generatedId}-text-panel`}
            role="tabpanel"
          >
            <label
              htmlFor={textInputId}
              className="text-sm font-medium text-slate-700"
            >
              Enter Text or URL
            </label>

            <input
              id={textInputId}
              type="text"
              value={text}
              onChange={(event) => {
                setText(event.target.value);
                setError("");
              }}
              placeholder="https://example.com or any text"
              className="input-field mt-1 w-full"
              autoComplete="off"
              aria-invalid={Boolean(error)}
              aria-describedby={error ? errorId : undefined}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  void generateQR();
                }
              }}
            />

            {error && (
              <p
                id={errorId}
                role="alert"
                aria-live="polite"
                className="mt-2 text-sm text-red-600"
              >
                {error}
              </p>
            )}
          </div>
        )}

        {activeTab === "wifi" && (
          <div
            id={`${generatedId}-wifi-panel`}
            role="tabpanel"
            className="space-y-4"
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* SSID */}
              <div>
                <label
                  htmlFor={ssidInputId}
                  className="text-sm font-medium text-slate-700"
                >
                  Network Name (SSID)
                  <span
                    className="ml-1 text-red-500"
                    aria-hidden="true"
                  >
                    *
                  </span>
                </label>

                <input
                  id={ssidInputId}
                  type="text"
                  value={wifiSsid}
                  onChange={(event) => {
                    setWifiSsid(event.target.value);
                    setError("");
                  }}
                  placeholder="MyHomeWiFi"
                  className="input-field mt-1 w-full"
                  autoComplete="off"
                />
              </div>

              {/* Security */}
              <div>
                <label
                  htmlFor={securityInputId}
                  className="text-sm font-medium text-slate-700"
                >
                  Security Type
                </label>

                <select
                  id={securityInputId}
                  value={wifiSecurity}
                  onChange={(event) =>
                    setWifiSecurity(
                      event.target.value as WifiSecurity
                    )
                  }
                  className="input-field mt-1 w-full"
                >
                  <option value="WPA">WPA / WPA2 / WPA3</option>
                  <option value="WEP">WEP</option>
                  <option value="nopass">
                    No Password (Open)
                  </option>
                </select>
              </div>
            </div>

            {/* Password */}
            {wifiSecurity !== "nopass" && (
              <div>
                <label
                  htmlFor={passwordInputId}
                  className="text-sm font-medium text-slate-700"
                >
                  Password
                </label>

                <div className="relative mt-1">
                  <input
                    id={passwordInputId}
                    type={showPassword ? "text" : "password"}
                    value={wifiPassword}
                    onChange={(event) => {
                      setWifiPassword(event.target.value);
                      setError("");
                    }}
                    placeholder="Enter Wi-Fi password"
                    className="input-field w-full pr-12"
                    autoComplete="off"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((current) => !current)
                    }
                    aria-label={
                      showPassword
                        ? "Hide Wi-Fi password"
                        : "Show Wi-Fi password"
                    }
                    title={
                      showPassword
                        ? "Hide Wi-Fi password"
                        : "Show Wi-Fi password"
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {showPassword ? (
                      <EyeOff
                        className="h-4 w-4"
                        aria-hidden="true"
                      />
                    ) : (
                      <Eye
                        className="h-4 w-4"
                        aria-hidden="true"
                      />
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Hidden network */}
            <div className="flex items-center gap-3">
              <input
                id={hiddenInputId}
                type="checkbox"
                checked={wifiHidden}
                onChange={(event) =>
                  setWifiHidden(event.target.checked)
                }
                className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              />

              <label
                htmlFor={hiddenInputId}
                className="cursor-pointer text-sm text-slate-600"
              >
                Hidden network (SSID is not broadcast)
              </label>
            </div>

            {error && (
              <p
                id={errorId}
                role="alert"
                aria-live="polite"
                className="text-sm text-red-600"
              >
                {error}
              </p>
            )}

            <button
              type="button"
              onClick={fillWifiSample}
              className="text-sm text-emerald-600 underline transition-colors hover:text-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              📝 Fill with sample Wi-Fi data
            </button>
          </div>
        )}

        {/* Generate */}
        <button
          type="button"
          onClick={() => void generateQR()}
          disabled={loading}
          aria-busy={loading}
          className="w-full btn-primary disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? (
            <>
              <RefreshCw
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
              Generating...
            </>
          ) : (
            <>
              <QrCodeIcon
                className="mr-2 h-4 w-4"
                aria-hidden="true"
              />
              Generate QR Code
            </>
          )}
        </button>
      </div>

      {/* Result */}
      {qrCodeUrl && (
        <section
          aria-labelledby={`${generatedId}-result-heading`}
          className="mt-8 border-t border-slate-200/50 pt-8"
        >
          <div className="flex flex-col items-center">
            <h3
              id={`${generatedId}-result-heading`}
              className="mb-3 text-sm font-medium text-slate-500"
            >
              {activeTab === "wifi"
                ? `Wi-Fi QR Code — ${wifiSsid}`
                : "Generated QR Code"}
            </h3>

            <div className="rounded-2xl bg-white p-4 shadow-lg">
              <img
                src={qrCodeUrl}
                alt={
                  activeTab === "wifi"
                    ? `QR code for Wi-Fi network ${wifiSsid}`
                    : "Generated QR code"
                }
                width={300}
                height={300}
                className="h-64 w-64"
              />
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={downloadQR}
                className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                <Download
                  className="h-4 w-4"
                  aria-hidden="true"
                />
                Download PNG
              </button>

              <button
                type="button"
                onClick={() => void copyToClipboard()}
                className="flex items-center gap-2 rounded-xl bg-slate-100 px-5 py-2.5 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                {copied ? (
                  <>
                    <Check
                      className="h-4 w-4 text-emerald-600"
                      aria-hidden="true"
                    />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy
                      className="h-4 w-4"
                      aria-hidden="true"
                    />
                    Copy Image
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={clearAll}
                className="flex items-center gap-2 rounded-xl bg-slate-100 px-5 py-2.5 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                <RefreshCw
                  className="h-4 w-4"
                  aria-hidden="true"
                />
                Clear
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Privacy / Information */}
      <div className="rounded-2xl border border-indigo-200/50 bg-indigo-50/50 p-4">
        <p className="text-sm text-slate-600">
          <span className="font-semibold text-indigo-600">
            💡 Pro Tip:
          </span>{" "}
          {activeTab === "wifi" ? (
            <>
              Your Wi-Fi QR code can make it easier for guests to
              connect without manually typing the password.

              <span className="mt-1 block text-xs text-slate-500">
                QR scanning and Wi-Fi connection behavior can vary
                by device and operating system.
              </span>
            </>
          ) : (
            <>
              QR codes are generated directly in your browser. This
              component does not send the QR content to a ToolNoveHub
              server.
            </>
          )}
        </p>
      </div>

      {/* Wi-Fi Instructions */}
      {activeTab === "wifi" && qrCodeUrl && (
        <div className="rounded-2xl border border-emerald-200/50 bg-emerald-50/50 p-4">
          <h4 className="text-sm font-semibold text-emerald-700">
            📱 How to Scan
          </h4>

          <ul className="mt-2 space-y-1 text-sm text-slate-600">
            <li>
              <span className="font-medium">iPhone:</span>{" "}
              Open Camera → Point at the QR code → Follow the
              notification.
            </li>

            <li>
              <span className="font-medium">Android:</span>{" "}
              Open Camera or a QR scanner → Point at the QR code →
              Follow the displayed option.
            </li>

            <li>
              <span className="font-medium">Other devices:</span>{" "}
              Use a compatible QR scanner application.
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}