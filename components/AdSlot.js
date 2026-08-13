import { SITE } from '@/lib/site';

// Renders nothing until AdSense is approved (no "Ad space" placeholder shown to
// visitors or reviewers). After approval, swap in the real AdSense unit below.
export default function AdSlot({ label = 'Ad' }) {
  if (!SITE.adsenseApproved) return null;
  return (
    <div className="ad-slot" aria-label={label}>
      {/* Replace with your AdSense unit after approval */}
    </div>
  );
}
