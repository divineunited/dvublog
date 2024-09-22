/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['storage.googleapis.com'],
  },
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET,
  },
  serverRuntimeConfig: {
    MONGODB_URI: process.env.MONGODB_URI,
  },
  publicRuntimeConfig: {
    MONGODB_URI: process.env.MONGODB_URI,
  },
};

export default nextConfig;
