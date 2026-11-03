import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Compile fresh on every `next dev` start. With the dev cache on (the
    // default since 16.1), restarts restored stale pages whenever file
    // changes went undetected.
    turbopackFileSystemCacheForDev: false,
  },
};

export default nextConfig;
