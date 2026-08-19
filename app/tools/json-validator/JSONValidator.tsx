'use client';

import { useState } from 'react';
import { Braces, Check, X, Copy, AlertCircle, CheckCircle } from 'lucide-react';

export default function JSONValidator() {
  const [input, setInput] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const validateJSON = () => {
    if (!input.trim()) { setIsValid(null); setErrorMessage('Please enter JSON to validate'); return; }
    try { JSON.parse(input); setIsValid(true); setErrorMessage(''); }
    catch (err) { setIsValid(false); setErrorMessage((err as Error).message); }
  };

  const formatJSON = () => {
    if (!input.trim()) return;
    try { const parsed = JSON.parse(input); const formatted = JSON.stringify(parsed, null, 2); setInput(formatted); setIsValid(true); setErrorMessage(''); }
    catch (err) { setIsValid(false); setErrorMessage((err as Error).message); }
  };

  const copyToClipboard = async () => {
    if (!input) return;
    await navigator.clipboard.writeText(input);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearAll = () => { setInput(''); setIsValid(null); setErrorMessage(''); };

  return (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-medium text-slate-700">Enter JSON to Validate</label>
        <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder='{"name": "ToolNoveHub", "type": "online tools"}' className="textarea-field font-mono text-sm" rows={8} />
      </div>

      <div className="flex flex-wrap gap-3">
        <button onClick={validateJSON} className="btn-primary"><Check className="mr-2 h-4 w-4" /> Validate</button>
        <button onClick={formatJSON} className="rounded-full bg-slate-100 px-6 py-3 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-200">Format</button>
        <button onClick={copyToClipboard} className="rounded-full bg-slate-100 px-6 py-3 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-200"><Copy className="mr-2 h-4 w-4 inline" /> Copy</button>
        <button onClick={clearAll} className="rounded-full bg-red-50 px-6 py-3 text-sm font-semibold text-red-600 transition-all hover:bg-red-100">Clear</button>
      </div>

      {isValid !== null && (
        <div className={`rounded-2xl p-4 border ${isValid ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'}`}>
          <div className="flex items-center gap-3">
            {isValid ? <CheckCircle className="h-6 w-6 text-emerald-500" /> : <AlertCircle className="h-6 w-6 text-red-500" />}
            <div>
              <p className={`font-semibold ${isValid ? 'text-emerald-700' : 'text-red-700'}`}>{isValid ? '✅ Valid JSON' : '❌ Invalid JSON'}</p>
              {errorMessage && <p className="text-sm text-red-600 font-mono mt-1">{errorMessage}</p>}
              {isValid && <p className="text-sm text-emerald-600 mt-1">Your JSON is valid and properly formatted.</p>}
            </div>
          </div>
        </div>
      )}

      <div className="rounded-xl bg-slate-50 p-4 border border-slate-200/50">
        <p className="text-sm font-medium text-slate-700">Example JSON:</p>
        <pre className="mt-1 text-xs text-slate-500 bg-white p-3 rounded-lg border border-slate-200/50 overflow-x-auto">{`{\n  "name": "ToolNoveHub",\n  "type": "online tools",\n  "features": ["free", "private", "fast"]\n}`}</pre>
      </div>
    </div>
  );
}