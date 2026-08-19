import type { Metadata } from 'next';
import Link from 'next/link';
import TextToSlug from './TextToSlug';

export const metadata: Metadata = {
  title: 'Free Text to Slug Converter - Create SEO-Friendly URLs | ToolNoveHub',
  description: 'Free online text to slug converter. Create SEO-friendly URLs instantly. Perfect for bloggers, developers, and content creators. No signup required.',
  keywords: 'text to slug, slug converter, seo friendly url, url slug generator, slugify text',
  alternates: { canonical: 'https://toolnovehub.tools/tools/text-to-slug' },
  openGraph: {
    title: 'Free Text to Slug Converter - Create SEO-Friendly URLs | ToolNoveHub',
    description: 'Free online text to slug converter. Create SEO-friendly URLs instantly.',
    url: 'https://toolnovehub.tools/tools/text-to-slug',
    type: 'website',
    images: [{ url: 'https://toolnovehub.tools/og-text-to-slug.jpg', width: 1200, height: 630, alt: 'Text to Slug Converter - Free Online Tool' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Text to Slug Converter - Create SEO-Friendly URLs | ToolNoveHub',
    description: 'Free online text to slug converter. Create SEO-friendly URLs instantly.',
    images: ['https://toolnovehub.tools/og-text-to-slug.jpg'],
  },
};

export default function TextToSlugPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Text to Slug Converter',
    description: 'Create SEO-friendly URLs instantly. Perfect for bloggers, developers, and content creators.',
    applicationCategory: 'Utility',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <div className="min-h-screen py-20 px-4 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-slate-900 text-center mb-4">Free Text to Slug Converter – Create SEO-Friendly URLs</h1>
        <p className="text-center text-slate-600 max-w-2xl mx-auto mb-12">Free online text to slug converter. Create SEO-friendly URLs instantly. Perfect for bloggers, developers, and content creators.</p>

        <div className="rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 p-6 shadow-xl">
          <TextToSlug />
        </div>

        <div className="mt-12 prose prose-slate max-w-none">
          <h2>How to Use the Text to Slug Converter</h2>
          <ol>
            <li><strong>Enter your text:</strong> Type or paste the text you want to convert</li>
            <li><strong>Generate:</strong> Click &quot;Generate Slug&quot; or press Enter</li>
            <li><strong>Copy:</strong> Copy the generated slug for use in your URL</li>
          </ol>
          <h2>What is a Slug in URLs?</h2>
          <p>A slug is the part of a URL that identifies a specific page. For example, in <code>example.com/blog/my-awesome-post</code>, <code>my-awesome-post</code> is the slug.</p>
          <h2>Best Practices for URL Slugs</h2>
          <ul>
            <li>Keep it short and descriptive</li>
            <li>Use hyphens, not underscores</li>
            <li>Include target keywords</li>
            <li>Avoid special characters and spaces</li>
          </ul>
        </div>

        <div className="mt-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 p-6 shadow-xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">FAQ About URL Slugs</h2>
          <div className="space-y-4">
            <div><h3 className="font-semibold text-slate-900">Why are slugs important for SEO?</h3><p className="text-slate-600">Slugs help search engines understand page content. Keywords in slugs can improve search rankings and click-through rates.</p></div>
            <div><h3 className="font-semibold text-slate-900">What makes a good slug?</h3><p className="text-slate-600">A good slug is short, descriptive, includes relevant keywords, and uses hyphens instead of spaces or underscores.</p></div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Related Tools</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/tools/word-counter" className="rounded-xl bg-white p-4 shadow-lg hover:shadow-xl transition-all border border-slate-200/50 text-center hover:border-indigo-200"><span className="text-sm font-medium text-slate-900">Word Counter</span></Link>
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