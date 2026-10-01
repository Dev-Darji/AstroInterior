import React from 'react';

export default function AstroLogo({ light = false, size = "default", className = "" }) {
  const isSmall = size === "small";
  const iconSize = isSmall ? 28 : 36;

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* AstroInterior Celestial & Architectural Sacred Emblem */}
      <div 
        className="relative shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
        style={{ width: iconSize, height: iconSize }}
      >
        <svg viewBox="0 0 44 44" className="w-full h-full drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Base rounded jewel tile with luxury metallic border */}
          <rect width="44" height="44" rx="10" fill={light ? "#0A0E1C" : "#161514"} />
          <rect
            x="0.75"
            y="0.75"
            width="42.5"
            height="42.5"
            rx="9.25"
            stroke={light ? "#DEC695" : "#B89758"}
            strokeWidth="1.2"
            strokeOpacity={light ? "0.45" : "0.35"}
          />

          {/* Celestial orbital ring */}
          <circle cx="22" cy="22" r="16.5" stroke="#DEC695" strokeWidth="0.75" strokeOpacity="0.35" />

          {/* Vastu 4-Directional Sacred Diamond (Rhombus 45°) */}
          <polygon
            points="22,6.5 37.5,22 22,37.5 6.5,22"
            stroke={light ? "#DEC695" : "#B89758"}
            strokeWidth="1.3"
            strokeLinejoin="round"
            fill="none"
          />

          {/* Primary Cardinal Cross (North-South & East-West) */}
          <line x1="22" y1="8" x2="22" y2="36" stroke="#DEC695" strokeWidth="1.2" strokeLinecap="round" opacity="0.9" />
          <line x1="8" y1="22" x2="36" y2="22" stroke="#DEC695" strokeWidth="1.2" strokeLinecap="round" opacity="0.9" />

          {/* Ordinal Intercardinal Rays (45° axes) */}
          <line x1="13.5" y1="13.5" x2="30.5" y2="30.5" stroke="#B89758" strokeWidth="0.8" strokeOpacity="0.55" />
          <line x1="30.5" y1="13.5" x2="13.5" y2="30.5" stroke="#B89758" strokeWidth="0.8" strokeOpacity="0.55" />

          {/* Inner Sanctum Architectural Core */}
          <circle
            cx="22"
            cy="22"
            r="6.5"
            stroke="#DEC695"
            strokeWidth="0.9"
            fill={light ? "#11172E" : "#22201E"}
            fillOpacity="0.9"
          />

          {/* Central Prana Bindu (Luminous golden core) */}
          <circle cx="22" cy="22" r="2.4" fill="#DEC695" />

          {/* Cardinal Apex Bindus */}
          <circle cx="22" cy="6.5" r="1.3" fill="#DEC695" />
          <circle cx="37.5" cy="22" r="1.3" fill="#DEC695" />
          <circle cx="22" cy="37.5" r="1.3" fill="#DEC695" />
          <circle cx="6.5" cy="22" r="1.3" fill="#DEC695" />
        </svg>
      </div>

      {/* Brand Typography — Unified Serif Style with Capitalized 'Astro' and 'Interior' */}
      <div className="flex flex-col">
        <div className="flex items-baseline">
          {/* Astro */}
          <span 
            className={`font-serif font-semibold tracking-[-0.01em] transition-colors ${
              isSmall ? "text-lg" : "text-xl sm:text-[22px]"
            } ${light ? "text-[#FDFBF7]" : "text-[#161514]"}`}
          >
            Astro
          </span>

          {/* Interior (Same font family, weight and upright style — distinct accent color) */}
          <span 
            className={`font-serif font-semibold tracking-[-0.01em] transition-colors ml-1 ${
              isSmall ? "text-lg" : "text-xl sm:text-[22px]"
            } ${light ? "text-[#DEC695]" : "text-[#A85838]"}`}
          >
            Interior
          </span>
        </div>

        {!isSmall && (
          <span 
            className={`text-[8.5px] uppercase tracking-[0.22em] font-semibold -mt-0.5 transition-colors ${
              light ? "text-[#D8CEBE]" : "text-[#634832]"
            }`}
          >
            Astrology • Vastu • Architecture
          </span>
        )}
      </div>
    </div>
  );
}
