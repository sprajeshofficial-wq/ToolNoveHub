'use client';

import { useState, useEffect } from 'react';
import { 
  Users, 
  Eye, 
  MousePointer, 
  Clock, 
  Globe, 
  Smartphone,
  Monitor,
  Tablet,
  TrendingUp,
  BarChart3,
  Activity,
  MapPin,
  RefreshCw
} from 'lucide-react';

export default function AdminDashboard() {
  const [visitors, setVisitors] = useState({
    active: 0,
    today: 0,
    total: 0,
  });
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState('');

  // Fetch real data from API
  const fetchData = async () => {
    try {
      const response = await fetch('/api/visitors');
      const data = await response.json();
      setVisitors(data);
      setLastUpdated(new Date().toLocaleTimeString());
      setLoading(false);
    } catch (error) {
      console.error('Error fetching visitors:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // Refresh every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { 
      label: 'Active Now', 
      value: visitors.active, 
      icon: Users, 
      color: 'from-emerald-500 to-teal-500',
      bg: 'bg-emerald-50',
      text: 'text-emerald-600'
    },
    { 
      label: "Today's Visitors", 
      value: visitors.today, 
      icon: Eye, 
      color: 'from-blue-500 to-cyan-500',
      bg: 'bg-blue-50',
      text: 'text-blue-600'
    },
    { 
      label: 'Total Visitors', 
      value: visitors.total.toLocaleString(), 
      icon: TrendingUp, 
      color: 'from-purple-500 to-pink-500',
      bg: 'bg-purple-50',
      text: 'text-purple-600'
    },
  ];

  return (
    <div className="min-h-screen py-20 px-4 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">📊 Live Analytics Dashboard</h1>
            <p className="text-slate-500 text-sm mt-1">
              Last updated: {lastUpdated || 'Loading...'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-emerald-600 bg-emerald-50 px-4 py-2 rounded-full">
              <div className="relative">
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <div className="absolute inset-0 h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
              </div>
              <span>Live</span>
            </div>
            <button 
              onClick={fetchData}
              className="p-2 rounded-lg bg-white shadow hover:shadow-md transition-all"
            >
              <RefreshCw className="h-5 w-5 text-slate-500" />
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className={`rounded-2xl ${stat.bg} p-6 border border-slate-200/50 shadow-sm`}>
                <div className="flex items-center gap-3">
                  <div className={`rounded-xl bg-gradient-to-r ${stat.color} p-3 shadow-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">{stat.label}</p>
                    <p className={`text-2xl font-bold ${stat.text}`}>{stat.value}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 p-6 shadow-xl">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <Activity className="h-5 w-5 text-indigo-500" />
            Recent Activity
          </h3>
          <div className="space-y-2">
            <div className="flex items-center gap-3 text-sm p-2 rounded-lg hover:bg-slate-50 transition-colors">
              <Clock className="h-4 w-4 text-slate-400" />
              <span className="text-slate-500 min-w-[70px]">Just now</span>
              <span className="text-slate-700">Dashboard updated with live data</span>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-slate-400">
          🔒 This dashboard is private - only you can see this page
        </div>
      </div>
    </div>
  );
}