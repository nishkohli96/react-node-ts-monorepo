import path from 'node:path';
import type { NextConfig } from 'next';

/* Configure Next.js app */
const nextConfig: NextConfig = {
  /* Don't advertise the framework in an `X-Powered-By` response header. */
  poweredByHeader: false,
  /* Hoisted node_modules live in the monorepo root, which is also Turbopack's root. */
  outputFileTracingRoot: path.join(__dirname, '../../'),
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
