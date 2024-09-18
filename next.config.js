const { i18n } = require("./next-i18next.config");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n,
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  },
  webpack: config => {
    config.resolve.fallback = { fs: false };
    return config;
  },
  images: {
    domains: ["res.cloudinary.com", "images.ctfassets.net", "media.dev.to"],
  },
};

module.exports = nextConfig;
