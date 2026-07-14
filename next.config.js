/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  ...(process.env.NODE_ENV !== 'production' && {
    turbopack: {
      root: __dirname,
    },
  }),
};

module.exports = nextConfig;
