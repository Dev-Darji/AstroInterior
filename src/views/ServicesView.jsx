import React from 'react';
import SectionHeader from '../components/ui/SectionHeader';
import { serviceCategories, astrologyServices, numerologyServices, vastuServices } from '../data/services';
import { Sparkles, Compass, CheckCircle2, ArrowRight, MessageCircle, Calendar } from 'lucide-react';
import { getWhatsAppLink } from '../data/siteConfig';

export default function ServicesView({ onNavigate }) {
  return (
    <div className="pt-28 pb-20 space-y-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="editorial-subheading text-[#B89758]">Disciplinary Offerings</span>
        <h1 className="font-serif text-4xl sm:text-6xl text-[#161514] font-normal leading-tight">
          Holistic Services for <br />
          <span className="italic text-[#A85838]">Self, Space & Design.</span>
        </h1>
        <p className="text-base sm:text-lg text-[#634832] font-light leading-relaxed">
          From full turnkey interior architecture in Ahmedabad and Surat to remote Vedic Kundli and 16-zone Vastu audits across India and worldwide.
        </p>

        <div className="pt-2 flex justify-center gap-4">
          <button
            onClick={() => onNavigate("consultation")}
            className="px-6 py-3 rounded-full bg-[#161514] text-[#FDFBF7] text-xs font-semibold hover:bg-[#634832] transition-colors"
          >
            Start a Consultation
          </button>
        </div>
      </div>

      {/* 4 Pillars Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {serviceCategories.map((cat, idx) => (
          <div
            key={cat.id}
            className="bg-[#FDFBF7] border border-[#EFE8DC] rounded-3xl p-8 space-y-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#EFE8DC] pb-4">
                <div>
                  <span className="font-mono text-xs font-bold text-[#B89758]">PILLAR 0{idx + 1}</span>
                  <h3 className="font-serif text-3xl text-[#161514] mt-0.5">{cat.title}</h3>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-[#F7F3EB] border border-[#D8CEBE] font-medium text-[#634832]">
                  {cat.subtitle}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#634832] leading-relaxed">
                {cat.description}
              </p>

              <div className="space-y-2 pt-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#A85838] block">
                  Core Deliverables:
                </span>
                <ul className="space-y-2 text-xs text-[#22201E]">
                  {cat.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-[#607261] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-[#EFE8DC] flex items-center justify-between">
              <button
                onClick={() => onNavigate(cat.id === "space" ? "vastu" : cat.id === "design" ? "interiors" : cat.id === "synthesis" ? "vastu-interiors" : "tools")}
                className="text-xs font-semibold text-[#161514] hover:text-[#A85838] flex items-center gap-1.5"
              >
                <span>Explore {cat.title}</span>
                <ArrowRight size={13} />
              </button>

              <a
                href={getWhatsAppLink(`Hello, I would like to inquire about your "${cat.title}" (${cat.subtitle}) service.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-[#F7F3EB] hover:bg-[#EFE8DC] text-[#25D366] transition-colors"
                title="Inquire on WhatsApp"
              >
                <MessageCircle size={16} />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Astrology & Numerology Deep Dive */}
      <section className="bg-[#F7F3EB] border border-[#EFE8DC] rounded-3xl p-6 sm:p-10 space-y-8">
        <SectionHeader
          eyebrow="The Self Triad"
          title="Astrology & Numerology Consultations"
          subtitle="How understanding planetary transits and personal numbers reveals your optimal lifestyle rhythm and residential sanctuary."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {astrologyServices.map((astro) => (
            <div key={astro.id} className="p-6 rounded-2xl bg-[#FDFBF7] border border-[#EFE8DC] space-y-4 flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-[#A85838]">{astro.duration}</span>
                <h4 className="font-serif text-xl text-[#161514] mt-1">{astro.title}</h4>
                <p className="text-xs text-[#634832] mt-2 leading-relaxed">{astro.description}</p>
              </div>

              <div className="pt-3 border-t border-[#EFE8DC]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#634832] block mb-1">Includes:</span>
                <ul className="text-[11px] text-[#634832] space-y-1">
                  {astro.deliverables.map((d, i) => (
                    <li key={i}>• {d}</li>
                  ))}
                </ul>

                <button
                  onClick={() => onNavigate("consultation")}
                  className="mt-4 w-full py-2 bg-[#161514] text-[#FDFBF7] rounded-lg text-xs font-medium hover:bg-[#634832] transition-colors"
                >
                  Book Session
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
