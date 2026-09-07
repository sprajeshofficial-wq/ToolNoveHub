"use client";

import { useState } from "react";
import {
  AlertCircle,
  Check,
  CheckCircle,
  Copy,
  FileJson,
  RotateCcw,
} from "lucide-react";

const exampleJSON = `{
  "name": "ToolNoveHub",
  "type": "Online Tools",
  "free": true,
  "tools": [
    "QR Code Generator",
    "Word Counter",
    "Age Calculator"
  ]
}`;

export default function JSONValidator() {
  const [input, setInput] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const handleInputChange = (value: string) => {
    setInput(value);
    setIsValid(null);
    setErrorMessage("");
    setCopied(false);
  };

  const validateJSON = () => {
    setCopied(false);

    if (!input.trim()) {
      setIsValid(null);
      setErrorMessage("Please enter JSON to validate.");
      return;
    }

    try {
      JSON.parse(input);

      setIsValid(true);
      setErrorMessage("");
    } catch (error) {
      setIsValid(false);

      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage(
          "The JSON could not be parsed. Check the syntax and try again."
        );
      }
    }
  };

  const formatJSON = () => {
    setCopied(false);

    if (!input.trim()) {
      setIsValid(null);
      setErrorMessage("Please enter JSON to format.");
      return;
    }

    try {
      const parsed: unknown = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);

      setInput(formatted);
      setIsValid(true);
      setErrorMessage("");
    } catch (error) {
      setIsValid(false);

      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage(
          "The JSON could not be parsed. Check the syntax and try again."
        );
      }
    }
  };

  const copyToClipboard = async () => {
    if (!input) {
      return;
    }

    try {
      await navigator.clipboard.writeText(input);
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      setCopied(false);
      setErrorMessage(
        "Copy is unavailable in this browser. Select the JSON and copy it manually."
      );
    }
  };

  const clearAll = () => {
    setInput("");
    setIsValid(null);
    setErrorMessage("");
    setCopied(false);
  };

  const loadExample = () => {
    setInput(exampleJSON);
    setIsValid(null);
    setErrorMessage("");
    setCopied(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <label
              htmlFor="json-validator-input"
              className="text-sm font-semibold text-slate-800"
            >
              Enter JSON to Validate
            </label>

            <p className="mt-1 text-sm text-slate-500">
              Paste JSON below and validate its syntax in your browser.
            </p>
          </div>

          <button
            type="button"
            onClick={loadExample}
            className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <FileJson className="mr-2 h-4 w-4" />
            Load Example
          </button>
        </div>

        <textarea
          id="json-validator-input"
          value={input}
          onChange={(event) => handleInputChange(event.target.value)}
          placeholder='{"name":"ToolNoveHub","free":true}'
          spellCheck={false}
          autoCapitalize="off"
          autoCorrect="off"
          className="mt-4 min-h-[280px] w-full resize-y rounded-xl border border-slate-300 bg-slate-950 px-4 py-4 font-mono text-sm leading-6 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          aria-describedby="json-validator-help"
        />

        <p
          id="json-validator-help"
          className="mt-2 text-xs text-slate-500"
        >
          JSON keys and string values must use double quotation marks.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <button
          type="button"
          onClick={validateJSON}
          className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <Check className="mr-2 h-4 w-4" />
          Validate JSON
        </button>

        <button
          type="button"
          onClick={formatJSON}
          className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Format JSON
        </button>

        <button
          type="button"
          onClick={copyToClipboard}
          disabled={!input}
          className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Copy className="mr-2 h-4 w-4" />
          {copied ? "Copied!" : "Copy"}
        </button>

        <button
          type="button"
          onClick={clearAll}
          disabled={!input && !errorMessage && isValid === null}
          className="inline-flex items-center justify-center rounded-xl border border-red-200 bg-red-50 px-6 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Clear
        </button>
      </div>

      {errorMessage && (
        <div
          className={`rounded-2xl border p-4 ${
            isValid === false
              ? "border-red-200 bg-red-50"
              : "border-amber-200 bg-amber-50"
          }`}
          role={isValid === false ? "alert" : "status"}
          aria-live="polite"
        >
          <div className="flex items-start gap-3">
            <AlertCircle
              className={`mt-0.5 h-6 w-6 shrink-0 ${
                isValid === false ? "text-red-500" : "text-amber-500"
              }`}
              aria-hidden="true"
            />

            <div>
              <p
                className={`font-semibold ${
                  isValid === false ? "text-red-700" : "text-amber-700"
                }`}
              >
                {isValid === false ? "Invalid JSON" : "Input required"}
              </p>

              <p
                className={`mt-1 text-sm font-mono ${
                  isValid === false ? "text-red-600" : "text-amber-700"
                }`}
              >
                {errorMessage}
              </p>
            </div>
          </div>
        </div>
      )}

      {isValid === true && !errorMessage && (
        <div
          className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4"
          role="status"
          aria-live="polite"
        >
          <div className="flex items-start gap-3">
            <CheckCircle
              className="mt-0.5 h-6 w-6 shrink-0 text-emerald-500"
              aria-hidden="true"
            />

            <div>
              <p className="font-semibold text-emerald-700">
                Valid JSON
              </p>

              <p className="mt-1 text-sm text-emerald-600">
                The JSON syntax is valid and can be parsed successfully.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
        <p className="text-sm font-semibold text-slate-700">
          Example JSON
        </p>

        <pre className="mt-3 overflow-x-auto rounded-lg border border-slate-200 bg-white p-4 text-xs leading-6 text-slate-600">
          {exampleJSON}
        </pre>
      </div>
    </div>
  );
}