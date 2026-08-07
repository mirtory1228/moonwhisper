import { SITE } from '@/lib/site';
export const metadata = { title: 'Privacy Policy' };
export default function Privacy() {
  return (
    <article className="prose-page">
      <h1>Privacy Policy</h1>
      <p>{SITE.name} respects your privacy. This site may use cookies and third-party services (such as analytics and, in the future, advertising) that collect standard usage data like pages visited and general location.</p>
      <h2>Advertising</h2>
      <p>If ads are enabled, third-party vendors including Google may use cookies to serve ads based on your prior visits. You can opt out of personalized advertising via Google Ads Settings.</p>
      <h2>Analytics</h2>
      <p>We may use analytics tools to understand aggregate traffic. This data is not used to personally identify you.</p>
      <h2>Contact</h2>
      <p>Questions about privacy? Email <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p>
    </article>
  );
}
