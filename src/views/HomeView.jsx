import React, { useEffect } from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { projects } from '../data/projects';
import { testimonials } from '../data/testimonials';
import { getWhatsAppLink } from '../data/siteConfig';

/* ─────────────────────────────────────────────────────────
   Delicate Sacred & Celestial SVG Artwork (Editorial & Pure)
   ───────────────────────────────────────────────────────── */

const StarField = () => {
  const stars = [
    [45, 120, 1.1, 0.35], [180, 65, 0.7, 0.22], [320, 200, 0.9, 0.3],
    [95, 380, 1.2, 0.25], [250, 450, 0.6, 0.18], [400, 100, 1.0, 0.35],
    [520, 300, 0.8, 0.25], [150, 550, 1.2, 0.2], [620, 180, 0.7, 0.3],
    [720, 420, 0.9, 0.2], [350, 650, 1.1, 0.25], [480, 520, 0.6, 0.35],
    [820, 120, 1.0, 0.22], [660, 600, 0.8, 0.25], [920, 280, 0.9, 0.3],
    [1060, 150, 0.7, 0.18], [1120, 400, 1.1, 0.25], [960, 550, 0.6, 0.2],
    [760, 50, 0.9, 0.25], [560, 720, 0.7, 0.18], [880, 480, 0.8, 0.2],
  ];
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 1200 800"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {stars.map(([x, y, r, o], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill="#DEC695" opacity={o} />
      ))}
    </svg>
  );
};

// Vedic Kundli & Astronomical Chart
const KundliChartSVG = ({ className = "" }) => (
  <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    {/* Concentric rings */}
    <circle cx="200" cy="200" r="192" stroke="#B89758" strokeWidth="0.5" opacity="0.15" />
    <circle cx="200" cy="200" r="160" stroke="#B89758" strokeWidth="0.5" opacity="0.25" />
    <circle cx="200" cy="200" r="118" stroke="#B89758" strokeWidth="0.4" opacity="0.18" />
    {/* Traditional Vedic diamond frame */}
    <rect x="70" y="70" width="260" height="260" stroke="#DEC695" strokeWidth="0.8" opacity="0.3" />
    <line x1="70" y1="70" x2="330" y2="330" stroke="#DEC695" strokeWidth="0.6" opacity="0.25" />
    <line x1="330" y1="70" x2="70" y2="330" stroke="#DEC695" strokeWidth="0.6" opacity="0.25" />
    <polygon points="200,70 330,200 200,330 70,200" stroke="#B89758" strokeWidth="0.7" opacity="0.35" />
    {/* 12 House Radial Rays */}
    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => {
      const r = (Math.PI * deg) / 180;
      return (
        <line
          key={deg}
          x1={200 + 118 * Math.cos(r)}
          y1={200 + 118 * Math.sin(r)}
          x2={200 + 192 * Math.cos(r)}
          y2={200 + 192 * Math.sin(r)}
          stroke="#DEC695"
          strokeWidth="0.4"
          opacity="0.2"
        />
      );
    })}
    {/* Planetary Bindu nodes */}
    <circle cx="200" cy="70" r="3" fill="#DEC695" opacity="0.6" />
    <circle cx="330" cy="200" r="3" fill="#DEC695" opacity="0.6" />
    <circle cx="200" cy="330" r="3" fill="#DEC695" opacity="0.6" />
    <circle cx="70" cy="200" r="3" fill="#DEC695" opacity="0.6" />
    <circle cx="200" cy="200" r="4.5" fill="#DEC695" opacity="0.85" />
    <circle cx="200" cy="200" r="14" stroke="#B89758" strokeWidth="0.5" opacity="0.3" />
  </svg>
);

// Vastu Architectural Compass
const VastuCompassSVG = ({ className = "" }) => (
  <svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <circle cx="150" cy="150" r="140" stroke="#B89758" strokeWidth="0.6" opacity="0.2" />
    <circle cx="150" cy="150" r="115" stroke="#B89758" strokeWidth="0.4" opacity="0.25" />
    <circle cx="150" cy="150" r="90" stroke="#DEC695" strokeWidth="0.6" strokeDasharray="3 3" opacity="0.3" />
    {/* 8 Cardinal & Ordinal Axis Lines */}
    <line x1="150" y1="15" x2="150" y2="285" stroke="#DEC695" strokeWidth="0.7" opacity="0.4" />
    <line x1="15" y1="150" x2="285" y2="150" stroke="#DEC695" strokeWidth="0.7" opacity="0.4" />
    <line x1="55" y1="55" x2="245" y2="245" stroke="#DEC695" strokeWidth="0.4" opacity="0.25" />
    <line x1="245" y1="55" x2="55" y2="245" stroke="#DEC695" strokeWidth="0.4" opacity="0.25" />
    {/* Compass Direction Labels */}
    <text x="150" y="32" textAnchor="middle" fill="#DEC695" fontSize="10" fontFamily="serif" fontWeight="600" opacity="0.85">N · KUBERA</text>
    <text x="150" y="278" textAnchor="middle" fill="#DEC695" fontSize="10" fontFamily="serif" fontWeight="600" opacity="0.85">S · YAMA</text>
    <text x="272" y="153" textAnchor="middle" fill="#DEC695" fontSize="10" fontFamily="serif" fontWeight="600" opacity="0.85">E · INDRA</text>
    <text x="28" y="153" textAnchor="middle" fill="#DEC695" fontSize="10" fontFamily="serif" fontWeight="600" opacity="0.85">W · VARUNA</text>
    <text x="238" y="70" textAnchor="middle" fill="#B89758" fontSize="8" fontFamily="serif" opacity="0.7">NE · ISHANYA</text>
    <text x="238" y="238" textAnchor="middle" fill="#B89758" fontSize="8" fontFamily="serif" opacity="0.7">SE · AGNI</text>
    <text x="65" y="238" textAnchor="middle" fill="#B89758" fontSize="8" fontFamily="serif" opacity="0.7">SW · NAIRITYA</text>
    <text x="65" y="70" textAnchor="middle" fill="#B89758" fontSize="8" fontFamily="serif" opacity="0.7">NW · VAYU</text>
    {/* Brahmasthan central node */}
    <circle cx="150" cy="150" r="3" fill="#DEC695" />
    <circle cx="150" cy="150" r="8" stroke="#DEC695" strokeWidth="0.5" opacity="0.4" />
  </svg>
);

// Numerology Geometric Vibration
const NumerologyGeometrySVG = ({ className = "" }) => (
  <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    {/* Concentric harmonic rings */}
    <circle cx="120" cy="120" r="105" stroke="#B89758" strokeWidth="0.5" opacity="0.18" />
    <circle cx="120" cy="120" r="85" stroke="#B89758" strokeWidth="0.5" opacity="0.25" />
    <circle cx="120" cy="120" r="65" stroke="#B89758" strokeWidth="0.4" strokeDasharray="2 2" opacity="0.3" />
    {/* Heptagon / 7-pointed Star Geometry */}
    {[0, 1, 2, 3, 4, 5, 6].map((i) => {
      const angle = (i * 2 * Math.PI) / 7 - Math.PI / 2;
      const x = 120 + 85 * Math.cos(angle);
      const y = 120 + 85 * Math.sin(angle);
      return <circle key={i} cx={x} cy={y} r="2" fill="#DEC695" opacity="0.6" />;
    })}
    {/* Sacred Numeral 7 in elegant serif */}
    <text x="120" y="142" textAnchor="middle" fill="#DEC695" fontSize="72" fontFamily="serif" fontWeight="300" opacity="0.85">
      7
    </text>
  </svg>
);

// Astro × Interior Convergence Overlay
const AstroInteriorOverlaySVG = () => (
  <svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
    {/* Celestial orbit */}
    <circle cx="250" cy="250" r="230" stroke="#DEC695" strokeWidth="0.5" opacity="0.22" />
    <circle cx="250" cy="250" r="185" stroke="#DEC695" strokeWidth="0.4" strokeDasharray="3 3" opacity="0.25" />
    <circle cx="250" cy="250" r="130" stroke="#DEC695" strokeWidth="0.5" opacity="0.2" />
    {/* Moon phase arcs */}
    <path d="M120 70 A140 140 0 0 1 250 20" stroke="#DEC695" strokeWidth="0.7" opacity="0.4" />
    <path d="M380 70 A140 140 0 0 0 250 20" stroke="#DEC695" strokeWidth="0.7" opacity="0.4" />
    {/* Cardinal spatial axes */}
    <line x1="250" y1="20" x2="250" y2="480" stroke="#DEC695" strokeWidth="0.6" opacity="0.3" />
    <line x1="20" y1="250" x2="480" y2="250" stroke="#DEC695" strokeWidth="0.6" opacity="0.3" />
    {/* Architectural grid overlay */}
    <rect x="170" y="170" width="160" height="160" stroke="#DEC695" strokeWidth="0.6" opacity="0.25" />
    <rect x="200" y="200" width="100" height="100" stroke="#DEC695" strokeWidth="0.5" opacity="0.3" />
    {/* Bindu center */}
    <circle cx="250" cy="250" r="3.5" fill="#DEC695" opacity="0.8" />
  </svg>
);


/* ─────────────────────────────────────────────────────────
   Home Page Component — Simplified to 7 Meaningful Sections
   ───────────────────────────────────────────────────────── */

export default function HomeView({ onNavigate }) {
  // Intersection Observer for graceful scroll reveals
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Curated 3 representative projects (Ahmedabad, Surat, Mumbai)
  const curatedProjects = projects.slice(0, 3);

  return (
    <div className="bg-[#FDFBF7] text-[#22201E]">

      {/* ═══════════════════════════════════════════════════════
          01. HERO — Celestial + Architectural Editorial
          Where Energy Meets Design
          ═══════════════════════════════════════════════════════ */}
      <section
        className="relative min-h-hero flex items-center overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, #070A14 0%, #0D1326 35%, #121524 70%, #161514 100%)'
        }}
      >
        {/* Subtle Constellation Star Field */}
        <StarField />

        {/* Slowly rotating Kundli chart geometry in background */}
        <div
          className="absolute left-[-5%] sm:left-[5%] lg:left-[8%] top-1/2 -translate-y-1/2 w-[380px] h-[380px] sm:w-[500px] sm:h-[500px] lg:w-[620px] lg:h-[620px] text-[#B89758] celestial-rotate pointer-events-none opacity-40 sm:opacity-50"
          aria-hidden="true"
        >
          <KundliChartSVG className="w-full h-full" />
        </div>

        {/* Architectural Image — Subtle right-hand ambient layer with celestial gradient blending */}
        <div className="absolute right-0 top-0 bottom-0 w-[55%] hidden lg:block pointer-events-none" aria-hidden="true">
          <img
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85"
            alt="Contemporary Indian living sanctuary with warm teak wood and Vastu spatial alignment"
            fetchPriority="high"
            className="w-full h-full object-cover opacity-45 mix-blend-luminosity filter contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070A14] via-[#0D1326]/90 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#161514] via-transparent to-[#070A14]/70" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-20 lg:pt-36 lg:pb-28">
          <div className="max-w-2xl space-y-6 sm:space-y-7">
            
            {/* Small Eyebrow */}
            <div className="hero-animate hero-animate-delay-1 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] backdrop-blur-md border border-[#B89758]/30">
              <span className="h-1.5 w-1.5 rounded-full bg-[#DEC695] animate-pulse" />
              <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.25em] text-[#DEC695]">
                Astrology • Vastu • Numerology • Interiors
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="hero-animate hero-animate-delay-2 font-serif text-fluid-hero font-normal text-[#FDFBF7] tracking-tight">
              Where Energy <br />
              <span className="italic font-light text-[#DEC695]">Meets Design.</span>
            </h1>

            {/* Short Supporting Line (Max 1–2 lines) */}
            <p className="hero-animate hero-animate-delay-3 text-base sm:text-lg font-light text-[#D8CEBE] leading-relaxed max-w-xl">
              Ancient wisdom, personal insight and thoughtful spaces — brought together.
            </p>

            {/* CTAs (Strictly 2 buttons) */}
            <div className="hero-animate hero-animate-delay-4 pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                onClick={() => scrollToSection('ancient-wisdom')}
                className="px-7 py-3.5 rounded-full bg-[#B89758] text-[#161514] font-semibold text-sm hover:bg-[#DEC695] active:scale-[0.98] transition-all shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-2"
              >
                Explore the Journey
                <ArrowRight size={16} />
              </button>
              <button
                onClick={() => onNavigate('consultation')}
                className="px-7 py-3.5 rounded-full bg-white/[0.07] text-[#FDFBF7] backdrop-blur-md border border-white/20 text-sm font-medium hover:bg-white/15 active:scale-[0.98] transition-all inline-flex items-center justify-center gap-2"
              >
                <MessageCircle size={16} className="text-[#DEC695]" />
                Consult With Us
              </button>
            </div>

          </div>
        </div>

        {/* Subtle Scroll Cue */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-1.5 hero-animate hero-animate-delay-5 opacity-60">
          <span className="text-[9px] uppercase tracking-[0.3em] text-[#DEC695]">Explore</span>
          <div className="w-4 h-7 rounded-full border border-[#B89758]/40 flex justify-center pt-1">
            <div className="w-1 h-1.5 bg-[#DEC695] rounded-full animate-bounce" />
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════
          02. ANCIENT WISDOM FOR MODERN LIFE
          Three Visual Pillars: Astrology · Numerology · Vastu
          ═══════════════════════════════════════════════════════ */}
      <section id="ancient-wisdom" className="py-24 sm:py-32 bg-[#FDFBF7] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header: Minimal & Editorial */}
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 reveal">
            <span className="editorial-subheading text-[#B89758]">Ancient Wisdom for Modern Life</span>
            <h2 className="font-serif text-fluid-h2 font-normal text-[#161514] mt-2.5 tracking-tight">
              Three Disciplines. <span className="italic font-light text-[#A85838]">One Harmonic Life.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#634832] mt-3.5 leading-relaxed max-w-xl mx-auto">
              Traditional frameworks to understand who you are, the rhythms you navigate, and the spaces you inhabit.
            </p>
          </div>

          {/* Three Visual Pillars — Editorial Composition (Not generic SaaS cards) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">

            {/* PILLAR 1: ASTROLOGY (Celestial Midnight Environment) */}
            <div
              onClick={() => onNavigate('astrology')}
              className="reveal reveal-delay-1 group rounded-3xl p-8 sm:p-10 flex flex-col justify-between cursor-pointer transition-all duration-300 relative overflow-hidden border border-[#1E2538] hover:border-[#B89758]/60 shadow-xl"
              style={{ background: 'linear-gradient(160deg, #0B0F1F 0%, #11172E 60%, #161D36 100%)' }}
            >
              {/* Subtle celestial background geometry */}
              <div className="absolute -top-10 -right-10 w-48 h-48 text-[#DEC695] celestial-rotate pointer-events-none opacity-20">
                <KundliChartSVG className="w-full h-full" />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono tracking-[0.25em] text-[#DEC695] font-semibold uppercase">
                    Pillar 01 • Stars
                  </span>
                  <div className="w-2 h-2 rounded-full bg-[#DEC695] animate-pulse" />
                </div>

                <h3 className="font-serif text-3xl sm:text-4xl text-[#FDFBF7] mt-6 tracking-tight group-hover:text-[#DEC695] transition-colors">
                  Astrology
                </h3>

                <p className="text-sm text-[#D8CEBE]/80 mt-3 leading-relaxed">
                  Discover yourself through the timeless language of the stars.
                </p>

                {/* 3 Small Micro-Items */}
                <div className="mt-8 space-y-2.5 pt-6 border-t border-white/10">
                  <div className="text-xs text-[#DEC695] flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-[#DEC695]" />
                    Birth Chart &amp; Kundli Analysis
                  </div>
                  <div className="text-xs text-[#DEC695] flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-[#DEC695]" />
                    Vedic Planetary Transits &amp; Dashas
                  </div>
                  <div className="text-xs text-[#DEC695] flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-[#DEC695]" />
                    Personal &amp; Career Guidance
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-4 flex items-center gap-2 text-xs font-semibold text-[#DEC695] group-hover:translate-x-1 transition-transform">
                <span>Explore Astrology</span>
                <ArrowRight size={14} />
              </div>
            </div>

            {/* PILLAR 2: NUMEROLOGY (Geometric Vibration & Numbers) */}
            <div
              onClick={() => onNavigate('numerology')}
              className="reveal reveal-delay-2 group rounded-3xl p-8 sm:p-10 flex flex-col justify-between cursor-pointer transition-all duration-300 relative overflow-hidden bg-[#F7F3EB] border border-[#EFE8DC] hover:border-[#B89758]/50 hover:bg-[#F3EFE5]"
            >
              {/* Subtle background sacred numeral */}
              <div className="absolute -bottom-6 -right-6 w-36 h-36 opacity-15 pointer-events-none">
                <NumerologyGeometrySVG className="w-full h-full" />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono tracking-[0.25em] text-[#B89758] font-semibold uppercase">
                    Pillar 02 • Numbers
                  </span>
                  <span className="text-xs font-serif text-[#634832] italic">1 • 3 • 7 • 9</span>
                </div>

                <h3 className="font-serif text-3xl sm:text-4xl text-[#161514] mt-6 tracking-tight group-hover:text-[#A85838] transition-colors">
                  Numerology
                </h3>

                <p className="text-sm text-[#634832] mt-3 leading-relaxed">
                  Understand your numbers. Unlocking personal resonance and harmonic cycles.
                </p>

                {/* 3 Small Micro-Items */}
                <div className="mt-8 space-y-2.5 pt-6 border-t border-[#EFE8DC]">
                  <div className="text-xs text-[#22201E] flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-[#B89758]" />
                    Life Path &amp; Destiny Frequencies
                  </div>
                  <div className="text-xs text-[#22201E] flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-[#B89758]" />
                    Name Resonance &amp; Numerical Tuning
                  </div>
                  <div className="text-xs text-[#22201E] flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-[#B89758]" />
                    Personal Year &amp; Cycle Timing
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-4 flex items-center gap-2 text-xs font-semibold text-[#161514] group-hover:translate-x-1 transition-transform">
                <span>Explore Numerology</span>
                <ArrowRight size={14} />
              </div>
            </div>

            {/* PILLAR 3: VASTU SHASTRA (Architectural & Spatial Flow) */}
            <div
              onClick={() => onNavigate('vastu')}
              className="reveal reveal-delay-3 group rounded-3xl p-8 sm:p-10 flex flex-col justify-between cursor-pointer transition-all duration-300 relative overflow-hidden bg-[#F7F3EB] border border-[#EFE8DC] hover:border-[#607261]/50 hover:bg-[#F3EFE5]"
            >
              {/* Subtle compass geometry in background */}
              <div className="absolute -bottom-8 -right-8 w-40 h-40 opacity-20 pointer-events-none">
                <VastuCompassSVG className="w-full h-full" />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono tracking-[0.25em] text-[#607261] font-semibold uppercase">
                    Pillar 03 • Space
                  </span>
                  <span className="text-xs font-serif text-[#607261]">16 Zones</span>
                </div>

                <h3 className="font-serif text-3xl sm:text-4xl text-[#161514] mt-6 tracking-tight group-hover:text-[#607261] transition-colors">
                  Vastu Shastra
                </h3>

                <p className="text-sm text-[#634832] mt-3 leading-relaxed">
                  Understand your space. Aligning natural directional energies without demolition.
                </p>

                {/* 3 Small Micro-Items */}
                <div className="mt-8 space-y-2.5 pt-6 border-t border-[#EFE8DC]">
                  <div className="text-xs text-[#22201E] flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-[#607261]" />
                    16-Zone Directional Energy Audit
                  </div>
                  <div className="text-xs text-[#22201E] flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-[#607261]" />
                    Elemental Balance (Earth, Water, Fire, Air, Space)
                  </div>
                  <div className="text-xs text-[#22201E] flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-[#607261]" />
                    Non-Destructive Spatial Rectification
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-4 flex items-center gap-2 text-xs font-semibold text-[#161514] group-hover:translate-x-1 transition-transform">
                <span>Explore Vastu</span>
                <ArrowRight size={14} />
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════
          03. WHERE ENERGY MEETS DESIGN (The Unique Differentiator)
          Celestial + Architectural Convergence
          ═══════════════════════════════════════════════════════ */}
      <section
        className="py-24 sm:py-32 relative overflow-hidden text-[#FDFBF7] border-y border-[#202738]"
        style={{
          background: 'linear-gradient(180deg, #090E1C 0%, #0F1426 50%, #090E1C 100%)'
        }}
      >
        <StarField />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Narrative Column */}
            <div className="lg:col-span-6 reveal space-y-6">
              <span className="editorial-subheading text-[#DEC695]">The Astro Interior Difference</span>
              
              <h2 className="font-serif text-fluid-h2 font-normal leading-tight text-[#FDFBF7] tracking-tight">
                Where Cosmic Alignment <br />
                <span className="italic font-light text-[#DEC695]">Guides Spatial Harmony.</span>
              </h2>

              <p className="text-sm sm:text-base text-[#D8CEBE] font-light leading-relaxed max-w-xl">
                We do not simply decorate rooms. We decode your personal birth chart, map the directional energy of your property, and craft contemporary interiors that feel intuitively aligned with your soul.
              </p>

              {/* 3 Sequential Points */}
              <div className="pt-4 space-y-4">
                <div className="flex items-start gap-4 p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                  <span className="font-mono text-xs font-semibold text-[#DEC695] mt-0.5">01</span>
                  <div>
                    <h4 className="font-serif text-lg text-[#FDFBF7]">Decode the Inhabitant</h4>
                    <p className="text-xs text-[#D8CEBE]/70 mt-1 leading-relaxed">
                      Your Vedic natal chart and numerology identify your elemental constitution, ruling planets, and natural rhythms.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                  <span className="font-mono text-xs font-semibold text-[#DEC695] mt-0.5">02</span>
                  <div>
                    <h4 className="font-serif text-lg text-[#FDFBF7]">Harmonize the Orientation</h4>
                    <p className="text-xs text-[#D8CEBE]/70 mt-1 leading-relaxed">
                      16-zone Vastu diagnostics establish proper room allocation, light corridors, and prana circulation.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                  <span className="font-mono text-xs font-semibold text-[#DEC695] mt-0.5">03</span>
                  <div>
                    <h4 className="font-serif text-lg text-[#FDFBF7]">Design the Sanctuary</h4>
                    <p className="text-xs text-[#D8CEBE]/70 mt-1 leading-relaxed">
                      Contemporary Indian interiors realized in natural stone, teak, and balanced illumination tailored to your energy.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('about')}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#DEC695] hover:text-white transition-colors"
                >
                  <span>Learn Our Philosophy</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>

            {/* Right Visual: Contemporary Indian Interior with Subtle Sacred Overlay */}
            <div className="lg:col-span-6 reveal relative">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-[#DEC695]/30 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85"
                  alt="Contemporary Indian penthouse interior with natural stone and Vastu spatial harmony"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                
                {/* Dark gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#090E1C] via-[#090E1C]/40 to-transparent" />

                {/* Subtle Sacred Geometry & Compass Overlay */}
                <div className="absolute inset-0 flex items-center justify-center p-6 pointer-events-none">
                  <div className="w-[85%] h-[85%] text-[#DEC695]">
                    <AstroInteriorOverlaySVG />
                  </div>
                </div>

                {/* Aesthetic label badge */}
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between backdrop-blur-md bg-black/40 px-4 py-2.5 rounded-xl border border-white/10 text-xs">
                  <span className="font-serif text-sm text-[#DEC695]">Energy × Architecture Convergence</span>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-[#D8CEBE]/70">N · E · S · W Alignment</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════
          04. SELECTED INTERIOR / SPACE WORK
          Curated 3 Projects (Ahmedabad · Surat · Mumbai)
          ═══════════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16 reveal">
            <div>
              <span className="editorial-subheading text-[#B89758]">Curated Spaces</span>
              <h2 className="font-serif text-fluid-h2 font-normal text-[#161514] mt-2 tracking-tight">
                Spaces Designed <span className="italic font-light text-[#A85838]">Around You.</span>
              </h2>
              <p className="text-sm text-[#634832] mt-2 max-w-lg">
                Thoughtful interiors shaped by people, space, and a deeper sense of harmony.
              </p>
            </div>
            
            <button
              onClick={() => onNavigate('interiors')}
              className="mt-4 sm:mt-0 text-xs font-bold uppercase tracking-wider text-[#161514] hover:text-[#A85838] inline-flex items-center gap-1.5 transition-colors group"
            >
              <span>View All 3 Projects</span>
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* 3 Curated Projects: 1 Hero Architectural Feature + 2 Asymmetric Pair */}
          <div className="space-y-8 sm:space-y-12">
            
            {/* Featured Project 1: Ahmedabad */}
            {curatedProjects[0] && (
              <div
                onClick={() => onNavigate('interiors')}
                className="reveal group cursor-pointer rounded-3xl overflow-hidden border border-[#EFE8DC] bg-[#F7F3EB] hover:shadow-xl transition-all"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-center">
                  <div className="lg:col-span-7 aspect-[16/10] sm:aspect-[16/9] overflow-hidden">
                    <img
                      src={curatedProjects[0].heroImage}
                      alt={curatedProjects[0].title}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                  <div className="lg:col-span-5 p-8 sm:p-12 space-y-4">
                    <span className="text-[10px] font-mono tracking-[0.2em] text-[#B89758] font-bold uppercase">
                      Featured • {curatedProjects[0].location}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#161514] tracking-tight group-hover:text-[#A85838] transition-colors">
                      {curatedProjects[0].title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#634832] leading-relaxed">
                      {curatedProjects[0].summary}
                    </p>
                    <div className="pt-2 flex flex-wrap gap-2 text-[11px] text-[#A85838] font-medium">
                      <span>{curatedProjects[0].style}</span>
                      <span>•</span>
                      <span>{curatedProjects[0].scope}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Asymmetric Pair: Projects 2 & 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {curatedProjects.slice(1, 3).map((p, idx) => (
                <div
                  key={p.id}
                  onClick={() => onNavigate('interiors')}
                  className={`reveal ${idx === 1 ? 'reveal-delay-1' : ''} group cursor-pointer rounded-3xl overflow-hidden border border-[#EFE8DC] bg-[#F7F3EB] hover:shadow-lg transition-all flex flex-col justify-between`}
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={p.heroImage}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6 sm:p-8 space-y-2.5">
                    <span className="text-[10px] font-mono tracking-[0.2em] text-[#B89758] font-bold uppercase">
                      {p.location} • {p.year}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl text-[#161514] tracking-tight group-hover:text-[#A85838] transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-xs text-[#634832] leading-relaxed line-clamp-2">
                      {p.summary}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════
          05. ABOUT / TRUST — A Different Way to Look at Space
          Merged Compact Integrity Section
          ═══════════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32 bg-[#F7F3EB] border-y border-[#EFE8DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center reveal space-y-6">
            
            <span className="editorial-subheading text-[#B89758]">About Our Practice</span>

            <h2 className="font-serif text-fluid-h2 font-normal text-[#161514] tracking-tight">
              A Different Way to <span className="italic font-light text-[#A85838]">Look at Space.</span>
            </h2>

            <p className="text-base sm:text-lg text-[#634832] font-light leading-relaxed max-w-2xl mx-auto">
              Astro Interior was founded on a simple truth: the spaces we inhabit are living extensions of ourselves. By uniting Vedic astrology, directional Vastu principles, and modern interior architecture, we create homes that nurture peace, clarity, and enduring well-being.
            </p>

            {/* 3 Authentic Trust Anchors (No inflated claims or fake counters) */}
            <div className="pt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-left">
              <div className="p-6 rounded-2xl bg-[#FDFBF7] border border-[#EFE8DC]">
                <span className="text-xs font-mono font-bold tracking-wider text-[#B89758] uppercase block">
                  Tradition
                </span>
                <h4 className="font-serif text-lg text-[#161514] mt-2">Vedic Foundation</h4>
                <p className="text-xs text-[#634832] mt-1.5 leading-relaxed">
                  Thoughtful guidance rooted in established astronomical and spatial treatises.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#FDFBF7] border border-[#EFE8DC]">
                <span className="text-xs font-mono font-bold tracking-wider text-[#607261] uppercase block">
                  Experience
                </span>
                <h4 className="font-serif text-lg text-[#161514] mt-2">Personalized Care</h4>
                <p className="text-xs text-[#634832] mt-1.5 leading-relaxed">
                  Bespoke consultations tailored to the real lifestyle and natal rhythms of each client.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#FDFBF7] border border-[#EFE8DC]">
                <span className="text-xs font-mono font-bold tracking-wider text-[#A85838] uppercase block">
                  Approach
                </span>
                <h4 className="font-serif text-lg text-[#161514] mt-2">Contemporary Design</h4>
                <p className="text-xs text-[#634832] mt-1.5 leading-relaxed">
                  Ancient wisdom interpreted for contemporary aesthetics — elegant, peaceful and uncluttered.
                </p>
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={() => onNavigate('about')}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#161514] border-b border-[#161514] pb-0.5 hover:text-[#A85838] hover:border-[#A85838] transition-colors"
              >
                <span>Discover Our Story</span>
                <ArrowRight size={14} />
              </button>
            </div>

          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════
          06. TESTIMONIALS / CLIENT EXPERIENCES
          2–3 Authentic Voices with Generous Whitespace
          ═══════════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 reveal">
            <span className="editorial-subheading text-[#B89758]">Client Experiences</span>
            <h2 className="font-serif text-fluid-h2 font-normal text-[#161514] mt-2 tracking-tight">
              Words From <span className="italic font-light text-[#A85838]">Our Inhabitants.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div
                key={t.id}
                className={`reveal ${idx > 0 ? `reveal-delay-${idx}` : ''} p-8 sm:p-10 rounded-3xl bg-[#F7F3EB] border border-[#EFE8DC] flex flex-col justify-between`}
              >
                <div>
                  <span className="font-serif text-5xl text-[#B89758]/50 leading-none block select-none mb-2">
                    &ldquo;
                  </span>
                  <p className="text-xs sm:text-sm text-[#22201E] leading-relaxed italic">
                    {t.quote}
                  </p>
                </div>

                <div className="pt-6 mt-8 border-t border-[#EFE8DC]">
                  <h4 className="font-serif text-lg text-[#161514]">{t.client}</h4>
                  <p className="text-xs text-[#A85838] font-medium mt-0.5">{t.service}</p>
                  <p className="text-[11px] text-[#634832] mt-0.5">{t.property} · {t.city}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════
          07. FINAL CTA — Begin Your Journey
          Dark Celestial Sanctuary
          ═══════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="reveal rounded-3xl p-8 sm:p-16 text-[#FDFBF7] border border-[#2A334A] relative overflow-hidden text-center shadow-2xl"
            style={{
              background: 'linear-gradient(145deg, #070B18 0%, #0F172E 50%, #151A2C 100%)'
            }}
          >
            {/* Subtle background sacred chart */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] text-[#DEC695] celestial-rotate pointer-events-none opacity-10">
              <KundliChartSVG className="w-full h-full" />
            </div>

            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <span className="editorial-subheading text-[#DEC695]">Astro Interior Studio</span>

              <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#FDFBF7] tracking-tight leading-tight">
                Begin Your Journey.
              </h2>

              <p className="text-sm sm:text-base text-[#D8CEBE] font-light leading-relaxed max-w-lg mx-auto">
                Whether you seek personal astrology guidance, a Vastu space audit, or a complete interior transformation — our studio is here for you.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => onNavigate('consultation')}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#B89758] text-[#161514] font-semibold text-sm hover:bg-[#DEC695] active:scale-[0.98] transition-all shadow-lg hover:shadow-xl"
                >
                  Book a Consultation
                </button>
                <a
                  href={getWhatsAppLink("Hello! I would like to begin my consultation journey with Astro Interior.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#25D366] text-white font-medium text-sm hover:bg-[#20b857] active:scale-[0.98] transition-all inline-flex items-center justify-center gap-2 shadow"
                >
                  <MessageCircle size={16} />
                  <span>WhatsApp Us</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
