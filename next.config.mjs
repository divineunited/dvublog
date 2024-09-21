const loadSecrets = require('./loadSecrets');

async function getConfig() {
  await loadSecrets();

  /** @type {import('next').NextConfig} */
  const nextConfig = {
    images: {
      domains: ['storage.googleapis.com'],
    },
    env: {
      MONGODB_URI: process.env.MONGODB_URI,
      JWT_SECRET: process.env.JWT_SECRET,
    },
  };

  return nextConfig;
}

module.exports = getConfig();
