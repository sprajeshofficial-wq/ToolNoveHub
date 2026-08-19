'use client';

import { useState, useMemo } from 'react';
import { AlignLeft, Type, Hash, Text, FileText } from 'lucide-react';

export default function WordCounter() {
  const [text, setText] = useState('');

  const stats = useMemo(() => {
    const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
    const charCount = text.length;
    const charCountNoSpaces = text.replace(/\s/g, '').length;
    const sentenceCount = text.split(/[.!?]+/).filter(s => s.trim()).length;
    const paragraphCount = text.split(/\n\s*\n/).filter(p => p.trim()).length;
    const readingTime = Math.ceil(wordCount / 200);

    return {
      wordCount,
      charCount,
      charCountNoSpaces,
      sentenceCount,
      paragraphCount,
      readingTime,
    };
  }, [text]);

  const statsItems = [
    { label: 'Words', value: stats.wordCount, icon: AlignLeft, color: 'from-blue-500 to-cyan-500' },
    { label: 'Characters', value: stats.charCount, icon: Type, color: 'from-emerald-500 to-teal-500' },
    { label: 'Characters (no spaces)', value: stats.charCountNoSpaces, icon: Hash, color: 'from-amber-500 to-orange-500' },
    { label: 'Sentences', value: stats.sentenceCount, icon: Text, color: 'from-rose-500 to-pink-500' },
    { label: 'Paragraphs', value: stats.paragraphCount, icon: FileText, color: 'from-violet-500 to-purple-500' },
    { label: 'Reading Time', value: stats.readingTime + ' min', icon: Type, color: 'from-indigo-500 to-purple-500' },
  ];

  return (
    <div className="min-h-screen py-20 px-4 bg-gradient-to-br from-slate-50 via-white to-rose-50/30">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 p-3 shadow-lg shadow-rose-500/25">
            <AlignLeft className="h-8 w-8 text-white" />
          </div>
          <h1 className="mt-4 text-3xl font-bold text-slate-900">Word Counter</h1>
          <p className="mt-2 text-slate-600">Count words, characters, and sentences in any text.</p>
        </div>

        <div className="rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 p-6 shadow-xl">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your text here..."
            className="textarea-field min-h-[200px]"
          />

          {/* Stats Grid */}
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
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
        </div>

        <div className="mt-6 rounded-2xl bg-rose-50/50 p-4 border border-rose-200/50">
          <p className="text-sm text-slate-600">
            <span className="font-semibold text-rose-600">🔒 Privacy:</span> Your text is processed entirely 
            in your browser. Nothing is sent to our servers — <span className="font-medium">100% private</span>.
          </p>
        </div>
      </div>
    </div>
  );
}