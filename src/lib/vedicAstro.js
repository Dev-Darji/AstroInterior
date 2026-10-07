import {
  Body, MakeTime, GeoVector, Ecliptic, EclipticGeoMoon, SunPosition, SiderealTime, e_tilt
} from 'astronomy-engine';
import {
  SIGNS, PLANETS, PLANET_ORDER, NAKSHATRAS, DASHA_SEQUENCE, DASHA_YEARS,
  TITHIS, NITYA_YOGAS, VAARS
} from './astroData';

const DEG = Math.PI / 180;
const NAK_SPAN = 360 / 27;
const DAY_MS = 86400000;
const YEAR_MS = 365.25 * DAY_MS;

export const norm360 = (d) => ((d % 360) + 360) % 360;

// Lahiri (Chitrapaksha) ayanamsa, anchored at 21 Mar 1956 and advanced by IAU general precession.
export function lahiriAyanamsa(time) {
  const T = time.tt / 36525;
  const precession = 5028.796195 * T + 1.1054348 * T * T; // arcseconds since J2000
  return 23.857045 + precession / 3600;
}

function tropicalLongitude(name, date) {
  if (name === "Sun") return SunPosition(date).elon;
  if (name === "Moon") return EclipticGeoMoon(date).lon;
  return Ecliptic(GeoVector(Body[name], date, true)).elon;
}

// Mean lunar node (Meeus 47.7) — the convention used by most Indian panchangs
function meanRahu(time) {
  const T = time.tt / 36525;
  return norm360(125.0445479 - 1934.1362891 * T + 0.0020754 * T * T + (T * T * T) / 467441);
}

function ascendant(date, latitude, longitude) {
  const time = MakeTime(date);
  const ramc = norm360(SiderealTime(time) * 15 + longitude) * DEG;
  const eps = e_tilt(time).tobl * DEG;
  const lat = latitude * DEG;
  const asc = Math.atan2(Math.cos(ramc), -(Math.sin(ramc) * Math.cos(eps) + Math.tan(lat) * Math.sin(eps)));
  return norm360(asc / DEG);
}

export function siderealPositions(date) {
  const time = MakeTime(date);
  const ayanamsa = lahiriAyanamsa(time);
  const before = new Date(date.getTime() - DAY_MS / 2);
  const after = new Date(date.getTime() + DAY_MS / 2);
  const positions = {};

  for (const name of ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn"]) {
    const lon = norm360(tropicalLongitude(name, date) - ayanamsa);
    let speed = tropicalLongitude(name, after) - tropicalLongitude(name, before);
    if (speed > 180) speed -= 360;
    if (speed < -180) speed += 360;
    positions[name] = { lon, speed, retrograde: speed < 0 };
  }
  const rahu = norm360(meanRahu(time) - ayanamsa);
  positions.Rahu = { lon: rahu, speed: -0.053, retrograde: true };
  positions.Ketu = { lon: norm360(rahu + 180), speed: -0.053, retrograde: true };

  return { positions, ayanamsa };
}

export function formatDegrees(lon) {
  const inSign = lon % 30;
  const d = Math.floor(inSign);
  const m = Math.floor((inSign - d) * 60);
  return `${d}°${String(m).padStart(2, "0")}′`;
}

export function nakshatraOf(lon) {
  const index = Math.floor(lon / NAK_SPAN);
  const within = lon - index * NAK_SPAN;
  return { ...NAKSHATRAS[index], index, pada: Math.floor(within / (NAK_SPAN / 4)) + 1, fraction: within / NAK_SPAN };
}

function relationship(planet, signLord) {
  if (planet === signLord) return "own";
  const p = PLANETS[planet];
  if (p.friends.includes(signLord)) return "friendly";
  if (p.enemies.includes(signLord)) return "enemy";
  return "neutral";
}

export function dignityOf(planet, sign) {
  const p = PLANETS[planet];
  if (p.exalt === sign) return "Exalted";
  if (p.debil === sign) return "Debilitated";
  if (p.own.includes(sign)) return "Own sign";
  const rel = relationship(planet, SIGNS[sign].lord);
  return { friendly: "Friendly sign", enemy: "Enemy sign", neutral: "Neutral sign", own: "Own sign" }[rel];
}

// Classical combustion orbs (degrees from the Sun)
const COMBUST_ORB = { Moon: 12, Mars: 17, Mercury: 14, Jupiter: 11, Venus: 10, Saturn: 15 };

function angularDistance(a, b) {
  const d = Math.abs(norm360(a - b));
  return d > 180 ? 360 - d : d;
}

export function vimshottari(moonLon, birthDate, now = new Date()) {
  const nak = nakshatraOf(moonLon);
  let lordIdx = DASHA_SEQUENCE.indexOf(nak.lord);
  // Dasha cycle notionally began before birth by the elapsed share of the birth nakshatra
  let start = birthDate.getTime() - nak.fraction * DASHA_YEARS[nak.lord] * YEAR_MS;
  const periods = [];

  for (let i = 0; i < 9; i++) {
    const lord = DASHA_SEQUENCE[(lordIdx + i) % 9];
    const end = start + DASHA_YEARS[lord] * YEAR_MS;
    periods.push({ lord, start: new Date(Math.max(start, birthDate.getTime())), end: new Date(end) });
    start = end;
  }

  const current = periods.find((p) => now >= p.start && now < p.end) || null;
  let antardasha = null;
  if (current) {
    const mahaYears = DASHA_YEARS[current.lord];
    let aStart = current.end.getTime() - mahaYears * YEAR_MS;
    const startIdx = DASHA_SEQUENCE.indexOf(current.lord);
    for (let i = 0; i < 9; i++) {
      const lord = DASHA_SEQUENCE[(startIdx + i) % 9];
      const aEnd = aStart + (mahaYears * DASHA_YEARS[lord] / 120) * YEAR_MS;
      if (now.getTime() >= aStart && now.getTime() < aEnd) {
        antardasha = { lord, start: new Date(aStart), end: new Date(aEnd) };
        break;
      }
      aStart = aEnd;
    }
  }
  return { balanceLord: nak.lord, balanceYears: (1 - nak.fraction) * DASHA_YEARS[nak.lord], periods, current, antardasha };
}

function detectYogas(planets, lagnaSign) {
  const yogas = [];
  const house = (name) => planets[name].house;
  const sign = (name) => planets[name].sign;
  const fromMoon = (name) => ((sign(name) - sign("Moon") + 12) % 12) + 1;
  const kendra = [1, 4, 7, 10];

  if (kendra.includes(fromMoon("Jupiter"))) {
    yogas.push({ name: "Gaja Kesari Yoga", text: "Jupiter in a kendra from the Moon — wisdom, reputation and protective grace." });
  }
  if (sign("Sun") === sign("Mercury")) {
    yogas.push({ name: "Budha-Aditya Yoga", text: "Sun and Mercury together — sharp intellect and articulate communication." });
  }
  if (sign("Moon") === sign("Mars")) {
    yogas.push({ name: "Chandra-Mangala Yoga", text: "Moon conjunct Mars — enterprise and a strong drive to build wealth." });
  }
  const mahapurusha = { Mars: "Ruchaka", Mercury: "Bhadra", Jupiter: "Hamsa", Venus: "Malavya", Saturn: "Shasha" };
  for (const [planet, yoga] of Object.entries(mahapurusha)) {
    const p = PLANETS[planet];
    if (kendra.includes(house(planet)) && (p.exalt === sign(planet) || p.own.includes(sign(planet)))) {
      yogas.push({ name: `${yoga} Mahapurusha Yoga`, text: `${planet} strong in a kendra from the Lagna — one of the five great-person yogas.` });
    }
  }
  const flankers = ["Mars", "Mercury", "Jupiter", "Venus", "Saturn"];
  const moonSign = sign("Moon");
  const occupied = (s) => flankers.some((n) => sign(n) === s);
  if (!occupied((moonSign + 1) % 12) && !occupied((moonSign + 11) % 12) && !flankers.some((n) => sign(n) === moonSign)) {
    yogas.push({ name: "Kemadruma (to balance)", text: "No planets flank the Moon — nurture emotional support, routine and a calming bedroom." });
  }
  return yogas;
}

export function computeKundli({ date, latitude, longitude, utcOffsetMinutes, now = new Date() }) {
  const { positions, ayanamsa } = siderealPositions(date);
  const ascLon = norm360(ascendant(date, latitude, longitude) - ayanamsa);
  const lagnaSign = Math.floor(ascLon / 30);

  const planets = {};
  for (const name of PLANET_ORDER) {
    const { lon, retrograde } = positions[name];
    const sign = Math.floor(lon / 30);
    const combust = COMBUST_ORB[name] !== undefined && angularDistance(lon, positions.Sun.lon) < COMBUST_ORB[name];
    planets[name] = {
      name,
      lon,
      sign,
      house: ((sign - lagnaSign + 12) % 12) + 1,
      degree: formatDegrees(lon),
      retrograde,
      combust,
      nakshatra: nakshatraOf(lon),
      dignity: dignityOf(name, sign)
    };
  }

  const moonLon = positions.Moon.lon;
  const sunLon = positions.Sun.lon;
  const elongation = norm360(moonLon - sunLon);
  const tithiIndex = Math.floor(elongation / 12);
  const paksha = tithiIndex < 15 ? "Shukla" : "Krishna";
  const tithiName = tithiIndex === 14 ? "Purnima" : tithiIndex === 29 ? "Amavasya" : TITHIS[tithiIndex % 15];

  const marsHouseLagna = planets.Mars.house;
  const marsHouseMoon = ((planets.Mars.sign - planets.Moon.sign + 12) % 12) + 1;
  const manglikHouses = [1, 2, 4, 7, 8, 12];

  // Current Saturn transit for Sade Sati
  const { positions: transit } = siderealPositions(now);
  const saturnNowSign = Math.floor(transit.Saturn.lon / 30);
  const saturnFromMoon = ((saturnNowSign - planets.Moon.sign + 12) % 12) + 1;
  const sadeSatiPhase = { 12: "Rising phase (12th from Moon)", 1: "Peak phase (over the Moon)", 2: "Setting phase (2nd from Moon)" }[saturnFromMoon] || null;

  return {
    ayanamsa,
    lagna: { lon: ascLon, sign: lagnaSign, degree: formatDegrees(ascLon), nakshatra: nakshatraOf(ascLon) },
    planets,
    moonSign: planets.Moon.sign,
    sunSign: planets.Sun.sign,
    panchang: {
      tithi: `${paksha} ${tithiName}`,
      paksha,
      yoga: NITYA_YOGAS[Math.floor(norm360(sunLon + moonLon) / NAK_SPAN)],
      vaar: VAARS[localWeekday(date, utcOffsetMinutes ?? (longitude / 15) * 60)],
      nakshatra: planets.Moon.nakshatra
    },
    manglik: {
      fromLagna: manglikHouses.includes(marsHouseLagna),
      fromMoon: manglikHouses.includes(marsHouseMoon),
      marsHouseLagna,
      marsHouseMoon
    },
    sadeSati: { active: Boolean(sadeSatiPhase), phase: sadeSatiPhase, saturnSign: saturnNowSign },
    dasha: vimshottari(moonLon, date, now),
    yogas: detectYogas(planets, lagnaSign)
  };
}

// Civil weekday at the birth place (falls back to local mean time when no zone offset is known)
function localWeekday(date, offsetMinutes) {
  return new Date(date.getTime() + offsetMinutes * 60000).getUTCDay();
}

// Sign elements across Lagna + seven visible grahas (nodes excluded as shadow planets)
export function elementBalance(kundli) {
  const counts = { Fire: 0, Earth: 0, Air: 0, Water: 0 };
  counts[SIGNS[kundli.lagna.sign].element] += 2;
  for (const name of ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn"]) {
    counts[SIGNS[kundli.planets[name].sign].element] += name === "Moon" ? 2 : 1;
  }
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  return { counts, total, dominant: sorted[0][0], weakest: sorted[sorted.length - 1][0] };
}
