import type { Metadata } from 'next';
import Link from 'next/link';
import ImageCropper from './ImageCropper';

export const metadata: Metadata = {
  title: 'Free Image Cropper - Crop Images Online | ToolNoveHub',
  description: 'Free online image cropper. Crop images to any aspect ratio. Perfect for social media, websites, and design projects. No signup, 100% private.',
  keywords: 'image cropper, crop image online, free image cropper, aspect ratio, photo cropper, crop photo online, image crop tool, crop image free',
  alternates: {
    canonical: 'https://toolnovehub.tools/tools/image-cropper',
  },
  openGraph: {
    title: 'Free Image Cropper - Crop Images Online | ToolNoveHub',
    description: 'Free online image cropper. Crop images to any aspect ratio.',
    url: 'https://toolnovehub.tools/tools/image-cropper',
    type: 'website',
    images: [{ url: 'https://toolnovehub.tools/og-image-cropper.jpg', width: 1200, height: 630, alt: 'Image Cropper - Free Online Tool' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Image Cropper - Crop Images Online | ToolNoveHub',
    description: 'Free online image cropper. Crop images to any aspect ratio.',
    images: ['https://toolnovehub.tools/og-image-cropper.jpg'],
  },
};

export default function ImageCropperPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Image Cropper',
    description: 'Crop images to any aspect ratio. Perfect for social media, websites, and design projects.',
    applicationCategory: 'Utility',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <div className="min-h-screen py-20 px-4 bg-gradient-to-br from-slate-50 via-white to-sky-50/30">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-slate-900 text-center mb-4">Free Image Cropper – Crop Images to Any Aspect Ratio</h1>
        <p className="text-center text-slate-600 max-w-2xl mx-auto mb-12">Free online image cropper. Crop images to any aspect ratio. Perfect for social media, websites, and design projects.</p>

        <div className="rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 p-6 shadow-xl">
          <ImageCropper />
        </div>

        <div className="mt-12 prose prose-slate max-w-none">
          <h2>How to Use the Image Cropper</h2>
          <ol>
            <li><strong>Upload your image:</strong> Click the upload area to select an image</li>
            <li><strong>Set crop dimensions:</strong> Enter the desired width and height</li>
            <li><strong>Crop:</strong> Click the &quot;Crop&quot; button to crop your image</li>
            <li><strong>Download:</strong> Save the cropped image to your device</li>
          </ol>
          <h2>Popular Aspect Ratios</h2>
          <ul>
            <li><strong>1:1:</strong> Instagram square posts</li>
            <li><strong>16:9:</strong> YouTube thumbnails, widescreen</li>
            <li><strong>4:5:</strong> Instagram portrait posts</li>
            <li><strong>3:2:</strong> Standard photography</li>
          </ul>
        </div>

        <div className="mt-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 p-6 shadow-xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">FAQ About Image Cropper</h2>
          <div className="space-y-4">
            <div><h3 className="font-semibold text-slate-900">What is image cropping?</h3><p className="text-slate-600">Image cropping is the process of removing unwanted areas from an image to improve framing or achieve a specific aspect ratio.</p></div>
            <div><h3 className="font-semibold text-slate-900">What aspect ratios should I use?</h3><p className="text-slate-600">Different platforms have different requirements. Use 1:1 for Instagram posts, 16:9 for YouTube thumbnails, and 4:5 for Instagram portrait posts.</p></div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Related Tools</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/tools/image-resizer" className="rounded-xl bg-white p-4 shadow-lg hover:shadow-xl transition-all border border-slate-200/50 text-center hover:border-indigo-200"><span className="text-sm font-medium text-slate-900">Image Resizer</span></Link>
            <Link href="/tools/color-picker" className="rounded-xl bg-white p-4 shadow-lg hover:shadow-xl transition-all border border-slate-200/50 text-center hover:border-indigo-200"><span className="text-sm font-medium text-slate-900">Color Picker</span></Link>
            <Link href="/tools/qr-code-generator" className="rounded-xl bg-white p-4 shadow-lg hover:shadow-xl transition-all border border-slate-200/50 text-center hover:border-indigo-200"><span className="text-sm font-medium text-slate-900">QR Code Generator</span></Link>
            <Link href="/tools/json-formatter" className="rounded-xl bg-white p-4 shadow-lg hover:shadow-xl transition-all border border-slate-200/50 text-center hover:border-indigo-200"><span className="text-sm font-medium text-slate-900">JSON Formatter</span></Link>
          </div>
        </div>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      </div>
    </div>
  );
}