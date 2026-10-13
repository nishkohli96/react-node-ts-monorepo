import type { NextConfig } from 'next';

/* Configure Next.js app */
const nextConfig: NextConfig = {
  /* Don't advertise the framework in an `X-Powered-By` response header. */
  poweredByHeader: false,
  outputFileTracingRoot: __dirname,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.icons8.com'
      }
    ]
  },
};

export default nextConfig;
