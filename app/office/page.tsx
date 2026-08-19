import Link from 'next/link';
import { FileText, Percent, Calculator, Type, Hash, AlignLeft } from 'lucide-react';

export default function OfficePage() {
  const tools = [
    { name: 'Percentage Calculator', href: '/tools/percentage-calculator', icon: Percent },
    { name: 'Simple Calculator', href: '/tools/calculator', icon: Calculator },
    { name: 'Word Counter', href: '/tools/word-counter', icon: AlignLeft },
    { name: 'File Size Converter', href: '/tools/file-size-converter', icon: FileText },
    { name: 'Number to Words', href: '/tools/number-to-words', icon: Type },
    { name: 'Character Counter', href: '/tools/character-counter', icon: Hash },
  ];

  return (
    <div className="min-h-screen py-20 px-4 bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-slate-900 text-center mb-4">Office Tools</h1>
        <p className="text-center text-slate-600 mb-12">Productivity tools for office workers.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link key={tool.name} href={tool.href} className="rounded-xl bg-white p-4 shadow-lg hover:shadow-xl transition-all border border-slate-200/50 flex items-center gap-3 hover:border-emerald-200">
                <div className="rounded-lg bg-emerald-100 p-2">
                  <Icon className="h-5 w-5 text-emerald-600" />
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