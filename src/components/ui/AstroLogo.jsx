import React from 'react';

export default function AstroLogo({ light = false, size = "default", className = "" }) {
  const isSmall = size === "small";
  const iconSize = isSmall ? 26 : 34;

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* AstroInterior Celestial Arch Emblem */}
      <div 
        className="relative shrink-0 flex items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105"
        style={{ width: iconSize, height: iconSize }}
      >
        <svg viewBox="0 0 40 40" className="w-full h-full" fill="none">
          {/* Rounded background tile */}
          <rect width="40" height="40" rx="9" fill={light ? "#22201E" : "#161514"} />
          
          {/* Outer subtle gold diamond */}
          <path 
            d="M20 5 L35 20 L20 35 L5 20 Z" 
            stroke="#B89758" 
            strokeWidth="1.2" 
            strokeOpacity="0.5" 
          />

          {/* Architectural Archway (Interior sanctuary) */}
          <path 
            d="M13 32 V19 C13 14 16 11 20 11 C24 11 27 14 27 19 V32" 
            stroke="#DEC695" 
            strokeWidth="1.8" 
            strokeLinecap="round" 
          />

          {/* Celestial Cardinal Star (Astrology & Vastu) */}
          <path 
            d="M20 13 V25 M14 19 H26" 
            stroke="#B89758" 
            strokeWidth="1.4" 
            strokeLinecap="round" 
          />
          
          {/* Central Prana Node */}
          <circle cx="20" cy="19" r="2.2" fill="#DEC695" />
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <div className="flex items-baseline">
          <span 
            className={`font-serif tracking-tight font-semibold ${
              isSmall ? "text-lg" : "text-xl sm:text-2xl"
            } ${light ? "text-[#FDFBF7]" : "text-[#161514]"}`}
          >
            Astro
          </span>
          <span 
            className={`font-serif tracking-wide font-normal italic ml-0.5 ${
              isSmall ? "text-lg" : "text-xl sm:text-2xl"
            } text-[#B89758]`}
          >
            Interior
          </span>
        </div>
        {!isSmall && (
          <span 
            className={`text-[8.5px] uppercase tracking-[0.24em] font-medium -mt-0.5 ${
              light ? "text-[#D8CEBE]/70" : "text-[#634832]/85"
            }`}
          >
            Astrology • Vastu • Architecture
          </span>
        )}
      </div>
    </div>
  );
}
