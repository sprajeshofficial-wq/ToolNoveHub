'use client';

import { useState } from 'react';
import { FileText, Copy, Check, RefreshCw } from 'lucide-react';

export default function FileSizeConverter() {
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('MB');
  const [toUnit, setToUnit] = useState('KB');
  const [result, setResult] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const units = ['B', 'KB', 'MB', 'GB', 'TB'];

  const convert = () => {
    const num = parseFloat(value);
    if (isNaN(num) || num < 0) {
      setResult(null);
      return;
    }

    const fromIndex = units.indexOf(fromUnit);
    const toIndex = units.indexOf(toUnit);
    const bytes = num * Math.pow(1024, fromIndex);
    const converted = bytes / Math.pow(1024, toIndex);
    setResult(converted);
  };

  const copyToClipboard = async () => {
    if (result === null) return;
    await navigator.clipboard.writeText(result.toString());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearAll = () => {
    setValue('');
    setResult(null);
  };

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setResult(null);
  };

  return (
    <div className="min-h-screen py-20 px-4 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="mx-auto max-w-2xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 p-3 shadow-lg shadow-blue-500/25">
            <FileText className="h-8 w-8 text-white" />
          </div>
          <h1 className="mt-4 text-3xl font-bold text-slate-900">File Size Converter</h1>
          <p className="mt-2 text-slate-600">Convert between bytes, KB, MB, GB, and TB.</p>
        </div>

        <div className="rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 p-6 shadow-xl space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {/* From */}
            <div>
              <label className="text-sm font-medium text-slate-700">From</label>
              <div className="flex gap-2 mt-1">
                <input
                  type="number"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="0"
                  className="input-field flex-1"
                  min={0}
                />
                <select
                  value={fromUnit}
                  onChange={(e) => setFromUnit(e.target.value)}
                  className="input-field w-24"
                >
                  {units.map((unit) => (
                    <option key={unit} value={unit}>{unit}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* To */}
            <div>
              <label className="text-sm font-medium text-slate-700">To</label>
              <div className="flex gap-2 mt-1">
                <input
                  type="text"
                  value={result !== null ? result.toFixed(4) : ''}
                  readOnly
                  placeholder="Result"
                  className="input-field flex-1 bg-slate-50"
                />
                <select
                  value={toUnit}
                  onChange={(e) => setToUnit(e.target.value)}
                  className="input-field w-24"
                >
                  {units.map((unit) => (
                    <option key={unit} value={unit}>{unit}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button onClick={convert} className="btn-primary">
              <RefreshCw className="mr-2 h-4 w-4" />
              Convert
            </button>
            <button onClick={swapUnits} className="rounded-full bg-slate-100 px-6 py-3 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-200">
              Swap Units
            </button>
            <button onClick={clearAll} className="rounded-full bg-slate-100 px-6 py-3 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-200">
              Clear
            </button>
          </div>

          {result !== null && (
            <div className="rounded-2xl bg-blue-50/50 p-4 border border-blue-200/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Result</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {result.toFixed(4)} {toUnit}
                  </p>
                  <p className="text-sm text-slate-500">
                    {value} {fromUnit} = {result.toFixed(4)} {toUnit}
                  </p>
                </div>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 rounded-lg bg-blue-100 px-4 py-2 text-sm font-medium text-blue-600 transition-all hover:bg-blue-200"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      Copy
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Reference */}
          <div className="rounded-xl bg-slate-50 p-4 border border-slate-200/50">
            <p className="text-sm font-medium text-slate-700">Reference:</p>
            <div className="grid grid-cols-2 gap-2 mt-2 text-sm text-slate-500">
              <div>1 KB = 1024 B</div>
              <div>1 MB = 1024 KB</div>
              <div>1 GB = 1024 MB</div>
              <div>1 TB = 1024 GB</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}