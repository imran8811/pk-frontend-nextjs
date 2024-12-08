/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://www.pkapparel.com',
  changefreq: "weekly",
  priority: 0.7,
  exclude: [
    "/admin",
    "/admin/*",
    "/file-upload",
    "/order-placed",
    "/order-invoice",
    "/orders",
    "/manage-account",
    "/cart",
    "/checkout",
    "/robots.txt"
  ],
  additionalPaths: async (config) => {
    const result = [];
    result.push(
      {
        loc: '/',
        lastmod: new Date().toISOString(),
        changefreq: "weekly",
        priority: 1.0,
      },
      {
        loc: '/men/jeans-pant',
        lastmod: new Date().toISOString(),
        changefreq: "weekly",
        priority: 1.0,
      },
      {
        loc: '/men/chino-pant',
        lastmod: new Date().toISOString(),
        changefreq: "weekly",
        priority: 0.7,
      },
      {
        loc: '/women/jeans-pant',
        lastmod: new Date().toISOString(),
        changefreq: "weekly",
        priority: 0.7,
      },
      {
        loc: '/boys/jeans-pant',
        lastmod: new Date().toISOString(),
        changefreq: "weekly",
        priority: 0.7,
      },
      {
        loc: '/girls/jeans-pant',
        lastmod: new Date().toISOString(),
        changefreq: "weekly",
        priority: 0.7,
      }
    )
    return result;
  }
}