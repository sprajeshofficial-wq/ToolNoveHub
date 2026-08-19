import Link from 'next/link';
import { Code, QrCode, Braces, FileJson, Type, Scan, Binary } from 'lucide-react';

export default function DeveloperPage() {
  const tools = [
    { name: 'QR Code Generator', href: '/tools/qr-code-generator', icon: QrCode },
    { name: 'JSON Formatter', href: '/tools/json-formatter', icon: Braces },
    { name: 'JSON Validator', href: '/tools/json-validator', icon: FileJson },
    { name: 'Text to Slug', href: '/tools/text-to-slug', icon: Type },
    { name: 'QR Code Scanner', href: '/tools/qr-code-scanner', icon: Scan },
    { name: 'Binary Converter', href: '/tools/binary-converter', icon: Binary },
  ];

  return (
    <div className="min-h-screen py-20 px-4 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-slate-900 text-center mb-4">Developer Tools</h1>
        <p className="text-center text-slate-600 mb-12">Essential tools for developers and programmers.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link key={tool.name} href={tool.href} className="rounded-xl bg-white p-4 shadow-lg hover:shadow-xl transition-all border border-slate-200/50 flex items-center gap-3 hover:border-indigo-200">
                <div className="rounded-lg bg-indigo-100 p-2">
                  <Icon className="h-5 w-5 text-indigo-600" />
                </div>
                <span className="font-medium text-slate-900">{tool.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}