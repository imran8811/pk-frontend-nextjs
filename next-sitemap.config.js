/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://www.pkapparel.com',
  generateRobotsTxt: false,
  changefreq: "weekly",
  priority: 1.0,
  exclude: [
    "/admin",
    "/admin/*",
    "/login",
    "/signup",
    "/forgot-password",
    "/about",
    "/contact",
    "/factory",
    "/blog",
    "/order-confirmed",
    "/file-upload",
    "/orders",
    "/robots.txt"
  ],
  additionalPaths: async (config) => {
    const result = [];
    result.push(
      {
        loc: '/wholesale-shop/men/jeans-pant',
        lastmod: new Date().toISOString(),
      },
      {
        loc: '/wholesale-shop/men/chino-pant',
        lastmod: new Date().toISOString(),
      },
      {
        loc: '/wholesale-shop/menboys/jeans-pant',
        lastmod: new Date().toISOString(),
      }
    )
    return result;
  }
}