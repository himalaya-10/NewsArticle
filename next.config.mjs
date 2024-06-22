/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**' // This pattern will match any domain
      },
    ],
  },
};
export default nextConfig;
