import { SITE } from '@/lib/site';
export const metadata = { title: 'Contact' };
export default function Contact() {
  return (
    <article className="prose-page">
      <h1>Contact</h1>
      <p>We'd love to hear from you — questions, corrections, or requests for a sign you want explained.</p>
      <p>Email: <a href={`mailto:${SITE.email}`}>{SITE.email}</a></p>
    </article>
  );
}
