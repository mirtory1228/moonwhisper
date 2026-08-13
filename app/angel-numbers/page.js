import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import AngelLookup from '@/components/AngelLookup';
import { getAllPosts } from '@/lib/posts';

export const metadata = {
  alternates: { canonical: '/angel-numbers' },
  title: 'Angel Numbers — Meanings & Lookup',
  description: 'Keep seeing the same number? Look up any angel number and find its meaning for love, money, and life.',
};

export default function AngelNumbersHub() {
  const posts = getAllPosts().filter((p) => p.category === 'Angel Numbers');
  const slugs = posts.map((p) => p.slug);
  return (
    <>
      <section className="hero">
        <h1>Angel Numbers</h1>
        <p className="hero-sub">Keep seeing 11:11, 222, or 333? Type the number you keep noticing and find out what your angels may be telling you.</p>
      </section>
      <AngelLookup available={slugs} />
      <AdSlot label="Ad" />
      <ul className="post-list">
        {posts.map((p) => (
          <li key={p.slug}>
            <Link href={`/posts/${p.slug}`} className="post-card">
              <span className="post-cat">{p.category}</span>
              <h2>{p.title}</h2>
              {p.description && <p className="desc">{p.description}</p>}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
