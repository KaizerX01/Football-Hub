/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Disable type checking during build
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["images.unsplash.com"],
  }
};

module.exports = nextConfig;