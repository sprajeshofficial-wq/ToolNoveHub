'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart, Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');

  const footerLinks = {
    Tools: [
      { name: 'QR Code Generator', href: '/tools/qr-code-generator' },
      { name: 'Image Resizer', href: '/tools/image-resizer' },
      { name: 'Percentage Calculator', href: '/tools/percentage-calculator' },
      { name: 'Word Counter', href: '/tools/word-counter' },
      { name: 'JSON Formatter', href: '/tools/json-formatter' },
      { name: 'Color Picker', href: '/tools/color-picker' },
      { name: 'Binary Converter', href: '/tools/binary-converter' },
      { name: 'Calculator', href: '/tools/calculator' },
    ],
    Company: [
      { name: 'About', href: '/about' },
      { name: 'Blog', href: '/blog' },
      { name: 'Contact', href: '/contact' },
      { name: 'Terms', href: '/terms' },
      { name: 'Privacy', href: '/privacy' },
      { name: 'Docs', href: '/docs' },
    ],
  };

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email) {
      window.location.href = `mailto:support@toolnovehub.tools?subject=Newsletter%20Subscription&body=Please%20add%20me%20to%20your%20newsletter%20list.%20My%20email%20is%20${encodeURIComponent(email)}`;
      setEmail('');
      alert('📧 Thank you! Please check your email client to complete the subscription.');
    }
  };

  return (
    <footer className="border-t border-slate-200/50 bg-white/50 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative h-9 w-9 overflow-hidden rounded-xl">
                <Image
                  src="/logo.png"
                  alt="ToolNoveHub"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                ToolNoveHub
              </span>
            </Link>
            <p className="mt-4 text-sm text-slate-600">
              Free online tools for students, developers, and everyone else.
            </p>
            <div className="mt-4 flex gap-3">
              <a
                href="#"
                className="rounded-lg bg-slate-100 p-2 text-slate-600 transition-colors hover:bg-indigo-100 hover:text-indigo-600"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="rounded-lg bg-slate-100 p-2 text-slate-600 transition-colors hover:bg-indigo-100 hover:text-indigo-600"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="rounded-lg bg-slate-100 p-2 text-slate-600 transition-colors hover:bg-indigo-100 hover:text-indigo-600"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="mailto:support@toolnovehub.tools"
                className="rounded-lg bg-slate-100 p-2 text-slate-600 transition-colors hover:bg-indigo-100 hover:text-indigo-600"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Tool Links */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Tools</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.Tools.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 transition-colors hover:text-indigo-600"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Company</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.Company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 transition-colors hover:text-indigo-600"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-sm font-semibold text-slate-900">Stay Updated</h3>
            <p className="mt-2 text-sm text-slate-600">
              Get notified when we add new tools.
            </p>
            <form onSubmit={handleSubscribe} className="mt-4 flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 rounded-lg border border-slate-200 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                aria-label="Email address"
                required
              />
              <button
                type="submit"
                className="rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:scale-105 whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
            <p className="mt-2 text-xs text-slate-400">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-slate-200/50 pt-8 text-center text-sm text-slate-600">
          <p className="flex items-center justify-center gap-1">
            Made with <Heart className="h-4 w-4 text-red-500 animate-pulse" /> by{' '}
            <span className="font-medium text-slate-900">ToolNoveHub</span>
          </p>
          <p className="mt-1">
            &copy; {new Date().getFullYear()} ToolNoveHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;