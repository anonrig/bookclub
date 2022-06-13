/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com', 'books.google.com'],
  },
  productionBrowserSourceMaps: true,
}

module.exports = nextConfig
