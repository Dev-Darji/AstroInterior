import React, { useState } from 'react';
import { Compass, CheckCircle2, AlertTriangle, Sparkles, MessageCircle, Palette } from 'lucide-react';
import { vastuDirections } from '../../data/vastuDirections';
import { getWhatsAppLink } from '../../data/siteConfig';

const C = 150;

export default function VastuCompass({ onSelectDirection }) {
  const [selectedCode, setSelectedCode] = useState("NE");
  const selected = vastuDirections.find((d) => d.code === selectedCode) || vastuDirections[1];

  const handleSelect = (code) => {
    setSelectedCode(code);
    if (onSelectDirection) onSelectDirection(code);
  };

  return (
    <div className="astro-panel relative overflow-hidden p-5 sm:p-8 md:p-10 text-[#E8E2D4]">
      <div className="absolute inset-0 astro-starfield opacity-50 pointer-events-none" aria-hidden="true" />
      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

        {/* Compass */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <div className="w-full max-w-[340px] aspect-square">
            <svg viewBox="0 0 300 300" className="w-full h-full" role="group" aria-label="Interactive 8-direction Vastu compass">
              <defs>
                <radialGradient id="vc-core" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#DEC695" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#DEC695" stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle cx={C} cy={C} r="140" fill="none" stroke="#DEC695" strokeWidth="0.8" opacity="0.4" />
              <circle cx={C} cy={C} r="125" fill="none" stroke="#DEC695" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.4" />
              {Array.from({ length: 72 }, (_, i) => {
                const a = (i * 5 - 90) * (Math.PI / 180);
                const len = i % 9 === 0 ? 10 : 4;
                return (
                  <line key={i} x1={C + 140 * Math.cos(a)} y1={C + 140 * Math.sin(a)} x2={C + (140 - len) * Math.cos(a)} y2={C + (140 - len) * Math.sin(a)}
                    stroke="#DEC695" strokeWidth="0.6" opacity="0.5" />
                );
              })}
              <line x1={C} y1="30" x2={C} y2="270" stroke="#DEC695" strokeWidth="0.5" opacity="0.25" />
              <line x1="30" y1={C} x2="270" y2={C} stroke="#DEC695" strokeWidth="0.5" opacity="0.25" />

              {/* Needle points at the selected direction */}
              <g style={{ transform: `rotate(${selected.angle}deg)`, transformOrigin: "150px 150px", transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)" }}>
                <polygon points={`${C},62 ${C + 7},${C} ${C},${C + 10} ${C - 7},${C}`} fill="#DEC695" opacity="0.9" />
                <polygon points={`${C},${C + 10} ${C + 7},${C} ${C},${C + 60} ${C - 7},${C}`} fill="#DEC695" opacity="0.2" />
              </g>
              <circle cx={C} cy={C} r="48" fill="url(#vc-core)" />
              <circle cx={C} cy={C} r="30" fill="#0d0d24" stroke="#DEC695" strokeWidth="1" />
              <text x={C} y={C - 2} textAnchor="middle" fontSize="7.5" fontWeight="700" letterSpacing="1.5" fill="#DEC695">BRAHMA</text>
              <text x={C} y={C + 9} textAnchor="middle" fontSize="7" letterSpacing="1" fill="#E8E2D4" opacity="0.7">STHAN</text>

              {vastuDirections.map((dir) => {
                const rad = ((dir.angle - 90) * Math.PI) / 180;
                const x = C + 100 * Math.cos(rad);
                const y = C + 100 * Math.sin(rad);
                const active = selectedCode === dir.code;
                return (
                  <g
                    key={dir.code}
                    className="cursor-pointer focus:outline-none"
                    tabIndex={0}
                    role="button"
                    aria-label={`${dir.name} — ${dir.sanskrit}`}
                    aria-pressed={active}
                    onClick={() => handleSelect(dir.code)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleSelect(dir.code);
                      }
                    }}
                  >
                    <circle cx={x} cy={y} r={active ? 19 : 15} fill={active ? "#DEC695" : "#141430"} stroke="#DEC695" strokeWidth={active ? 2 : 1} strokeOpacity={active ? 1 : 0.5} style={{ transition: "all 0.25s" }} />
                    <text x={x} y={y + 3.5} textAnchor="middle" fontSize={active ? 11 : 10} fontWeight="700" fill={active ? "#161514" : "#F5EFE2"} className="pointer-events-none select-none">
                      {dir.code}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="grid grid-cols-4 gap-2 mt-6 w-full max-w-sm">
            {vastuDirections.map((dir) => (
              <button key={dir.code} data-active={selectedCode === dir.code} onClick={() => handleSelect(dir.code)} className="astro-chip py-1.5 text-[11px] leading-tight">
                <span className="block font-semibold">{dir.code}</span>
                <span className="block opacity-70 truncate px-1">{dir.sanskrit}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Insight card */}
        <div key={selected.code} className="lg:col-span-6 astro-card p-5 sm:p-7 astro-fade-in">
          <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4 mb-5">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="astro-label">{selected.code} · Dik</span>
                <span className="text-[11px] px-2 py-0.5 rounded-full border border-[#DEC695]/30 text-[#DEC695]">{selected.element}</span>
              </div>
              <h3 className="font-serif text-3xl text-[#F5EFE2] mt-1">
                {selected.name} <span className="italic text-[#DEC695] font-light">({selected.sanskrit})</span>
              </h3>
              <p className="text-xs text-[#E8E2D4]/60 mt-0.5">Governed by {selected.ruler}</p>
            </div>
            <span className="w-11 h-11 shrink-0 rounded-xl border border-[#DEC695]/30 flex items-center justify-center text-[#DEC695]">
              <Compass size={22} />
            </span>
          </div>

          <p className="text-sm text-[#F5EFE2]/90 leading-relaxed mb-5">{selected.zoneMeaning}</p>

          <div className="mb-5">
            <h4 className="astro-label mb-2 flex items-center gap-1.5"><CheckCircle2 size={12} />Best placed here</h4>
            <div className="flex flex-wrap gap-1.5">
              {selected.idealFor.map((item) => (
                <span key={item} className="text-[11px] px-2.5 py-1 rounded-md border border-[#9FD6A8]/30 bg-[#9FD6A8]/10 text-[#CFEBD3]">{item}</span>
              ))}
            </div>
          </div>

          <div className="mb-5 space-y-2">
            <h4 className="astro-label flex items-center gap-1.5"><Sparkles size={12} />Interior solution</h4>
            <p className="text-xs text-[#E8E2D4]/75 leading-relaxed">{selected.interiorAdvice}</p>
            <p className="text-[11px] text-[#E8E2D4]/60"><strong className="text-[#F5EFE2]">Materials:</strong> {selected.materials.join(", ")}</p>
            <p className="text-[11px] text-[#E8E2D4]/60 flex items-start gap-1.5">
              <Palette size={12} className="text-[#DEC695] shrink-0 mt-0.5" />
              <span><strong className="text-[#F5EFE2]">Colours:</strong> {selected.colors.join(", ")}</span>
            </p>
          </div>

          <div className="mb-6 p-3 rounded-lg border border-[#F0A58A]/30 bg-[#F0A58A]/5 flex items-start gap-2.5">
            <AlertTriangle size={15} className="text-[#F0A58A] shrink-0 mt-0.5" />
            <p className="text-xs text-[#E8E2D4]/75"><span className="font-semibold text-[#F0A58A]">Avoid: </span>{selected.avoid.join(" · ")}</p>
          </div>

          <a
            href={getWhatsAppLink(`Hello, I would like to consult on the ${selected.name} (${selected.sanskrit}) zone of my home.`)}
            target="_blank" rel="noopener noreferrer" className="astro-btn w-full"
          >
            <MessageCircle size={16} />Ask about my {selected.name} zone
          </a>
        </div>
      </div>
    </div>
  );
}
