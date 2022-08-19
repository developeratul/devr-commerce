/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["cdn.chec.io"],
  },
};

module.exports = nextConfig;
