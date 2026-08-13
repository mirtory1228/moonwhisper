import AdSlot from '@/components/AdSlot';
import CategoryTabs from '@/components/CategoryTabs';
import { getAllPosts } from '@/lib/posts';
import { SITE } from '@/lib/site';

export const metadata = { alternates: { canonical: '/' } };

export default function HomePage() {
  const posts = getAllPosts();
  return (
    <>
      <section className="hero">
        <h1>{SITE.name}</h1>
        <p className="hero-sub">{SITE.description}</p>
      </section>

      <AdSlot label="Ad" />

      <CategoryTabs posts={posts} />
    </>
  );
}
