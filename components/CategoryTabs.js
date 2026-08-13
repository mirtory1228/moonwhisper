'use client';
import { useState } from 'react';
import Link from 'next/link';

// Only categories that actually have posts. (Tarot is an interactive tool at
// /tarot, and Zodiac has no articles yet — showing "Tarot 0 / Zodiac 0" chips
// made the site look unfinished, so they're not listed here.)
const CATEGORIES = ['Angel Numbers', 'Dream Dictionary'];
const PAGE = 12;

function matchesQuery(post, q) {
  const s = q.toLowerCase();
  return (
    post.title.toLowerCase().includes(s) ||
    (post.description || '').toLowerCase().includes(s) ||
    (post.keywords || []).some((k) => k.toLowerCase().includes(s))
  );
}

export default function CategoryTabs({ posts }) {
  const [active, setActive] = useState('All');
  const [query, setQuery] = useState('');
  const [visible, setVisible] = useState(PAGE);
  const counts = CATEGORIES.reduce((a, c) => ((a[c] = posts.filter((p) => p.category === c).length), a), {});
  const q = query.trim();
  const searching = q.length > 0;

  let filtered;
  if (searching) filtered = posts.filter((p) => matchesQuery(p, q));
  else if (active === 'All') filtered = posts;
  else filtered = posts.filter((p) => p.category === active);

  const shown = filtered.slice(0, visible);

  function pick(cat) { setActive(cat); setVisible(PAGE); }
  function onSearch(e) { setQuery(e.target.value); setVisible(PAGE); }

  return (
    <>
      <div className="search-box">
        <input type="search" placeholder="Search a number, dream or sign (e.g. 1111, snake, The Star)"
          value={query} onChange={onSearch} aria-label="Search" />
        {searching && <button type="button" className="search-clear" onClick={() => { setQuery(''); setVisible(PAGE); }}>✕</button>}
      </div>
      {searching && <p className="search-result-count">{filtered.length} result(s) for "{q}"</p>}

      <div className={`category-tabs${searching ? ' is-disabled' : ''}`} role="tablist" aria-label="Categories">
        <button type="button" className={`category-tab${active === 'All' ? ' active' : ''}`} onClick={() => pick('All')}>
          All <span className="count">{posts.length}</span>
        </button>
        {CATEGORIES.map((c) => (
          <button key={c} type="button" className={`category-tab${active === c ? ' active' : ''}`} onClick={() => pick(c)}>
            {c} <span className="count">{counts[c]}</span>
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <>
          <ul className="post-list">
            {shown.map((post) => (
              <li key={post.slug}>
                <Link href={`/posts/${post.slug}`} className="post-card">
                  <span className="post-cat">{post.category}</span>
                  <h2>{post.title}</h2>
                  {post.description && <p className="desc">{post.description}</p>}
                  {post.date && <span className="date">{post.date}</span>}
                </Link>
              </li>
            ))}
          </ul>
          {visible < filtered.length && (
            <div className="load-more-wrap">
              <button type="button" className="load-more" onClick={() => setVisible((v) => v + PAGE)}>
                Load more ({filtered.length - visible} left)
              </button>
            </div>
          )}
        </>
      ) : searching ? (
        <p className="category-empty">No match for "{q}". Try another keyword.</p>
      ) : (
        <p className="category-empty"><strong>{active}</strong> — coming soon!</p>
      )}
    </>
  );
}
