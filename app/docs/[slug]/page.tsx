import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

const docsData: Record<string, { title: string; content: string }> = {
  'getting-started': {
    title: 'Getting Started',
    content: `
      <h2>Welcome to ToolNoveHub</h2>
      <p>ToolNoveHub provides free online tools that work entirely in your browser.</p>
      
      <h2>How to Use</h2>
      <ol>
        <li>Browse to the tool you need</li>
        <li>Enter your data</li>
        <li>Get results instantly</li>
      </ol>
      
      <h2>Available Tools</h2>
      <ul>
        <li><a href="/tools/qr-code-generator">QR Code Generator</a></li>
        <li><a href="/tools/image-resizer">Image Resizer</a></li>
        <li><a href="/tools/percentage-calculator">Percentage Calculator</a></li>
        <li><a href="/tools/word-counter">Word Counter</a></li>
        <li><a href="/tools/json-formatter">JSON Formatter</a></li>
      </ul>
    `,
  },
  'tool-guides': {
    title: 'Tool Guides',
    content: `
      <h2>QR Code Generator</h2>
      <p>Generate QR codes for any text or URL. Use for Wi-Fi, contact information, links, and more.</p>
      
      <h2>Image Resizer</h2>
      <p>Resize images to any dimensions. Perfect for social media, websites, and printing.</p>
      
      <h2>Percentage Calculator</h2>
      <p>Calculate percentages, increases, and decreases quickly and easily.</p>
      
      <h2>Word Counter</h2>
      <p>Count words, characters, sentences, and paragraphs in any text.</p>
      
      <h2>JSON Formatter</h2>
      <p>Format, validate, and beautify JSON data for better readability and debugging.</p>
    `,
  },
  'faq': {
    title: 'Frequently Asked Questions',
    content: `
      <h2>Are the tools really free?</h2>
      <p>Yes, all tools are 100% free to use with no hidden charges.</p>
      
      <h2>Do I need to create an account?</h2>
      <p>No, you can use all tools without signing up or creating an account.</p>
      
      <h2>Is my data secure?</h2>
      <p>All processing happens in your browser. We never collect, store, or have access to your data.</p>
      
      <h2>Do you have a mobile app?</h2>
      <p>We don't have a mobile app yet, but the website works great on all devices.</p>
      
      <h2>How can I suggest a new tool?</h2>
      <p>Contact us through the <a href="/contact">Contact page</a> with your suggestions.</p>
    `,
  },
  'privacy-security': {
    title: 'Privacy & Security',
    content: `
      <h2>100% Browser-Based</h2>
      <p>All tools process data in your browser. Nothing is uploaded to any server.</p>
      
      <h2>No Data Storage</h2>
      <p>We don't store, collect, or have access to any data you process using our tools.</p>
      
      <h2>No Tracking</h2>
      <p>We use minimal cookies for functionality. No tracking across the web.</p>
      
      <h2>Security Best Practices</h2>
      <p>We follow security best practices to protect your privacy and data.</p>
      
      <p><a href="/privacy">Read our full Privacy Policy →</a></p>
    `,
  },
};

export default function DocsPage({ params }: { params: { slug: string } }) {
  const doc = docsData[params.slug];

  if (!doc) {
    notFound();
  }

  return (
    <div className="min-h-screen py-20 px-4 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/docs"
          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-indigo-600 transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Documentation
        </Link>

        <div className="rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 p-8 shadow-xl">
          <h1 className="text-3xl font-bold text-slate-900">{doc.title}</h1>
          <div className="mt-6 prose prose-slate max-w-none">
            <div dangerouslySetInnerHTML={{ __html: doc.content }} />
          </div>
        </div>
      </div>
    </div>
  );
}