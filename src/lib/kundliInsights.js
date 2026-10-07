// Translates a computed Kundli into Vastu & interior guidance.
import { SIGNS, PLANETS, PLANET_ORDER, HOUSE_MEANINGS, DIRECTION_NAMES, ELEMENT_INTERIOR } from './astroData';
import { elementBalance } from './vedicAstro';

const FOURTH_HOUSE_PLANET = {
  Sun: "Sun in the 4th seeks a home full of light — prioritise East windows and avoid dark, cramped rooms.",
  Moon: "Moon in the 4th brings deep attachment to home — soft textiles, a nurturing kitchen and family photographs matter.",
  Mars: "Mars in the 4th can overheat the home — avoid red-heavy bedrooms and keep the kitchen strictly in the South-East.",
  Mercury: "Mercury in the 4th loves a library wall, a study nook and smart, well-organised storage.",
  Jupiter: "Jupiter in the 4th blesses property and peace — honour it with a well-kept pooja space in the North-East.",
  Venus: "Venus in the 4th brings beautiful homes and comfort — invest in quality furnishings, art and fragrance.",
  Saturn: "Saturn in the 4th asks for discipline at home — declutter, repair and favour sturdy, minimal design.",
  Rahu: "Rahu in the 4th can feel restless — keep the South-West heavy and avoid mirrors facing the bed.",
  Ketu: "Ketu in the 4th seeks detachment — a minimal, spiritual home with a meditation corner settles it."
};

const directionLabel = (code) => (code ? DIRECTION_NAMES[code] : "No fixed direction");

export function buildBlueprint(kundli) {
  const lagnaSign = SIGNS[kundli.lagna.sign];
  const lagnaLord = lagnaSign.lord;
  const lagnaLordPos = kundli.planets[lagnaLord];

  const fourthSign = (kundli.lagna.sign + 3) % 12;
  const fourthLord = SIGNS[fourthSign].lord;
  const inFourth = PLANET_ORDER.filter((p) => kundli.planets[p].house === 4);

  const balance = elementBalance(kundli);
  const moonElement = SIGNS[kundli.moonSign].element;

  const strong = PLANET_ORDER.filter((p) => ["Exalted", "Own sign"].includes(kundli.planets[p].dignity));
  const weak = PLANET_ORDER.filter((p) => kundli.planets[p].dignity === "Debilitated" || kundli.planets[p].combust);

  return {
    power: {
      planet: lagnaLord,
      direction: PLANETS[lagnaLord].direction,
      directionName: directionLabel(PLANETS[lagnaLord].direction),
      placement: `${SIGNS[lagnaLordPos.sign].name}, house ${lagnaLordPos.house} (${HOUSE_MEANINGS[lagnaLordPos.house - 1].toLowerCase()})`,
      tip: PLANETS[lagnaLord].interior
    },
    home: {
      sign: SIGNS[fourthSign],
      lord: fourthLord,
      lordHouse: kundli.planets[fourthLord].house,
      direction: PLANETS[fourthLord].direction,
      occupants: inFourth.map((p) => ({ planet: p, text: FOURTH_HOUSE_PLANET[p] })),
      element: ELEMENT_INTERIOR[SIGNS[fourthSign].element]
    },
    balance,
    dominant: { element: balance.dominant, ...ELEMENT_INTERIOR[balance.dominant] },
    remedy: { element: balance.weakest, ...ELEMENT_INTERIOR[balance.weakest], zoneName: DIRECTION_NAMES[ELEMENT_INTERIOR[balance.weakest].zone] },
    bedroom: { element: moonElement, sign: SIGNS[kundli.moonSign], ...ELEMENT_INTERIOR[moonElement] },
    strong: strong.map((p) => ({ planet: p, dignity: kundli.planets[p].dignity, direction: directionLabel(PLANETS[p].direction) })),
    weak: weak.map((p) => ({
      planet: p,
      reason: kundli.planets[p].combust ? "Combust (too close to the Sun)" : "Debilitated",
      direction: directionLabel(PLANETS[p].direction),
      tip: PLANETS[p].interior
    })),
    lucky: {
      gem: PLANETS[lagnaLord].gem,
      color: PLANETS[lagnaLord].color,
      day: PLANETS[lagnaLord].day,
      metal: PLANETS[lagnaLord].metal
    }
  };
}
