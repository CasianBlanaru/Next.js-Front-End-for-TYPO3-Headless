/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(process.env.NODE_ENV !== 'production' && {
    turbopack: {
      root: __dirname,
    },
  }),
};

module.exports = nextConfig;
