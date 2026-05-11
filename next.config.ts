import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Allow your ngrok tunnel to access dev resources
  allowedDevOrigins: [
    'paraphrasable-devisable-debbie.ngrok-free.dev'
  ],

  // Required for Cloudflare Pages / OpenNext
  output: 'standalone',
  images: {
    // next/image optimization not supported on CF edge
    unoptimized: true,
  },
  
  // (You can keep the headers() section here if you still need CORS for your API)
}

export default nextConfig