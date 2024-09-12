/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sos-backet.s3.ap-southeast-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "s3-alpha-sig.figma.com",
      },
    ],
  },

  crossOrigin: "use-credentials",
};

export default nextConfig;
