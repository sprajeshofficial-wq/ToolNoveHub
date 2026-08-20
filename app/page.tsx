'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
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
  Calculator,
  Palette,
  Scan,
  Type,
  Code
} from 'lucide-react';
import ToolCard from '@/app/components/ToolCard';

// Types
interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

// Sparkle Particle Component
const SparkleParticle = ({ x, y, size, delay, duration }: { x: number; y: number; size: number; delay: number; duration: number }) => {
  const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#f472b6', '#14b8a6'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        animation: `sparkle-float ${duration}s ease-out ${delay}s forwards`,
        opacity: 0,
      }}
    >
      <div 
        className="w-full h-full rounded-full"
        style={{
          backgroundColor: color,
          boxShadow: `0 0 ${size * 2}px ${color}, 0 0 ${size * 4}px ${color}`,
          transform: 'scale(0)',
          animation: `sparkle-pop ${duration * 0.3}s ease-out ${delay}s forwards`,
        }}
      />
    </div>
  );
};

export default function Home() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const logoRef = useRef<HTMLDivElement>(null);
  const sparkleIdRef = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const triggerSparkles = (event: React.MouseEvent | React.TouchEvent) => {
    const rect = logoRef.current?.getBoundingClientRect();
    if (!rect) return;

    let clientX: number, clientY: number;
    if ('touches' in event) {
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
    } else {
      clientX = event.clientX;
      clientY = event.clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const newSparkles: Sparkle[] = [];
    const count = 15 + Math.floor(Math.random() * 10);
    
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = 30 + Math.random() * 120;
      const offsetX = Math.cos(angle) * distance;
      const offsetY = Math.sin(angle) * distance;
      
      newSparkles.push({
        id: sparkleIdRef.current++,
        x: x + offsetX,
        y: y + offsetY,
        size: 4 + Math.random() * 8,
        delay: Math.random() * 0.3,
        duration: 0.8 + Math.random() * 0.6,
      });
    }

    setSparkles(prev => [...prev, ...newSparkles]);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setSparkles(prev => prev.filter(s => s.id > sparkleIdRef.current - 50));
    }, 2000);
  };

  // Auto-trigger on first visit
  useEffect(() => {
    const timer = setTimeout(() => {
      if (logoRef.current) {
        const rect = logoRef.current.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const newSparkles: Sparkle[] = [];
        for (let i = 0; i < 30; i++) {
          const angle = Math.random() * Math.PI * 2;
          const distance = 20 + Math.random() * 100;
          newSparkles.push({
            id: sparkleIdRef.current++,
            x: centerX + Math.cos(angle) * distance,
            y: centerY + Math.sin(angle) * distance,
            size: 3 + Math.random() * 6,
            delay: i * 0.05,
            duration: 0.8 + Math.random() * 0.4,
          });
        }
        setSparkles(prev => [...prev, ...newSparkles]);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          setSparkles(prev => prev.filter(s => s.id > sparkleIdRef.current - 50));
        }, 2000);
      }
    }, 500);

    return () => {
      clearTimeout(timer);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Add CSS animations to head
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes sparkle-pop {
        0% { transform: scale(0) rotate(0deg); opacity: 1; }
        50% { transform: scale(1.5) rotate(180deg); opacity: 1; }
        100% { transform: scale(0) rotate(360deg); opacity: 0; }
      }
      @keyframes sparkle-float {
        0% { transform: translate(0, 0) scale(1); opacity: 1; }
        100% { transform: translate(var(--tx), var(--ty)) scale(0); opacity: 0; }
      }
      .sparkle-logo {
        position: relative;
        cursor: pointer;
        transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      }
      .sparkle-logo:hover {
        transform: scale(1.05);
      }
      .sparkle-logo:active {
        transform: scale(0.95);
      }
      .sparkle-container {
        position: relative;
        display: inline-block;
      }
    `;
    document.head.appendChild(style);
    return () => {
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    };
  }, []);

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
      <style jsx global>{`
        @keyframes sparkle-pop {
          0% { transform: scale(0) rotate(0deg); opacity: 1; }
          50% { transform: scale(1.5) rotate(180deg); opacity: 1; }
          100% { transform: scale(0) rotate(360deg); opacity: 0; }
        }
        @keyframes sparkle-float {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(var(--tx), var(--ty)) scale(0); opacity: 0; }
        }
        .sparkle-logo {
          position: relative;
          cursor: pointer;
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .sparkle-logo:hover {
          transform: scale(1.05);
        }
        .sparkle-logo:active {
          transform: scale(0.95);
        }
        .sparkle-container {
          position: relative;
          display: inline-block;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 px-4">
        {/* Background Effects */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 -z-10 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-indigo-500/10 to-purple-500/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 -z-10 h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-pink-500/10 to-orange-500/10 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl text-center">
          {/* Logo - CENTERED */}
          <div className="flex justify-center">
            <div 
              ref={logoRef}
              className="sparkle-container relative inline-block"
              onMouseEnter={triggerSparkles}
              onClick={triggerSparkles}
              onTouchStart={triggerSparkles}
            >
              <div className="sparkle-logo relative h-24 w-24 overflow-hidden rounded-2xl shadow-2xl shadow-indigo-500/20 transition-all duration-500">
                <Image
                  src="/logo.png"
                  alt="ToolNoveHub - Free Online Tools"
                  fill
                  className="object-contain"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-purple-500/10 to-pink-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>

              {/* Sparkles */}
              {sparkles.map((p) => {
                const tx = (Math.random() - 0.5) * 200;
                const ty = (Math.random() - 0.5) * 200 - 50;
                return (
                  <div
                    key={p.id}
                    className="absolute pointer-events-none"
                    style={{
                      left: p.x,
                      top: p.y,
                      width: p.size,
                      height: p.size,
                      animation: `sparkle-float ${p.duration}s ease-out ${p.delay}s forwards`,
                      opacity: 0,
                      '--tx': `${tx}px`,
                      '--ty': `${ty}px`,
                    } as React.CSSProperties}
                  >
                    <div 
                      className="w-full h-full rounded-full"
                      style={{
                        background: `radial-gradient(circle, ${['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#f472b6', '#14b8a6'][Math.floor(Math.random() * 8)]} 0%, transparent 70%)`,
                        boxShadow: `0 0 ${p.size * 3}px ${['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#f472b6', '#14b8a6'][Math.floor(Math.random() * 8)]}`,
                        transform: 'scale(0)',
                        animation: `sparkle-pop ${p.duration * 0.4}s ease-out ${p.delay}s forwards`,
                      }}
                    />
                  </div>
                );
              })}

              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-slate-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100 whitespace-nowrap">
                ✨ Click for magic!
              </div>
            </div>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-1.5 text-sm text-indigo-600 border border-indigo-200/50 mt-12">
            <Sparkles className="h-4 w-4 animate-pulse" />
            <span>✨ 100% Free Online Tools — No Signup Required</span>
          </div>

          {/* Heading */}
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
            <Link href="/tools" className="btn-primary">  // ← CORRECT (goes to all tools)
              Browse All Free Tools
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link href="/tools/qr-code-generator" className="btn-secondary bg-white text-slate-900 hover:bg-slate-50 shadow-lg border border-slate-200">
              Try QR Code Generator
            </Link>
          </div>

          {/* Feature Stats */}
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

      {/* Tool Categories */}
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

      {/* Tools Grid */}
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
              View All 16 Free Tools
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

     {/* Feature Cards - Alternative with onClick */}
<section className="py-20 px-4 bg-slate-50/50">
  <div className="mx-auto max-w-7xl">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold text-slate-900">
        Why Choose <span className="gradient-text">ToolNoveHub</span>
      </h2>
      <p className="mt-3 text-lg text-slate-600 max-w-2xl mx-auto">
        Simple, fast, private tools designed for everyday tasks.
      </p>
    </div>

    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
      {/* 100% Free */}
      <div
        onClick={() => window.location.href = '/tools'}
        className="group text-center p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer"
      >
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 group-hover:from-indigo-500/20 group-hover:to-purple-500/20 transition-colors">
          <Zap className="h-7 w-7 text-indigo-600 group-hover:scale-110 transition-transform" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
          100% Free
        </h3>
        <p className="mt-2 text-sm text-slate-600">
          All tools are completely free with no hidden charges, subscriptions, or paywalls.
        </p>
        <span className="mt-3 inline-block text-sm font-medium text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
          Browse all tools →
        </span>
      </div>

      {/* Privacy First */}
      <div
        onClick={() => window.location.href = '/privacy'}
        className="group text-center p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer"
      >
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 group-hover:from-indigo-500/20 group-hover:to-purple-500/20 transition-colors">
          <Shield className="h-7 w-7 text-indigo-600 group-hover:scale-110 transition-transform" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
          Privacy First
        </h3>
        <p className="mt-2 text-sm text-slate-600">
          Everything processes in your browser. No data is ever uploaded to any server.
        </p>
        <span className="mt-3 inline-block text-sm font-medium text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
          Learn more →
        </span>
      </div>

      {/* Fast & Reliable */}
      <div
        onClick={() => window.location.href = '/tools'}
        className="group text-center p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer"
      >
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 group-hover:from-indigo-500/20 group-hover:to-purple-500/20 transition-colors">
          <Clock className="h-7 w-7 text-indigo-600 group-hover:scale-110 transition-transform" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
          Fast & Reliable
        </h3>
        <p className="mt-2 text-sm text-slate-600">
          Optimized for speed with instant results. No waiting, no loading delays.
        </p>
        <span className="mt-3 inline-block text-sm font-medium text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
          Try a tool →
        </span>
      </div>

      {/* Works Everywhere */}
      <div
        onClick={() => window.location.href = '/tools'}
        className="group text-center p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer"
      >
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 group-hover:from-indigo-500/20 group-hover:to-purple-500/20 transition-colors">
          <Smartphone className="h-7 w-7 text-indigo-600 group-hover:scale-110 transition-transform" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
          Works Everywhere
        </h3>
        <p className="mt-2 text-sm text-slate-600">
          Use on any device — desktop, tablet, or phone. No app download needed.
        </p>
        <span className="mt-3 inline-block text-sm font-medium text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
          Explore →
        </span>
      </div>
    </div>
  </div>
</section>

{/* Newsletter Section */}
<section className="py-16 px-4 bg-slate-50/50 border-y border-slate-200/50">
  <div className="mx-auto max-w-2xl text-center">
    <h2 className="text-3xl font-bold text-slate-900">
      Stay <span className="gradient-text">Updated</span>
    </h2>
    <p className="mt-3 text-lg text-slate-600">
      Get notified when we add new tools.
    </p>
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const email = (e.target as HTMLFormElement).email.value;
        if (email) {
          window.location.href = `mailto:support@toolnovehub.tools?subject=Newsletter%20Subscription&body=Please%20add%20me%20to%20your%20newsletter%20list.%20My%20email%20is%20${encodeURIComponent(email)}`;
          (e.target as HTMLFormElement).reset();
          alert('📧 Thank you! Please check your email client to complete the subscription.');
        }
      }}
      className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
    >
      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        className="flex-1 rounded-lg border border-slate-200 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
        required
      />
      <button
        type="submit"
        className="rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:scale-105 whitespace-nowrap"
      >
        Subscribe
      </button>
    </form>
    <p className="mt-3 text-xs text-slate-400">
      No spam. Unsubscribe anytime. We'll email you about new tools.
    </p>
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
            <Link href="/" className="rounded-full bg-white/20 px-8 py-3 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/30 hover:scale-105">
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}