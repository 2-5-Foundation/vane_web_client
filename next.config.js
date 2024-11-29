/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['vane_lib'],
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
