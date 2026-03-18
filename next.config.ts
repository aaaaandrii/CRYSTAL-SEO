import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
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
