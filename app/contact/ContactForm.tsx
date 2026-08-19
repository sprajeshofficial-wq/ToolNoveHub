'use client';

import { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

type FormData = {
  name: string;
  email: string;
  message: string;
};

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState<
    'idle' | 'submitting' | 'success' | 'error'
  >('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setStatus('submitting');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setStatus('success');

      setFormData({
        name: '',
        email: '',
        message: '',
      });
    } catch (error) {
      console.error('Contact form error:', error);
      setStatus('error');
    }
  };

  const isSubmitting = status === 'submitting';

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="text-sm font-medium text-slate-700"
        >
          Your Name
        </label>

        <input
          id="name"
          name="name"
          type="text"
          placeholder="Enter your name"
          className="input-field mt-1"
          value={formData.name}
          onChange={(e) =>
            setFormData({
              ...formData,
              name: e.target.value,
            })
          }
          autoComplete="name"
          minLength={2}
          maxLength={100}
          required
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="text-sm font-medium text-slate-700"
        >
          Email Address
        </label>

        <input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          className="input-field mt-1"
          value={formData.email}
          onChange={(e) =>
            setFormData({
              ...formData,
              email: e.target.value,
            })
          }
          autoComplete="email"
          maxLength={254}
          required
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="text-sm font-medium text-slate-700"
        >
          Message
        </label>

        <textarea
          id="message"
          name="message"
          placeholder="Tell us what you think..."
          className="textarea-field mt-1"
          rows={6}
          value={formData.message}
          onChange={(e) =>
            setFormData({
              ...formData,
              message: e.target.value,
            })
          }
          minLength={10}
          maxLength={5000}
          required
          disabled={isSubmitting}
        />
      </div>

      {status === 'success' && (
        <div
          role="status"
          className="flex items-center gap-2 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700"
        >
          <CheckCircle className="h-4 w-4" />
          Your message was sent successfully.
        </div>
      )}

      {status === 'error' && (
        <div
          role="alert"
          className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700"
        >
          <AlertCircle className="h-4 w-4" />
          We couldn&apos;t send your message. Please try again or email us
          directly at support@toolnovehub.tools.
        </div>
      )}

      <button
        type="submit"
        className="w-full btn-primary"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          'Sending...'
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            Send Message
          </>
        )}
      </button>
    </form>
  );
}