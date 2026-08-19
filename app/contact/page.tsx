'use client';

import { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen py-20 px-4 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-slate-900">Contact Us</h1>
          <p className="mt-4 text-lg text-slate-600">
            Have questions, feedback, or suggestions? We'd love to hear from you!
          </p>
        </div>

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
                  <p className="text-sm text-slate-600">support@toolnovehub.tools</p>
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
                  <label className="text-sm font-medium text-slate-700">Your Name</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="input-field mt-1"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700">Email Address</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="input-field mt-1"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700">Message</label>
                  <textarea
                    placeholder="Tell us what you think..."
                    className="textarea-field mt-1"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
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
          </div>
        </div>
      </div>
    </div>
  );
}