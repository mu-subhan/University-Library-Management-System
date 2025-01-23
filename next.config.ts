import type { NextConfig } from "next";
import { hostname } from "os";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns:[
      {
        protocol:"https",
        hostname:"placehold.co",
      },
      {
      protocol:"https",
      hostname:"m.media-amazon.com",
      },
    ],
  }
};

export default nextConfig;
