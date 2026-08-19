'use client';

import { useState } from 'react';
import { Calculator as CalculatorIcon, Plus, Minus, X, Divide, Equal, Delete } from 'lucide-react';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForSecond, setWaitingForSecond] = useState(false);

  const inputDigit = (digit: string) => {
    if (waitingForSecond) { setDisplay(digit); setWaitingForSecond(false); }
    else setDisplay(display === '0' ? digit : display + digit);
  };

  const inputDecimal = () => {
    if (waitingForSecond) { setDisplay('0.'); setWaitingForSecond(false); return; }
    if (!display.includes('.')) setDisplay(display + '.');
  };

  const handleOperator = (op: string) => {
    const current = parseFloat(display);
    if (firstOperand !== null && operator && !waitingForSecond) {
      const result = calculate(firstOperand, current, operator);
      setDisplay(String(result));
      setFirstOperand(result);
    } else setFirstOperand(current);
    setOperator(op);
    setWaitingForSecond(true);
  };

  const calculate = (a: number, b: number, op: string): number => {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '×': return a * b;
      case '÷': return b !== 0 ? a / b : 0;
      default: return b;
    }
  };

  const handleEquals = () => {
    const current = parseFloat(display);
    if (firstOperand !== null && operator) {
      const result = calculate(firstOperand, current, operator);
      setDisplay(String(result));
      setFirstOperand(null);
      setOperator(null);
      setWaitingForSecond(true);
    }
  };

  const clearAll = () => { setDisplay('0'); setFirstOperand(null); setOperator(null); setWaitingForSecond(false); };
  const backspace = () => setDisplay(display.length > 1 ? display.slice(0, -1) : '0');

  const buttons = [
    { label: 'C', action: clearAll, className: 'col-span-2 bg-red-500 hover:bg-red-600 text-white' },
    { label: '⌫', action: backspace, className: 'bg-slate-200 hover:bg-slate-300' },
    { label: '÷', action: () => handleOperator('÷'), className: 'bg-indigo-500 hover:bg-indigo-600 text-white' },
    { label: '7', action: () => inputDigit('7'), className: 'bg-slate-100 hover:bg-slate-200' },
    { label: '8', action: () => inputDigit('8'), className: 'bg-slate-100 hover:bg-slate-200' },
    { label: '9', action: () => inputDigit('9'), className: 'bg-slate-100 hover:bg-slate-200' },
    { label: '×', action: () => handleOperator('×'), className: 'bg-indigo-500 hover:bg-indigo-600 text-white' },
    { label: '4', action: () => inputDigit('4'), className: 'bg-slate-100 hover:bg-slate-200' },
    { label: '5', action: () => inputDigit('5'), className: 'bg-slate-100 hover:bg-slate-200' },
    { label: '6', action: () => inputDigit('6'), className: 'bg-slate-100 hover:bg-slate-200' },
    { label: '-', action: () => handleOperator('-'), className: 'bg-indigo-500 hover:bg-indigo-600 text-white' },
    { label: '1', action: () => inputDigit('1'), className: 'bg-slate-100 hover:bg-slate-200' },
    { label: '2', action: () => inputDigit('2'), className: 'bg-slate-100 hover:bg-slate-200' },
    { label: '3', action: () => inputDigit('3'), className: 'bg-slate-100 hover:bg-slate-200' },
    { label: '+', action: () => handleOperator('+'), className: 'bg-indigo-500 hover:bg-indigo-600 text-white' },
    { label: '0', action: () => inputDigit('0'), className: 'col-span-2 bg-slate-100 hover:bg-slate-200' },
    { label: '.', action: inputDecimal, className: 'bg-slate-100 hover:bg-slate-200' },
    { label: '=', action: handleEquals, className: 'bg-indigo-600 hover:bg-indigo-700 text-white' },
  ];

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-4 rounded-xl bg-slate-100 p-4 text-right">
        <div className="text-sm text-slate-500 min-h-[20px]">{operator && firstOperand !== null ? `${firstOperand} ${operator}` : ''}</div>
        <div className="text-3xl font-bold text-slate-900 truncate">{display}</div>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {buttons.map((btn, index) => {
          let icon = null;
          if (btn.label === '÷') icon = <Divide className="h-5 w-5 mx-auto" />;
          else if (btn.label === '×') icon = <X className="h-5 w-5 mx-auto" />;
          else if (btn.label === '-') icon = <Minus className="h-5 w-5 mx-auto" />;
          else if (btn.label === '+') icon = <Plus className="h-5 w-5 mx-auto" />;
          else if (btn.label === '=') icon = <Equal className="h-5 w-5 mx-auto" />;
          else if (btn.label === '⌫') icon = <Delete className="h-5 w-5 mx-auto" />;
          return <button key={index} onClick={btn.action} className={`rounded-xl py-3 text-lg font-semibold transition-all active:scale-95 ${btn.className || 'bg-slate-100 hover:bg-slate-200 text-slate-700'}`}>{icon || btn.label}</button>;
        })}
      </div>
    </div>
  );
}