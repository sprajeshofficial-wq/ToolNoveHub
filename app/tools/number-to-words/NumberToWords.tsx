'use client';

import { useState } from 'react';
import { Hash, Copy, Check, Type } from 'lucide-react';

export default function NumberToWords() {
  const [number, setNumber] = useState('');
  const [words, setWords] = useState('');
  const [copied, setCopied] = useState(false);

  const convertToWords = () => {
    const num = parseInt(number);
    if (isNaN(num) || num < 0 || num > 999999999) {
      setWords('Please enter a valid number between 0 and 999,999,999');
      return;
    }

    const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];

    const convertHundreds = (n: number): string => {
      if (n === 0) return '';
      const h = Math.floor(n / 100);
      const remainder = n % 100;
      let result = '';
      if (h > 0) result += ones[h] + ' hundred';
      if (remainder > 0) {
        if (result) result += ' ';
        if (remainder < 10) result += ones[remainder];
        else if (remainder < 20) result += teens[remainder - 10];
        else {
          const tensDigit = Math.floor(remainder / 10);
          const onesDigit = remainder % 10;
          result += tens[tensDigit];
          if (onesDigit > 0) result += '-' + ones[onesDigit];
        }
      }
      return result;
    };

    if (num === 0) { setWords('zero'); return; }

    const millions = Math.floor(num / 1000000);
    const thousands = Math.floor((num % 1000000) / 1000);
    const hundreds = num % 1000;

    let result = '';
    if (millions > 0) { result += convertHundreds(millions) + ' million'; if (thousands > 0 || hundreds > 0) result += ' '; }
    if (thousands > 0) { result += convertHundreds(thousands) + ' thousand'; if (hundreds > 0) result += ' '; }
    if (hundreds > 0) result += convertHundreds(hundreds);

    setWords(result);
  };

  const copyToClipboard = async () => {
    if (!words) return;
    await navigator.clipboard.writeText(words);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearAll = () => { setNumber(''); setWords(''); };

  return (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-medium text-slate-700">Enter Number</label>
        <input type="number" value={number} onChange={(e) => setNumber(e.target.value)} placeholder="Enter a number (0 - 999,999,999)" className="input-field mt-1" min={0} max={999999999} onKeyDown={(e) => e.key === 'Enter' && convertToWords()} />
        <p className="mt-1 text-xs text-slate-400">Supports numbers from 0 to 999,999,999</p>
      </div>

      <div className="flex flex-wrap gap-3">
        <button onClick={convertToWords} className="btn-primary"><Type className="mr-2 h-4 w-4" /> Convert to Words</button>
        <button onClick={clearAll} className="rounded-full bg-slate-100 px-6 py-3 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-200">Clear</button>
      </div>

      {words && (
        <div className="rounded-2xl bg-amber-50/50 p-4 border border-amber-200/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">In Words</p>
              <p className="text-lg font-medium text-slate-900 capitalize">{words}</p>
            </div>
            <button onClick={copyToClipboard} className="flex items-center gap-2 rounded-lg bg-amber-100 px-4 py-2 text-sm font-medium text-amber-700 transition-all hover:bg-amber-200">
              {copied ? <><Check className="h-4 w-4" /> Copied!</> : <><Copy className="h-4 w-4" /> Copy</>}
            </button>
          </div>
        </div>
      )}

      <div className="rounded-xl bg-slate-50 p-4 border border-slate-200/50">
        <div className="grid grid-cols-2 gap-2 text-center text-sm">
          <div className="p-2 rounded-lg bg-white"><p className="text-slate-500">123</p><p className="font-semibold text-slate-900">one hundred twenty-three</p></div>
          <div className="p-2 rounded-lg bg-white"><p className="text-slate-500">1000</p><p className="font-semibold text-slate-900">one thousand</p></div>
          <div className="p-2 rounded-lg bg-white"><p className="text-slate-500">1000000</p><p className="font-semibold text-slate-900">one million</p></div>
          <div className="p-2 rounded-lg bg-white"><p className="text-slate-500">0</p><p className="font-semibold text-slate-900">zero</p></div>
        </div>
      </div>
    </div>
  );
}