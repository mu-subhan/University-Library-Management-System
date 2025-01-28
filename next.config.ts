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
      port:"",
      },
      {
        protocol:"https",
        hostname:"ik.imagekit.io",
        port: "",
      }
    ],
  },
  typescript:{
    ignoreBuildErrors:true,
  },
  eslint:{
    ignoreDuringBuilds:true,
  }
};

export default nextConfig;
