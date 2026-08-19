import Link from 'next/link';
import { 
  QrCode, 
  Image, 
  Percent, 
  AlignLeft, 
  Braces,
  ArrowRight,
  Wrench,
  Search
} from 'lucide-react';
import ToolCard from '@/app/components/ToolCard';

export default function AllTools() {
  const tools = [
    {
      name: 'QR Code Generator',
      description: 'Generate QR codes instantly for any URL or text.',
      icon: QrCode,
      href: '/tools/qr-code-generator',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      name: 'Image Resizer',
      description: 'Resize images in bulk with custom dimensions.',
      icon: Image,
      href: '/tools/image-resizer',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      name: 'Percentage Calculator',
      description: 'Calculate percentages quickly and easily.',
      icon: Percent,
      href: '/tools/percentage-calculator',
      color: 'from-amber-500 to-orange-500',
    },
    {
      name: 'Word Counter',
      description: 'Count words, characters, and sentences in any text.',
      icon: AlignLeft,
      href: '/tools/word-counter',
      color: 'from-rose-500 to-pink-500',
    },
    {
      name: 'JSON Formatter',
      description: 'Format, validate, and beautify JSON data.',
      icon: Braces,
      href: '/tools/json-formatter',
      color: 'from-violet-500 to-purple-500',
    },
  ];

  return (
    <div className="min-h-screen py-20 px-4 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 p-3 shadow-lg shadow-indigo-500/25">
            <Wrench className="h-8 w-8 text-white" />
          </div>
          <h1 className="mt-4 text-3xl font-bold text-slate-900">All Tools</h1>
          <p className="mt-2 text-slate-600">Browse all free online tools available.</p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              placeholder="Search tools..."
              className="w-full rounded-xl border border-slate-200 bg-white/50 py-3 pl-12 pr-4 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 backdrop-blur-sm"
            />
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tools.map((tool) => (
            <ToolCard key={tool.name} {...tool} />
          ))}
        </div>
      </div>
    </div>
  );
}