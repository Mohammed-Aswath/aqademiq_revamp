import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The iOS app-links file has no extension, so without this Vercel serves it
  // as application/octet-stream and iOS ignores it.
  async headers() {
    return [
      {
        source: "/.well-known/apple-app-site-association",
        headers: [{ key: "Content-Type", value: "application/json" }],
      },
    ];
  },
};

export default nextConfig;
