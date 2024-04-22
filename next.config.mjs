/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
      serverActions: {
          allowedForwardedHosts: ['localhost:*'],
          allowedOrigins: ['localhost:*'],
      },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
