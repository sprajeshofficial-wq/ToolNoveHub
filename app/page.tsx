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
  Sparkles
} from 'lucide-react';
import ToolCard from '@/app/components/ToolCard';

export default function Home() {
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
      icon: ImageIcon,
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

  const features = [
    { icon: Zap, title: 'Free to Use', description: 'All tools are completely free with no hidden charges.' },
    { icon: Shield, title: 'No Account', description: 'Start using tools immediately without signing up.' },
    { icon: Clock, title: 'Fast Processing', description: 'All tools are optimized for speed and efficiency.' },
    { icon: Smartphone, title: 'Mobile Friendly', description: 'Use tools on any device, anywhere.' },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 px-4">
        {/* Background Effects - REMOVED grid.svg */}
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
                alt="ToolNoveHub"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-1.5 text-sm text-indigo-600 border border-indigo-200/50">
            <Sparkles className="h-4 w-4" />
            <span>✨ 100% Free Online Tools</span>
          </div>

          {/* Heading */}
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="text-slate-900">Get things done</span>
            <br />
            <span className="gradient-text">faster &amp; easier.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 sm:text-xl">
            Powerful, simple online tools for students, developers, office workers, and everyday tasks.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/tools" className="btn-primary">
              Browse All Tools
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link href="/tools/qr-code-generator" className="btn-secondary bg-white text-slate-900 hover:bg-slate-50 shadow-lg">
              Try a Popular Tool
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-12 flex flex-wrap justify-center gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="flex items-center gap-2 text-sm text-slate-600">
                <feature.icon className="h-4 w-4 text-indigo-500" />
                <span className="font-medium">{feature.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Grid Section */}
      <section className="py-20 px-4 bg-slate-50/50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">
              Popular <span className="gradient-text">Tools</span>
            </h2>
            <p className="mt-3 text-lg text-slate-600">
              Free online tools for students, developers, office workers, and everyday tasks.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {tools.map((tool) => (
              <ToolCard key={tool.name} {...tool} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/tools" className="btn-primary">
              View All Tools
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">
              Why Choose <span className="gradient-text">ToolNoveHub</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10">
                  <feature.icon className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">{feature.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}