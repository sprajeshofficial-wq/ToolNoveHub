'use client';

import { useState } from 'react';
import { Palette, Copy, Check, RefreshCw, Hexagon, Download, Trash2 } from 'lucide-react';

interface ColorHistory {
  hex: string;
  timestamp: number;
}

export default function ColorPicker() {
  const [color, setColor] = useState('#F54927');
  const [copied, setCopied] = useState(false);
  const [copiedValue, setCopiedValue] = useState('');
  const [colorHistory, setColorHistory] = useState<ColorHistory[]>([
    { hex: '#F54927', timestamp: Date.now() },
    { hex: '#6366F1', timestamp: Date.now() - 1000 },
    { hex: '#10B981', timestamp: Date.now() - 2000 },
    { hex: '#F59E0B', timestamp: Date.now() - 3000 },
    { hex: '#EC4899', timestamp: Date.now() - 4000 },
  ]);

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : { r: 0, g: 0, b: 0 };
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

  const randomColor = () => {
    const randomHex = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase();
    setColor(randomHex);
    addToHistory(randomHex);
  };

  const generatePalette = () => {
    const palette: string[] = [];
    for (let i = 0; i < 5; i++) {
      const randomHex = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase();
      palette.push(randomHex);
    }
    return palette;
  };

  const [paletteColors, setPaletteColors] = useState<string[]>(generatePalette());

  const regeneratePalette = () => setPaletteColors(generatePalette());

  const addToHistory = (hex: string) => {
    setColorHistory(prev => {
      const filtered = prev.filter(c => c.hex !== hex);
      return [{ hex, timestamp: Date.now() }, ...filtered].slice(0, 12);
    });
  };

  const copyToClipboard = async (text: string, label: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setCopiedValue(label);
    setTimeout(() => { setCopied(false); setCopiedValue(''); }, 2000);
  };

  const isCopied = (label: string) => copied && copiedValue === label;

  const exportColors = () => {
    const allColors = [color, ...paletteColors, ...colorHistory.map(c => c.hex)];
    const uniqueColors = [...new Set(allColors)];
    const json = JSON.stringify(uniqueColors, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `colors-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const removeFromHistory = (hex: string) => setColorHistory(prev => prev.filter(c => c.hex !== hex));

  const presetColors = ['#F54927', '#6366F1', '#10B981', '#F59E0B', '#EC4899', '#3B82F6', '#8B5CF6', '#14B8A6', '#F97316', '#22D3EE', '#F472B6', '#34D399', '#60A5FA', '#A78BFA', '#FB923C'];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-6">
        <div className="flex-shrink-0">
          <div className="h-24 w-24 rounded-2xl shadow-lg border-2 border-slate-200/50 transition-all duration-300" style={{ backgroundColor: color }} />
          <div className="mt-2 text-center">
            <p className="text-xs font-mono text-slate-500">{color}</p>
            <p className="text-xs text-slate-400">{rgb.r}, {rgb.g}, {rgb.b}</p>
            <p className="text-xs text-slate-400">{hsl.h}°, {hsl.s}%, {hsl.l}%</p>
          </div>
        </div>
        <div className="flex-1 space-y-3">
          <div>
            <label className="text-xs font-medium text-slate-500">HEX</label>
            <input type="text" value={color} onChange={(e) => { const val = e.target.value; setColor(val); if (/^#[0-9A-Fa-f]{6}$/.test(val)) addToHistory(val); }} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-mono focus:border-indigo-500 focus:outline-none" />
          </div>
          <div className="flex gap-2">
            <input type="color" value={color} onChange={(e) => { const val = e.target.value; setColor(val); addToHistory(val); }} className="flex-1 h-10 rounded-lg cursor-pointer border border-slate-200/50" />
            <button onClick={randomColor} className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium transition-all flex items-center gap-2 whitespace-nowrap"><RefreshCw className="h-4 w-4" /> Random</button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {['HEX', 'RGB', 'HSL'].map((label) => {
          const value = label === 'HEX' ? color : label === 'RGB' ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
          return <button key={label} onClick={() => copyToClipboard(value, label)} className={`flex-1 min-w-[80px] rounded-lg px-3 py-2 text-sm font-medium transition-all flex items-center justify-center gap-1 ${isCopied(label) ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}`}>
            {isCopied(label) ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />} {label}
          </button>;
        })}
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2"><Hexagon className="h-4 w-4 text-indigo-500" /><p className="text-sm font-medium text-slate-700">Random Palette</p></div>
          <div className="flex gap-2">
            <button onClick={regeneratePalette} className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-all flex items-center gap-1"><RefreshCw className="h-3 w-3" /> Generate</button>
            <button onClick={exportColors} className="px-3 py-1.5 rounded-lg bg-indigo-100 hover:bg-indigo-200 text-indigo-700 text-xs font-medium transition-all flex items-center gap-1"><Download className="h-3 w-3" /> Export</button>
          </div>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {paletteColors.map((c, i) => <button key={i} onClick={() => { setColor(c); addToHistory(c); }} className="group relative h-12 rounded-lg border-2 border-slate-200/50 transition-all hover:scale-105 hover:shadow-lg" style={{ backgroundColor: c }}><span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 rounded-lg text-white text-xs font-mono transition-opacity">{c}</span></button>)}
        </div>
      </div>

      <div>
        <p className="text-sm font-medium text-slate-700 mb-3">Preset Colors</p>
        <div className="grid grid-cols-8 gap-2 sm:grid-cols-10">
          {presetColors.map((c) => <button key={c} onClick={() => { setColor(c); addToHistory(c); }} className={`h-8 w-full rounded-lg border-2 transition-all hover:scale-110 hover:shadow-lg ${color === c ? 'border-indigo-500 ring-2 ring-indigo-500/20' : 'border-slate-200/50'}`} style={{ backgroundColor: c }} title={c} />)}
        </div>
      </div>

      {colorHistory.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2"><p className="text-sm font-medium text-slate-700">Color History</p><button onClick={() => setColorHistory([])} className="text-xs text-red-500 hover:text-red-600 transition-colors">Clear All</button></div>
          <div className="flex flex-wrap gap-2">
            {colorHistory.map((item) => <div key={item.hex} className="group relative"><button onClick={() => setColor(item.hex)} className="h-8 w-8 rounded-lg border-2 border-slate-200/50 transition-all hover:scale-110 hover:shadow-lg" style={{ backgroundColor: item.hex }} title={item.hex} /><button onClick={() => removeFromHistory(item.hex)} className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 bg-red-500 text-white rounded-full p-0.5 transition-opacity"><Trash2 className="h-3 w-3" /></button></div>)}
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-3 text-center text-xs text-slate-500 pt-2 border-t border-slate-200/50">
        <div><p className="font-medium text-slate-700">Red</p><p className="font-mono">{rgb.r}</p></div>
        <div><p className="font-medium text-slate-700">Green</p><p className="font-mono">{rgb.g}</p></div>
        <div><p className="font-medium text-slate-700">Blue</p><p className="font-mono">{rgb.b}</p></div>
      </div>
    </div>
  );
}