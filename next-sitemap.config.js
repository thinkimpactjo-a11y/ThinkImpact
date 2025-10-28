/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://thinkimpactjo.com",
  generateRobotsTxt: true, // Generate robots.txt automatically
  changefreq: "daily", // How often pages are likely to change
  priority: 0.7, // Default priority for all pages
  sitemapSize: 5000, // Max number of URLs per sitemap file
  exclude: ["/admin/dashboard", "/admin/login", "/admin/register"],
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "*", disallow: ["/admin/"] },
    ],
  },
};
