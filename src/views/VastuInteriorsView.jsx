import React from 'react';
import SectionHeader from '../components/ui/SectionHeader';
import VastuFloorPlan from '../components/interactive/VastuFloorPlan';
import BeforeAfterSlider from '../components/interactive/BeforeAfterSlider';
import { Sparkles, Compass, CheckCircle2, ArrowRight, MessageCircle } from 'lucide-react';
import { getWhatsAppLink } from '../data/siteConfig';

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
      desc: "Your home looks and feels like an Architectural Digest feature. Sacred geometry and energetic equilibrium work invisibly beneath the surface."
    },
    {
      title: "Circadian Light Choreography",
      desc: "We match Kelvin temperatures to Vedic spatial sectors: soft warm light in grounding sleep zones and crisp daylight in intellect-driven workstations."
    }
  ];

  return (
    <div className="pt-28 pb-20 space-y-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Hero Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="editorial-subheading text-[#B89758]">The Definitive Synthesis</span>
        <h1 className="font-serif text-4xl sm:text-6xl text-[#161514] font-normal leading-tight">
          Where Vastu Meets <br />
          <span className="italic text-[#A85838]">Interior Architecture.</span>
        </h1>
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
            <span>Chat with Studio</span>
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
          eyebrow="Case Studies"
          title="Seeing the Synthesis in Practice"
          subtitle="Slide across to witness how a conventional dark apartment shell was re-engineered into an elemental sanctuary."
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
          Share your builder floor plan with our team. We evaluate energetic flow before civil changes begin, saving time and creating a timeless residence.
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
