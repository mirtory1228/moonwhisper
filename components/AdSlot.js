import { SITE } from '@/lib/site';

export default function AdSlot({ label = 'Ad' }) {
  const approved = Boolean(SITE.adsenseApproved);
  if (!approved) {
    return (
      <div className="ad-slot placeholder" aria-hidden="true">
        <span>Ad space</span>
        <small>Ads will appear here once AdSense is approved</small>
      </div>
    );
  }
  return (
    <div className="ad-slot" aria-label={label}>
      {/* Replace with your AdSense unit after approval */}
    </div>
  );
}
