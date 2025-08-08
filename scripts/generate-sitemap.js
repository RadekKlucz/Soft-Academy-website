// scripts/generate-sitemap.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseUrl = 'https://softacademy.com.pl';

const pages = [
  '/',
  '/booking',
  '/concact'
];

const urls = pages.map(p => {
  return `<url>
    <loc>${baseUrl}${p}</loc>
    <changefreq>weekly</changefreq>
    <priority>${p === '/' ? '1.0' : '0.8'}</priority>
  </url>`;
}).join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

const sitemapPath = path.join(__dirname, '../client/public/sitemap.xml');
fs.writeFileSync(sitemapPath, xml);

console.log(`✅ Sitemap was generated: ${sitemapPath}`);
