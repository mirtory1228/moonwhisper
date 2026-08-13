/** @type {import('next').NextConfig} */
const CANONICAL = 'https://www.moonwhispersigns.com';
// Old Vercel production aliases → 301 to the owned domain (SEO consolidation + clean links).
// Preview deploy URLs (moonwhisper-<hash>-...vercel.app) are intentionally NOT redirected.
const OLD_HOSTS = [
  'moonwhisper-two.vercel.app',
  'moonwhisper-hipower159-6132s-projects.vercel.app',
];

const nextConfig = {
  images: { unoptimized: true },
  async redirects() {
    return OLD_HOSTS.map((host) => ({
      source: '/:path*',
      has: [{ type: 'host', value: host }],
      destination: `${CANONICAL}/:path*`,
      permanent: true,
    }));
  },
};

export default nextConfig;
