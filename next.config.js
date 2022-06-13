/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['lh3.googleusercontent.com', 'books.google.com'],
  },
  productionBrowserSourceMaps: true,
}

module.exports = nextConfig
