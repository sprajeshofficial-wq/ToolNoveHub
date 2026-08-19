import type { Metadata } from 'next';
import Link from 'next/link';
import TextToASCII from './TextToASCII';

export const metadata: Metadata = {
  title: 'Free Text to ASCII Art Converter - Create ASCII Art Online | ToolNoveHub',
  description: 'Free online text to ASCII art converter. Convert any text to beautiful ASCII art. Perfect for social media, emails, and creative projects.',
  keywords: 'text to ascii, ascii art generator, text to ascii art, ascii converter, ascii creator',
  alternates: { canonical: 'https://toolnovehub.tools/tools/text-to-ascii' },
  openGraph: {
    title: 'Free Text to ASCII Art Converter - Create ASCII Art Online | ToolNoveHub',
    description: 'Free online text to ASCII art converter. Convert any text to beautiful ASCII art.',
    url: 'https://toolnovehub.tools/tools/text-to-ascii',
    type: 'website',
    images: [{ url: 'https://toolnovehub.tools/og-text-to-ascii.jpg', width: 1200, height: 630, alt: 'Text to ASCII Art - Free Online Tool' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Text to ASCII Art Converter - Create ASCII Art Online | ToolNoveHub',
    description: 'Free online text to ASCII art converter. Convert any text to beautiful ASCII art.',
    images: ['https://toolnovehub.tools/og-text-to-ascii.jpg'],
  },
};

export default function TextToASCIIPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Text to ASCII Art Converter',
    description: 'Convert any text to beautiful ASCII art. Perfect for social media, emails, and creative projects.',
    applicationCategory: 'Utility',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <div className="min-h-screen py-20 px-4 bg-gradient-to-br from-slate-50 via-white to-gray-50/30">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-slate-900 text-center mb-4">Free Text to ASCII Art Converter – Create Beautiful ASCII Art</h1>
        <p className="text-center text-slate-600 max-w-2xl mx-auto mb-12">Free online text to ASCII art converter. Convert any text to beautiful ASCII art. Perfect for social media, emails, and creative projects.</p>

        <div className="rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 p-6 shadow-xl">
          <TextToASCII />
        </div>

        <div className="mt-12 prose prose-slate max-w-none">
          <h2>How to Use the Text to ASCII Converter</h2>
          <ol>
            <li><strong>Enter your text:</strong> Type the text you want to convert</li>
            <li><strong>Choose style:</strong> Select Standard, Big, or Small font</li>
            <li><strong>Generate:</strong> Click &quot;Generate ASCII Art&quot;</li>
            <li><strong>Copy:</strong> Copy the ASCII art for use in your project</li>
          </ol>
          <h2>Where to Use ASCII Art</h2>
          <ul>
            <li><strong>Email signatures:</strong> Make your emails stand out</li>
            <li><strong>Social media:</strong> Add creative flair to bios and posts</li>
            <li><strong>Creative projects:</strong> Use in art and design projects</li>
          </ul>
        </div>

        <div className="mt-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 p-6 shadow-xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">FAQ About ASCII Art</h2>
          <div className="space-y-4">
            <div><h3 className="font-semibold text-slate-900">What is ASCII art?</h3><p className="text-slate-600">ASCII art is a graphic design technique that uses printable characters from the ASCII standard to create images and text art.</p></div>
            <div><h3 className="font-semibold text-slate-900">Is this tool free?</h3><p className="text-slate-600">Yes, completely free. No signup or payment required.</p></div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Related Tools</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/tools/word-counter" className="rounded-xl bg-white p-4 shadow-lg hover:shadow-xl transition-all border border-slate-200/50 text-center hover:border-indigo-200"><span className="text-sm font-medium text-slate-900">Word Counter</span></Link>
            <Link href="/tools/text-to-slug" className="rounded-xl bg-white p-4 shadow-lg hover:shadow-xl transition-all border border-slate-200/50 text-center hover:border-indigo-200"><span className="text-sm font-medium text-slate-900">Text to Slug</span></Link>
            <Link href="/tools/text-repeater" className="rounded-xl bg-white p-4 shadow-lg hover:shadow-xl transition-all border border-slate-200/50 text-center hover:border-indigo-200"><span className="text-sm font-medium text-slate-900">Text Repeater</span></Link>
            <Link href="/tools/percentage-calculator" className="rounded-xl bg-white p-4 shadow-lg hover:shadow-xl transition-all border border-slate-200/50 text-center hover:border-indigo-200"><span className="text-sm font-medium text-slate-900">Percentage Calculator</span></Link>
          </div>
        </div>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      </div>
    </div>
  );
}