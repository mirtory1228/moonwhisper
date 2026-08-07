import './globals.css';
import Link from 'next/link';
import Script from 'next/script';
import { SITE } from '@/lib/site';
import SideDecor from '@/components/SideDecor';
import DreamyBackground from '@/components/DreamyBackground';

export const metadata = {
  metadataBase: new URL(SITE.url),
  verification: { google: 'S4hG618OVHI38cFxLM9e5db5ZXA4ZTPTHGEayEZ2eP8' },
  title: { default: `${SITE.name} · ${SITE.tagline}`, template: `%s · ${SITE.name}` },
  description: SITE.description,
  openGraph: {
    title: `${SITE.name} · ${SITE.tagline}`,
    description: SITE.description,
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {SITE.adsensePublisherId ? (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${SITE.adsensePublisherId}`}
            crossOrigin="anonymous"
            strategy="beforeInteractive"
          />
        ) : null}
        {SITE.gaMeasurementId ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${SITE.gaMeasurementId}`} strategy="afterInteractive" />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${SITE.gaMeasurementId}');`}
            </Script>
          </>
        ) : null}

        <DreamyBackground />
        <SideDecor />

        <header className="site-header">
          <Link href="/" className="brand">
            <span className="brand-mark">🌙</span>
            <span className="brand-text">
              <strong>{SITE.name}</strong>
              <em>{SITE.tagline}</em>
            </span>
          </Link>
          <nav className="site-nav">
            <Link href="/">Home</Link>
            <Link href="/angel-numbers">Angel Numbers</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </header>

        <main className="container">{children}</main>

        <footer className="site-footer">
          <nav className="footer-nav">
            <Link href="/about">About</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/contact">Contact</Link>
          </nav>
          <p className="footer-note">
            Content on this site is for entertainment and reflection. · © 2026 {SITE.name}
          </p>
        </footer>
      </body>
    </html>
  );
}
