/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: false,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  experimental: {
    images: {
      unoptimized: true,
    },
  },
  images: {
    domains: ["images.unsplash.com"],
  },
}

module.exports = nextConfig
