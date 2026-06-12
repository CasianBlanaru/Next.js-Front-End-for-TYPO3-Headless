const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  process.env.NEXT_PUBLIC_HOSTNAME ||
  "https://pwa-demo.ddev.site/headless";

const siteUrl =
  process.env.NEXT_PUBLIC_BASE_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://pwa-demo.ddev.site";

function toRemotePattern(value) {
  const parsedUrl = new URL(value.replace(/\/$/, "") + "/");

  return {
    protocol: parsedUrl.protocol.replace(":", ""),
    hostname: parsedUrl.hostname,
  };
}

const remotePatterns = [
  toRemotePattern(apiBaseUrl),
  toRemotePattern(siteUrl),
];

module.exports = {
  reactStrictMode: true,

  typescript: {
    ignoreBuildErrors: false,
  },

  turbopack: {
    root: '.',
  },

  images: {
    unoptimized: true,

    remotePatterns: remotePatterns.filter(
      (pattern, index, self) =>
        self.findIndex(
          (item) =>
            item.hostname === pattern.hostname &&
            item.protocol === pattern.protocol
        ) === index
    ),
  },
};