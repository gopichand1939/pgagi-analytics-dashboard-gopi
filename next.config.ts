/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'logo.clearbit.com',
        pathname: '/**',
      },
      // Allow localhost for development
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/api/image-proxy',
      },
      // Add your production domain here, e.g., your-app-domain.com
      // {
      //   protocol: 'https',
      //   hostname: 'your-app-domain.com',
      //   pathname: '/api/image-proxy',
      // },
    ],
  },
};

module.exports = nextConfig;