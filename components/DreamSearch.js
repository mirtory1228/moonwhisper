'use client';
// Interactive dream lookup: type a dream → instantly matches our Dream
// Dictionary posts and shows the meaning + a link to the full guide.
// Reuses existing content, drives internal traffic and dwell time.
import { useState, useMemo } from 'react';
import Link from 'next/link';

const POPULAR = [
  'snakes', 'teeth falling out', 'being chased', 'flying', 'falling', 'death',
  'water', 'spiders', 'your ex', 'a baby', 'pregnancy', 'a car accident',
];

function cleanTitle(t) { return t.replace(/\s*—.*$/, ''); }

export default function DreamSearch({ posts }) {
  const [q, setQ] = useState('');

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return null;
    const words = s.split(/\s+/).filter(Boolean);
    return posts
      .map((p) => {
        const hay = `${p.title} ${(p.keywords || []).join(' ')} ${p.description}`.toLowerCase();
        let score = 0;
        if (p.title.toLowerCase().includes(s)) score += 4;
        if (hay.includes(s)) score += 2;
        words.forEach((w) => { if (hay.includes(w)) score += 0.5; });
        return { p, score };
      })
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)
      .map((x) => x.p);
  }, [q, posts]);

  return (
    <div className="dream-tool">
      <div className="dream-search-box">
        <span className="dream-search-icon" aria-hidden="true">🔮</span>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="What did you dream about? (e.g. snakes, teeth, flying)"
          aria-label="Search dream meanings"
        />
        {q && <button className="dream-clear" onClick={() => setQ('')} aria-label="Clear">×</button>}
      </div>

      {!q && (
        <>
          <div className="dream-popular">
            <span className="dream-popular-label">Popular dreams</span>
            <div className="dream-chips">
              {POPULAR.map((t) => (
                <button key={t} className="dream-chip" onClick={() => setQ(t)}>{t}</button>
              ))}
            </div>
          </div>
          <div className="dream-browse">
            <span className="dream-popular-label">Browse all dreams ({posts.length})</span>
            <div className="dream-browse-grid">
              {posts.map((p) => (
                <Link key={p.slug} href={`/posts/${p.slug}`} className="dream-browse-link">
                  {cleanTitle(p.title)}
                </Link>
              ))}
            </div>
          </div>
        </>
      )}

      {q && (
        <div className="dream-results">
          {results.length === 0 ? (
            <p className="dream-empty">No match yet — try a simpler keyword like “snake”, “teeth”, or “water”.</p>
          ) : (
            results.map((p) => (
              <Link key={p.slug} href={`/posts/${p.slug}`} className="dream-result">
                <span className="dr-title">{cleanTitle(p.title)}</span>
                <span className="dr-snippet">{p.tldr || p.description}</span>
                <span className="dr-cta">Read the full meaning →</span>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}
