// サイトマップ（外部パッケージに依存せず自前で生成する）
import { SITE, CATEGORIES } from '../data/site';

const mods = import.meta.glob('./articles/*.md', { eager: true }) as Record<string, any>;

export const GET = () => {
  const urls: { loc: string; lastmod?: string }[] = [
    { loc: '/' },
    { loc: '/about' },
    { loc: '/about-ads' },
    { loc: '/privacy' },
    { loc: '/disclaimer' },
    { loc: '/contact' },
    ...Object.values(CATEGORIES).map((c) => ({ loc: `/category/${c.slug}` })),
    ...Object.values(mods)
      .filter((m: any) => !m.frontmatter?.draft)
      .map((m: any) => ({
        loc: new URL(m.url, SITE.url).pathname,
        lastmod: m.frontmatter?.updated ?? m.frontmatter?.date,
      })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) =>
      `  <url><loc>${new URL(u.loc, SITE.url).href}</loc>${
        u.lastmod ? `<lastmod>${new Date(u.lastmod).toISOString().slice(0, 10)}</lastmod>` : ''
      }</url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
