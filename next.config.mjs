/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
      serverActions: {
          allowedForwardedHosts: ['localhost:3000'],
          allowedOrigins: ['localhost:3000'],
      },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
