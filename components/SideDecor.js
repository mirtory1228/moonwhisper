// 데스크톱 전용 장식 — 좌우 여백을 별자리·타로카드·12지신 모티브로 채운다.
// 서버 컴포넌트(정적 빌드 시 한 번만 렌더) + pointer-events:none, aria-hidden.

import { Constellation } from './ZodiacConstellations';

const LEFT_CARDS = [
  { id: 'major-00', top: '6%', rot: -9 },
  { id: 'major-08', top: '34%', rot: 7 },
  { id: 'major-13', top: '62%', rot: -6 },
];
const RIGHT_CARDS = [
  { id: 'major-06', top: '14%', rot: 8 },
  { id: 'major-09', top: '42%', rot: -7 },
  { id: 'major-17', top: '70%', rot: 6 },
];

const LEFT_ZODIAC = [
  { sign: 'aries', top: '18%' },
  { sign: 'gemini', top: '47%' },
  { sign: 'leo', top: '74%' },
  { sign: 'capricorn', top: '90%' },
];
const RIGHT_ZODIAC = [
  { sign: 'cancer', top: '25%' },
  { sign: 'libra', top: '53%' },
  { sign: 'pisces', top: '80%' },
  { sign: 'scorpio', top: '3%' },
];

const LEFT_ANIMALS = [
  { emoji: '🐀', top: '12%' },
  { emoji: '🐉', top: '46%' },
  { emoji: '🐒', top: '56%' },
  { emoji: '🐕', top: '84%' },
];
const RIGHT_ANIMALS = [
  { emoji: '🐂', top: '8%' },
  { emoji: '🐍', top: '36%' },
  { emoji: '🐑', top: '64%' },
  { emoji: '🐖', top: '92%' },
];

const STARS_LEFT = [
  [10, 8], [28, 4], [55, 6], [78, 3], [15, 22], [62, 24], [40, 40],
  [12, 58], [70, 60], [30, 72], [58, 82], [20, 94], [80, 92], [45, 15],
];
const STARS_RIGHT = [
  [12, 5], [82, 8], [50, 3], [30, 20], [66, 18], [18, 38], [72, 44],
  [40, 56], [8, 70], [60, 74], [25, 86], [85, 88], [48, 96], [65, 30],
];

function Stars({ points }) {
  return points.map(([left, top], i) => (
    <span
      key={i}
      className="deco-star"
      style={{
        left: `${left}%`,
        top: `${top}%`,
        width: i % 3 === 0 ? '3px' : '2px',
        height: i % 3 === 0 ? '3px' : '2px',
        opacity: i % 2 === 0 ? 0.8 : 0.5,
      }}
    />
  ));
}

export default function SideDecor() {
  return (
    <>
      <aside className="side-decor left" aria-hidden="true">
        <Stars points={STARS_LEFT} />
        {LEFT_CARDS.map((c) => (
          <img
            key={c.id}
            src={`/cards/${c.id}.jpg`}
            alt=""
            className="deco-card"
            style={{ top: c.top, transform: `translateX(-50%) rotate(${c.rot}deg)` }}
          />
        ))}
        {LEFT_ZODIAC.map((z, i) => (
          <div key={i} className="deco-zodiac" style={{ top: z.top }}>
            <Constellation sign={z.sign} />
          </div>
        ))}
        {LEFT_ANIMALS.map((a, i) => (
          <span key={i} className="deco-animal" style={{ top: a.top }}>{a.emoji}</span>
        ))}
      </aside>

      <aside className="side-decor right" aria-hidden="true">
        <Stars points={STARS_RIGHT} />
        {RIGHT_CARDS.map((c) => (
          <img
            key={c.id}
            src={`/cards/${c.id}.jpg`}
            alt=""
            className="deco-card"
            style={{ top: c.top, transform: `translateX(-50%) rotate(${c.rot}deg)` }}
          />
        ))}
        {RIGHT_ZODIAC.map((z, i) => (
          <div key={i} className="deco-zodiac" style={{ top: z.top }}>
            <Constellation sign={z.sign} />
          </div>
        ))}
        {RIGHT_ANIMALS.map((a, i) => (
          <span key={i} className="deco-animal" style={{ top: a.top }}>{a.emoji}</span>
        ))}
      </aside>
    </>
  );
}
