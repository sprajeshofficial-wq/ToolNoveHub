import type { Metadata } from 'next';
import Link from 'next/link';
import WordCounter from './WordCounter';

export const metadata: Metadata = {
  title: 'Free Word Counter - Count Words Online | ToolNoveHub',
  description: 'Free online word counter. Count words, characters, sentences, and paragraphs. Perfect for content writing, SEO, and academic work. No signup required.',
  keywords: 'word counter, count words, character counter, word count, free word counter',
  alternates: { canonical: 'https://toolnovehub.tools/tools/word-counter' },
  openGraph: {
    title: 'Free Word Counter - Count Words Online | ToolNoveHub',
    description: 'Free online word counter. Count words, characters, sentences, and paragraphs.',
    url: 'https://toolnovehub.tools/tools/word-counter',
    type: 'website',
    images: [{ url: 'https://toolnovehub.tools/og-word-counter.jpg', width: 1200, height: 630, alt: 'Word Counter - Free Online Tool' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Word Counter - Count Words Online | ToolNoveHub',
    description: 'Free online word counter. Count words, characters, sentences, and paragraphs.',
    images: ['https://toolnovehub.tools/og-word-counter.jpg'],
  },
};

export default function WordCounterPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Word Counter',
    description: 'Count words, characters, sentences, and paragraphs. Perfect for content writing, SEO, and academic work.',
    applicationCategory: 'Utility',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <div className="min-h-screen py-20 px-4 bg-gradient-to-br from-slate-50 via-white to-rose-50/30">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-slate-900 text-center mb-4">Free Word Counter – Count Words, Characters, and More</h1>
        <p className="text-center text-slate-600 max-w-2xl mx-auto mb-12">Free online word counter. Count words, characters, sentences, and paragraphs. Perfect for content writing, SEO, and academic work.</p>

        <div className="rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 p-6 shadow-xl">
          <WordCounter />
        </div>

        <div className="mt-12 prose prose-slate max-w-none">
          <h2>How to Use the Word Counter</h2>
          <ol>
            <li><strong>Paste or type:</strong> Enter your text in the text area</li>
            <li><strong>Get results instantly:</strong> View word count, character count, and more</li>
            <li><strong>Analyze:</strong> See sentences, paragraphs, and reading time</li>
          </ol>
          <h2>Why Word Counting Matters</h2>
          <ul>
            <li><strong>Content writing:</strong> Meet word count requirements</li>
            <li><strong>SEO:</strong> Optimize content length for search engines</li>
            <li><strong>Academic:</strong> Stay within essay and paper limits</li>
            <li><strong>Social media:</strong> Check character limits</li>
          </ul>
        </div>

        <div className="mt-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 p-6 shadow-xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">FAQ About Word Counters</h2>
          <div className="space-y-4">
            <div><h3 className="font-semibold text-slate-900">What is the difference between words and characters?</h3><p className="text-slate-600">Words are the number of complete words in your text. Characters count every letter, space, and punctuation mark.</p></div>
            <div><h3 className="font-semibold text-slate-900">Does this word counter count spaces?</h3><p className="text-slate-600">Yes, we show both character count with spaces and without spaces.</p></div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Related Tools</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/tools/text-to-slug" className="rounded-xl bg-white p-4 shadow-lg hover:shadow-xl transition-all border border-slate-200/50 text-center hover:border-indigo-200"><span className="text-sm font-medium text-slate-900">Text to Slug</span></Link>
            <Link href="/tools/text-to-ascii" className="rounded-xl bg-white p-4 shadow-lg hover:shadow-xl transition-all border border-slate-200/50 text-center hover:border-indigo-200"><span className="text-sm font-medium text-slate-900">Text to ASCII</span></Link>
            <Link href="/tools/text-repeater" className="rounded-xl bg-white p-4 shadow-lg hover:shadow-xl transition-all border border-slate-200/50 text-center hover:border-indigo-200"><span className="text-sm font-medium text-slate-900">Text Repeater</span></Link>
            <Link href="/tools/percentage-calculator" className="rounded-xl bg-white p-4 shadow-lg hover:shadow-xl transition-all border border-slate-200/50 text-center hover:border-indigo-200"><span className="text-sm font-medium text-slate-900">Percentage Calculator</span></Link>
          </div>
        </div>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      </div>
    </div>
  );
}