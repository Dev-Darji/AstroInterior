import React, { useEffect } from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import { projects } from '../data/projects';
import { testimonials } from '../data/testimonials';
import { getWhatsAppLink } from '../data/siteConfig';
import FAQAccordion from '../components/ui/FAQAccordion';

/* ────────────────────────────────────────────────────
   Celestial SVG Components — used strategically
   ──────────────────────────────────────────────────── */

const BirthChartSVG = ({ className = "" }) => (
  <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    {/* Three concentric orbital rings */}
    <circle cx="200" cy="200" r="190" stroke="currentColor" strokeWidth="0.5" opacity="0.12" />
    <circle cx="200" cy="200" r="155" stroke="currentColor" strokeWidth="0.5" opacity="0.18" />
    <circle cx="200" cy="200" r="115" stroke="currentColor" strokeWidth="0.4" opacity="0.1" />
    {/* 12 house division lines */}
    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => {
      const r = (Math.PI * deg) / 180;
      return (
        <line
          key={deg}
          x1={200 + 115 * Math.cos(r)}
          y1={200 + 115 * Math.sin(r)}
          x2={200 + 190 * Math.cos(r)}
          y2={200 + 190 * Math.sin(r)}
          stroke="currentColor"
          strokeWidth="0.4"
          opacity="0.14"
        />
      );
    })}
    {/* Aspect geometry */}
    <path d="M200 10 L390 200 L200 390 L10 200Z" stroke="currentColor" strokeWidth="0.3" opacity="0.07" />
    <path d="M95 45 L355 145 L305 355 L45 255Z" stroke="currentColor" strokeWidth="0.25" opacity="0.05" />
    {/* Planet nodes */}
    <circle cx="200" cy="18" r="3" fill="currentColor" opacity="0.45" />
    <circle cx="375" cy="155" r="2.5" fill="currentColor" opacity="0.35" />
    <circle cx="315" cy="350" r="2" fill="currentColor" opacity="0.3" />
    <circle cx="75" cy="275" r="2.5" fill="currentColor" opacity="0.35" />
    <circle cx="95" cy="75" r="2" fill="currentColor" opacity="0.25" />
    <circle cx="285" cy="55" r="1.5" fill="currentColor" opacity="0.2" />
    {/* Central bindu */}
    <circle cx="200" cy="200" r="4" fill="currentColor" opacity="0.35" />
    <circle cx="200" cy="200" r="10" stroke="currentColor" strokeWidth="0.4" opacity="0.15" />
  </svg>
);

const StarField = () => {
  const stars = [
    [45, 120, 1.2, 0.35], [180, 65, 0.8, 0.2], [320, 200, 1, 0.3],
    [95, 380, 1.4, 0.25], [250, 450, 0.7, 0.18], [400, 100, 1.1, 0.35],
    [520, 300, 0.9, 0.25], [150, 550, 1.3, 0.2], [600, 180, 0.8, 0.3],
    [700, 400, 1, 0.18], [350, 650, 1.2, 0.25], [480, 520, 0.7, 0.35],
    [800, 120, 1.1, 0.2], [650, 600, 0.9, 0.25], [900, 280, 1, 0.3],
    [1050, 150, 0.8, 0.18], [1100, 400, 1.2, 0.25], [950, 550, 0.7, 0.2],
    [200, 300, 0.6, 0.12], [750, 50, 1, 0.25], [550, 700, 0.8, 0.18],
    [420, 380, 0.5, 0.15], [860, 480, 0.9, 0.2], [1000, 650, 1.1, 0.25],
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

/* ────────────────────────────────────────────────────
   Home Page Component
   ──────────────────────────────────────────────────── */

export default function HomeView({ onNavigate }) {
  // Scroll-reveal observer
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

  const processSteps = [
    { step: '01', title: 'Understand', desc: 'Deep listening — your aspirations, lifestyle rhythms and spatial needs.' },
    { step: '02', title: 'Analyse', desc: 'Birth chart reading, numerology mapping and Vastu spatial audit.' },
    { step: '03', title: 'Plan', desc: 'Harmonizing personal energies with architectural zoning and layout.' },
    { step: '04', title: 'Design', desc: 'Material curation, 3D visualization and bespoke interior detailing.' },
    { step: '05', title: 'Refine', desc: 'Iterative refinement, turnkey execution and considered handover.' },
  ];

  return (
    <div>

      {/* ═══════════════════════════════════════════════════════
          1. HERO — Celestial + Interior Split
          ═══════════════════════════════════════════════════════ */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0d0d24 0%, #141430 25%, #161520 55%, #161514 100%)' }}
      >
        {/* Star field */}
        <StarField />

        {/* Decorative birth chart — slowly rotating behind hero text */}
        <div
          className="absolute left-[5%] sm:left-[10%] top-1/2 -translate-y-1/2 w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] lg:w-[600px] lg:h-[600px] text-[#B89758] celestial-rotate pointer-events-none"
          aria-hidden="true"
        >
          <BirthChartSVG />
        </div>

        {/* Interior image — right side on desktop */}
        <div className="absolute right-0 top-0 bottom-0 w-[55%] hidden lg:block" aria-hidden="true">
          <img
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85"
            alt="Contemporary Indian living room with warm teak woodwork and Vastu-aligned spatial planning"
            fetchPriority="high"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d24] via-[#141430]/95 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#161514] via-transparent to-[#0d0d24]/40" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-20 lg:pb-24">
          <div className="max-w-2xl space-y-7">
            {/* Eyebrow */}
            <div className="hero-animate hero-animate-delay-1 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] backdrop-blur-md border border-[#B89758]/25">
              <span className="h-1.5 w-1.5 rounded-full bg-[#B89758] animate-pulse" />
              <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.22em] text-[#DEC695]">
                Astrology · Vastu · Numerology · Interiors
              </span>
            </div>

            {/* H1 */}
            <h1 className="hero-animate hero-animate-delay-2 font-serif text-fluid-hero font-normal text-[#FDFBF7] tracking-tight">
              Where Energy
              <br />
              <span className="italic font-light text-[#DEC695]">Meets Design.</span>
            </h1>

            {/* Supporting copy */}
            <p className="hero-animate hero-animate-delay-3 text-sm sm:text-base lg:text-lg font-light text-[#D8CEBE] leading-relaxed max-w-xl">
              Vedic astrology, numerology and Vastu-informed interior design — creating
              spaces aligned with the people who live in them.
            </p>

            {/* CTAs */}
            <div className="hero-animate hero-animate-delay-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={() => onNavigate('vastu-interiors')}
                className="px-7 py-3.5 rounded-full bg-[#B89758] text-[#161514] font-semibold text-sm hover:bg-[#DEC695] active:scale-[0.98] transition-all shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-2"
              >
                Explore Our Approach
                <ArrowRight size={16} />
              </button>
              <a
                href={getWhatsAppLink("Hello! I'm interested in learning about your astrology, Vastu and interior design services.")}
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 rounded-full bg-white/[0.08] text-[#FDFBF7] backdrop-blur-md border border-white/15 text-sm font-medium hover:bg-white/15 active:scale-[0.98] transition-all inline-flex items-center justify-center gap-2"
              >
                <MessageCircle size={16} />
                Talk to Us
              </a>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-2 hero-animate hero-animate-delay-5">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#D8CEBE]/50">Scroll</span>
          <div className="w-5 h-8 rounded-full border border-[#B89758]/30 flex justify-center pt-1.5">
            <div className="w-1 h-2 bg-[#B89758]/50 rounded-full animate-bounce" />
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════
          2. SELF × SPACE × DESIGN — Brand Philosophy
          ═══════════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 reveal">
            <span className="editorial-subheading text-[#B89758]">Our Philosophy</span>
            <h2 className="font-serif text-fluid-h2 font-normal text-[#161514] mt-3 tracking-tight">
              Self <span className="text-[#B89758]">×</span> Space{' '}
              <span className="text-[#B89758]">×</span> Design
            </h2>
            <p className="text-sm sm:text-base text-[#634832] mt-4 leading-relaxed">
              True spatial wellbeing begins when the inhabitant, the environment and
              the architecture speak the same language.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
            {/* SELF */}
            <div
              className="reveal reveal-delay-1 group p-8 rounded-2xl bg-[#F7F3EB] border border-[#EFE8DC] hover:border-[#B89758]/40 transition-all cursor-pointer"
              onClick={() => onNavigate('tools')}
            >
              <span className="font-mono text-xs text-[#B89758] font-bold tracking-wider">01 — SELF</span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#161514] mt-3">Astrology &amp; Numbers</h3>
              <p className="text-sm text-[#634832] mt-3 leading-relaxed">
                Understand your inner patterns, planetary rhythms and personal cycles
                through Vedic astrology and numerology.
              </p>
              <div className="mt-5 text-xs font-semibold text-[#A85838] flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                Explore Guidance <ArrowRight size={13} />
              </div>
            </div>

            {/* SPACE */}
            <div
              className="reveal reveal-delay-2 group p-8 rounded-2xl bg-[#F7F3EB] border border-[#EFE8DC] hover:border-[#607261]/40 transition-all cursor-pointer"
              onClick={() => onNavigate('vastu')}
            >
              <span className="font-mono text-xs text-[#607261] font-bold tracking-wider">02 — SPACE</span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#161514] mt-3">Vastu Shastra</h3>
              <p className="text-sm text-[#634832] mt-3 leading-relaxed">
                Map directional energies, elemental balance and spatial flow in your
                home, office or property.
              </p>
              <div className="mt-5 text-xs font-semibold text-[#607261] flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                Explore Vastu <ArrowRight size={13} />
              </div>
            </div>

            {/* DESIGN */}
            <div
              className="reveal reveal-delay-3 group p-8 rounded-2xl bg-[#F7F3EB] border border-[#EFE8DC] hover:border-[#A85838]/40 transition-all cursor-pointer"
              onClick={() => onNavigate('interiors')}
            >
              <span className="font-mono text-xs text-[#A85838] font-bold tracking-wider">03 — DESIGN</span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#161514] mt-3">Interior Architecture</h3>
              <p className="text-sm text-[#634832] mt-3 leading-relaxed">
                Contemporary interiors shaped around your lifestyle, crafted with
                natural materials and intentional detail.
              </p>
              <div className="mt-5 text-xs font-semibold text-[#A85838] flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                View Interiors <ArrowRight size={13} />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════
          3. UNDERSTAND YOURSELF — Astrology & Numerology
          ═══════════════════════════════════════════════════════ */}
      <section
        className="py-24 sm:py-32 relative overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #0d0d24 0%, #141430 50%, #0d0d24 100%)' }}
      >
        {/* Decorative chart — right side accent */}
        <div
          className="absolute right-[-5%] top-1/2 -translate-y-1/2 w-[400px] h-[400px] lg:w-[550px] lg:h-[550px] text-[#B89758] celestial-rotate pointer-events-none opacity-20 hidden sm:block"
          aria-hidden="true"
        >
          <BirthChartSVG />
        </div>
        <StarField />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Content */}
            <div className="reveal">
              <span className="editorial-subheading text-[#B89758]">
                Self — Astrology &amp; Numerology
              </span>
              <h2 className="font-serif text-fluid-h2 font-normal text-[#FDFBF7] mt-3 tracking-tight">
                Understand <span className="italic text-[#DEC695]">Yourself</span>
              </h2>
              <p className="text-sm sm:text-base text-[#D8CEBE] mt-5 leading-relaxed max-w-lg">
                Astrology and numerology offer traditional frameworks for exploring
                personality, patterns and personal cycles. Know yourself before you
                design your space.
              </p>

              {/* Service highlights */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    title: 'Vedic Astrology',
                    desc: 'Planetary transits, Dasha periods and personalized guidance.',
                  },
                  {
                    title: 'Birth Chart Reading',
                    desc: 'Comprehensive Kundli analysis — career, relationships, wellness.',
                  },
                  {
                    title: 'Numerology',
                    desc: 'Life path, destiny and soul urge number interpretation.',
                  },
                  {
                    title: 'Astro-Spatial Mapping',
                    desc: 'Connecting your planetary rulers with room orientations.',
                  },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-white/[0.04] border border-[#B89758]/15 backdrop-blur-sm"
                  >
                    <h4 className="font-serif text-lg text-[#DEC695]">{s.title}</h4>
                    <p className="text-xs text-[#D8CEBE]/70 mt-1.5 leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <button
                  onClick={() => onNavigate('tools')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#B89758] text-[#161514] font-semibold text-sm hover:bg-[#DEC695] transition-all"
                >
                  Explore Guidance <ArrowRight size={15} />
                </button>
              </div>
            </div>

            {/* Visual — Birth chart centered */}
            <div className="reveal hidden lg:flex items-center justify-center">
              <div className="relative w-[380px] h-[380px] text-[#DEC695]">
                <BirthChartSVG className="w-full h-full" />
                {/* Central label */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <span className="font-serif text-3xl text-[#DEC695]/80">Kundli</span>
                    <span className="block text-[10px] uppercase tracking-[0.3em] text-[#B89758]/60 mt-1">
                      Birth Chart
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════
          4. UNDERSTAND YOUR SPACE — Vastu
          ═══════════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32 bg-[#F7F3EB] border-y border-[#EFE8DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image with compass accent */}
            <div className="reveal relative aspect-[4/3] rounded-2xl overflow-hidden order-2 lg:order-1">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                alt="Modern Indian home entrance with balanced proportions and natural light"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#161514]/40 to-transparent" />

              {/* Compass accent */}
              <div className="absolute bottom-4 right-4 w-20 h-20 sm:w-24 sm:h-24 opacity-60" aria-hidden="true">
                <svg viewBox="0 0 100 100" fill="none">
                  <circle cx="50" cy="50" r="45" stroke="#DEC695" strokeWidth="0.8" />
                  <circle cx="50" cy="50" r="35" stroke="#DEC695" strokeWidth="0.5" opacity="0.5" />
                  <line x1="50" y1="5" x2="50" y2="95" stroke="#DEC695" strokeWidth="0.5" opacity="0.6" />
                  <line x1="5" y1="50" x2="95" y2="50" stroke="#DEC695" strokeWidth="0.5" opacity="0.6" />
                  <text x="50" y="15" textAnchor="middle" fill="#DEC695" fontSize="7" fontFamily="serif" fontWeight="500">N</text>
                  <text x="50" y="93" textAnchor="middle" fill="#DEC695" fontSize="7" fontFamily="serif" fontWeight="500">S</text>
                  <text x="90" y="53" textAnchor="middle" fill="#DEC695" fontSize="7" fontFamily="serif" fontWeight="500">E</text>
                  <text x="10" y="53" textAnchor="middle" fill="#DEC695" fontSize="7" fontFamily="serif" fontWeight="500">W</text>
                  <circle cx="50" cy="50" r="3" fill="#DEC695" opacity="0.8" />
                </svg>
              </div>
            </div>

            {/* Content */}
            <div className="reveal order-1 lg:order-2">
              <span className="editorial-subheading text-[#607261]">Space — Vastu Shastra</span>
              <h2 className="font-serif text-fluid-h2 font-normal text-[#161514] mt-3 tracking-tight">
                Understand Your <span className="italic text-[#A85838]">Space</span>
              </h2>
              <p className="text-sm sm:text-base text-[#634832] mt-5 leading-relaxed max-w-lg">
                Vastu brings attention to direction, spatial planning and the
                relationship between people and their built environment.
              </p>

              <ul className="mt-8 space-y-4">
                {[
                  '16-zone directional energy audit for homes and offices',
                  'Non-destructive spatial rectification — no demolition required',
                  'Room orientation, entrance alignment and elemental balance',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#22201E]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#607261] shrink-0 mt-2" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <button
                  onClick={() => onNavigate('vastu')}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#161514] border-b-2 border-[#161514] pb-1 hover:text-[#A85838] hover:border-[#A85838] transition-colors"
                >
                  Explore Vastu <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════
          5. DESIGN YOUR SPACE — Interior Design
          ═══════════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content */}
            <div className="reveal">
              <span className="editorial-subheading text-[#A85838]">Design — Interior Architecture</span>
              <h2 className="font-serif text-fluid-h2 font-normal text-[#161514] mt-3 tracking-tight">
                Design Your <span className="italic text-[#A85838]">Space</span>
              </h2>
              <p className="text-sm sm:text-base text-[#634832] mt-5 leading-relaxed max-w-lg">
                Contemporary interiors shaped around your lifestyle, architecture and
                personal preferences — crafted with natural stone, warm wood and
                intentional lighting.
              </p>

              <ul className="mt-8 space-y-4">
                {[
                  'Full home interior architecture — 2BHK to villas',
                  'Bespoke furniture, lighting design and material curation',
                  '3D photorealistic visualization and turnkey execution',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#22201E]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#A85838] shrink-0 mt-2" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <button
                  onClick={() => onNavigate('interiors')}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#161514] border-b-2 border-[#161514] pb-1 hover:text-[#A85838] hover:border-[#A85838] transition-colors"
                >
                  View Portfolio <ArrowRight size={15} />
                </button>
              </div>
            </div>

            {/* Image */}
            <div className="reveal aspect-[4/3] rounded-2xl overflow-hidden border border-[#EFE8DC]">
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85"
                alt="Luxury duplex penthouse interior with warm fluted wood paneling and natural stone in Surat"
                className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-700"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════
          6. DIFFERENTIATOR — Where Astrology Meets Interior Design
          ═══════════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32 bg-[#161514] text-[#FDFBF7] border-y border-[#292724] relative overflow-hidden">
        {/* Decorative */}
        <div
          className="absolute right-[-8%] bottom-[-10%] w-[300px] h-[300px] text-[#B89758] opacity-[0.06] pointer-events-none"
          aria-hidden="true"
        >
          <BirthChartSVG />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto reveal">
            <span className="editorial-subheading text-[#B89758]">The Astro Interior Difference</span>
            <h2 className="font-serif text-fluid-h2 font-normal text-[#FDFBF7] mt-3 tracking-tight">
              Your Space. Your Energy.
              <br />
              <span className="italic text-[#DEC695]">Your Story.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#D8CEBE] mt-5 leading-relaxed">
              This is not a typical interior design studio. We understand you first —
              through astrology and numerology — then your space — through Vastu — and
              finally, design interiors that reflect both.
            </p>
          </div>

          {/* Three pillars */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 reveal">
            {[
              {
                num: '01',
                title: 'Know Yourself',
                desc: 'Astrology & numerology reveal your elemental nature, rhythms and spatial preferences.',
                accent: '#B89758',
              },
              {
                num: '02',
                title: 'Know Your Space',
                desc: 'Vastu maps how directional energy, light and orientation influence wellbeing.',
                accent: '#607261',
              },
              {
                num: '03',
                title: 'Design with Intention',
                desc: 'Interior architecture that translates personal insights into living spaces.',
                accent: '#A85838',
              },
            ].map((pillar, i) => (
              <div
                key={i}
                className="p-8 rounded-2xl bg-[#1D1B19] border border-[#33312E] hover:border-[#B89758]/40 transition-colors text-center"
              >
                <span className="font-mono text-2xl font-light" style={{ color: pillar.accent }}>
                  {pillar.num}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-[#FDFBF7] mt-3">{pillar.title}</h3>
                <p className="text-xs text-[#D8CEBE]/65 mt-3 leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center reveal">
            <button
              onClick={() => onNavigate('vastu-interiors')}
              className="px-7 py-3.5 rounded-full bg-[#B89758] text-[#161514] font-semibold text-sm hover:bg-[#DEC695] transition-all inline-flex items-center gap-2 shadow-lg"
            >
              See How It Works <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════
          7. SELECTED PROJECTS
          ═══════════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 reveal">
            <div>
              <span className="editorial-subheading text-[#B89758]">Selected Work</span>
              <h2 className="font-serif text-fluid-h2 font-normal text-[#161514] mt-2 tracking-tight">
                Spaces Designed <span className="italic text-[#A85838]">Around You</span>
              </h2>
            </div>
            <button
              onClick={() => onNavigate('interiors')}
              className="mt-4 sm:mt-0 text-xs font-bold uppercase tracking-wider text-[#161514] hover:text-[#A85838] inline-flex items-center gap-1.5 transition-colors"
            >
              View All Projects <ArrowRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {projects.map((p, i) => (
              <div
                key={p.id}
                onClick={() => onNavigate('interiors')}
                className={`group cursor-pointer reveal ${i < 4 ? `reveal-delay-${i + 1}` : ''}`}
              >
                <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-5 border border-[#EFE8DC]">
                  <img
                    src={p.heroImage}
                    alt={`${p.title} — ${p.style} interior design in ${p.location}`}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#B89758] font-semibold">
                  {p.category} · {p.year}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-[#161514] mt-1 group-hover:text-[#A85838] transition-colors">
                  {p.title}
                </h3>
                <p className="text-xs text-[#634832] mt-1">
                  {p.location} · {p.scope}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════
          8. PROCESS — 5 Steps
          ═══════════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32 bg-[#161514] text-[#FDFBF7] border-y border-[#292724]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Our Process"
            title="From Idea to Space"
            subtitle="Five deliberate steps from understanding you to delivering your home."
            light
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {processSteps.map((step, i) => (
              <div
                key={step.step}
                className={`reveal ${i < 4 ? `reveal-delay-${i + 1}` : ''} p-6 rounded-2xl bg-[#1D1B19] border border-[#33312E] hover:border-[#B89758]/40 transition-colors group`}
              >
                <span className="font-mono text-3xl font-light text-[#B89758] group-hover:text-[#DEC695] transition-colors block">
                  {step.step}
                </span>
                <h3 className="font-serif text-xl text-[#FDFBF7] mt-4">{step.title}</h3>
                <p className="text-xs text-[#D8CEBE]/60 mt-2 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center reveal">
            <button
              onClick={() => onNavigate('consultation')}
              className="px-8 py-3.5 rounded-full bg-[#B89758] text-[#161514] font-semibold text-sm hover:bg-[#DEC695] transition-all inline-flex items-center gap-2 shadow-lg"
            >
              Begin Step 01 <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════
          9. TESTIMONIALS
          ═══════════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Client Experiences"
            title="What Clients Say"
            subtitle="Direct accounts from homeowners and entrepreneurs."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={t.id}
                className={`reveal ${i < 3 ? `reveal-delay-${i + 1}` : ''} p-8 rounded-2xl bg-[#F7F3EB] border border-[#EFE8DC] flex flex-col justify-between`}
              >
                <div>
                  <span className="font-serif text-5xl text-[#B89758]/60 leading-none block select-none">
                    &ldquo;
                  </span>
                  <p className="text-sm text-[#22201E] leading-relaxed italic -mt-2">{t.quote}</p>
                </div>
                <div className="pt-6 mt-6 border-t border-[#EFE8DC]">
                  <h4 className="font-serif text-lg text-[#161514]">{t.client}</h4>
                  <p className="text-xs text-[#A85838] font-medium mt-0.5">{t.service}</p>
                  <p className="text-[11px] text-[#634832] mt-0.5">
                    {t.property} · {t.city}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════
          10. FAQ
          ═══════════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32 bg-[#FDFBF7] border-t border-[#EFE8DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal">
            <SectionHeader
              eyebrow="Common Questions"
              title="Frequently Asked Questions"
              subtitle="Quick answers about our astrology, Vastu, numerology and interior design services."
            />
          </div>
          <div className="reveal">
            <FAQAccordion />
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════
          11. CONSULTATION CTA
          ═══════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal bg-[#161514] text-[#FDFBF7] rounded-3xl p-8 sm:p-14 border border-[#292724] relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full border border-[#B89758]/15 pointer-events-none" aria-hidden="true" />
            <div className="absolute -bottom-10 -right-10 w-56 h-56 rounded-full border border-[#B89758]/8 pointer-events-none" aria-hidden="true" />
            <div className="absolute top-8 right-8 w-16 h-16 text-[#B89758] opacity-[0.08] pointer-events-none hidden sm:block" aria-hidden="true">
              <BirthChartSVG />
            </div>

            <div className="relative z-10 max-w-2xl space-y-6">
              <span className="editorial-subheading text-[#B89758]">Begin Your Journey</span>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-tight text-[#FDFBF7]">
                Ready to design a home that{' '}
                <span className="italic text-[#DEC695]">truly feels right?</span>
              </h2>
              <p className="text-sm sm:text-base text-[#D8CEBE] leading-relaxed">
                Whether you seek astrology guidance, a Vastu consultation or a complete
                interior transformation — our team is here to help.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onNavigate('consultation')}
                  className="px-7 py-3.5 rounded-full bg-[#B89758] text-[#161514] font-semibold text-sm hover:bg-[#DEC695] transition-all shadow-lg"
                >
                  Schedule Consultation
                </button>
                <a
                  href={getWhatsAppLink('Hello! I would like to schedule a consultation.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-full bg-[#25D366] text-white font-medium text-sm hover:bg-[#22bf5b] transition-all inline-flex items-center gap-2 shadow"
                >
                  <MessageCircle size={17} />
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
