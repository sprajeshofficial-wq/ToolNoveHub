'use client';

import { useState } from 'react';
import { Braces, Check, Copy, RefreshCw, AlertCircle } from 'lucide-react';

export default function JSONFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const formatJSON = () => {
    if (!input.trim()) { setError('Please enter JSON to format'); return; }
    try { const parsed = JSON.parse(input); const formatted = JSON.stringify(parsed, null, 2); setOutput(formatted); setError(''); }
    catch (err) { setError('Invalid JSON: ' + (err as Error).message); setOutput(''); }
  };

  const minifyJSON = () => {
    if (!input.trim()) { setError('Please enter JSON to minify'); return; }
    try { const parsed = JSON.parse(input); const minified = JSON.stringify(parsed); setOutput(minified); setError(''); }
    catch (err) { setError('Invalid JSON: ' + (err as Error).message); setOutput(''); }
  };

  const copyToClipboard = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearAll = () => { setInput(''); setOutput(''); setError(''); };

  return (
    <div className="space-y-6">
      {error && (
        <div className="flex items-start gap-2 rounded-xl bg-red-50 p-4 border border-red-200">
          <AlertCircle className="h-5 w-5 flex-shrink-0 text-red-500 mt-0.5" />
          <div><p className="text-sm font-medium text-red-700">Error</p><p className="text-sm text-red-600">{error}</p></div>
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-slate-700">Input JSON</label>
          {input && <button onClick={clearAll} className="text-sm text-slate-500 hover:text-red-500 transition-colors">Clear</button>}
        </div>
        <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder='{"name": "ToolNoveHub", "type": "online tools"}' className="textarea-field font-mono text-sm" rows={6} />
      </div>

      <div className="flex flex-wrap gap-3">
        <button onClick={formatJSON} className="flex items-center gap-2 btn-primary"><Braces className="h-4 w-4" /> Format &amp; Validate</button>
        <button onClick={minifyJSON} className="flex items-center gap-2 rounded-full bg-slate-100 px-6 py-3 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-200"><RefreshCw className="h-4 w-4" /> Minify</button>
      </div>

      {output && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-slate-700">Formatted JSON</label>
            <button onClick={copyToClipboard} className="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-1.5 text-sm text-slate-700 transition-all hover:bg-slate-200">
              {copied ? <><Check className="h-4 w-4 text-green-500" /> Copied!</> : <><Copy className="h-4 w-4" /> Copy</>}
            </button>
          </div>
          <pre className="rounded-xl bg-slate-50 p-4 font-mono text-sm border border-slate-200/50 overflow-x-auto">{output}</pre>
        </div>
      )}

      <div className="rounded-2xl bg-violet-50/50 p-4 border border-violet-200/50">
        <p className="text-sm text-slate-600"><span className="font-semibold text-violet-600">🔒 Privacy:</span> Your JSON data is processed entirely in your browser. Nothing is sent to our servers — <span className="font-medium">100% private</span>.</p>
      </div>
    </div>
  );
}