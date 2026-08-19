'use client';

import { useState } from 'react';
import { RefreshCw, Copy, Check, Type } from 'lucide-react';

export default function TextRepeater() {
  const [text, setText] = useState('');
  const [count, setCount] = useState(3);
  const [separator, setSeparator] = useState('newline');
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);

  const repeatText = () => {
    if (!text.trim() || count < 1) return;

    const sep = separator === 'newline' ? '\n' : separator === 'comma' ? ', ' : ' ';
    const repeated = Array(count).fill(text).join(sep);
    setResult(repeated);
  };

  const copyToClipboard = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearAll = () => {
    setText('');
    setResult('');
    setCount(3);
  };

  return (
    <div className="min-h-screen py-20 px-4 bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      <div className="mx-auto max-w-2xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-500 to-green-500 p-3 shadow-lg shadow-emerald-500/25">
            <RefreshCw className="h-8 w-8 text-white" />
          </div>
          <h1 className="mt-4 text-3xl font-bold text-slate-900">Text Repeater</h1>
          <p className="mt-2 text-slate-600">Repeat text multiple times with custom separators.</p>
        </div>

        <div className="rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 p-6 shadow-xl space-y-6">
          <div>
            <label className="text-sm font-medium text-slate-700">Enter Text</label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type something to repeat..."
              className="input-field mt-1"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-700">Repeat Count</label>
              <input
                type="number"
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                min={1}
                max={100}
                className="input-field mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Separator</label>
              <select
                value={separator}
                onChange={(e) => setSeparator(e.target.value)}
                className="input-field mt-1"
              >
                <option value="newline">New Line</option>
                <option value="comma">Comma (,)</option>
                <option value="space">Space</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button onClick={repeatText} className="btn-primary">
              <RefreshCw className="mr-2 h-4 w-4" />
              Repeat Text
            </button>
            <button onClick={clearAll} className="rounded-full bg-slate-100 px-6 py-3 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-200">
              Clear
            </button>
          </div>

          {result && (
            <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200/50">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-slate-700">Result ({result.split(separator === 'newline' ? '\n' : separator === 'comma' ? ', ' : ' ').length} repetitions)</p>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 rounded-lg bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-600 transition-all hover:bg-indigo-200"
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
              <pre className="whitespace-pre-wrap font-sans text-sm text-slate-700 bg-white p-3 rounded-lg border border-slate-200/50 max-h-60 overflow-y-auto">
                {result}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}