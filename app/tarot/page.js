import TarotReading from '@/components/TarotReading';

export const metadata = {
  title: 'Free Tarot Reading — Pick a Card',
  description: 'Shuffle the deck, fan out all 78 cards, and pick your own — a free interactive tarot reading with a daily card or a past, present & future spread.',
  keywords: ['free tarot reading', 'pick a card', 'tarot online', 'daily tarot', 'past present future tarot', 'three card tarot'],
};

export default function TarotPage() {
  return (
    <article>
      <header className="article-header">
        <span className="post-cat">Tarot</span>
        <h1>Free Tarot Reading — Pick a Card</h1>
      </header>

      <p className="post-tldr" style={{ display: 'block' }}>
        Clear your mind, hold a question, and let the cards choose you. Shuffle the deck, watch all
        78 cards fan out, and pick your own — then turn them over for their meaning. No sign-up, no cost.
      </p>

      <TarotReading />

      <section className="article-body" style={{ marginTop: 36 }}>
        <h2>How this reading works</h2>
        <p>
          A tarot reading is less about predicting a fixed future and more about holding up a mirror.
          The card you draw reflects the energy around your question and gives you a fresh angle to think from.
          Here you do the ritual yourself: the deck is shuffled, the full 78-card deck fans out face-down,
          and <em>you</em> choose the card that pulls you in.
        </p>

        <h2>Choosing a spread</h2>
        <ul>
          <li><strong>Daily Card</strong> — one card for guidance, a focus, or the theme of your day.</li>
          <li><strong>Past · Present · Future</strong> — three cards that tell the story of a situation: what shaped it, where it stands, and where it is heading.</li>
        </ul>

        <h2>Upright &amp; reversed</h2>
        <p>
          Each card can land <strong>upright</strong> or <strong>reversed</strong>. Upright leans toward the card’s
          open, outward expression; reversed often points to the same energy turned inward, blocked, or asking
          for attention. Neither is “good” or “bad” — read it as a nuance, not a verdict.
        </p>

        <h2>Reading it well</h2>
        <p>
          Notice your first reaction to a card before you read the meaning — that instinct is part of the message.
          Then let the interpretation add language to what you already sensed. Take what resonates and leave the rest.
        </p>
      </section>

      <section className="post-faq">
        <h2>Frequently Asked Questions</h2>
        <dl>
          <div className="post-faq-item">
            <dt>Is this tarot reading really free?</dt>
            <dd>Yes — completely free, with no sign-up. Shuffle, pick, and read as many times as you like.</dd>
          </div>
          <div className="post-faq-item">
            <dt>How many cards are in the deck?</dt>
            <dd>All 78: the 22 Major Arcana (life’s big themes) and 56 Minor Arcana across Wands, Cups, Swords and Pentacles.</dd>
          </div>
          <div className="post-faq-item">
            <dt>Can I ask a specific question?</dt>
            <dd>Absolutely. Hold your question in mind while you shuffle and pick — the reading is a prompt for reflection on exactly that.</dd>
          </div>
          <div className="post-faq-item">
            <dt>Does the card predict my future?</dt>
            <dd>No. Tarot is for reflection and entertainment, not fortune-telling. Use it to think, not to decide for you.</dd>
          </div>
        </dl>
      </section>

      <footer className="article-footer">
        <p>This tarot reading is for entertainment and self-reflection only — it is not advice or a prediction. Make your own decisions.</p>
      </footer>
    </article>
  );
}
