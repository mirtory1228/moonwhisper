import { getAllPosts } from '@/lib/posts';
import { SITE } from '@/lib/site';

export const dynamic = 'force-static';

export function GET() {
  const base = SITE.url.replace(/\/$/, '');
  const host = base.replace(/^https?:\/\//, '');
  const posts = getAllPosts();
  const byCat = {};
  for (const p of posts) (byCat[p.category] ||= []).push(p);
  const order = ['Angel Numbers', 'Dream Dictionary', 'Tarot', 'Zodiac'];
  const cats = [...order.filter((c) => byCat[c]), ...Object.keys(byCat).filter((c) => !order.includes(c))];

  let out = `# ${SITE.name} (${host})\n\n`;
  out += `> ${SITE.description}\n\n`;
  out += `## Free tools\n- [Angel Number Lookup](${base}/angel-numbers): find the meaning of any angel number\n\n`;
  for (const c of cats) {
    out += `## ${c}\n`;
    for (const p of byCat[c]) out += `- [${p.title}](${base}/posts/${p.slug})\n`;
    out += `\n`;
  }
  return new Response(out, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
