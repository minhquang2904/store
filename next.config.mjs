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
    TOTAL_ORDER_ID: process.env.TOTAL_ORDER_ID,
    PUSHER_APP_ID: process.env.PUSHER_APP_ID,
    PUSHER_KEY: process.env.PUSHER_KEY,
    PUSHER_SECRET: process.env.PUSHER_SECRET,
    PUSHER_CLUSTER: process.env.PUSHER_CLUSTER,
    NEXT_PUBLIC_PUSHER_KEY: process.env.NEXT_PUBLIC_PUSHER_KEY,
    NEXT_PUBLIC_PUSHER_CLUSTER: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
    LOGIN_INFO_USER: process.env.LOGIN_INFO_USER,
    LOGIN_INFO_ADMIN: process.env.LOGIN_INFO_ADMIN,
    NEXT_PUBLIC_HOST_API_DJANGO: process.env.NEXT_PUBLIC_HOST_API_DJANGO,
  },
};

export default nextConfig;
