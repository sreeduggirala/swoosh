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
  env: {
    // CONTRACT_ADDRESS: "0x46e97fBc46433Be476B9afbfECDE77B9633214e1",
    // ERC20_ADDRESS: "0x6e3333012d5F0b66c61A91d8666f57624C52927E"
    // CONTRACT_ADDRESS: "0x6a9FB2DD43bDea42D332A168F2e8d227D782E2Da",
    // ERC20_ADDRESS: "0xddF708D211E453354FE5BE80EfE3147b3634DDad",
    CONTRACT_ADDRESS: "0xAF36427be959C24CA7181A489a69c3Eb64Bc565C",
    ERC20_ADDRESS: "0xddF708D211E453354FE5BE80EfE3147b3634DDad",
    CLIENT_ID: "17846747f07c8104eea743538da080af",
    HARPIE_API_KEY: "9ce564a5-ba86-44d4-83a5-4ce31943f04c"
  },
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
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
