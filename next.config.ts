import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: '/profissional/inbox',
        destination: '/',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;

