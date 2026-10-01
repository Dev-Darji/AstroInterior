import React from 'react';
import SectionHeader from '../components/ui/SectionHeader';
import VastuCompass from '../components/interactive/VastuCompass';
import { vastuServices } from '../data/services';
import { Compass, CheckCircle2, ArrowRight, MessageCircle, ShieldCheck, Flame, Droplets, Mountain, Wind, Sun } from 'lucide-react';
import { getWhatsAppLink } from '../data/siteConfig';

export default function VastuView({ onNavigate }) {
  const panchaTattva = [
    { name: "Jal (Water)", direction: "North & North-East", color: "text-blue-700 bg-blue-50 border-blue-200", icon: Droplets, desc: "Brings clarity of thought, vision, and sustained financial inflows." },
    { name: "Agni (Fire)", direction: "South-East", color: "text-amber-700 bg-amber-50 border-amber-200", icon: Flame, desc: "Governs vitality, metabolic health, digestive fire, and cash liquidity." },
    { name: "Prithvi (Earth)", direction: "South-West", color: "text-stone-700 bg-stone-100 border-stone-300", icon: Mountain, desc: "Provides psychological grounding, familial stability, and deep restorative sleep." },
    { name: "Vayu (Air)", direction: "East & North-West", color: "text-emerald-700 bg-emerald-50 border-emerald-200", icon: Wind, desc: "Stimulates social connectivity, relationships, customer movement, and networking." },
    { name: "Akasha (Space)", direction: "Center & North-East", color: "text-yellow-700 bg-yellow-50 border-yellow-200", icon: Sun, desc: "Enables uninhibited expansion, high-frequency consciousness, and peace." }
  ];

  return (
    <div className="pt-28 pb-20 space-y-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="editorial-subheading text-[#B89758]">Spatial Science</span>
        <h1 className="font-serif text-4xl sm:text-6xl text-[#161514] font-normal leading-tight">
          Bring Intention <br />
          <span className="italic text-[#607261]">Into Your Space.</span>
        </h1>
        <p className="text-base sm:text-lg text-[#634832] font-light leading-relaxed">
          Vastu Shastra is the ancient Indian science of environmental architecture. We analyze the 16 cardinal zones of your property to release stagnant energy and unlock abundance without structural demolition.
        </p>

        <div className="pt-2 flex justify-center gap-4">
          <button
            onClick={() => onNavigate("consultation")}
            className="px-6 py-3 rounded-full bg-[#161514] text-[#FDFBF7] text-xs font-semibold hover:bg-[#634832] transition-colors"
          >
            Book a Vastu Audit
          </button>
          <a
            href={getWhatsAppLink("Hello! I would like to request a Vastu consultation for my property.")}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full bg-[#F7F3EB] border border-[#D8CEBE] text-[#161514] text-xs font-semibold hover:border-[#B89758] transition-colors inline-flex items-center gap-1.5"
          >
            <MessageCircle size={15} className="text-[#25D366]" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Pancha Tattva Elemental Harmony */}
      <section className="bg-[#F7F3EB] border border-[#EFE8DC] rounded-3xl p-6 sm:p-10">
        <SectionHeader
          eyebrow="The Elemental Foundation"
          title="Pancha Tattva — The Five Great Elements"
          subtitle="Every living space is a micro-cosmos composed of five primary elements. Imbalance among these triggers physical restlessness, financial delays, or creative blockages."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {panchaTattva.map((elem, idx) => {
            const Icon = elem.icon;
            return (
              <div key={idx} className="p-5 rounded-2xl bg-[#FDFBF7] border border-[#EFE8DC] space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#F7F3EB] flex items-center justify-center text-[#B89758]">
                  <Icon size={20} />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-[#161514] font-medium">{elem.name}</h3>
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-[#A85838] block mt-0.5">
                    {elem.direction}
                  </span>
                </div>
                <p className="text-xs text-[#634832] leading-relaxed">
                  {elem.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Interactive Compass Section */}
      <section>
        <SectionHeader
          eyebrow="Interactive Spatial Explorer"
          title="8-Directional Vastu Compass Deep Dive"
          subtitle="Click on each directional node to uncover its ruling deity, energetic purpose, ideal room placements, and what items to avoid."
        />
        <VastuCompass />
      </section>

      {/* Vastu Services Suite */}
      <section className="space-y-8">
        <SectionHeader
          eyebrow="Specialized Audits"
          title="Our Vastu Consultation Offerings"
          subtitle="Tailored audits for residential apartments, corporate headquarters, and pre-purchase land evaluations."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {vastuServices.map((srv) => (
            <div
              key={srv.id}
              className="p-8 rounded-2xl bg-[#FDFBF7] border border-[#EFE8DC] space-y-5 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <span className="text-[11px] font-mono text-[#A85838] uppercase font-semibold">
                  {srv.type}
                </span>
                <h3 className="font-serif text-2xl text-[#161514]">
                  {srv.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#634832] leading-relaxed">
                  {srv.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#EFE8DC]">
                <span className="text-[11px] text-[#634832] block mb-3">
                  <strong className="text-[#161514]">Recommended for:</strong> {srv.idealFor}
                </span>
                <button
                  onClick={() => onNavigate("consultation")}
                  className="w-full py-2.5 px-4 bg-[#161514] text-[#FDFBF7] rounded-xl text-xs font-medium hover:bg-[#634832] transition-colors"
                >
                  Request This Audit
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
