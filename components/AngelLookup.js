'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AngelLookup({ available }) {
  const [n, setN] = useState('');
  const router = useRouter();
  const go = (e) => {
    e.preventDefault();
    const num = n.replace(/[^0-9]/g, '');
    if (!num) return;
    const slug = `angel-number-${num}`;
    if (available.includes(slug)) router.push(`/posts/${slug}`);
    else alert(`We don't have ${num} yet — try 111, 222, 333, 444, 555, 777 or 1111.`);
  };
  return (
    <form className="lookup" onSubmit={go}>
      <input inputMode="numeric" pattern="[0-9]*" placeholder="Enter a number, e.g. 1111"
        value={n} onChange={(e) => setN(e.target.value)} aria-label="Angel number" />
      <button type="submit">See meaning →</button>
    </form>
  );
}
