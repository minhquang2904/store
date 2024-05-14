/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    MONGO_URL: process.env.MONGO_URL,
  },
};

export default nextConfig;
