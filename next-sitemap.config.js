/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://www.pkapparel.com',
    generateRobotsTxt: false,
    changefreq : "weekly"
}