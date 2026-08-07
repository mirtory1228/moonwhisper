// Ambient dreamy background — pure CSS animation, sits behind ALL content.
// Server component (static SSR), pointer-events:none, aria-hidden.
// Motion is GPU-cheap (transform/opacity only) and disabled under prefers-reduced-motion.

const STARS = [
  // [left%, top%, size(px), delay(s)]
  [6, 12, 2, 0], [14, 28, 1, 1.4], [22, 8, 2, 2.1], [31, 40, 1, 0.6], [38, 18, 3, 3.2],
  [45, 55, 1, 1.1], [52, 9, 2, 2.6], [59, 33, 1, 0.3], [66, 48, 2, 1.8], [73, 15, 1, 2.9],
  [80, 38, 2, 0.9], [87, 22, 1, 3.5], [93, 52, 2, 1.6], [9, 62, 1, 2.2], [17, 78, 2, 0.7],
  [26, 88, 1, 1.9], [34, 68, 2, 3.0], [43, 82, 1, 0.4], [51, 72, 2, 2.4], [60, 90, 1, 1.2],
  [68, 66, 2, 3.3], [76, 84, 1, 0.8], [84, 74, 2, 2.0], [91, 92, 1, 1.5], [4, 44, 1, 2.7],
  [12, 52, 2, 0.5], [48, 30, 1, 3.1], [64, 60, 1, 1.3], [70, 95, 2, 2.5], [88, 6, 1, 0.2],
];

export default function DreamyBackground() {
  return (
    <div className="dreamy-bg" aria-hidden="true">
      <div className="nebula nebula-1" />
      <div className="nebula nebula-2" />
      <div className="nebula nebula-3" />
      <div className="moon-glow" />
      <div className="twinkles">
        {STARS.map(([l, t, s, d], i) => (
          <span
            key={i}
            className="twinkle"
            style={{ left: `${l}%`, top: `${t}%`, width: `${s}px`, height: `${s}px`, animationDelay: `${d}s` }}
          />
        ))}
      </div>
      <span className="shooting-star ss-1" />
      <span className="shooting-star ss-2" />
      <div className="grain" />
    </div>
  );
}
