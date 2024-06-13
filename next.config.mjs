/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [{ hostname: "res.cloudinary.com" }],
  },
  env: {
    MONGO_URL: process.env.MONGO_URL,
    AREA_URL: process.env.AREA_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    INVENTORY_ID: process.env.INVENTORY_ID,
    TOTAL_USER_ID: process.env.TOTAL_USER_ID,
  },
};

export default nextConfig;
