import type { Metadata } from 'next';
import Link from 'next/link';
import FileSizeConverter from './FileSizeConverter';

export const metadata: Metadata = {
  title: 'Free File Size Converter - Convert Bytes to KB, MB, GB | ToolNoveHub',
  description: 'Free online file size converter. Convert between bytes, KB, MB, GB, and TB instantly. Perfect for storage management and data transfer calculations.',
  keywords: 'file size converter, bytes to mb, gb to mb, file size calculator, storage converter, file size calculator online, convert bytes to mb, file storage converter',
  alternates: {
    canonical: 'https://toolnovehub.tools/tools/file-size-converter',
  },
  openGraph: {
    title: 'Free File Size Converter - Convert Bytes to KB, MB, GB | ToolNoveHub',
    description: 'Free online file size converter. Convert between bytes, KB, MB, GB, and TB instantly.',
    url: 'https://toolnovehub.tools/tools/file-size-converter',
    type: 'website',
    images: [{ url: 'https://toolnovehub.tools/og-file-size-converter.jpg', width: 1200, height: 630, alt: 'File Size Converter - Free Online Tool' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free File Size Converter - Convert Bytes to KB, MB, GB | ToolNoveHub',
    description: 'Free online file size converter. Convert between bytes, KB, MB, GB, and TB instantly.',
    images: ['https://toolnovehub.tools/og-file-size-converter.jpg'],
  },
};

export default function FileSizeConverterPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'File Size Converter',
    description: 'Convert between bytes, KB, MB, GB, and TB instantly. Perfect for storage management and data transfer calculations.',
    applicationCategory: 'Utility',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <div className="min-h-screen py-20 px-4 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-slate-900 text-center mb-4">Free File Size Converter – Convert Bytes to KB, MB, GB &amp; More</h1>
        <p className="text-center text-slate-600 max-w-2xl mx-auto mb-12">Free online file size converter. Convert between bytes, KB, MB, GB, and TB instantly. Perfect for storage management and data transfer calculations.</p>

        <div className="rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 p-6 shadow-xl">
          <FileSizeConverter />
        </div>

        <div className="mt-12 prose prose-slate max-w-none">
          <h2>How to Use the File Size Converter</h2>
          <ol>
            <li><strong>Enter a value:</strong> Type the file size number</li>
            <li><strong>Select source unit:</strong> Choose the unit (B, KB, MB, GB, TB)</li>
            <li><strong>Select target unit:</strong> Choose the unit to convert to</li>
            <li><strong>Convert:</strong> Click &quot;Convert&quot; to see the result</li>
          </ol>
          <h2>File Size Units Explained</h2>
          <ul>
            <li><strong>B (Byte):</strong> The smallest unit of digital storage</li>
            <li><strong>KB (Kilobyte):</strong> 1,024 bytes</li>
            <li><strong>MB (Megabyte):</strong> 1,024 KB</li>
            <li><strong>GB (Gigabyte):</strong> 1,024 MB</li>
            <li><strong>TB (Terabyte):</strong> 1,024 GB</li>
          </ul>
        </div>

        <div className="mt-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 p-6 shadow-xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">FAQ About File Size Converter</h2>
          <div className="space-y-4">
            <div><h3 className="font-semibold text-slate-900">How many MB in a GB?</h3><p className="text-slate-600">There are 1,024 MB in a GB (gigabyte).</p></div>
            <div><h3 className="font-semibold text-slate-900">What's the difference between MB and MiB?</h3><p className="text-slate-600">MB uses decimal (1,000) while MiB uses binary (1,024). This tool uses binary (1,024) for storage calculations.</p></div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Related Tools</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/tools/percentage-calculator" className="rounded-xl bg-white p-4 shadow-lg hover:shadow-xl transition-all border border-slate-200/50 text-center hover:border-indigo-200"><span className="text-sm font-medium text-slate-900">Percentage Calculator</span></Link>
            <Link href="/tools/calculator" className="rounded-xl bg-white p-4 shadow-lg hover:shadow-xl transition-all border border-slate-200/50 text-center hover:border-indigo-200"><span className="text-sm font-medium text-slate-900">Calculator</span></Link>
            <Link href="/tools/number-to-words" className="rounded-xl bg-white p-4 shadow-lg hover:shadow-xl transition-all border border-slate-200/50 text-center hover:border-indigo-200"><span className="text-sm font-medium text-slate-900">Number to Words</span></Link>
            <Link href="/tools/word-counter" className="rounded-xl bg-white p-4 shadow-lg hover:shadow-xl transition-all border border-slate-200/50 text-center hover:border-indigo-200"><span className="text-sm font-medium text-slate-900">Word Counter</span></Link>
          </div>
        </div>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      </div>
    </div>
  );
}