'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    setStatus('sending');

    try {
      const subject = encodeURIComponent(`Contact from ${formData.name} via ToolNoveHub`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}\n\n---\nSent from ToolNoveHub Contact Form`
      );
      
      window.location.href = `mailto:support@toolnovehub.tools?subject=${subject}&body=${body}`;

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setSubmitted(true);
      setTimeout(() => {
        setStatus('idle');
        setSubmitted(false);
      }, 5000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <div className="min-h-screen py-20 px-4 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-slate-900">Contact Us</h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Have questions, feedback, or suggestions? We'd love to hear from you!
          </p>
        </div>

        {/* Success Message */}
        {status === 'success' && (
          <div className="mb-6 rounded-2xl bg-emerald-50 p-4 border border-emerald-200 flex items-center gap-3">
            <CheckCircle className="h-6 w-6 text-emerald-500 flex-shrink-0" />
            <div>
              <p className="font-medium text-emerald-700">Email Client Opened!</p>
              <p className="text-sm text-emerald-600">Please send the message to complete.</p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {status === 'error' && (
          <div className="mb-6 rounded-2xl bg-red-50 p-4 border border-red-200 flex items-center gap-3">
            <AlertCircle className="h-6 w-6 text-red-500 flex-shrink-0" />
            <div>
              <p className="font-medium text-red-700">Please Fill All Fields</p>
              <p className="text-sm text-red-600">All fields are required to send a message.</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Contact Info */}
          <div className="md:col-span-1 space-y-4">
            <div className="rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 p-6 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-indigo-600 p-2">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">Email</p>
                  <a
                    href="mailto:support@toolnovehub.tools"
                    className="text-sm text-indigo-600 hover:underline"
                  >
                    support@toolnovehub.tools
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 p-6 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-emerald-600 p-2">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">Response Time</p>
                  <p className="text-sm text-slate-600">Within 24 hours</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 p-6 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-purple-600 p-2">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">Location</p>
                  <p className="text-sm text-slate-600">Available Worldwide</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2">
            <div className="rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 p-8 shadow-xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="input-field mt-1"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    disabled={status === 'sending'}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="input-field mt-1"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    disabled={status === 'sending'}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    placeholder="Tell us what you think..."
                    className="textarea-field mt-1"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    disabled={status === 'sending'}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full btn-primary"
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Opening Email...
                    </div>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send via Email
                    </>
                  )}
                </button>
              </form>

              <p className="mt-4 text-center text-xs text-slate-400">
                📧 This will open your email client. We'll respond within 24 hours at{' '}
                <strong>support@toolnovehub.tools</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}