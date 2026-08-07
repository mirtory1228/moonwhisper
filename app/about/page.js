import { SITE } from '@/lib/site';
export const metadata = { title: 'About' };
export default function About() {
  return (
    <article className="prose-page">
      <h1>About {SITE.name}</h1>
      <p>{SITE.name} is a small, human-curated guide to the little signs people look up — angel numbers, dreams, tarot cards and zodiac signs. When you keep seeing 11:11, wake up from a strange dream, or pull a card, we help you find a clear, grounded meaning in plain English.</p>

      <h2>How we write these guides</h2>
      <p>Every guide starts from traditional and widely shared interpretations — the kind you'd find across dream dictionaries, numerology references, and folklore — and is then written and edited by a real person for clarity and warmth. We add honest, first-person perspective where it helps, and we try to explain <em>why</em> a symbol tends to mean what it means rather than just handing you a verdict.</p>
      <p>We also try hard not to overpromise. You'll notice we lean on words like "often," "tends to," and "many people read this as." That's on purpose. These topics are for reflection, not prediction.</p>

      <h2>What we won't do</h2>
      <p>We don't claim to tell your future, and our content is <strong>not</strong> medical, legal, psychological, or financial advice. If something you read here stirs up a real-life worry, please talk to a qualified professional. Take what resonates, and leave the rest.</p>

      <h2>Who's behind it</h2>
      <p>{SITE.name} is an independent site run and edited by a small team who genuinely enjoy this corner of the internet. We read every reader email and correct things when we get them wrong.</p>
      <p style={{ marginTop: '18px', color: 'var(--text-dim)' }}>— Mira, Editor at {SITE.name}</p>

      <p>Questions, corrections, or a sign you'd like explained? <a href="/contact">Get in touch</a>.</p>
    </article>
  );
}
