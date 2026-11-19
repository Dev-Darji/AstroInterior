import React from 'react';
import SectionHeader from '../components/ui/SectionHeader';
import ConsultationForm from '../components/forms/ConsultationForm';
import FAQAccordion from '../components/ui/FAQAccordion';
import { MessageCircle, Phone, Mail, MapPin, Clock, Calendar, CheckCircle2 } from 'lucide-react';
import { siteConfig, getWhatsAppLink } from '../data/siteConfig';

export default function ConsultationView() {
  return (
    <div className="pt-28 pb-20 space-y-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="editorial-subheading text-[#B89758]">Personalized Engagement</span>
        <h1 className="font-serif text-4xl sm:text-6xl text-[#161514] font-normal leading-tight">
          Begin Your Consultation <br />
          <span className="italic text-[#A85838]">With {siteConfig.founderName}.</span>
        </h1>
        <p className="text-base sm:text-lg text-[#634832] font-light leading-relaxed">
          Vastu for your home, office, shop or clinic, interior design across Mumbai, or an astrology and numerology reading online — {siteConfig.experience.toLowerCase()} of experience, guiding you personally.
        </p>
      </div>

      {/* Quick Contact Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {/* WhatsApp */}
        <a
          href={getWhatsAppLink("Hello! I would like to book a consultation session directly through WhatsApp.")}
          target="_blank"
          rel="noopener noreferrer"
          className="p-5 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/30 flex items-center gap-4 hover:bg-[#25D366]/15 transition-colors group"
        >
          <div className="w-12 h-12 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0">
            <MessageCircle size={24} />
          </div>
          <div>
            <span className="text-xs font-semibold text-[#1a8a43] uppercase tracking-wider block">Fastest Response</span>
            <span className="text-sm font-bold text-[#161514]">Chat on WhatsApp</span>
            <p className="text-[11px] text-[#634832]">Message {siteConfig.founderName} directly</p>
          </div>
        </a>

        {/* Direct Phone */}
        <a
          href={`tel:${siteConfig.phone}`}
          className="p-5 rounded-2xl bg-[#F7F3EB] border border-[#EFE8DC] flex items-center gap-4 hover:border-[#B89758] transition-colors group"
        >
          <div className="w-12 h-12 rounded-xl bg-[#161514] text-[#B89758] flex items-center justify-center shrink-0">
            <Phone size={22} />
          </div>
          <div>
            <span className="text-xs font-semibold text-[#A85838] uppercase tracking-wider block">Direct Phone</span>
            <span className="text-sm font-bold text-[#161514]">{siteConfig.phoneDisplay}</span>
            <p className="text-[11px] text-[#634832]">Also: {siteConfig.phoneAltDisplay}</p>
          </div>
        </a>

        {/* Office Location */}
        <a
          href={siteConfig.mapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="p-5 rounded-2xl bg-[#F7F3EB] border border-[#EFE8DC] flex items-center gap-4 hover:border-[#B89758] transition-colors"
        >
          <div className="w-12 h-12 rounded-xl bg-[#161514] text-[#DEC695] flex items-center justify-center shrink-0">
            <MapPin size={22} />
          </div>
          <div>
            <span className="text-xs font-semibold text-[#634832] uppercase tracking-wider block">Office</span>
            <span className="text-sm font-bold text-[#161514]">Kandivali West, Mumbai</span>
            <p className="text-[11px] text-[#634832]">Opp. Assumption Church, Dahanukarwadi</p>
          </div>
        </a>
      </div>

      {/* Main Qualified Consultation Form */}
      <section>
        <ConsultationForm />
      </section>

      {/* Grouped FAQs Section */}
      <section>
        <SectionHeader
          eyebrow="Frequently Asked Questions"
          title="Everything You Need to Know"
          subtitle="Answers to common questions about Vastu remedies, consultations and how to get started."
        />
        <FAQAccordion />
      </section>

    </div>
  );
}
