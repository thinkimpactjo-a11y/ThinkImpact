import { promises as fs } from 'fs';
import path from 'path';

const SITE_URL =  'http://localhost:3000';

export default {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ['/admin/*'],

  additionalPaths: async (config) => {
    const staticPaths = [
      '/', '/about', '/ourTeam', '/training', '/consulting',
      '/newApplication', '/login', '/register',
    ];

    // Read exported slugs
    const slugsPath = path.resolve(process.cwd(), 'data/slugs.json');
    const slugsData = JSON.parse(await fs.readFile(slugsPath, 'utf-8'));

    const dynamicPaths = [
      ...slugsData.consulting.map(slug => `/consulting/${slug}`),
      ...slugsData.training.map(slug => `/training/${slug}`),
    ];

    const allPaths = [...staticPaths, ...dynamicPaths];

    return Promise.all(allPaths.map(path => config.transform(config, path)));
  },

  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: ['/admin/'] },
    ],
  },
};
