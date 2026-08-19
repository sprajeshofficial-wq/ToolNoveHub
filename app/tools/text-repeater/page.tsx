import type { Metadata } from 'next';
import Link from 'next/link';
import TextRepeater from './TextRepeater';

export const metadata: Metadata = {
  title: 'Free Text Repeater - Repeat Text Online | ToolNoveHub',
  description: 'Free online text repeater tool. Repeat text multiple times with custom separators. Perfect for content generation and creative projects.',
  keywords: 'text repeater, repeat text, text generator, content generator, text multiplier',
  alternates: { canonical: 'https://toolnovehub.tools/tools/text-repeater' },
  openGraph: {
    title: 'Free Text Repeater - Repeat Text Online | ToolNoveHub',
    description: 'Free online text repeater tool. Repeat text multiple times with custom separators.',
    url: 'https://toolnovehub.tools/tools/text-repeater',
    type: 'website',
    images: [{ url: 'https://toolnovehub.tools/og-text-repeater.jpg', width: 1200, height: 630, alt: 'Text Repeater - Free Online Tool' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Text Repeater - Repeat Text Online | ToolNoveHub',
    description: 'Free online text repeater tool. Repeat text multiple times with custom separators.',
    images: ['https://toolnovehub.tools/og-text-repeater.jpg'],
  },
};

export default function TextRepeaterPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Text Repeater',
    description: 'Repeat text multiple times with custom separators. Perfect for content generation and creative projects.',
    applicationCategory: 'Utility',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <div className="min-h-screen py-20 px-4 bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-slate-900 text-center mb-4">Free Text Repeater – Repeat Text Multiple Times</h1>
        <p className="text-center text-slate-600 max-w-2xl mx-auto mb-12">Free online text repeater tool. Repeat text multiple times with custom separators. Perfect for content generation and creative projects.</p>

        <div className="rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 p-6 shadow-xl">
          <TextRepeater />
        </div>

        <div className="mt-12 prose prose-slate max-w-none">
          <h2>How to Use the Text Repeater</h2>
          <ol>
            <li><strong>Enter your text:</strong> Type or paste the text you want to repeat</li>
            <li><strong>Set repetition count:</strong> Choose how many times to repeat the text</li>
            <li><strong>Select separator:</strong> Choose between new line, comma, or space</li>
            <li><strong>Generate and copy:</strong> Click &quot;Repeat Text&quot; and copy the result</li>
          </ol>
          <h2>Use Cases for Text Repeater</h2>
          <ul>
            <li><strong>Content generation:</strong> Create repeating content for testing</li>
            <li><strong>Creative projects:</strong> Generate patterns or text art</li>
            <li><strong>Testing:</strong> Generate long text for layout testing</li>
          </ul>
        </div>

        <div className="mt-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 p-6 shadow-xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">FAQ About Text Repeater</h2>
          <div className="space-y-4">
            <div><h3 className="font-semibold text-slate-900">What is a text repeater?</h3><p className="text-slate-600">A text repeater tool takes your input text and repeats it a specified number of times with optional separators.</p></div>
            <div><h3 className="font-semibold text-slate-900">Is this tool free?</h3><p className="text-slate-600">Yes, completely free. No signup or payment required.</p></div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Related Tools</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/tools/word-counter" className="rounded-xl bg-white p-4 shadow-lg hover:shadow-xl transition-all border border-slate-200/50 text-center hover:border-indigo-200"><span className="text-sm font-medium text-slate-900">Word Counter</span></Link>
            <Link href="/tools/text-to-slug" className="rounded-xl bg-white p-4 shadow-lg hover:shadow-xl transition-all border border-slate-200/50 text-center hover:border-indigo-200"><span className="text-sm font-medium text-slate-900">Text to Slug</span></Link>
            <Link href="/tools/text-to-ascii" className="rounded-xl bg-white p-4 shadow-lg hover:shadow-xl transition-all border border-slate-200/50 text-center hover:border-indigo-200"><span className="text-sm font-medium text-slate-900">Text to ASCII</span></Link>
            <Link href="/tools/percentage-calculator" className="rounded-xl bg-white p-4 shadow-lg hover:shadow-xl transition-all border border-slate-200/50 text-center hover:border-indigo-200"><span className="text-sm font-medium text-slate-900">Percentage Calculator</span></Link>
          </div>
        </div>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      </div>
    </div>
  );
}