'use client';

import { useState } from 'react';
import { Percent, Calculator } from 'lucide-react';

export default function PercentageCalculator() {
  const [value, setValue] = useState('');
  const [percentage, setPercentage] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [calculationType, setCalculationType] = useState<'of' | 'increase' | 'decrease'>('of');

  const calculate = () => {
    const num = parseFloat(value);
    const percent = parseFloat(percentage);
    if (isNaN(num) || isNaN(percent)) return;
    let finalResult = 0;
    switch (calculationType) {
      case 'of': finalResult = (percent / 100) * num; break;
      case 'increase': finalResult = num + (num * (percent / 100)); break;
      case 'decrease': finalResult = num - (num * (percent / 100)); break;
    }
    setResult(Math.round(finalResult * 100) / 100);
  };

  const getResultLabel = () => {
    switch (calculationType) {
      case 'of': return `= ${result} (${percentage}% of ${value})`;
      case 'increase': return `= ${result} (${value} + ${percentage}%)`;
      case 'decrease': return `= ${result} (${value} - ${percentage}%)`;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-medium text-slate-700">Calculation Type</label>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {[
            { value: 'of', label: '% of a number' },
            { value: 'increase', label: '% increase' },
            { value: 'decrease', label: '% decrease' },
          ].map((type) => (
            <button key={type.value} onClick={() => setCalculationType(type.value as typeof calculationType)} className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${calculationType === type.value ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
              {type.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-slate-700">{calculationType === 'of' ? 'Number' : 'Original Value'}</label>
          <input type="number" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Enter number" className="input-field mt-1" />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">Percentage</label>
          <input type="number" value={percentage} onChange={(e) => setPercentage(e.target.value)} placeholder="Enter percentage" className="input-field mt-1" />
        </div>
      </div>

      <button onClick={calculate} className="w-full btn-primary">
        <Calculator className="mr-2 h-4 w-4" /> Calculate
      </button>

      {result !== null && (
        <div className="rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 p-6 border border-indigo-200/50">
          <p className="text-sm text-slate-600">Result</p>
          <p className="text-2xl font-bold text-indigo-600">{result.toLocaleString()}</p>
          <p className="mt-1 text-sm text-slate-500">{getResultLabel()}</p>
        </div>
      )}

      <div className="rounded-2xl bg-amber-50/50 p-4 border border-amber-200/50">
        <p className="text-sm text-slate-600"><span className="font-semibold text-amber-600">📝 Examples:</span> {calculationType === 'of' && 'What is 20% of 200? (40)'}
        {calculationType === 'increase' && 'What is 200 + 10%? (220)'}
        {calculationType === 'decrease' && 'What is 200 - 10%? (180)'}</p>
      </div>
    </div>
  );
}