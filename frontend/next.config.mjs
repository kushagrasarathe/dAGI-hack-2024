/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avataaars.io",
        port: "",
      },
    ],
  },
};

export default nextConfig;
