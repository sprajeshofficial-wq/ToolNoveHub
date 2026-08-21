'use client';

import { useState } from 'react';
import { Key, Copy, Check, RefreshCw, Shield, ShieldCheck, ShieldAlert } from 'lucide-react';

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    let chars = '';
    if (includeLowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (includeUppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeNumbers) chars += '0123456789';
    if (includeSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (!chars) {
      setPassword('Please select at least one option');
      return;
    }

    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(result);
  };

  const copyToClipboard = async () => {
    if (!password) return;
    await navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getPasswordStrength = () => {
    if (!password) return { label: 'None', color: 'text-slate-400', icon: Shield };
    
    let score = 0;
    if (length >= 12) score++;
    if (length >= 16) score++;
    if (includeUppercase) score++;
    if (includeLowercase) score++;
    if (includeNumbers) score++;
    if (includeSymbols) score++;

    if (score >= 5) return { label: 'Strong', color: 'text-emerald-600', icon: ShieldCheck };
    if (score >= 3) return { label: 'Medium', color: 'text-amber-600', icon: Shield };
    return { label: 'Weak', color: 'text-red-600', icon: ShieldAlert };
  };

  const strength = getPasswordStrength();
  const StrengthIcon = strength.icon;

  // Generate password on first load
  useState(() => {
    generatePassword();
  }, []);

  return (
    <div className="space-y-6">
      {/* Password Display */}
      <div>
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={password}
              readOnly
              placeholder="Your password will appear here"
              className="w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-4 py-3 font-mono text-sm focus:outline-none"
            />
          </div>
          <button
            onClick={copyToClipboard}
            className="rounded-lg bg-indigo-100 px-4 py-3 text-indigo-600 hover:bg-indigo-200 transition-colors disabled:opacity-50"
            disabled={!password}
          >
            {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
          </button>
          <button
            onClick={generatePassword}
            className="rounded-lg bg-indigo-600 px-4 py-3 text-white hover:bg-indigo-700 transition-colors"
          >
            <RefreshCw className="h-5 w-5" />
          </button>
        </div>

        {/* Strength Indicator */}
        {password && (
          <div className="mt-2 flex items-center gap-2">
            <StrengthIcon className={`h-4 w-4 ${strength.color}`} />
            <span className={`text-sm font-medium ${strength.color}`}>
              Strength: {strength.label}
            </span>
            <div className="flex-1 h-1.5 rounded-full bg-slate-200 overflow-hidden ml-2">
              <div 
                className={`h-full rounded-full transition-all ${
                  strength.label === 'Strong' ? 'bg-emerald-500 w-full' :
                  strength.label === 'Medium' ? 'bg-amber-500 w-1/2' :
                  'bg-red-500 w-1/4'
                }`}
              />
            </div>
          </div>
        )}
      </div>

      {/* Length */}
      <div>
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-slate-700">Password Length</label>
          <span className="text-sm font-medium text-indigo-600">{length}</span>
        </div>
        <input
          type="range"
          min="4"
          max="64"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-indigo-100"
        />
        <div className="flex justify-between text-xs text-slate-400 mt-1">
          <span>4</span>
          <span>64</span>
        </div>
      </div>

      {/* Options */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-slate-700">Include:</p>
        <div className="grid grid-cols-2 gap-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={includeUppercase}
              onChange={(e) => setIncludeUppercase(e.target.checked)}
              className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="text-sm">Uppercase (A-Z)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={includeLowercase}
              onChange={(e) => setIncludeLowercase(e.target.checked)}
              className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="text-sm">Lowercase (a-z)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="text-sm">Numbers (0-9)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
              className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="text-sm">Symbols (!@#$)</span>
          </label>
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={generatePassword}
        className="w-full btn-primary"
      >
        <RefreshCw className="mr-2 h-4 w-4" />
        Generate Password
      </button>

      {/* Info */}
      <div className="rounded-2xl bg-indigo-50/50 p-4 border border-indigo-200/50">
        <p className="text-sm text-slate-600">
          <span className="font-semibold text-indigo-600">🔒 Pro Tip:</span> 
          Use 16+ characters with all options selected for the strongest passwords.
          Your password is generated entirely in your browser — <span className="font-medium">100% private</span>.
        </p>
      </div>
    </div>
  );
}