"use client";

import { useState } from "react";
import {
  Check,
  Copy,
  Key,
  RefreshCw,
  Shield,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";

const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()_+-=[]{}|;:,.<>?";

function secureRandomIndex(max: number): number {
  if (!Number.isInteger(max) || max <= 0) {
    throw new Error("Invalid random range.");
  }

  const maxUint32 = 0xffffffff;
  const limit = Math.floor((maxUint32 + 1) / max) * max;

  const array = new Uint32Array(1);

  do {
    crypto.getRandomValues(array);
  } while (array[0] >= limit);

  return array[0] % max;
}

function secureRandomChar(chars: string): string {
  return chars[secureRandomIndex(chars.length)];
}

function generateSecurePassword(
  length: number,
  includeUppercase: boolean,
  includeLowercase: boolean,
  includeNumbers: boolean,
  includeSymbols: boolean
): string {
  const selectedSets: string[] = [];

  if (includeLowercase) selectedSets.push(LOWERCASE);
  if (includeUppercase) selectedSets.push(UPPERCASE);
  if (includeNumbers) selectedSets.push(NUMBERS);
  if (includeSymbols) selectedSets.push(SYMBOLS);

  if (selectedSets.length === 0) {
    throw new Error("Select at least one character type.");
  }

  if (length < selectedSets.length) {
    throw new Error(
      "Password length must be at least the number of selected character types."
    );
  }

  const allCharacters = selectedSets.join("");
  const passwordCharacters: string[] = [];

  // Guarantee at least one character from every selected category.
  for (const characterSet of selectedSets) {
    passwordCharacters.push(secureRandomChar(characterSet));
  }

  // Fill remaining positions using the combined character set.
  while (passwordCharacters.length < length) {
    passwordCharacters.push(secureRandomChar(allCharacters));
  }

  // Fisher-Yates shuffle using cryptographically secure randomness.
  for (let i = passwordCharacters.length - 1; i > 0; i--) {
    const j = secureRandomIndex(i + 1);
    [passwordCharacters[i], passwordCharacters[j]] = [
      passwordCharacters[j],
      passwordCharacters[i],
    ];
  }

  return passwordCharacters.join("");
}

type Strength = {
  label: "Weak" | "Medium" | "Strong";
  percentage: number;
  textClass: string;
  barClass: string;
  icon: typeof Shield;
};

function getPasswordStrength(
  length: number,
  includeUppercase: boolean,
  includeLowercase: boolean,
  includeNumbers: boolean,
  includeSymbols: boolean
): Strength {
  let score = 0;

  if (length >= 12) score++;
  if (length >= 16) score++;
  if (length >= 24) score++;
  if (includeUppercase) score++;
  if (includeLowercase) score++;
  if (includeNumbers) score++;
  if (includeSymbols) score++;

  if (score >= 6) {
    return {
      label: "Strong",
      percentage: 100,
      textClass: "text-emerald-600",
      barClass: "w-full bg-emerald-500",
      icon: ShieldCheck,
    };
  }

  if (score >= 4) {
    return {
      label: "Medium",
      percentage: 60,
      textClass: "text-amber-600",
      barClass: "w-3/5 bg-amber-500",
      icon: Shield,
    };
  }

  return {
    label: "Weak",
    percentage: 30,
    textClass: "text-red-600",
    barClass: "w-1/3 bg-red-500",
    icon: ShieldAlert,
  };
}

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);

  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const strength = getPasswordStrength(
    length,
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSymbols
  );

  const generatePassword = () => {
    setCopied(false);
    setError("");

    try {
      const generated = generateSecurePassword(
        length,
        includeUppercase,
        includeLowercase,
        includeNumbers,
        includeSymbols
      );

      setPassword(generated);
    } catch (generationError) {
      setPassword("");

      setError(
        generationError instanceof Error
          ? generationError.message
          : "Unable to generate a password."
      );
    }
  };

  const copyToClipboard = async () => {
    if (!password || error) {
      return;
    }

    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      setCopied(false);
      setError("Unable to copy the password. Please copy it manually.");
    }
  };

  const handleOptionChange = (
    setter: (value: boolean) => void,
    value: boolean
  ) => {
    setter(value);
    setCopied(false);
    setError("");
  };

  const handleLengthChange = (value: number) => {
    setLength(value);
    setCopied(false);
    setError("");
  };

  return (
    <div className="space-y-6">
      {/* Password display */}
      <div>
        <label
          htmlFor="generated-password"
          className="mb-2 block text-sm font-semibold text-slate-900"
        >
          Generated password
        </label>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative min-w-0 flex-1">
            <Key
              aria-hidden="true"
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            />

            <input
              id="generated-password"
              type="text"
              value={password}
              readOnly
              spellCheck={false}
              autoComplete="off"
              placeholder="Your password will appear here"
              aria-describedby="password-status"
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 font-mono text-sm text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <button
            type="button"
            onClick={copyToClipboard}
            disabled={!password || Boolean(error)}
            aria-label={copied ? "Password copied" : "Copy password"}
            className="rounded-lg bg-indigo-100 px-4 py-3 text-indigo-600 transition-colors hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {copied ? (
              <Check aria-hidden="true" className="h-5 w-5" />
            ) : (
              <Copy aria-hidden="true" className="h-5 w-5" />
            )}
          </button>

          <button
            type="button"
            onClick={generatePassword}
            aria-label="Generate a new password"
            className="rounded-lg bg-indigo-600 px-4 py-3 text-white transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <RefreshCw
              aria-hidden="true"
              className="h-5 w-5"
            />
          </button>
        </div>

        <div
          id="password-status"
          role="status"
          aria-live="polite"
          className="mt-2 min-h-5 text-sm"
        >
          {copied && (
            <span className="text-emerald-600">
              Password copied to your clipboard.
            </span>
          )}

          {error && (
            <span className="text-red-600">
              {error}
            </span>
          )}
        </div>

        {/* Strength indicator */}
        {password && !error && (
          <div className="mt-2">
            <div className="flex items-center gap-2">
              <strength.icon
                aria-hidden="true"
                className={`h-4 w-4 ${strength.textClass}`}
              />

              <span
                className={`text-sm font-medium ${strength.textClass}`}
              >
                Strength: {strength.label}
              </span>

              <span className="sr-only">
                Estimated strength score: {strength.percentage} percent.
              </span>
            </div>

            <div
              className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-200"
              aria-hidden="true"
            >
              <div
                className={`h-full rounded-full transition-all ${strength.barClass}`}
              />
            </div>
          </div>
        )}
      </div>

      {/* Length */}
      <div>
        <div className="flex items-center justify-between">
          <label
            htmlFor="password-length"
            className="text-sm font-semibold text-slate-700"
          >
            Password length
          </label>

          <output
            htmlFor="password-length"
            className="text-sm font-semibold text-indigo-600"
          >
            {length} characters
          </output>
        </div>

        <input
          id="password-length"
          type="range"
          min="4"
          max="64"
          value={length}
          onChange={(event) =>
            handleLengthChange(Number(event.target.value))
          }
          aria-label="Password length"
          className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-lg bg-indigo-100 accent-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <div className="mt-1 flex justify-between text-xs text-slate-400">
          <span>4</span>
          <span>64</span>
        </div>
      </div>

      {/* Character options */}
      <fieldset className="space-y-3">
        <legend className="text-sm font-semibold text-slate-700">
          Character types
        </legend>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-200 p-3 transition hover:bg-slate-50">
            <input
              type="checkbox"
              checked={includeUppercase}
              onChange={(event) =>
                handleOptionChange(
                  setIncludeUppercase,
                  event.target.checked
                )
              }
              className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
            />

            <span className="text-sm text-slate-700">
              Uppercase (A-Z)
            </span>
          </label>

          <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-200 p-3 transition hover:bg-slate-50">
            <input
              type="checkbox"
              checked={includeLowercase}
              onChange={(event) =>
                handleOptionChange(
                  setIncludeLowercase,
                  event.target.checked
                )
              }
              className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
            />

            <span className="text-sm text-slate-700">
              Lowercase (a-z)
            </span>
          </label>

          <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-200 p-3 transition hover:bg-slate-50">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={(event) =>
                handleOptionChange(
                  setIncludeNumbers,
                  event.target.checked
                )
              }
              className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
            />

            <span className="text-sm text-slate-700">
              Numbers (0-9)
            </span>
          </label>

          <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-200 p-3 transition hover:bg-slate-50">
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={(event) =>
                handleOptionChange(
                  setIncludeSymbols,
                  event.target.checked
                )
              }
              className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
            />

            <span className="text-sm text-slate-700">
              Symbols (!@#$)
            </span>
          </label>
        </div>
      </fieldset>

      {/* Generate */}
      <button
        type="button"
        onClick={generatePassword}
        className="flex w-full items-center justify-center rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <RefreshCw
          aria-hidden="true"
          className="mr-2 h-4 w-4"
        />
        Generate Password
      </button>

      {/* Security information */}
      <div className="rounded-2xl border border-indigo-200/60 bg-indigo-50/50 p-4">
        <div className="flex gap-3">
          <ShieldCheck
            aria-hidden="true"
            className="mt-0.5 h-5 w-5 shrink-0 text-indigo-600"
          />

          <div>
            <p className="text-sm font-semibold text-indigo-700">
              Security tip
            </p>

            <p className="mt-1 text-sm leading-6 text-slate-600">
              For important accounts, consider using a password
              of 16 or more characters with several character types.
              Use a different password for each account and store
              passwords in a trusted password manager when appropriate.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}