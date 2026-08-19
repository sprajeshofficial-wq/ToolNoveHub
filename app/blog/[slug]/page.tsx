import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Clock, BookOpen } from 'lucide-react';

// Blog posts data
const blogPostsData: Record<string, { title: string; date: string; readTime: string; category: string; content: string }> = {
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
      
      <p><a href="/tools">Browse all tools →</a></p>
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
      <p>Go to the <a href="/tools/qr-code-generator">QR Code Generator</a> tool and enter your Wi-Fi details in this format:</p>
      <pre>WIFI:T:WPA2;S:MyNetworkName;P:MyPassword;;</pre>
      
      <h2>Step 3: Scan and Connect</h2>
      <p>Your guests can now scan the QR code with their phone's camera and connect instantly. No more typing long passwords!</p>
      
      <p><a href="/tools/qr-code-generator">Try the QR Code Generator →</a></p>
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
      
      <p>All these sizes can be easily achieved with a <a href="/tools/image-resizer">free online image resizer</a>. No software download needed.</p>
    `,
  },
  'percentage-calculator-daily-life': {
    title: 'Percentage Calculator: 5 Ways to Use It in Daily Life',
    date: 'August 10, 2026',
    readTime: '4 min read',
    category: 'Life Hacks',
    content: `
      <p>Percentage calculators aren't just for math class. Here are 5 ways you can use them in your daily life.</p>
      
      <h2>1. Calculating Tips</h2>
      <p>Quickly figure out how much to tip at restaurants. Just enter your bill amount and the percentage you want to tip.</p>
      
      <h2>2. Shopping Discounts</h2>
      <p>Calculate how much you'll save during sales. Enter the original price and discount percentage to see your savings.</p>
      
      <h2>3. Tax Calculations</h2>
      <p>Figure out how much tax you'll pay on purchases. Enter the price and tax rate.</p>
      
      <h2>4. Grade Calculations</h2>
      <p>Students can calculate their grades or percentage scores easily.</p>
      
      <h2>5. Investment Returns</h2>
      <p>Quickly calculate percentage returns on investments or savings.</p>
      
      <p><a href="/tools/percentage-calculator">Try the Percentage Calculator →</a></p>
    `,
  },
  'json-formatter-why-developers-need': {
    title: 'JSON Formatter: Why Every Developer Needs One',
    date: 'August 8, 2026',
    readTime: '4 min read',
    category: 'Developer',
    content: `
      <p>JSON is everywhere in modern development. Here's why you need a good JSON formatter and validator.</p>
      
      <h2>1. Debugging Made Easy</h2>
      <p>Formatting JSON makes it readable, so you can quickly spot errors or missing fields.</p>
      
      <h2>2. API Development</h2>
      <p>When working with APIs, you'll often need to format, validate, or minify JSON data.</p>
      
      <h2>3. Configuration Files</h2>
      <p>Many tools and frameworks use JSON for configuration. Proper formatting helps avoid syntax errors.</p>
      
      <h2>4. Data Export/Import</h2>
      <p>When moving data between systems, properly formatted JSON ensures compatibility.</p>
      
      <p><a href="/tools/json-formatter">Try the JSON Formatter →</a></p>
    `,
  },
};

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPostsData[params.slug];

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
                  <span className="font-semibold">Explore more tools:</span>{' '}
                  <Link href="/" className="text-indigo-600 hover:underline">
                    ToolNoveHub
                  </Link>
                  {' • '}
                  <Link href="/tools" className="text-indigo-600 hover:underline">
                    All Tools
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