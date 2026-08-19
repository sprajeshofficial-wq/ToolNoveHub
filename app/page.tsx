import Link from "next/link";
import { QrCode, Image, Calculator, FileText, Code } from "lucide-react";

export default function Home() {
  const tools = [
    {
      name: "QR Code Generator",
      description: "Create custom QR codes for URLs, text, Wi-Fi, email, and phone numbers.",
      category: "Office",
      icon: QrCode,
      href: "/tools/office/qr-code-generator",
    },
    {
      name: "Image Resizer",
      description: "Resize JPG, PNG, and WebP images with aspect ratio lock and format selection.",
      category: "Office",
      icon: Image,
      href: "/tools/office/image-resizer",
    },
    {
      name: "Percentage Calculator",
      description: "Calculate percentages, increases, decreases, and differences with step-by-step formulas.",
      category: "Student",
      icon: Calculator,
      href: "/tools/student/percentage-calculator",
    },
    {
      name: "Word Counter",
      description: "Count words, characters, sentences, and paragraphs with real-time reading time.",
      category: "Student",
      icon: FileText,
      href: "/tools/student/word-counter",
    },
    {
      name: "JSON Formatter",
      description: "Format, validate, pretty-print, and minify JSON with clear error messages.",
      category: "Developer",
      icon: Code,
      href: "/tools/developer/json-formatter",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 md:py-24 text-center">
          <div className="mx-auto max-w-4xl space-y-6 md:space-y-8">
            
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-xs font-semibold border border-blue-200">
              ✨ Free tools for developers, students & professionals
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900">
              Free Online Tools for{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Everyday Use
              </span>
            </h1>
            
            <p className="mx-auto max-w-2xl text-lg md:text-xl text-gray-600 px-4">
              <span className="font-semibold text-blue-600">
                Practical tools that keep your data on your device.
              </span>
              <br />
              <span className="text-sm sm:text-base text-gray-500">
                QR Codes • Image Resizer • Percentage Calculator • Word Counter • JSON Formatter
              </span>
            </p>

            {/* Privacy Promise Badge */}
            <p className="mx-auto max-w-2xl text-md font-semibold text-green-600 bg-green-50 px-4 py-2 rounded-full inline-block">
              🔒 Browser-based processing — your files stay on your device.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mx-auto sm:max-w-none px-4 sm:px-0">
              <a href="#tools" className="w-full sm:w-auto min-w-[200px] rounded-full bg-blue-600 px-6 sm:px-8 py-3 text-base font-semibold text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-700 hover:scale-105 text-center">
                Explore Tools
              </a>
            </div>
          </div>
        </section>

        {/* Stats Banner */}
        <section className="container mx-auto px-4 pb-12">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 py-8 md:py-10 px-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center max-w-3xl mx-auto">
              <div>
                <p className="text-3xl font-bold text-blue-600">5</p>
                <p className="text-sm text-gray-600">Powerful Tools</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-blue-600">100%</p>
                <p className="text-sm text-gray-600">Browser-Based</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-blue-600">0</p>
                <p className="text-sm text-gray-600">Server Uploads</p>
              </div>
            </div>
          </div>
        </section>

        {/* Tools Section */}
        <section id="tools" className="container mx-auto px-4 pb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Popular Tools
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <Link key={tool.name} href={tool.href} className="block group">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow hover:border-blue-300 h-full">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                      <tool.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {tool.name}
                        </h3>
                        <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                          {tool.category}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{tool.description}</p>
                      <span className="inline-block mt-3 text-sm font-medium text-blue-600 group-hover:underline">
                        Open Tool →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Why Choose Section */}
        <section className="container mx-auto px-4 pb-16">
          <div className="bg-blue-50 rounded-xl p-8 text-center border border-blue-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Why Choose ToolNoveHub?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div>
                <div className="text-3xl mb-2">🔒</div>
                <h3 className="font-semibold">Privacy First</h3>
                <p className="text-sm text-gray-600">Everything processed locally in your browser</p>
              </div>
              <div>
                <div className="text-3xl mb-2">⚡</div>
                <h3 className="font-semibold">Fast & Light</h3>
                <p className="text-sm text-gray-600">Optimized for speed and Core Web Vitals</p>
              </div>
              <div>
                <div className="text-3xl mb-2">📱</div>
                <h3 className="font-semibold">Mobile Friendly</h3>
                <p className="text-sm text-gray-600">Works perfectly on all devices</p>
              </div>
            </div>
          </div>
        </section>

        {/* Privacy Badge */}
        <section className="container mx-auto px-4 pb-16">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium border border-green-200">
              🔒 100% Private. No server uploads. Your data stays on your device.
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="border-t bg-white py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Column 1: Brand */}
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 text-xl font-bold text-blue-600 mb-4">
                <span>ToolNoveHub</span>
              </div>
              <p className="text-sm text-gray-600 max-w-xs">
                Free online tools for everyday use. Privacy-first, no account required.
                Everything runs in your browser.
              </p>
            </div>

            {/* Column 2: Tools */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Tools</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/tools/office/qr-code-generator" className="text-gray-600 hover:text-blue-600 transition">QR Code Generator</Link></li>
                <li><Link href="/tools/office/image-resizer" className="text-gray-600 hover:text-blue-600 transition">Image Resizer</Link></li>
                <li><Link href="/tools/student/percentage-calculator" className="text-gray-600 hover:text-blue-600 transition">Percentage Calculator</Link></li>
                <li><Link href="/tools/student/word-counter" className="text-gray-600 hover:text-blue-600 transition">Word Counter</Link></li>
                <li><Link href="/tools/developer/json-formatter" className="text-gray-600 hover:text-blue-600 transition">JSON Formatter</Link></li>
              </ul>
            </div>

            {/* Column 3: Categories */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/tools/student" className="text-gray-600 hover:text-blue-600 transition">Student Tools</Link></li>
                <li><Link href="/tools/developer" className="text-gray-600 hover:text-blue-600 transition">Developer Tools</Link></li>
                <li><Link href="/tools/office" className="text-gray-600 hover:text-blue-600 transition">Office Tools</Link></li>
              </ul>
            </div>

            {/* Column 4: Legal */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/privacy" className="text-gray-600 hover:text-blue-600 transition">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-gray-600 hover:text-blue-600 transition">Terms of Service</Link></li>
                <li><Link href="/contact" className="text-gray-600 hover:text-blue-600 transition">Contact</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} ToolNoveHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}