import React, { useState } from 'react';
import { ArrowRight, ArrowUpRight, Compass, Sparkles, Home, Layers, MessageCircle, CheckCircle, ChevronRight, Eye } from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import { serviceCategories } from '../data/services';
import { projects } from '../data/projects';
import { testimonials } from '../data/testimonials';
import { insights } from '../data/insights';
import { siteConfig, getWhatsAppLink } from '../data/siteConfig';
import VastuCompass from '../components/interactive/VastuCompass';
import BeforeAfterSlider from '../components/interactive/BeforeAfterSlider';
import NumerologyCalculator from '../components/interactive/NumerologyCalculator';

export default function HomeView({ onNavigate }) {
  const [featuredTab, setFeaturedTab] = useState(0);
  const featuredProject = projects[0];

  const featuredRooms = [
    { label: "01 Living Sanctuary", img: featuredProject.gallery[0].url, caption: "Living room oriented towards morning East light with low-slung linen seating." },
    { label: "02 Gourmet Kitchen", img: featuredProject.gallery[1].url, caption: "South-East Agni sector with fluted oak cabinetry and warm concealed LEDs." },
    { label: "03 Master Sanctuary", img: featuredProject.gallery[2].url, caption: "South-West Nai-Ritya grounding master bedroom with walnut acoustic panels." },
    { label: "04 Pooja Alcove", img: featuredProject.gallery[3].url, caption: "North-East Ishanya sacred corner with backlit white Makrana jaali." }
  ];

  const processSteps = [
    { step: "01", title: "Consultation", desc: "Understanding personal aspirations, family dynamics, and lifestyle rituals." },
    { step: "02", title: "Requirement Blueprint", desc: "Documenting spatial volume, budget brackets, and functional needs." },
    { step: "03", title: "Space & Vastu Audit", desc: "16-zone geo-directional grid mapping of cardinal energies and elemental balances." },
    { step: "04", title: "Spatial Concept", desc: "Harmonizing Vastu room layout with contemporary architectural zoning." },
    { step: "05", title: "3D Photorealistic Views", desc: "Experiencing lighting temperatures, furniture ergonomics, and tactile textures." },
    { step: "06", title: "Material Selection", desc: "Touching real travertine stones, Burma teaks, lime plasters, and fabrics in our studio." },
    { step: "07", title: "Bespoke Execution", desc: "Turnkey site supervision, bespoke carpentry, and strict quality control." },
    { step: "08", title: "Sacred Handover", desc: "Auspicious Griha Pravesh timing guidance and pristine project delivery." }
  ];

  return (
    <div className="space-y-24 sm:space-y-32">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] sm:min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
        {/* Background Image with Warm Architectural Grading */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=85"
            alt="Luxury Indian Living Architecture"
            fetchPriority="high"
            className="w-full h-full object-cover object-[65%_center] sm:object-center brightness-95 scale-102 transition-transform duration-1000"
          />
          {/* Subtle multi-layer gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#161514]/90 via-[#161514]/60 to-[#161514]/30 sm:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7] via-transparent to-black/35" />
        </div>

        {/* Hero Content Box */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl text-left space-y-6">
            
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-[#161514]/80 backdrop-blur-md border border-[#B89758]/40 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#B89758] animate-pulse"></span>
              <span className="editorial-subheading text-[#DEC695] text-[10px] sm:text-[11px] tracking-[0.22em] sm:tracking-[0.25em]">
                ASTROLOGY • NUMEROLOGY • VASTU • INTERIORS
              </span>
            </div>

            {/* Main Editorial Heading with Fluid Clamp */}
            <h1 className="font-serif text-fluid-hero font-normal text-[#FDFBF7] tracking-tight">
              Where Energy <br />
              <span className="italic font-light text-[#DEC695]">Meets Design.</span>
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base lg:text-lg font-light text-[#EFE8DC] leading-relaxed max-w-xl">
              Understand yourself. Understand your space. Design a place that feels deeply right. 
              A contemporary Indian studio uniting ancient spatial science with refined contemporary luxury.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <button
                onClick={() => onNavigate("vastu-interiors")}
                className="px-7 py-3.5 rounded-full bg-[#B89758] text-[#161514] font-semibold text-xs sm:text-sm hover:bg-[#DEC695] active:scale-98 transition-all shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-2"
              >
                <span>Explore Vastu × Interiors</span>
                <ArrowRight size={16} />
              </button>

              <button
                onClick={() => onNavigate("consultation")}
                className="px-7 py-3.5 rounded-full bg-[#FDFBF7]/15 text-[#FDFBF7] backdrop-blur-md border border-white/30 text-xs sm:text-sm font-medium hover:bg-white/25 active:scale-98 transition-all inline-flex items-center justify-center gap-2"
              >
                <span>Start a Consultation</span>
                <ArrowUpRight size={15} />
              </button>
            </div>

            {/* Trust points - responsive for 360px up */}
            <div className="pt-6 sm:pt-8 border-t border-white/15 grid grid-cols-1 xs:grid-cols-3 sm:grid-cols-3 gap-3 sm:gap-4 text-[#EFE8DC]/85">
              <div className="border-l sm:border-l-0 pl-3 sm:pl-0 border-[#B89758]/50">
                <span className="font-serif text-xl sm:text-2xl text-[#DEC695] block">Non-Destructive</span>
                <span className="text-[11px] tracking-wide text-[#D8CEBE]">Vastu Solutions</span>
              </div>
              <div className="border-l sm:border-l-0 pl-3 sm:pl-0 border-[#B89758]/50">
                <span className="font-serif text-xl sm:text-2xl text-[#DEC695] block">Turnkey</span>
                <span className="text-[11px] tracking-wide text-[#D8CEBE]">Interior Architecture</span>
              </div>
              <div className="border-l sm:border-l-0 pl-3 sm:pl-0 border-[#B89758]/50">
                <span className="font-serif text-xl sm:text-2xl text-[#DEC695] block">Bespoke</span>
                <span className="text-[11px] tracking-wide text-[#D8CEBE]">Astro-Spatial Guidance</span>
              </div>
            </div>

          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-1.5 opacity-70 hover:opacity-100 transition-opacity">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#634832]">Scroll to explore</span>
          <div className="w-4 h-7 rounded-full border border-[#B89758] flex justify-center p-1">
            <div className="w-1 h-2 bg-[#B89758] rounded-full animate-bounce" />
          </div>
        </div>
      </section>


      {/* 2. SERVICE SELECTOR: "What Brings You Here?" */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Guided Exploration"
          title="What brings you here today?"
          subtitle="Whether you seek clarity on personal planetary rhythms, need to harmonize your apartment floor plan, or desire a turnkey interior transformation."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {serviceCategories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onNavigate(cat.id === "space" ? "vastu" : cat.id === "design" ? "interiors" : cat.id === "synthesis" ? "vastu-interiors" : "tools")}
              className="group bg-[#FDFBF7] border border-[#EFE8DC] rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl hover:border-[#B89758]/50 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image Preview with Zoom */}
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute bottom-3 left-4 text-xs font-serif text-[#DEC695] uppercase tracking-wider">
                  {cat.subtitle}
                </span>
              </div>

              {/* Text Description */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif text-2xl text-[#161514] group-hover:text-[#A85838] transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-[#634832] mt-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs font-medium text-[#161514] group-hover:text-[#A85838] border-t border-[#EFE8DC]">
                  <span>{cat.ctaText}</span>
                  <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* 3. BRAND STORY & PHILOSOPHY: The Self × Space × Design Triad */}
      <section className="bg-[#F7F3EB] py-20 border-y border-[#EFE8DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <span className="editorial-subheading text-[#B89758]">Brand Philosophy</span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#161514] leading-tight">
                A home is more than <br />
                <span className="italic text-[#A85838]">four walls.</span>
              </h2>

              <p className="text-sm sm:text-base text-[#634832] leading-relaxed">
                Traditional interior designers focus exclusively on decorative appearances. Traditional astrologers focus exclusively on birth charts. 
              </p>

              <p className="text-sm sm:text-base text-[#634832] leading-relaxed">
                We believe true spatial wellbeing occurs only when the inhabitant’s personal frequencies (<strong>Self</strong>), the cardinal planetary grid (<strong>Space</strong>), and contemporary architectural execution (<strong>Design</strong>) speak the exact same language.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate("vastu-interiors")}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#161514] hover:text-[#A85838] border-b border-[#161514] pb-1 transition-colors"
                >
                  <span>Learn how we harmonize the triad</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* Triad Progression Cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* 01 Self */}
              <div className="p-6 rounded-2xl bg-[#FDFBF7] border border-[#EFE8DC] space-y-3">
                <span className="font-mono text-xs text-[#B89758] font-bold">01 — SELF</span>
                <h3 className="font-serif text-2xl text-[#161514]">Astrology & Numbers</h3>
                <p className="text-xs text-[#634832] leading-relaxed">
                  Understand your inner archetypes, planetary rulers, and personal life rhythm.
                </p>
                <div className="text-[11px] text-[#A85838] font-medium pt-2">
                  $\rightarrow$ Your Core Frequency
                </div>
              </div>

              {/* 02 Space */}
              <div className="p-6 rounded-2xl bg-[#FDFBF7] border border-[#EFE8DC] space-y-3">
                <span className="font-mono text-xs text-[#607261] font-bold">02 — SPACE</span>
                <h3 className="font-serif text-2xl text-[#161514]">Vastu Shastra</h3>
                <p className="text-xs text-[#634832] leading-relaxed">
                  16-zone cardinal orientation, Pancha Tattva balance, and energetic flow.
                </p>
                <div className="text-[11px] text-[#607261] font-medium pt-2">
                  $\rightarrow$ Your Living Grid
                </div>
              </div>

              {/* 03 Design */}
              <div className="p-6 rounded-2xl bg-[#FDFBF7] border border-[#EFE8DC] space-y-3">
                <span className="font-mono text-xs text-[#A85838] font-bold">03 — DESIGN</span>
                <h3 className="font-serif text-2xl text-[#161514]">Interior Architecture</h3>
                <p className="text-xs text-[#634832] leading-relaxed">
                  Natural stone, warm lime wash, tactile textures, and circadian lighting.
                </p>
                <div className="text-[11px] text-[#A85838] font-medium pt-2">
                  $\rightarrow$ Your Physical Sanctuary
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* 4. FEATURED SIGNATURE PROJECT: The Ahmedabad 3BHK Residence */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Signature Case Study"
          title="A Home Designed Around Light, Balance & Material"
          subtitle="Explore the Ahmedabad Bodakdev Residence: full 3BHK interior architecture seamlessly woven with classical Vastu cardinal axes."
        />

        <div className="bg-[#F7F3EB] border border-[#EFE8DC] rounded-3xl p-6 sm:p-10">
          {/* Tab Switcher */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {featuredRooms.map((rm, idx) => (
              <button
                key={idx}
                onClick={() => setFeaturedTab(idx)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  featuredTab === idx
                    ? "bg-[#161514] text-[#FDFBF7] shadow-sm"
                    : "bg-[#FDFBF7] text-[#634832] border border-[#D8CEBE] hover:border-[#B89758]"
                }`}
              >
                {rm.label}
              </button>
            ))}
          </div>

          {/* Full Width Showcase Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 relative aspect-[16/10] rounded-2xl overflow-hidden border border-[#EFE8DC] shadow-md">
              <img
                src={featuredRooms[featuredTab].img}
                alt={featuredRooms[featuredTab].label}
                className="w-full h-full object-cover transition-opacity duration-300"
              />
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#161514]/75 backdrop-blur-md text-[#FDFBF7] text-xs sm:text-sm border border-white/10">
                <span className="font-serif text-[#DEC695] block text-base sm:text-lg mb-0.5">
                  {featuredRooms[featuredTab].label}
                </span>
                <p className="text-[#D8CEBE]/90">{featuredRooms[featuredTab].caption}</p>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-5">
              <div>
                <span className="editorial-subheading text-[#A85838]">Project Parameters</span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#161514] mt-1 font-normal">
                  {featuredProject.title}
                </h3>
                <p className="text-xs text-[#634832] mt-1">
                  {featuredProject.location} • {featuredProject.scope} • {featuredProject.area}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-[#22201E] leading-relaxed">
                {featuredProject.summary}
              </p>

              <div className="space-y-2 pt-2 border-t border-[#EFE8DC] text-xs">
                <span className="font-semibold text-[#161514] block">Key Vastu Alignments:</span>
                <ul className="space-y-1.5 text-[#634832]">
                  {featuredProject.vastuHighlights.slice(0, 3).map((vh, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#B89758] shrink-0 mt-1.5"></span>
                      <span>{vh}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3">
                <button
                  onClick={() => onNavigate("interiors")}
                  className="w-full py-3 px-4 bg-[#161514] text-[#FDFBF7] rounded-xl text-xs font-medium hover:bg-[#634832] transition-colors flex items-center justify-center gap-2"
                >
                  <Eye size={15} />
                  <span>View Complete Portfolio Case Study</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* 5. INTERACTIVE VASTU COMPASS PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Interactive Experience"
          title="The 8-Direction Vastu Compass"
          subtitle="Click on any direction to understand its ruling Pancha Tattva element, auspicious spatial functions, and interior design considerations."
        />
        <VastuCompass />
      </section>


      {/* 6. BEFORE / AFTER INTERACTIVE SLIDER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Real Transformations"
          title="From Raw Shell to Architectural Haven"
          subtitle="Experience the spatial and energetic transformation achieved through non-destructive Vastu re-organization and bespoke interior finishes."
        />
        <BeforeAfterSlider />
      </section>


      {/* 7. QUICK NUMEROLOGY DEMO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <NumerologyCalculator />
      </section>


      {/* 8. THE 8-STEP DESIGN TIMELINE: "From Idea to Space" */}
      <section className="bg-[#161514] text-[#FDFBF7] py-20 border-y border-[#292724]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Turnkey Methodology"
            title="From Idea to Space"
            subtitle="Our disciplined, transparent 8-step journey ensures complete alignment between personal energies, architectural precision, and spotless execution."
            light={true}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step) => (
              <div
                key={step.step}
                className="p-6 rounded-2xl bg-[#1D1B19] border border-[#33312E] hover:border-[#B89758]/50 transition-colors group flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-2xl font-normal text-[#B89758] group-hover:text-[#DEC695] transition-colors">
                    {step.step}
                  </span>
                  <h3 className="font-serif text-xl text-[#FDFBF7] mt-3">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[#D8CEBE]/70 mt-2 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#33312E]/60 text-[10px] uppercase tracking-wider text-[#A85838] font-semibold mt-4">
                  Step {step.step} of 08
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => onNavigate("consultation")}
              className="px-8 py-3.5 rounded-full bg-[#B89758] text-[#161514] font-semibold text-sm hover:bg-[#DEC695] transition-all inline-flex items-center gap-2 shadow-lg"
            >
              <span>Begin Step 01: Schedule Introductory Session</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>


      {/* 9. AUTHENTIC REVIEWS & CLIENT STORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Client Experiences"
          title="What Clients Say"
          subtitle="Direct accounts from homeowners and entrepreneurs who experienced our Vastu and interior architecture methodology."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="p-8 rounded-2xl bg-[#FDFBF7] border border-[#EFE8DC] flex flex-col justify-between space-y-6 shadow-sm"
            >
              <div>
                <span className="font-serif text-5xl text-[#B89758] leading-none block select-none">“</span>
                <p className="text-xs sm:text-sm text-[#22201E] leading-relaxed italic -mt-2">
                  {t.quote}
                </p>
              </div>

              <div className="pt-4 border-t border-[#EFE8DC]">
                <h4 className="font-serif text-lg text-[#161514]">{t.client}</h4>
                <p className="text-xs text-[#A85838] font-medium">{t.service}</p>
                <p className="text-[11px] text-[#634832] mt-0.5">{t.property} • {t.city}</p>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* 10. EDITORIAL INSIGHTS / BLOG PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <span className="editorial-subheading text-[#B89758]">Editorial Journal</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#161514] mt-1 font-normal">
              Insights & Architectural Essays
            </h2>
            <p className="text-xs sm:text-sm text-[#634832] mt-1">
              Thought leadership at the intersection of Vedic science, lighting psychology, and Indian homes.
            </p>
          </div>

          <button
            onClick={() => onNavigate("insights")}
            className="mt-4 sm:mt-0 text-xs font-bold uppercase tracking-wider text-[#161514] hover:text-[#A85838] inline-flex items-center gap-1.5"
          >
            <span>Browse All Articles</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {insights.slice(0, 3).map((art) => (
            <div
              key={art.id}
              onClick={() => onNavigate("insights")}
              className="bg-[#FDFBF7] border border-[#EFE8DC] rounded-2xl overflow-hidden cursor-pointer group hover:shadow-lg transition-all"
            >
              <div className="aspect-[16/10] overflow-hidden relative">
                <img
                  src={art.image}
                  alt={art.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#161514]/80 backdrop-blur-md text-[10px] text-[#DEC695] font-semibold uppercase tracking-wider">
                  {art.category}
                </span>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center gap-2 text-[11px] text-[#634832]">
                  <span>{art.date}</span>
                  <span>•</span>
                  <span>{art.readTime}</span>
                </div>

                <h3 className="font-serif text-xl text-[#161514] group-hover:text-[#A85838] transition-colors leading-snug">
                  {art.title}
                </h3>

                <p className="text-xs text-[#634832] line-clamp-2 leading-relaxed">
                  {art.excerpt}
                </p>

                <div className="pt-2 text-xs font-semibold text-[#A85838] flex items-center gap-1">
                  <span>Read Article</span>
                  <ArrowRight size={12} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* 11. CONSULTATION BANNER CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#161514] text-[#FDFBF7] rounded-3xl p-8 sm:p-14 border border-[#33312E] relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-6">
            <span className="editorial-subheading text-[#B89758]">Reserve Your Session</span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-tight text-[#FDFBF7]">
              Ready to design a home that <span className="italic text-[#DEC695]">truly feels right?</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#D8CEBE] leading-relaxed">
              Whether you are planning a new 3BHK, renovating an ancestral bungalow, or seeking a 16-zone Vastu audit, our principal team is here to guide you.
            </p>

            <div className="pt-3 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onNavigate("consultation")}
                className="px-7 py-3.5 rounded-full bg-[#B89758] text-[#161514] font-semibold text-sm hover:bg-[#DEC695] transition-all shadow-lg"
              >
                Schedule Consultation
              </button>

              <a
                href={getWhatsAppLink("Hello! I would like to schedule an introductory consultation for my home.")}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-full bg-[#25D366] text-white font-medium text-sm hover:bg-[#22bf5b] transition-all inline-flex items-center gap-2 shadow"
              >
                <MessageCircle size={17} />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Decorative motif */}
          <div className="absolute -bottom-16 -right-16 w-80 h-80 rounded-full border border-[#B89758]/20 pointer-events-none" />
          <div className="absolute -bottom-8 -right-8 w-60 h-60 rounded-full border border-[#B89758]/10 pointer-events-none" />
        </div>
      </section>

    </div>
  );
}
