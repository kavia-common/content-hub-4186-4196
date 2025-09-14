import type { APIRoute } from 'astro';
import { listPosts } from '../lib/api';
import { PUBLIC_SITE_URL } from '../lib/env';

/**
 * PUBLIC_INTERFACE
 * Builds a minimal sitemap index for the site with post URLs and some static routes.
 */
export const GET: APIRoute = async () => {
  const rs = await listPosts({ page: 1, limit: 200 });
  const items = rs.ok && rs.data ? rs.data.items : [];

  const urls = [
    '/',
    '/search',
    '/categories',
    '/tags',
    ...items.map((p) => `/posts/${p.slug}`),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${PUBLIC_SITE_URL}${u}</loc>
  </url>`
  )
  .join('\n')}
</urlset>`.trim();

  return new Response(xml, {
    status: 200,
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
