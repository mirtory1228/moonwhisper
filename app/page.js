import AdSlot from '@/components/AdSlot';
import CategoryTabs from '@/components/CategoryTabs';
import FeaturedGuides from '@/components/FeaturedGuides';
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

      <FeaturedGuides />

      <AdSlot label="Ad" />

      <section className="browse-head">
        <h2>Browse all guides</h2>
        <p>Search a number, dream, or card — or filter by category below.</p>
      </section>

      <CategoryTabs posts={posts} />
    </>
  );
}
