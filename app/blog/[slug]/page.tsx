import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Clock, BookOpen } from 'lucide-react';

// Sample blog posts data (in a real app, this would come from a CMS or database)
const blogPostsData = {
  '10-free-online-tools-every-developer-needs': {
    title: '10 Free Online Tools Every Developer Needs in 2025',
    date: 'August 18, 2026',
    readTime: '5 min read',
    category: 'Developer',
    content: `
      <p>As a developer, you know that the right tools can make all the difference. Here are 10 free online tools that will save you hours of work in 2025.</p>
      
      <h2>1. QR Code Generator</h2>
      <p>Generate QR codes instantly for any URL or text. Perfect for sharing links, Wi-Fi passwords, and more.</p>
      
      <h2>2. Image Resizer</h2>
      <p>Resize images in bulk with custom dimensions. No more opening Photoshop for simple resizing tasks.</p>
      
      <h2>3. Percentage Calculator</h2>
      <p>Calculate percentages quickly and easily. Great for discounts, tips, and data analysis.</p>
      
      <h2>4. Word Counter</h2>
      <p>Count words, characters, and sentences in any text. Essential for content writing and editing.</p>
      
      <h2>5. JSON Formatter</h2>
      <p>Format, validate, and beautify JSON data. Debug APIs and work with data more efficiently.</p>
      
      <p>All these tools are 100% free, work in your browser, and respect your privacy. No data is ever sent to servers.</p>
    `,
  },
  'how-to-create-qr-code-for-wifi': {
    title: 'How to Create a QR Code for Wi-Fi in 30 Seconds',
    date: 'August 15, 2026',
    readTime: '3 min read',
    category: 'Tutorial',
    content: `
      <p>Sharing your Wi-Fi password with guests is always a hassle. Here's how to create a QR code that lets anyone connect instantly.</p>
      
      <h2>Step 1: Get Your Wi-Fi Details</h2>
      <p>Note down your network name (SSID) and password. Make sure you have the security type (WPA2, WPA3, etc.).</p>
      
      <h2>Step 2: Use the QR Code Generator</h2>
      <p>Go to the QR Code Generator tool and enter your Wi-Fi details in this format:</p>
      <pre>WIFI:T:WPA2;S:MyNetworkName;P:MyPassword;;</pre>
      
      <h2>Step 3: Scan and Connect</h2>
      <p>Your guests can now scan the QR code with their phone's camera and connect instantly. No more typing long passwords!</p>
    `,
  },
  'best-image-resizer-tools-for-social-media': {
    title: 'The Best Image Resizer Tools for Social Media in 2025',
    date: 'August 12, 2026',
    readTime: '4 min read',
    category: 'Design',
    content: `
      <p>Social media platforms have specific image size requirements. Here are the best tools to resize your images for each platform.</p>
      
      <h2>Instagram</h2>
      <p>Square posts: 1080x1080px, Stories: 1080x1920px, Reels: 1080x1920px</p>
      
      <h2>Twitter</h2>
      <p>Profile: 400x400px, Header: 1500x500px, In-feed: 1200x675px</p>
      
      <h2>LinkedIn</h2>
      <p>Profile: 400x400px, Banner: 1584x396px, Post: 1200x627px</p>
      
      <h2>Facebook</h2>
      <p>Profile: 170x170px, Cover: 820x312px, Post: 1200x630px</p>
      
      <p>All these sizes can be easily achieved with a free online image resizer. No software download needed.</p>
    `,
  },
};

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPostsData[params.slug as keyof typeof blogPostsData];

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen py-20 px-4 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-indigo-600 transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>

        <div className="rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 p-8 shadow-xl">
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
            <span className="rounded-full bg-indigo-50 px-3 py-0.5 text-xs font-medium text-indigo-600">
              {post.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {post.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {post.readTime}
            </span>
          </div>

          <h1 className="mt-4 text-3xl font-bold text-slate-900">{post.title}</h1>

          <div className="mt-6 prose prose-slate max-w-none">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200/50">
            <div className="rounded-xl bg-indigo-50/50 p-4 border border-indigo-200/50">
              <div className="flex items-center gap-3">
                <BookOpen className="h-5 w-5 text-indigo-600" />
                <p className="text-sm text-slate-600">
                  <span className="font-semibold">Want more?</span> Check out our other free tools at{' '}
                  <Link href="/" className="text-indigo-600 hover:underline">
                    ToolNoveHub
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}