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
    ],
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
