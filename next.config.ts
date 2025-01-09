import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,

  images: {
    domains: [],
  },

  // Configure webpack for Monday.com
  webpack: (config, { isServer }) => {
    // Handle browser-specific modules
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },

  // Optional: Add rewrites if needed
  async rewrites() {
    return [];
  },

  // Ensure proper handling of API routes
  // ... existing code ...
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,POST,PUT,DELETE,OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ],
      },
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "connect-src 'self'",
              "https://*.monday.com",
              "https://monday.com",
              "https://unpkg.com",
              "wss://webpack.llama.fan:*",
              "https://webpack.llama.fan:*",
              "https://grsm.io",
              "https://forms.hsforms.com",
              "https://*.algolia.net",
              "https://*.algolianet.com",
              "https://bat.bing.com",
              "https://*.braze.com",
              "https://cookiehub.net",
            ].join(" "),
          },
        ],
      },
    ];
  },
  // ... existing code ...
};

export default config;
