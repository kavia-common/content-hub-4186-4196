import type { APIRoute } from 'astro';
import { listPosts } from '../lib/api';
import { PUBLIC_SITE_NAME, PUBLIC_SITE_DESCRIPTION, PUBLIC_SITE_URL } from '../lib/env';

/**
 * PUBLIC_INTERFACE
 * Generates an RSS 2.0 feed using posts from backend.
 */
export const GET: APIRoute = async () => {
  const rs = await listPosts({ page: 1, limit: 50 });
  const items = rs.ok && rs.data ? rs.data.items : [];

  const itemsXml = items
    .map(
      (p) => `
  <item>
    <title><![CDATA[${p.title}]]></title>
    <link>${PUBLIC_SITE_URL}/posts/${p.slug}</link>
    <guid>${PUBLIC_SITE_URL}/posts/${p.slug}</guid>
    ${p.summary ? `<description><![CDATA[${p.summary}]]></description>` : ''}
    ${p.publishedAt ? `<pubDate>${new Date(p.publishedAt).toUTCString()}</pubDate>` : ''}
  </item>`
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
  <title><![CDATA[${PUBLIC_SITE_NAME}]]></title>
  <link>${PUBLIC_SITE_URL}</link>
  <description><![CDATA[${PUBLIC_SITE_DESCRIPTION}]]></description>
  ${itemsXml}
</channel>
</rss>`.trim();

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 's-maxage=300, stale-while-revalidate=600',
    },
  });
};
