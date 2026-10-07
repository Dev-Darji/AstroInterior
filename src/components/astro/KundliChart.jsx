import React from 'react';
import { PLANETS, PLANET_ORDER, SIGNS } from '../../lib/astroData';

const GOLD = "#DEC695";
const MALEFIC = new Set(["Sun", "Mars", "Saturn", "Rahu", "Ketu"]);

function PlanetLabel({ planet, x, y }) {
  const fill = MALEFIC.has(planet.name) ? "#F0A58A" : "#F5EFE2";
  return (
    <text x={x} y={y} textAnchor="middle" fontSize="15" fontWeight="600" fill={fill}>
      {PLANETS[planet.name].abbr}
      {planet.retrograde && planet.name !== "Rahu" && planet.name !== "Ketu" && (
        <tspan fontSize="8" dy="-5" fill={GOLD}>R</tspan>
      )}
    </text>
  );
}

// Rows of planet abbreviations centred on (cx, cy)
function PlanetStack({ planets, cx, cy, perRow = 3, lineHeight = 18, spacing = 32 }) {
  const rows = [];
  for (let i = 0; i < planets.length; i += perRow) rows.push(planets.slice(i, i + perRow));
  const top = cy - ((rows.length - 1) * lineHeight) / 2;
  return rows.map((row, r) =>
    row.map((p, i) => (
      <PlanetLabel key={p.name} planet={p} x={cx + (i - (row.length - 1) / 2) * spacing} y={top + r * lineHeight + 4} />
    ))
  );
}

// North Indian layout: houses are fixed, signs rotate with the Lagna
const NORTH_HOUSES = [
  { center: [200, 92], num: [200, 178], perRow: 3 },
  { center: [100, 36], num: [100, 82], perRow: 3 },
  { center: [36, 100], num: [80, 100], perRow: 1 },
  { center: [100, 200], num: [178, 200], perRow: 2 },
  { center: [36, 300], num: [80, 300], perRow: 1 },
  { center: [100, 364], num: [100, 320], perRow: 3 },
  { center: [200, 300], num: [200, 224], perRow: 3 },
  { center: [300, 364], num: [300, 320], perRow: 3 },
  { center: [364, 300], num: [320, 300], perRow: 1 },
  { center: [300, 200], num: [222, 200], perRow: 2 },
  { center: [364, 100], num: [320, 100], perRow: 1 },
  { center: [300, 36], num: [300, 82], perRow: 3 }
];

function NorthChart({ kundli }) {
  const byHouse = Array.from({ length: 12 }, () => []);
  for (const name of PLANET_ORDER) byHouse[kundli.planets[name].house - 1].push(kundli.planets[name]);

  return (
    <svg viewBox="-4 -4 408 408" className="w-full h-auto" role="img" aria-label="North Indian Rasi chart">
      <rect x="0" y="0" width="400" height="400" fill="rgba(7,7,26,0.5)" stroke={GOLD} strokeWidth="1.5" />
      <line x1="0" y1="0" x2="400" y2="400" stroke={GOLD} strokeWidth="1" opacity="0.7" />
      <line x1="400" y1="0" x2="0" y2="400" stroke={GOLD} strokeWidth="1" opacity="0.7" />
      <polygon points="200,0 400,200 200,400 0,200" fill="none" stroke={GOLD} strokeWidth="1" opacity="0.7" />
      <polygon points="200,0 300,100 200,200 100,100" fill="rgba(222,198,149,0.07)" />

      {NORTH_HOUSES.map((h, i) => {
        const sign = (kundli.lagna.sign + i) % 12;
        const planets = byHouse[i];
        const [cx, cy] = h.center;
        return (
          <g key={i}>
            <text x={h.num[0]} y={h.num[1] + 4} textAnchor="middle" fontSize="13" fill={GOLD} opacity="0.8">{sign + 1}</text>
            {i === 0 && <text x="200" y="40" textAnchor="middle" fontSize="10" letterSpacing="2" fill={GOLD} fontWeight="700">ASC</text>}
            <PlanetStack planets={planets} cx={cx} cy={i === 0 ? cy + 12 : cy} perRow={h.perRow} spacing={h.perRow === 1 ? 0 : 32} />
          </g>
        );
      })}
    </svg>
  );
}

// South Indian layout: signs are fixed, the Lagna is marked
const SOUTH_CELLS = [
  [11, 0, 0], [0, 1, 0], [1, 2, 0], [2, 3, 0],
  [10, 0, 1], [3, 3, 1],
  [9, 0, 2], [4, 3, 2],
  [8, 0, 3], [7, 1, 3], [6, 2, 3], [5, 3, 3]
];

function SouthChart({ kundli, name }) {
  const bySign = Array.from({ length: 12 }, () => []);
  for (const p of PLANET_ORDER) bySign[kundli.planets[p].sign].push(kundli.planets[p]);

  return (
    <svg viewBox="-4 -4 408 408" className="w-full h-auto" role="img" aria-label="South Indian Rasi chart">
      <rect x="0" y="0" width="400" height="400" fill="rgba(7,7,26,0.5)" stroke={GOLD} strokeWidth="1.5" />
      {SOUTH_CELLS.map(([sign, col, row]) => {
        const x = col * 100;
        const y = row * 100;
        const isLagna = sign === kundli.lagna.sign;
        return (
          <g key={sign}>
            <rect x={x} y={y} width="100" height="100" fill={isLagna ? "rgba(222,198,149,0.09)" : "none"} stroke={GOLD} strokeWidth="1" opacity="0.8" />
            {isLagna && <line x1={x} y1={y + 22} x2={x + 22} y2={y} stroke={GOLD} strokeWidth="1.2" />}
            <text x={x + 94} y={y + 15} textAnchor="end" fontSize="12" fill={GOLD} opacity="0.75">{SIGNS[sign].name.slice(0, 3)}</text>
            {isLagna && <text x={x + 50} y={y + 92} textAnchor="middle" fontSize="9" letterSpacing="1.5" fill={GOLD} fontWeight="700">ASC</text>}
            <PlanetStack planets={bySign[sign]} cx={x + 50} cy={y + 54} perRow={3} spacing={30} />
          </g>
        );
      })}
      <text x="200" y="185" textAnchor="middle" fontSize="13" letterSpacing="3" fill={GOLD} fontWeight="600">RASI · D1</text>
      <text x="200" y="212" textAnchor="middle" fontSize="18" fill="#F5EFE2" fontFamily="Cormorant Garamond, serif">
        {name.length > 18 ? `${name.slice(0, 17)}…` : name}
      </text>
    </svg>
  );
}

export default function KundliChart({ kundli, style, name }) {
  return style === "south" ? <SouthChart kundli={kundli} name={name} /> : <NorthChart kundli={kundli} />;
}
