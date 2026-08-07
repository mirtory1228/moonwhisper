import { getAllPosts } from '@/lib/posts';
import { SITE } from '@/lib/site';

export default function sitemap() {
  const base = SITE.url.replace(/\/$/, '');
  const staticPages = ['', '/angel-numbers', '/tarot', '/dream-dictionary', '/about', '/privacy', '/contact'].map((p) => ({
    url: `${base}${p}`,
    changeFrequency: 'weekly',
    priority: p === '' ? 1 : (p === '/angel-numbers' || p === '/tarot' || p === '/dream-dictionary') ? 0.9 : 0.5,
  }));
  const postPages = getAllPosts().map((post) => ({
    url: `${base}/posts/${post.slug}`,
    lastModified: post.updated || post.date || undefined,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));
  return [...staticPages, ...postPages];
}
