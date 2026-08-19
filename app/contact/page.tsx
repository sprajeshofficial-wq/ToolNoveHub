'use client';

import { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen py-20 px-4 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <div className="mx-auto max-w-2xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-slate-900">Contact Us</h1>
          <p className="mt-4 text-lg text-slate-600">
            Have questions, feedback, or suggestions? We'd love to hear from you!
          </p>
        </div>

        <div className="rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-sm font-medium text-slate-700">Your Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="input-field mt-1"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="input-field mt-1"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">Message</label>
              <textarea
                placeholder="Tell us what you think..."
                className="textarea-field mt-1"
                rows={5}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full btn-primary"
              disabled={submitted}
            >
              {submitted ? (
                <>
                  <CheckCircle className="mr-2 h-4 w-4 animate-pulse" />
                  Sent Successfully!
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>

        <div className="mt-6 rounded-2xl bg-indigo-50/50 p-4 border border-indigo-200/50 text-center">
          <div className="flex items-center justify-center gap-3 text-sm text-slate-600">
            <Mail className="h-4 w-4 text-indigo-600" />
            <span>Or email us directly at: support@toolnovehub.tools</span>
          </div>
        </div>
      </div>
    </div>
  );
}