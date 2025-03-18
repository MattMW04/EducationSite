/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
    ],
  },
  async headers() {
    return [
    {
      source: "/api/:path*",
      headers: [
      { key: "Access-Control-Allow-Credentials", value: "true" }, // ✅ Allows cookies
      { key: "Access-Control-Allow-Origin", value: "*" }, // ✅ Allows any origin
      { key: "Access-Control-Allow-Methods", value: "GET, POST, OPTIONS" },
      { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization" },
      ],
    },
    ];
  },
  };
  
  export default nextConfig;

