// Runs after `vite build` (see package.json "build").
// Writes one HTML file per route with that route's <title>, description, Open Graph,
// Twitter and canonical tags already in place. Social crawlers (LinkedIn, Facebook,
// WhatsApp, Slack) do not run JavaScript, so without this every shared link would show
// the homepage preview. Also regenerates dist/sitemap.xml from the same route list.
// All data comes from src/seo.js.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ALL_ROUTES, LEGACY_ROUTES, SITE_URL, metaFor, pathForPage } from '../src/seo.js';

const DIST = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const template = readFileSync(join(DIST, 'index.html'), 'utf8');

const escapeAttr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Replace the content of one tag; fail loudly if the tag is missing so the build never ships stale meta.
const replaceTag = (html, pattern, value) => {
  if (!pattern.test(html)) throw new Error(`prerender-meta: tag not found in dist/index.html: ${pattern}`);
  return html.replace(pattern, (_, before, after) => `${before}${escapeAttr(value)}${after}`);
};

const render = ({ title, description, url }) => {
  let html = template;
  html = replaceTag(html, /(<title>)[\s\S]*?(<\/title>)/, title);
  html = replaceTag(html, /(<meta name="description" content=")[^"]*(")/, description);
  html = replaceTag(html, /(<meta property="og:title" content=")[^"]*(")/, title);
  html = replaceTag(html, /(<meta property="og:description" content=")[^"]*(")/, description);
  html = replaceTag(html, /(<meta property="og:url" content=")[^"]*(")/, url);
  html = replaceTag(html, /(<meta name="twitter:title" content=")[^"]*(")/, title);
  html = replaceTag(html, /(<meta name="twitter:description" content=")[^"]*(")/, description);
  html = replaceTag(html, /(<link rel="canonical" href=")[^"]*(")/, url);
  return html;
};

const write = (routePath, html) => {
  const file = routePath === '/' ? join(DIST, 'index.html') : join(DIST, routePath, 'index.html');
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
};

let count = 0;
for (const { page, articleId } of ALL_ROUTES) {
  write(pathForPage(page, articleId), render(metaFor(page, articleId)));
  count += 1;
}
// Old WordPress URLs: same preview as the new page, canonical pointing at the new URL
for (const [legacyPath, page] of Object.entries(LEGACY_ROUTES)) {
  write(legacyPath, render(metaFor(page)));
  count += 1;
}

const today = new Date().toISOString().slice(0, 10);
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...ALL_ROUTES.map(({ page, articleId }) => `  <url><loc>${SITE_URL}${pathForPage(page, articleId)}</loc><lastmod>${today}</lastmod></url>`),
  '</urlset>',
  '',
].join('\n');
writeFileSync(join(DIST, 'sitemap.xml'), sitemap);

console.log(`prerender-meta: wrote ${count} route files and sitemap.xml (${ALL_ROUTES.length} URLs)`);
