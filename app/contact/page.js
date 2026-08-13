import { SITE } from '@/lib/site';
export const metadata = { title: 'Contact', alternates: { canonical: '/contact' } };
export default function Contact() {
  return (
    <article className="prose-page">
      <h1>Contact {SITE.name}</h1>
      <p>We're glad you're here. Whether you spotted a mistake, have a question, or just want a sign explained, you're welcome to reach out.</p>

      <h2>What you can write about</h2>
      <ul>
        <li><strong>A correction.</strong> If something reads as inaccurate or unclear, tell us — we'd genuinely rather fix it than leave it.</li>
        <li><strong>A number, dream, or card you want explained.</strong> Didn't find the one you saw? Send it over and we may add a guide for it.</li>
        <li><strong>Feedback and ideas.</strong> What was helpful, what fell flat, what you wish existed here.</li>
        <li><strong>Advertising &amp; content inquiries.</strong> For partnership, sponsorship, or content questions, use the same address below and mention "advertising" or "content" in the subject line.</li>
      </ul>

      <h2>How to reach us</h2>
      <p>Email: <a href={`mailto:${SITE.email}`}>{SITE.email}</a></p>
      <p>We read what comes in and aim to reply within a few business days. We can't offer medical, legal, psychological, or financial advice, and we don't provide personal fortune-telling or predictions — but for anything about the guides on this site, we're happy to help.</p>
    </article>
  );
}
