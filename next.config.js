/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
        port: "",
        pathname: "/images/I/41C-012Es8L._SY445_SX342_.jpg",
      },
    ],
  },
};

module.exports = nextConfig;
