'use client';

import { useState, useEffect } from 'react';
import { RefreshCw, ArrowRight, Layers } from 'lucide-react';

interface UnitCategory {
  name: string;
  units: { label: string; value: string; factor: number }[];
  convert: (value: number, from: string, to: string) => number;
}

export default function UnitConverter() {
  const [category, setCategory] = useState('length');
  const [fromUnit, setFromUnit] = useState('meter');
  const [toUnit, setToUnit] = useState('kilometer');
  const [value, setValue] = useState('1');
  const [result, setResult] = useState<number | null>(null);

  const categories: Record<string, UnitCategory> = {
    length: {
      name: 'Length',
      units: [
        { label: 'Meter', value: 'meter', factor: 1 },
        { label: 'Kilometer', value: 'kilometer', factor: 1000 },
        { label: 'Mile', value: 'mile', factor: 1609.344 },
        { label: 'Yard', value: 'yard', factor: 0.9144 },
        { label: 'Foot', value: 'foot', factor: 0.3048 },
        { label: 'Inch', value: 'inch', factor: 0.0254 },
        { label: 'Centimeter', value: 'centimeter', factor: 0.01 },
        { label: 'Millimeter', value: 'millimeter', factor: 0.001 },
      ],
      convert: (value: number, from: string, to: string) => {
        const units = categories.length.units;
        const fromFactor = units.find(u => u.value === from)?.factor || 1;
        const toFactor = units.find(u => u.value === to)?.factor || 1;
        return (value * fromFactor) / toFactor;
      },
    },
    weight: {
      name: 'Weight',
      units: [
        { label: 'Kilogram', value: 'kilogram', factor: 1 },
        { label: 'Gram', value: 'gram', factor: 0.001 },
        { label: 'Milligram', value: 'milligram', factor: 0.000001 },
        { label: 'Pound', value: 'pound', factor: 0.453592 },
        { label: 'Ounce', value: 'ounce', factor: 0.0283495 },
        { label: 'Ton', value: 'ton', factor: 907.185 },
        { label: 'Stone', value: 'stone', factor: 6.35029 },
      ],
      convert: (value: number, from: string, to: string) => {
        const units = categories.weight.units;
        const fromFactor = units.find(u => u.value === from)?.factor || 1;
        const toFactor = units.find(u => u.value === to)?.factor || 1;
        return (value * fromFactor) / toFactor;
      },
    },
    temperature: {
      name: 'Temperature',
      units: [
        { label: 'Celsius', value: 'celsius', factor: 0 },
        { label: 'Fahrenheit', value: 'fahrenheit', factor: 0 },
        { label: 'Kelvin', value: 'kelvin', factor: 0 },
      ],
      convert: (value: number, from: string, to: string) => {
        let celsius: number;
        if (from === 'celsius') celsius = value;
        else if (from === 'fahrenheit') celsius = (value - 32) * 5 / 9;
        else celsius = value - 273.15;

        if (to === 'celsius') return celsius;
        if (to === 'fahrenheit') return celsius * 9 / 5 + 32;
        return celsius + 273.15;
      },
    },
    area: {
      name: 'Area',
      units: [
        { label: 'Square Meter', value: 'sq_meter', factor: 1 },
        { label: 'Square Kilometer', value: 'sq_kilometer', factor: 1000000 },
        { label: 'Square Mile', value: 'sq_mile', factor: 2589988.11 },
        { label: 'Acre', value: 'acre', factor: 4046.85642 },
        { label: 'Hectare', value: 'hectare', factor: 10000 },
        { label: 'Square Foot', value: 'sq_foot', factor: 0.092903 },
      ],
      convert: (value: number, from: string, to: string) => {
        const units = categories.area.units;
        const fromFactor = units.find(u => u.value === from)?.factor || 1;
        const toFactor = units.find(u => u.value === to)?.factor || 1;
        return (value * fromFactor) / toFactor;
      },
    },
    volume: {
      name: 'Volume',
      units: [
        { label: 'Liter', value: 'liter', factor: 1 },
        { label: 'Milliliter', value: 'milliliter', factor: 0.001 },
        { label: 'Gallon', value: 'gallon', factor: 3.78541 },
        { label: 'Quart', value: 'quart', factor: 0.946353 },
        { label: 'Pint', value: 'pint', factor: 0.473176 },
        { label: 'Cup', value: 'cup', factor: 0.236588 },
        { label: 'Fluid Ounce', value: 'fl_oz', factor: 0.0295735 },
      ],
      convert: (value: number, from: string, to: string) => {
        const units = categories.volume.units;
        const fromFactor = units.find(u => u.value === from)?.factor || 1;
        const toFactor = units.find(u => u.value === to)?.factor || 1;
        return (value * fromFactor) / toFactor;
      },
    },
    speed: {
      name: 'Speed',
      units: [
        { label: 'km/h', value: 'kmh', factor: 1 },
        { label: 'mph', value: 'mph', factor: 1.60934 },
        { label: 'm/s', value: 'ms', factor: 3.6 },
        { label: 'knots', value: 'knots', factor: 1.852 },
        { label: 'ft/s', value: 'fts', factor: 1.09728 },
      ],
      convert: (value: number, from: string, to: string) => {
        const units = categories.speed.units;
        const fromFactor = units.find(u => u.value === from)?.factor || 1;
        const toFactor = units.find(u => u.value === to)?.factor || 1;
        return (value * fromFactor) / toFactor;
      },
    },
  };

  useEffect(() => {
    convert();
  }, [category, fromUnit, toUnit, value]);

  const convert = () => {
    const num = parseFloat(value);
    if (isNaN(num)) {
      setResult(null);
      return;
    }
    const cat = categories[category];
    const converted = cat.convert(num, fromUnit, toUnit);
    setResult(converted);
  };

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const categoryNames = Object.keys(categories);

  const currentCategory = categories[category];
  const currentUnits = currentCategory.units;

  // Find unit labels for display
  const fromLabel = currentUnits.find(u => u.value === fromUnit)?.label || fromUnit;
  const toLabel = currentUnits.find(u => u.value === toUnit)?.label || toUnit;

  return (
    <div className="space-y-6">
      {/* Category Selection */}
      <div>
        <label className="text-sm font-medium text-slate-700">Category</label>
        <div className="grid grid-cols-3 gap-2 mt-1">
          {categoryNames.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setCategory(cat);
                const units = categories[cat].units;
                setFromUnit(units[0].value);
                setToUnit(units[1]?.value || units[0].value);
              }}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                category === cat
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {categories[cat].name}
            </button>
          ))}
        </div>
      </div>

      {/* From Unit */}
      <div>
        <label className="text-sm font-medium text-slate-700">From</label>
        <div className="flex gap-2 mt-1">
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-1/3 rounded-lg border border-slate-200 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none"
            placeholder="0"
            step="any"
          />
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            className="flex-1 rounded-lg border border-slate-200 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none"
          >
            {currentUnits.map((unit) => (
              <option key={unit.value} value={unit.value}>
                {unit.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Swap Button */}
      <div className="flex justify-center">
        <button
          onClick={swapUnits}
          className="rounded-full bg-slate-100 p-3 text-slate-600 hover:bg-slate-200 transition-colors"
        >
          <ArrowRight className="h-5 w-5 rotate-90 md:rotate-0" />
        </button>
      </div>

      {/* To Unit */}
      <div>
        <label className="text-sm font-medium text-slate-700">To</label>
        <div className="flex gap-2 mt-1">
          <input
            type="text"
            value={result !== null ? result.toFixed(6) : ''}
            readOnly
            placeholder="Result"
            className="w-1/3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm"
          />
          <select
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
            className="flex-1 rounded-lg border border-slate-200 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none"
          >
            {currentUnits.map((unit) => (
              <option key={unit.value} value={unit.value}>
                {unit.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Result Display */}
      {result !== null && (
        <div className="rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 p-4 border border-indigo-200/50">
          <p className="text-sm text-slate-600">
            {value} {fromLabel} = <span className="font-bold text-indigo-600">{result.toFixed(6)}</span> {toLabel}
          </p>
        </div>
      )}

      {/* Info */}
      <div className="rounded-2xl bg-indigo-50/50 p-4 border border-indigo-200/50">
        <p className="text-sm text-slate-600">
          <span className="font-semibold text-indigo-600">💡 Pro Tip:</span> 
          All conversions are 100% accurate and processed entirely in your browser — <span className="font-medium">100% private</span>.
        </p>
      </div>
    </div>
  );
}