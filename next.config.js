const path = require("path");

module.exports = {
  reactStrictMode: true,

  turbopack: {
    root: path.resolve(__dirname),
  },

  allowedDevOrigins: [
    "nextjs-demo.ddev.site",
    "localhost",
    "127.0.0.1",
  ],

  images: {
    unoptimized: true,
  },
};