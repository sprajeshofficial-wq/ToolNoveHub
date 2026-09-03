/** @type {import('next').NextConfig} */

const isDevelopment = process.env.NODE_ENV === "development";

const contentSecurityPolicy = [
  "default-src 'self'",

  // JavaScript
  `script-src 'self' 'unsafe-inline' ${
    isDevelopment ? "'unsafe-eval' " : ""
  }https://www.googletagmanager.com https://www.google-analytics.com`,

  // CSS
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",

  // Fonts
  "font-src 'self' https://fonts.gstatic.com data:",

  // Images
  "img-src 'self' data: blob: https:",

  // AJAX / fetch / GA4
  "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://www.googletagmanager.com https://stats.g.doubleclick.net https://*.google-analytics.com https://*.googletagmanager.com https://*.doubleclick.net",

  // Frames
  "frame-src 'self' https://www.googletagmanager.com https://www.google.com",

  // Workers
  "worker-src 'self' blob:",

  // Media
  "media-src 'self' blob:",

  // Security
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
].join("; ");

const nextConfig = {
  images: {
    domains: [],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [
      640,
      750,
      828,
      1080,
      1200,
      1920,
      2048,
      3840,
    ],
    imageSizes: [
      16,
      32,
      48,
      64,
      96,
      128,
      256,
      384,
    ],
  },

  compress: true,

  reactStrictMode: true,

  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },

  // Explicitly use Turbopack with Next.js 16
  turbopack: {},

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: contentSecurityPolicy,
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;