'use client';

import { useState, useEffect } from 'react';
import { Calendar, Clock, RefreshCw, Copy, Check, Users, Gift, Cake, Sparkles } from 'lucide-react';

interface AgeResult {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalDays: number;
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
  nextBirthday: Date;
  daysUntilNextBirthday: number;
  zodiacSign: string;
  generation: string;
  lifeExpectancy: string;
  ageInDogYears: number;
  ageInCatYears: number;
}

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState('');
  const [result, setResult] = useState<AgeResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [isLive, setIsLive] = useState(true);

  // Real-time age update
  useEffect(() => {
    if (!birthDate) return;
    
    const interval = setInterval(() => {
      calculateAge();
    }, 1000);

    return () => clearInterval(interval);
  }, [birthDate]);

  const getZodiacSign = (month: number, day: number): string => {
    const signs = [
      { name: '♈ Aries', start: [3, 21], end: [4, 19] },
      { name: '♉ Taurus', start: [4, 20], end: [5, 20] },
      { name: '♊ Gemini', start: [5, 21], end: [6, 20] },
      { name: '♋ Cancer', start: [6, 21], end: [7, 22] },
      { name: '♌ Leo', start: [7, 23], end: [8, 22] },
      { name: '♍ Virgo', start: [8, 23], end: [9, 22] },
      { name: '♎ Libra', start: [9, 23], end: [10, 22] },
      { name: '♏ Scorpio', start: [10, 23], end: [11, 21] },
      { name: '♐ Sagittarius', start: [11, 22], end: [12, 21] },
      { name: '♑ Capricorn', start: [12, 22], end: [1, 19] },
      { name: '♒ Aquarius', start: [1, 20], end: [2, 18] },
      { name: '♓ Pisces', start: [2, 19], end: [3, 20] },
    ];

    for (const sign of signs) {
      const [startMonth, startDay] = sign.start;
      const [endMonth, endDay] = sign.end;
      
      if (
        (month === startMonth && day >= startDay) ||
        (month === endMonth && day <= endDay) ||
        (month > startMonth && month < endMonth)
      ) {
        return sign.name;
      }
    }
    return '♈ Aries';
  };

  const getGeneration = (year: number): string => {
    if (year >= 2013) return 'Gen Alpha';
    if (year >= 1997) return 'Gen Z';
    if (year >= 1981) return 'Millennial';
    if (year >= 1965) return 'Gen X';
    if (year >= 1946) return 'Baby Boomer';
    return 'Silent Generation';
  };

  const getLifeExpectancy = (years: number): string => {
    const avgLife = 78; // Global average
    const remaining = Math.max(0, avgLife - years);
    return `${Math.round(remaining)} years remaining`;
  };

  const calculateAge = () => {
    if (!birthDate) return;

    const birth = new Date(birthDate);
    const now = new Date();

    if (birth > now) {
      alert('Date of birth cannot be in the future');
      return;
    }

    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const diffTime = now.getTime() - birth.getTime();
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const totalHours = Math.floor(diffTime / (1000 * 60 * 60));
    const totalMinutes = Math.floor(diffTime / (1000 * 60));
    const totalSeconds = Math.floor(diffTime / 1000);

    const nextBirthday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday < now) {
      nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
    }
    const daysUntilNextBirthday = Math.ceil((nextBirthday.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    const zodiacSign = getZodiacSign(birth.getMonth() + 1, birth.getDate());
    const generation = getGeneration(birth.getFullYear());
    const lifeExpectancy = getLifeExpectancy(years);
    const ageInDogYears = Math.round(years * 7);
    const ageInCatYears = Math.round(years * 6.5);

    setResult({
      years,
      months,
      days,
      hours: now.getHours(),
      minutes: now.getMinutes(),
      seconds: now.getSeconds(),
      totalDays,
      totalHours,
      totalMinutes,
      totalSeconds,
      nextBirthday,
      daysUntilNextBirthday,
      zodiacSign,
      generation,
      lifeExpectancy,
      ageInDogYears,
      ageInCatYears,
    });
  };

  const copyToClipboard = async () => {
    if (!result) return;
    const text = `Age: ${result.years} years, ${result.months} months, ${result.days} days\nTotal Days: ${result.totalDays.toLocaleString()}\nTotal Hours: ${result.totalHours.toLocaleString()}\nTotal Minutes: ${result.totalMinutes.toLocaleString()}\nTotal Seconds: ${result.totalSeconds.toLocaleString()}\nZodiac: ${result.zodiacSign}\nGeneration: ${result.generation}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearAll = () => {
    setBirthDate('');
    setResult(null);
  };

  // Set today's date as default
  const today = new Date().toISOString().split('T')[0];

  // Fun facts about age
  const getFunFact = (years: number) => {
    const facts = [
      `You've lived through ${Math.floor(years / 4)} leap years!`,
      `You've had approximately ${Math.floor(years * 365 * 8)} meals!`,
      `Your heart has beaten about ${Math.floor(years * 365 * 24 * 60 * 72)} times!`,
      `You've spent about ${Math.floor(years * 365 * 8)} hours sleeping!`,
    ];
    return facts[Math.floor(Math.random() * facts.length)];
  };

  return (
    <div className="space-y-6">
      {/* Input */}
      <div>
        <label className="text-sm font-medium text-slate-700">Date of Birth</label>
        <div className="flex flex-col sm:flex-row gap-3 mt-1">
          <div className="relative flex-1">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              max={today}
              className="w-full rounded-lg border border-slate-200 bg-white pl-10 pr-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
          <button
            onClick={calculateAge}
            className="rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:scale-105 whitespace-nowrap"
          >
            <Clock className="mr-2 h-4 w-4 inline" />
            Calculate Age
          </button>
          <button
            onClick={clearAll}
            className="rounded-lg bg-slate-100 px-6 py-3 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-200 whitespace-nowrap"
          >
            <RefreshCw className="mr-2 h-4 w-4 inline" />
            Clear
          </button>
        </div>
      </div>

      {/* Result */}
      {result && (
        <div className="space-y-4">
          {/* Main Result */}
          <div className="rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 p-6 border border-indigo-200/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Your Age</p>
                <p className="text-3xl font-bold text-slate-900">
                  {result.years} years, {result.months} months, {result.days} days
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  🎂 Next birthday in {result.daysUntilNextBirthday} days
                </p>
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

          {/* Fun Facts */}
          <div className="rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 p-4 border border-amber-200/50">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-500" />
              <p className="text-sm font-medium text-slate-700">Fun Fact:</p>
              <p className="text-sm text-slate-600">{getFunFact(result.years)}</p>
            </div>
          </div>

          {/* Zodiac & Generation */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-white p-4 border border-slate-200/50 text-center shadow-sm">
              <p className="text-2xl">{result.zodiacSign}</p>
              <p className="text-xs text-slate-500">Zodiac Sign</p>
            </div>
            <div className="rounded-xl bg-white p-4 border border-slate-200/50 text-center shadow-sm">
              <p className="text-sm font-medium text-slate-900">{result.generation}</p>
              <p className="text-xs text-slate-500">Generation</p>
            </div>
          </div>

          {/* Age in Animal Years */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-white p-4 border border-slate-200/50 text-center shadow-sm">
              <p className="text-lg font-bold text-indigo-600">{result.ageInDogYears}</p>
              <p className="text-xs text-slate-500">🐕 Dog Years</p>
            </div>
            <div className="rounded-xl bg-white p-4 border border-slate-200/50 text-center shadow-sm">
              <p className="text-lg font-bold text-purple-600">{result.ageInCatYears}</p>
              <p className="text-xs text-slate-500">🐈 Cat Years</p>
            </div>
          </div>

          {/* Life Expectancy */}
          <div className="rounded-xl bg-white p-4 border border-slate-200/50 text-center shadow-sm">
            <p className="text-sm font-medium text-slate-900">{result.lifeExpectancy}</p>
            <p className="text-xs text-slate-500">⏳ Life Expectancy</p>
          </div>

          {/* Detailed Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="rounded-xl bg-white p-4 border border-slate-200/50 text-center shadow-sm">
              <p className="text-2xl font-bold text-indigo-600">{result.totalDays.toLocaleString()}</p>
              <p className="text-xs text-slate-500">Total Days</p>
            </div>
            <div className="rounded-xl bg-white p-4 border border-slate-200/50 text-center shadow-sm">
              <p className="text-2xl font-bold text-indigo-600">{result.totalHours.toLocaleString()}</p>
              <p className="text-xs text-slate-500">Total Hours</p>
            </div>
            <div className="rounded-xl bg-white p-4 border border-slate-200/50 text-center shadow-sm">
              <p className="text-2xl font-bold text-indigo-600">{result.totalMinutes.toLocaleString()}</p>
              <p className="text-xs text-slate-500">Total Minutes</p>
            </div>
            <div className="rounded-xl bg-white p-4 border border-slate-200/50 text-center shadow-sm">
              <p className="text-2xl font-bold text-indigo-600">{result.totalSeconds.toLocaleString()}</p>
              <p className="text-xs text-slate-500">Total Seconds</p>
            </div>
            <div className="rounded-xl bg-white p-4 border border-slate-200/50 text-center shadow-sm">
              <p className="text-2xl font-bold text-emerald-600">{result.daysUntilNextBirthday}</p>
              <p className="text-xs text-slate-500">Days Until Birthday</p>
            </div>
            <div className="rounded-xl bg-white p-4 border border-slate-200/50 text-center shadow-sm">
              <p className="text-sm font-medium text-slate-900">
                {result.nextBirthday.toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
              <p className="text-xs text-slate-500">Next Birthday</p>
            </div>
          </div>
        </div>
      )}

      {/* Info */}
      <div className="rounded-2xl bg-indigo-50/50 p-4 border border-indigo-200/50">
        <p className="text-sm text-slate-600">
          <span className="font-semibold text-indigo-600">💡 Pro Tip:</span> 
          All calculations are processed entirely in your browser — <span className="font-medium">100% private</span>.
          Age updates in real-time! 🕐
        </p>
      </div>
    </div>
  );
}