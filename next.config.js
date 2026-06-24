const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: path.resolve(__dirname),
  },
  allowedDevOrigins: [
    'localhost',
    '127.0.0.1',
    'typo3-inst.localhost',
    'api.typo3-inst.localhost',
    'web-production-581b4.up.railway.app',
  ],
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'http', hostname: '**' },
      { protocol: 'https', hostname: '**' },
    ],
  },
  async rewrites() {
    const typo3Url = process.env.NEXT_PUBLIC_TYPO3_BASE_URL || 'https://api.typo3-inst.localhost';
    return [
      {
        source: '/typo3/:path*',
        destination: `${typo3Url.replace(/\/$/, '')}/typo3/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
