import Link from 'next/link';

// Curated "Start Here" set so the homepage leads with friendly, representative
// guides instead of whatever dream post is newest (which can skew dark/edgy).
const FEATURED = [
  { emoji: '1️⃣', title: 'Angel Number 111', sub: 'Fresh starts & manifestation', href: '/posts/angel-number-111' },
  { emoji: '4️⃣', title: 'Angel Number 444', sub: 'Protection & steady ground', href: '/posts/angel-number-444' },
  { emoji: '🌊', title: 'Dream About Water', sub: 'Emotions & what they carry', href: '/posts/dream-about-water' },
  { emoji: '🦷', title: 'Teeth Falling Out', sub: 'The classic stress dream', href: '/posts/dream-about-teeth-falling-out' },
  { emoji: '🃏', title: 'Free Tarot Reading', sub: 'Pull a card for reflection', href: '/tarot' },
  { emoji: '🔢', title: 'Life Path Calculator', sub: 'Find your number from your birthday', href: '/numerology' },
];

export default function FeaturedGuides() {
  return (
    <section className="featured" aria-labelledby="featured-heading">
      <div className="featured-head">
        <h2 id="featured-heading">Start here</h2>
        <p>New to Moonwhisper? These are the guides and tools most people look for first.</p>
      </div>
      <ul className="featured-grid">
        {FEATURED.map((f) => (
          <li key={f.href}>
            <Link href={f.href} className="featured-card">
              <span className="featured-emoji" aria-hidden="true">{f.emoji}</span>
              <span className="featured-text">
                <strong>{f.title}</strong>
                <em>{f.sub}</em>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
