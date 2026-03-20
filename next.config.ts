import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  serverExternalPackages: ['better-sqlite3'],
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  async redirects() {
    return [
      // Old site URL redirects (preserve SEO equity from 5dmemorycrystal.com)
      { source: '/events', destination: '/news', permanent: true },
      { source: '/events/:path*', destination: '/news', permanent: true },
      { source: '/contacts', destination: '/contact', permanent: true },
      { source: '/page-1', destination: '/order', permanent: true },
      // Legacy blog redirects
      { source: '/blog', destination: '/news', permanent: true },
      { source: '/blog/:slug', destination: '/news/:slug', permanent: true },
    ];
  },
};

export default nextConfig;
