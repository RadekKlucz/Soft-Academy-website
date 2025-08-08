import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pages = [
  '', // strona główna
  'booking',
  'contact'
];

const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(page => {
    return `  <url>
    <loc>https://softacademy.com.pl/${page}</loc>
    <changefreq>monthly</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`;
  })
  .join('\n')}
</urlset>`;

const distPath = path.join(__dirname, '../dist');
if (!fs.existsSync(distPath)) {
  fs.mkdirSync(distPath);
}

fs.writeFileSync(path.join(distPath, 'sitemap.xml'), sitemapContent);

console.log('✅ Sitemap was generated and saved to dist/sitemap.xml');
