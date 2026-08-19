'use client';

import { useState } from 'react';
import { Type, Copy, Check, RefreshCw, Link2 } from 'lucide-react';

export default function TextToSlug() {
  const [text, setText] = useState('');
  const [slug, setSlug] = useState('');
  const [copied, setCopied] = useState(false);

  const generateSlug = () => {
    if (!text.trim()) return;
    
    const generatedSlug = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
    
    setSlug(generatedSlug);
  };

  const copyToClipboard = async () => {
    if (!slug) return;
    await navigator.clipboard.writeText(slug);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearAll = () => {
    setText('');
    setSlug('');
  };

  return (
    <div className="min-h-screen py-20 px-4 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <div className="mx-auto max-w-2xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-500 to-blue-500 p-3 shadow-lg shadow-indigo-500/25">
            <Link2 className="h-8 w-8 text-white" />
          </div>
          <h1 className="mt-4 text-3xl font-bold text-slate-900">Text to Slug Converter</h1>
          <p className="mt-2 text-slate-600">Convert any text to a URL-friendly slug.</p>
        </div>

        <div className="rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 p-6 shadow-xl space-y-6">
          <div>
            <label className="text-sm font-medium text-slate-700">Enter Text</label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="My Awesome Blog Post Title"
              className="input-field mt-1"
              onKeyDown={(e) => e.key === 'Enter' && generateSlug()}
            />
            <p className="mt-1 text-xs text-slate-400">Spaces, special characters, and uppercase will be converted.</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button onClick={generateSlug} className="btn-primary">
              <RefreshCw className="mr-2 h-4 w-4" />
              Generate Slug
            </button>
            <button onClick={clearAll} className="rounded-full bg-slate-100 px-6 py-3 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-200">
              Clear
            </button>
          </div>

          {slug && (
            <div className="rounded-2xl bg-indigo-50/50 p-4 border border-indigo-200/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Generated Slug</p>
                  <p className="text-lg font-mono text-indigo-600 break-all">{slug}</p>
                </div>
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
            </div>
          )}

          <div className="rounded-xl bg-slate-50 p-4 border border-slate-200/50">
            <p className="text-sm text-slate-500">
              <span className="font-semibold">Example:</span> &quot;My Blog Post!&quot; → &quot;my-blog-post&quot;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}