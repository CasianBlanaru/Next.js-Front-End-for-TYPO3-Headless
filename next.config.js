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
    'web-production-e607a.up.railway.app',
  ],
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'http', hostname: '**' },
      { protocol: 'https', hostname: '**' },
    ],
  },
};

module.exports = nextConfig;
