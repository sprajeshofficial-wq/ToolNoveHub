'use client';

import { useState, useEffect } from 'react';
import { Users, Eye } from 'lucide-react';

export default function LiveVisitors() {
  const [visitors, setVisitors] = useState(0);
  const [totalVisitors, setTotalVisitors] = useState(0);
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    // Get total visitors from localStorage
    const savedTotal = localStorage.getItem('totalVisitors');
    if (savedTotal) {
      setTotalVisitors(parseInt(savedTotal));
    } else {
      const initial = Math.floor(Math.random() * 500) + 100;
      setTotalVisitors(initial);
      localStorage.setItem('totalVisitors', String(initial));
    }

    // Generate random live visitors (simulated)
    const baseVisitors = Math.floor(Math.random() * 8) + 2;
    setVisitors(baseVisitors);
    setIsLive(true);

    // Update live visitors every 30 seconds
    const interval = setInterval(() => {
      const change = Math.floor(Math.random() * 3) - 1;
      setVisitors(prev => {
        const newVal = Math.max(1, prev + change);
        return newVal;
      });
      
      // Occasionally update total
      if (Math.random() < 0.1) {
        setTotalVisitors(prev => {
          const newTotal = prev + 1;
          localStorage.setItem('totalVisitors', String(newTotal));
          return newTotal;
        });
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-4 text-sm text-slate-600">
      {/* Live Visitors */}
      <div className="flex items-center gap-2">
        <div className="relative">
          <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <div className="absolute inset-0 h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
        </div>
        <Users className="h-4 w-4" />
        <span className="font-medium text-slate-900">{visitors}</span>
        <span className="text-slate-400">active now</span>
      </div>

      <span className="text-slate-300">|</span>

      {/* Total Visitors */}
      <div className="flex items-center gap-2">
        <Eye className="h-4 w-4" />
        <span className="font-medium text-slate-900">{totalVisitors.toLocaleString()}</span>
        <span className="text-slate-400">total visitors</span>
      </div>
    </div>
  );
}