import { getAllPosts } from '@/lib/posts';
import DreamSearch from '@/components/DreamSearch';

export const metadata = {
  title: 'Dream Dictionary — Look Up What Your Dream Means',
  description: 'Type what you dreamed about and get a clear, grounded meaning. A free searchable dream dictionary — snakes, teeth falling out, being chased, flying and more.',
  keywords: ['dream dictionary', 'dream meaning', 'what does my dream mean', 'dream interpretation', 'dream symbols'],
};

export default function DreamDictionaryPage() {
  const posts = getAllPosts()
    .filter((p) => p.category === 'Dream Dictionary')
    .map((p) => ({ slug: p.slug, title: p.title, description: p.description, keywords: p.keywords, tldr: p.tldr }));

  return (
    <article>
      <header className="article-header">
        <span className="post-cat">Dream Dictionary</span>
        <h1>Dream Dictionary — What Does Your Dream Mean?</h1>
      </header>

      <p className="post-tldr" style={{ display: 'block' }}>
        Woke up from a strange dream? Type what you saw — a snake, falling teeth, being chased — and
        find a clear, grounded meaning in plain English, with the full interpretation one click away.
      </p>

      <DreamSearch posts={posts} />

      <section className="article-body" style={{ marginTop: 36 }}>
        <h2>How to read a dream</h2>
        <p>
          Dreams rarely mean one fixed thing. The same symbol can shift with the feeling attached to it —
          a snake you watched with curiosity means something different from one that made your skin crawl.
          So when you read a meaning here, notice your own reaction first, then let the interpretation add
          language to what you already sensed.
        </p>
        <h2>Why we dream about the things we do</h2>
        <p>
          Most dreams are your mind processing waking life — a worry you have not named, a change you are
          moving through, a feeling you pushed down during the day. That is why the most useful question is
          rarely “what does this predict?” but “what in my life does this reflect right now?”
        </p>
      </section>

      <section className="post-faq">
        <h2>Frequently Asked Questions</h2>
        <dl>
          <div className="post-faq-item">
            <dt>Do dreams predict the future?</dt>
            <dd>No. Dreams are best understood as reflection — your mind working through emotions and experiences, not forecasting events.</dd>
          </div>
          <div className="post-faq-item">
            <dt>Why do I keep having the same dream?</dt>
            <dd>Recurring dreams usually point to an unresolved feeling or situation your mind keeps returning to. The theme is the clue.</dd>
          </div>
          <div className="post-faq-item">
            <dt>What if my exact dream isn’t listed?</dt>
            <dd>Search the closest core symbol — “water”, “snake”, “falling” — and read the meaning through the lens of how the dream felt.</dd>
          </div>
        </dl>
      </section>

      <footer className="article-footer">
        <p>Dream meanings here are for reflection and entertainment, not prediction. Notice how the dream made you feel.</p>
      </footer>
    </article>
  );
}
