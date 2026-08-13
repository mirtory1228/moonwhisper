import NumerologyCalc from '@/components/NumerologyCalc';
import { SITE } from '@/lib/site';

export const metadata = {
  alternates: { canonical: '/numerology' },
  title: 'Life Path Number Calculator — Free Numerology Reading',
  description:
    'Enter your birth date and instantly get your Life Path number with a clear, grounded meaning. A free numerology calculator covering all numbers 1–9 plus master numbers 11, 22 and 33.',
  keywords: [
    'life path number calculator', 'numerology calculator', 'life path number',
    'what is my life path number', 'free numerology reading', 'master number 11 22 33',
  ],
};

const FAQ = [
  {
    q: 'What is a Life Path number?',
    a: 'Your Life Path number is the core number in numerology, calculated from your birth date. It describes your natural strengths, your challenges, and the overall theme of your life — a bit like a numerology version of a sun sign.',
  },
  {
    q: 'How is the Life Path number calculated?',
    a: 'You reduce your birth month, day, and year each to a single digit (or a master number), then add those three results together and reduce again. For example, December 25, 1990 becomes 3 + 7 + 1 = 11, a master number. This calculator shows the full math for your date.',
  },
  {
    q: 'What are master numbers 11, 22 and 33?',
    a: 'When the reduction lands on 11, 22, or 33, numerology keeps it as a master number instead of reducing further. These are considered rarer, higher-potential paths that carry both greater gifts and greater pressure.',
  },
  {
    q: 'Is this numerology reading accurate?',
    a: 'Numerology is for reflection and entertainment, not prediction. Use your Life Path number as a mirror for self-understanding — take what resonates and leave the rest.',
  },
];

export default function NumerologyPage() {
  const base = SITE.url.replace(/\/$/, '');
  const url = `${base}/numerology`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': `${url}#app`,
        name: 'Life Path Number Calculator',
        applicationCategory: 'LifestyleApplication',
        operatingSystem: 'Any',
        url,
        description: metadata.description,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        publisher: { '@type': 'Organization', name: SITE.name, url: base },
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        mainEntity: FAQ.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  };

  return (
    <article>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="article-header">
        <span className="post-cat">Numerology</span>
        <h1>Life Path Number Calculator</h1>
      </header>

      <p className="post-tldr" style={{ display: 'block' }}>
        Your birth date holds a single core number — your Life Path. Enter your date below and get it
        instantly, with a clear meaning: your strengths, your growth edge, and the theme running through
        your life. Free, no sign-up.
      </p>

      <NumerologyCalc />

      <section className="article-body" style={{ marginTop: 36 }}>
        <h2>What your Life Path number means</h2>
        <p>
          Of all the numbers in your numerology chart, the Life Path is the one to start with. It is drawn
          straight from your date of birth and describes the road you are here to walk — your natural
          talents, the lessons that keep coming back, and the overall shape of your journey. Think of it
          less as a fixed fate and more as a mirror: a way to put language to things you already sense
          about yourself.
        </p>

        <h2>How the calculation works</h2>
        <p>
          The method is simple and always the same. You take your birth <strong>month</strong>,{' '}
          <strong>day</strong>, and <strong>year</strong>, reduce each one to a single digit by adding its
          digits together, then add those three numbers and reduce once more. The one exception is the{' '}
          <strong>master numbers</strong> — if a step lands on 11, 22, or 33, you keep it rather than
          reducing it. The calculator above shows you exactly how your own number was reached, step by step.
        </p>

        <h2>The nine paths — and three master numbers</h2>
        <p>
          Life Path numbers run from <strong>1 to 9</strong>, each with its own character: the Leader (1),
          the Peacemaker (2), the Communicator (3), the Builder (4), the Free Spirit (5), the Nurturer (6),
          the Seeker (7), the Powerhouse (8), and the Humanitarian (9). On top of these sit the three{' '}
          <strong>master numbers</strong> — 11, 22, and 33 — rarer paths that carry higher potential and
          heavier lessons. Whichever you land on, notice your first reaction to the description before you
          read the details; that instinct is part of the reading.
        </p>

        <h2>Numerology and angel numbers</h2>
        <p>
          Your Life Path number and the <a href="/angel-numbers">angel numbers</a> you keep seeing speak the
          same language. A Life Path 1 shares the fresh-start energy of{' '}
          <a href="/posts/angel-number-111">111</a>; a Life Path 7 echoes the inner-wisdom message of{' '}
          <a href="/posts/angel-number-777">777</a>. Once you know your core number, the repeating numbers
          in your day-to-day life often start to make more sense.
        </p>
      </section>

      <section className="post-faq">
        <h2>Frequently Asked Questions</h2>
        <dl>
          {FAQ.map((f) => (
            <div className="post-faq-item" key={f.q}>
              <dt>{f.q}</dt>
              <dd>{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <footer className="article-footer">
        <p>
          This numerology calculator is for reflection and entertainment only — it is not advice or a
          prediction. Take what resonates and make your own decisions.
        </p>
      </footer>
    </article>
  );
}
