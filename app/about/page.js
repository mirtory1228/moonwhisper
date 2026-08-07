import { SITE } from '@/lib/site';
export const metadata = { title: 'About' };
export default function About() {
  return (
    <article className="prose-page">
      <h1>About {SITE.name}</h1>
      <p>{SITE.name} is a small, human-curated guide to the little signs people look up — angel numbers, dreams, tarot cards and zodiac signs. When you keep seeing 11:11, wake up from a strange dream, or pull a card, we help you find a clear, grounded meaning in plain English.</p>
      <p>Every guide is written and reviewed by a real person, drawing on traditional sources and common interpretations. We keep it warm, readable, and honest.</p>
      <p><strong>A note:</strong> our content is for entertainment and self-reflection — not medical, legal, or financial advice. Take what resonates, leave the rest.</p>
      <p>Questions or feedback? <a href="/contact">Get in touch</a>.</p>
    </article>
  );
}
