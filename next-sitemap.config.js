/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  generateRobotsTxt: true,
  changefreq: "daily",
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ["/admin/*"],

  // ✅ Define routes manually until dynamic pages are generated from data
  additionalPaths: async (config) => {
    const staticPaths = [
      "/", // Home page
      "/about", // Example static pages
      "/ourTeam",
      "/training",
      "/consulting",
      "/newApplication",
      "/newApplication",
      "/login",
      "/register",
    ];

    return Promise.all(
      staticPaths.map(async (path) => {
        return await config.transform(config, path);
      })
    );
  },

  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "*", disallow: ["/admin/"] },
    ],
  },
};
