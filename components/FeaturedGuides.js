import Link from 'next/link';

// Inline Lucide-style SVG icons (no emoji — emoji can render as "?" in some
// browsers and in the AdSense site preview). Monochrome line icons inherit
// the gold accent via `.featured-icon` and are decorative (aria-hidden).
const iconProps = {
  className: 'featured-icon',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': 'true',
};

const Sparkles = () => (
  <svg {...iconProps}>
    <path d="m12 3-1.9 5.8a2 2 0 0 1-1.287 1.288L3 12l5.8 1.9a2 2 0 0 1 1.288 1.287L12 21l1.9-5.8a2 2 0 0 1 1.287-1.288L21 12l-5.8-1.9a2 2 0 0 1-1.288-1.287Z" />
    <path d="M5 3v4" /><path d="M19 17v4" /><path d="M3 5h4" /><path d="M17 19h4" />
  </svg>
);
const Shield = () => (
  <svg {...iconProps}>
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
  </svg>
);
const Droplets = () => (
  <svg {...iconProps}>
    <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 4.24 7 2c-.29 2.24-1.14 4.13-2.29 5.06S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z" />
    <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97" />
  </svg>
);
const Smile = () => (
  <svg {...iconProps}>
    <circle cx="12" cy="12" r="10" />
    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
    <line x1="9" x2="9.01" y1="9" y2="9" />
    <line x1="15" x2="15.01" y1="9" y2="9" />
  </svg>
);
const Gem = () => (
  <svg {...iconProps}>
    <path d="M6 3h12l4 6-10 13L2 9Z" />
    <path d="M11 3 8 9l4 13 4-13-3-6" />
    <path d="M2 9h20" />
  </svg>
);
const Calculator = () => (
  <svg {...iconProps}>
    <rect width="16" height="20" x="4" y="2" rx="2" />
    <line x1="8" x2="16" y1="6" y2="6" />
    <line x1="16" x2="16" y1="14" y2="18" />
    <path d="M16 10h.01" /><path d="M12 10h.01" /><path d="M8 10h.01" />
    <path d="M12 14h.01" /><path d="M8 14h.01" /><path d="M12 18h.01" /><path d="M8 18h.01" />
  </svg>
);

// Curated "Start Here" set so the homepage leads with friendly, representative
// guides instead of whatever dream post is newest (which can skew dark/edgy).
const FEATURED = [
  { Icon: Sparkles, title: 'Angel Number 111', sub: 'Fresh starts & manifestation', href: '/posts/angel-number-111' },
  { Icon: Shield, title: 'Angel Number 444', sub: 'Protection & steady ground', href: '/posts/angel-number-444' },
  { Icon: Droplets, title: 'Dream About Water', sub: 'Emotions & what they carry', href: '/posts/dream-about-water' },
  { Icon: Smile, title: 'Teeth Falling Out', sub: 'The classic stress dream', href: '/posts/dream-about-teeth-falling-out' },
  { Icon: Gem, title: 'Free Tarot Reading', sub: 'Pull a card for reflection', href: '/tarot' },
  { Icon: Calculator, title: 'Life Path Calculator', sub: 'Find your number from your birthday', href: '/numerology' },
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
              <f.Icon />
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
