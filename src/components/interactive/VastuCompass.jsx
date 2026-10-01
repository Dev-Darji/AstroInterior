import React, { useState } from 'react';
import { Compass, CheckCircle2, AlertTriangle, Sparkles, MessageCircle, ChevronRight, Layers } from 'lucide-react';
import { vastuDirections } from '../../data/vastuDirections';
import { getWhatsAppLink } from '../../data/siteConfig';

export default function VastuCompass({ onSelectDirection }) {
  const [selectedCode, setSelectedCode] = useState("NE");
  const selected = vastuDirections.find((d) => d.code === selectedCode) || vastuDirections[1];

  const handleSelect = (code) => {
    setSelectedCode(code);
    if (onSelectDirection) onSelectDirection(code);
  };

  return (
    <div className="bg-[#F7F3EB] border border-[#EFE8DC] rounded-3xl p-6 md:p-10 shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Column: Visual Compass SVG */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center">
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 flex items-center justify-center">
            {/* Outer decorative ring (Static & Architectural) */}
            <div className="absolute inset-0 rounded-full border border-[#D8CEBE] border-dashed"></div>
            <div className="absolute inset-3 rounded-full border border-[#B89758]/25"></div>
            
            {/* Compass Base SVG */}
            <svg viewBox="0 0 300 300" className="w-full h-full transform transition-transform duration-500" aria-label="Interactive 8-Direction Vastu Compass">
              {/* Concentric circles */}
              <circle cx="150" cy="150" r="135" fill="none" stroke="#E0D3C1" strokeWidth="1" />
              <circle cx="150" cy="150" r="110" fill="none" stroke="#D8CEBE" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="150" cy="150" r="45" fill="#FDFBF7" stroke="#B89758" strokeWidth="1.5" />

              {/* Cardinal axis crosshairs */}
              <line x1="150" y1="18" x2="150" y2="282" stroke="#D8CEBE" strokeWidth="1" />
              <line x1="18" y1="150" x2="282" y2="150" stroke="#D8CEBE" strokeWidth="1" />
              <line x1="56" y1="56" x2="244" y2="244" stroke="#EFE8DC" strokeWidth="1" />
              <line x1="56" y1="244" x2="244" y2="56" stroke="#EFE8DC" strokeWidth="1" />

              {/* 8 Direction Markers */}
              {vastuDirections.map((dir) => {
                // Calculate position on circumference
                const rad = ((dir.angle - 90) * Math.PI) / 180;
                const x = 150 + 95 * Math.cos(rad);
                const y = 150 + 95 * Math.sin(rad);
                const isSelected = selectedCode === dir.code;

                return (
                  <g 
                    key={dir.code} 
                    className="cursor-pointer transition-all group focus:outline-none"
                    tabIndex={0}
                    role="button"
                    aria-label={`${dir.name} - ${dir.sanskrit} direction`}
                    aria-pressed={isSelected}
                    onClick={() => handleSelect(dir.code)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleSelect(dir.code);
                      }
                    }}
                  >
                    {/* Direction Node */}
                    <circle
                      cx={x}
                      cy={y}
                      r={isSelected ? "20" : "16"}
                      fill={isSelected ? "#161514" : "#FDFBF7"}
                      stroke={isSelected ? "#B89758" : "#D8CEBE"}
                      strokeWidth={isSelected ? "2.5" : "1.5"}
                      className="transition-all duration-200 group-hover:scale-110"
                    />
                    <text
                      x={x}
                      y={y + 4}
                      textAnchor="middle"
                      fontSize={isSelected ? "11" : "9.5"}
                      fontWeight="600"
                      fill={isSelected ? "#FDFBF7" : "#22201E"}
                      className="select-none pointer-events-none transition-colors"
                    >
                      {dir.code}
                    </text>
                  </g>
                );
              })}

              {/* Center Brahmasthan Label */}
              <text x="150" y="146" textAnchor="middle" fontSize="9" fontWeight="700" fill="#B89758" letterSpacing="1">
                BRAHMA
              </text>
              <text x="150" y="158" textAnchor="middle" fontSize="7.5" fill="#634832" letterSpacing="0.5">
                STHAN
              </text>
            </svg>

            {/* Subtle pointer needle */}
            <div 
              className="absolute pointer-events-none w-1 h-28 sm:h-32 bg-gradient-to-t from-transparent via-[#A85838]/40 to-[#A85838] rounded-full transition-transform duration-500 origin-bottom"
              style={{ transform: `rotate(${selected.angle}deg)`, bottom: '50%' }}
            />
          </div>

          {/* Quick Direction Selector Pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-6 max-w-sm">
            {vastuDirections.map((dir) => (
              <button
                key={dir.code}
                onClick={() => handleSelect(dir.code)}
                className={`px-3 py-1 text-xs rounded-full border transition-all ${
                  selectedCode === dir.code
                    ? "bg-[#161514] text-[#FDFBF7] border-[#161514] font-semibold shadow-sm"
                    : "bg-[#FDFBF7] text-[#634832] border-[#D8CEBE] hover:border-[#B89758]"
                }`}
              >
                {dir.code} • {dir.sanskrit}
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Directional Insight Card */}
        <div className="lg:col-span-6 bg-[#FDFBF7] border border-[#EFE8DC] rounded-2xl p-6 sm:p-8 shadow-sm">
          {/* Header */}
          <div className="flex items-start justify-between border-b border-[#EFE8DC] pb-4 mb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="editorial-subheading text-[#B89758]">
                  {selected.code} Cardinal Orientation
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#EFE8DC] text-[#634832] font-medium">
                  {selected.element}
                </span>
              </div>
              <h3 className="font-serif text-3xl text-[#161514] mt-1 font-normal">
                {selected.name} <span className="text-[#A85838] italic font-light">({selected.sanskrit})</span>
              </h3>
              <p className="text-xs text-[#634832] mt-0.5">
                Governed by: <strong className="text-[#161514]">{selected.ruler}</strong>
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#F7F3EB] border border-[#D8CEBE] flex items-center justify-center text-[#B89758]">
              <Compass size={24} />
            </div>
          </div>

          {/* Core Meaning */}
          <div className="mb-5 p-3.5 rounded-xl bg-[#F7F3EB]/70 border border-[#EFE8DC] text-xs leading-relaxed text-[#161514]">
            <p className="font-medium text-[#A85838] mb-0.5 uppercase tracking-wider text-[10px]">Zone Significance</p>
            <p className="text-sm font-light text-[#22201E]">{selected.zoneMeaning}</p>
          </div>

          {/* Auspicious Placement */}
          <div className="mb-5 space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#161514] flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-[#607261]" />
              <span>Recommended Placements</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {selected.idealFor.map((item, idx) => (
                <span key={idx} className="text-xs px-3 py-1 rounded-md bg-[#607261]/10 text-[#404c41] font-medium border border-[#607261]/20">
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Interior Design Recommendation */}
          <div className="mb-5 space-y-1.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#161514] flex items-center gap-1.5">
              <Sparkles size={14} className="text-[#B89758]" />
              <span>Interior Architecture Solution</span>
            </h4>
            <p className="text-xs leading-relaxed text-[#634832]">
              {selected.interiorAdvice}
            </p>
            <div className="pt-1 text-[11px] text-[#634832]/80">
              <strong className="text-[#161514]">Harmonious Materials:</strong> {selected.materials.join(", ")}
            </div>
          </div>

          {/* Things to Avoid */}
          <div className="mb-6 p-3 rounded-lg bg-[#A85838]/5 border border-[#A85838]/20 flex items-start gap-2.5">
            <AlertTriangle size={15} className="text-[#A85838] shrink-0 mt-0.5" />
            <div className="text-xs text-[#634832]">
              <span className="font-semibold text-[#A85838]">Avoid Here: </span>
              {selected.avoid.join(" • ")}
            </div>
          </div>

          {/* Action CTA */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <a
              href={getWhatsAppLink(`Hello, I would like to consult on the ${selected.name} (${selected.sanskrit}) orientation of my home.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#161514] text-[#FDFBF7] rounded-xl text-xs font-medium hover:bg-[#634832] transition-colors"
            >
              <MessageCircle size={15} className="text-[#25D366]" />
              <span>Ask About My {selected.name} Direction</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
