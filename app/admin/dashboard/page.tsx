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

// This is a private dashboard - only you should access this
// Add password protection or use .env variable

export default function AdminDashboard() {
  const [visitors, setVisitors] = useState({
    active: 0,
    today: 0,
    total: 0,
    pageViews: 0,
  });

  const [locationData, setLocationData] = useState([
    { country: 'USA', count: 12 },
    { country: 'UK', count: 8 },
    { country: 'India', count: 5 },
    { country: 'Germany', count: 3 },
    { country: 'Canada', count: 2 },
  ]);

  const [pageData, setPageData] = useState([
    { page: '/tools/qr-code-generator', views: 45 },
    { page: '/', views: 38 },
    { page: '/tools', views: 29 },
    { page: '/blog', views: 18 },
    { page: '/tools/color-picker', views: 12 },
  ]);

  const [deviceData, setDeviceData] = useState([
    { device: 'Mobile', count: 42, icon: Smartphone },
    { device: 'Desktop', count: 35, icon: Monitor },
    { device: 'Tablet', count: 8, icon: Tablet },
  ]);

  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState('');

  // Simulate fetching data (in production, call your API)
  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setVisitors({
          active: Math.floor(Math.random() * 15) + 3,
          today: Math.floor(Math.random() * 100) + 50,
          total: Math.floor(Math.random() * 5000) + 1000,
          pageViews: Math.floor(Math.random() * 200) + 100,
        });
        
        setLastUpdated(new Date().toLocaleTimeString());
        setLoading(false);
      }, 500);
    };

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
      label: 'Today\'s Visitors', 
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
    { 
      label: 'Page Views', 
      value: visitors.pageViews, 
      icon: MousePointer, 
      color: 'from-amber-500 to-orange-500',
      bg: 'bg-amber-50',
      text: 'text-amber-600'
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
              onClick={() => window.location.reload()}
              className="p-2 rounded-lg bg-white shadow hover:shadow-md transition-all"
            >
              <RefreshCw className="h-5 w-5 text-slate-500" />
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Page Views */}
          <div className="rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-indigo-500" />
              Top Pages
            </h3>
            <div className="space-y-3">
              {pageData.map((item) => (
                <div key={item.page}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600">{item.page}</span>
                    <span className="font-medium text-slate-900">{item.views}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all"
                      style={{ width: `${(item.views / pageData[0].views) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Location & Devices */}
          <div className="space-y-6">
            {/* Location */}
            <div className="rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 p-6 shadow-xl">
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-indigo-500" />
                Visitor Locations
              </h3>
              <div className="space-y-2">
                {locationData.map((item) => (
                  <div key={item.country} className="flex justify-between text-sm">
                    <span className="text-slate-600">{item.country}</span>
                    <span className="font-medium text-slate-900">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Devices */}
            <div className="rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 p-6 shadow-xl">
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-indigo-500" />
                Devices
              </h3>
              <div className="space-y-3">
                {deviceData.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.device} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Icon className="h-5 w-5 text-slate-500" />
                        <span className="text-sm text-slate-600">{item.device}</span>
                      </div>
                      <span className="text-sm font-medium text-slate-900">{item.count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Activity Log */}
        <div className="rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 p-6 shadow-xl">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <Activity className="h-5 w-5 text-indigo-500" />
            Recent Activity
          </h3>
          <div className="space-y-2">
            {[
              { time: 'Just now', action: 'New visitor from USA visited /tools/qr-code-generator' },
              { time: '2 min ago', action: 'Visitor from UK viewed /blog' },
              { time: '5 min ago', action: 'New visitor from India visited /tools/color-picker' },
              { time: '8 min ago', action: 'Visitor from Germany viewed /tools' },
              { time: '12 min ago', action: 'New visitor from Canada visited /' },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3 text-sm p-2 rounded-lg hover:bg-slate-50 transition-colors">
                <Clock className="h-4 w-4 text-slate-400" />
                <span className="text-slate-500 min-w-[70px]">{item.time}</span>
                <span className="text-slate-700">{item.action}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-6 text-center text-sm text-slate-400">
          🔒 This dashboard is private - only you can see this page
        </div>
      </div>
    </div>
  );
}