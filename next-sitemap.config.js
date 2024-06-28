/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://www.pkapparel.com',
    generateRobotsTxt: false,
    changefreq : "weekly",
    exclude: ["/admin/*", "/login", "/signup", "/forgot-password", "/about", "/contact", "/factory", "/blog"]
}