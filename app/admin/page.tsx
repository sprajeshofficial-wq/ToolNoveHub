'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Shield } from 'lucide-react';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Change this password to your own secret password
    if (password === 'toolnovehub2026') {
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