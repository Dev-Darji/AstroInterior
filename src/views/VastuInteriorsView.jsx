import React from 'react';
import SectionHeader from '../components/ui/SectionHeader';
import VastuFloorPlan from '../components/interactive/VastuFloorPlan';
import BeforeAfterSlider from '../components/interactive/BeforeAfterSlider';
import { Sparkles, Compass, CheckCircle2, ArrowRight, MessageCircle } from 'lucide-react';
import { getWhatsAppLink, siteConfig } from '../data/siteConfig';

export default function VastuInteriorsView({ onNavigate }) {
  const synthesisPrinciples = [
    {
      title: "Flow Over Formulas",
      desc: "We avoid rigid superstitions. Instead, we study how natural air currents, morning solar angles, and magnetic polarities improve spatial comfort."
    },
    {
      title: "Non-Destructive Corrections",
      desc: "Over 90% of energetic dissonance is corrected using circadian lighting, intentional furniture orientation, acoustic baffles, and natural stone."
    },
    {
      title: "Uncompromising Contemporary Luxury",
      desc: "Your home looks and feels contemporary and elegant. Sacred geometry and energetic equilibrium work invisibly beneath the surface."
    },
    {
      title: "Circadian Light Choreography",
      desc: "We match Kelvin temperatures to Vedic spatial sectors: soft warm light in grounding sleep zones and crisp daylight in intellect-driven workstations."
    }
  ];

  return (
    <div className="pt-28 pb-20 space-y-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* Founder */}
      <section
        className="rounded-3xl p-8 sm:p-12 text-[#FDFBF7] border border-[#2A334A] relative overflow-hidden"
        style={{ background: 'linear-gradient(145deg, #070B18 0%, #0F172E 55%, #151A2C 100%)' }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <span className="editorial-subheading text-[#DEC695]">About · {siteConfig.experience} of Experience</span>
            <h1 className="font-serif text-4xl sm:text-5xl font-normal leading-tight">{siteConfig.founderName}</h1>
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.16em] text-[#DEC695]/90">
              {siteConfig.founderTitle}
            </p>
            <p className="text-sm sm:text-base text-[#D8CEBE] font-light leading-relaxed max-w-2xl">
              With over a decade of experience in Vastu, Astrology, Numerology and Interior Design, {siteConfig.founderName} offers
              holistic solutions that bring balance, positivity and growth — across all aspects of life. {siteConfig.cardTagline}.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => onNavigate("consultation")}
                className="px-6 py-3 rounded-full bg-[#B89758] text-[#161514] text-xs font-semibold hover:bg-[#DEC695] transition-colors"
              >
                Book a Consultation
              </button>
              <a
                href={siteConfig.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-white/[0.07] border border-white/20 text-xs font-semibold hover:bg-white/15 transition-colors"
              >
                @{siteConfig.instagramHandle}
              </a>
            </div>
          </div>
          <ul className="lg:col-span-4 grid grid-cols-2 gap-3 text-xs">
            {["Vastu", "Astrology", "Vedic Numerology", "Interior Design", "Medical Vastu", "Industrial & Retail Vastu"].map((s) => (
              <li key={s} className="p-3 rounded-xl bg-white/[0.04] border border-[#DEC695]/20 text-[#F3E2B8]">{s}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Hero Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="editorial-subheading text-[#B89758]">The Definitive Synthesis</span>
        <h2 className="font-serif text-4xl sm:text-6xl text-[#161514] font-normal leading-tight">
          Where Vastu Meets <br />
          <span className="italic text-[#A85838]">Interior Design.</span>
        </h2>
        <p className="text-base sm:text-lg text-[#634832] font-light leading-relaxed">
          How spatial planning, structural functionality, tactile textures, and traditional Vedic energies come together into one unified modern living sanctuary.
        </p>

        <div className="pt-2 flex justify-center gap-4">
          <button
            onClick={() => onNavigate("consultation")}
            className="px-6 py-3 rounded-full bg-[#161514] text-[#FDFBF7] text-xs font-semibold hover:bg-[#634832] transition-colors"
          >
            Request Spatial Audit
          </button>
          <a
            href={getWhatsAppLink("Hello! I am interested in learning more about your Vastu × Interior Design synthesis.")}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full bg-[#F7F3EB] border border-[#D8CEBE] text-[#161514] text-xs font-semibold hover:border-[#B89758] transition-colors inline-flex items-center gap-1.5"
          >
            <MessageCircle size={15} className="text-[#25D366]" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>

      {/* 4 Core Synthesis Principles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {synthesisPrinciples.map((p, idx) => (
          <div key={idx} className="p-6 rounded-2xl bg-[#FDFBF7] border border-[#EFE8DC] space-y-3">
            <span className="font-mono text-xs text-[#B89758] font-bold">Principle 0{idx + 1}</span>
            <h3 className="font-serif text-xl text-[#161514]">{p.title}</h3>
            <p className="text-xs text-[#634832] leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>

      {/* Interactive Floor Plan Engine */}
      <section>
        <SectionHeader
          eyebrow="Interactive Room Blueprint"
          title="Room-by-Room Vastu × Interior Analysis"
          subtitle="Select any room in the floor plan to inspect its specific Vastu energetic requirements juxtaposed with contemporary interior architecture solutions."
        />
        <VastuFloorPlan />
      </section>

      {/* Before / After Transformation */}
      <section>
        <SectionHeader
          eyebrow="Transformation Concepts"
          title="Seeing the Synthesis in Practice"
          subtitle="Slide across to see how a conventional dark apartment shell can be re-imagined as an elemental sanctuary (illustrative)."
        />
        <BeforeAfterSlider />
      </section>

      {/* Consultation Banner */}
      <div className="p-8 sm:p-12 rounded-3xl bg-[#F7F3EB] border border-[#EFE8DC] text-center max-w-3xl mx-auto space-y-5">
        <span className="editorial-subheading text-[#B89758]">Design Your Home With Intention</span>
        <h3 className="font-serif text-3xl sm:text-4xl text-[#161514]">
          Planning a new home or renovation?
        </h3>
        <p className="text-xs sm:text-sm text-[#634832] leading-relaxed max-w-xl mx-auto">
          Share your builder floor plan with {siteConfig.founderName}. We evaluate energetic flow before civil changes begin, saving time and creating a timeless residence.
        </p>
        <div className="pt-2 flex justify-center gap-3">
          <button
            onClick={() => onNavigate("consultation")}
            className="px-7 py-3.5 bg-[#161514] text-[#FDFBF7] rounded-full text-xs font-semibold hover:bg-[#634832] transition-colors"
          >
            Book Floor Plan Consultation
          </button>
        </div>
      </div>

    </div>
  );
}
