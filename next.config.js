/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  optimizeFonts: true,
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com', 'books.google.com'],
  },
  experimental: {
    runtime: 'experimental-edge',
    images: {
      allowFutureImage: true,
    },
  },
}

module.exports = nextConfig
