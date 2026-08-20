/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimization
  images: {
    domains: [],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Compression
  compress: true,

  // React optimizations
  reactStrictMode: true,

  // Keep this only if your Next.js version supports it.
  swcMinify: true,

  optimizeFonts: true,

  experimental: {
    scrollRestoration: true,
  },

  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          minSize: 20000,
          maxSize: 244000,
          minChunks: 1,
          maxAsyncRequests: 30,
          maxInitialRequests: 30,

          cacheGroups: {
            defaultVendors: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10,
              reuseExistingChunk: true,
            },

            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
          },
        },
      };
    }

    return config;
  },

  // ========== REDIRECTS FOR OLD/404 URLs ==========
  async redirects() {
    return [
      // === BLOG REDIRECTS ===
      {
        source: '/blog/how-to-calculate-discounts',
        destination: '/blog/percentage-calculator-daily-life',
        permanent: true,
      },
      {
        source: '/blog/how-to-compress-pdf',
        destination: '/blog/file-size-converter-understand-storage',
        permanent: true,
      },
      {
        source: '/blog/how-to-convert-jpg-to-pdf',
        destination: '/blog/best-image-resizer-tools-social-media',
        permanent: true,
      },
      {
        source: '/blog/how-to-convert-word-to-pdf',
        destination: '/blog/best-image-resizer-tools-social-media',
        permanent: true,
      },
      {
        source: '/blog/how-to-use-color-palette-generator',
        destination: '/blog/color-picker-ultimate-guide',
        permanent: true,
      },
      {
        source: '/blog/how-to-use-scientific-calculator',
        destination: '/blog/calculator',
        permanent: true,
      },
      {
        source: '/blog/top-5-tools-for-office-workers',
        destination: '/blog/10-free-online-tools-every-developer-needs',
        permanent: true,
      },
      {
        source: '/blog/top-5-tools-for-students',
        destination: '/blog/10-free-online-tools-every-developer-needs',
        permanent: true,
      },

      // === TOOL REDIRECTS ===
      {
        source: '/tools/base64-encoder',
        destination: '/tools/binary-converter',
        permanent: true,
      },
      {
        source: '/tools/color-palette',
        destination: '/tools/color-picker',
        permanent: true,
      },
      {
        source: '/tools/design',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/tools/developer',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/tools/jpg-to-pdf',
        destination: '/tools/image-resizer',
        permanent: true,
      },
      {
        source: '/tools/pdf-compressor',
        destination: '/tools/file-size-converter',
        permanent: true,
      },
      {
        source: '/tools/pdf-merger',
        destination: '/tools/file-size-converter',
        permanent: true,
      },
    ];
  },

  // ========== CSP HEADERS ==========
  async headers() {
    const isDevelopment = process.env.NODE_ENV === 'development';

    const scriptSources = [
      "'self'",
      "'unsafe-inline'",
      ...(isDevelopment ? ["'unsafe-eval'"] : []),
      'https://www.googletagmanager.com',
      'https://www.google-analytics.com',
      'https://va.vercel-scripts.com',
    ].join(' ');

    const connectSources = [
      "'self'",
      'https://www.google-analytics.com',
      'https://analytics.google.com',
      'https://www.googletagmanager.com',
      'https://va.vercel-scripts.com',
    ].join(' ');

    const contentSecurityPolicy = [
      "default-src 'self'",
      `script-src ${scriptSources}`,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data:",
      `connect-src ${connectSources}`,
      "worker-src 'self' blob:",
      "manifest-src 'self'",
      "media-src 'self' blob:",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
    ].join('; ');

    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: contentSecurityPolicy,
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value:
              'camera=(self), microphone=(), geolocation=(), payment=()',
          },
        ],
      },
    ];
  },
};

export default nextConfig;