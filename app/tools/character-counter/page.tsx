'use client';

import { useState, useMemo } from 'react';
import { Hash, Type, FileText, AlignLeft } from 'lucide-react';

export default function CharacterCounter() {
  const [text, setText] = useState('');

  const stats = useMemo(() => {
    const charCount = text.length;
    const charCountNoSpaces = text.replace(/\s/g, '').length;
    const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
    const lineCount = text.split(/\n/).filter(line => line.trim()).length;
    const letterCount = (text.match(/[a-zA-Z]/g) || []).length;
    const numberCount = (text.match(/[0-9]/g) || []).length;
    const punctuationCount = (text.match(/[.,!?;:()"'-]/g) || []).length;
    const spaceCount = (text.match(/\s/g) || []).length;

    return {
      charCount,
      charCountNoSpaces,
      wordCount,
      lineCount,
      letterCount,
      numberCount,
      punctuationCount,
      spaceCount,
    };
  }, [text]);

  const statsItems = [
    { label: 'Characters', value: stats.charCount, icon: Type, color: 'from-blue-500 to-cyan-500' },
    { label: 'Characters (no spaces)', value: stats.charCountNoSpaces, icon: Hash, color: 'from-emerald-500 to-teal-500' },
    { label: 'Words', value: stats.wordCount, icon: AlignLeft, color: 'from-amber-500 to-orange-500' },
    { label: 'Lines', value: stats.lineCount, icon: FileText, color: 'from-rose-500 to-pink-500' },
  ];

  return (
    <div className="min-h-screen py-20 px-4 bg-gradient-to-br from-slate-50 via-white to-cyan-50/30">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 p-3 shadow-lg shadow-cyan-500/25">
            <Hash className="h-8 w-8 text-white" />
          </div>
          <h1 className="mt-4 text-3xl font-bold text-slate-900">Character Counter</h1>
          <p className="mt-2 text-slate-600">Count characters with and without spaces.</p>
        </div>

        <div className="rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 p-6 shadow-xl">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your text here..."
            className="textarea-field min-h-[150px]"
          />

          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {statsItems.map((item) => (
              <div key={item.label} className="rounded-xl bg-slate-50/80 p-4 text-center border border-slate-200/50">
                <div className={`inline-flex rounded-lg bg-gradient-to-r ${item.color} p-2 shadow-lg`}>
                  <item.icon className="h-4 w-4 text-white" />
                </div>
                <p className="mt-2 text-2xl font-bold text-slate-900">{item.value}</p>
                <p className="text-xs text-slate-500">{item.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-xl bg-slate-50 p-4 border border-slate-200/50">
            <div className="grid grid-cols-3 gap-2 text-center text-sm">
              <div>
                <p className="text-slate-500">Letters</p>
                <p className="font-semibold text-slate-900">{stats.letterCount}</p>
              </div>
              <div>
                <p className="text-slate-500">Numbers</p>
                <p className="font-semibold text-slate-900">{stats.numberCount}</p>
              </div>
              <div>
                <p className="text-slate-500">Punctuation</p>
                <p className="font-semibold text-slate-900">{stats.punctuationCount}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}