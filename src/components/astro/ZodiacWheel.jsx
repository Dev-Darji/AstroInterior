import React from 'react';
import { SIGNS } from '../../lib/astroData';

// U+FE0E forces text (not emoji) presentation of zodiac glyphs
export const glyph = (g) => `${g}︎`;

export default function ZodiacWheel({ className = "" }) {
  const c = 250;
  return (
    <svg viewBox="0 0 500 500" fill="none" className={className} aria-hidden="true">
      <circle cx={c} cy={c} r="240" stroke="#DEC695" strokeWidth="0.8" opacity="0.35" />
      <circle cx={c} cy={c} r="200" stroke="#DEC695" strokeWidth="0.6" opacity="0.3" />
      <circle cx={c} cy={c} r="150" stroke="#DEC695" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.3" />
      <circle cx={c} cy={c} r="90" stroke="#DEC695" strokeWidth="0.5" opacity="0.25" />

      {/* 27 nakshatra ticks */}
      {Array.from({ length: 27 }, (_, i) => {
        const a = (i * 360) / 27 * (Math.PI / 180);
        return (
          <line key={`n${i}`} x1={c + 200 * Math.cos(a)} y1={c + 200 * Math.sin(a)} x2={c + 188 * Math.cos(a)} y2={c + 188 * Math.sin(a)}
            stroke="#DEC695" strokeWidth="0.6" opacity="0.45" />
        );
      })}

      {SIGNS.map((s, i) => {
        const start = (i * 30 - 90) * (Math.PI / 180);
        const mid = (i * 30 + 15 - 90) * (Math.PI / 180);
        return (
          <g key={s.name}>
            <line x1={c + 200 * Math.cos(start)} y1={c + 200 * Math.sin(start)} x2={c + 240 * Math.cos(start)} y2={c + 240 * Math.sin(start)}
              stroke="#DEC695" strokeWidth="0.7" opacity="0.4" />
            <text x={c + 220 * Math.cos(mid)} y={c + 220 * Math.sin(mid)} textAnchor="middle" dominantBaseline="central"
              fill="#DEC695" fontSize="17" opacity="0.8">
              {glyph(s.glyph)}
            </text>
          </g>
        );
      })}

      <polygon points={`${c},${c - 150} ${c + 150},${c} ${c},${c + 150} ${c - 150},${c}`} stroke="#DEC695" strokeWidth="0.6" opacity="0.3" />
      <rect x={c - 106} y={c - 106} width="212" height="212" stroke="#DEC695" strokeWidth="0.5" opacity="0.2" />
      <circle cx={c} cy={c} r="4" fill="#DEC695" opacity="0.9" />
    </svg>
  );
}
