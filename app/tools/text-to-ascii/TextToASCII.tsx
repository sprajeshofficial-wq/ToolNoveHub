'use client';

import { useState } from 'react';
import { TextQuote, Copy, Check, RefreshCw } from 'lucide-react';

export default function TextToASCII() {
  const [text, setText] = useState('');
  const [asciiArt, setAsciiArt] = useState('');
  const [copied, setCopied] = useState(false);
  const [style, setStyle] = useState<'standard' | 'big' | 'small'>('standard');

  const fonts: Record<string, Record<string, string>> = {
    standard: { a: '  ███  ', b: ' ████  ', c: '  ████ ', d: ' ████  ', e: '███████', f: '██████ ', g: ' █████ ', h: '██  ██ ', i: ' ███  ', j: ' ███  ' },
    big: {
      a: '   ███   \n  █████  \n ██  ██  \n ███████ \n ██  ██  ',
      b: ' ██████  \n ██  ██  \n ██████  \n ██  ██  \n ██████  ',
      c: '  █████  \n ██      \n ██      \n ██      \n  █████  ',
      d: ' ██████  \n ██  ██  \n ██  ██  \n ██  ██  \n ██████  ',
      e: ' ███████ \n ██      \n ██████  \n ██      \n ███████ ',
      f: ' ███████ \n ██      \n ██████  \n ██      \n ██      ',
    },
    small: { a: ' ███ \n██ ██\n█████\n██ ██', b: '████ \n█  ██\n████ \n█  ██\n████ ', c: ' ████\n█   \n█   \n█   \n ████', d: '████ \n█  ██\n█  ██\n█  ██\n████ ' },
  };

  const generateASCII = () => {
    if (!text.trim()) return;
    const chars = text.toLowerCase().split('');
    const font = fonts[style];
    let result = '';
    if (style === 'standard') result = chars.map(char => font[char] || char).join('  ');
    else {
      const lines = chars.map(char => (font[char] || char).split('\n'));
      const maxLines = Math.max(...lines.map(l => l.length));
      for (let i = 0; i < maxLines; i++) {
        result += lines.map(l => l[i] || ' '.repeat(l[0]?.length || 1)).join('  ') + '\n';
      }
    }
    setAsciiArt(result);
  };

  const copyToClipboard = async () => {
    if (!asciiArt) return;
    await navigator.clipboard.writeText(asciiArt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearAll = () => { setText(''); setAsciiArt(''); };

  return (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-medium text-slate-700">Font Style</label>
        <div className="flex gap-2 mt-1">
          {['standard', 'big', 'small'].map((s) => (
            <button key={s} onClick={() => setStyle(s as typeof style)} className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${style === s ? 'bg-slate-600 text-white shadow-lg shadow-slate-500/25' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-slate-700">Enter Text</label>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Type something..." className="input-field mt-1" onKeyDown={(e) => e.key === 'Enter' && generateASCII()} />
      </div>

      <button onClick={generateASCII} className="w-full btn-primary"><RefreshCw className="mr-2 h-4 w-4" /> Generate ASCII Art</button>

      {asciiArt && (
        <div className="rounded-2xl bg-slate-900 p-4 border border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-slate-400">ASCII Art</p>
            <button onClick={copyToClipboard} className="flex items-center gap-2 rounded-lg bg-slate-700 px-3 py-1.5 text-sm font-medium text-slate-200 transition-all hover:bg-slate-600">
              {copied ? <><Check className="h-4 w-4" /> Copied!</> : <><Copy className="h-4 w-4" /> Copy</>}
            </button>
          </div>
          <pre className="font-mono text-sm text-green-400 whitespace-pre-wrap overflow-x-auto">{asciiArt}</pre>
        </div>
      )}

      <button onClick={clearAll} className="w-full rounded-full bg-slate-100 px-6 py-3 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-200">Clear All</button>
    </div>
  );
}