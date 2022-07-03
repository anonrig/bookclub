const { withSentryConfig } = require('@sentry/nextjs')

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
  webpack: (config, options) => {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    }
    return config
  },
}

module.exports = withSentryConfig(nextConfig, {
  silent: true,
})
