import type { Metadata } from 'next';
import Link from 'next/link';
import ImageResizer from './ImageResizer';

export const metadata: Metadata = {
  title: 'Free Image Resizer - Resize Images Online | ToolNoveHub',
  description: 'Resize images online for free. Perfect for social media, websites, and printing. No signup, 100% private, browser-based image resizer with custom dimensions.',
  keywords: 'image resizer, resize image online, free image resizer, bulk image resizer, image size converter',
  alternates: { canonical: 'https://toolnovehub.tools/tools/image-resizer' },
  openGraph: {
    title: 'Free Image Resizer - Resize Images Online | ToolNoveHub',
    description: 'Resize images online for free. Perfect for social media, websites, and printing.',
    url: 'https://toolnovehub.tools/tools/image-resizer',
    type: 'website',
    images: [{ url: 'https://toolnovehub.tools/og-image-resizer.jpg', width: 1200, height: 630, alt: 'Image Resizer - Free Online Tool' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Image Resizer - Resize Images Online | ToolNoveHub',
    description: 'Resize images online for free. Perfect for social media, websites, and printing.',
    images: ['https://toolnovehub.tools/og-image-resizer.jpg'],
  },
};

export default function ImageResizerPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Image Resizer',
    description: 'Resize images online for free. Perfect for social media, websites, and printing.',
    applicationCategory: 'Utility',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <div className="min-h-screen py-20 px-4 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-slate-900 text-center mb-4">Free Image Resizer – Resize Images for Any Purpose</h1>
        <p className="text-center text-slate-600 max-w-2xl mx-auto mb-12">Resize images online for free. Perfect for social media, websites, and printing. No signup, 100% private, browser-based.</p>

        <div className="rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 p-6 shadow-xl">
          <ImageResizer />
        </div>

        <div className="mt-12 prose prose-slate max-w-none">
          <h2>How to Use the Image Resizer</h2>
          <ol>
            <li><strong>Upload your image:</strong> Click the upload area to select your image</li>
            <li><strong>Set dimensions:</strong> Enter the desired width and height in pixels</li>
            <li><strong>Resize:</strong> Click the &quot;Resize&quot; button to process your image</li>
            <li><strong>Download:</strong> Save the resized image to your device</li>
          </ol>
          <h2>Popular Image Sizes for Social Media</h2>
          <ul>
            <li><strong>Instagram square:</strong> 1080x1080px</li>
            <li><strong>Instagram stories:</strong> 1080x1920px</li>
            <li><strong>Twitter post:</strong> 1200x675px</li>
            <li><strong>LinkedIn post:</strong> 1200x627px</li>
            <li><strong>Facebook post:</strong> 1200x630px</li>
          </ul>
        </div>

        <div className="mt-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 p-6 shadow-xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">FAQ About Image Resizers</h2>
          <div className="space-y-4">
            <div><h3 className="font-semibold text-slate-900">Does this image resizer reduce quality?</h3><p className="text-slate-600">No, our resizer maintains image quality while adjusting dimensions. We use proper scaling algorithms to preserve clarity.</p></div>
            <div><h3 className="font-semibold text-slate-900">What image formats are supported?</h3><p className="text-slate-600">PNG, JPG, WebP, and most common image formats. The output is available as PNG.</p></div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Related Tools</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/tools/image-cropper" className="rounded-xl bg-white p-4 shadow-lg hover:shadow-xl transition-all border border-slate-200/50 text-center hover:border-indigo-200"><span className="text-sm font-medium text-slate-900">Image Cropper</span></Link>
            <Link href="/tools/color-picker" className="rounded-xl bg-white p-4 shadow-lg hover:shadow-xl transition-all border border-slate-200/50 text-center hover:border-indigo-200"><span className="text-sm font-medium text-slate-900">Color Picker</span></Link>
            <Link href="/tools/percentage-calculator" className="rounded-xl bg-white p-4 shadow-lg hover:shadow-xl transition-all border border-slate-200/50 text-center hover:border-indigo-200"><span className="text-sm font-medium text-slate-900">Percentage Calculator</span></Link>
            <Link href="/tools/word-counter" className="rounded-xl bg-white p-4 shadow-lg hover:shadow-xl transition-all border border-slate-200/50 text-center hover:border-indigo-200"><span className="text-sm font-medium text-slate-900">Word Counter</span></Link>
          </div>
        </div>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      </div>
    </div>
  );
}