const { i18n } = require("./next-i18next.config");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n,
  webpack: config => {
    config.resolve.fallback = { fs: false };
    return config;
  },
};

module.exports = nextConfig;
