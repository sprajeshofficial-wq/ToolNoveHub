import Link from 'next/link';
import Image from 'next/image';
import { 
  QrCode, 
  Image as ImageIcon, 
  Percent, 
  AlignLeft, 
  Braces,
  ArrowRight,
  Zap,
  Shield,
  Clock,
  Smartphone,
  Sparkles,
  FileText,
  Calculator,
  Palette,
  Scan,
  Type,
  Hash,
  FileJson,
  Crop,
  Binary,
  RefreshCw,
  CheckCircle,
  Users,
  Briefcase,
  GraduationCap,
  Code
} from 'lucide-react';
import ToolCard from '@/app/components/ToolCard';

export const metadata = {
  title: 'Free Online Tools – QR, Image, PDF, JSON, Text & Calculators | ToolNoveHub',
  description: '100% free online tools for developers, students, and professionals. Generate QR codes, resize images, format JSON, calculate percentages, count words, and more. No signup required. Privacy-first browser-based tools.',
  keywords: 'free online tools, QR code generator, image resizer, JSON formatter, percentage calculator, word counter, text tools, developer tools, student tools, office tools',
  openGraph: {
    title: 'Free Online Tools – QR, Image, JSON, Text & Calculators | ToolNoveHub',
    description: '100% free online tools for everyone. Generate QR codes, resize images, format JSON, calculate percentages, count words, and more. No signup, no data upload, 100% private.',
    url: 'https://toolnovehub.tools',
    siteName: 'ToolNoveHub',
    type: 'website',
    images: [
      {
        url: '/logo.png',
        width: 512,
        height: 512,
        alt: 'ToolNoveHub - Free Online Tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Online Tools – QR, Image, JSON, Text & Calculators',
    description: '100% free online tools for everyone. No signup, no data upload, 100% private.',
    images: ['/logo.png'],
  },
};

export default function Home() {
  const tools = [
    {
      name: 'QR Code Generator',
      description: 'Generate QR codes instantly for any URL, text, or Wi-Fi network.',
      icon: QrCode,
      href: '/tools/qr-code-generator',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      name: 'Image Resizer',
      description: 'Resize images in bulk with custom dimensions for social media.',
      icon: ImageIcon,
      href: '/tools/image-resizer',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      name: 'Percentage Calculator',
      description: 'Calculate percentages, tips, discounts, and tax quickly.',
      icon: Percent,
      href: '/tools/percentage-calculator',
      color: 'from-amber-500 to-orange-500',
    },
    {
      name: 'Word Counter',
      description: 'Count words, characters, sentences, and paragraphs in any text.',
      icon: AlignLeft,
      href: '/tools/word-counter',
      color: 'from-rose-500 to-pink-500',
    },
    {
      name: 'JSON Formatter',
      description: 'Format, validate, and beautify JSON data for debugging.',
      icon: Braces,
      href: '/tools/json-formatter',
      color: 'from-violet-500 to-purple-500',
    },
  ];

  const features = [
    { 
      icon: Zap, 
      title: '100% Free', 
      description: 'All tools are completely free with no hidden charges, subscriptions, or paywalls.',
      href: '/tools' 
    },
    { 
      icon: Shield, 
      title: 'Privacy First', 
      description: 'Everything processes in your browser. No data is ever uploaded to any server.',
      href: '/privacy' 
    },
    { 
      icon: Clock, 
      title: 'Fast & Reliable', 
      description: 'Optimized for speed with instant results. No waiting, no loading delays.',
      href: '/tools' 
    },
    { 
      icon: Smartphone, 
      title: 'Works Everywhere', 
      description: 'Use on any device — desktop, tablet, or phone. No app download needed.',
      href: '/tools' 
    },
  ];

  // Tool categories with clickable links
  const toolCategories = [
    { 
      name: 'QR Code Tools', 
      icon: Scan, 
      description: 'Generate and scan QR codes',
      href: '/tools/qr-code-generator',
      color: 'from-emerald-500 to-teal-500'
    },
    { 
      name: 'Image Tools', 
      icon: ImageIcon, 
      description: 'Resize, crop, and edit images',
      href: '/tools/image-resizer',
      color: 'from-blue-500 to-cyan-500'
    },
    { 
      name: 'Text Tools', 
      icon: Type, 
      description: 'Count words, convert text, and more',
      href: '/tools/word-counter',
      color: 'from-rose-500 to-pink-500'
    },
    { 
      name: 'Calculator Tools', 
      icon: Calculator, 
      description: 'Calculate percentages, convert numbers',
      href: '/tools/percentage-calculator',
      color: 'from-amber-500 to-orange-500'
    },
    { 
      name: 'Developer Tools', 
      icon: Code, 
      description: 'Format JSON, convert binary, validate data',
      href: '/tools/json-formatter',
      color: 'from-violet-500 to-purple-500'
    },
    { 
      name: 'Design Tools', 
      icon: Palette, 
      description: 'Pick colors, crop images, resize photos',
      href: '/tools/color-picker',
      color: 'from-purple-500 to-pink-500'
    },
  ];

  return (
    <main className="min-h-screen">
      {/* SEO-Friendly Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 px-4">
        {/* Background Effects */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 -z-10 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-indigo-500/10 to-purple-500/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 -z-10 h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-pink-500/10 to-orange-500/10 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl text-center">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="relative h-24 w-24 overflow-hidden rounded-2xl shadow-2xl shadow-indigo-500/20 transition-all duration-500 hover:scale-110 hover:shadow-indigo-500/40">
              <Image
                src="/logo.png"
                alt="ToolNoveHub - Free Online Tools"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-1.5 text-sm text-indigo-600 border border-indigo-200/50">
            <Sparkles className="h-4 w-4" />
            <span>✨ 100% Free Online Tools — No Signup Required</span>
          </div>

          {/* Main Heading */}
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="text-slate-900">Free Online Tools –</span>
            <br />
            <span className="gradient-text">QR, Image, JSON, Text &amp; Calculators</span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-600 sm:text-xl">
            <strong>100% free online tools</strong> for developers, students, office workers, and everyday tasks. 
            Generate <strong>QR codes</strong>, resize <strong>images</strong>, format <strong>JSON</strong>, 
            calculate <strong>percentages</strong>, count <strong>words</strong>, and more. 
            <span className="block mt-2 text-indigo-600 font-medium">
              🔒 No signup. No data upload. 100% private.
            </span>
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/tools" className="btn-primary">
              Browse All Free Tools
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link href="/tools/qr-code-generator" className="btn-secondary bg-white text-slate-900 hover:bg-slate-50 shadow-lg border border-slate-200">
              Try QR Code Generator
            </Link>
          </div>

          {/* Feature Stats - Now Clickable */}
          <div className="mt-12 flex flex-wrap justify-center gap-8">
            {features.map((feature) => (
              <Link 
                key={feature.title} 
                href={feature.href}
                className="flex items-center gap-2 text-sm text-slate-600 hover:text-indigo-600 transition-colors group"
              >
                <feature.icon className="h-4 w-4 text-indigo-500 group-hover:scale-110 transition-transform" />
                <span className="font-medium">{feature.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Tool Categories Section - FULLY CLICKABLE */}
      <section className="py-16 px-4 bg-slate-50/50 border-y border-slate-200/50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900">Browse Tools by Category</h2>
            <p className="text-slate-600">Click any category to explore related tools</p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
            {toolCategories.map((category) => {
              const Icon = category.icon;
              return (
                <Link
                  key={category.name}
                  href={category.href}
                  className="group text-center p-4 rounded-xl bg-white shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 border border-slate-200/50 hover:border-indigo-200"
                >
                  <div className={`inline-flex rounded-lg bg-gradient-to-r ${category.color} p-3 shadow-lg transition-transform group-hover:scale-110`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mt-2 text-sm font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">{category.description}</p>
                  <span className="mt-2 inline-block text-xs font-medium text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    Click to explore →
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tools Grid Section */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">
              Popular <span className="gradient-text">Free Tools</span>
            </h2>
            <p className="mt-3 text-lg text-slate-600 max-w-2xl mx-auto">
              Try our most popular free online tools. All tools are 100% private, work in your browser, 
              and require no signup.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {tools.map((tool) => (
              <ToolCard key={tool.name} {...tool} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/tools" className="btn-primary">
              View All {tools.length}+ Free Tools
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Cards Section - FULLY CLICKABLE */}
      <section className="py-20 px-4 bg-slate-50/50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">
              Why Choose <span className="gradient-text">ToolNoveHub</span>
            </h2>
            <p className="mt-3 text-lg text-slate-600 max-w-2xl mx-auto">
              Thousands of users trust ToolNoveHub for their daily tasks. Here's why.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <Link
                key={feature.title}
                href={feature.href}
                className="group text-center p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 group-hover:from-indigo-500/20 group-hover:to-purple-500/20 transition-colors">
                  <feature.icon className="h-7 w-7 text-indigo-600 group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">{feature.description}</p>
                <span className="mt-3 inline-block text-sm font-medium text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="mx-auto max-w-4xl text-center text-white">
          <h2 className="text-3xl font-bold">Ready to Get Things Done?</h2>
          <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
            Join thousands of users who rely on ToolNoveHub for free, fast, and private online tools.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/tools" className="rounded-full bg-white px-8 py-3 font-semibold text-indigo-600 shadow-lg transition-all hover:scale-105 hover:shadow-xl">
              Browse All Tools
            </Link>
            <Link href="/contact" className="rounded-full bg-white/20 px-8 py-3 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/30 hover:scale-105">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}