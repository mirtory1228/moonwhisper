// Life Path 넘버 계산 + 의미 데이터.
// 계산은 표준 방식: 월·일·년을 각각 한 자리(또는 마스터넘버)로 줄인 뒤 합산해 다시 축약.
// 마스터넘버 11·22·33은 더 줄이지 않는다.

const MASTER = new Set([11, 22, 33]);

function reduceNum(n) {
  let x = n;
  while (x > 9 && !MASTER.has(x)) {
    x = String(x)
      .split('')
      .reduce((a, d) => a + Number(d), 0);
  }
  return x;
}

// year, month, day (숫자) → { number, steps } 반환. steps는 계산 과정(투명성=신뢰).
export function calcLifePath(year, month, day) {
  const rm = reduceNum(month);
  const rd = reduceNum(day);
  const ry = reduceNum(year);
  const sum = rm + rd + ry;
  const number = reduceNum(sum);
  return {
    number,
    steps: {
      month: { raw: month, reduced: rm },
      day: { raw: day, reduced: rd },
      year: { raw: year, reduced: ry },
      sum,
    },
  };
}

// Life Path 의미. keyword 몇 개 + 한 문단 요약 + 강점/도전 + 관련 엔젤넘버 슬러그(내부링크).
export const LIFE_PATHS = {
  1: {
    title: 'The Leader',
    aka: 'Pioneer · Initiator',
    keywords: ['independence', 'drive', 'originality'],
    summary:
      'You are wired to start things and go your own way. Life Path 1 people are self-starters who feel most alive when they are pioneering, leading, or building something no one else has. The lesson of this path is learning to lead without going it completely alone.',
    strengths: 'Bold, self-reliant, decisive, full of fresh ideas.',
    challenge: 'Watch for stubbornness, impatience, or shutting others out. Real strength includes knowing when to ask for help.',
    relates: { number: '111', why: 'a fresh start and trusting your own path' },
  },
  2: {
    title: 'The Peacemaker',
    aka: 'Diplomat · Partner',
    keywords: ['harmony', 'sensitivity', 'cooperation'],
    summary:
      'You read the room before anyone speaks. Life Path 2 is the path of connection — partnership, empathy, and quiet influence. You are the one who holds relationships and teams together, often behind the scenes. The lesson is valuing your own needs as much as everyone else’s.',
    strengths: 'Intuitive, patient, deeply loyal, a natural mediator.',
    challenge: 'You can over-give, avoid conflict, or lose yourself in others. Boundaries are your growth edge.',
    relates: { number: '222', why: 'balance, trust, and relationships finding alignment' },
  },
  3: {
    title: 'The Communicator',
    aka: 'Creative · Storyteller',
    keywords: ['expression', 'joy', 'imagination'],
    summary:
      'You turn feeling into words, color, and story. Life Path 3 is the creative and social path — you light up rooms and lift moods, and you are happiest when you are making or expressing something. The lesson is finishing what you start and using your voice with purpose, not just for approval.',
    strengths: 'Expressive, optimistic, charming, endlessly creative.',
    challenge: 'Scattered energy, self-doubt under the surface, or running from anything serious. Depth makes your gifts land.',
    relates: { number: '333', why: 'creativity, self-expression, and encouragement to speak up' },
  },
  4: {
    title: 'The Builder',
    aka: 'Worker · Foundation',
    keywords: ['stability', 'discipline', 'loyalty'],
    summary:
      'You make things solid and lasting. Life Path 4 is the path of the builder — practical, dependable, the person others trust to actually get it done. You value structure, honesty, and hard work. The lesson is staying open and flexible so your foundations do not become cages.',
    strengths: 'Reliable, hardworking, organized, deeply grounded.',
    challenge: 'Rigidity, over-caution, or all work and no play. Growth comes from allowing change and rest.',
    relates: { number: '444', why: 'stability, protection, and being on solid ground' },
  },
  5: {
    title: 'The Free Spirit',
    aka: 'Explorer · Adventurer',
    keywords: ['freedom', 'change', 'curiosity'],
    summary:
      'You are here to experience life fully. Life Path 5 is the path of freedom and change — travel, variety, new people, new ideas. Routine feels like a cage; you learn by doing and moving. The lesson is finding freedom that lasts, rather than escaping every time things get heavy.',
    strengths: 'Adaptable, adventurous, magnetic, quick to learn.',
    challenge: 'Restlessness, impulsiveness, or avoiding commitment. Grounding turns motion into progress.',
    relates: { number: '555', why: 'big change and a turning point arriving' },
  },
  6: {
    title: 'The Nurturer',
    aka: 'Caretaker · Healer',
    keywords: ['responsibility', 'love', 'service'],
    summary:
      'You carry others. Life Path 6 is the path of care, home, and responsibility — you are the one people lean on, the natural parent, partner, or healer of the group. You feel deeply for family and community. The lesson is caring for yourself as generously as you care for everyone else.',
    strengths: 'Warm, protective, responsible, devoted to the people you love.',
    challenge: 'Over-responsibility, controlling out of love, or martyrdom. You are allowed to receive too.',
    relates: { number: '666', why: 'rebalancing home, self-care, and where your energy goes' },
  },
  7: {
    title: 'The Seeker',
    aka: 'Thinker · Mystic',
    keywords: ['wisdom', 'introspection', 'truth'],
    summary:
      'You look beneath the surface. Life Path 7 is the path of the seeker — analysis, intuition, and the search for meaning. You need solitude to think, and you trust what you understand deeply over what is merely popular. The lesson is staying connected to people while you go inward.',
    strengths: 'Insightful, independent, intuitive, quietly wise.',
    challenge: 'Isolation, overthinking, or emotional distance. Sharing your inner world is part of the path.',
    relates: { number: '777', why: 'inner wisdom, alignment, and being on the right track' },
  },
  8: {
    title: 'The Powerhouse',
    aka: 'Achiever · Executive',
    keywords: ['ambition', 'abundance', 'authority'],
    summary:
      'You are built to lead and to build results in the real world. Life Path 8 is the path of power, money, and achievement — you understand influence and you can turn vision into something concrete and abundant. The lesson is using power with integrity, and remembering worth is not only what you produce.',
    strengths: 'Driven, capable, resilient, a strong manager and provider.',
    challenge: 'Workaholism, control, or tying self-worth to success. Balance and generosity complete the path.',
    relates: { number: '888', why: 'abundance, momentum, and rewards for your effort' },
  },
  9: {
    title: 'The Humanitarian',
    aka: 'Giver · Old Soul',
    keywords: ['compassion', 'completion', 'idealism'],
    summary:
      'You feel for the whole world. Life Path 9 is the path of the humanitarian — compassion, wisdom, and a pull to make things better for everyone, not just yourself. You often feel like an old soul. The lesson is learning to let go and to give without losing yourself in the mission.',
    strengths: 'Compassionate, wise, generous, broad-minded.',
    challenge: 'Carrying too much, difficulty letting go, or idealism that leads to burnout. Release is your teacher.',
    relates: { number: '909', why: 'endings, completion, and making room for what is next' },
  },
  11: {
    title: 'The Intuitive',
    aka: 'Master Number · The Illuminator',
    keywords: ['intuition', 'inspiration', 'vision'],
    summary:
      'Life Path 11 is a master number — the higher octave of 2. You feel everything intensely and pick up on things others miss. You are here to inspire and to bring light, insight, or spiritual awareness to people. The lesson is grounding your huge sensitivity so it becomes a gift, not an overwhelm.',
    strengths: 'Highly intuitive, inspiring, visionary, emotionally attuned.',
    challenge: 'Anxiety, self-doubt, and nervous energy. You need grounding and trust to carry this frequency.',
    relates: { number: '1111', why: 'awakening, alignment, and a spiritual gateway opening' },
  },
  22: {
    title: 'The Master Builder',
    aka: 'Master Number · The Architect',
    keywords: ['vision', 'mastery', 'legacy'],
    summary:
      'Life Path 22 is the most powerful number — the higher octave of 4. You have the rare ability to take a huge vision and actually build it in the real world. You are here to create something lasting that helps many people. The lesson is believing you are capable of the scale you sense inside you.',
    strengths: 'Visionary yet practical, disciplined, capable of enormous impact.',
    challenge: 'Pressure, self-imposed limits, or being paralyzed by the size of your potential. Take it one brick at a time.',
    relates: { number: '1122', why: 'building your vision and partnerships aligning toward a purpose' },
  },
  33: {
    title: 'The Master Teacher',
    aka: 'Master Number · The Healer',
    keywords: ['compassion', 'guidance', 'selflessness'],
    summary:
      'Life Path 33 is the rarest master number — the higher octave of 6. It carries the energy of the compassionate teacher and healer who uplifts others through love and example. You are here to guide, heal, and give at a high level. The lesson is offering that love without sacrificing your own wellbeing.',
    strengths: 'Deeply loving, wise, nurturing, a natural guide and healer.',
    challenge: 'Taking on the world’s pain and burning out. This path only works when you are cared for too.',
    relates: { number: '1133', why: 'creative growth, teaching, and a spiritual shift underway' },
  },
};

export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
