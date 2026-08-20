'use client';

import { useState, useEffect } from 'react';
import { 
  Palette, 
  Copy, 
  Check, 
  RefreshCw, 
  Download, 
  Trash2, 
  Eye,
  Hexagon,
  Sliders,
  Droplet,
  Upload,
  Share2,
  Sun,
  Moon,
  Layers,
  Zap,
  Clock
} from 'lucide-react';

interface ColorHistory {
  hex: string;
  timestamp: number;
}

export default function ColorPicker() {
  const [color, setColor] = useState('#6366f1');
  const [copied, setCopied] = useState(false);
  const [copiedValue, setCopiedValue] = useState('');
  const [isEyeDropperSupported, setIsEyeDropperSupported] = useState(false);
  const [colorHistory, setColorHistory] = useState<ColorHistory[]>([]);
  const [paletteColors, setPaletteColors] = useState<string[]>([]);
  const [rgbValues, setRgbValues] = useState({ r: 99, g: 102, b: 241 });
  const [hslValues, setHslValues] = useState({ h: 238, s: 84, l: 67 });
  const [activeTab, setActiveTab] = useState<'picker' | 'palette' | 'history'>('picker');
  const [brightness, setBrightness] = useState(50);
  const [saturation, setSaturation] = useState(50);
  const [contrast, setContrast] = useState(50);
  const [colorName, setColorName] = useState('Indigo');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check if EyeDropper is supported
  useEffect(() => {
    setIsEyeDropperSupported('EyeDropper' in window);
    // Generate initial palette
    generatePalette();
    // Add initial color to history
    addToHistory('#6366f1');
  }, []);

  // Convert HEX to RGB
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  };

  // Convert RGB to HEX
  const rgbToHex = (r: number, g: number, b: number) => {
    const clamp = (val: number) => Math.min(255, Math.max(0, Math.round(val)));
    return '#' + [clamp(r), clamp(g), clamp(b)].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
  };

  // Convert HEX to HSL
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

  // Get color name
  const getColorName = (hex: string) => {
    const colors: { [key: string]: string } = {
      '#000000': 'Black',
      '#ffffff': 'White',
      '#ff0000': 'Red',
      '#00ff00': 'Green',
      '#0000ff': 'Blue',
      '#ffff00': 'Yellow',
      '#ff00ff': 'Magenta',
      '#00ffff': 'Cyan',
      '#ffa500': 'Orange',
      '#800080': 'Purple',
      '#008000': 'Dark Green',
      '#000080': 'Navy',
      '#808080': 'Gray',
      '#c0c0c0': 'Silver',
      '#ffc0cb': 'Pink',
      '#a52a2a': 'Brown',
      '#808000': 'Olive',
      '#800000': 'Maroon',
      '#008080': 'Teal',
      '#6366f1': 'Indigo',
      '#8b5cf6': 'Violet',
      '#ec4899': 'Pink',
      '#f59e0b': 'Amber',
      '#10b981': 'Emerald',
      '#3b82f6': 'Blue',
      '#ef4444': 'Red',
      '#22d3ee': 'Cyan',
      '#f472b6': 'Light Pink',
      '#34d399': 'Mint',
      '#60a5fa': 'Sky Blue',
      '#a78bfa': 'Lavender',
      '#fb923c': 'Orange',
    };
    return colors[hex.toUpperCase()] || 'Custom';
  };

  // Update color and history
  const updateColor = (newColor: string) => {
    setColor(newColor);
    const rgb = hexToRgb(newColor);
    setRgbValues(rgb);
    const hsl = hexToHsl(newColor);
    setHslValues(hsl);
    setColorName(getColorName(newColor));
    addToHistory(newColor);
  };

  // RGB Slider change
  const handleRgbChange = (channel: 'r' | 'g' | 'b', value: number) => {
    const newRgb = { ...rgbValues, [channel]: value };
    setRgbValues(newRgb);
    const newHex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
    setColor(newHex);
    setColorName(getColorName(newHex));
    addToHistory(newHex);
  };

  // Add to history
  const addToHistory = (hex: string) => {
    setColorHistory(prev => {
      const filtered = prev.filter(c => c.hex !== hex);
      const newHistory = [{ hex, timestamp: Date.now() }, ...filtered];
      return newHistory.slice(0, 12);
    });
  };

  // Generate random color
  const randomColor = () => {
    const randomHex = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase();
    updateColor(randomHex);
  };

  // Generate random palette
  const generatePalette = () => {
    const palette: string[] = [];
    for (let i = 0; i < 5; i++) {
      const randomHex = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase();
      palette.push(randomHex);
    }
    setPaletteColors(palette);
  };

  // Eye Dropper
  const useEyeDropper = async () => {
    if (!('EyeDropper' in window)) return;
    try {
      // @ts-ignore - EyeDropper API
      const eyeDropper = new window.EyeDropper();
      const result = await eyeDropper.open();
      updateColor(result.sRGBHex);
    } catch (error) {
      // User cancelled
    }
  };

  // Copy to clipboard
  const copyToClipboard = async (text: string, label: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setCopiedValue(label);
    setTimeout(() => {
      setCopied(false);
      setCopiedValue('');
    }, 2000);
  };

  const isCopied = (label: string) => copied && copiedValue === label;

  // Export colors
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

  // Import colors from JSON
  const importColors = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e: Event) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target?.result as string);
          if (Array.isArray(data) && data.length > 0) {
            const validColors = data.filter((c: string) => /^#[0-9A-Fa-f]{6}$/.test(c));
            if (validColors.length > 0) {
              setPaletteColors(validColors.slice(0, 5));
              updateColor(validColors[0]);
            }
          }
        } catch (error) {
          alert('Invalid JSON file');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const removeFromHistory = (hex: string) => {
    setColorHistory(prev => prev.filter(c => c.hex !== hex));
  };

  const clearHistory = () => {
    setColorHistory([]);
  };

  const rgb = hexToRgb(color);
  const hsl = hexToHsl(color);

  const presetColors = [
    '#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6',
    '#EC4899', '#14B8A6', '#F97316', '#6366F1', '#22D3EE',
    '#F472B6', '#34D399', '#60A5FA', '#A78BFA', '#FB923C'
  ];

  // Generate complementary colors
  const getComplementary = (hex: string) => {
    const hsl = hexToHsl(hex);
    const compHue = (hsl.h + 180) % 360;
    return `hsl(${compHue}, ${hsl.s}%, ${hsl.l}%)`;
  };

  // Generate analogous colors
  const getAnalogous = (hex: string) => {
    const hsl = hexToHsl(hex);
    return [
      `hsl(${(hsl.h + 30) % 360}, ${hsl.s}%, ${hsl.l}%)`,
      `hsl(${(hsl.h - 30 + 360) % 360}, ${hsl.s}%, ${hsl.l}%)`
    ];
  };

  return (
    <div className="space-y-6">
      {/* Header with Color Name */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{colorName}</h3>
          <p className="text-sm text-slate-500">{color}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
            title="Toggle Theme"
          >
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button
            onClick={randomColor}
            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
            title="Random Color"
          >
            <Zap className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Main Color Display */}
      <div className={`flex items-center gap-6 flex-wrap p-4 rounded-2xl ${isDarkMode ? 'bg-slate-800' : 'bg-slate-50'}`}>
        <div
          className="h-32 w-32 rounded-2xl shadow-lg border-2 border-slate-200/50 transition-all duration-300 flex-shrink-0"
          style={{ backgroundColor: color }}
        />
        <div className="flex-1 space-y-3 min-w-[200px]">
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="text-xs font-medium text-slate-500">HEX</label>
              <input
                type="text"
                value={color}
                onChange={(e) => {
                  const val = e.target.value;
                  if (/^#[0-9A-Fa-f]{6}$/.test(val)) {
                    updateColor(val);
                  } else {
                    setColor(val);
                  }
                }}
                className={`w-full rounded-lg border px-3 py-2 text-sm font-mono focus:border-indigo-500 focus:outline-none ${isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-slate-200'}`}
              />
            </div>
            <div className="flex gap-1 items-end">
              {isEyeDropperSupported && (
                <button
                  onClick={useEyeDropper}
                  className="px-4 py-2 rounded-lg bg-indigo-100 hover:bg-indigo-200 text-indigo-700 text-sm font-medium transition-all flex items-center gap-2"
                  title="Pick Color from Screen"
                >
                  <Eye className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
          <input
            type="color"
            value={color}
            onChange={(e) => updateColor(e.target.value)}
            className="w-full h-10 rounded-lg cursor-pointer border border-slate-200/50"
          />
        </div>
      </div>

      {/* Color Values - Copy Buttons */}
      <div className="flex flex-wrap gap-2">
        {[
          { label: 'HEX', value: color },
          { label: 'RGB', value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` },
          { label: 'HSL', value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
        ].map((item) => (
          <button
            key={item.label}
            onClick={() => copyToClipboard(item.value, item.label)}
            className={`flex-1 min-w-[80px] rounded-lg px-3 py-2 text-sm font-medium transition-all flex items-center justify-center gap-1 ${
              isCopied(item.label)
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            {isCopied(item.label) ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            {item.label}
          </button>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200/50 pb-2">
        {[
          { id: 'picker', label: 'Picker', icon: Droplet },
          { id: 'palette', label: 'Palette', icon: Layers },
          { id: 'history', label: 'History', icon: Clock },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content: Picker */}
      {activeTab === 'picker' && (
        <div className="space-y-4">
          {/* RGB Sliders */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Sliders className="h-4 w-4 text-slate-400" />
              <span className="text-sm font-medium text-slate-700">RGB Sliders</span>
            </div>
            {['r', 'g', 'b'].map((channel) => (
              <div key={channel} className="flex items-center gap-3">
                <span className="text-xs font-mono text-slate-500 w-4 uppercase">{channel}</span>
                <input
                  type="range"
                  min="0"
                  max="255"
                  value={rgbValues[channel as keyof typeof rgbValues]}
                  onChange={(e) => handleRgbChange(channel as 'r' | 'g' | 'b', parseInt(e.target.value))}
                  className="flex-1 h-2 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, 
                      ${channel === 'r' ? '#ef4444' : channel === 'g' ? '#22c55e' : '#3b82f6'}22, 
                      ${channel === 'r' ? '#ef4444' : channel === 'g' ? '#22c55e' : '#3b82f6'})`
                  }}
                />
                <span className="text-xs font-mono text-slate-600 w-10 text-right">
                  {rgbValues[channel as keyof typeof rgbValues]}
                </span>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                const hsl = hexToHsl(color);
                const newColor = `hsl(${(hsl.h + 30) % 360}, ${hsl.s}%, ${hsl.l}%)`;
                const tempDiv = document.createElement('div');
                tempDiv.style.color = newColor;
                document.body.appendChild(tempDiv);
                const computed = getComputedStyle(tempDiv).color;
                const rgbMatch = computed.match(/\d+/g);
                if (rgbMatch) {
                  const hex = rgbToHex(parseInt(rgbMatch[0]), parseInt(rgbMatch[1]), parseInt(rgbMatch[2]));
                  updateColor(hex);
                }
                document.body.removeChild(tempDiv);
              }}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-sm transition-colors"
            >
              🔄 Hue Shift +30°
            </button>
            <button
              onClick={() => {
                const hsl = hexToHsl(color);
                const newColor = `hsl(${hsl.h}, ${Math.min(100, hsl.s + 10)}%, ${hsl.l}%)`;
                const tempDiv = document.createElement('div');
                tempDiv.style.color = newColor;
                document.body.appendChild(tempDiv);
                const computed = getComputedStyle(tempDiv).color;
                const rgbMatch = computed.match(/\d+/g);
                if (rgbMatch) {
                  const hex = rgbToHex(parseInt(rgbMatch[0]), parseInt(rgbMatch[1]), parseInt(rgbMatch[2]));
                  updateColor(hex);
                }
                document.body.removeChild(tempDiv);
              }}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-sm transition-colors"
            >
              📈 Saturation +10%
            </button>
            <button
              onClick={() => {
                const hsl = hexToHsl(color);
                const newColor = `hsl(${hsl.h}, ${hsl.s}%, ${Math.min(100, hsl.l + 10)}%)`;
                const tempDiv = document.createElement('div');
                tempDiv.style.color = newColor;
                document.body.appendChild(tempDiv);
                const computed = getComputedStyle(tempDiv).color;
                const rgbMatch = computed.match(/\d+/g);
                if (rgbMatch) {
                  const hex = rgbToHex(parseInt(rgbMatch[0]), parseInt(rgbMatch[1]), parseInt(rgbMatch[2]));
                  updateColor(hex);
                }
                document.body.removeChild(tempDiv);
              }}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-sm transition-colors"
            >
              ☀️ Lightness +10%
            </button>
          </div>

          {/* Complementary Colors */}
          <div>
            <p className="text-sm font-medium text-slate-700 mb-2">Complementary Colors</p>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  const comp = getComplementary(color);
                  const tempDiv = document.createElement('div');
                  tempDiv.style.color = comp;
                  document.body.appendChild(tempDiv);
                  const computed = getComputedStyle(tempDiv).color;
                  const rgbMatch = computed.match(/\d+/g);
                  if (rgbMatch) {
                    const hex = rgbToHex(parseInt(rgbMatch[0]), parseInt(rgbMatch[1]), parseInt(rgbMatch[2]));
                    updateColor(hex);
                  }
                  document.body.removeChild(tempDiv);
                }}
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-sm transition-colors"
              >
                🔄 Show Complementary
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: Palette */}
      {activeTab === 'palette' && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-indigo-500" />
              <p className="text-sm font-medium text-slate-700">Color Palette</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={generatePalette}
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-all flex items-center gap-1"
              >
                <RefreshCw className="h-3 w-3" />
                Generate
              </button>
              <button
                onClick={importColors}
                className="px-3 py-1.5 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-700 text-xs font-medium transition-all flex items-center gap-1"
              >
                <Upload className="h-3 w-3" />
                Import
              </button>
              <button
                onClick={exportColors}
                className="px-3 py-1.5 rounded-lg bg-indigo-100 hover:bg-indigo-200 text-indigo-700 text-xs font-medium transition-all flex items-center gap-1"
              >
                <Download className="h-3 w-3" />
                Export
              </button>
              <button
                onClick={() => {
                  const colors = [color, ...paletteColors];
                  const text = colors.join('\n');
                  navigator.clipboard.writeText(text);
                  alert('Colors copied to clipboard!');
                }}
                className="px-3 py-1.5 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-700 text-xs font-medium transition-all flex items-center gap-1"
              >
                <Share2 className="h-3 w-3" />
                Share
              </button>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {paletteColors.length > 0 ? (
              paletteColors.map((c, i) => (
                <button
                  key={i}
                  onClick={() => updateColor(c)}
                  className="group relative h-16 rounded-lg border-2 border-slate-200/50 transition-all hover:scale-105 hover:shadow-lg"
                  style={{ backgroundColor: c }}
                >
                  <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 rounded-lg text-white text-xs font-mono transition-opacity">
                    {c}
                  </span>
                </button>
              ))
            ) : (
              <div className="col-span-5 text-center py-3 text-sm text-slate-400">
                Click &quot;Generate&quot; to create a palette
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab Content: History */}
      {activeTab === 'history' && colorHistory.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-slate-700">Color History</p>
            <button
              onClick={clearHistory}
              className="text-xs text-red-500 hover:text-red-600 transition-colors"
            >
              Clear All
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {colorHistory.map((item) => (
              <div key={item.hex} className="group relative">
                <button
                  onClick={() => updateColor(item.hex)}
                  className="h-10 w-10 rounded-lg border-2 border-slate-200/50 transition-all hover:scale-110 hover:shadow-lg"
                  style={{ backgroundColor: item.hex }}
                  title={item.hex}
                />
                <button
                  onClick={() => removeFromHistory(item.hex)}
                  className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 bg-red-500 text-white rounded-full p-0.5 transition-opacity"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Preset Colors */}
      <div>
        <p className="text-sm font-medium text-slate-700 mb-3">Preset Colors</p>
        <div className="grid grid-cols-8 gap-2 sm:grid-cols-10">
          {presetColors.map((c) => (
            <button
              key={c}
              onClick={() => updateColor(c)}
              className={`h-8 w-full rounded-lg border-2 transition-all hover:scale-110 hover:shadow-lg ${
                color === c ? 'border-indigo-500 ring-2 ring-indigo-500/20' : 'border-slate-200/50'
              }`}
              style={{ backgroundColor: c }}
              title={c}
            />
          ))}
        </div>
      </div>

      {/* Color Info Grid */}
      <div className="grid grid-cols-3 gap-3 text-center text-xs text-slate-500 pt-2 border-t border-slate-200/50">
        <div>
          <p className="font-medium text-slate-700">Red</p>
          <p className="font-mono">{rgb.r}</p>
        </div>
        <div>
          <p className="font-medium text-slate-700">Green</p>
          <p className="font-mono">{rgb.g}</p>
        </div>
        <div>
          <p className="font-medium text-slate-700">Blue</p>
          <p className="font-mono">{rgb.b}</p>
        </div>
      </div>

      {/* Preview Text */}
      <div className={`rounded-2xl p-4 border text-center transition-colors ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
        <p className="text-sm text-slate-500">Preview</p>
        <div className="mt-2 p-4 rounded-xl transition-colors" style={{ backgroundColor: color, color: 'white' }}>
          <p className="font-medium" style={{ color: color }}>
            Sample Text in this Color
          </p>
        </div>
      </div>
    </div>
  );
}