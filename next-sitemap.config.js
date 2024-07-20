/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://www.pkapparel.com',
  changefreq: "weekly",
  priority: 0.7,
  exclude: [
    "/admin",
    "/admin/*",
    "/file-upload",
    "/wholesale-shop/order-placed",
    "/wholesale-shop/order-invoice",
    "/wholesale-shop/orders",
    "/wholesale-shop/manage-account",
    "/wholesale-shop/cart",
    "/wholesale-shop/checkout",
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
        loc: '/wholesale-shop',
        lastmod: new Date().toISOString(),
        changefreq: "weekly",
        priority: 1.0,
      },
      {
        loc: '/wholesale-shop/men/jeans-pant',
        lastmod: new Date().toISOString(),
        changefreq: "weekly",
        priority: 1.0,
      },
      {
        loc: '/wholesale-shop/men/chino-pant',
        lastmod: new Date().toISOString(),
        changefreq: "weekly",
        priority: 0.7,
      },
      {
        loc: '/wholesale-shop/boys/jeans-pant',
        lastmod: new Date().toISOString(),
        changefreq: "weekly",
        priority: 0.7,
      },
      {
        loc: '/wholesale-shop/women/jeans-pant',
        lastmod: new Date().toISOString(),
        changefreq: "weekly",
        priority: 0.7,
      }
    )
    return result;
  }
}