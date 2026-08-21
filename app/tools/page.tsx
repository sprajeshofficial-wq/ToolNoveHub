'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  QrCode, 
  Image, 
  Percent, 
  AlignLeft, 
  Braces,
  Wrench,
  Search,
  Type,
  Hash,
  Calculator,
  Palette,
  FileJson,
  Scan,
  Crop,
  TextQuote,
  Binary,
  FileText,
  X,
  Sparkles,
  RefreshCw
} from 'lucide-react';

// All tools data - 16 tools
const ALL_TOOLS = [
  // ========== Developer Tools (6) ==========
  {
    name: 'QR Code Generator',
    description: 'Generate QR codes instantly for any URL or text.',
    icon: QrCode,
    href: '/tools/qr-code-generator',
    category: 'Developer Tools',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    name: 'JSON Formatter',
    description: 'Format, validate, and beautify JSON data.',
    icon: Braces,
    href: '/tools/json-formatter',
    category: 'Developer Tools',
    color: 'from-violet-500 to-purple-500',
  },
  {
    name: 'JSON Validator',
    description: 'Validate JSON data and find syntax errors instantly.',
    icon: FileJson,
    href: '/tools/json-validator',
    category: 'Developer Tools',
    color: 'from-indigo-500 to-purple-500',
  },
  {
    name: 'Text to Slug Converter',
    description: 'Convert any text to a clean URL-friendly slug.',
    icon: Type,
    href: '/tools/text-to-slug',
    category: 'Developer Tools',
    color: 'from-indigo-500 to-blue-500',
  },
  {
    name: 'QR Code Scanner',
    description: 'Scan QR codes using your camera.',
    icon: Scan,
    href: '/tools/qr-code-scanner',
    category: 'Developer Tools',
    color: 'from-teal-500 to-cyan-500',
  },
  {
    name: 'Binary Converter',
    description: 'Convert text to binary and binary to text.',
    icon: Binary,
    href: '/tools/binary-converter',
    category: 'Developer Tools',
    color: 'from-rose-500 to-red-500',
  },
  // ========== Text Tools (3) ==========
  {
    name: 'Word Counter',
    description: 'Count words, characters, and sentences in any text.',
    icon: AlignLeft,
    href: '/tools/word-counter',
    category: 'Text Tools',
    color: 'from-rose-500 to-pink-500',
  },
  {
    name: 'Text to ASCII',
    description: 'Convert text to ASCII art.',
    icon: TextQuote,
    href: '/tools/text-to-ascii',
    category: 'Text Tools',
    color: 'from-gray-500 to-slate-500',
  },
  {
    name: 'Text Repeater',
    description: 'Repeat text multiple times with custom separators.',
    icon: RefreshCw,
    href: '/tools/text-repeater',
    category: 'Text Tools',
    color: 'from-green-500 to-emerald-500',
  },
  // ========== Calculator Tools (4) ==========
  {
    name: 'Percentage Calculator',
    description: 'Calculate percentages quickly and easily.',
    icon: Percent,
    href: '/tools/percentage-calculator',
    category: 'Calculator Tools',
    color: 'from-amber-500 to-orange-500',
  },
  {
    name: 'Simple Calculator',
    description: 'Basic calculator for quick arithmetic.',
    icon: Calculator,
    href: '/tools/calculator',
    category: 'Calculator Tools',
    color: 'from-green-500 to-emerald-500',
  },
  {
    name: 'File Size Converter',
    description: 'Convert between bytes, KB, MB, GB, and TB.',
    icon: FileText,
    href: '/tools/file-size-converter',
    category: 'Calculator Tools',
    color: 'from-blue-500 to-indigo-500',
  },
  {
    name: 'Number to Words',
    description: 'Convert numbers to words (123 → one hundred twenty-three).',
    icon: Hash,
    href: '/tools/number-to-words',
    category: 'Calculator Tools',
    color: 'from-amber-500 to-yellow-500',
  },
  // ========== Design Tools (3) ==========
  {
    name: 'Image Resizer',
    description: 'Resize images in bulk with custom dimensions.',
    icon: Image,
    href: '/tools/image-resizer',
    category: 'Design Tools',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'Color Picker',
    description: 'Pick and convert colors between HEX, RGB, and HSL.',
    icon: Palette,
    href: '/tools/color-picker',
    category: 'Design Tools',
    color: 'from-purple-500 to-pink-500',
  },
  {
    name: 'Image Cropper',
    description: 'Crop images to any aspect ratio.',
    icon: Crop,
    href: '/tools/image-cropper',
    category: 'Design Tools',
    color: 'from-sky-500 to-blue-500',
  },
  {
  name: 'Password Generator',
  description: 'Generate strong, secure passwords instantly. Customize length and character types.',
  icon: Key,
  href: '/tools/password-generator',
  category: 'Security Tools',
  color: 'from-amber-500 to-orange-500',
},
];

// Popular tools (first 5)
const POPULAR_TOOLS = ALL_TOOLS.slice(0, 5);

export default function AllTools() {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter tools based on search
  const filteredTools = useMemo(() => {
    if (!searchQuery.trim()) return ALL_TOOLS;
    
    const query = searchQuery.toLowerCase().trim();
    return ALL_TOOLS.filter(tool => 
      tool.name.toLowerCase().includes(query) ||
      tool.description.toLowerCase().includes(query) ||
      tool.category.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Group filtered tools by category
  const groupedTools = filteredTools.reduce((acc, tool) => {
    if (!acc[tool.category]) {
      acc[tool.category] = [];
    }
    acc[tool.category].push(tool);
    return acc;
  }, {} as Record<string, typeof ALL_TOOLS>);

  const categories = Object.keys(groupedTools);
  const hasResults = filteredTools.length > 0;

  return (
    <div className="min-h-screen py-20 px-4 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 p-3 shadow-lg shadow-indigo-500/25">
            <Wrench className="h-8 w-8 text-white" />
          </div>
          <h1 className="mt-4 text-4xl font-bold text-slate-900">All Tools</h1>
          <p className="mt-2 text-slate-600">
            {ALL_TOOLS.length} free online tools available. Find what you need.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 max-w-2xl mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`🔍 Search ${ALL_TOOLS.length} tools by name, description, or category...`}
              className="w-full rounded-2xl border-2 border-slate-200 bg-white py-4 pl-12 pr-12 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 shadow-lg text-lg transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
          
          {/* Search Results Count */}
          {searchQuery && (
            <p className="mt-3 text-center text-sm text-slate-500">
              Found {filteredTools.length} tool{filteredTools.length !== 1 ? 's' : ''} matching &quot;{searchQuery}&quot;
            </p>
          )}
        </div>

        {/* Popular Tools - Only show when no search */}
        {!searchQuery && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="h-5 w-5 text-amber-500" />
              <h2 className="text-2xl font-bold text-slate-900">⭐ Popular Tools</h2>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {POPULAR_TOOLS.map((tool) => (
                <ToolCard key={tool.name} {...tool} />
              ))}
            </div>
          </div>
        )}

        {/* All Tools by Category */}
        {hasResults ? (
          <div className="space-y-12">
            {categories.map((category) => (
              <div key={category}>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">
                  {category}
                  <span className="ml-2 text-sm font-normal text-slate-400">
                    ({groupedTools[category].length})
                  </span>
                </h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {groupedTools[category].map((tool) => (
                    <ToolCard key={tool.name} {...tool} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : searchQuery ? (
          // No results message
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center rounded-2xl bg-slate-100 p-4 mb-4">
              <Search className="h-12 w-12 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900">No tools found</h3>
            <p className="mt-2 text-slate-600">
              Try adjusting your search terms or browse all tools above.
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-4 text-indigo-600 hover:underline font-medium"
            >
              Clear search
            </button>
          </div>
        ) : null}

        {/* Coming Soon */}
        <div className="mt-16 rounded-2xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-200/50 p-8 text-center">
          <h3 className="text-xl font-bold text-slate-900">🔜 More Tools Coming Soon</h3>
          <p className="mt-2 text-slate-600">
            We're constantly adding new tools. Have a suggestion?{' '}
            <Link href="/contact" className="text-indigo-600 hover:underline">
              Let us know
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

// ToolCard Component
function ToolCard({ 
  name, 
  description, 
  icon: Icon, 
  href, 
  color = 'from-indigo-500 to-purple-500'
}: { 
  name: string; 
  description: string; 
  icon: any; 
  href: string; 
  color?: string;
}) {
  return (
    <Link href={href} className="group">
      <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/10 border border-slate-200/50 h-full flex flex-col">
        {/* Icon */}
        <div className={`mb-4 inline-flex rounded-xl bg-gradient-to-r ${color} p-3 shadow-lg`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        
        {/* Title */}
        <h3 className="text-lg font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
          {name}
        </h3>
        
        {/* Description */}
        <p className="mt-2 text-sm text-slate-600 flex-1 line-clamp-2">
          {description}
        </p>
        
        {/* Try Tool */}
        <div className="mt-4 flex items-center gap-1 text-sm font-medium text-indigo-600 group-hover:gap-2 transition-all">
          <span>Try Tool</span>
          <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
        </div>
      </div>
    </Link>
  );
}