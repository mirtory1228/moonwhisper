import { SITE } from '@/lib/site';
export const metadata = {
  title: 'Editorial Policy',
  description: 'How Moonwhisper researches, writes, and reviews its guides — our use of AI assistance, human editing, sourcing, and corrections.',
  alternates: { canonical: '/editorial-policy' },
};
export default function EditorialPolicy() {
  return (
    <article className="prose-page">
      <h1>Editorial Policy</h1>
      <p>{SITE.name} publishes plain-English guides to angel numbers, dreams, and tarot. This page explains how those guides are made, so you know exactly what you're reading and how much weight to give it.</p>

      <h2>How we research</h2>
      <p>Each guide starts from <strong>traditional and widely shared interpretations</strong> — the kind you'd find across dream dictionaries, numerology references, tarot tradition, and folklore. Where a symbol has more than one common reading, we try to present the range rather than pick one and call it fact.</p>

      <h2>How we write and edit</h2>
      <p>Drafts are <strong>researched and written with the help of AI tools</strong>, and then <strong>reviewed and edited by a person</strong> (published under the editorial name <strong>Mira</strong>) for clarity, accuracy, and responsible wording before they go live. Editing focuses on removing overpromises, cutting anything that reads as a guarantee about your future, and keeping the tone grounded.</p>

      <h2>Fact vs. symbolic interpretation</h2>
      <p>We separate two very different things. <strong>Facts</strong> (for example, how a number breaks down, or how a symbol has traditionally been read) we state plainly. <strong>Interpretation</strong> (what a sign might mean for you right now) we frame as reflection, using words like "often," "tends to," and "many people read this as." These topics are for reflection, not prediction.</p>

      <h2>What we won't claim</h2>
      <p>We don't claim to tell your future, and nothing here is <strong>medical, legal, psychological, or financial advice</strong>. If something you read stirs up a real-life worry, please talk to a qualified professional. Take what resonates, and leave the rest.</p>

      <h2>Corrections</h2>
      <p>If a guide is inaccurate, unclear, or out of date, we want to fix it. Spotted something? <a href="/contact">Get in touch</a> and we'll review it. Substantive changes are reflected in each guide's "last updated" date.</p>

      <p style={{ marginTop: '20px', color: 'var(--text-dim)' }}>— Mira, Editor at {SITE.name}</p>
    </article>
  );
}
