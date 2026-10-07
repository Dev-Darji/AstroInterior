// Indian (Vedic/Chaldean) numerology: Mulank, Bhagyank, Naamank, Lo Shu grid and Kua directions.
import { PLANETS } from './astroData';

export const NUMBER_PLANET = { 1: "Sun", 2: "Moon", 3: "Jupiter", 4: "Rahu", 5: "Mercury", 6: "Venus", 7: "Ketu", 8: "Saturn", 9: "Mars" };

// Chaldean values — 9 is sacred and never assigned to a letter
const CHALDEAN = {
  A: 1, I: 1, J: 1, Q: 1, Y: 1,
  B: 2, K: 2, R: 2,
  C: 3, G: 3, L: 3, S: 3,
  D: 4, M: 4, T: 4,
  E: 5, H: 5, N: 5, X: 5,
  U: 6, V: 6, W: 6,
  O: 7, Z: 7,
  F: 8, P: 8
};

const digitSum = (n) => String(n).split("").reduce((a, d) => a + Number(d), 0);

export function reduce(n) {
  while (n > 9) n = digitSum(n);
  return n;
}

export const LO_SHU_LAYOUT = [
  [4, 9, 2],
  [3, 5, 7],
  [8, 1, 6]
];

export const LO_SHU_DIRECTION = { 4: "SE", 9: "S", 2: "SW", 3: "E", 5: "C", 7: "W", 8: "NE", 1: "N", 6: "NW" };

const PLANES = [
  { name: "Mental Plane", cells: [4, 9, 2], text: "Memory, intellect and planning come naturally." },
  { name: "Emotional Plane", cells: [3, 5, 7], text: "Deep empathy and emotional balance." },
  { name: "Practical Plane", cells: [8, 1, 6], text: "Grounded, hands-on and materially capable." },
  { name: "Thought Plane", cells: [4, 3, 8], text: "Strong imagination and strategic thinking." },
  { name: "Will Plane", cells: [9, 5, 1], text: "Determination that finishes what it starts." },
  { name: "Action Plane", cells: [2, 7, 6], text: "Turns ideas into tangible results." },
  { name: "Golden Raj Yoga", cells: [4, 5, 6], text: "A highly auspicious line for prosperity and success." },
  { name: "Silver Raj Yoga", cells: [2, 5, 8], text: "Supports property, wealth and long-term stability." }
];

export const MISSING_REMEDY = {
  1: "Communication & career flow — activate the North with a water element or a blue-framed artwork.",
  2: "Sensitivity & partnership — keep the South-West clutter-free; pair objects (two lamps, two cushions).",
  3: "Creativity & growth — add healthy green plants or a wooden element in the East.",
  4: "Organisation & discipline — keep the South-East bright; add a tidy, well-lit work surface.",
  5: "Balance & grounding — keep the centre (Brahmasthan) open, light and free of heavy furniture.",
  6: "Home & responsibility — strengthen the North-West with metal accents and white/silver tones.",
  7: "Luck & spiritual insight — a clean West with metal décor or a small brass bell.",
  8: "Wealth & stability — earthy ochre tones or a crystal cluster in a clean, light North-East.",
  9: "Recognition & drive — red/terracotta accents and good lighting in the South."
};

export const NUMBER_PROFILE = {
  1: {
    title: "The Leader", keywords: "Independent · Ambitious · Original",
    spatial: "Thrives in high-ceilinged, light-filled rooms with a bold focal point and an East-facing executive desk.",
    materials: "Travertine, polished brass, warm gold lighting"
  },
  2: {
    title: "The Harmoniser", keywords: "Intuitive · Gentle · Diplomatic",
    spatial: "Needs soft curved silhouettes, 2700K indirect lighting, tactile bouclé and a calming water feature.",
    materials: "Raw linen, pale oak, frosted glass, silver accents"
  },
  3: {
    title: "The Teacher", keywords: "Wise · Expressive · Optimistic",
    spatial: "Craves a library wall, a creative studio corner and generous gathering spaces for family and guests.",
    materials: "Teak, yellow-gold accents, handwoven rugs, artisanal ceramics"
  },
  4: {
    title: "The Builder", keywords: "Unconventional · Methodical · Resilient",
    spatial: "Values strong geometry, symmetrical layouts, ample concealed storage and a grounded South-West suite.",
    materials: "Walnut, vein-matched stone, architectural fluting, smoky greys"
  },
  5: {
    title: "The Communicator", keywords: "Versatile · Quick-witted · Free-spirited",
    spatial: "Loves flexible multifunctional rooms, indoor-outdoor balcony flow and modular furniture with lots of greenery.",
    materials: "Rattan, light ash, large glazing, living plants"
  },
  6: {
    title: "The Nurturer", keywords: "Artistic · Loving · Luxurious",
    spatial: "The home-maker's number — a generous dining table, plush bedding, fresh flowers and a beautiful pooja niche.",
    materials: "Velvet, honed limestone, rose-gold hardware, silk"
  },
  7: {
    title: "The Mystic", keywords: "Introspective · Spiritual · Analytical",
    spatial: "Requires quiet — acoustic softening, a secluded reading or meditation alcove and clutter-free minimalism.",
    materials: "Micro-cement, bamboo, white marble, natural fibres"
  },
  8: {
    title: "The Karma Yogi", keywords: "Disciplined · Patient · Powerful",
    spatial: "Commands solid architecture — substantial storage, dark wood, leather and a well-ordered West study.",
    materials: "Blackened steel, dark timber, cognac leather, indigo textiles"
  },
  9: {
    title: "The Warrior", keywords: "Courageous · Energetic · Humanitarian",
    spatial: "Thrives with warm, earthy materials, a home gym or active zone and a strong South wall.",
    materials: "Terracotta tile, exposed brick, hammered copper"
  }
};

export const PERSONAL_YEAR_THEME = {
  1: "New beginnings — start projects, move house or renovate.",
  2: "Patience & partnership — refine, don't force; ideal for soft-furnishing updates.",
  3: "Expression & joy — entertain, decorate, add art and colour.",
  4: "Foundations — structural work, repairs and disciplined planning.",
  5: "Change & movement — travel, relocation, flexible layouts.",
  6: "Home & family — the strongest year to invest in your home.",
  7: "Reflection — create a sanctuary, study, meditate.",
  8: "Harvest & authority — property decisions and financial consolidation.",
  9: "Completion — declutter, let go and make space for the next cycle."
};

export function nameNumber(name) {
  const letters = name.toUpperCase().replace(/[^A-Z]/g, "");
  const compound = letters.split("").reduce((a, ch) => a + (CHALDEAN[ch] || 0), 0);
  return { compound, value: compound ? reduce(compound) : null };
}

function compatibility(a, b) {
  if (a === b) return "excellent";
  const pa = NUMBER_PLANET[a];
  const pb = NUMBER_PLANET[b];
  const friendsA = PLANETS[pa].friends.includes(pb);
  const friendsB = PLANETS[pb].friends.includes(pa);
  const enemy = PLANETS[pa].enemies.includes(pb) || PLANETS[pb].enemies.includes(pa);
  if (friendsA && friendsB) return "excellent";
  if (enemy) return "challenging";
  if (friendsA || friendsB) return "good";
  return "neutral";
}

// Kua uses the Chinese solar year, which turns over around 4 February
export function kuaNumber(dateStr, formula) {
  const [y, m, d] = dateStr.split("-").map(Number);
  const year = m < 2 || (m === 2 && d < 4) ? y - 1 : y;
  const r = reduce(digitSum(year % 100));
  let kua;
  if (formula === "male") kua = (year >= 2000 ? 9 : 10) - r;
  else kua = r + (year >= 2000 ? 6 : 5);
  kua = kua <= 0 ? 9 : reduce(kua);
  if (kua === 5) kua = formula === "male" ? 2 : 8;
  return kua;
}

export const KUA_DIRECTIONS = {
  1: { good: ["SE", "E", "S", "N"], bad: ["W", "NE", "NW", "SW"] },
  2: { good: ["NE", "W", "NW", "SW"], bad: ["E", "SE", "S", "N"] },
  3: { good: ["S", "N", "SE", "E"], bad: ["SW", "NW", "NE", "W"] },
  4: { good: ["N", "S", "E", "SE"], bad: ["NW", "SW", "W", "NE"] },
  6: { good: ["W", "NE", "SW", "NW"], bad: ["SE", "E", "N", "S"] },
  7: { good: ["NW", "SW", "NE", "W"], bad: ["N", "S", "SE", "E"] },
  8: { good: ["SW", "NW", "W", "NE"], bad: ["S", "N", "E", "SE"] },
  9: { good: ["E", "SE", "N", "S"], bad: ["NE", "W", "SW", "NW"] }
};
export const KUA_LABELS = ["Success & wealth", "Health", "Love & relationships", "Personal growth"];

export function computeNumerology({ name, dob, kuaFormula, now = new Date() }) {
  const [y, m, d] = dob.split("-").map(Number);
  const mulank = reduce(d);
  const bhagyankCompound = digitSum(`${y}${m}${d}`);
  const bhagyank = reduce(bhagyankCompound);
  const naam = nameNumber(name);
  const kua = kuaFormula ? kuaNumber(dob, kuaFormula) : null;

  // Lo Shu: every non-zero birth digit, plus Bhagyank, Mulank (when the day is two digits) and Kua
  const digits = `${String(d).padStart(2, "0")}${String(m).padStart(2, "0")}${y}`.split("").map(Number).filter(Boolean);
  const extras = [bhagyank];
  if (d > 9) extras.push(mulank);
  if (kua) extras.push(kua);
  const counts = {};
  for (let n = 1; n <= 9; n++) counts[n] = 0;
  for (const n of [...digits, ...extras]) counts[n]++;

  const missing = Object.keys(counts).map(Number).filter((n) => counts[n] === 0);
  const planes = PLANES.filter((p) => p.cells.every((c) => counts[c] > 0));

  const personalYear = reduce(digitSum(`${d}${m}${now.getFullYear()}`));
  const ruler = NUMBER_PLANET[mulank];
  const luckyNumbers = [mulank, ...Object.keys(NUMBER_PLANET).map(Number).filter((n) => n !== mulank && compatibility(mulank, n) === "excellent")];

  return {
    mulank,
    bhagyank,
    bhagyankCompound,
    naamank: naam.value,
    naamCompound: naam.compound,
    kua,
    loShu: { counts, missing, planes, extras },
    personalYear,
    ruler,
    destinyRuler: NUMBER_PLANET[bhagyank],
    nameHarmony: naam.value ? {
      withMulank: compatibility(naam.value, mulank),
      withBhagyank: compatibility(naam.value, bhagyank)
    } : null,
    mulankBhagyank: compatibility(mulank, bhagyank),
    luckyNumbers: [...new Set(luckyNumbers)]
  };
}
