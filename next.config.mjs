/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    MONGO_URL: process.env.MONGO_URL,
    AREA_URL: process.env.AREA_URL,
  },
};

export default nextConfig;
