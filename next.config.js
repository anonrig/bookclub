/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com', 'books.google.com'],
  },
  experimental: {
    runtime: 'experimental-edge',
  },
}

module.exports = nextConfig
