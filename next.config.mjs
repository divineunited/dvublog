/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: '',
        pathname: '/dvunitedblog-images/**',
      },
      {
        protocol: 'https',
        hostname: 'carrotghost.net',
        port: '',
        pathname: '/**',
      },
    ],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    GCS_BUCKET_NAME: "dvunitedblog-images",
    GCS_PROJECT_ID: "dvunitedblogs",
  },
  serverRuntimeConfig: {
    MONGODB_URI: process.env.MONGODB_URI,
  },
  publicRuntimeConfig: {
    MONGODB_URI: process.env.MONGODB_URI,
  },
};

export default nextConfig;
