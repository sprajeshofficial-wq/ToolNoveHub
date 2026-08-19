'use client';

import { useState } from 'react';
import { Binary, Copy, Check, ArrowRight, RefreshCw } from 'lucide-react';

export default function BinaryConverter() {
  const [text, setText] = useState('');
  const [binary, setBinary] = useState('');
  const [mode, setMode] = useState<'text-to-binary' | 'binary-to-text'>('text-to-binary');
  const [copied, setCopied] = useState(false);

  const convertTextToBinary = () => {
    if (!text.trim()) return;
    const result = text.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
    setBinary(result);
  };

  const convertBinaryToText = () => {
    if (!binary.trim()) return;
    try {
      const result = binary.split(' ').map(bin => String.fromCharCode(parseInt(bin, 2))).join('');
      setText(result);
    } catch { setText('Invalid binary format'); }
  };

  const handleConvert = () => { mode === 'text-to-binary' ? convertTextToBinary() : convertBinaryToText(); };

  const copyToClipboard = async () => {
    const data = mode === 'text-to-binary' ? binary : text;
    if (!data) return;
    await navigator.clipboard.writeText(data);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearAll = () => { setText(''); setBinary(''); };

  const swapMode = () => { setMode(mode === 'text-to-binary' ? 'binary-to-text' : 'text-to-binary'); clearAll(); };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <button onClick={() => setMode('text-to-binary')} className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${mode === 'text-to-binary' ? 'bg-rose-600 text-white shadow-lg shadow-rose-500/25' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>Text → Binary</button>
          <button onClick={() => setMode('binary-to-text')} className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${mode === 'binary-to-text' ? 'bg-rose-600 text-white shadow-lg shadow-rose-500/25' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>Binary → Text</button>
        </div>
        <button onClick={swapMode} className="rounded-full bg-slate-100 p-2 text-slate-600 transition-all hover:bg-slate-200" title="Swap Mode"><RefreshCw className="h-5 w-5" /></button>
      </div>

      <div>
        <label className="text-sm font-medium text-slate-700">{mode === 'text-to-binary' ? 'Enter Text' : 'Enter Binary (space separated)'}</label>
        {mode === 'text-to-binary' ? (
          <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Hello World" className="input-field mt-1" onKeyDown={(e) => e.key === 'Enter' && handleConvert()} />
        ) : (
          <input type="text" value={binary} onChange={(e) => setBinary(e.target.value)} placeholder="01001000 01100101 01101100 01101100 01101111" className="input-field mt-1 font-mono" onKeyDown={(e) => e.key === 'Enter' && handleConvert()} />
        )}
      </div>

      <button onClick={handleConvert} className="w-full btn-primary"><ArrowRight className="mr-2 h-4 w-4" /> Convert</button>

      {(mode === 'text-to-binary' ? binary : text) && (
        <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">{mode === 'text-to-binary' ? 'Binary Output' : 'Text Output'}</p>
              <p className="text-lg font-mono text-slate-900 break-all mt-1">{mode === 'text-to-binary' ? binary : text}</p>
            </div>
            <button onClick={copyToClipboard} className="flex items-center gap-2 rounded-lg bg-rose-100 px-4 py-2 text-sm font-medium text-rose-600 transition-all hover:bg-rose-200">
              {copied ? <><Check className="h-4 w-4" /> Copied!</> : <><Copy className="h-4 w-4" /> Copy</>}
            </button>
          </div>
        </div>
      )}

      <button onClick={clearAll} className="w-full rounded-full bg-slate-100 px-6 py-3 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-200">Clear All</button>

      <div className="rounded-xl bg-slate-50 p-4 border border-slate-200/50">
        <p className="text-sm text-slate-500">Examples:</p>
        <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
          <div className="p-2 rounded-lg bg-white border border-slate-200/50"><p className="text-slate-500">&quot;A&quot;</p><p className="font-mono text-slate-900">01000001</p></div>
          <div className="p-2 rounded-lg bg-white border border-slate-200/50"><p className="text-slate-500">&quot;Hello&quot;</p><p className="font-mono text-slate-900 text-xs">01001000 01100101 01101100 01101100 01101111</p></div>
        </div>
      </div>
    </div>
  );
}