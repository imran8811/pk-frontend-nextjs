/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: '/jeans-manufacturing-cost',
        destination: '/post/jeans-manufacturing-cost',
        statusCode: 301,
      },
      {
        source: '/bulk-jeans',
        destination: '/post/bulk-jeans',
        statusCode: 301,
      },
      {
        source: '/jeans-manufacturers',
        destination: '/post/jeans-manufacturers',
        statusCode: 301,
      },
      {
        source: '/jeans-pants-manufacturers',
        destination: '/post/jeans-pants-manufacturers',
        statusCode: 301,
      },
      {
        source: '/jeans-wholesale',
        destination: '/post/jeans-wholesale',
        statusCode: 301,
      },
      {
        source: '/motorcycle-jeans-manufacturers',
        destination: '/post/motorcycle-jeans-manufacturers',
        statusCode: 301,
      },
      {
        source: '/wholesale-denim-jeans-suppliers',
        destination: '/post/wholesale-denim-jeans-suppliers',
        statusCode: 301,
      },
      {
        source: '/wholesale-jeans-bulk',
        destination: '/post/wholesale-jeans-bulk',
        statusCode: 301,
      },
      {
        source: '/wholesale-jeans-manufacturers',
        destination: '/post/wholesale-jeans-manufacturers',
        statusCode: 301,
      },
      {
        source: '/wholesale-jeans-suppliers',
        destination: '/post/wholesale-jeans-suppliers',
        statusCode: 301,
      },
      {
        source: '/wholesale-women-jeans',
        destination: '/post/wholesale-women-jeans',
        statusCode: 301,
      },
    ]
  },
};

export default nextConfig;
