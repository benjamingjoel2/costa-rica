import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    // Photography is served from Unsplash; the download endpoint redirects once to images.unsplash.com.
    remotePatterns: [
      { protocol: "https", hostname: "unsplash.com", pathname: "/photos/**" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
