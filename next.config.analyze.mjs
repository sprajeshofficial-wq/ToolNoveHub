import withBundleAnalyzer from '@next/bundle-analyzer';

const config = {
  images: {
    domains: [],
    formats: ['image/avif', 'image/webp'],
  },
  compress: true,
  swcMinify: true,
  optimizeFonts: true,
};

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})(config);