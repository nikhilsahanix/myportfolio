import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Required for Cloudflare Pages / OpenNext
  output: 'standalone',
  images: {
    // next/image optimization not supported on CF edge
    unoptimized: true,
  },
}

export default nextConfig
