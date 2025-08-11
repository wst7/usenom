import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
  experimental: {
    nodeMiddleware: true, // Enable Node.js middleware
  },
};

export default nextConfig;
