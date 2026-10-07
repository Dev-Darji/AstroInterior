import React, { useMemo, useState } from 'react';
import KundliGenerator from '../components/interactive/KundliGenerator';
import NumerologyCalculator from '../components/interactive/NumerologyCalculator';
import VastuCompass from '../components/interactive/VastuCompass';
import VastuFloorPlan from '../components/interactive/VastuFloorPlan';
import AISpaceAdvisor from '../components/interactive/AISpaceAdvisor';
import BeforeAfterSlider from '../components/interactive/BeforeAfterSlider';
import ZodiacWheel, { glyph } from '../components/astro/ZodiacWheel';
import { Sparkles, Compass, Wand2, Layers, Sliders, Hash } from 'lucide-react';
import { siderealPositions, nakshatraOf, norm360 } from '../lib/vedicAstro';
import { SIGNS, TITHIS } from '../lib/astroData';

export const TOOLS = [
  { id: "kundli", label: "Kundli", desc: "Vedic birth chart", icon: Sparkles },
  { id: "numerology", label: "Numerology", desc: "Mulank · Lo Shu · Kua", icon: Hash },
  { id: "compass", label: "Vastu Compass", desc: "8 directions decoded", icon: Compass },
  { id: "floorplan", label: "Floor Plan", desc: "Room-by-room Vastu", icon: Layers },
  { id: "advisor", label: "Space Advisor", desc: "Concept + Vastu check", icon: Wand2 },
  { id: "slider", label: "Transformations", desc: "Before & after", icon: Sliders }
];

function useSkyNow() {
  return useMemo(() => {
    const { positions } = siderealPositions(new Date());
    const elong = norm360(positions.Moon.lon - positions.Sun.lon);
    const t = Math.floor(elong / 12);
    const tithi = t === 14 ? "Purnima" : t === 29 ? "Amavasya" : TITHIS[t % 15];
    return {
      sun: SIGNS[Math.floor(positions.Sun.lon / 30)],
      moon: SIGNS[Math.floor(positions.Moon.lon / 30)],
      nakshatra: nakshatraOf(positions.Moon.lon).name,
      tithi: `${t < 15 ? "Shukla" : "Krishna"} ${tithi}`
    };
  }, []);
}

export default function ToolsView({ initialTool = "kundli", onToolChange }) {
  const [activeTool, setActiveTool] = useState(TOOLS.some((t) => t.id === initialTool) ? initialTool : "kundli");
  const sky = useSkyNow();

  const selectTool = (id) => {
    setActiveTool(id);
    if (onToolChange) onToolChange(id);
  };

  return (
    <div className="astro-page relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 astro-starfield pointer-events-none" aria-hidden="true" />

      {/* Hero */}
      <section className="relative pt-28 sm:pt-36 pb-10 sm:pb-14 px-4 sm:px-6 lg:px-8">
        <ZodiacWheel className="absolute left-1/2 top-24 sm:top-16 -translate-x-1/2 w-[520px] sm:w-[720px] max-w-none celestial-rotate opacity-25 pointer-events-none" />
        <div className="relative max-w-3xl mx-auto text-center space-y-5">
          <span className="astro-label hero-animate">The Astro Observatory</span>
          <h1 className="font-serif text-fluid-hero text-[#F5EFE2] font-light hero-animate hero-animate-delay-1">
            Read the sky. <br className="hidden sm:block" />
            <span className="italic text-gold-gradient">Design the space.</span>
          </h1>
          <p className="text-base sm:text-lg text-[#E8E2D4]/70 font-light leading-relaxed hero-animate hero-animate-delay-2">
            Precision Vedic astrology, numerology and Vastu tools — computed from real planetary positions and
            translated into the directions, colours and rooms that suit you.
          </p>

          {/* Sky right now */}
          <div className="hero-animate hero-animate-delay-3 inline-flex flex-wrap justify-center gap-x-5 gap-y-1.5 px-5 py-3 rounded-2xl border border-[#DEC695]/20 bg-[#0d0d24]/60 backdrop-blur text-xs text-[#E8E2D4]/75">
            <span className="text-[#DEC695] font-semibold uppercase tracking-[0.18em] text-[10px] w-full sm:w-auto">Sky right now</span>
            <span>☉ Sun in <strong className="text-[#F5EFE2]">{glyph(sky.sun.glyph)} {sky.sun.name}</strong></span>
            <span>☽ Moon in <strong className="text-[#F5EFE2]">{glyph(sky.moon.glyph)} {sky.moon.name}</strong></span>
            <span>Nakshatra <strong className="text-[#F5EFE2]">{sky.nakshatra}</strong></span>
            <span>Tithi <strong className="text-[#F5EFE2]">{sky.tithi}</strong></span>
          </div>
        </div>
      </section>

      {/* Tool selector */}
      <nav aria-label="Astro tools" className="sticky top-[var(--nav-h,68px)] z-20 py-3 bg-[#0a0a1f]/80 backdrop-blur-xl border-y border-[#DEC695]/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-auto no-scrollbar">
          <div className="flex lg:grid lg:grid-cols-6 gap-2 w-max lg:w-auto">
            {TOOLS.map((t) => {
              const Icon = t.icon;
              const active = activeTool === t.id;
              return (
                <button
                  key={t.id}
                  data-active={active}
                  aria-current={active ? "page" : undefined}
                  onClick={() => selectTool(t.id)}
                  className="astro-chip flex items-center gap-2.5 px-3.5 py-2.5 text-left min-w-[150px] lg:min-w-0"
                >
                  <Icon size={17} className={active ? "text-[#DEC695]" : "text-[#DEC695]/60"} />
                  <span className="min-w-0">
                    <span className="block text-[13px] font-semibold leading-tight">{t.label}</span>
                    <span className="block text-[10.5px] opacity-60 truncate">{t.desc}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Active tool */}
      <section className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 pb-28">
        <div key={activeTool} className="astro-fade-in">
          {activeTool === "kundli" && <KundliGenerator />}
          {activeTool === "numerology" && <NumerologyCalculator />}
          {activeTool === "compass" && <VastuCompass />}
          {activeTool === "floorplan" && <VastuFloorPlan />}
          {activeTool === "advisor" && <AISpaceAdvisor />}
          {activeTool === "slider" && <BeforeAfterSlider dark />}
        </div>
        <p className="text-[11px] text-center text-[#E8E2D4]/40 mt-12 max-w-2xl mx-auto leading-relaxed">
          Calculations use the Lahiri (Chitrapaksha) ayanamsa, whole-sign houses and the mean lunar node. Guidance is holistic
          and complements — never replaces — professional architectural, medical or financial advice.
        </p>
      </section>
    </div>
  );
}
