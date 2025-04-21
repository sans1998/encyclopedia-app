/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['raw.githubusercontent.com', 'digi-api.com'],
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig; 