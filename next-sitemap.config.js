/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_APP_URL || 'https://yourwebsite.com',
  generateRobotsTxt: true, // (optional) generate robots.txt
  changefreq: 'daily',      // default change frequency
  priority: 0.7,            // default priority
  sitemapSize: 5000,        // number of URLs per sitemap file
  exclude: ['/admin/dashboard', '/admin/login','/admin/register'], // exclude admin pages if needed
};
