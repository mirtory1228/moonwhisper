import { SITE } from '@/lib/site';
export const metadata = { title: 'Privacy Policy', alternates: { canonical: '/privacy' } };
export default function Privacy() {
  return (
    <article className="prose-page">
      <h1>Privacy Policy</h1>
      <p><em>Last updated: August 2026.</em></p>
      <p>{SITE.name} ("we", "us") respects your privacy. This page explains what information is collected when you visit {SITE.name}, how it is used, and the choices you have. By using this site, you consent to the practices described here.</p>

      <h2>Information we collect</h2>
      <p>We do not ask you to create an account or submit personal information to read our guides. Like most websites, our servers and third-party tools may automatically log standard, non-identifying data such as pages visited, referring site, browser type, device type, and general (country/region-level) location.</p>

      <h2>Cookies</h2>
      <p>Cookies are small text files stored on your device. We and our third-party partners may use cookies to remember preferences, understand how the site is used, and (where enabled) to serve and measure advertising. You can disable or delete cookies in your browser settings, though some features may not work as intended.</p>

      <h2>Advertising &amp; third-party vendors</h2>
      <p>If advertising is enabled on this site, third-party vendors — including Google — may use cookies to serve ads based on your prior visits to this and other websites.</p>
      <ul>
        <li>Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to this site and/or other sites on the Internet.</li>
        <li>Google uses the DoubleClick DART cookie and similar technologies. You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" rel="noopener noreferrer" target="_blank">Google Ads Settings</a>.</li>
        <li>You can also opt out of some third-party vendors' use of cookies for personalized advertising at <a href="https://www.aboutads.info/choices/" rel="noopener noreferrer" target="_blank">aboutads.info/choices</a>.</li>
        <li>For more on how Google uses data when you use our partners' sites or apps, see <a href="https://policies.google.com/technologies/ads" rel="noopener noreferrer" target="_blank">Google's advertising policies</a>.</li>
      </ul>

      <h2>Analytics</h2>
      <p>We may use privacy-respecting analytics to understand aggregate traffic (for example, which guides are most read). This data is aggregated and is not used to personally identify you.</p>

      <h2>Third-party links</h2>
      <p>Our guides may link to other websites. We are not responsible for the privacy practices or content of those sites and encourage you to review their policies.</p>

      <h2>Children's privacy</h2>
      <p>This site is intended for a general adult audience and is not directed at children under 13. We do not knowingly collect personal information from children.</p>

      <h2>Your choices</h2>
      <p>You can control cookies through your browser, opt out of personalized ads via the links above, and use browser "Do Not Track" or private-browsing modes. Because our content requires no sign-up, we hold no account data to delete.</p>

      <h2>Changes to this policy</h2>
      <p>We may update this policy from time to time. Material changes will be reflected by updating the date at the top of this page.</p>

      <h2>Contact</h2>
      <p>Questions about privacy? Email <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p>
    </article>
  );
}
