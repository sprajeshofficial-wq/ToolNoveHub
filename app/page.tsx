"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
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
  Code,
} from "lucide-react";
import ToolCard from "@/app/components/ToolCard";

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  tx: number;
  ty: number;
  color: string;
}

const SPARKLE_COLORS = [
  "#6366f1",
  "#8b5cf6",
  "#ec4899",
  "#f59e0b",
  "#10b981",
  "#3b82f6",
  "#f472b6",
  "#14b8a6",
];

function createSparkles(
  centerX: number,
  centerY: number,
  count: number,
  idRef: React.MutableRefObject<number>
): Sparkle[] {
  return Array.from({ length: count }, (_, index) => {
    const angle = Math.random() * Math.PI * 2;
    const distance = 20 + Math.random() * 100;

    return {
      id: idRef.current++,
      x: centerX + Math.cos(angle) * distance,
      y: centerY + Math.sin(angle) * distance,
      size: 3 + Math.random() * 6,
      delay: index * 0.05,
      duration: 0.8 + Math.random() * 0.4,
      tx: (Math.random() - 0.5) * 200,
      ty: (Math.random() - 0.5) * 200 - 50,
      color:
        SPARKLE_COLORS[
          Math.floor(Math.random() * SPARKLE_COLORS.length)
        ],
    };
  });
}

export default function Home() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [email, setEmail] = useState("");

  const logoRef = useRef<HTMLDivElement>(null);
  const sparkleIdRef = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const triggerSparkles = (
    event: React.MouseEvent | React.TouchEvent
  ) => {
    const rect = logoRef.current?.getBoundingClientRect();

    if (!rect) return;

    let clientX = rect.width / 2;
    let clientY = rect.height / 2;

    if ("touches" in event && event.touches.length > 0) {
      clientX = event.touches[0].clientX - rect.left;
      clientY = event.touches[0].clientY - rect.top;
    } else if ("clientX" in event) {
      clientX = event.clientX - rect.left;
      clientY = event.clientY - rect.top;
    }

    const newSparkles = createSparkles(
      clientX,
      clientY,
      20,
      sparkleIdRef
    );

    setSparkles((prev) => [...prev, ...newSparkles]);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setSparkles((prev) => prev.slice(-50));
    }, 2000);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!logoRef.current) return;

      const rect = logoRef.current.getBoundingClientRect();

      const newSparkles = createSparkles(
        rect.width / 2,
        rect.height / 2,
        30,
        sparkleIdRef
      );

      setSparkles(newSparkles);

      timeoutRef.current = setTimeout(() => {
        setSparkles((prev) => prev.slice(-50));
      }, 2000);
    }, 500);

    return () => {
      clearTimeout(timer);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const tools = [
    {
      name: "QR Code Generator",
      description:
        "Generate QR codes instantly for any URL, text, or Wi-Fi network.",
      icon: QrCode,
      href: "/tools/qr-code-generator",
      color: "from-emerald-500 to-teal-500",
    },
    {
      name: "Image Resizer",
      description:
        "Resize images in bulk with custom dimensions for social media.",
      icon: ImageIcon,
      href: "/tools/image-resizer",
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "Percentage Calculator",
      description:
        "Calculate percentages, tips, discounts, and tax quickly.",
      icon: Percent,
      href: "/tools/percentage-calculator",
      color: "from-amber-500 to-orange-500",
    },
    {
      name: "Word Counter",
      description:
        "Count words, characters, sentences, and paragraphs in any text.",
      icon: AlignLeft,
      href: "/tools/word-counter",
      color: "from-rose-500 to-pink-500",
    },
    {
      name: "JSON Formatter",
      description:
        "Format, validate, and beautify JSON data for debugging.",
      icon: Braces,
      href: "/tools/json-formatter",
      color: "from-violet-500 to-purple-500",
    },
  ];

  const features = [
    {
      icon: Zap,
      title: "100% Free",
      description:
        "All tools are completely free with no hidden charges, subscriptions, or paywalls.",
      href: "/tools",
    },
    {
      icon: Shield,
      title: "Privacy First",
      description:
        "Everything processes in your browser. No data is uploaded to our servers for these browser-based tools.",
      href: "/privacy",
    },
    {
      icon: Clock,
      title: "Fast & Reliable",
      description:
        "Optimized for speed with instant results. No unnecessary waiting.",
      href: "/tools",
    },
    {
      icon: Smartphone,
      title: "Works Everywhere",
      description:
        "Use ToolNoveHub on desktop, tablet, or mobile without installing an app.",
      href: "/tools",
    },
  ];

  const toolCategories = [
    {
      name: "QR Code Tools",
      icon: Scan,
      description: "Generate and scan QR codes",
      href: "/tools/qr-code-generator",
      color: "from-emerald-500 to-teal-500",
    },
    {
      name: "Image Tools",
      icon: ImageIcon,
      description: "Resize, crop, and edit images",
      href: "/tools/image-resizer",
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "Text Tools",
      icon: Type,
      description: "Count words, convert text, and more",
      href: "/tools/word-counter",
      color: "from-rose-500 to-pink-500",
    },
    {
      name: "Calculator Tools",
      icon: Calculator,
      description: "Calculate percentages and convert numbers",
      href: "/tools/percentage-calculator",
      color: "from-amber-500 to-orange-500",
    },
    {
      name: "Developer Tools",
      icon: Code,
      description: "Format JSON, convert binary, and validate data",
      href: "/tools/json-formatter",
      color: "from-violet-500 to-purple-500",
    },
    {
      name: "Design Tools",
      icon: Palette,
      description: "Pick colors, crop images, and resize photos",
      href: "/tools/color-picker",
      color: "from-purple-500 to-pink-500",
    },
  ];

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) return;

    const subject = encodeURIComponent(
      "ToolNoveHub Newsletter Subscription"
    );

    const body = encodeURIComponent(
      `Please add me to the ToolNoveHub newsletter.\n\nMy email address is: ${email.trim()}`
    );

    window.location.href = `mailto:support@toolnovehub.tools?subject=${subject}&body=${body}`;

    setEmail("");
  };

  return (
    <main className="min-h-screen">
      {/* Page animations */}
      <style jsx global>{`
        @keyframes sparkle-pop {
          0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
          }

          50% {
            transform: scale(1.5) rotate(180deg);
            opacity: 1;
          }

          100% {
            transform: scale(0) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes sparkle-float {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }

          100% {
            transform: translate(var(--tx), var(--ty)) scale(0);
            opacity: 0;
          }
        }

        .sparkle-logo {
          position: relative;
          cursor: pointer;
          transition:
            transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
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
      <section
        aria-labelledby="home-heading"
        className="relative overflow-hidden px-4 pb-20 pt-32"
      >
        <div
          className="absolute inset-0 -z-10"
          aria-hidden="true"
        >
          <div className="absolute right-0 top-0 -z-10 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-indigo-500/10 to-purple-500/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 -z-10 h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-pink-500/10 to-orange-500/10 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl text-center">
          {/* Logo */}
          <div className="flex justify-center">
            <div
              ref={logoRef}
              className="sparkle-container relative inline-block"
              onMouseEnter={triggerSparkles}
              onClick={triggerSparkles}
              onTouchStart={triggerSparkles}
              role="img"
              aria-label="ToolNoveHub logo"
            >
              <div className="sparkle-logo relative h-24 w-24 overflow-hidden rounded-2xl shadow-2xl shadow-indigo-500/20">
                <Image
                  src="/logo.png"
                  alt="ToolNoveHub free online tools"
                  fill
                  priority
                  sizes="96px"
                  className="object-contain"
                />
              </div>

              {sparkles.map((sparkle) => (
                <div
                  key={sparkle.id}
                  className="pointer-events-none absolute"
                  style={
                    {
                      left: sparkle.x,
                      top: sparkle.y,
                      width: sparkle.size,
                      height: sparkle.size,
                      "--tx": `${sparkle.tx}px`,
                      "--ty": `${sparkle.ty}px`,
                      animation: `sparkle-float ${sparkle.duration}s ease-out ${sparkle.delay}s forwards`,
                    } as React.CSSProperties
                  }
                  aria-hidden="true"
                >
                  <div
                    className="h-full w-full rounded-full"
                    style={{
                      background: `radial-gradient(circle, ${sparkle.color} 0%, transparent 70%)`,
                      boxShadow: `0 0 ${
                        sparkle.size * 3
                      }px ${sparkle.color}`,
                      animation: `sparkle-pop ${
                        sparkle.duration * 0.4
                      }s ease-out ${sparkle.delay}s forwards`,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Badge */}
          <div className="mt-12 inline-flex items-center gap-2 rounded-full border border-indigo-200/50 bg-indigo-50 px-4 py-1.5 text-sm text-indigo-600">
            <Sparkles
              className="h-4 w-4 animate-pulse"
              aria-hidden="true"
            />
            <span>100% Free Online Tools — No Signup Required</span>
          </div>

          {/* Main Heading */}
          <h1
            id="home-heading"
            className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            <span className="text-slate-900">
              Free Online Tools –
            </span>
            <br />
            <span className="gradient-text">
              QR, Image, JSON, Text &amp; Calculators
            </span>
          </h1>

          {/* Introduction */}
          <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-600 sm:text-xl">
            <strong>100% free online tools</strong> for developers,
            students, office workers, and everyday tasks. Generate{" "}
            <strong>QR codes</strong>, resize <strong>images</strong>,
            format <strong>JSON</strong>, calculate{" "}
            <strong>percentages</strong>, count <strong>words</strong>,
            and more.
            <span className="mt-2 block font-medium text-indigo-600">
              🔒 No signup. No unnecessary data upload. Browser-based tools.
            </span>
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/tools" className="btn-primary">
              Browse All Free Tools
              <ArrowRight
                className="ml-2 h-4 w-4"
                aria-hidden="true"
              />
            </Link>

            <Link
              href="/tools/qr-code-generator"
              className="btn-secondary border border-slate-200 bg-white text-slate-900 shadow-lg hover:bg-slate-50"
            >
              Try QR Code Generator
            </Link>
          </div>

          {/* Feature Navigation */}
          <div className="mt-12 flex flex-wrap justify-center gap-8">
            {features.map((feature) => {
              const FeatureIcon = feature.icon;

              return (
                <Link
                  key={feature.title}
                  href={feature.href}
                  className="group flex items-center gap-2 text-sm text-slate-600 transition-colors hover:text-indigo-600"
                >
                  <FeatureIcon
                    className="h-4 w-4 text-indigo-500 transition-transform group-hover:scale-110"
                    aria-hidden="true"
                  />
                  <span className="font-medium">
                    {feature.title}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tool Categories */}
      <section
        aria-labelledby="categories-heading"
        className="border-y border-slate-200/50 bg-slate-50/50 px-4 py-16"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 text-center">
            <h2
              id="categories-heading"
              className="text-2xl font-bold text-slate-900"
            >
              Browse Free Online Tools by Category
            </h2>

            <p className="mt-2 text-slate-600">
              Explore useful tools for QR codes, images, text,
              calculations, development, and design.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
            {toolCategories.map((category) => {
              const Icon = category.icon;

              return (
                <Link
                  key={category.name}
                  href={category.href}
                  className="group rounded-xl border border-slate-200/50 bg-white p-4 text-center shadow-sm transition-all hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg"
                >
                  <div
                    className={`inline-flex rounded-lg bg-gradient-to-r ${category.color} p-3 shadow-lg transition-transform group-hover:scale-110`}
                  >
                    <Icon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>

                  <h3 className="mt-2 text-sm font-semibold text-slate-900 transition-colors group-hover:text-indigo-600">
                    {category.name}
                  </h3>

                  <p className="mt-0.5 text-xs text-slate-500">
                    {category.description}
                  </p>

                  <span className="mt-2 inline-block text-xs font-medium text-indigo-600 opacity-0 transition-opacity group-hover:opacity-100">
                    Explore →
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular Tools */}
      <section
        aria-labelledby="popular-tools-heading"
        className="px-4 py-20"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2
              id="popular-tools-heading"
              className="text-3xl font-bold text-slate-900"
            >
              Popular{" "}
              <span className="gradient-text">Free Online Tools</span>
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-lg text-slate-600">
              Try some of our most useful online tools. ToolNoveHub
              tools are designed to be simple, fast, and easy to use.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {tools.map((tool) => (
              <ToolCard key={tool.name} {...tool} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/tools" className="btn-primary">
              View All 20 Free Tools
              <ArrowRight
                className="ml-2 h-4 w-4"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* Why ToolNoveHub */}
      <section
        aria-labelledby="why-heading"
        className="bg-slate-50/50 px-4 py-20"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2
              id="why-heading"
              className="text-3xl font-bold text-slate-900"
            >
              Why Choose{" "}
              <span className="gradient-text">ToolNoveHub?</span>
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-lg text-slate-600">
              Simple, fast, privacy-focused online tools for everyday
              tasks.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const FeatureIcon = feature.icon;

              return (
                <Link
                  key={feature.title}
                  href={feature.href}
                  className="group rounded-2xl bg-white p-6 text-center shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 transition-colors group-hover:from-indigo-500/20 group-hover:to-purple-500/20">
                    <FeatureIcon
                      className="h-7 w-7 text-indigo-600 transition-transform group-hover:scale-110"
                      aria-hidden="true"
                    />
                  </div>

                  <h3 className="text-lg font-semibold text-slate-900 transition-colors group-hover:text-indigo-600">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-sm text-slate-600">
                    {feature.description}
                  </p>

                  <span className="mt-3 inline-block text-sm font-medium text-indigo-600">
                    Learn more →
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section
        aria-labelledby="newsletter-heading"
        className="border-y border-slate-200/50 bg-white px-4 py-16"
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="newsletter-heading"
            className="text-3xl font-bold text-slate-900"
          >
            Stay <span className="gradient-text">Updated</span>
          </h2>

          <p className="mt-3 text-lg text-slate-600">
            Get notified when we add new tools and useful features.
          </p>

          <form
            onSubmit={handleSubscribe}
            className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>

            <input
              id="newsletter-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              required
            />

            <button
              type="submit"
              className="whitespace-nowrap rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:scale-105"
            >
              Subscribe
            </button>
          </form>

          <p className="mt-3 text-xs text-slate-400">
            No spam. You can unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section
        aria-labelledby="final-cta-heading"
        className="bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-16"
      >
        <div className="mx-auto max-w-4xl text-center text-white">
          <h2
            id="final-cta-heading"
            className="text-3xl font-bold"
          >
            Ready to Get Things Done?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
            Use ToolNoveHub for free online tools that help with QR
            codes, images, text, calculations, JSON, and more.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/tools"
              className="rounded-full bg-white px-8 py-3 font-semibold text-indigo-600 shadow-lg transition-all hover:scale-105 hover:shadow-xl"
            >
              Browse All Tools
            </Link>

            <Link
              href="/about"
              className="rounded-full bg-white/20 px-8 py-3 font-semibold text-white backdrop-blur-sm transition-all hover:scale-105 hover:bg-white/30"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}