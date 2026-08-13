// scripts/generate-sitemap.js
//
// Generates public/sitemap.xml from the real route data (projects,
// services, blog) so the sitemap never drifts out of sync with the site.
// Runs automatically before every build via `npm run build`.
// Run manually any time with `npm run sitemap`.

import { writeFileSync, mkdirSync } from 'fs'
import { projects } from '../src/data/projects.js'
import { services } from '../src/data/services.js'
import blog from '../src/data/blog.js'

const SITE_URL = 'https://sagecltd.com'

const staticRoutes = [
  { path: '/',             priority: '1.0', changefreq: 'weekly' },
  { path: '/about',        priority: '0.8', changefreq: 'monthly' },
  { path: '/services',     priority: '0.9', changefreq: 'monthly' },
  { path: '/projects',     priority: '0.9', changefreq: 'weekly' },
  { path: '/testimonials', priority: '0.6', changefreq: 'monthly' },
  { path: '/careers',      priority: '0.6', changefreq: 'monthly' },
  { path: '/blog',         priority: '0.7', changefreq: 'weekly' },
  { path: '/contact',      priority: '0.7', changefreq: 'yearly' },
]

const dynamicRoutes = [
  ...services.map((s) => ({ path: `/services/${s.slug}`, priority: '0.7', changefreq: 'monthly' })),
  ...projects.map((p) => ({ path: `/projects/${p.slug}`, priority: '0.8', changefreq: 'monthly' })),
  ...blog.map((b) => ({ path: `/blog/${b.slug}`, priority: '0.6', changefreq: 'monthly' })),
]

const allRoutes = [...staticRoutes, ...dynamicRoutes]
const today = new Date().toISOString().split('T')[0]

const urlEntries = allRoutes
  .map(
    ({ path, priority, changefreq }) => `  <url>
    <loc>${SITE_URL}${path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  )
  .join('\n')

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`

mkdirSync('public', { recursive: true })
writeFileSync('public/sitemap.xml', xml)
console.log(`✓ sitemap.xml generated with ${allRoutes.length} URLs`)