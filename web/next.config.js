/**
 * @type {import('next').NextConfig}
 */

/**
 * For workbox configurations:
 * https://developer.chrome.com/docs/workbox/reference/workbox-webpack-plugin/
 */
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});

const nextConfig = withPWA({
  reactStrictMode: false,
  images: {
    formats: ['image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ipfs.io',
      },
      {
        protocol: 'https',
        hostname: 'pbs.twimg.com'
      }
    ],
  },
});

module.exports = nextConfig;
