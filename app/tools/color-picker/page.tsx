'use client';

import { useState } from 'react';
import { Palette, Copy, Check, RefreshCw } from 'lucide-react';

export default function ColorPicker() {
  const [color, setColor] = useState('#6366f1');
  const [copied, setCopied] = useState(false);

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  };

  const hexToHsl = (hex: string) => {
    const { r, g, b } = hexToRgb(hex);
    const max = Math.max(r, g, b) / 255;
    const min = Math.min(r, g, b) / 255;
    let h = 0, s = 0, l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r / 255: h = ((g - b) / 255 / d) % 6; break;
        case g / 255: h = (b - r) / 255 / d + 2; break;
        case b / 255: h = (r - g) / 255 / d + 4; break;
      }
      h = Math.round(h * 60);
      if (h < 0) h += 360;
    }
    return { h, s: Math.round(s * 100), l: Math.round(l * 100) };
  };

  const rgb = hexToRgb(color);
  const hsl = hexToHsl(color);

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const randomColor = () => {
    setColor('#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'));
  };

  return (
    <div className="min-h-screen py-20 px-4 bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
      <div className="mx-auto max-w-2xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 p-3 shadow-lg shadow-purple-500/25">
            <Palette className="h-8 w-8 text-white" />
          </div>
          <h1 className="mt-4 text-3xl font-bold text-slate-900">Color Picker</h1>
          <p className="mt-2 text-slate-600">Pick and convert colors between HEX, RGB, and HSL.</p>
        </div>

        <div className="rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 p-6 shadow-xl space-y-6">
          {/* Color Preview */}
          <div className="flex items-center gap-4">
            <div
              className="h-24 w-24 rounded-2xl shadow-lg border-2 border-slate-200/50"
              style={{ backgroundColor: color }}
            />
            <div className="flex-1">
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full h-12 rounded-xl cursor-pointer border-2 border-slate-200/50"
              />
              <button
                onClick={randomColor}
                className="mt-2 w-full rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition-all hover:bg-slate-200"
              >
                <RefreshCw className="h-4 w-4 inline mr-2" />
                Random Color
              </button>
            </div>
          </div>

          {/* Color Values */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl bg-slate-50 p-3 border border-slate-200/50">
              <p className="text-xs text-slate-500">HEX</p>
              <p className="font-mono text-sm font-semibold text-slate-900 break-all">{color}</p>
              <button
                onClick={() => copyToClipboard(color)}
                className="mt-1 text-xs text-indigo-600 hover:underline flex items-center gap-1"
              >
                {copied ? 'Copied!' : 'Copy'}
                <Copy className="h-3 w-3" />
              </button>
            </div>
            <div className="rounded-xl bg-slate-50 p-3 border border-slate-200/50">
              <p className="text-xs text-slate-500">RGB</p>
              <p className="font-mono text-sm font-semibold text-slate-900">{rgb.r}, {rgb.g}, {rgb.b}</p>
              <button
                onClick={() => copyToClipboard(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)}
                className="mt-1 text-xs text-indigo-600 hover:underline flex items-center gap-1"
              >
                {copied ? 'Copied!' : 'Copy'}
                <Copy className="h-3 w-3" />
              </button>
            </div>
            <div className="rounded-xl bg-slate-50 p-3 border border-slate-200/50">
              <p className="text-xs text-slate-500">HSL</p>
              <p className="font-mono text-sm font-semibold text-slate-900">{hsl.h}°, {hsl.s}%, {hsl.l}%</p>
              <button
                onClick={() => copyToClipboard(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`)}
                className="mt-1 text-xs text-indigo-600 hover:underline flex items-center gap-1"
              >
                {copied ? 'Copied!' : 'Copy'}
                <Copy className="h-3 w-3" />
              </button>
            </div>
          </div>

          {/* Color Swatches */}
          <div>
            <p className="text-sm font-medium text-slate-700 mb-2">Color Palette</p>
            <div className="grid grid-cols-10 gap-1">
              {['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316', '#6366f1', '#22d3ee'].map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className="h-8 w-full rounded-lg border-2 border-slate-200/50 transition-all hover:scale-110 hover:shadow-lg"
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}