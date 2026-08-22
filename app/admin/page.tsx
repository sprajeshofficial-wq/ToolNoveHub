'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Shield, Users, Eye, TrendingUp } from 'lucide-react';  // ← Added TrendingUp

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [visitors, setVisitors] = useState({ active: 0, today: 0, total: 0 });
  const router = useRouter();

  useEffect(() => {
    fetch('/api/visitors')
      .then(res => res.json())
      .then(data => setVisitors(data))
      .catch(() => {});
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '133011RDdr!@#***') {
      localStorage.setItem('adminLoggedIn', 'true');
      router.push('/admin/dashboard');
    } else {
      setError('Invalid password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <div className="max-w-md w-full rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 p-8 shadow-xl">
        <div className="text-center">
          <div className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 p-3 shadow-lg shadow-indigo-500/25">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-slate-900">Admin Access</h1>
          <p className="mt-2 text-sm text-slate-500">Enter the password to view analytics</p>
        </div>

        {/* Live Stats */}
        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          <div className="rounded-lg bg-slate-50 p-2">
            <Users className="h-4 w-4 text-emerald-500 mx-auto" />
            <p className="text-sm font-bold text-slate-900">{visitors.active}</p>
            <p className="text-xs text-slate-400">Active</p>
          </div>
          <div className="rounded-lg bg-slate-50 p-2">
            <Eye className="h-4 w-4 text-blue-500 mx-auto" />
            <p className="text-sm font-bold text-slate-900">{visitors.today}</p>
            <p className="text-xs text-slate-400">Today</p>
          </div>
          <div className="rounded-lg bg-slate-50 p-2">
            <TrendingUp className="h-4 w-4 text-purple-500 mx-auto" />
            <p className="text-sm font-bold text-slate-900">{visitors.total}</p>
            <p className="text-xs text-slate-400">Total</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-700">Password</label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full rounded-lg border border-slate-200 bg-white pl-10 pr-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                required
              />
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          <button
            type="submit"
            className="w-full btn-primary"
          >
            Access Dashboard
          </button>
        </form>

        <p className="mt-4 text-xs text-center text-slate-400">
          🔒 Your site is safe and private
        </p>
      </div>
    </div>
  );
}