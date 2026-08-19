/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
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

  async headers() {
    const isDevelopment = process.env.NODE_ENV === 'development';

    /*
     * unsafe-eval is allowed ONLY during local development.
     *
     * Production does NOT need unsafe-eval unless a specific
     * third-party library requires it.
     */
    const scriptSources = [
      "'self'",

      // Needed for Next.js inline scripts / current setup.
      "'unsafe-inline'",

      ...(isDevelopment ? ["'unsafe-eval'"] : []),

      // Google Analytics / Google Tag Manager
      'https://www.googletagmanager.com',
      'https://www.google-analytics.com',

      // Vercel Analytics / Speed Insights if used
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